import Navbar from "../../Component/home_component/navbar";
import About from "../../Component/aboutCom/firstPage";
import Journey from "../../Component/aboutCom/journey";
import OurHistory from "../../Component/aboutCom/ourHistory";
import ContactUs from "../../Component/home_component/ContactUs";
import Available from "../../Component/home_component/available";
import ClientThink from "../../Component/home_component/clientThink";
import Footer from "../../Component/home_component/footer";
export default function AboutPage() {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <About />
      <Journey />
      <OurHistory />
      <ContactUs />
      <div className="px-4 max-xl:px-0 max-2xl:px-4 max-lg:px-0">
        <Available />
      </div>
      <ClientThink />
      <Footer />
    </div>
  );
}
