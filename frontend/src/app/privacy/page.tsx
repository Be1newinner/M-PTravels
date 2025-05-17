/** @format */
import Nav from "@/components/home/Navbar";
import PrivacyComponent from "@/components/privacy/Privacy";
import Blog from "@/components/privacy/Blog";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";

export default function Privacy() {
  return (
    <div>
      <Nav location="/privacy" />
      <HeaderHero title="Privacy Policy" />
      <div className="flex max-lg:items-center m-10 max-sm:m-2 max-xl:m-4 max-md:m-6 max-lg:m-4 max-md:px-4 max-sm:px-0 px-10 max-lg:flex-col">
        <PrivacyComponent />
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
