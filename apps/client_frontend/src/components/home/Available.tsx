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
    <div className="pb-8 flex justify-between max-lg:flex-wrap gap-x-4 gap-y-6 md:gap-6 -translate-y-6 max-sm:-translate-y-8">
      {AvailableData.map((item) => (
        <div
          key={item.id}
          className="flex sm:flex-1 basis-full lg:basis-1/3 px-8 py-6 shadow-lg rounded-lg bg-white items-center justify-center text-center sm:text-left"
        >
          <item.icon className={["text-5xl mr-4", Colors.textPrimary].join(" ")} />
          <div>
            <h1 className="text-2xl font-medium mb-1">
              {item.name}
            </h1>
            <p className="text-gray-500 text-lg">Call +91 {Informations.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}