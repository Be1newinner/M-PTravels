import Navbar from "@/components/home/Navbar";
import TripFillingForm from "@/components/tripBooking/TripFillingForm";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";

export default async function TripBooking({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params_response = await params;
  const slug = params_response.slug;
  const packageID = slug.substring(slug.lastIndexOf("-") + 1);
  return (
    <div>
      <Navbar location="/trip-booking" />
      <HeaderHero title="Your Dream Trip!" />
      <TripFillingForm packageID={packageID} />
      <Footer />
    </div>
  );
}
