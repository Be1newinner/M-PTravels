import { get, type Custom_API_Response_Type } from "./apiInstance";

export type NewsType = {
  _id: string;
  title: string;
  updatedAt: string;
  image: string;
  slug: string;
  desc: string
};

export async function fetchNews({ limit = 4 }) {
  const response = await get<Custom_API_Response_Type<NewsType[]>>(
    `blog?limit=${limit}`
  );
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.message || "Unknown Error!");
  }
  console.log(data?.data);
  return data?.data || [];
}
