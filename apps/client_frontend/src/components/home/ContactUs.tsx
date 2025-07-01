import { Colors } from "@/constants/colors";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/constants/pages";
import { Button } from "../ui/button";

export default function ContactUs() {
  return (
    <div className="bg-gray-200 w-full py-16">
      <div className="container h-full">
        <div className="flex flex-col lg:flex-row gap-10 shadow-lg rounded-3xl px-8 py-16 bg-gray-100 items-center justify-center text-center lg:text-left">
          <div className="w-full lg:w-1/2">
            <p className={`text-xl font-bold ${Colors.textPrimary} mb-2`}>
              Achievements
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight py-2 mb-4">
              Your Destination Awaits, Book Now
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              With thousands of happy travelers, we take pride in providing
              safe, reliable, and affordable bus services. Our seamless booking
              experience, punctual schedules, and top-notch customer service set
              us apart. Travel hassle-free with real-time tracking, comfortable
              seating, and exclusive discounts. Your destination awaits—book now
              and ride with confidence! 🚍✨
            </p>
            <div className="flex justify-center lg:justify-start items-center text-lg">
              <p className="mr-4">
                Let&apos;s Connect:
              </p>
              <Link href={PAGES.CONTACT}>
                <Button
                  className="shadow-2xl px-8 py-4 rounded-xl hover:bg-white hover:text-black duration-700 font-semibold"
                >
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl">
            <Image
              width={800}
              height={800}
              src="/achievement-image.png"
              alt="achievement"
              className="h-full w-full object-cover scale-105 hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}