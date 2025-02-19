/** @format */
import Nav from "@/component/home/navbar";
import PrivacyPolicy from "@/component/Privacy/privacyPolicy";
import Privacy from "@/component/Privacy/privacy";
import Blog from "@/component/Privacy/blog";
import Footer from "@/component/home/footer";

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
