import Nav from "@/component/home/navbar";
import SideBar from "@/component/TourPackage/sidebar";
import Page1 from "@/component/TourPackage/page1";
import Footer from "@/component/home/footer";

export default function TourPackage(){
    return(
        <div>
            <Nav />
            <Page1 />
            <SideBar />
            <Footer />
        </div>
    )
} 