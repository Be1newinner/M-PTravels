import { GoArrowSwitch } from "react-icons/go";
import Available from "./available";
export default function ShowFlight() {
  return (
    <div className="h-full w-full bg-[#dedee0] shadow-2xl">
      <div className="flex justify-center h-full px-16 max-xl:px-6 max-sm:px-4 z-50 -translate-y-1/2 max-sm:-translate-y-1/3">
        <div className="w-full h-full px-14 max-xl:px-10 py-10 shadow-xl rounded-3xl bg-gray-100 max-sm:px-2 max-md:p-8">
          <div className="w-full flex h-42 px-5 py-8 rounded items-center bg-slate-200 max-md:h-full max-xl:flex-wrap max-xl:gap-6">
            <div className="flex border-r h-full items-center border-black gap-6 w-2/4 max-xl:w-full max-sm:flex-wrap max-md:gap-3 max-xl:border-none">
              <div className="max-md:w-full max-xl:w-5/12">
                <label className="text-gray-500 max-sm:text-xl max-sm:font-bold">
                  From
                </label>
                <div className="max-md:w-11/12 max-sm:w-1/2 ">
                  <input
                    type="text"
                    placeholder="From"
                    className="outline-none bg-slate-200 placeholder:text-gray-500 text-xl max-md:w-5/12 max-sm:w-full"
                  ></input>
                </div>
              </div>
              <GoArrowSwitch className="text-3xl max-md:text-5xl max-sm:text-3xl text-blue-600 " />
              <div className="max-sm:w-full">
                <label className="text-gray-500 max-sm:text-xl max-sm:font-bold">
                  To
                </label>
                <div className="max-md:w-5/12 max-sm:w-1/2">
                  <input
                    type="text"
                    placeholder="To"
                    className="outline-none bg-slate-200 placeholder:text-gray-500 text-xl max-sm:w-full "
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex px-5 w-2/4 gap-6 items-center max-md:flex-wrap max-xl:px-0 max-xl:w-full max-md:pt-4">
              <div>
                <label for="departing" className="text-gray-500">
                  Departing
                </label>
                <div>
                  <input
                    type="date"
                    id="departing"
                    name="departing"
                    className="bg-slate-200 text-black text-xl"
                  ></input>
                </div>
              </div>
              <div>
                <label for="returning" className="text-gray-500">
                  Returning
                </label>
                <div>
                  <input
                    type="date"
                    id="returning"
                    name="returning"
                    className="bg-slate-200 text-black text-xl"
                  ></input>
                </div>
              </div>
              <div>
                <label for="passenger" className="text-gray-500">
                  Passengers and Class
                </label>
                <div>
                  <h1 className="text-xl">2 Passengers / Business</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 max-xl:flex-wrap">
            <button className="h-12 w-48 justify-center rounded-lg text-white shadow-2xl flex items-center px-2 py-2 bg-blue-500 hover:bg-white hover:text-black duration-500">
              Continue
            </button>
          </div>
        </div>
      </div>
      <div className="-translate-y-20">
        <Available />
      </div>
    </div>
  );
}
