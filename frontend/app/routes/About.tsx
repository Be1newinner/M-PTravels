import Navbar from "~/components/home/Navbar";
import About from "~/components/about/FirstPage";
import Journey from "~/components/about/Journey";
import OurHistory from "~/components/about/OurHistory";
import ContactUs from "~/components/home/ContactUs";
import Available from "~/components/home/Available";
import ClientThink from "~/components/home/ClientThink";
import Footer from "~/components/home/Footer";
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
