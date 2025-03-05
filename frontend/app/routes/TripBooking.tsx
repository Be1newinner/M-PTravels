import Navbar from "~/components/home/Navbar";
import Trip from "~/components/tripBooking/TripBooking";
import TripFillingForm from "~/components/tripBooking/TripFillingForm";
import Footer from "~/components/home/Footer";

export default function TripBooking() {
  return (
    <div>
      <Navbar />
      <Trip />
      <TripFillingForm />
      <Footer />
    </div>
  );
}
