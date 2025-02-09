import Navbar from "../../Component/home_component/navbar";
import Trip from "../../Component/TripBooking/tripBooking"
import Form from "../../Component/TripBooking/Form";
import Footer from "../../Component/home_component/footer";
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
