"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Upload, ArrowLeft, Loader2, AlertTriangle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../../../dashboard-layout";
import { usePackage, useUpdatePackage } from "@/lib/api/packages-api";
import {
  imageUploadUtility,
  imageDeleteUtility,
} from "@/lib/utils/handleImageAdditionRemove";

// Define a type for image changes to be made
type ImageChangeState = {
  imagesToAdd: File[];
  imagesToRemove: string[];
};

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1" })
    .optional(),
  price_unit: z.string().optional(),
});

export default function EditPackagePage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.id as string;

  const { data, isLoading, isError, refetch } = usePackage(packageId);
  const { mutate: updatePackage, isPending: isUpdating } =
    useUpdatePackage(packageId);

  const [currentImage, setCurrentImage] = useState<string | null>(null); // The URL currently displayed/persisted
  const [imageChangesToBeMade, setImageChangesToBeMade] =
    useState<ImageChangeState>({
      imagesToAdd: [],
      imagesToRemove: [],
    });
  const imageUploadMapRef = useRef<Record<string, File>>({}); // To keep track of blob URLs to files
  const [isImageProcessing, setIsImageProcessing] = useState(false); // New state for image processing

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      price_unit: "INR",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title,
        description: data.data.description,
        price: data.data.price,
        price_unit: data.data.price_unit,
      });
      setCurrentImage(data.data.image || null); // Set initial image
      setImageChangesToBeMade({ imagesToAdd: [], imagesToRemove: [] }); // Reset changes
      imageUploadMapRef.current = {}; // Clear ref
    }
  }, [data, form]);

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      // Revoke object URLs for images that were added but not submitted
      // or if the component unmounts while a blob URL is active
      imageChangesToBeMade.imagesToAdd.forEach((file) => {
        const url = URL.createObjectURL(file);
        if (url !== currentImage) {
          // Avoid revoking currentImage twice if it's a blob
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [currentImage, imageChangesToBeMade.imagesToAdd]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // If there's an existing image that's not a new blob, mark it for removal
    if (currentImage && !currentImage.startsWith("blob:")) {
      setImageChangesToBeMade((prev) => ({
        ...prev,
        imagesToRemove: [...prev.imagesToRemove, currentImage],
      }));
    } else if (currentImage && currentImage.startsWith("blob:")) {
      // If the current image is a blob, revoke its URL as it's being replaced
      URL.revokeObjectURL(currentImage);
    }

    // Clear any previous image to add, and add the new one
    setImageChangesToBeMade((prev) => ({
      ...prev,
      imagesToAdd: [file], // Only one image to add
    }));

    const url = URL.createObjectURL(file);
    imageUploadMapRef.current = { [url]: file }; // Store only the current file
    setCurrentImage(url); // Display the new blob URL
  };

  const handleRemoveImage = () => {
    if (currentImage) {
      // If it's an existing image (not a blob), mark for removal
      if (!currentImage.startsWith("blob:")) {
        setImageChangesToBeMade((prev) => ({
          ...prev,
          imagesToRemove: [...prev.imagesToRemove, currentImage],
        }));
      } else {
        // If it's a new blob image, just remove it from imagesToAdd
        setImageChangesToBeMade((prev) => ({
          ...prev,
          imagesToAdd: [],
        }));
        // Revoke object URL immediately for local cleanup
        URL.revokeObjectURL(currentImage);
      }
    }
    setCurrentImage(null); // Clear the displayed image
    imageUploadMapRef.current = {}; // Clear ref
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsImageProcessing(true); // Start image processing indicator
    let finalImageUrl: string | null = data?.data?.image || null; // Start with the original image URL

    try {
      // 1. Upload new images (if any)
      if (imageChangesToBeMade.imagesToAdd.length > 0) {
        const uploadedImages = await imageUploadUtility(
          {
            imagesToAdd: imageChangesToBeMade.imagesToAdd,
            imagesToRemove: [], // Not relevant for upload utility
          },
          "PACKAGE_IMAGE"
        );
        if (uploadedImages.length > 0) {
          finalImageUrl = uploadedImages[0]; // Take the first (and only) uploaded image URL
        } else {
          // If upload failed, revert to original or null
          finalImageUrl = data?.data?.image || null;
          toast({
            title: "Image Upload Failed",
            description: "Could not upload the new image. Please try again.",
            variant: "destructive",
          });
          return; // Stop submission if image upload is critical
        }
      } else if (currentImage === null && data?.data?.image) {
        // If currentImage is null, but there was an original image, it means it was removed
        finalImageUrl = null;
      } else if (currentImage && !currentImage.startsWith("blob:")) {
        // If currentImage is still a server URL and no new image was added, keep it
        finalImageUrl = currentImage;
      } else if (currentImage && currentImage.startsWith("blob:")) {
        // This case should ideally be handled by imageChangesToBeMade.imagesToAdd
        // but as a fallback, if a blob URL is still 'currentImage' and not in imagesToAdd,
        // it means it was a new image that failed to upload or was not processed.
        // For simplicity, we'll treat it as if no new image was successfully set.
        finalImageUrl = data?.data?.image || null;
      }

      // 2. Delete images marked for removal
      if (imageChangesToBeMade.imagesToRemove.length > 0) {
        const deleteSuccess = await imageDeleteUtility(
          imageChangesToBeMade.imagesToRemove
        );
        if (!deleteSuccess) {
          console.warn("Some images failed to delete, proceeding with update.");
          toast({
            title: "Image Deletion Warning",
            description: "Some old images could not be deleted.",
            variant: "destructive",
          });
        }
      }

      // Construct the payload for updatePackage
      const updatePayload = {
        ...values,
        image: finalImageUrl, // Pass the final image URL (or null)
      };

      updatePackage(updatePayload, {
        onSuccess: () => {
          toast({
            title: "Package updated",
            description: "Your package has been successfully updated.",
          });
          router.push("/packages");
          // Reset image changes after successful update
          setImageChangesToBeMade({ imagesToAdd: [], imagesToRemove: [] });
          imageUploadMapRef.current = {};
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to update package. Please try again.",
            variant: "destructive",
          });
          console.error(error);
        },
      });
    } catch (err) {
      console.error("Operation failed:", err);
      toast({
        title: "Error",
        description: "An error occurred during image operations or update.",
        variant: "destructive",
      });
    } finally {
      setIsImageProcessing(false); // End image processing indicator
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold mb-2">Error loading package</h2>
          <p className="text-muted-foreground mb-4">
            There was a problem loading the package details.
          </p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/packages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Edit Package</h1>
          </div>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isUpdating || isImageProcessing}
          >
            {isUpdating || isImageProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isImageProcessing ? "Processing Image..." : "Saving..."}
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
            <CardDescription>
              Update the details of your package
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter package title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter package description"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price_unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="INR" {...field} />
                        </FormControl>
                        <FormDescription>
                          Currency or unit for the price (e.g., INR, USD)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div>
                  <FormLabel>Package Image</FormLabel>
                  <div className="mt-2 flex flex-col items-center">
                    {currentImage ? (
                      <div className="relative mb-6 w-full max-w-md">
                        <Image
                          src={currentImage || "/placeholder.svg"}
                          alt="Package preview"
                          width={500}
                          height={300}
                          className="rounded-md border object-cover w-full h-64"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                          type="button"
                        >
                          <X className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full max-w-md h-64 rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">
                            Click to upload image
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG or JPEG (max 5MB)
                          </p>
                        </div>
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageSelect}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
