import Nav from "~/components/home/Navbar";
import SideBar from "~/components/tourPackage/Sidebar";
import TourPackageHero from "~/components/tourPackage/TourPackageHero";
import Footer from "~/components/home/Footer";

export default function TourPackage() {
  return (
    <div>
      <Nav />
      <TourPackageHero />
      <SideBar />
      <Footer />
    </div>
  );
}
