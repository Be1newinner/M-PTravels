import { Link } from "react-router";
import Information from "app/constants/informations.json";

export default function HomeHeroSection() {
  return (
    <div className="bg-[#ECECF2]">
      <div className="container flex justify-between py-4 max-sm:flex-wrap h-screen  max-sm:px-3 max-xl:px-0">
        <div className="max-xl:pt-10 pt-32 w-4/12 max-lg:w-5/12  max-sm:px-2 max-md:pt-6 max-sm:w-full  max-md:px-4">
          <div className="inline-block flax text-5xl font-bold max-sm:w-full max-md:text-4xl max-sm:flex-wrap">
            <h1>
              <p className="text-blue-500 inline-block">Book</p> Your Dream
              <p className="text-blue-500 inline-block mt-2">Vacation</p>
              <p className="mt-2 inline"> Now!</p>
            </h1>
          </div>
          <p className="my-4 text-gray-500">{Information.tag_line}</p>
          <Link to="/trip_booking">
            <button className="px-8 py-2">Book Now</button>
          </Link>
        </div>
        <div className="py-20 items-center max-sm:pt-0 sm:pt-10 max-sm:w-full max-xl:w-8/12 max-2xl:w-10/12">
          <img src="/images/bus_vector.webp" alt="plane"></img>
        </div>
      </div>
    </div>
  );
}
