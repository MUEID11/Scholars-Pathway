import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Review from "./Review";
import TopScholarship from "./TopScholarship";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships");
      return res.data.result;
    },
  });
  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto  my-4 sm:my-12 p-4">
      <Banner scholarships={scholarships}></Banner>
      <TopScholarship></TopScholarship>
      <Review></Review>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
