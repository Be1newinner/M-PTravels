"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Upload, ArrowLeft, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "../../dashboard-layout";
import { useCreateBlog } from "@/lib/api/blogs-api";
import SimpleMarkdownEditor from "@/components/simple-markdown-editor";
import { imageUploadUtility } from "@/lib/utils/handleImageAdditionRemove";
import { slugify } from "@/lib/utils/text_helpers";

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { mutate: createBlog, isPending } = useCreateBlog();

  useEffect(() => {
    // Cleanup function to revoke object URL when component unmounts or image changes
    return () => {
      if (currentPreviewUrl && currentPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [currentPreviewUrl]);

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

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
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      // Revoke previous blob URL if it exists
      if (currentPreviewUrl && currentPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
      setCurrentPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    // Revoke current blob URL if it exists
    if (currentPreviewUrl && currentPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(currentPreviewUrl);
    }
    setCurrentPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let imageUrl: string | null = null;

    if (selectedImageFile) {
      setIsUploadingImage(true);
      try {
        const uploadedImages = await imageUploadUtility(
          { imagesToAdd: [selectedImageFile], imagesToRemove: [] },
          "BLOG_IMAGE"
        );
        if (uploadedImages.length > 0) {
          imageUrl = uploadedImages[0];
        } else {
          toast({
            title: "Image Upload Failed",
            description: "Could not upload the image. Please try again.",
            variant: "destructive",
          });
          setIsUploadingImage(false);
          return; // Stop submission if image upload fails
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        toast({
          title: "Image Upload Error",
          description:
            "An error occurred during image upload. Please try again.",
          variant: "destructive",
        });
        setIsUploadingImage(false);
        return; 
      } finally {
        setIsUploadingImage(false);
      }
    }

    const blogDataToSend = {
      title,
      description: "",
      image: imageUrl,
      content,
      slug,
    };

    createBlog(blogDataToSend, {
      onSuccess: () => {
        toast({
          title: "Blog created",
          description: "Your blog post has been successfully created.",
        });
        router.push("/blog");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to create blog post. Please try again.",
          variant: "destructive",
        });
        console.error(error);
      },
    });
  };

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
              Create New Blog Post
            </h1>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isPending || isUploadingImage}
          >
            {isPending || isUploadingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUploadingImage ? "Uploading Image..." : "Publishing..."}
              </>
            ) : (
              "Publish Blog"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Blog Content</CardTitle>
                <CardDescription>
                  Write your blog post using Markdown
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
                  <div>
                    <p>slug</p>
                    <p className="text-sm text-gray-400 px-2">{slug ? slug : "your-slug-will-be-here"}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <SimpleMarkdownEditor
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
                  Upload a featured image for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentPreviewUrl ? (
                    <div className="relative">
                      <Image
                        src={currentPreviewUrl || "/placeholder.svg"}
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
