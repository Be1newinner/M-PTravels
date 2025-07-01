import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import TestimonialsData from "@/constants/testimonials.json";
import StringData from "@/constants/string.json";
import { Colors } from "@/constants/colors";
import Image from "next/image";

export default function Testimonials() {
  return (
    <div className="bg-gray-200 w-full py-16">
      <div className="container h-full">
        <div className="h-full w-full shadow-md rounded-3xl flex flex-col lg:flex-row p-12 bg-gray-100 items-center justify-center text-center lg:text-left">
          <div className="w-full lg:w-2/5 p-4 lg:p-10">
            <p className={`text-xl font-bold ${Colors.textPrimary} mb-2`}>
              Testimonials
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight py-2">
              {StringData.testimonials}
            </h1>
          </div>
          <div className="w-full lg:w-3/5 bg-gray-200 shadow-xl rounded-xl p-8 md:p-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex -space-x-4">
                <Image
                  width={64}
                  height={64}
                  src="/user-3.png"
                  alt="user-3"
                  className="rounded-full border-2 border-gray-200"
                />
                <Image
                  width={64}
                  height={64}
                  src="/user-1.png"
                  alt="user-1"
                  className="rounded-full border-2 border-gray-200"
                />
                <Image
                  width={64}
                  height={64}
                  src="/user-2.png"
                  alt="user-2"
                  className="rounded-full border-2 border-gray-200"
                />
              </div>
              <div className="flex text-2xl gap-6 hidden sm:flex">
                <FaArrowLeftLong className="cursor-pointer hover:text-blue-500 transition-colors" />
                <FaArrowRightLong className="cursor-pointer hover:text-blue-500 transition-colors" />
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              &quot;{TestimonialsData.text}&quot;
            </p>
            <p className="text-xl font-semibold text-gray-800">
              - {TestimonialsData.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}