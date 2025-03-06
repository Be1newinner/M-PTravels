import { get, post, type Custom_API_Response_Type } from "./apiInstance";

export type loginType = {
  description: string;
  image_url: string;
  price: number;
  price_unit: string;
  title: string;
  _id: string;
  slug: string;
};

export async function loginAPI(payload: { email: string; password: string }) {
  const response = await post<Custom_API_Response_Type<loginType[]>>(
    "user/login",
    payload
  );
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.messages || "Unknown Error!");
  }
  console.log(data?.data);
  return data?.data || [];
}
