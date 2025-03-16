import { get, type Custom_API_Response_Type } from "./apiInstance";

export type packagesType = {
  description: string;
  image_url: string;
  price: number;
  price_unit: string;
  title: string;
  _id: string;
  slug: string;
};

export async function fetchPackages({ limit = 4 }) {
  const response = await get<Custom_API_Response_Type<packagesType[]>>(
    `package?limit=${limit}`
  );
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.message || "Unknown Error!");
  }
  console.log(data?.data);
  return data?.data || [];
}
