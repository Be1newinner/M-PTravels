import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { Colors } from "@/constants/colors";
import Informations from "@/constants/informations.json";

export default function ContactInfo() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-md:p-6 h-full">
      <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
      <p className="text-gray-600 mb-6">
        We&apos;d love to hear from you! Whether you have a question about our services, need assistance, or just want to give feedback, our team is ready to help.
      </p>

      <div className="space-y-6 mb-8">
        <div className="flex items-start gap-4">
          <CiLocationOn className={`text-4xl ${Colors.textPrimary} flex-shrink-0`} />
          <div>
            <h3 className="text-xl font-semibold">Our Office</h3>
            <p className="text-gray-700">{Informations.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MdOutlinePhone className={`text-4xl ${Colors.textPrimary} flex-shrink-0`} />
          <div>
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className="text-gray-700">+91 {Informations.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FiMail className={`text-4xl ${Colors.textPrimary} flex-shrink-0`} />
          <div>
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p className="text-gray-700">{Informations.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Expert travel advice and personalized itineraries.</li>
          <li>Quick and efficient booking support.</li>
          <li>Assistance with existing bookings or changes.</li>
          <li>Feedback and suggestions are always welcome.</li>
          <li>24/7 customer support for emergencies.</li>
        </ul>
      </div>
    </div>
  );
}