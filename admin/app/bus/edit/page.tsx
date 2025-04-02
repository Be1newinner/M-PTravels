"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import DashboardLayout from "../../dashboard-layout"

const formSchema = z.object({
  name: z.string().min(2, { message: "Bus name must be at least 2 characters" }),
  model: z.string().min(2, { message: "Model must be at least 2 characters" }),
  registrationNumber: z.string().min(5, { message: "Registration number is required" }),
  seatingCapacity: z.coerce.number().min(1, { message: "Seating capacity must be at least 1" }),
  color: z.string().min(2, { message: "Color is required" }),
  fuelType: z.string().min(1, { message: "Fuel type is required" }),
  manufacturingYear: z.coerce
    .number()
    .min(1900, { message: "Manufacturing year must be valid" })
    .max(new Date().getFullYear(), { message: "Manufacturing year cannot be in the future" }),
  description: z.string().optional(),
  amenities: z.string().optional(),
})

// Mock data for initial form values
const mockBusData = {
  name: "Luxury Travel Bus",
  model: "Volvo 9400",
  registrationNumber: "MH 01 AB 1234",
  seatingCapacity: 45,
  color: "White",
  fuelType: "Diesel",
  manufacturingYear: 2020,
  description: "Luxury bus with all modern amenities for comfortable travel.",
  amenities: "AC, WiFi, USB Charging, Reclining Seats, Entertainment System, Toilet",
  images: [
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
    "/placeholder.svg?height=300&width=500",
  ],
}

export default function EditBusPage() {
  const [images, setImages] = useState<string[]>(mockBusData.images)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mockBusData.name,
      model: mockBusData.model,
      registrationNumber: mockBusData.registrationNumber,
      seatingCapacity: mockBusData.seatingCapacity,
      color: mockBusData.color,
      fuelType: mockBusData.fuelType,
      manufacturingYear: mockBusData.manufacturingYear,
      description: mockBusData.description,
      amenities: mockBusData.amenities,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSaving(false)
      toast({
        title: "Bus details updated",
        description: "Your bus details have been successfully updated.",
      })
    }, 1000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const newImages = Array.from(e.target.files || []).map((file) => {
        // In a real app, you would upload the file to your server/cloud storage
        // and get back a URL. Here we're just using a placeholder.
        return URL.createObjectURL(file)
      })

      setImages([...images, ...newImages])
      setIsUploading(false)

      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) uploaded successfully.`,
      })
    }, 1500)
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
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
                      form.reset()
                      setImages(mockBusData.images)
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
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
              {isSaving ? (
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bus Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter bus name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter bus model" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter registration number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="seatingCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seating Capacity</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter bus color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fuel Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select fuel type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Diesel">Diesel</SelectItem>
                                <SelectItem value="Petrol">Petrol</SelectItem>
                                <SelectItem value="CNG">CNG</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="manufacturingYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturing Year</FormLabel>
                            <FormControl>
                              <Input type="number" min={1900} max={new Date().getFullYear()} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter bus description" className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormDescription>Provide a detailed description of your bus.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amenities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amenities</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter bus amenities" className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormDescription>
                            List the amenities available in your bus, separated by commas.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
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

                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Images saved",
                          description: "Your bus images have been successfully saved.",
                        })
                      }}
                    >
                      Save Images
                    </Button>
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

