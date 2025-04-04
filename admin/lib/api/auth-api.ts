import { useMutation } from "@tanstack/react-query"
import apiClient from "./api-client"
import { useAuthStore } from "../store/auth-store"
import { setCookie, deleteCookie } from "../utils/cookies"

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    _id: string
    name: string
    email: string
    accessToken: string
  }
}

export const useLogin = () => {
  const { login } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<LoginResponse>("/users/login", credentials)
      return response.data
    },
    onSuccess: (data) => {
      // Store the token in a cookie
      setCookie("accessToken", data.data.accessToken)
      // Update the auth store
      login(data.data)
    },
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()

  return () => {
    // Clear the token cookie
    deleteCookie("accessToken")
    // Update the auth store
    logout()
  }
}

