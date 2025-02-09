import {Link} from "react-router-dom";
export default function DreamFlight() {
  return (
    <div>
      <div className="flex justify-between py-4 max-sm:flex-wrap h-screen bg-[#ECECF2]  max-sm:px-3 max-xl:px-0">
        <div className="pl-20 max-xl:pl-10 max-xl:pt-10 pt-32 w-4/12 max-lg:w-5/12 bg-[#ECECF2] max-sm:px-2 max-md:pt-6 max-sm:w-full  max-md:px-4">
          <div className="inline-block flax text-5xl font-bold max-sm:w-full max-md:text-4xl max-sm:flex-wrap">
            <h1>
              <p className="text-blue-500 inline-block">Book</p> Your Dream
              <p className="text-blue-500 inline-block mt-2">Flight</p>
              <p className="mt-2 inline"> Now!</p>
            </h1>
          </div>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur. Felis tristique pretium leo
            nisi at risus ac enim.
          </p>
          <Link to="/trip_booking">
          <button className="bg-blue-600 px-6 py-2 mt-4 rounded-md text-white shadow-2xl hover:bg-gray-100 duration-500 hover:text-black">
            Book Now
          </button>
          </Link>
        </div>
        <div className="pr-20 max-xl:pr-10 py-20 items-center max-md:pr-2 max-sm:pt-0 sm:pt-10 max-sm:w-full max-xl:w-8/12 max-2xl:w-10/12">
          <img src="online-cab-booking.png" alt="plane"></img>
        </div>
      </div>
    </div>
  );
}
