import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Review from "./Review";
import TopScholarship from "./TopScholarship";


const Home = () => {
    return (
        <div className="container mx-auto my-24">
           <Banner></Banner>
           <TopScholarship></TopScholarship>
           <Review></Review>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;