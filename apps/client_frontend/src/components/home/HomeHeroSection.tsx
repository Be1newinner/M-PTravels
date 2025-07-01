import Information from "@/constants/informations.json";
import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HomeHeroSection() {
  return (
    <div className="bg-[#ECECF2] w-full flex items-center justify-center py-20 md:py-32 lg:py-40">
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          <span className={`${Colors.textPrimary}`}>Book</span> Your Dream <br className="hidden sm:block" />
          <span className={`${Colors.textPrimary}`}>Vacation</span> Now!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          {Information.tag_line}
        </p>
        <Link href={PAGES.TOUR_PACKAGES}>
          <Button className="px-10 py-4 text-lg font-semibold rounded-lg shadow-lg">
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}