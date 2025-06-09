import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// exports.uploadToCloudinary = async (filePath, folder = 'uploads') => {
//   return cloudinary.uploader.upload(filePath, { folder });
// };

export const uploadToCloudinary = async (
  filePath: string,
  folder = "uploads"
) => {
  console.log(filePath);
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "image",
  });
};

export const uploadBufferToCloudinary = async (
  imageBuffer: ArrayBuffer,
  folder = "uploads"
): Promise<UploadApiResponse> =>
  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, uploadResult) => {
          if (error || !uploadResult) return reject(error);
          return resolve(uploadResult);
        }
      )
      .end(imageBuffer);
  });

export const deleteFromCloudinary = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};
