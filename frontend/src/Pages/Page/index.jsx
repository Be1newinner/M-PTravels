/** @format */
import Nav from "../../Component/home_component/navbar";
import PrivacyPolicy from "../../Component/Privacy/privacyPolicy";
import Privacy from "../../Component/Privacy/privacy";
import Blog from "../../Component/Privacy/blog";
import Footer from "../../Component/home_component/footer";

export default function PrivacyPage() {
  return (
    <div>
      <Nav />
      <PrivacyPolicy />
      <div className="flex m-10 px-10 max-lg:flex-col">
        <Privacy />
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
