import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";
import { logOutApi } from "./auth-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "https://localhost:5001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface RefreshTokenResponseData {
  accessToken: string;
}

interface RefreshTokenApiResponse {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data: RefreshTokenResponseData;
}

let isRefreshing = false;
let failedQueue: Array<{
  config: AxiosRequestConfig;
  resolve: (value: AxiosResponse<any>) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token && prom.config.headers) {
      prom.config.headers.Authorization = `Bearer ${token}`;
      apiClient.request(prom.config).then(prom.resolve).catch(prom.reject);
    } else {
      prom.reject(
        new AxiosError("Token refresh failed or no new token available.")
      );
    }
  });
  failedQueue = [];
};

/**
 * Helper function to clear authentication state and redirect to login.
 * Encapsulates logout logic for consistency.
 */
const logoutAndRedirect = () => {
  useAuthStore.getState().logout();
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const getAccessTokenFromRefreshTokenAPI = async () => {
  const refreshResponse = await axios.post<RefreshTokenApiResponse>(
    `${API_BASE_URL}/users/refresh-token`,
    {},
    { withCredentials: true }
  );

  // console.log({ refreshResponse });

  return refreshResponse.data?.data?.accessToken;
};

apiClient.interceptors.request.use(
  async (config) => {
    if (
      config.url?.includes("/users/login") ||
      config.url?.includes("/users/logout") ||
      config.url?.includes("/users/refresh-token")
    ) {
      return config;
    }

    let accessToken = useAuthStore.getState().user?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      accessToken = await getAccessTokenFromRefreshTokenAPI();
      config.headers.Authorization = `Bearer ${accessToken}`;
      useAuthStore.getState().refreshAccessToken(accessToken);
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor setup:", error);
    // console.log("STATUS => ", error.status);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // console.log("REST_1");
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // console.log("REST_2");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as any)._retry &&
      !originalRequest.url?.includes("/users/refresh-token")
    ) {
      (originalRequest as any)._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ config: originalRequest, resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const authStore = useAuthStore.getState();

        const newAccessToken = await getAccessTokenFromRefreshTokenAPI();

        console.log("New access token:", newAccessToken);

        if (newAccessToken) {
          authStore.refreshAccessToken(newAccessToken);

          processQueue(null, newAccessToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          console.warn(
            "Refresh token call succeeded but did not return a new access token structure."
          );
          processQueue(
            new AxiosError("No new access token from refresh"),
            null
          );
          await logoutAndRedirect();
          return Promise.reject(
            new AxiosError("No new access token from refresh")
          );
        }
      } catch (refreshError: any) {
        // console.error(
        //   "Failed to refresh token:",
        //   refreshError.response?.data || refreshError.message
        // );
        processQueue(refreshError, null);
        logoutAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      originalRequest.url?.includes("/users/refresh-token")
    ) {
      // console.log("Invalid Refresh Token => ", error.status, error.message);
      await logOutApi();
      await logoutAndRedirect();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
