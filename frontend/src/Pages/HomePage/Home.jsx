import Navbar from "../../Component/home_component/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../Component/home_component/footer";
import DreamFlight from "../../Component/home_component/DreamFlight";
import ShowFlight from "../../Component/home_component/ShowFlight";
import SliderPart from "../../Component/home_component/SliderPart";
import BookNow from "../../Component/home_component/BookNow";
import Discover from "../../Component/home_component/Discover";
import ContactUs from "../../Component/home_component/ContactUs";
import LetestNews from "../../Component/home_component/LetestNews";
export default function FlyNow() {
  return (
    <div>
      <Navbar />
      <DreamFlight />
      <ShowFlight />
      <SliderPart />
      <BookNow />
      <Discover />
      <ContactUs />
      <LetestNews />
      <Footer />
    </div>
  );
}
