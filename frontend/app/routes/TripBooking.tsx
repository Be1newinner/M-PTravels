import Navbar from "~/components/home/Navbar";
import Trip from "~/components/tripBooking/TripBooking";
import Form from "~/components/tripBooking/Form";
import Footer from "~/components/home/Footer";

export default function TripBooking() {
  return (
    <div>
      <Navbar />
      <Trip />
      <Form />
      <Footer />
    </div>
  );
}
