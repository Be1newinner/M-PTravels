// import { Buffer } from 'buffer';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from "cloudinary";

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

/**
 * Uploads an image buffer to Cloudinary.
 * Provides robust error handling and clear return values.
 *
 * @param imageBuffer The image data as a Node.js Buffer.
 * @param folder The target folder in Cloudinary (defaults to 'uploads').
 * @param options Optional Cloudinary upload options to merge (e.g., tags, public_id).
 * @returns A Promise resolving to an object indicating success or failure,
 * along with the Cloudinary response on success or an error object on failure.
 */
export const uploadBufferToCloudinary = async (
  imageBuffer: Buffer, // Type as Node.js Buffer
  folder: string = "uploads",
  options?: Omit<UploadApiOptions, "folder" | "resource_type">
): Promise<{
  success: boolean;
  data?: UploadApiResponse;
  message: string;
  error?: unknown;
}> => {
  if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
    console.error(
      "Invalid or empty imageBuffer provided for Cloudinary upload."
    );
    return { success: false, message: "Invalid or empty image buffer." };
  }

  try {
    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
            ...options, 
          } as UploadApiOptions,
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload stream error:", error);
              return reject(error);
            }
            if (!result) {
              console.error("Cloudinary upload stream returned no result.");
              return reject(
                new Error("Cloudinary upload stream returned no result.")
              );
            }
            resolve(result);
          }
        );

        uploadStream.end(imageBuffer);
      }
    );

    console.log(
      `Cloudinary upload successful for public ID: ${uploadResult.public_id}`
    );
    return { success: true, data: uploadResult, message: "Upload successful." };
  } catch (error: unknown) {
    console.error(
      `Failed to upload image to Cloudinary in folder '${folder}':`,
      (error as Error).message,
      error
    );

    let errorMessage = `Failed to upload image to Cloudinary.`;
    // if (error.http_code) {
    //   errorMessage += ` HTTP Code: ${error.http_code}.`;
    // }
    if ((error as Error).message) {
      errorMessage += ` Details: ${(error as Error).message}.`;
    }

    return {
      success: false,
      message: errorMessage,
      error: error,
    };
  }
};

export const deleteFromCloudinary = async (
  publicId: string
): Promise<{ success: boolean; message: string; error?: unknown }> => {
  if (!publicId) {
    console.warn(
      "Attempted to delete from Cloudinary with an empty public ID."
    );
    return { success: false, message: "Public ID cannot be empty." };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result && result.result === "ok") {
      console.log(
        `Cloudinary asset with public ID '${publicId}' deleted successfully.`
      );
      return { success: true, message: `Asset '${publicId}' deleted.` };
    } else if (result && result.result === "not found") {
      console.warn(
        `Cloudinary asset with public ID '${publicId}' not found for deletion.`
      );
      return {
        success: false,
        message: `Asset '${publicId}' not found.`,
        error: result,
      };
    } else {
      console.error(
        `Unexpected Cloudinary deletion result for public ID '${publicId}':`,
        result
      );
      return {
        success: false,
        message: `Unexpected Cloudinary response.`,
        error: result,
      };
    }
  } catch (error: unknown) {
    console.error(
      `Failed to delete Cloudinary asset with public ID '${publicId}':`,
      (error as Error).message,
      error
    );

    return {
      success: false,
      message: `Failed to delete asset '${publicId}'. Reason: ${(error as Error).message || "Unknown error."}`,
      error: error,
    };
  }
};
