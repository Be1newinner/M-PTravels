import Navbar from "@/component/home/navbar";
import Trip from "@/component/TripBooking/tripBooking";
import Form from "@/component/TripBooking/Form";
import Footer from "@/component/home/footer";
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
