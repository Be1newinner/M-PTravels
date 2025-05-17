import Navbar from "@/components/home/Navbar";
import TourPackageDataWrapper from "@/components/tourPackage/TourPackageDataWrapper";
import TourPackageHero from "@/components/tourPackage/TourPackageHero";
import Footer from "@/components/home/Footer";

export default function TourPackage() {
  return (
    <div>
      <Navbar location="/tour_packages" />
      <TourPackageHero />
      <TourPackageDataWrapper />
      <Footer />
    </div>
  );
}
