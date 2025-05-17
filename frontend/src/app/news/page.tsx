import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import AllTime from "@/components/news/AllTime";
import Hero from "@/components/news/Hero";

export default function NewsListing() {
  return (
    <div>
      <Navbar location="/news" />
      <Hero />
      <AllTime />
      <Footer />
    </div>
  );
}
