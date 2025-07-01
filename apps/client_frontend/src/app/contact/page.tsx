import Navbar from "@/components/home/Navbar";
import Map from "@/components/contactUs/Map";
import Footer from "@/components/home/Footer";
import ContactForm from "@/components/contactUs/ContactForm";
import HeaderHero from "@/components/HeaderHero";
import ContactInfo from "@/components/contactUs/ContactInfo";

export default function Contact() {
  return (
    <div>
      <Navbar location="/contact" />
      <HeaderHero title="Contact Us" />
      <div className="bg-slate-50 py-16 max-md:py-8">
        <div className="container flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <ContactInfo />
          </div>
          <div className="w-full lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
      <Map />
      <Footer />
    </div>
  );
}