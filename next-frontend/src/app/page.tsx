import Navbar from "@/component/home/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/component/home/footer";
import DreamFlight from "@/component/home/DreamFlight";
import ShowFlight from "@/component/home/ShowFlight";
import SliderPart from "@/component/home/SliderPart";
import BookNow from "@/component/home/BookNow";
import Discover from "@/component/home/Discover";
import ContactUs from "@/component/home/ContactUs";
import LetestNews from "@/component/home/LetestNews";
// import Available from "@/component/home/available";
import ClientThink from "@/component/home/clientThink";

export default function FlyNow() {
  return (
    <>
      <Navbar />
      <DreamFlight />
      <ShowFlight />
      {/* <Available /> */}
      <SliderPart />
      <BookNow />
      <Discover />
      <ContactUs />
      <ClientThink />
      <LetestNews />
      <Footer />
    </>
  );
}
