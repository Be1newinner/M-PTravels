import { post, type Custom_API_Response_Type } from "./apiInstance";

export type submitLeadBody = {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: string;
  dropDate: string;
  source?: string;
  message?: string;
};

export type submitLeadResponse = {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: string;
  dropDate: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  message?: string;
};

export async function submitLead({
  name,
  email,
  phone,
  pickupAddress,
  dropAddress,
  pickupDate,
  dropDate,
  source = "",
  message = "",
}: submitLeadBody) {
  const response = await post<Custom_API_Response_Type<submitLeadResponse>>(
    `lead`,
    {
      name,
      email,
      phone,
      pickupAddress,
      dropAddress,
      pickupDate,
      dropDate,
      source,
      message,
    }
  );

  const { data, code } = await response;
  if (code >= 300 || code < 200) {
    // console.log(data)
    throw new Error(data?.message || "Unknown Error!");
  }
  console.log(data?.data);
  return data?.data || {};
}
