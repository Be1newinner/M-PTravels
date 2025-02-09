import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { TbEyeDollar } from "react-icons/tb";
import { AiOutlineComment } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { ImSpoonKnife } from "react-icons/im";
import { LuTicket } from "react-icons/lu";
import { LuHotel } from "react-icons/lu";

export default function SideBar() {
  // const Visiting = [
  //   {
  //     photo:""
  //   }
  // ]

  return (
    <div className="bg-slate-100 ">
      <div className="px-16 py-10 flex justify-between max-lg:flex-wrap max-sm:px-2 max-md:gap-3 max-2xl:gap-8 max-xl:px-14 max-md:px-6">
        <div className="flex px-14 gap-2 py-5 shadow-lg rounded-lg bg-gray-100 max-xl:px-2 max-2xl:px-5 max-xl:w-full items-center max-xl:justify-center ">
          <div className="flex gap-4">
            <SiTicktick className="text-4xl text-center text-blue-600 " />
            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              Free Cancellation
            </h1>
          </div>
        </div>
        <div className="flex px-14 gap-2 py-5 shadow-lg rounded-lg items-center bg-gray-100 max-xl:w-full max-2xl:px-5 max-xl:px-2 max-xl:justify-center">
          <div className="flex gap-4 text-center">
            <TbEyeDollar className="text-4xl text-blue-600 " />

            <h1 className="text-2xl max-sm:text-xl max-2xl:text-xl font-medium">
              No Hidden Charges
            </h1>
          </div>
        </div>
        <div className="flex px-14 gap-2 rounded-lg shadow-lg py-5 items-center bg-gray-100 max-xl:px-2 max-2xl:px-5 max-xl:w-full max-xl:justify-center">
          <div className="flex gap-4">
            <AiOutlineComment className="text-4xl text-blue-600 " />
            <h1 className="text-2xl max-sm:text-xl max-xl:text-2xl max-2xl:text-xl font-medium">
              24/7 Customer Service
            </h1>
          </div>
        </div>
      </div>

      <div className="flex max-xl:flex-wrap gap-10 max-sm:gap-2 max-sm:px-2 max-lg:px-4 px-16 ">
        <div className="w-4/12 max-xl:w-full ">
          <div className="bg-white shadow-xl rounded-xl ">
            <div>
              <div className="h-16 w-full px-10 rounded-t-xl bg-slate-200 text-2xl font-medium">
                <p className="py-4">Search</p>
              </div>
              <div className=" px-5 py-4">
                <div className="border px-5 rounded-lg bg-slate-200 py-2 border-black">
                  <p className="text-sm font-medium text-gray-500">
                    Destination/ property
                  </p>
                  <div className="flex text-center items-center gap-4">
                    <IoSearchOutline className="text-3xl text-blue-500 " />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search"
                      className="outline-none h-full w-full bg-slate-200"
                    />
                  </div>
                </div>
              </div>
              <div className=" px-5 pb-4">
                <div className="border px-5 rounded-lg bg-slate-200 py-2 border-black">
                  <p className="text-sm font-medium text-gray-500">
                    Check-in date
                  </p>
                  <div className="flex items-center gap-4">
                    <FaRegCalendarAlt className="text-xl text-blue-500 " />
                    <input
                      type="date"
                      name="date"
                      placeholder="Search"
                      className="outline-none h-full w-full bg-slate-200"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-5 pb-10 rounded-lg">
                <button className="bg-blue-700 rounded-lg w-full text-white shadow hover:bg-slate-100 hover:text-black duration-700 h-12">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 shadow-xl rounded-xl">
            <div className="">
              <div className="h-16 w-full px-10 rounded-t-xl bg-slate-200 text-2xl font-medium">
                <p className="py-4">Filter By:</p>
              </div>
              <p className="px-5 py-5 text-2xl font-medium">
                Price Range (Per Night)
              </p>
              <div className="w-full px-5 pb-10 rounded-lg">
                <div className="flex justify-between font-medium text-lg">
                  <p>$100</p>
                  <p>$3000</p>
                </div>
                <input type="range" name="range" className="w-full"></input>
              </div>
              <div className="px-5">
                <hr className=" border-gray-500 " />
              </div>
              <p className="px-5 py-5 text-2xl font-medium">Popular Filters</p>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id1" name="Separate Rooms"></input>
                  <label for="id1">Separate Rooms</label>
                </div>
                <div>
                  <p>(02)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id2" name="Separate Rooms"></input>
                  <label for="id2">Self Catering</label>
                </div>
                <div>
                  <p>(04)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id3" name="Separate Rooms"></input>
                  <label for="id3">No Prepayment</label>
                </div>
                <div>
                  <p>(06)</p>
                </div>
              </div>
              <div className="px-5 pt-2">
                <hr className=" border-gray-500  " />
              </div>
              <p className="px-5 py-5 text-2xl font-medium">Fun things to do</p>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id4" name="Separate Rooms"></input>
                  <label for="id4">City Tour</label>
                </div>
                <div>
                  <p>(02)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id5" name="Separate Rooms"></input>
                  <label for="id5">Heritage</label>
                </div>
                <div>
                  <p>(04)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id6" name="Separate Rooms"></input>
                  <label for="id6">Localities</label>
                </div>
                <div>
                  <p>(06)</p>
                </div>
              </div>
              <div className="px-5 pt-2">
                <hr className=" border-gray-500  " />
              </div>
              <p className="px-5 py-5 text-2xl font-medium">
                Cancellation Policy
              </p>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id7" name="Separate Rooms"></input>
                  <label for="id7">Free Cancellation</label>
                </div>
                <div>
                  <p>(02)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id8" name="Separate Rooms"></input>
                  <label for="id8">Book without credit card</label>
                </div>
                <div>
                  <p>(04)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input type="checkbox" id="id9" name="Separate Rooms"></input>
                  <label for="id9">No Prepayment</label>
                </div>
                <div>
                  <p>(06)</p>
                </div>
              </div>
              <div className="px-5 pt-2">
                <hr className=" border-gray-500  " />
              </div>
              <p className="px-5 py-5 text-2xl font-medium">Facilities</p>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="id10"
                    name="Separate Rooms"
                  ></input>
                  <label for="id10">Non-Smoking Rooms</label>
                </div>
                <div>
                  <p>(02)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="Free WiFi"
                    name="Separate Rooms"
                  ></input>
                  <label for="Free WiFi">Free WiFi</label>
                </div>
                <div>
                  <p>(04)</p>
                </div>
              </div>
              <div className="px-5 py-2 flex justify-between text-lg font-medium">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="Family Rooms"
                    name="Separate Rooms"
                  ></input>
                  <label for="Family Rooms">Family Rooms</label>
                </div>
                <div>
                  <p>(06)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-8/12 max-xl:w-full">
          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="Taj mahal1.jpg"
                alt="Taj Mahal"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Taj Mahal</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="Rajasthan.jpg"
                alt="Rajasthan"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Rajasthan</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="Uttarakhand.jpg"
                alt="Uttarakhand"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Uttarakhand</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="Madhya Pradesh.jpg"
                alt="Madhya Pradesh"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Madhya Pradesh</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="KutubMinar.jpg"
                alt="Qutub Minar"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Qutub Minar</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-wrap shadow-lg gap-8 p-6 my-6 rounded-3xl bg-white">
            <div className="flex justify-between max-md:flex-wrap gap-8">
              <img
                src="kerala-december.jpg"
                alt="Kerala"
                className="w-1/4 max-md:w-full rounded-xl "
              ></img>
              <div className="flex w-full justify-between max-sm:flex-wrap ">
                <div>
                  <p className="text-2xl font-medium">Kerala</p>
                  <div className="flex gap-3 mt-4 items-center">
                    <CiLocationOn className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Pick-up Location:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Luxury Car Pickup
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <ImSpoonKnife className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuTicket className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">3 Meals/day:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Localities / Your Choice
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2 items-center">
                    <LuHotel className="text-3xl" />
                    <div>
                      <p className="text-sm font-medium ">Premium Lodgings:</p>
                      <p className="text-sm font-medium text-gray-500">
                        Fully Equipped Rooms
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-sm:w-full pl-24 max-sm:pt-4 max-2xl:pl-0">
                  <p className="bg-slate-200 py-2 px-4 text-sm font-medium rounded-lg">
                    Pre-Registration available
                  </p>
                  <div className="px-2 pt-8 max-sm:pt-4">
                    <span className="text-4xl inline font-medium">$500.00</span>
                    <p className="text-sm inline font-medium">/person</p>
                    <p className="text-sm font-medium">Total $550.40</p>
                    <Link to="/trip_booking">
                      <button className="bg-blue-600 text-white text-sm font-medium shadow-lg rounded-lg hover:text-black hover:bg-white duration-700 px-10 w-full py-3 mt-6">
                        Select
                      </button>
                    </Link>
                    <button className="bg-slate-100 shadow-lg text-sm font-medium rounded-lg border border-black hover:text-white hover:bg-orange-600 duration-700 px-10 w-full py-3 mt-3">
                      Email Quotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
