import { GoArrowSwitch } from "react-icons/go";
import Available from "./Available";
import { Colors } from "~/constants/colors";

export default function BookVacation() {
  const inputClass =
    "outline-none bg-slate-300 placeholder:text-black-500 text-md px-4 rounded-lg h-12 w-full";

  const labelClass = "text-gray-500 font-semibold";

  return (
    <div className="h-full w-full bg-gray-200 shadow-2xl mb-8">
      <div className="container flex justify-center h-full z-50 -translate-y-28 max-sm:-translate-y-20">
        <div className="w-full h-full p-6 shadow-xl rounded-3xl bg-gray-100">
          <div className="w-full rounded-2xl flex p-6 items-center bg-slate-200 max-xl:flex-wrap">
            <div className="flex w-full items-center justify-between border-black gap-y-4 max-xl:w-full max-sm:flex-wrap max-xl:border-none">
              <div className="max-md:w-full max-xl:w-5/12">
                <label htmlFor="travel-from" className={labelClass}>
                  From
                </label>
                <div>
                  <input
                    type="text"
                    id="travel-from"
                    placeholder="your origin location"
                    className={inputClass}
                  />
                </div>
              </div>
              <GoArrowSwitch
                className={[
                  "text-3xl max-md:text-5xl max-sm:text-3xl hidden md:inline",
                  Colors.textPrimary,
                ].join(" ")}
              />
              <div className="max-sm:w-full">
                <label htmlFor="travel-to" className={labelClass}>
                  To
                </label>
                <div>
                  <input
                    type="text"
                    id="travel-to"
                    placeholder="your origin location"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="h-20 bg-gray-400 w-0.25 hidden md:inline" />
              <div>
                <label htmlFor="departing" className={labelClass}>
                  Departing
                </label>
                <div>
                  <input
                    type="date"
                    id="departing"
                    name="departing"
                    className={inputClass}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="returning" className={labelClass}>
                  Returning
                </label>
                <div>
                  <input
                    type="date"
                    id="returning"
                    name="returning"
                    className={inputClass}
                    defaultValue={
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="passengers_count" className={labelClass}>
                  Total Passengers
                </label>
                <div>
                  <input
                    type="number"
                    min={0}
                    className={inputClass + " text-center"}
                    max={100}
                    defaultValue={0}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 max-xl:flex-wrap">
            <button className="h-12 sm:max-w-48 w-full">Submit enquiry</button>
          </div>
        </div>
      </div>
      <div className="container -translate-y-4 sm:-translate-y-8">
        <Available />
      </div>
    </div>
  );
}
