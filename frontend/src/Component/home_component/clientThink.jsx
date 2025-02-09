import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
export default function ClientThink() {
  return (
    <div className="w-full px-20 h-full pb-10 max-sm:pb-2 bg-gray-200 max-md:px-2 max-xl:px-10 ">
      <div className="h-full w-full shadow-md rounded-3xl gap-6 items-center flex p-20 bg-gray-100 max-xl:flex-wrap max-xl:py-8 max-xl:p-4">
        <div className="w-2/4 p-10 max-xl:w-full max-md:p-0 max-xl:p-4">
          <p className="text-blue-600 text-lg">Testimonials</p>
          <h1 className="text-5xl max-sm:text-4xl font-bold py-2">
            What our clients think about us?
          </h1>
        </div>
        <div className="w-3/4 bg-gray-200 shadow-xl rounded-xl max-xl:w-full">
          <div className="p-12 max-sm:p-2 ">
            <div className="flex justify-between">
              <div className="flex ">
                <img src="user-3.png" alt="user-3" className="z-20" />
                <img
                  src="user-1.png"
                  alt="user-1"
                  className="-translate-x-6 z-10"
                />
                <img
                  src="user-2.png"
                  alt="user-2"
                  className="-translate-x-12"
                />
              </div>
              <div className="flex text-2xl gap-6 max-sm:hidden">
                <FaArrowLeftLong />
                <FaArrowRightLong />
              </div>
            </div>
            <p className="py-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iusto
              nobis possimus tempore deserunt culpa ad beatae nesciunt maxime
              consequuntur, unde amet aliquam natus commodi quod nostrum at
              itaque animi.
            </p>
            <p className="text-lg ">Mr Jhon Deo</p>
            <p className="text-gray-500">CEO at flyNow</p>
          </div>
        </div>
      </div>
    </div>
  );
}
