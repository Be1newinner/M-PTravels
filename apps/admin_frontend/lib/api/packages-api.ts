import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "./api-client"

interface Package {
  _id: string
  title: string
  description: string
  price?: number
  price_unit?: string
  image?: string
  [key: string]: any
}

interface PackagesResponse {
  data: Package[]
  meta: {
    length: number
    total: number
    page: number
    limit: number
  }
  status_code: number
  application_code: number
  message: string
}

interface PackageResponse {
  message: string
  data: Package
  status_code: number
}

export const usePackages = (page = 1, limit = 9) => {
  return useQuery({
    queryKey: ["packages", page, limit],
    queryFn: async () => {
      const response = await apiClient.get<PackagesResponse>(`/packages?page=${page}&limit=${limit}`)
      return response.data
    },
  })
}

export const usePackage = (id: string) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const response = await apiClient.get<PackageResponse>(`/packages/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

export const useCreatePackage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (packageData: FormData) => {
      const response = await apiClient.post<PackageResponse>("/packages", packageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
    },
  })
}

export const useUpdatePackage = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (packageData: FormData) => {
      const response = await apiClient.patch<PackageResponse>(`/packages/${id}`, packageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
      queryClient.invalidateQueries({ queryKey: ["package", id] })
    },
  })
}

export const useDeletePackage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<PackageResponse>(`/packages/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
    },
  })
}
