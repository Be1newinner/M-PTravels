import { useState } from "react";
import { Link, useLocation } from "react-router";
import { IoReorderThreeOutline } from "react-icons/io5";
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import MenuList from "app/constants/MenusList.json";
import Informations from "app/constants/informations.json";
import { Colors } from "app/constants/colors";
import { PAGES } from "~/constants/pages";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    <div className="bg-[#ECECF2]">
      <div className="container h-full flex items-center justify-between py-2 max-md:py-2 max-xl:py-4 relative">
        <Link to={PAGES.HOME} className="w-24 aspect-square">
          <img src="/logo.webp" alt="logo" />
        </Link>

        <div className="flex justify-between max-sm:h-12 items-center max-xl:w-ful">
          <button onClick={toggleDropDown} className="flex justify-end">
            <IoReorderThreeOutline className="text-white px-1 py-2 text-5xl  xl:hidden" />
          </button>
          {isOpen && (
            <ul className="absolute top-20 right-0 bg-black z-50  text-white font-medium max-sm:w-full p-6 xl:hidden">
              {MenuList.map((item) => (
                <li key={item.id}>
                  <Link to={item.path}>
                    <div className="pt-4">
                      <span>{item.pageName}</span>
                      <hr className="border-gray-500 mt-4" />
                    </div>
                  </Link>
                </li>
              ))}

              <div className="flex gap-4 items-center pt-4">
                <div className="w-8 h-8 flex justify-center items-center text-2xl rounded-full bg-blue-700">
                  <TbMailFilled />
                </div>
                <p className="text-sm ">{Informations.email}</p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center ">
                  <FaPhoneAlt />
                </div>
                +91 {Informations.phone}
              </div>
            </ul>
          )}
        </div>

        {/* Desktop View */}
        <div className="flex justify-between text-lg font-medium max-xl:hidden">
          <div className="flex gap-10 py-5 relative">
            {MenuList.map((item) => (
              <div key={item.id} className="relative">
                <Link
                  to={item.path}
                  className={`underline-offset-4  ${location.pathname === item.path
                      ? `underline text-xl ${Colors.textPrimary}`
                      : "text-black hover:underline"
                    } py-4`}
                >
                  {item.pageName}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
