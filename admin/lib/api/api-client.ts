import axios from "axios"
import { getCookie } from "../utils/cookies"

// const API_BASE_URL = "https://firefly-top-jackal.ngrok-free.app"
const API_BASE_URL = "http://localhost:5001"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include the auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
  console.log(error)
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear cookies and redirect to login
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default apiClient

