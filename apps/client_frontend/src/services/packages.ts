import { get, type Custom_API_Response_Type } from "./apiInstance";

export type packagesType = {
  description: string;
  image: string;
  // price: number;
  // price_unit: string;
  title: string;
  _id: string;
  slug: string;
};

export async function fetchPackages({ limit = 4, page = 1, search = "" }) {
  const response = await get<Custom_API_Response_Type<packagesType[]>>(
    `/packages?limit=${limit}&page=${page}${search ? `&search=${search}` : ""}`
  );
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.message || "Unknown Error!");
  }
  // console.log(data?.data);
  return { data: data?.data, meta: data?.meta };
}