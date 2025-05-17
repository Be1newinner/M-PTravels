import { AiOutlineComment } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { BiTrip } from "react-icons/bi";
import Informations from "@/constants/informations.json";
import { Colors } from "@/constants/colors";

export default function Available() {
  const AvailableData = [
    {
      id: 1,
      name: "We are Now Available",
      icon: AiOutlineComment,
    },
    {
      id: 2,
      name: "Beautify Trips",
      icon: BiTrip,
    },
    {
      id: 3,
      name: "Check Refund",
      icon: ImPriceTags,
    },
  ];

  return (
    <div className="pb-8 flex justify-between max-lg:flex-wrap gap-x-2 gap-y-4 md:gap-4 -translate-y-6 max-sm:-translate-y-8">
      {AvailableData.map((item) => (
        <div
          key={item.id}
          className="flex sm:flex-1 basis-full px-14 gap-2 py-5 shadow-lg rounded-lg bg-white max-xl:px-2 max-2xl:px-5 max-xl:w-full items-center max-xl:justify-center"
        >
          <item.icon className={["text-5xl", Colors.textPrimary].join(" ")} />
          <div>
            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              {item.name}
            </h1>
            <p className="text-gray-500">Call +91 {Informations.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
