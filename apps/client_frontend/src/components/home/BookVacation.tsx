"use client";
import { useForm } from "react-hook-form";
import { GoArrowSwitch } from "react-icons/go";
import Available from "./Available";
import { Colors } from "@/constants/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitLead } from "@/services/leads";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function BookVacation() {
  type formDataType = {
    departing: string;
    returning: string;
    from: string;
    to: string;
    fullname: string;
    phone: string;
    passengers: string;
  };

  const [isCooldown, setIsCooldown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formDataType>();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setValue("departing", today);
    setValue("returning", today);
  }, [setValue]);

  const onSubmit = async (data: formDataType) => {
    if (isCooldown) {
      toast.error("Form already submitted! Please wait 5 seconds.", {
        position: "top-right",
      });
      return;
    }

    try {
      await submitLead({
        name: data.fullname,
        email: "",
        phone: data.phone,
        pickupAddress: data.from,
        dropAddress: data.to,
        pickupDate: data.departing,
        dropDate: data.returning,
        source: "0001",
      });

      toast.success("Booking successful!", { position: "top-right" });

      // Start cooldown
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 5000);
    } catch (error) {
      toast.error(`${(error as Error).message} Try again!`, {
        position: "top-right",
      });
    }
  };

  const inputClass =
    "outline-none bg-slate-300 placeholder:text-black-500 text-md px-4 rounded-lg h-12 w-full";
  const errorInputClass = "border-2 border-red-500";
  const labelClass = "text-gray-500 font-semibold";

  return (
    <div className="h-full w-full bg-gray-200 shadow-2xl mb-8">
      <ToastContainer />
      <div className="container flex justify-center h-full z-50 -translate-y-28 max-sm:-translate-y-20">
        <div className="w-full h-full p-6 shadow-xl rounded-3xl bg-gray-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-2xl bg-slate-200 p-6 grid grid-cols-4 gap-x-6 gap-y-2"
          >
            {/* Full Name Field */}
            <div className="col-span-full sm:col-span-1">
              <label htmlFor="fullname" className={labelClass}>
                Full Name
              </label>
              <div>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Your Full Name"
                  className={`${inputClass} ${
                    errors.fullname ? errorInputClass : ""
                  }`}
                  {...register("fullname", {
                    required: "Your name is required",
                  })}
                />
                {errors.fullname && (
                  <p className="text-red-500">{errors.fullname.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-6 col-span-full sm:col-span-1">
              {/* Phone Field */}
              <div className="w-full">
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <div>
                  <input
                    type="number"
                    id="phone"
                    placeholder="Your Phone no."
                    maxLength={10}
                    className={`${inputClass} ${
                      errors.phone ? errorInputClass : ""
                    }`}
                    {...register("phone", {
                      required: "Phone no. is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 digit required!",
                      },
                      maxLength: {
                        value: 10,
                        message: "Maximum 10 digit allowed!",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="h-20 bg-gray-400 w-0.25 hidden md:inline" />
            </div>

            <div className="flex flex-col gap-x-6 gap-y-2 items-center col-span-full sm:col-span-2 sm:flex-row">
              <div className="w-full">
                <label htmlFor="travel-from" className={labelClass}>
                  From
                </label>
                <div>
                  <input
                    type="text"
                    id="travel-from"
                    placeholder="Your origin location"
                    className={`${inputClass} ${
                      errors.from ? errorInputClass : ""
                    }`}
                    {...register("from", {
                      required: "Origin location is required",
                    })}
                  />
                  {errors.from && (
                    <p className="text-red-500">{errors.from.message}</p>
                  )}
                </div>
              </div>

              <GoArrowSwitch
                className={[
                  "text-3xl max-md:text-5xl max-sm:text-3xl hidden md:inline w-28 mt-4",
                  Colors.textPrimary,
                ].join(" ")}
              />

              {/* To Field */}
              <div className="w-full">
                <label htmlFor="travel-to" className={labelClass}>
                  To
                </label>
                <div>
                  <input
                    type="text"
                    id="travel-to"
                    placeholder="Destination"
                    className={`${inputClass} ${
                      errors.to ? errorInputClass : ""
                    }`}
                    {...register("to", { required: "Destination is required" })}
                  />
                  {errors.to && (
                    <p className="text-red-500">{errors.to.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-x-6 gap-y-2 items-center col-span-full sm:col-span-2 sm:flex-row">
              {/* Departing Date */}
              <div className="w-full">
                <label htmlFor="departing" className={labelClass}>
                  Departing
                </label>
                <div>
                  <input
                    type="date"
                    id="departing"
                    className={`${inputClass} ${
                      errors.departing ? errorInputClass : ""
                    }`}
                    {...register("departing", {
                      required: "Departing date is required",
                    })}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                  {errors.departing && (
                    <p className="text-red-500">{errors.departing.message}</p>
                  )}
                </div>
              </div>

              <FaArrowsLeftRightToLine
                className={[
                  "text-3xl max-md:text-5xl max-sm:text-3xl hidden md:inline w-28 mt-8",
                  Colors.textPrimary,
                ].join(" ")}
              />

              {/* Returning Date */}
              <div className="w-full">
                <label htmlFor="returning" className={labelClass}>
                  Returning
                </label>
                <div>
                  <input
                    type="date"
                    id="returning"
                    className={`${inputClass} ${
                      errors.returning ? errorInputClass : ""
                    }`}
                    {...register("returning", {
                      required: "Returning date is required",
                    })}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                  {errors.returning && (
                    <p className="text-red-500">{errors.returning.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex flex-col items-center col-span-2 sm:col-span-1">
              <label htmlFor="passengers_count" className={labelClass}>
                Total Passengers
              </label>
              <div>
                <input
                  type="number"
                  min={1}
                  className={`${inputClass} text-center ${
                    errors.passengers ? errorInputClass : ""
                  }`}
                  {...register("passengers", {
                    required: "Number of passengers is required",
                    min: {
                      value: 1,
                      message: "At least one passenger required",
                    },
                    max: {
                      value: 100,
                      message: "Maximum 100 passengers allowed",
                    },
                  })}
                  defaultValue={1}
                />
                {errors.passengers && (
                  <p className="text-red-500">{errors.passengers.message}</p>
                )}
              </div>
            </div>
            <div className="rounded-lg self-end w-full justify-self-end col-span-2 sm:col-span-1">
              <button type="submit" className="px-8 py-3 w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container -translate-y-4 sm:-translate-y-8">
        <Available />
      </div>
    </div>
  );
}
