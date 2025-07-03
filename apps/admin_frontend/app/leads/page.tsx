"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Filter, Download, Loader2, AlertTriangle, Plus } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { useLeads, useCreateLead } from "@/lib/api/leads-api"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const itemsPerPage = 10

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    dropAddress: "",
    pickupDate: "",
    dropDate: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const { data, isLoading, isError, refetch } = useLeads({
    page: currentPage,
    limit: itemsPerPage,
    filters: searchTerm ? { name: searchTerm } : undefined,
  })

  const { mutate: createLead, isPending: isCreating } = useCreateLead()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.phone || formData.phone.length < 10) {
      errors.phone = "Phone number must be at least 10 characters"
    }

    if (!formData.pickupAddress || formData.pickupAddress.length < 5) {
      errors.pickupAddress = "Pickup address must be at least 5 characters"
    }

    if (!formData.dropAddress || formData.dropAddress.length < 5) {
      errors.dropAddress = "Drop address must be at least 5 characters"
    }

    if (!formData.pickupDate) {
      errors.pickupDate = "Pickup date is required"
    }

    if (!formData.dropDate) {
      errors.dropDate = "Drop date is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    createLead(formData, {
      onSuccess: () => {
        toast({
          title: "Lead created",
          description: "New lead has been successfully created.",
        })
        setIsCreateDialogOpen(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupAddress: "",
          dropAddress: "",
          pickupDate: "",
          dropDate: "",
        })
        refetch()
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to create lead. Please try again.",
          variant: "destructive",
        })
        console.error(error)
      },
    })
  }

  // Filter leads based on status
  const filteredLeads =
    data?.data.data.filter((lead) => {
      return statusFilter === "all" || lead.status === statusFilter
    }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500"
      case "Contacted":
        return "bg-yellow-500"
      case "Qualified":
        return "bg-green-500"
      case "Lost":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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
          <h2 className="text-xl font-bold mb-2">Error loading leads</h2>
          <p className="text-muted-foreground mb-4">There was a problem loading the leads.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Lead</DialogTitle>
                  <DialogDescription>Fill in the details to create a new lead.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {formErrors.email && <p className="text-sm text-destructive">{formErrors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {formErrors.phone && <p className="text-sm text-destructive">{formErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address</Label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      placeholder="123 Main Street"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                    />
                    {formErrors.pickupAddress && <p className="text-sm text-destructive">{formErrors.pickupAddress}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dropAddress">Drop Address</Label>
                    <Input
                      id="dropAddress"
                      name="dropAddress"
                      placeholder="456 Elm Street"
                      value={formData.dropAddress}
                      onChange={handleInputChange}
                    />
                    {formErrors.dropAddress && <p className="text-sm text-destructive">{formErrors.dropAddress}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Input
                        id="pickupDate"
                        name="pickupDate"
                        type="datetime-local"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                      />
                      {formErrors.pickupDate && <p className="text-sm text-destructive">{formErrors.pickupDate}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropDate">Drop Date</Label>
                      <Input
                        id="dropDate"
                        name="dropDate"
                        type="datetime-local"
                        value={formData.dropDate}
                        onChange={handleInputChange}
                      />
                      {formErrors.dropDate && <p className="text-sm text-destructive">{formErrors.dropDate}</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Lead"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>Manage and filter all your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Pickup Address</TableHead>
                    <TableHead>Drop Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.pickupAddress}</TableCell>
                      <TableCell>{lead.dropAddress}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(lead.status || "New")} text-white`}>
                          {lead.status || "New"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {data?.data.pagination && data.data.pagination.total_pages > 1 && (
              <div className="mt-4 flex items-center justify-end">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        // disabled={currentPage === 1}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, data.data.pagination.total_pages) }).map((_, i) => {
                      let pageNumber: number

                      if (data.data.pagination.total_pages <= 5) {
                        pageNumber = i + 1
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1
                      } else if (currentPage >= data.data.pagination.total_pages - 2) {
                        pageNumber = data.data.pagination.total_pages - 4 + i
                      } else {
                        pageNumber = currentPage - 2 + i
                      }

                      return (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                    {data.data.pagination.total_pages > 5 && currentPage < data.data.pagination.total_pages - 2 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(data.data.pagination.total_pages)}>
                            {data.data.pagination.total_pages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.data.pagination.total_pages))}
                        // disabled={currentPage === data.data.pagination.total_pages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
