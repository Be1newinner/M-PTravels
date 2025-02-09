import { CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";
export default function AllTime() {
  const list = [
    {
      photo: "blog-1.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
    {
      photo: "blog-2.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
    {
      photo: "blog-3.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
    {
      photo: "blog-4.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
    {
      photo: "blog-5.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
    {
      photo: "blog-6.png",
      userIcon: <CiUser />,
      userName: "Malisa John",
      calendarIcon: <LuCalendarDays />,
      date: "08 Aug, 2023",
      roamingText:
        "Roaming with Purpose: Traveling Responsibly and Sustainably",
      para: "Lorem ipsum dolor sit amet consectetur. Feugiat sit eleifend tortor lectus adipiscing aliquam.",
    },
  ];

  return (
    <div className="bg-gray-200 py-4">
      <div className="px-72 max-md:px-4 max-lg:px-8 max-xl:px-24 max-2xl:px-44">
        <div className="text-3xl max-sm:text-2xl font-medium my-4 max-sm:px-2 flex max-xl:flex-wrap max-md:px-0 justify-center bg-white rounded-xl w-full items-center">
          <button className="bg-blue-600 px-8 max-sm:px-4 py-4 p-2 rounded-lg text-white hover:bg-white hover:text-black duration-700 shadow-md">
            All Time
          </button>
          <p className="font-light"></p>
          <button className="hover:bg-blue-600 px-7 rounded-lg py-4 hover:text-white duration-700">
            Today
          </button>
          <p className="font-light">|</p>
          <hr className="border-l-2 " />
          <button className="hover:bg-blue-600 px-8 py-4 rounded-lg hover:text-white duration-700">
            This Week
          </button>
          <p className="font-light">|</p>
          <button className="hover:bg-blue-600 px-7 py-4 rounded-lg hover:text-white duration-700">
            This Month
          </button>
          <p className="font-light">|</p>
          <button className="hover:bg-blue-600 rounded-lg px-7 py-4 hover:text-white duration-700">
            This Year
          </button>
        </div>
      </div>

      <div className=" flex items-center justify-start gap-6 flex-wrap mt-6 px-24 max-md:px-4 max-lg:px-8 max-2xl:px-16 mx-auto max-2xl:gap-5">
        {list.map((item, index) => (
          <div
            key={index}
            className="p-4 mt-4 w-[32%] max-md:w-full max-lg:w-[48%] max-xl:w-full max-xl:flex max-lg:flex-wrap max-lg:gap-0 max-xl:gap-8 rounded-xl h-full bg-white group relative"
          >
            <img
              src={item.photo}
              alt="blogs"
              className="rounded-xl max-lg:w-full group-hover:scale-105 duration-300 max-xl:w-1/2"
            />
            <div>
              <div className="flex max-sm:text-sm max-lg:text-xl max-lg:gap-2 text-center items-center gap-6 max-sm:gap-4 text-xl text-gray-500 py-3">
                <div className="flex  items-center gap-2">
                  {item.userIcon} {item.userName}
                </div>
                <div className="font-m text-3xl max-sm:text-xl">|</div>
                <div className="flex items-center gap-2">
                  {item.calendarIcon} {item.date}
                </div>
              </div>
              <Link
                to="/news_Listing"
                className="text-xl hover:text-blue-500 duration-500 font-medium pr-20 py-3"
              >
                {item.roamingText}
              </Link>
              <div className="py-2">{item.para}</div>
              <div>
                <button className="font-medium bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black duration-700 shadow-lg">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex pb-8 justify-center">
        <ul className="flex gap-6 relative items-center ">
          <li className="px-6 py-2 bg-blue-500 rounded-xl text-white hover:scale-110 duration-300 hover:bg-white hover:text-black">1</li>
          <li className="px-6 py-2 rounded-xl bg-slate-100 shadow-lg hover:scale-110 hover:text-white hover:bg-blue-500 duration-700 text-black">2</li>
          <li className="px-6 py-2 rounded-xl bg-slate-100 shadow-lg hover:scale-110 hover:text-white hover:bg-blue-500 duration-700 text-black">3</li>
          <li className="px-6 py-2 rounded-xl bg-slate-100 shadow-lg hover:scale-110 hover:text-white hover:bg-blue-500 duration-700 text-black">4</li>
        </ul>
        </div>
      </div>
    </div>
  );
}
