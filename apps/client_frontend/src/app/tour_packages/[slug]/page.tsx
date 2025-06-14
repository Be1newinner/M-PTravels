import Navbar from "@/components/home/Navbar";
import TripFillingForm from "@/components/tripBooking/TripFillingForm";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";
import { Params } from "next/dist/server/request/params";

export default function TripBooking(params: { slug: string }) {
  console.log({ Slug: params.slug });

  return (
    <div>
      <Navbar location="/trip-booking" />
      <HeaderHero title="Your Dream Trip!" />
      <TripFillingForm />
      <Footer />
    </div>
  );
}
