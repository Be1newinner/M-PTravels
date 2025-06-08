import Navbar from "@/components/home/Navbar";
import TourPackageDataWrapper from "@/components/tourPackage/TourPackageDataWrapper";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";

export default function TourPackage() {
  return (
    <div>
      <Navbar location="/tour_packages" />
      <HeaderHero title="Tour Package" />
      <TourPackageDataWrapper />
      <Footer />
    </div>
  );
}
