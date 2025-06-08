import Navbar from "@/components/home/Navbar";
import Map from "@/components/contactUs/Map";
import Footer from "@/components/home/Footer";
import ContactForm from "@/components/contactUs/ContactForm";
import HeaderHero from "@/components/HeaderHero";
export default function Contact() {
  return (
    <div>
      <Navbar location="/contact" />
      <HeaderHero title="Contact Us" />
      <ContactForm />
      <Map />
      <Footer />
    </div>
  );
}
