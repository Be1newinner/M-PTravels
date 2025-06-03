"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Upload, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DashboardLayout from "../../dashboard-layout"
import { useCreatePackage } from "@/lib/api/packages-api"

export default function NewPackagePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    price_unit: "INR",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { mutate: createPackage, isPending } = useCreatePackage()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 2) {
      errors.title = "Title must be at least 2 characters"
    }

    if (!formData.description || formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters"
    }

    if (!formData.price || Number(formData.price) <= 0) {
      errors.price = "Price must be greater than 0"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formDataToSend = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString())
    })

    if (image) {
      formDataToSend.append("image", image)
    }

    createPackage(formDataToSend, {
      onSuccess: () => {
        toast({
          title: "Package created",
          description: "Your package has been successfully created.",
        })
        router.push("/packages")
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to create package. Please try again.",
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
              <Link href="/packages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Create New Package</h1>
          </div>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Package"
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Package Information</CardTitle>
            <CardDescription>Enter the details of your new package</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter package title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                {formErrors.title && <p className="text-sm text-destructive">{formErrors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter package description"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && <p className="text-sm text-destructive">{formErrors.description}</p>}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={1}
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {formErrors.price && <p className="text-sm text-destructive">{formErrors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_unit">Price Unit</Label>
                  <Input
                    id="price_unit"
                    name="price_unit"
                    placeholder="INR"
                    value={formData.price_unit}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Currency or unit for the price (e.g., INR, USD)</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="image">Package Image</Label>
                <div className="mt-2 flex flex-col items-center">
                  {previewUrl ? (
                    <div className="relative mb-6 w-full max-w-md">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Package preview"
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
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full max-w-md h-64 rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or JPEG (max 5MB)</p>
                      </div>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
