"use client";
import React, { lazy, Suspense, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import type SliderType from "react-slick";
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

const queryClient = new QueryClient();

const Slider = lazy(() => import("react-slick"));

export default function PackageSlider() {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackWrapper />
    </QueryClientProvider>
  );
}

export function TanStackWrapper() {
  const sliderRef = useRef<SliderType>(null);

  const {
    // isPending, error,
    data,
  } = useQuery({
    queryKey: ["packagesData"],
    queryFn: () => fetchPackages({ limit: 4 }),
  });

  const packagesList = data?.data;

  // console.log({ data })

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="container flex justify-between text-3xl font-bold pb-8">
        <p className="">Trips Deals</p>
        <div className="flex gap-4">
          <FaChevronLeft
            className={[
              "rounded-lg h-10 w-10 p-2 text-white cursor-pointer",
              Colors.primary,
            ].join(" ")}
            onClick={() => sliderRef?.current?.slickPrev()}
          />
          <FaChevronRight
            className={[
              "rounded-lg h-10 w-10 p-2 text-white cursor-pointer",
              Colors.primary,
            ].join(" ")}
            onClick={() => sliderRef?.current?.slickNext()}
          />
        </div>
      </div>

      {/* Slider part */}

      <div className="container w-11/12 mx-auto max-sm:w-10/12 scale-[102%]">
        <Suspense fallback={<div>Loading Slider...</div>}>
          <Slider
            {...settings}
            arrows={false}
            ref={(slider) => {
              if (slider) {
                sliderRef.current = slider;
              }
            }}
          >
            {packagesList?.map((item) => (
              <div key={item._id} className="px-4 max-md:px-0">
                <div className="bg-gray-200 rounded-lg ">
                  <div className="flex flex-col p-4 relative overflow-hidden">
                    <div className="overflow-hidden rounded-lg aspect-video">
                      <Image  
    width={1920}
    height={1920}
                        src={imageUrlBuilder(item.image_url)}
                        alt={item.title}
                        className="w-full hover:scale-105 duration-300 pb-6"
                      />
                    </div>
                    <h1 className="font-bold mt-4">{item.title}</h1>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">₹ {item.price} /-</p>
                      <Link
                        href={PAGES.TOUR_PACKAGES + item.slug}
                        className={"button py-2 px-4"}
                      >
                        Booking Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Suspense>
      </div>
    </div>
  );
}
