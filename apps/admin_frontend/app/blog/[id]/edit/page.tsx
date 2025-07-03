"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Upload, ArrowLeft, Loader2, AlertTriangle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../../../dashboard-layout";
import { useBlog, useUpdateBlog } from "@/lib/api/blogs-api";
import SimpleMarkdownEditor from "@/components/simple-markdown-editor";
import {
  imageUploadUtility,
  imageDeleteUtility,
} from "@/lib/utils/handleImageAdditionRemove";

type ImageChangeState = {
  imagesToAdd: File[];
  imagesToRemove: string[];
};

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  const { data, isLoading, isError, refetch } = useBlog(blogId);
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog(blogId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [imageChangesToBeMade, setImageChangesToBeMade] =
    useState<ImageChangeState>({
      imagesToAdd: [],
      imagesToRemove: [],
    });
  const imageUploadMapRef = useRef<Record<string, File>>({});
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  useEffect(() => {
    if (isLoading) {
      console.log("Blog data is still loading...");
      return;
    }

    if (isError) {
      console.error("Error fetching blog data.");
      return;
    }

    if (data?.data) {
      console.log("Successfully fetched blog data:", data.data);
      setTitle(data.data.title || "");
      setContent(data.data.content || ""); 
      setCurrentImage(data.data.image || null);
      setImageChangesToBeMade({ imagesToAdd: [], imagesToRemove: [] });
      imageUploadMapRef.current = {};
    } else {
      console.warn(
        "Blog data not found or empty after successful fetch:",
        data
      );
      toast({
        title: "Blog not found",
        description:
          "The blog post could not be loaded. It might not exist or data is empty.",
        variant: "destructive",
      });
    }
  }, [data, isLoading, isError, router]);

  useEffect(() => {
    return () => {
      imageChangesToBeMade.imagesToAdd.forEach((file) => {
        const url = URL.createObjectURL(file);
        if (url !== currentImage) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [currentImage, imageChangesToBeMade.imagesToAdd]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!title || title.length < 2) {
      errors.title = "Title must be at least 2 characters";
    }

    if (!content || content.length < 10) {
      errors.content = "Content must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (currentImage && !currentImage.startsWith("blob:")) {
      setImageChangesToBeMade((prev) => ({
        ...prev,
        imagesToRemove: [...prev.imagesToRemove, currentImage],
      }));
    } else if (currentImage && currentImage.startsWith("blob:")) {
      URL.revokeObjectURL(currentImage);
    }

    setImageChangesToBeMade((prev) => ({
      ...prev,
      imagesToAdd: [file],
    }));

    const url = URL.createObjectURL(file);
    imageUploadMapRef.current = { [url]: file };
    setCurrentImage(url);
  };

  const handleRemoveImage = () => {
    if (currentImage) {
      if (!currentImage.startsWith("blob:")) {
        setImageChangesToBeMade((prev) => ({
          ...prev,
          imagesToRemove: [...prev.imagesToRemove, currentImage],
        }));
      } else {
        setImageChangesToBeMade((prev) => ({
          ...prev,
          imagesToAdd: [],
        }));
        URL.revokeObjectURL(currentImage);
      }
    }
    setCurrentImage(null);
    imageUploadMapRef.current = {};
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsImageProcessing(true);
    let finalImageUrl: string | null = data?.data?.image || null;

    try {
      if (imageChangesToBeMade.imagesToAdd.length > 0) {
        const uploadedImages = await imageUploadUtility(
          {
            imagesToAdd: imageChangesToBeMade.imagesToAdd,
            imagesToRemove: [],
          },
          "BLOG_IMAGE"
        );

        console.log("Uploaded Images:", uploadedImages);
        if (uploadedImages.length > 0) {
          finalImageUrl = uploadedImages[0];
        } else {
          finalImageUrl = data?.data?.image || null;
          toast({
            title: "Image Upload Failed",
            description: "Could not upload the new image. Please try again.",
            variant: "destructive",
          });
          return;
        }
      } else if (currentImage === null && data?.data?.image) {
        finalImageUrl = null;
      } else if (currentImage && !currentImage.startsWith("blob:")) {
        finalImageUrl = currentImage;
      } else if (currentImage && currentImage.startsWith("blob:")) {
        finalImageUrl = data?.data?.image || null;
      }

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

      updateBlog(
        { title, content, image: finalImageUrl },
        {
          onSuccess: () => {
            toast({
              title: "Blog updated",
              description: "Your blog post has been successfully updated.",
            });
            router.push("/blog");
            setImageChangesToBeMade({ imagesToAdd: [], imagesToRemove: [] });
            imageUploadMapRef.current = {};
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: "Failed to update blog post. Please try again.",
              variant: "destructive",
            });
            console.error(error);
          },
        }
      );
    } catch (err) {
      console.error("Operation failed:", err);
      toast({
        title: "Error",
        description: "An error occurred during image operations or update.",
        variant: "destructive",
      });
    } finally {
      setIsImageProcessing(false);
    }
  };

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
          <h2 className="text-xl font-bold mb-2">Error loading blog</h2>
          <p className="text-muted-foreground mb-4">
            There was a problem loading the blog post.
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
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Edit Blog Post
            </h1>
          </div>
          <Button
            onClick={handleSubmit}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>
                  Edit your blog post using Markdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (formErrors.title) {
                          setFormErrors((prev) => ({ ...prev, title: "" }));
                        }
                      }}
                    />
                    {formErrors.title && (
                      <p className="text-sm text-destructive">
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <SimpleMarkdownEditor
                      key={blogId}
                      initialContent={content}
                      onChange={(value) => {
                        setContent(value);
                        if (formErrors.content) {
                          setFormErrors((prev) => ({ ...prev, content: "" }));
                        }
                      }}
                    />
                    {formErrors.content && (
                      <p className="text-sm text-destructive">
                        {formErrors.content}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Update the featured image for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentImage ? (
                    <div className="relative">
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt="Blog preview"
                        width={500}
                        height={300}
                        className="rounded-md border object-cover w-full h-64"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
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
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </label>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>Recommended image size: 1280 x 960 pixels</p>
                    <p>image type should be: webp</p>
                    <p>Maximum file size: 1MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
