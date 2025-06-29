import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./api-client";

interface Cab {
  _id: string;
  title: string;
  description?: string;
  model: string;
  capacity: number;
  imageUrls?: string[];
}

interface CabsResponse {
  data: Cab[];
  meta: {
    length: number;
    total: number;
    page: number;
    limit: number;
  };
  status_code: number;
  application_code: number;
  message: string;
}

interface CabResponse {
  message: string;
  data: Cab;
  status_code: number;
}

export const useCabs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["cabs", page, limit],
    queryFn: async () => {
      const response = await apiClient.get<CabsResponse>(
        `/cabs?page=${page}&limit=${limit}`
      );
      return response.data;
    },
  });
};

export const useCab = (id: string) => {
  return useQuery({
    queryKey: ["cab", id],
    queryFn: async () => {
      const response = await apiClient.get<CabResponse>(`/cabs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateCab = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cabData: FormData) => {
      const response = await apiClient.post<CabResponse>("/cabs", cabData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
    },
  });
};

export const useUpdateCab = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cabData: Partial<Cab>) => {
      console.log("API CALL CABS UPDATE ", cabData);
      const response = await apiClient.patch<CabResponse>(
        `/cabs/${id}`,
        cabData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
      queryClient.invalidateQueries({ queryKey: ["cab", id] });
    },
  });
};

export const useDeleteCab = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<CabResponse>(`/cabs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabs"] });
    },
  });
};
