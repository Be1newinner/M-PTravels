import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";

export default function LetestNews() {
  return (
    <div className="w-full px-20 h-full bg-gray-200 max-md:px-2 max-xl:px-10 ">
      <div className="flex justify-between py-10 ">
        <p1 className="text-3xl font-bold max-sm:text-2xl">Our Latest News</p1>
        <button className="bg-blue-600 text-sm font-medium text-white shadow-2xl px-6 py-3 rounded-xl hover:bg-white hover:text-black duration-700 max-md:">
          Show More
        </button>
      </div>
      <div className=" flex flex-wrap pb-10">
        <div className="w-1/2 py-4 pr-4 max-xl:w-full max-xl:pr-0">
          <div className="relative overflow-hidden group">
            <div className="gap-6  max-sm:p-4 p-6 rounded-2xl flex bg-white max-lg:flex-wrap ">
              <div className="w-10/12 max-lg:w-full max-xl:w-6/12 ">
                <img src="blog-1.png" alt="blog-1" className="rounded-xl group-hover:scale-105 duration-300" />
              </div>
              <div>
                <div className="flex text-sm items-center gap-3 pb-3 text-gray-500">
                  <CiUser className="text-2xl" />
                  <p>Malisa John</p>
                  <p>|</p>
                  <FaCalendarAlt className="text-2xl" />
                  <p>29 Nov, 2024</p>
                </div>
                <div className="py-2">
                  <Link
                    to="#"
                    className="py- text-lg hover:text-blue-600 duration-700"
                  >
                    Roaming with Purpose: Traveling Responsibly and Sustainably
                  </Link>
                  <p className="py-2 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend
                    tortor.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black duration-700">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 py-4 pl-4 max-xl:w-full max-xl:pl-0">
          <div className=" gap-6 max-sm:p-4 p-6 rounded-2xl flex bg-white max-lg:flex-wrap relative group">
            <div className="w-10/12 max-lg:w-full max-xl:w-6/12 ">
              <img src="blog-3.png" alt="blog-3" className="rounded-xl group-hover:scale-105 duration-300" />
            </div>
            <div className="">
              <div className="flex text-sm items-center gap-3 pb-3 text-gray-500">
                <CiUser className="text-2xl" />
                <p>Malisa John</p>
                <p>|</p>
                <FaCalendarAlt className="text-2xl" />
                <p>29 Nov, 2024</p>
              </div>
              <div className=" py-2">
                <Link
                  to="#"
                  className="py-2 text-lg hover:text-blue-600 duration-700"
                >
                  Navigating Cultures: Cross-Cultural Encounters and Insights
                </Link>
                <p className="py-2 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend
                  tortor.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black duration-700">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/4 py-4 pr-4 max-xl:w-full max-xl:pr-0">
          <div className="gap-6 max-sm:p-4 p-6 rounded-2xl flex bg-white max-lg:flex-wrap relative group">
            <div className="w-10/12 max-lg:w-full max-xl:w-6/12">
              <img src="cab1.jpg" alt="user-2" className="rounded-xl w-full group-hover:scale-105 duration-300 " />
            </div>
            <div>
              <div className="flex text-sm items-center gap-3 pb-3 text-gray-500">
                <CiUser className="text-2xl" />
                <p>Malisa John</p>
                <p>|</p>
                <FaCalendarAlt className="text-2xl" />
                <p>29 Nov, 2024</p>
              </div>
              <div className="py-2">
                <Link
                  to="#"
                  className="py- text-lg hover:text-blue-600 duration-700"
                >
                  Roaming with Purpose: Traveling Responsibly and Sustainably
                </Link>
                <p className="py-2 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend
                  tortor.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black duration-700">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/4 py-4 pl-4 max-xl:w-full max-xl:pl-0">
          <div className="gap-6 max-sm:p-4 p-6 rounded-2xl flex bg-white max-lg:flex-wrap relative group">
            <div className=" w-10/12 max-lg:w-full max-xl:w-6/12">
              <img src="cab.jpeg" alt="blog-4" className="rounded-xl max-lg:w-full w-[90%] group-hover:scale-105 duration-300" />
            </div>
            <div>
              <div className="flex text-sm items-center gap-3 pb-3 text-gray-500">
                <CiUser className="text-2xl" />
                <p>Malisa John</p>
                <p>|</p>
                <FaCalendarAlt className="text-2xl" />
                <p>29 Nov, 2024</p>
              </div>
              <div className="py-2">
                <Link
                  to="#"
                  className="py- text-lg hover:text-blue-600 duration-700"
                >
                  Roaming with Purpose: Traveling Responsibly and Sustainably
                </Link>
                <p className="py-2 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend
                  tortor.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-white hover:text-black duration-700">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
