import { FaCalendarAlt } from "react-icons/fa";
import imageUrlBuilder from "@/utils/imageUrlBuilder";
import Image from "next/image";
import Link from "next/link";

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
      <div className="relative overflow-hidden border border-white group-hover:border-blue-300 rounded-2xl bg-white cursor-pointer p-4 flex gap-4 h-full">
        {/* Left Image Section */}
        <div className="aspect-square overflow-hidden rounded-xl max-w-[200px] flex-shrink-0">
          <Image  
    width={1920}
    height={1920}
            src={imageUrlBuilder(img_url)}
            alt={img_url}
            className="group-hover:scale-105 w-full h-full object-cover"
          />
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-between flex-1">
          {/* Title & Description */}
          <div className="flex flex-col justify-evenly h-full">
            <Link
              href={"/blogs/" + slug}
              className="text-xl font-medium group-hover:text-blue-500"
            >
              {title}
            </Link>
            <p className="text-gray-500">{description?.slice(0, 150)}...</p>
          </div>

          {/* Bottom Section */}
          <div className="flex text-sm items-center justify-between gap-3 text-gray-500 mt-auto">
            <button className="px-6 py-2">Read More</button>
            <div className="flex gap-2 items-center">
              <FaCalendarAlt className="text-2xl" />
              <p>{updatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
