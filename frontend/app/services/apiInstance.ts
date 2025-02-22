import axios from "axios";
import { type AxiosResponse } from "axios";

const domain = "/";

type ApiResponse<T> = {
  status: "success" | "failed";
  data: T | null;
  code: number;
};

async function request<T>(
  method: string,
  url: string,
  data: any = null
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${domain}${url}`,
      data,
    });
    return {
      status: "success",
      data: response.data,
      code: response.status,
    };
  } catch (error: any) {
    return {
      status: "failed",
      data: error.response?.data || null,
      code: error.response?.status || 500,
    };
  }
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
  return request<T>("get", url);
}

export async function post<T>(url: string, data: any): Promise<ApiResponse<T>> {
  return request<T>("post", url, data);
}

export async function put<T>(url: string, data: any): Promise<ApiResponse<T>> {
  return request<T>("put", url, data);
}

export async function patch<T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  return request<T>("patch", url, data);
}

export async function del<T>(url: string): Promise<ApiResponse<T>> {
  return request<T>("delete", url);
}
