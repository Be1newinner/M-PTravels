import apiClient from "./api-client";

// export const useCreateCab = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (cabData: FormData) => {
//       const response = await apiClient.post<CabResponse>("/cabs", cabData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cabs"] });
//     },
//   });
// };

export const imagesUploadApi = async (data: File[]) => {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append("images", file);
  });
  const response = await apiClient.post("/images?type=BUS_IMAGE", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

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
