import { IoSearchOutline } from "react-icons/io5";
import { Colors } from "@/constants/colors";

export function PackagesSearchBar() {
    return (
      <div className="flex gap-4 items-center justify-end">
        <div className="border px-5 rounded-lg bg-slate-200 py-2 border-black" >
          <label className="text-sm font-medium text-gray-500">
            Destination or package
          </label>
          <div className="flex text-center items-center gap-4">
            <IoSearchOutline
              className={`text-3xl  ${Colors.textPrimary}`}
            />
            <input
              type="text"
              name="package-search"
              id="package-search"
              placeholder="Search for the Destination or Package"
              className="outline-none w-80 bg-slate-200"
            />
          </div>
        </div >
        <button className="px-8 h-16">
          Search the Package
        </button>
      </div >
    )
  }
  