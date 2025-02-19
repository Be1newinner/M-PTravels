import Footer from "@/component/home/footer";
import Navbar from "@/component/home/navbar";
import AllTime from "@/component/newsListCom/allTime";
import Hero from "@/component/newsListCom/hero";


export default function NewsListing(){
    return(
        <div>
            <Navbar />
            <Hero />
            <AllTime />
            <Footer />
        </div>
    )
}