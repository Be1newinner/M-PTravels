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
import { Search, Plus, Calendar, Loader2, AlertTriangle, Trash2 } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { useBlogs, useSearchBlogs, useDeleteBlog } from "@/lib/api/blogs-api"
import { toast } from "@/components/ui/use-toast"
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

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
  const itemsPerPage = 6

  const { data, isLoading, isError, refetch } = useBlogs(currentPage, itemsPerPage)
  const { data: searchResults, isLoading: isSearching } = useSearchBlogs(searchTerm)
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog()

  const blogsToDisplay = searchTerm && searchResults ? searchResults.data : data?.data || []

  const handleDeleteBlog = (id: string) => {
    setBlogToDelete(id)
  }

  const confirmDeleteBlog = () => {
    if (blogToDelete) {
      deleteBlog(blogToDelete, {
        onSuccess: () => {
          toast({
            title: "Blog deleted",
            description: "Blog post has been successfully deleted.",
          })
          refetch()
          setBlogToDelete(null)
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to delete blog post. Please try again.",
            variant: "destructive",
          })
          console.error(error)
        },
      })
    }
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
          <h2 className="text-xl font-bold mb-2">Error loading blogs</h2>
          <p className="text-muted-foreground mb-4">There was a problem loading the blog posts.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <Button asChild>
            <Link href="/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blog posts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isSearching && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!isSearching && blogsToDisplay.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No blog posts found</p>
            <Button asChild>
              <Link href="/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Post
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsToDisplay.map((blog) => (
              <Card key={blog._id} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={blog.image || "/placeholder.svg?height=200&width=300"}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {blog.slug || blog.description?.substring(0, 100)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/blog/${blog._id}/edit`}>Edit Post</Link>
                  </Button>
                  <AlertDialog open={blogToDelete === blog._id} onOpenChange={(open) => !open && setBlogToDelete(null)}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteBlog(blog._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteBlog} disabled={isDeleting}>
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

        {!searchTerm && data?.meta && data.meta.total > itemsPerPage && (
          <div className="flex items-center justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, Math.ceil(data.meta.total / itemsPerPage)) }).map((_, i) => {
                  let pageNumber: number
                  const totalPages = Math.ceil(data.meta.total / itemsPerPage)

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

                {data.meta.total > itemsPerPage * 5 && currentPage < Math.ceil(data.meta.total / itemsPerPage) - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(Math.ceil(data.meta.total / itemsPerPage))}>
                        {Math.ceil(data.meta.total / itemsPerPage)}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.meta.total / itemsPerPage)))
                    }
                    disabled={currentPage === Math.ceil(data.meta.total / itemsPerPage)}
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
