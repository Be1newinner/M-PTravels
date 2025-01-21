import { MdOutlinePhone } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="flex justify-between px-20 py-10 max-xl:flex-wrap max-sm:px-4 max-xl:px-8 ">
      <div className="w-1/4 max-xl:w-full">
        <img src="logo2.png" alt="logo" className="w-1/3"/>
        <p className="text-gray-500 py-4">
          Lorem ipsum dolor sit amet consectetur. Aliquet vulputate augue
          penatibus in libero et id aliquam. In ridiculus pretium est velit
          euismod.
        </p>
        <p>Subscribe to our special offers</p>
        <div className="h-12 w-full gap-3 flex max-sm:flex-wrap  border-black items-center px-1 mt-4 rounded-lg bg-slate-200 max-xl:gap-2 ">
          <input
            type="text"
            name="email"
            placeholder="Email address"
            className="outline-none bg-slate-200 p-3 max-sm:p-1"
          />
          <p>|</p>
          <button>Subscribe</button>
        </div>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Booking</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link to="#">Book Trip</Link>
          </li>
          <li>
            <Link to="#">Travel Services</Link>
          </li>
          <li className="py-4">
            <Link to="#">Transportation</Link>
          </li>
          <li>
            <Link to="#">Planning Your Trip</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Useful Links</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">Blogs</Link>
          </li>
          <li className="py-4">
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Booking</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link to="#">Check-in</Link>
          </li>
          <li>
            <Link to="#">Manage Your Booking</Link>
          </li>
          <li className="py-4">
            <Link to="#">Chaurfeur Drive</Link>
          </li>
          <li>
            <Link to="#">Trip Status</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/4 max-xl:w-full max-xl:mt-4 ">
        <p className="text-2xl font-medium max-sm:mt-4">Contact Us</p>
        <div className="flex items-center gap-3 py-2 ">
          <CiLocationOn className="text-3xl " />
          <p className="text-sm"> Saket, New Delhi, 110080</p>
        </div>
        <div className="flex gap-3 text-2xl items-center">
          <MdOutlinePhone className="" />
          <p className="text-blue-600">+91 9720169030</p>
        </div>
        <div className="flex gap-3 items-center py-2">
          <FiMail className="text-3xl" />
          <p>tahirsaifi413@gmail.com</p>
        </div>
        <p className="text-sm font-bold">Follow Us</p>
        <div className="flex gap-4 py-2 ">
          <Link to="https://www.instagram.com/tahirsaifi09/">
            <FaInstagram className="bg-blue-600 text-white text-5xl p-3 rounded-xl" />
          </Link>
          <Link to="https://www.facebook.com/profile.php?id=100017542631967">
            <FaFacebookF className="bg-blue-600 text-white text-5xl p-3 rounded-xl" />
          </Link>
          <Link to="https://www.linkedin.com/in/tahir-saifi-568a95182/">
            <FaLinkedinIn className="bg-blue-600 text-white text-5xl p-3 rounded-xl" />
          </Link>
          <Link to="https://x.com/tahirsaifi09">
            <FaXTwitter className="bg-blue-600 text-white text-5xl p-3 rounded-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
