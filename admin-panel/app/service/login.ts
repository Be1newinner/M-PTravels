import { get, type Custom_API_Response_Type } from "./apiInstance";

export type loginType = {
  description: string;
  image_url: string;
  price: number;
  price_unit: string;
  title: string;
  _id: string;
  slug: string;
};

export async function loginAPI() {
  const response = await get<Custom_API_Response_Type<loginType[]>>("package");
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.messages || "Unknown Error!");
  }
  console.log(data?.data);
  return data?.data || [];
}
