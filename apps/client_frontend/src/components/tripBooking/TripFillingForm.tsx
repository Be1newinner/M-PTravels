"use client";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitLead } from "@/services/leads";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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

// Props for BookingDetails component
interface BookingDetailsProps {
  startDate: string;
  endDate: string;
}

const BookingDetails = ({ startDate, endDate }: BookingDetailsProps) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-4 py-3 w-full rounded-t-lg bg-slate-300 text-2xl max-sm:text-xl font-medium">
          <p>Your Booking Details</p>
        </div>
        <div className="flex text-center items-center justify-between px-8 max-md:px-4 py-4">
          <div className="py-2">
            <p className="text-sm font-medium text-gray-500 ">Departure</p>
            <p className="text-lg max-sm:text-base font-medium">{startDate}</p>
          </div>
          <div className="w-[1px] border-l-2 border-gray-500"></div>
          <div className="py-2">
            <p className="text-sm font-medium text-gray-500">Arrival</p>
            <p className="text-lg max-sm:text-base font-medium">{endDate}</p>
          </div>
        </div>
        <div className="px-4">
          <hr className="border-gray-400 "></hr>
        </div>
        <div className="text-sm font-medium text-gray-500 py-8 max-sm:py-4 px-4">
          <p>Trip details will be confirmed upon booking.</p>
          <p>Operated by M and P Travels</p>
          <p>Comfortable seating | Luggage allowance as per package</p>
          <p>Please check your booking confirmation for final details.</p>
        </div>
      </div>
    </div>
  );
};

export default function TripFillingForm({ packageID }: { packageID: string }) {
  const [isCooldown, setIsCooldown] = useState(false);

  const {
    register,
    handleSubmit,
    watch, // Use watch to get current form values
    setValue,
    formState: { errors },
  } = useForm<FormDataType>();

  // Watch for changes in start_date and end_date
  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setValue("start_date", today);
    setValue("end_date", today);
  }, [setValue]);

  const onSubmit = async (data: FormDataType) => {
    if (isCooldown) {
      toast.error("Form already submitted! Please wait 5 seconds.", {
        position: "top-right",
      });
      return;
    }

    try {
      await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        pickupAddress: data.pickup_address,
        dropAddress: "", // Assuming no drop address for this form
        pickupDate: data.start_date,
        dropDate: data.end_date,
        message: data.special_request,
        packageId: packageID, // Pass the packageID
      });

      toast.success("Trip booked successfully!", { position: "top-right" });

      // Start cooldown
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 5000);
    } catch (error) {
      toast.error(`${(error as Error).message} Try again!`, {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="w-full flex max-xl:flex-wrap gap-4 max-sm:px-2 max-xl:px-10 bg-gray-100">
        <div className="pl-16 max-xl:pl-0 pr-4 max-xl:pr-0  pt-4 h-full w-8/12 max-xl:w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 py-10 w-full bg-white shadow-lg rounded-lg">
              <p className="text-2xl font-medium">Enter Your Details</p>
              <div className="flex flex-wrap max-sm:flex-wrap mt-4">
                {/** Input Fields */}
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className={errors.name ? "border-2 border-red-500" : ""}
                    {...register("name", { required: "Full Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    className={errors.email ? "border-2 border-red-500" : ""}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <Input
                    type="tel"
                    placeholder="Your Contact Number"
                    className={errors.phone ? "border-2 border-red-500" : ""}
                    {...register("phone", {
                      required: "Contact Number is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 digits required",
                      },
                      maxLength: {
                        value: 15,
                        message: "Maximum 15 digits allowed",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <Input
                    type="number"
                    placeholder="No. of People"
                    className={errors.no_of_people ? "border-2 border-red-500" : ""}
                    {...register("no_of_people", {
                      required: "Number of people is required",
                      min: { value: 1, message: "At least 1 person required" },
                    })}
                  />
                  {errors.no_of_people && (
                    <p className="text-red-500 text-sm">
                      {errors.no_of_people.message}
                    </p>
                  )}
                </div>
                <div className="h-12 w-full pr-4 max-sm:pr-0 my-4">
                  <Input
                    type="text"
                    placeholder="Your Pickup Address!"
                    className={errors.pickup_address ? "border-2 border-red-500" : ""}
                    {...register("pickup_address", {
                      required: "Pickup address is required",
                    })}
                  />
                  {errors.pickup_address && (
                    <p className="text-red-500 text-sm">
                      {errors.pickup_address.message}
                    </p>
                  )}
                </div>

                {/** Textarea */}
                <div className="w-full pr-4 max-sm:pr-0 my-4">
                  <textarea
                    placeholder="Any other detail or message?"
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pt-3 ${
                      errors.special_request ? "border-2 border-red-500" : ""
                    }`}
                    rows={4}
                    {...register("special_request")}
                  ></textarea>
                  {errors.special_request && (
                    <p className="text-red-500 text-sm">
                      {errors.special_request.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/** Trip Date Section */}
            <div className="mt-8 p-4 py-8 w-full bg-white shadow-lg rounded-lg">
              <p className="text-2xl font-medium"> Enter Trip Date </p>
              <div className="flex flex-wrap max-sm:flex-wrap mt-4">
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <label htmlFor="start_date">Trip Start Date</label>
                  <Input
                    type="date"
                    id="start_date"
                    className={errors.start_date ? "border-2 border-red-500" : ""}
                    {...register("start_date", {
                      required: "Start date is required",
                    })}
                  />
                  {errors.start_date && (
                    <p className="text-red-500 text-sm">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <label htmlFor="end_date">Trip End Date</label>
                  <Input
                    type="date"
                    id="end_date"
                    className={errors.end_date ? "border-2 border-red-500" : ""}
                    {...register("end_date", {
                      required: "End date is required",
                    })}
                  />
                  {errors.end_date && (
                    <p className="text-red-500 text-sm">
                      {errors.end_date.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/** Submit Button */}
            <Button
              type="submit"
              className="mt-8 mb-2 h-12 w-full"
              disabled={isCooldown}
            >
              Book Trip!
            </Button>

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
        </div>
        <div className="w-4/12 max-xl:w-full max-xl:pr-0 bg-gray-100 pr-16 py-4">
          <BookingDetails startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
}