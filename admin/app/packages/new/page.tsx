"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Upload, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DashboardLayout from "../../dashboard-layout"
import { useCreatePackage } from "@/lib/api/packages-api"

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  price_unit: z.string().default("INR"),
})

export default function NewPackagePage() {
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { mutate: createPackage, isPending } = useCreatePackage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      price_unit: "INR",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()

    // Append form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })

    // Append image if available
    if (image) {
      formData.append("image", image)
    }

    createPackage(formData, {
      onSuccess: (data) => {
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

    // Create a preview URL
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
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
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
                        <Textarea placeholder="Enter package description" className="min-h-[150px]" {...field} />
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
                        <FormDescription>Currency or unit for the price (e.g., INR, USD)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div>
                  <FormLabel>Package Image</FormLabel>
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
                        <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
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
  )
}

