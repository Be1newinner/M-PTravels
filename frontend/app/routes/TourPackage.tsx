import Nav from "~/components/home/Navbar";
import TourPackageDataWrapper from "~/components/tourPackage/TourPackageDataWrapper";
import TourPackageHero from "~/components/tourPackage/TourPackageHero";
import Footer from "~/components/home/Footer";

export default function TourPackage() {
  return (
    <div>
      <Nav />
      <TourPackageHero />
      <TourPackageDataWrapper />
      <Footer />
    </div>
  );
}
