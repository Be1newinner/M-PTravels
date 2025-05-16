"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Upload, X, Loader2, AlertTriangle } from "lucide-react"
import Image from "next/image"
import DashboardLayout from "../../dashboard-layout"
import { useCab, useUpdateCab } from "@/lib/api/cabs-api"

export default function EditBusPage() {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    model: "",
    description: "",
    capacity: "0",
  })
  const [images, setImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Get cab data - using a default ID for now, in a real app you might get this from URL params
  const cabId = "default-cab-id" // This would come from route params in a real app
  const { data, isLoading, isError, refetch } = useCab(cabId)
  const { mutate: updateCab, isPending } = useUpdateCab(cabId)

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title || "",
        model: data.data.model || "",
        description: data.data.description || "",
        capacity: String(data.data.capacity || 0),
      })

      if (data.data.images && data.data.images.length > 0) {
        setImages(data.data.images)
      }
    }
  }, [data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 2) {
      errors.title = "Title must be at least 2 characters"
    }

    if (!formData.model || formData.model.length < 2) {
      errors.model = "Model must be at least 2 characters"
    }

    if (!formData.capacity || Number.parseInt(formData.capacity) < 1) {
      errors.capacity = "Capacity must be at least 1"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    const formDataToSend = new FormData()
    formDataToSend.append("title", formData.title)
    formDataToSend.append("model", formData.model)
    formDataToSend.append("description", formData.description || "")
    formDataToSend.append("capacity", formData.capacity)

    // Append new images
    newImages.forEach((file) => {
      formDataToSend.append("images", file)
    })

    updateCab(formDataToSend, {
      onSuccess: () => {
        toast({
          title: "Bus details updated",
          description: "Your bus details have been successfully updated.",
        })
        setIsSaving(false)
        setNewImages([])
        refetch()
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to update bus details. Please try again.",
          variant: "destructive",
        })
        console.error(error)
        setIsSaving(false)
      },
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)

    const files = Array.from(e.target.files)
    setNewImages((prev) => [...prev, ...files])

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newPreviewUrls])

    setIsUploading(false)

    toast({
      title: "Images added",
      description: `${files.length} image(s) added successfully.`,
    })
  }

  const removeImage = (index: number) => {
    // If it's a new image, remove from newImages array
    if (index >= (data?.data?.images?.length || 0)) {
      const newImagesIndex = index - (data?.data?.images?.length || 0)
      setNewImages((prev) => prev.filter((_, i) => i !== newImagesIndex))
    }

    // Remove from preview array
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-bold mb-2">Error loading bus details</h2>
          <p className="text-muted-foreground mb-4">There was a problem loading the bus details.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Edit Bus Details</h1>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Reset Changes</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all changes you've made to the bus details. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (data?.data) {
                        setFormData({
                          title: data.data.title || "",
                          model: data.data.model || "",
                          description: data.data.description || "",
                          capacity: String(data.data.capacity || 0),
                        })
                        setImages(data.data.images || [])
                        setNewImages([])
                      }
                      toast({
                        title: "Changes reset",
                        description: "All changes have been reset to the original values.",
                      })
                    }}
                  >
                    Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSubmit} disabled={isSaving || isPending}>
              {isSaving || isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Bus Details</TabsTrigger>
            <TabsTrigger value="images">Bus Images</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bus Information</CardTitle>
                <CardDescription>Update your bus details and specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Bus Name</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter bus name"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                      {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        id="model"
                        name="model"
                        placeholder="Enter bus model"
                        value={formData.model}
                        onChange={handleInputChange}
                      />
                      {formErrors.model && <p className="text-sm text-destructive">{formErrors.model}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Seating Capacity</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min={1}
                        value={formData.capacity}
                        onChange={handleInputChange}
                      />
                      {formErrors.capacity && <p className="text-sm text-destructive">{formErrors.capacity}</p>}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter bus description"
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bus Images</CardTitle>
                <CardDescription>Upload and manage images of your bus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video overflow-hidden rounded-md border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Bus image ${index + 1}`}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <label className="flex flex-col items-center justify-center aspect-video rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">{isUploading ? "Uploading..." : "Upload Image"}</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or JPEG (max 5MB)</p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
