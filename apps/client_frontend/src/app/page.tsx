import Navbar from "@/components/home/Navbar";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeShowcase from "@/components/home/HomeShowCase";
import BookVacation from "@/components/home/BookVacation";
import PackageSlider from "@/components/home/PackageSlider";
import ContactUs from "@/components/home/ContactUs";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Navbar location="/" />
      <HomeHeroSection />
      <BookVacation />
      <PackageSlider />
      <HomeShowcase />
      <ContactUs />
      <Testimonials />
      <Footer />
    </div>
  );
}