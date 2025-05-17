import Information from "@/constants/informations.json";
import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <div className="bg-[#ECECF2]">
      <div className="container flex justify-between py-4 max-sm:flex-wrap h-screen  max-sm:px-3 max-xl:px-0">
        <div className="max-xl:pt-10 pt-32 w-4/12 max-lg:w-5/12  max-sm:px-2 max-md:pt-6 max-sm:w-full  max-md:px-4">
          <div className="inline-block flax text-5xl font-bold max-sm:w-full max-md:text-4xl max-sm:flex-wrap">
            <h1>
              <p className={`inline-block ${Colors.textPrimary}`}>Book</p> Your
              Dream
              <p className={`inline-block mt-2 ${Colors.textPrimary}`}>
                Vacation
              </p>
              <p className="mt-2 inline"> Now!</p>
            </h1>
          </div>
          <p className="my-4 text-gray-500">{Information.tag_line}</p>
          <Link href={PAGES.TOUR_PACKAGES}>
            <button className="px-8 py-2">Book Now</button>
          </Link>
        </div>
        <div className="py-20 items-center max-sm:pt-0 sm:pt-10 max-sm:w-full max-xl:w-8/12 max-2xl:w-10/12">
          <Image  
    width={1920}
    height={1920} src="/images/bus_vector.webp" alt="plane" />
        </div>
      </div>
    </div>
  );
}
