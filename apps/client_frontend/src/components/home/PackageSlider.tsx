"use client";
import React from "react";
import { Colors } from "@/constants/colors";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchPackages } from "@/services/packages";
import imageUrlBuilder from "@/utils/imageUrlBuilder";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Adjust import path as needed

const queryClient = new QueryClient();

export default function PackageSlider() {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackWrapper />
    </QueryClientProvider>
  );
}

export function TanStackWrapper() {
  const { data } = useQuery({
    queryKey: ["packagesData"],
    queryFn: () => fetchPackages({ limit: 4 }),
  });

  const packagesList = data?.data;

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="container flex justify-between text-3xl font-bold pb-8">
        <p>Trips Deals</p>
        {/* Remove navigation buttons from here */}
      </div>

      <div className="container w-11/12 mx-auto max-sm:w-10/12 scale-[102%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {packagesList?.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-1/3 max-lg:basis-1/2 max-md:basis-full px-4 max-md:px-0"
              >
                <div className="bg-gray-200 rounded-lg">
                  <div className="flex flex-col p-4 relative overflow-hidden">
                    <div className="overflow-hidden rounded-lg aspect-video">
                      <Image
                        width={400}
                        height={400}
                        src={imageUrlBuilder(item.image)}
                        alt={item.title}
                        className="w-full hover:scale-105 duration-300 pb-6"
                      />
                    </div>
                    <h1 className="font-bold mt-4">{item.title}</h1>
                    <div className="flex justify-between items-center">
                      <Link
                        href={PAGES.TOUR_PACKAGES + item.slug}
                        className={"button py-2 px-4"}
                      >
                        Booking Now
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Place navigation buttons here, inside <Carousel> */}
          <div className="flex justify-end gap-4 mt-4">
            <CarouselPrevious className={`rounded-lg h-10 w-10 p-2 text-white cursor-pointer ${Colors.primary}`} />
            <CarouselNext className={`rounded-lg h-10 w-10 p-2 text-white cursor-pointer ${Colors.primary}`} />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
