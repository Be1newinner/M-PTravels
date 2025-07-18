import { MdOutlinePhone } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Informations from "@/constants/informations.json";
import { Colors } from "@/constants/colors";
import { PAGES } from "@/constants/pages";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  const socialMediaLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com" },
    { name: "Twitter", icon: FaXTwitter, url: "https://twitter.com" },
  ];

  return (
    <footer className="flex justify-between max-md:justify-between max-lg:justify-normal max-md:gap-0 max-lg:gap-10 bg-white px-4 sm:px-8 lg:px-20 py-10 max-xl:flex-wrap">
      <div className="w-1/4 max-sm:w-full max-md:w-2/3 max-lg:w-1/2">
        <Image
          width={1920}
          height={1920}
          src="/logo.webp"
          alt="logo"
          className="w-1/3 max-lg:w-1/4 max-md:w-1/3 max-sm:w-1/2"
        />
        <p className="text-gray-500 py-4">{Informations.about_short}</p>
        <p>Subscribe to our special offers</p>
        <div className="h-12 flex items-center justify-between gap-3 max-sm:flex-wrap max-sm:px-2 max-lg:px-4 border border-gray-300 px-3 mt-4 rounded-lg bg-white shadow-md">
          <Input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="flex-1 outline-none bg-transparent p-3 max-sm:p-2 rounded-md text-gray-700 placeholder-gray-400 border-none shadow-none"
          />
          <span className="text-gray-400">|</span>
          <Button className="px-6 py-1">Subscribe</Button>
        </div>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Booking</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link href={PAGES.TOUR_PACKAGES}>Book Trip</Link>
          </li>
          <li>
            <Link href={PAGES.TOUR_PACKAGES}>Travel Services</Link>
          </li>
          <li className="py-4">
            <Link href="#">Transportation</Link>
          </li>
          <li>
            <Link href={PAGES.TOUR_PACKAGES}>Planning Your Trip</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Useful Links</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link href={PAGES.HOME}>Home</Link>
          </li>
          <li>
            <Link href={PAGES.NEWS}>Blogs</Link>
          </li>
          <li className="py-4">
            <Link href={PAGES.ABOUT}>About</Link>
          </li>
          <li>
            <Link href={PAGES.CONTACT}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-medium max-xl:mt-4">Booking</p>
        <ul className="text-sm">
          <li className="pt-4 py-4">
            <Link href={PAGES.TOUR_PACKAGES}>Check-in</Link>
          </li>
          <li>
            <Link href={PAGES.TOUR_PACKAGES}>Manage Your Booking</Link>
          </li>
          <li className="py-4">
            <Link href="#">Chaurfeur Drive</Link>
          </li>
          <li>
            <Link href="#">Trip Status</Link>
          </li>
        </ul>
      </div>
      <div className="w-1/4 max-md:w-full max-xl:mt-4 ">
        <Link
          href={PAGES.PRIVACY}
          className="text-2xl font-medium max-sm:mt-4 hover:text-blue-600"
        >
          Privacy Policy
        </Link>
        <div className="flex items-center gap-3 py-2 ">
          <CiLocationOn className="text-3xl " />
          <p className="text-sm"> {Informations.address}</p>
        </div>
        <div className="flex gap-3 text-2xl items-center">
          <MdOutlinePhone className="" />
          <p className={Colors.textPrimary}>+91 {Informations.phone}</p>
        </div>
        <div className="flex gap-3 items-center py-2">
          <FiMail className="text-3xl" />
          <p>{Informations.email}</p>
        </div>
        <p className="text-sm font-bold">Follow Us</p>

        <div className="flex gap-4 py-2">
          {socialMediaLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Link key={index} href={social.url} target="_blank">
                <IconComponent
                  className={[
                    "text-white text-5xl p-3 rounded-xl",
                    Colors.primary,
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}