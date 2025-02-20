import Nav from "~/components/home/Navbar";
import SideBar from "~/components/tourPackage/Sidebar";
import Page1 from "~/components/tourPackage/Page1";
import Footer from "~/components/home/Footer";

export default function TourPackage() {
  return (
    <div>
      <Nav />
      <Page1 />
      <SideBar />
      <Footer />
    </div>
  );
}
