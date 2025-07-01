"use client";
import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Journey() {
  const [isVideo, setIsVideo] = useState(false);

  function handleVideo() {
    setIsVideo(!isVideo);
  }
  return (
    <>
      <div className="bg-[#ECECF2] px-20 max-md:px-2 max-lg:px-10 max-xl:px-12 py-10  flex justify-center">
        <div className="w-full rounded-2xl h-full py-10 shadow-xl text-center bg-gray-50">
          <div className="w-full max-sm:text-2xl max-2xl:text-4xl text-5xl">
            <h4 className=" px-80 max-md:px-2 max-lg:px-8 max-xl:px-40 max-2xl:px-64 font-medium ">
              Where Your Journey Begins with Quality and Reliability
            </h4>
            <section className="bg-white py-16 px-4 md:px-8 lg:px-16">
              <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Where Your Journey Begins with Quality and Reliability
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  Plan your trips with confidence. We&apos;re not just a bus booking
                  service — we&apos;re your reliable travel partner. Whether you&apos;re
                  heading to work, a weekend getaway, or an outstation trip, we
                  ensure a smooth, safe, and comfortable journey from start to
                  finish.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600 text-lg">
                      ✅ Instant Online Booking
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600 text-lg">
                      ✅ Verified Operators & Clean Buses
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600 text-lg">
                      ✅ Real-Time Tracking & Support
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600 text-lg">
                      ✅ Affordable Pricing with No Hidden Fees
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-base md:text-lg mb-6">
                  From city commutes to long-distance adventures — start your
                  journey with trust, comfort, and on-time service.
                </p>

                <a
                  href="/book-now"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
                >
                  Book Now
                </a>
              </div>
            </section>
          </div>
          <div className="w-full relative px-10 ">
            <Image
              width={1920}
              height={1920}
              src="/blog-banner.png"
              alt="Blog Banner"
              className="rounded-3xl max-sm:rounded-2xl"
            />
            {/* Removed commented out video button */}
          </div>
        </div>
      </div>

      {isVideo && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center flex-col justify-center">
          <div className="max-w-4xl bg-white px-10 py-5 rounded-xl">
            <div className="flex items-end justify-between text-3xl font-medium w-full py-4 ">
              <p>Classical Optical Glasses</p>
              <IoClose
                onClick={handleVideo}
                className="h-5 w-5 cursor-pointer"
              />
            </div>
            <video
              src="/airline-ad.mp4"
              controls
              className="rounded-xl"
            ></video>
          </div>
        </div>
      )}
    </>
  );
}
