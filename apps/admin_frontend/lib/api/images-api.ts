import { AxiosResponse } from "axios";
import apiClient from "./api-client";

interface ImageUploadApiResponse {
  images: {
    url: string;
    public_id: string;
  }[];
  message: string;
}

export async function imagesUploadApi(
  formData: FormData
): Promise<AxiosResponse<ImageUploadApiResponse>> {
  const response = await apiClient.post("/images?type=BUS_IMAGE", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// let data = new FormData();
// data.append('images', fs.createReadStream('/C:/Users/be1ne/OneDrive/Pictures/Screenshots 1/Screenshot 2025-06-02 172230.png'));
// data.append('images', fs.createReadStream('/C:/Users/be1ne/OneDrive/Pictures/Screenshots 1/Screenshot 2025-06-03 100009.png'));
// data.append('images', fs.createReadStream('/C:/Users/be1ne/OneDrive/Pictures/Screenshots 1/Screenshot 2025-06-04 152609.png'));

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://localhost:5001/images/?type=BUS_IMAGE',
//   headers: {
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
