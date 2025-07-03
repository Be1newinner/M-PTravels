import React from "react";
import { imagesUploadApi, imagesRemoveApi } from "../api/images-api";

type ImageChangeState = {
  imagesToAdd: File[];
  imagesToRemove: string[];
};

// use: It is called when we click the upload image file input for adding image locally
export const handleImageAddition = (
  e: React.ChangeEvent<HTMLInputElement>,
  isUploading: boolean,
  setImageChangesToBeMade: React.Dispatch<
    React.SetStateAction<ImageChangeState>
  >,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  uploadRef: React.RefObject<Record<string, File>>
) => {
  if (!e.target.files || e.target.files.length === 0) return;
  if (isUploading) return;

  const files = Array.from(e.target.files);

  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    uploadRef.current[url] = file;
  });

  setImageChangesToBeMade((prev) => ({
    ...prev,
    imagesToAdd: [...prev.imagesToAdd, ...files],
  }));

  setImages((prev) => [...prev, ...Object.keys(uploadRef.current)]);
};

// use: This will remove the image first from local then global if exist globally
export const handleRemoveImage = (
  image_url: string,
  setImageChangesToBeMade: React.Dispatch<
    React.SetStateAction<ImageChangeState>
  >,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  uploadRef: React.RefObject<Record<string, File>>
) => {
  setImages((prev) => prev.filter((img) => img !== image_url));
  if (image_url.startsWith("blob:")) {
    const respectedFile = uploadRef.current[image_url];
    setImageChangesToBeMade((prev) => ({
      ...prev,
      imagesToAdd: prev.imagesToAdd.filter(
        (img) => img.name !== respectedFile.name
      ),
    }));
    // console.log("image_url 3 => ", image_url, imageUploadMapRef[image_url]);
  } else {
    setImageChangesToBeMade((prev) => ({
      ...prev,
      imagesToRemove: [...prev.imagesToRemove, image_url],
    }));
  }
};

export async function imageUploadUtility(
  imageChangesToBeMade: ImageChangeState,
  type: string
): Promise<string[] | []> {
  if (!imageChangesToBeMade?.imagesToAdd?.length) return [];

  const formData = new FormData();
  imageChangesToBeMade?.imagesToAdd?.forEach((file) =>
    formData.append("images", file)
  );

  const res = await imagesUploadApi(formData, type);

  if (res.statusText === "OK") return res?.data?.images.map((img) => img.url);
  else return [];
}

export async function imageDeleteUtility(
  imageUrlsToDelete: string[]
): Promise<boolean> {
  if (!imageUrlsToDelete.length) return true; 

  try {
    const deletePromises = imageUrlsToDelete.map((url) => imagesRemoveApi(url));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error deleting images:", error);
    return false;
  }
}
