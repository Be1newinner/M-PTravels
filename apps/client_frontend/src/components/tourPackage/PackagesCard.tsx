import { CiLocationOn } from "react-icons/ci";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type packagesCardType = {
  image: string;
  title: string;
  slug: string; // Ensure slug is passed
};

export function PackagesCard({ image, title, slug }: packagesCardType) {
  return (
    <div className="shadow-lg p-4 rounded-xl bg-white">
      <div className="flex max-md:flex-wrap gap-4 relative">
        {/* Image Container with 4:3 Aspect Ratio for Desktop */}
        <div className="rounded-lg bg-gray-200 overflow-hidden w-full md:w-2/5 aspect-[4/3] max-md:h-48">
          {image ? (
            <Image
              width={1920}
              height={1920}
              src={image}
              alt={image}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 max-md:w-full max-md:space-y-2"> {/* Added space-y-2 for mobile vertical gap */}
          <p className="text-xl md:text-2xl font-medium">{title}</p>
          <p className="bg-slate-200 py-1 px-3 text-sm font-medium rounded-lg w-fit">
            Registration available
          </p>
          <div className="flex gap-3 items-center">
            <CiLocationOn className="text-2xl md:text-3xl" />
            <div>
              <p className="text-sm font-medium ">Pick-up and Drop</p>
              <p className="text-sm font-medium text-gray-500">Your location</p>
            </div>
          </div>
          <div className="px-0">
            <Link href={PAGES.TOUR_PACKAGES + slug}>
              <Button className="py-2 px-6 text-sm">Know more</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}