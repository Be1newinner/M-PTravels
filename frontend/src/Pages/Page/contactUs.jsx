import Nav from "../../Component/home_component/navbar";
import FirstPage from "../../Component/contactUs/firstPage";
import Map from "../../Component/contactUs/map";
import Footer from "../../Component/home_component/footer";
import ContactForm from "../../Component/contactUs/contactForm";
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
