import Navbar from "~/components/home/Navbar";
import DreamFlight from "~/components/home/DreamFlight";
import ShowFlight from "~/components/home/ShowFlight";

import SliderPart from "~/components/home/SliderPart";
import BookNow from "~/components/home/BookNow";
import Discover from "~/components/home/Discover";
import ContactUs from "~/components/home/ContactUs";

// import Available from "~/Component/home_component/available";

import ClientThink from "~/components/home/ClientThink";
import LatestNews from "~/components/home/LetestNews";
import Footer from "~/components/home/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <DreamFlight />
      <ShowFlight />
      {/* <Available /> */}

      <SliderPart />
      <BookNow />
      <Discover />
      <ContactUs />

      <ClientThink />
      <LatestNews />
      <Footer />
    </div>
  );
}
