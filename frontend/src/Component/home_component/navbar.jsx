import { Link, NavLink, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const links = [
    {
      page: "Home",
      path: "/",
    },
    {
      page: "Trip Booking",
      path: "/tripBooking",
    },
    {
      page: "Tour Package",
      path: "/tourPackage",
    },
    {
      page: "Pages",
      path: "",
      isDropdown: true,
      items: [
        {
          page: "Contact",
          path: "/contact",
        },
        {
          page: "Privacy Policy",
          path: "/privacyPage",
        },
        {
          page: "Login",
          path: "/login",
        },
        {
          page: "Signup",
          path: "/signup",
        },
      ],
    },
  ];

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  function handleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleMouseEnter(index) {
    setIsDropdownOpen(true);
    setActiveDropdown(index)
  }

  function handleMouseLeave() {
    setIsDropdownOpen(false)
    setActiveDropdown(null)
  }

  const location = useLocation();
  // console.log("location", location)

  return (
    <div className="h-full flex items-center px-10 py-2 bg-[#ECECF2] max-md:px-3 max-xl:px-10 max-md:py-2 max-xl:py-4 relative">
      <div className="flex justify-between max-md:items-center max-xl:w-full ">
        <a href="/" className="w-4/12 max-md:w-2/12 max-xl:w-2/12">
          <img src="logo2.png" alt="logo" className=" "></img>
        </a>
        <div className="">
          <button onClick={toggleDropDown} className="flex justify-end">
            <IoReorderThreeOutline className="text-blue-600 text-5xl max-md:text-4xl xl:hidden" />
          </button>
          {isOpen && (
            <ul className="absolute top-20 right-0 bg-black z-50  text-white font-medium w-1/2 p-6 xl:hidden">
              {links.map((item, i) => (
                <>
                  <li
                    key={i}
                    className="py-4"
                    onClick={item.isDropdown ? handleDropdown : null}
                  >
                    <Link to={item.path}>{item.page}</Link>
                  </li>
                  {isDropdownOpen &&
                    item.isDropdown &&
                    item.items.map((dropdownItem, index) => (
                      <li key={index} className="py-4">
                        <Link to={dropdownItem.path}>{dropdownItem.page}</Link>
                      </li>
                    ))}
                  <hr className="border-gray-500" />
                </>
              ))}

              <div className="flex gap-4 items-center pt-4">
                <div className="w-8 h-8 flex justify-center items-center text-2xl rounded-full bg-blue-700">
                  <TbMailFilled />
                </div>
                <p className="text-sm ">tahirsaifi413@gmail.com</p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center ">
                  <FaPhoneAlt />
                </div>
                +91 9720169030
              </div>
            </ul>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="flex justify-between w-full text-lg font-medium max-xl:hidden">
        <div className="flex gap-10 py-5 relative">
          {links.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-black"
                } py-4`}
              >
                {item.page}
              </Link>

              {isDropdownOpen &&
                activeDropdown === index &&
                item.isDropdown && (
                  <div className="flex absolute -right-24 top-10 flex-col px-4 py-3 rounded-md bg-white transition-all delay-200 duration-300 ease-in-out">
                    <ul>
                      {item.items?.slice(0, 2).map((subItem, subIndex) => (
                        <li key={subIndex} className="py-1 ">
                          <Link
                            to={subItem.path}
                            className={
                              location.pathname === subItem.path
                                ? "text-blue-600"
                                : "hover:text-blue-600"
                            }
                          >
                            {subItem.page}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xl">
          <Link to="#">
            <CiSearch className="text-3xl" />
          </Link>
          <a href="/login" className="hover:text-blue-600">
            Login
          </a>
          <p>/</p>
          <Link to="/signup" className="hover:text-blue-600">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
