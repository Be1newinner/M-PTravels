"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Plus, MapPin, IndianRupee, Loader2, AlertTriangle } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { usePackages, useDeletePackage } from "@/lib/api/packages-api"
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

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null)
  const itemsPerPage = 9

  const { data, isLoading, isError, refetch } = usePackages(currentPage, itemsPerPage)
  const { mutate: deletePackage, isPending: isDeleting } = useDeletePackage()

  // Filter packages based on search term with proper null checks
  const filteredPackages = data?.data
    ? data.data.filter((pkg) => {
        return (
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (pkg.description && pkg.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })
    : []

  const handleDeletePackage = (id: string) => {
    setPackageToDelete(id)
  }

  const confirmDeletePackage = () => {
    if (packageToDelete) {
      deletePackage(packageToDelete, {
        onSuccess: () => {
          toast({
            title: "Package deleted",
            description: "Package has been successfully deleted.",
          })
          refetch()
          setPackageToDelete(null)
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to delete package. Please try again.",
            variant: "destructive",
          })
          console.error(error)
        },
      })
    }
  }

  const totalPages = data?.meta?.total ? Math.ceil(data.meta.total / itemsPerPage) : 0

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
          <h2 className="text-xl font-bold mb-2">Error loading packages</h2>
          <p className="text-muted-foreground mb-4">There was a problem loading the packages.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Trip Packages</h1>
          <Button asChild>
            <Link href="/packages/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Package
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No packages found</p>
            <Button asChild>
              <Link href="/packages/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Package
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg._id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg?height=200&width=300"}
                    alt={pkg.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col space-y-1.5">
                    {pkg.location && (
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{pkg.location}</span>
                      </div>
                    )}
                    {pkg.price && (
                      <div className="flex items-center text-sm font-semibold">
                        <IndianRupee className="mr-1 h-4 w-4" />
                        <span>
                          {pkg.price.toLocaleString("en-IN")} {pkg.price_unit || ""}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/packages/${pkg._id}/edit`}>Edit</Link>
                  </Button>
                  <AlertDialog
                    open={packageToDelete === pkg._id}
                    onOpenChange={(open) => !open && setPackageToDelete(null)}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" onClick={() => handleDeletePackage(pkg._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the package.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeletePackage} disabled={isDeleting}>
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 0 && (
          <div className="flex items-center justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNumber: number

                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
