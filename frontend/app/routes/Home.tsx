
import Navbar from "~/components/home/Navbar";
import HomeHeroSection from "~/components/home/HomeHeroSection";
import BookVacation from "~/components/home/BookVacation";
import PackageSlider from "~/components/home/PackageSlider";
import HomeShowCase from "~/components/home/HomeShowCase";
import TravelDestinations from "~/components/home/TravelDestinations";
import ContactUs from "~/components/home/ContactUs";
import Testimonials from "~/components/home/Testimonials";
import LatestNews from "~/components/home/LatestNews";
import Footer from "~/components/home/Footer";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HomeHeroSection />
      <BookVacation />
      <PackageSlider />
      <HomeShowCase />
      <TravelDestinations />
      <ContactUs />
      <Testimonials />
      <LatestNews />
      <Footer />
    </div>
  );
}
