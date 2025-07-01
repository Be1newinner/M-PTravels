import { PiCarProfileLight } from "react-icons/pi";
import { RiHotelFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import { AiOutlineComment } from "react-icons/ai";
import { Colors } from "@/constants/colors";
import Image from "next/image";

export default function OurHistory() {
  const history = [
    {
      icon: PiCarProfileLight,
      dis: "Extensive Selection of Luxury Cars",
    },
    {
      icon: RiHotelFill,
      dis: "Well-Maintained & Luxury Hotels",
    },
    {
      icon: FaCalendarDays,
      dis: "Easy and Intuitive Booking Process",
    },
    {
      icon: AiOutlineComment,
      dis: "Exceptional Customer Service",
    },
  ];

  const photos = [
    {
      photo: "/since-1.png",
    },
    {
      photo: "/since-2.png",
    },
    {
      photo: "/since-3.png",
    },
    {
      photo: "/since-4.png",
    },
  ];

  return (
    <div className="bg-[#ECECF2] px-20 max-md:px-2 max-lg:px-10 max-xl:px-12 py-5 flex max-xl:flex-wrap w-full gap-8">
      <div className="bg-gray-50 p-5 max-md:p-3 w-1/2 max-xl:w-full font-medium rounded-2xl">
        <h2 className="text-4xl max-md:text-3xl font-medium ">Our History</h2>
        <h5
          className={[
            "text-xl max-md:text-lg font-medium py-2 max-md:py-1",
            Colors.textPrimary,
          ].join(" ")}
        >
          Since 1998
        </h5>
        <p className="text-gray-600 max-md:text-md max-lg:font-normal">
          Since 1998, we&apos;ve grown from a small regional bus service into a
          nationwide travel network trusted by millions. From launching India&apos;s
          first real-time bus tracking to introducing luxury sleeper coaches,
          we&apos;ve led with innovation, comfort, and safety at every turn. Today,
          we serve 10M+ happy travelers annually — and we&apos;re just getting
          started.
        </p>
        <div className="w-full flex flex-wrap items-center justify-between gap-6 max-2xl:gap-5 mt-8">
          {history.map((item, index) => (
            <div
              className="w-[48%] max-md:w-full max-md:text-xl bg-gray-200 text-2xl p-4 rounded-2xl"
              key={index}
            >
              <item.icon
                className={[
                  "text-6xl max-md:text-5xl p-2",
                  Colors.textPrimary,
                ].join(" ")}
              />
              <p>{item.dis}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 max-xl:w-full">
        <div className="flex flex-wrap justify-between gap-6 max-2xl:gap-5">
          {photos.map((item) => (
            <div key={item.photo} className="w-[48%] max-sm:w-full">
              <Image
                width={1920}
                height={1920}
                src={item.photo}
                alt=""
                className="rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
