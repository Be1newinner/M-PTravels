import Slider from "react-slick";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Sliderpart() {
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
    <div className="h-full w-full bg-[#dedee0] ">
      <div className="flex justify-between text-3xl font-bold px-20 py-10 -translate-y-28 max-sm:px-6 max-md:px-6 max-lg:px-12 max-xl:px-14">
        <div>
          <p className="">Trips Deals</p>
        </div>
        <div className="flex gap-4">
          <FaChevronLeft className="bg-blue-600 rounded-lg h-10 w-10 p-2 text-white" />
          <FaChevronRight className="bg-blue-600 rounded-lg h-10 w-10 p-2 text-white" />
        </div>
      </div>

      {/* Slider part */}

      <div className="w-11/12 mx-auto -translate-y-24 max-sm:w-10/12">
        <Slider {...settings}>
          <div className="px-4 max-md:px-0">
            <div className=" bg-gray-100 rounded-lg ">
              <div className="p-4 relative overflow-hidden">
                <img
                  src="visit-agra.jpg"
                  alt="flight"
                  className="w-full hover:scale-105 duration-300 rounded-lg pb-6"
                ></img>
                <h1 className=" font-bold">Delhi to Agra</h1>
                <p>26 Nov, 2024 - 1 Dec,2024</p>
                <div className="flex justify-between">
                  <div className="pt-4">
                    <p className="text-sm">Economy Class</p>
                    <p className="font-bold">$150</p>
                  </div>
                  <button className="bg-blue-600 h-10 text-white rounded-lg shadow-2xl px-4  hover:bg-white hover:text-black duration-700">
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="bg-gray-100 rounded-lg">
              <div className="p-4 relative">
                <img
                  src="humayun-s-tomb.jpg"
                  alt="flight-1"
                  className="w-full hover:scale-105 duration-300 rounded-lg pb-6"
                ></img>
                <h1 className=" font-bold">Noida to Delhi</h1>
                <p>26 Nov, 2024 - 1 Dec,2024</p>
                <div className="flex justify-between">
                  <div className="pt-4">
                    <p className="text-sm">Economy Class</p>
                    <p className="font-bold">$80</p>
                  </div>
                  <button className="bg-blue-600 h-10 text-white rounded-lg shadow-2xl px-4  hover:bg-white hover:text-black duration-700">
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="bg-gray-100 rounded-lg">
              <div className="p-4 relative">
                <img
                  src="JAIPUR.jpg"
                  alt="flight-3"
                  className="w-full hover:scale-105 duration-300 rounded-lg pb-6"
                ></img>
                <h1 className=" font-bold">Delhi to Jaiypur</h1>
                <p>26 Nov, 2024 - 1 Dec,2024</p>
                <div className="flex justify-between">
                  <div className="pt-4">
                    <p className="text-sm">Economy Class</p>
                    <p className="font-bold">$150</p>
                  </div>
                  <button className="bg-blue-600 h-10 text-white rounded-lg shadow-2xl px-4  hover:bg-white hover:text-black duration-700">
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="bg-gray-100 rounded-lg">
              <div className="p-4 relative">
                <img
                  src="https://uiparadox.co.uk/templates/flynow/v2/assets/media/images/flight-4.png"
                  alt="flight-4"
                  className="w-full hover:scale-105 duration-300 rounded-lg pb-6"
                ></img>
                <h1 className=" font-bold">Dubai to Canada</h1>
                <p>26 Nov, 2024 - 1 Dec,2024</p>
                <div className="flex justify-between">
                  <div className="pt-4">
                    <p className="text-sm">Economy Class</p>
                    <p className="font-bold">$5000</p>
                  </div>
                  <button className="bg-blue-600 h-10 text-white rounded-lg shadow-2xl px-4  hover:bg-white hover:text-black duration-700">
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
