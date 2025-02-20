import Nav from "~/components/home/Navbar";
import FirstPage from "~/components/contactUs/FirstPage";
import Map from "~/components/contactUs/Map";
import Footer from "~/components/home/Footer";
import ContactForm from "~/components/contactUs/ContactForm";
export default function Contact() {
  return (
    <div>
      <Nav />
      <FirstPage />
      <ContactForm />
      <Map />
      <Footer />
    </div>
  );
}
