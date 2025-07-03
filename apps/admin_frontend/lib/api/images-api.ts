import { AxiosResponse } from "axios";
import apiClient from "./api-client";

interface ImageUploadApiResponse {
  images: {
    url: string;
    public_id: string;
  }[];
  message: string;
}

interface ImageDeleteApiResponse {
  message: string;
  result: {
    result: string;
  };
}

// Helper to extract public_id from a Cloudinary URL
const getPublicIdFromCloudinaryUrl = (url: string): string | null => {
  try {
    const urlParts = url.split("/");
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex > -1 && urlParts.length > uploadIndex + 1) {
      const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join("/");
      return publicIdWithExtension.split(".")[0];
    }
  } catch (e) {
    console.error("Error extracting public ID from URL:", url, e);
  }
  return null;
};

export async function imagesUploadApi(
  formData: FormData,
  type?: string
): Promise<AxiosResponse<ImageUploadApiResponse>> {
  const response = await apiClient.post(`/images?type=${type}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function imagesRemoveApi(
  imageUrl: string // Now accepts a full image URL
): Promise<AxiosResponse<ImageDeleteApiResponse>> {
  const publicId = getPublicIdFromCloudinaryUrl(imageUrl);
  if (!publicId) {
    throw new Error(`Could not extract public ID from image URL: ${imageUrl}`);
  }
  const response = await apiClient.delete(`/images?publicId=${publicId}`);
  return response;
}
