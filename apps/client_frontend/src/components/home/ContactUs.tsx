import { FaRegUserCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Colors } from "@/constants/colors";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="bg-gray-200 w-full">
      <div className="container h-full pb-10 py-10">
        <div className=" flex gap-6 shadow-lg rounded-3xl px-14 py-20 bg-gray-100 h-full max-lg:flex-wrap max-lg:p-4 max-2xl:p-10 ">
          <div className="w-3/4 max-md:w-full max-lg:w-full">
            <p className={`text-2xl font-bold ${Colors.textPrimary}`}>
              Achievements
            </p>
            <h1 className="text-3xl font-bold py-2 max-lg:text-2xl">
              Your Destination Awaits, Book Now
            </h1>
            <p className="text-gray-500">
              With thousands of happy travelers, we take pride in providing
              safe, reliable, and affordable bus services. Our seamless booking
              experience, punctual schedules, and top-notch customer service set
              us apart. Travel hassle-free with real-time tracking, comfortable
              seating, and exclusive discounts. Your destination awaits—book now
              and ride with confidence! 🚍✨
            </p>
            <div className="flex gap-8 py-4 max-sm:flex-wrap ">
              <div className="flex justify-between p-6 w-1/2 rounded-lg shadow-lg items-center bg-gray-200 max-sm:w-full">
                <div>
                  <p className={`text-3xl font-bold  ${Colors.textPrimary}`}>
                    1270 +
                  </p>
                  <p className="text-lg ">Happy customers</p>
                </div>
                <div>
                  <CiUser className={`text-5xl  ${Colors.textPrimary}`} />
                </div>
              </div>
              <div className="flex justify-between p-6 w-1/2 rounded-lg shadow-xl items-center bg-gray-200 max-sm:w-full">
                <div>
                  <p className={`text-3xl font-bold  ${Colors.textPrimary}`}>
                    100 %
                  </p>
                  <p className="text-lg">Client Satisfied</p>
                </div>
                <div>
                  <FaRegUserCircle
                    className={`text-5xl  ${Colors.textPrimary}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-6 pt-4 items-center text-lg max-sm:flex-wrap ">
              <p className="">
                Let's Connect Reach Out for More Information
              </p>
              <button
                className={[
                  "shadow-2xl text-white px-6 py-3 xl:px-4 rounded-xl hover:bg-white hover:text-black duration-700",
                  Colors.primary,
                ].join(" ")}
              >
                Contact us
              </button>
            </div>
          </div>
          <div className="w-3/4 max-lg:w-full bg-red-500 overflow-hidden rounded-3xl">
            <Image
              width={800}
              height={800}
              src="/achievement-image.png"
              alt="achivement"
              className="h-full aspect-video scale-x-105 hover:scale-x-110 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
