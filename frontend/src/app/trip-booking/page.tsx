import Navbar from "@/components/home/Navbar";
import TripFillingForm from "@/components/tripBooking/TripFillingForm";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";

export default function TripBooking() {
  return (
    <div>
      <Navbar location="/trip-booking" />
      <HeaderHero title="Your Dream Trip!" />
      <TripFillingForm />
      <Footer />
    </div>
  );
}
