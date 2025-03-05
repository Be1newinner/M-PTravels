import { Link } from "react-router";
import { Colors } from "~/constants/colors";
import { PAGES } from "~/constants/pages";

export default function TripFillingForm() {
  return (
    <div>
      <div className="w-full flex max-xl:flex-wrap gap-4 max-sm:px-2 max-xl:px-10 bg-gray-100">
        <div className="pl-16 max-xl:pl-0 pr-4 max-xl:pr-0  pt-4 h-full w-8/12 max-xl:w-full">
          <form>
            <div className="p-4 py-10 w-full bg-white shadow-lg rounded-lg">
              <p className="text-2xl font-medium">Enter Your Details</p>
              <div className="flex flex-wrap max-sm:flex-wrap mt-4 ">

                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="h-full w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-full w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Contact Number"
                    className="h-full w-full max-sm:w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <input
                    type="number"
                    name="no_of_people"
                    placeholder="No. of People"
                    className="h-full w-full max-sm:w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="h-12 w-full max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <input
                    type="text"
                    name="pickup_address"
                    placeholder="Your Pickup Address!"
                    className="h-full w-full max-sm:w-full placeholder:text-black bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="w-full max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <textarea
                    name="special_request"
                    placeholder="Any other detail or message?"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 pt-3"
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 py-8 w-full bg-white shadow-lg rounded-lg">
              <p className="text-2xl font-medium"> Enter Trip Date </p>
              <div className="flex flex-wrap max-sm:flex-wrap mt-4 ">
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <label htmlFor="start_date">Trip Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    placeholder="Trip Start Date"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
                <div className="h-12 w-1/2 max-sm:w-full pr-4 max-sm:pr-0 my-4">
                  <label htmlFor="end_date">Trip End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    placeholder="Trip End Date"
                    className="h-full w-full bg-gray-200 px-4 outline-none rounded-md border-b-2 "
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="mt-8 mb-2 h-12 w-full"
            >
              Book Trip!
            </button>
            <div>
              <span>
                By signing in or creating an account, you agree with our
                <Link to={PAGES.PRIVACY} className={Colors.textPrimary}>
                  {" "}Terms & conditions
                </Link>
              </span>
            </div>
          </form>
        </div>
        <div className="w-4/12 max-xl:w-full max-xl:pr-0 bg-gray-100 pr-16 py-4">
          <div>
            <div className="bg-white rounded-lg shadow-lg">
              <div className="px-4 py-3 w-full rounded-t-lg bg-slate-300 text-2xl max-sm:text-xl font-medium">
                <p>Your Booking Details</p>
              </div>
              <div className="flex text-center items-center max-sm:gap-4 justify-between px-8 max-md:px-4 max-lg:px-48 max-xl:px-60 py-4">
                <div className="">
                  <p className="text-lg max-sm:text-sm font-medium">12:00</p>
                  <p className="text-lg max-sm:text-sm font-medium text-gray-500">
                    DUB
                  </p>
                </div>
                <div className="flex items-center gap-4 max-sm:gap-2">
                  <p className="text-sm font-medium">From</p>
                  <div className="flex flex-col items-center">
                    <p>0h 50m</p>
                    <img src="route-plan.png" alt="plan "></img>
                    <p className="text-sm font-medium">1 Stop</p>
                  </div>
                  <p className="text-sm font-medium">To</p>
                </div>
                <div>
                  <p className="text-lg max-sm:text-sm font-medium">12:50</p>
                  <p className="text-lg max-sm:text-sm font-medium text-gray-500">
                    SHJ
                  </p>
                </div>
              </div>
              <div className="flex justify-between px-8 max-md:px-4 pb-8 py-2 max-xl:px-24">
                <div className="py-2">
                  <p className="text-smfont-medium text-gray-500 ">Departure</p>
                  <p className="text-lg max-sm:text-base font-medium">
                    14 Aug, 2023
                  </p>
                </div>
                <div className="w-[1px] border-l-2 border-gray-500"></div>
                <div className="py-2">
                  <p className="text-sm font-medium text-gray-500">Arrival</p>
                  <p className="text-lg max-sm:text-base font-medium">
                    14 Aug, 2023
                  </p>
                </div>
              </div>
              <div className="px-4">
                <hr className="border-gray-400 "></hr>
              </div>
              <div className="text-sm font-medium text-gray-500 py-8 max-sm:py-4 px-4">
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
              <div className="flex justify-between px-8 max-xl:px-4 py-4 max-sm:pt-4">
                <div className="">
                  <p>Adult x 1</p>
                  <p className="text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">$540</p>
                </div>
              </div>
              <div className="flex justify-between px-8 max-xl:px-4 py-4 max-sm:py-2">
                <div className="">
                  <p>Room Service</p>
                  <p className="text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">$50</p>
                </div>
              </div>
              <div className="flex justify-between px-8 max-xl:px-4 py-4 max-sm:py-2">
                <div className="">
                  <p>Gym Fee</p>
                  <p className="text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">$30</p>
                </div>
              </div>
              <div className="flex justify-between px-8 max-xl:px-4 py-4 max-sm:py-2">
                <div className="">
                  <p>Service Charges</p>
                  <p className="text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">$20</p>
                </div>
              </div>
              <div className="flex justify-between px-8 max-xl:px-4 py-4 max-sm:py-2">
                <div className="">
                  <p>Sub Total</p>
                  <p className="text-sm font-medium text-gray-500">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium">$640</p>
                </div>
              </div>
              <hr className="border-gray-400"></hr>
              <div className="flex text-2xl max-sm:text-lg font-medium justify-between p-8 max-xl:p-4">
                <p>Deal / Discount</p>
                <p>$40</p>
              </div>
              <div className="flex text-2xl max-sm:text-lg font-medium justify-between pb-8 max-sm:pb-4 px-8 max-xl:px-4 ">
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
