"use client";
import { useState } from "react";
import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  no_of_people: string;
  pickup_address: string;
  special_request: string;
  start_date: string;
  end_date: string;
}

type UserDetailsFormProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  formAction: (e: React.FormEvent) => void;
};

const UserDetailsForm = ({
  formData,
  setFormData,
  formAction,
}: UserDetailsFormProps) => {
  // Handle input change dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={formAction}>
      <div className="p-4 py-10 w-full bg-white shadow-lg rounded-lg">
        <p className="text-2xl font-medium">Enter Your Details</p>
        <div className="flex flex-wrap max-sm:flex-wrap mt-4">
          {/** Input Fields */}
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Your Contact Number", type: "tel" },
            {
              name: "no_of_people",
              placeholder: "No. of People",
              type: "number",
            },
            {
              name: "pickup_address",
              placeholder: "Your Pickup Address!",
              type: "text",
            },
          ].map((input) => (
            <div
              key={input.name}
              className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4 nth-last-[2]:w-full"
            >
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData]}
                onChange={handleChange}
                className="h-full w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2"
              />
            </div>
          ))}

          {/** Textarea */}
          <div className="w-full max-sm:w-full pr-4 max-sm:pr-0 my-4">
            <textarea
              name="special_request"
              placeholder="Any other detail or message?"
              value={formData.special_request}
              onChange={handleChange}
              className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 pt-3"
              rows={4}
            ></textarea>
          </div>
        </div>
      </div>

      {/** Trip Date Section */}
      <div className="mt-8 p-4 py-8 w-full bg-white shadow-lg rounded-lg">
        <p className="text-2xl font-medium"> Enter Trip Date </p>
        <div className="flex flex-wrap max-sm:flex-wrap mt-4">
          {[
            { name: "start_date", label: "Trip Start Date" },
            { name: "end_date", label: "Trip End Date" },
          ].map((dateInput) => (
            <div
              key={dateInput.name}
              className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4"
            >
              <label htmlFor={dateInput.name}>{dateInput.label}</label>
              <input
                type="date"
                name={dateInput.name}
                id={dateInput.name}
                value={formData[dateInput.name as keyof typeof formData]}
                onChange={handleChange}
                className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/** Submit Button */}
      <button
        type="submit"
        className="mt-8 mb-2 h-12 w-full bg-blue-500 text-white rounded-lg"
      >
        Book Trip!
      </button>

      {/** Terms & Conditions */}
      <div className="my-4 text-center">
        <span>
          By signing in or creating an account, you agree with our{" "}
          <Link href={PAGES.PRIVACY} className={Colors.textPrimary}>
            Terms & Conditions
          </Link>
        </span>
      </div>
    </form>
  );
};

const BookingDetails = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-4 py-3 w-full rounded-t-lg bg-slate-300 text-2xl max-sm:text-xl font-medium">
          <p>Your Booking Details</p>
        </div>
        <div className="flex text-center items-center max-sm:gap-4 justify-between px-8 max-md:px-4 max-lg:px-48 max-xl:px-60 py-4">
          <div className="">
            <p className="text-lg max-sm:text-sm font-medium">12:00</p>
            <p className="text-lg max-sm:text-sm font-medium text-gray-500">
              DUB
            </p>
          </div>
          <div className="flex items-center gap-4 max-sm:gap-2">
            <p className="text-sm font-medium">From</p>
            <div className="flex flex-col items-center">
              <p>0h 50m</p>
              <Image
                width={1920}
                height={1920}
                src="/route-plan.png"
                alt="plan "
              ></Image>
              <p className="text-sm font-medium">1 Stop</p>
            </div>
            <p className="text-sm font-medium">To</p>
          </div>
          <div>
            <p className="text-lg max-sm:text-sm font-medium">12:50</p>
            <p className="text-lg max-sm:text-sm font-medium text-gray-500">
              SHJ
            </p>
          </div>
        </div>
        <div className="flex justify-between px-8 max-md:px-4 pb-8 py-2 max-xl:px-24">
          <div className="py-2">
            <p className="text-smfont-medium text-gray-500 ">Departure</p>
            <p className="text-lg max-sm:text-base font-medium">14 Aug, 2023</p>
          </div>
          <div className="w-[1px] border-l-2 border-gray-500"></div>
          <div className="py-2">
            <p className="text-sm font-medium text-gray-500">Arrival</p>
            <p className="text-lg max-sm:text-base font-medium">14 Aug, 2023</p>
          </div>
        </div>
        <div className="px-4">
          <hr className="border-gray-400 "></hr>
        </div>
        <div className="text-sm font-medium text-gray-500 py-8 max-sm:py-4 px-4">
          <p>Tpm Line</p>
          <p>Operated by Feel Dubai Airlines</p>
          <p>Economy | Flight FK234 | Aircraft BOEING 777-90</p>
          <p>Adult(s): 25KG luggage free</p>
        </div>
      </div>
    </div>
  );
};

export default function TripFillingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    no_of_people: "",
    pickup_address: "",
    special_request: "",
    start_date: "",
    end_date: "",
  });

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div>
      <div className="w-full flex max-xl:flex-wrap gap-4 max-sm:px-2 max-xl:px-10 bg-gray-100">
        <div className="pl-16 max-xl:pl-0 pr-4 max-xl:pr-0  pt-4 h-full w-8/12 max-xl:w-full">
          <UserDetailsForm
            formData={formData}
            setFormData={setFormData}
            formAction={handleFormSubmit}
          />
        </div>
        <div className="w-4/12 max-xl:w-full max-xl:pr-0 bg-gray-100 pr-16 py-4">
          <BookingDetails />
        </div>
      </div>
    </div>
  );
}
