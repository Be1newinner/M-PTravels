/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { type AxiosResponse } from "axios";

const BACKEND_SERVER_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_SERVER_DOMAIN;

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
    const fullUrl = `${BACKEND_SERVER_DOMAIN}${url}`;
    console.log("API Request:", fullUrl);
    const response: AxiosResponse<T> = await axios({
      method,
      url: fullUrl,
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

export type Custom_API_Response_Type<T> = {
  application_code: number;
  data: T;
  message: string;
  status_code: number;
  meta: any;
};
