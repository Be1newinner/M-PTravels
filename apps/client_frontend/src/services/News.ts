import { get, type Custom_API_Response_Type } from "./apiInstance";

export type NewsType = {
  _id: string;
  title: string;
  updatedAt: string;
  image: string;
  slug: string;
  content: string;
  desc: string;
};

export async function fetchNews({ limit = 4, page = 1 }) {
  const response = await get<Custom_API_Response_Type<NewsType[]>>(
    `/blogs?limit=${limit}&page=${page}`
  );
  const { data, code } = await response;
  if (code != 200) {
    throw new Error(data?.message || "Unknown Error!");
  }
  return { data: data?.data, meta: data?.meta };
}

export async function fetchBlogBySlug(slug: string): Promise<NewsType> {
  const response = await get<Custom_API_Response_Type<NewsType>>(
    `/blogs/${slug}`
  );
  const { data, code } = await response;
  if (code !== 200 || data === null) {
    throw new Error(data?.message || "Unknown Error!");
  }

  return data.data;
}
