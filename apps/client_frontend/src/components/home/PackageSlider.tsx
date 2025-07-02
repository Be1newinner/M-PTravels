"use client";
import React from "react";
import { Colors } from "@/constants/colors";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchPackages } from "@/services/packages";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { slugify } from "@/utils/text_helpers";

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
    <div className="w-full bg-gray-100 py-16">
      <div className="container">
        <div className="flex justify-between items-center text-3xl md:text-4xl font-bold pb-10">
          <p>Explore Our Top Trips</p>
        </div>

        {/* Desktop View (Carousel) */}
        <div className="hidden lg:block w-full mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {packagesList?.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="basis-1/3 max-lg:basis-1/2 max-md:basis-full pl-4"
                >
                  <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col p-4">
                      <div className="overflow-hidden rounded-lg aspect-video mb-4">
                        <Image
                          width={400}
                          height={400}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h1 className="font-bold text-xl mb-4">{item.title}</h1>
                      <div className="flex justify-between items-center">
                        <Link
                          href={PAGES.TOUR_PACKAGES + slugify(item.title) + "-" + item._id}
                        >
                          <Button className={"py-3 px-6 text-base"}>
                            Booking Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-10">
              <CarouselPrevious className={`rounded-full h-12 w-12 p-2 text-white cursor-pointer ${Colors.primary} hover:bg-blue-700`} />
            <CarouselNext className={`rounded-full h-12 w-12 p-2 text-white cursor-pointer ${Colors.primary} hover:bg-blue-700`} />
            </div>
          </Carousel>
        </div>

        {/* Mobile View (Vertical List) */}
        <div className="lg:hidden flex flex-col gap-6 items-center">
          {packagesList?.slice(0, 3).map((item) => (
            <div key={item._id} className="w-full max-w-md bg-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col p-4">
                <div className="overflow-hidden rounded-lg aspect-video mb-4">
                  <Image
                    width={400}
                    height={400}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-bold text-xl mb-4 text-center">{item.title}</h1>
                <Link href={PAGES.TOUR_PACKAGES + item.slug} className="w-full">
                  <Button className="w-full py-3 text-base">
                    Booking Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}