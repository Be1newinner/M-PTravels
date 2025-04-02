import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "./api-client"

interface Lead {
  _id: string
  name: string
  email: string
  phone: string
  pickupAddress?: string
  dropAddress?: string
  pickupDate?: string
  dropDate?: string
  status?: string
  [key: string]: any
}

interface LeadsResponse {
  status_code: number
  message: string
  data: {
    data: Lead[]
    pagination: {
      total_records: number
      total_pages: number
      limit: number
      current_page: number
      next_page: number | null
      prev_page: number | null
    }
  }
}

interface LeadResponse {
  status_code: number
  message: string
  data: Lead
}

interface LeadsQueryParams {
  page: number
  limit: number
  filters?: {
    name?: string
    email?: string
    phone?: string
    status?: string
  }
}

export const useLeads = (params: LeadsQueryParams) => {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: async () => {
      const response = await apiClient.post<LeadsResponse>("/leads/all", params)
      return response.data
    },
  })
}

export const useCreateLead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (leadData: Omit<Lead, "_id">) => {
      const response = await apiClient.post<LeadResponse>("/leads", leadData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
    },
  })
}

