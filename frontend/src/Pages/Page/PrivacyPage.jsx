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
      <div className="flex max-lg:items-center m-10 max-sm:m-2 max-xl:m-4 max-md:m-6 max-lg:m-4 max-md:px-4 max-sm:px-0 px-10 max-lg:flex-col">
        <Privacy />
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
