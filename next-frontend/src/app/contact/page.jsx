import Nav from "@/component/home/navbar";
import FirstPage from "@/component/contactUs/firstPage";
import Map from "@/component/contactUs/map";
import Footer from "@/component/home/footer";
import ContactForm from "@/component/contactUs/contactForm";
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
