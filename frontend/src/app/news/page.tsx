import HeaderHero from "@/components/HeaderHero";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import AllTime from "@/components/news/AllTime";

export default function NewsListing() {
  return (
    <div>
      <Navbar location="/news" />
      <HeaderHero title="Our Curated Blogs" />
      <AllTime />
      <Footer />
    </div>
  );
}
