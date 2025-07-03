import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./api-client";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content?: string;
  updatedAt: string;
  image?: string | null;
  desc?: string;
  [key: string]: any;
}

interface BlogsResponse {
  data: Blog[];
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

interface BlogResponse {
  message: string;
  data: Blog;
  status_code: number;
}

export const useBlogs = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: async () => {
      const response = await apiClient.get<BlogsResponse>(
        `/blogs?page=${page}&limit=${limit}`
      );
      return response.data;
    },
  });
};

export const useSearchBlogs = (query: string) => {
  return useQuery({
    queryKey: ["blogs", "search", query],
    queryFn: async () => {
      const response = await apiClient.get<BlogsResponse>(
        `/blogs/search?query=${query}`
      );
      return response.data;
    },
    enabled: !!query && query.length > 2,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await apiClient.get<BlogResponse>(`/blogs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      blogData: Omit<Blog, "_id" | "updatedAt" | "createdAt">
    ) => {
      const response = await apiClient.post<BlogResponse>("/blogs", blogData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUpdateBlog = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (blogData: Partial<Blog>) => {
      const response = await apiClient.patch<BlogResponse>(
        `/blogs/${slug}`,
        blogData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", slug] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<BlogResponse>(`/blogs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
