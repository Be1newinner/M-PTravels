import { AiOutlineComment } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { BiTrip } from "react-icons/bi";

export default function Available() {
  return (
    
      <div className="px-16 py-8 flex justify-between max-lg:flex-wrap max-md:px-6 max-md:gap-3 max-2xl:gap-8 max-xl:px-10 -translate-y-6 max-sm:-translate-y-24">
        <div className="flex px-14 gap-2 py-5 shadow-lg rounded-lg bg-gray-100 max-xl:px-2 max-2xl:px-5 max-xl:w-full items-center max-xl:justify-center ">
          <AiOutlineComment className="text-5xl text-blue-600" /> 
          <div className="">
            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              We are Now Available
            </h1>
            <p className="text-gray-500">Call +91 9720169030 contact with us</p>
          </div>
        </div>
        <div className="flex px-14 gap-2 py-5 shadow-lg rounded-lg items-center bg-gray-100 max-xl:w-full max-2xl:px-5 max-xl:px-2 max-xl:justify-center">
          <BiTrip className="text-5xl text-blue-600" />
          <div>
            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              Beautify Trips
            </h1>
            <p className="text-gray-500 ">
              Call +91 9720169030 contact with us
            </p>
          </div>
        </div>
        <div className="flex px-14 gap-2 rounded-lg shadow-lg py-5 items-center bg-gray-100 max-xl:px-2 max-2xl:px-5 max-xl:w-full max-xl:justify-center">
          <ImPriceTags className="text-5xl text-blue-600" />
          <div>
            <h1 className="text-2xl max-sm:text-xl max-xl:text-2xl max-2xl:text-xl font-medium">
              Check Refund
            </h1>
            <p className="text-gray-500">Call +91 9720169030 contact with us</p>
          </div>
        </div>
      </div>
  );
}
