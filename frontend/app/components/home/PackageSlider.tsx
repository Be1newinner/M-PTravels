import { lazy, Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
import { Colors } from "~/constants/colors";

const Slider = lazy(() => import("react-slick"));

export default function PackageSlider() {
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

  const packagesData = [
    {
      id: "1",
      img: "visit-agra.jpg",
      title: "Delhi to Agra Trip",
      price: "25000",
      slug: "delhi-to-agra-package",
    },
    {
      id: "2",
      img: "visit-agra.jpg",
      title: "Delhi to Agra Trip",
      price: "25000",
      slug: "delhi-to-agra-package",
    },
    {
      id: "3",
      img: "visit-agra.jpg",
      title: "Delhi to Agra Trip",
      price: "25000",
      slug: "delhi-to-agra",
    },
    {
      id: "4",
      img: "visit-agra.jpg",
      title: "Delhi to Agra Trip",
      price: "25000",
      slug: "delhi-to-agra",
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="container flex justify-between text-3xl font-bold pb-8">
        <p className="">Trips Deals</p>
        <div className="flex gap-4">
          <FaChevronLeft
            className={[
              "rounded-lg h-10 w-10 p-2 text-white",
              Colors.primary,
            ].join(" ")}
          />
          <FaChevronRight
            className={[
              "rounded-lg h-10 w-10 p-2 text-white",
              Colors.primary,
            ].join(" ")}
          />
        </div>
      </div>

      {/* Slider part */}

      <div className="container w-11/12 mx-auto max-sm:w-10/12 scale-[102%]">
        <Suspense fallback={<div>Loading Slider...</div>}>
          <Slider {...settings}>
            {packagesData?.map((item) => (
              <div key={item.id} className="px-4 max-md:px-0">
                <div className="bg-gray-200 rounded-lg ">
                  <div className="flex flex-col p-4 relative overflow-hidden">
                    <div className="overflow-hidden rounded-lg aspect-video">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full hover:scale-105 duration-300 pb-6"
                      />
                    </div>
                    <h1 className="font-bold mt-4">{item.title}</h1>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">₹ {item.price} /-</p>
                      <Link
                        to={"/packages/" + item.slug}
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
