import Navbar from "@/component/home/navbar";
import About from "@/component/about/firstPage";
import Journey from "@/component/about/journey";
import OurHistory from "@/component/about/ourHistory";
import ContactUs from "@/component/home/ContactUs";
import Available from "@/component/home/available";
import ClientThink from "@/component/home/clientThink";
import Footer from "@/component/home/footer";
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
