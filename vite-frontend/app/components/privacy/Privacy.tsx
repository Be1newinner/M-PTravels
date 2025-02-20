/** @format */
import { IoIosArrowUp } from 'react-icons/io';

export default function Privacy() {
  return (
    <div className="m-4 flex flex-wrap max-lg:w-full">
      <div className="w-full h-[550px] max-sm:h-full shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <IoIosArrowUp />
        </div>
        <div className="leading-8 font-medium text-lg text-gray-400">
          <p>We care about your privacy</p> <p>Our Privacy Policy in brief</p>
        </div>

        <hr className="mt-4 mb-4"></hr>

        <div className="flex justify-between mb-2 max-lg:w-full ">
          <h1 className="text-2xl font-semibold ">About</h1>
          <IoIosArrowUp />
        </div>
        <div className="leading-8 text-lg font-medium text-gray-400">
          <p>About the Trips</p> <p>Providing Your Personal info</p>
          <p>Third Party Websites</p> <p>Updates</p>
        </div>

        <hr className="mt-4 mb-4"></hr>

        <div className="flex justify-between mb-2 max-lg:w-full ">
          <h1 className="text-2xl font-semibold ">More Information</h1>
          <IoIosArrowUp />
        </div>
        <div className="leading-8 text-lg font-medium text-gray-400">
          <p className="leading-5  ">
            Legal Basis for using your personal Information
          </p>
          <p>Cookies</p>
          <p>How to Contact Us</p> <p>Updates</p>
        </div>
      </div>
    </div>
  );
}