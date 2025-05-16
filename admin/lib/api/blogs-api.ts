import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "./api-client"

interface Blog {
  _id: string
  title: string
  slug?: string
  description?: string
  updatedAt: string
  image?: string
  [key: string]: any
}

interface BlogsResponse {
  data: Blog[]
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

interface BlogResponse {
  message: string
  data: Blog
  status_code: number
}

export const useBlogs = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: async () => {
      const response = await apiClient.get<BlogsResponse>(`/blogs?page=${page}&limit=${limit}`)
      return response.data
    },
  })
}

export const useSearchBlogs = (query: string) => {
  return useQuery({
    queryKey: ["blogs", "search", query],
    queryFn: async () => {
      const response = await apiClient.get<BlogsResponse>(`/blogs/search?query=${query}`)
      return response.data
    },
    enabled: !!query && query.length > 2, // Only search when query is at least 3 characters
  })
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (blogData: FormData) => {
      const response = await apiClient.post<BlogResponse>("/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<BlogResponse>(`/blogs/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })
}
