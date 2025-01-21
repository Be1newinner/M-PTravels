import { GoCheck } from "react-icons/go";
import { Link } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { FaWheelchair } from "react-icons/fa6";

export default function Form() {
  return (
    <div>
      <div className="w-full flex gap-4 bg-gray-100">
        <div className="pl-16 pr-4 py-4 h-full w-8/12 ">
          <div className="w-full px-4 py-4 rounded-lg shadow-xl bg-white items-center">
            <ul className="flex items-center gap-5">
              <li className="w-4/12 flex text-center items-center gap-4 ">
                <button className="h-8 w-8 bg-blue-600 rounded-full text-2xl font-medium flex items-center">
                  <GoCheck className=" mx-auto text-center text-white" />
                </button>
                <p className="">Your Selection</p>
                <hr className="border-2 w-5/12"></hr>
              </li>
              <li className="w-4/12 flex items-center gap-4 ">
                <button className="h-8 w-8 bg-blue-600 rounded-full text-white font-medium">
                  2
                </button>
                <p>Your Details</p>
                <hr className="w-5/12 border-2"></hr>
              </li>
              <li className="flex items-center w-4/12 gap-4">
                <button className="h-8 w-8 bg-gray-200 text-xl text-center font-medium border rounded-full">
                  3
                </button>
                <h1 className="">Finel step</h1>
                <hr className="border-2 w-5/12"></hr>
              </li>
            </ul>
          </div>
          <form>
            <div className="p-4 py-10 mt-10 w-full bg-white shadow-lg rounded-lg">
              <p className="text-2xl font-medium pb-8">Enter Your Details</p>
              <div className="flex justify-between gap-8">
                <div className=" h-12 w-1/3 flex  bg-gray-200 px-4 rounded-md">
                  <select className="py-2  outline-none w-full h-full bg-gray-200 px-2 rounded-md">
                    <option selected disabled>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="h-12 w-1/3 ">
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    className="outline-none h-full w-full px-4 bg-gray-200 rounded-md border-b-2 border-red-600"
                  />
                </div>
                <div className="h-12 w-1/3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Last Name"
                    className="outline-none h-full w-full px-4 bg-gray-200 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-4 ">
                <div className="h-12 w-1/2 pr-4 my-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 border-red-600"
                  />
                </div>
                <div className="h-12 w-1/2 pl-4 my-4">
                  <select className="h-full w-full bg-gray-200 outline-none px-4 rounded-md">
                    <option selected disabled>
                      Nationality
                    </option>
                    <opion>American</opion>
                    <option>Britian</option>
                    <option>Indian</option>
                    <option>Canadian</option>
                    <option>Pakistani</option>
                  </select>
                </div>
                <div className="h-12 w-1/2 pr-4 my-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Number"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 border-red-600"
                  />
                </div>
                <div className="h-12 w-1/2 pl-4 my-4">
                  <input
                    type="date"
                    name="date"
                    placeholder="Date of Birth"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 border-red-600"
                  />
                </div>
                <div className="h-12 w-1/2 pr-4 my-4">
                  <input
                    type="pin"
                    name="pin"
                    placeholder="Postal Code"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 border-red-600"
                  />
                </div>
                <div className="h-12 w-1/2 pl-4 my-4">
                  <input
                    type="num"
                    name="num"
                    placeholder="Flight Number"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 border-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white w-full mt-8 p-6 rounded-lg shadow-lg">
              <div className="w-1/2 ">
                <h6 className="font-medium text-2xl">Save your details!</h6>
                <div className="text-gray-400 text-sm font-medium">
                  <p>
                    Use your contact details to create an account and speed up
                    future bookings.(We won't save your payment information.)
                  </p>
                  <div className="text-lg font-medium py-4 flex gap-2">
                    <input type="checkbox" id="checkbox" />
                    <label for="checkbox">
                      Save my detail so i can book faster next time.
                    </label>
                  </div>
                  <p>
                    By signing in or creating an account, you agree with our
                  </p>
                  <Link to="#" className="text-blue-500">
                    Terms & conditions
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white w-full mt-8 px-6 py-10 rounded-lg shadow-lg">
              <p className="pb-6 text-2xl font-medium">Extras</p>
              <div className="flex h-12 w-full items-center bg-blue-200 px-4 border border-black rounded-md">
                <ImSpoonKnife className="text-2xl" />
                <select className="w-full h-full bg-blue-200 outline-none">
                  <option selected disabled>
                    Select Meal Type
                  </option>
                  <option>Fast Food</option>
                  <option>Vegetarian</option>
                  <option>Non-Veg</option>
                </select>
              </div>
              <div className="flex h-12 items-center bg-blue-200 px-4 border border-black rounded-md mt-4 ">
                <FaWheelchair className="text-2xl" />
                <select className="w-full h-full bg-blue-200 outline-none">
                  <option selected disabled>
                    Request Wheelchair
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <input
              type="submit"
              value="Next"
              className="h-12 w-full bg-blue-600 text-white shadow-lg hover:bg-white hover:text-black duration-700 rounded-lg my-8"
            />
          </form>
        </div>
        <div className="w-4/12 bg-gray-100 pr-16 py-4">
        <div>
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-4 py-3 w-full rounded-t-lg bg-slate-300 text-2xl font-medium">
              <p>Your Booking Details</p>
            </div>
            <div className="flex text-center items-center justify-between px-8 py-4">
              <div className="">
                <p className="text-lg font-medium">12:00</p>
                <p className="text-lg font-medium text-gray-500">DUB</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium">From</p>
                <div className="flex flex-col items-center">
                  <p>0h 50m</p>
                  <img src="route-plan.png"></img>
                  <p className="text-sm font-medium">1 Stop</p>
                </div>
                <p className="text-sm font-medium">To</p>
              </div>
              <div>
                <p className="text-lg font-medium">12:50</p>
                <p className="text-lg font-medium text-gray-500">SHJ</p>
              </div>
            </div>
            <div className="flex justify-between px-8 pb-8 py-2">
              <div className="py-2">
                <p className="text-sm font-medium text-gray-500 ">Departure</p>
                <p className="text-lg font-medium">14 Aug, 2023</p>
              </div>
              <div className="w-[1px] border-l-2 border-gray-500"></div>
              <div className="py-2">
                <p className="text-sm font-medium text-gray-500">Arrival</p>
                <p className="text-lg font-medium">14 Aug, 2023</p>
              </div>
            </div>
            <div className="px-4">
            <hr className="border-gray-400 "></hr>
            </div>
            <div className="text-sm font-medium text-gray-500 py-8 px-4">
              <p>Tpm Line</p>
              <p>Operated by Feel Dubai Airlines</p>
              <p>Economy | Flight FK234 | Aircraft BOEING 777-90</p>
              <p>Adult(s): 25KG luggage free</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-lg mt-8">
            <div className="px-4 py-3 w-full rounded-t-lg bg-slate-300 text-2xl font-medium">
              <p>Price Summary</p>
            </div>
            <div className="flex justify-between px-8 py-4">
              <div className="">
                <p>Adult x 1</p>
                <p className="text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div>
                <p className="text-lg font-medium">$540</p>
              </div>
            </div><div className="flex justify-between px-8 py-4">
              <div className="">
                <p>Room Service</p>
                <p className="text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div>
                <p className="text-lg font-medium">$50</p>
              </div>
            </div><div className="flex justify-between px-8 py-4">
              <div className="">
                <p>Gym Fee</p>
                <p className="text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div>
                <p className="text-lg font-medium">$30</p>
              </div>
            </div><div className="flex justify-between px-8 py-4">
              <div className="">
                <p>Service Charges</p>
                <p className="text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div>
                <p className="text-lg font-medium">$20</p>
              </div>
            </div><div className="flex justify-between px-8 py-4">
              <div className="">
                <p>Sub Total</p>
                <p className="text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <div>
                <p className="text-lg font-medium">$640</p>
              </div>
            </div>
            <hr className="border-gray-400"></hr>
            <div className="flex text-2xl font-medium justify-between p-8 ">
              <p>Deal / Discount</p>
              <p>$40</p>
            </div>
            <div className="flex text-2xl font-medium justify-between pb-8 px-8 ">
              <p>Total</p>
              <p>$600</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
