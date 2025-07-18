import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HomeShowCase() {
  return (
    <div className="bgImg">
      <div className="container h-screen ">
        <div className="cloudImg h-[200px]">
          <div className="w-full top-24 relative text-5xl font-bold max-sm:top-2 max-lg:top-4 max-md:top-0">
            <div className="flex justify-between max-md:flex-wrap max-sm:gap-6">
              <div className="w-2/6 max-md:w-full max-md:text-center">
                <Image
                  width={250}
                  height={250}
                  src="/logo.webp"
                  alt="logo"
                  className="max-md:w-1/3 max-md:mx-auto "
                />
                <div>
                  <div className="gap-4 flex flex-wrap max-md:justify-center">
                    <div className="inline bg-gray-200 px-2 py-1">TRAVEL</div>
                    <div className="inline bg-gray-200 px-2 py-1">All</div>
                    <div className="inline bg-gray-200 px-2 py-1">Over</div>
                    <div
                      className={`inline bg-gray-200 px-2 py-1  ${Colors.textPrimary}`}
                    >
                      India
                    </div>
                  </div>
                </div>
                <Link href={PAGES.TOUR_PACKAGES} className="max-md:text-center">
                  <Button
                    className="text-sm rounded-lg hover:bg-white hover:text-black duration-700"
                  >
                    Booking Now
                  </Button>
                </Link>
              </div>
              <div className="w-full flex items-center max-md:w-full max-lg:w-9/12">
                <div className="mt-4">
                  <div className="flex relative items-center justify-center md:justify-end gap-2 z-40">
                    <Image
                      width={500}
                      height={500}
                      src="/Temple.jpg"
                      alt="paris"
                      className="w-1/5 h-1/5 rounded-3xl border-4 border-white"
                    />
                    <Image
                      width={500}
                      height={500}
                      src="/corridor-.jpg"
                      alt="dubai"
                      className="w-2/6 rounded-3xl border-4 border-white"
                    />
                    <Image
                      width={500}
                      height={500}
                      src="/IndiaGate.jpg"
                      alt="italy"
                      className="w-1/5 h-1/5 rounded-3xl border-4 border-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}