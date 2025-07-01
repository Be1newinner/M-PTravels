import { AiOutlineComment } from "react-icons/ai"
import { SiTicktick } from "react-icons/si"
import { TbEyeDollar } from "react-icons/tb"
import { Colors } from "@/constants/colors"

export function PackageTagBar() {

    const TagBarData = [
      { id: 1, text: "Free Cancellation", icon: SiTicktick },
      { id: 2, text: "No Hidden Charges", icon: TbEyeDollar },
      { id: 3, text: "24/7 Customer Service", icon: AiOutlineComment },
    ]
  
    return (
      <div className="py-10 container flex gap-8 justify-between max-lg:flex-wrap max-md:gap-3 max-2xl:gap-8 px-4 sm:px-6 lg:px-8">
        {TagBarData.map(item => <div key={item.id} className="flex px-4 sm:px-14 gap-2 py-5 shadow-lg rounded-lg bg-gray-100 max-xl:px-2 max-2xl:px-5 w-full items-center max-xl:justify-center ">
          <div className="flex gap-4">
            <item.icon
              className={`text-4xl text-center  ${Colors.textPrimary}`}
            />
            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              {item.text}
            </h1>
          </div>
        </div>)}
      </div>
    )
  }