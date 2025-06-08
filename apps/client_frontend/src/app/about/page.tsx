import Navbar from "@/components/home/Navbar";
import Journey from "@/components/about/Journey";
import OurHistory from "@/components/about/OurHistory";
import ContactUs from "@/components/home/ContactUs";
import Available from "@/components/home/Available";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";

export default function AboutPage() {
  return (
    <div className="bg-gray-200">
      <Navbar location="/about" />
      <HeaderHero title="About Us" />
      <Journey />
      <OurHistory />
      <ContactUs />
      <div className="px-4 max-xl:px-0 max-2xl:px-4 max-lg:px-0">
        <Available />
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
}
