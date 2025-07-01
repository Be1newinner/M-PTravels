import { CiLocationOn } from "react-icons/ci";
import { RiHotelFill } from "react-icons/ri";
import Image from "next/image";
import { Button } from "../ui/button";

export default function TravelDestinations() {
  return (
    <div className="bg-gray-200 w-full">
      <div className="container pt-16 pb-8 max-lg:pb-20 max-sm:pb-4">
        <div className="flex justify-between max-xl:flex-wrap ">
          <h1 className="text-3xl max-sm:text-2xl font-bold">
            Popular Indian Travel Destinations
          </h1>
          <Button
            className="px-6 py-3 shadow-2xl rounded-lg hover:bg-white hover:text-black duration-700"
          >
            Show More
          </Button>
        </div>
        <div className="flex flex-between items-center gap-20 max-lg:gap-6 py-10 max-lg:flex-wrap">
          <div className="max-xl:w-1/2 max-sm:px-2 max-md:px-10 max-lg:w-full">
            <Image width={1920} height={1920} src="/map.png" alt="map" />
          </div>
          <div className="w-8/12 flex flex-wrap max-lg:w-full max-md:w-full ">
            <div className="w-1/2 relative group overflow-hidden pt-8 pr-4 max-md:w-full max-md:pr-0 sm:w-1/2 sm:pr-2">
              <div className="p-4 rounded-lg bg-white md:p-2">
                <Image
                  width={1920}
                  height={1920}
                  src="/hawa-mahal-of-rajasthan-photo.jpg"
                  alt="image-1"
                  className="group-hover:scale-105 duration-300 rounded-lg"
                />
                <p className="font-bold pt-4">Hawa Mahal</p>
                <div className="flex gap-2 py-2 text-gray-500 items-center md:text-sm">
                  <CiLocationOn className="text-2xl" />
                  <p className="py-2">Rajasthan</p>
                  <RiHotelFill className="text-2xl" />
                  <p>Hotel</p>
                </div>
                <Button
                  className="w-full py-2 shadow-lg rounded-lg hover:bg-white hover:text-black duration-700"
                >
                  Discover
                </Button>
              </div>
            </div>
            <div className="w-1/2 relative group overflow-hidden pt-8 pl-4 max-md:w-full max-md:pl-0 sm:w-1/2 sm:pl-2">
              <div className="p-4 rounded-lg bg-white md:p-2">
                <Image
                  width={1920}
                  height={1920}
                  src="/KASHMIR1.jpg"
                  alt="image-2"
                  className="rounded-lg group-hover:scale-105 duration-300"
                />
                <p className="font-bold pt-4">Gulmarg Gondola </p>
                <div className="flex gap-2 py-2 text-gray-500 items-center md:text-sm">
                  <CiLocationOn className="text-2xl" />
                  <p>Kashmir -</p>
                  <RiHotelFill className="text-2xl" />
                  <p className="py-2">Hotel</p>
                </div>
                <Button
                  className="w-full py-2  shadow-lg rounded-lg hover:bg-white hover:text-black duration-700"
                >
                  Discover
                </Button>
              </div>
            </div>
            <div className="w-1/2 relative group overflow-hidden pt-8 pr-4 max-sm:w-full max-md:pr-0 sm:w-1/2 sm:pr-2">
              <div className="p-4 rounded-lg bg-white text-sm md:p-2">
                <Image
                  width={1920}
                  height={1920}
                  src="/Taj Mahal.jpg"
                  alt="image-3"
                  className="rounded-lg group-hover:scale-105 duration-300"
                />
                <p className="font-bold pt-4">Agra</p>
                <div className="flex gap-2 py-2 text-gray-500 items-center md:text-sm">
                  <CiLocationOn className="text-2xl" />
                  <p>Taj Mahal -</p>
                  <RiHotelFill className="text-2xl" />
                  <p className="py-2">Hotel</p>
                </div>
                <Button
                  className="w-full py-2 shadow-lg rounded-lg hover:bg-white hover:text-black duration-700"
                >
                  Discover
                </Button>
              </div>
            </div>
            <div className="w-1/2 relative group overflow-hidden pt-8 pl-4 max-sm:w-full max-md:pl-0 sm:w-1/2 sm:pl-2">
              <div className="p-4 rounded-lg bg-white md:p-2">
                <Image
                  width={1920}
                  height={1920}
                  src="/Maharastra.jpg"
                  alt="image-4"
                  className="rounded-lg group-hover:scale-105 duration-300"
                />
                <p className="font-bold pt-4">Mumbai Maharashtra</p>
                <div className="flex gap-2 py-2 text-gray-500 items-center md:text-sm md:gap-0">
                  <CiLocationOn className="text-2xl" />
                  <p>Gateway of India</p>
                  <RiHotelFill className="text-2xl" />
                  <p className="py-2">Hotel</p>
                </div>
                <Button
                  className="w-full py-2 shadow-lg rounded-lg hover:bg-white hover:text-black duration-700"
                >
                  Discover
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}