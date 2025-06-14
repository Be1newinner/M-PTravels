import { CiLocationOn } from "react-icons/ci";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";

type packagesCardType = {
  image: string;
  title: string;
};

export function PackagesCard({ image, title }: packagesCardType) {
  return (
    <div className="shadow-lg p-6 rounded-xl bg-white">
      <div className="flex max-md:flex-wrap gap-6 relative">
        <div className="rounded-lg bg-red-500 overflow-hidden h-52 w-52">
          {image ? (
            <Image
              width={1920}
              height={1920}
              src={image}
              alt={image}
              className="w-full h-full"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-between max-sm:flex-wrap ">
          <p className="text-2xl font-medium">{title}</p>
          <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
            Registration available
          </p>
          <div className="flex gap-3 items-center">
            <CiLocationOn className="text-3xl" />
            <div>
              <p className="text-sm font-medium ">Pick-up and Drop</p>
              <p className="text-sm font-medium text-gray-500">Your location</p>
            </div>
          </div>
          <div className="px-2">
            <Link href={PAGES.TOUR_PACKAGES}>
              <button className="py-2 px-8">Know more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
