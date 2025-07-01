import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type NewsCardType = {
  img_url: string;
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
};

export default function NewsCard({
  img_url,
  slug,
  title,
  description,
  updatedAt,
}: NewsCardType) {
  return (
    <div className="w-full h-full group">
      <div className="relative overflow-hidden border border-white group-hover:border-blue-300 rounded-2xl bg-white cursor-pointer p-4 flex gap-4 h-full max-sm:flex-col">
        {/* Left Image Section */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl w-full md:w-2/5 max-sm:h-48 flex-shrink-0">
          <Image  
    width={1920}
    height={1920}
            src={img_url}
            alt={img_url}
            className="group-hover:scale-105 w-full h-full object-cover"
          />
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-between flex-1 space-y-2">
          {/* Title & Description */}
          <div className="flex flex-col justify-evenly h-full">
            <Link
              href={`/news/${slug}`}
              className="text-lg sm:text-xl font-medium group-hover:text-blue-500"
            >
              {title}
            </Link>
            <p className="text-gray-500 text-sm sm:text-base">{description?.slice(0, 150)}...</p>
          </div>

          {/* Bottom Section */}
          <div className="flex text-sm items-center justify-between gap-3 text-gray-500 mt-auto pt-4">
            <Link href={`/news/${slug}`}>
              <Button className="px-4 py-2 text-sm">Read More</Button>
            </Link>
            <div className="flex gap-2 items-center">
              <FaCalendarAlt className="text-xl sm:text-2xl" />
              <p>{updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}