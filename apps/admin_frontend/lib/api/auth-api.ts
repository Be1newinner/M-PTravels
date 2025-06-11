import { useMutation } from "@tanstack/react-query";
import apiClient from "./api-client";
import { useAuthStore } from "../store/auth-store";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    accessToken: string;
  };
}

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<LoginResponse>(
        "/users/login",
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  return useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      console.log("Logged out successfully");
      logout();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const logOutApi = async () => {
  const response = await apiClient.post("/users/logout");
  return response.data;
};
