"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Upload, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DashboardLayout from "../../dashboard-layout"
import { useCreateBlog } from "@/lib/api/blogs-api"
import SimpleMarkdownEditor from "@/components/simple-markdown-editor"

export default function NewBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const { mutate: createBlog, isPending } = useCreateBlog()

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!title || title.length < 2) {
      errors.title = "Title must be at least 2 characters"
    }

    if (!content || content.length < 10) {
      errors.content = "Content must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", content)

    if (image) {
      formData.append("image", image)
    }

    createBlog(formData, {
      onSuccess: () => {
        toast({
          title: "Blog created",
          description: "Your blog post has been successfully created.",
        })
        router.push("/blog")
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to create blog post. Please try again.",
          variant: "destructive",
        })
        console.error(error)
      },
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    setImage(file)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Blog Post</h1>
          </div>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
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
                <CardDescription>Write your blog post using Markdown</CardDescription>
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
                        setTitle(e.target.value)
                        if (formErrors.title) {
                          setFormErrors((prev) => ({ ...prev, title: "" }))
                        }
                      }}
                    />
                    {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <SimpleMarkdownEditor
                      initialContent={content}
                      onChange={(value) => {
                        setContent(value)
                        if (formErrors.content) {
                          setFormErrors((prev) => ({ ...prev, content: "" }))
                        }
                      }}
                    />
                    {formErrors.content && <p className="text-sm text-destructive">{formErrors.content}</p>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>Upload a featured image for your blog post</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {previewUrl ? (
                    <div className="relative">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Blog preview"
                        width={500}
                        height={300}
                        className="rounded-md border object-cover w-full h-64"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setImage(null)
                          setPreviewUrl(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or JPEG (max 5MB)</p>
                      </div>
                      <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>Recommended image size: 1200 x 800 pixels</p>
                    <p>Maximum file size: 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
