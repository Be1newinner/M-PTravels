import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./api-client";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  pickupAddress?: string;
  dropAddress?: string;
  pickupDate?: string;
  dropDate?: string;
  status?: string;
  [key: string]: any;
}

interface LeadsResponse {
  status_code: number;
  message: string;
  data: {
    data: Lead[];
    pagination: {
      total_records: number;
      total_pages: number;
      limit: number;
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
    };
  };
}

interface LeadResponse {
  status_code: number;
  message: string;
  data: Lead;
}

interface LeadCountResponse {
  status_code: number;
  message: string;
  data: { count: number };
}

interface LeadsQueryParams {
  page: number;
  limit: number;
  filters?: {
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
  };
}

export const useLeads = (params: LeadsQueryParams) => {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: async () => {
      const response = await apiClient.post<LeadsResponse>(
        "/leads/all",
        params
      );
      return response.data;
    },
  });
};

export const useTotalLeadsCount = () => {
  return useQuery({
    queryKey: ["leads", "count", "total"],
    queryFn: async () => {
      const response = await apiClient.get<LeadCountResponse>(
        "/leads/count/total"
      );
      return response.data.data.count || 0;
    },
  });
};

export const useLeadsTodayCount = () => {
  return useQuery({
    queryKey: ["leads", "count", "today"],
    queryFn: async () => {
      const response = await apiClient.get<LeadCountResponse>(
        "/leads/count/today"
      );
      return response.data?.data?.count || 0;
    },
  });
};

export const useLeadsThisMonthCount = () => {
  return useQuery({
    queryKey: ["leads", "count", "month"],
    queryFn: async () => {
      const response = await apiClient.get<LeadCountResponse>(
        "/leads/count/month"
      );
      return response.data?.data?.count || 0;
    },
  });
};

// Assuming recent leads endpoint returns an array of leads directly or wrapped in a 'data' object.
// Adjust Lead[] or { data: Lead[] } based on actual API response.
interface RecentLeadsResponse {
  status_code: number;
  message: string;
  data: Lead[]; // Or Lead[] if not nested under 'data'
}

export const useRecentLeads = () => {
  return useQuery({
    queryKey: ["leads", "recent"],
    queryFn: async () => {
      // Assuming the API returns { data: Lead[] }
      // If it returns Lead[] directly, change to:
      // const response = await apiClient.get<Lead[]>("/leads/recent")
      const response = await apiClient.get<RecentLeadsResponse>(
        "/leads/recent"
      );
      return response.data?.data  || [];
    },
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadData: Omit<Lead, "_id">) => {
      const response = await apiClient.post<LeadResponse>("/leads", leadData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};
