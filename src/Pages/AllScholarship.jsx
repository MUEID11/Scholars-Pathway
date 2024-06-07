import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import SectionTitle from "../Components/SectionTitle";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ScholarshipCard from "../Components/ScholarshipCard";

const AllScholarship = () => {
  const axiosPublic = useAxiosPublic();
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      try{
        const res = await axiosPublic.get("/scholarships");
        console.log(res.data);
      return res.data.result;
      }catch(error){
        console.log(error)
        throw error;
      }
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto -mt-6 sm:-mt-20">
      <SectionTitle
        heading={`All scholarship`}
        subHeading={`Explore our comprehensive scholarship offerings today! From academic excellence to diverse fields of study, our scholarships cater to all students' needs. Don't miss out. Apply now!`}
      ></SectionTitle>
      <div>search implement korte hobe</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-2 sm:m-0">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship?._id} scholarship={scholarship} />
        ))}
      </div>
      <div>pagination implement korte hobe</div>
    </div>
  );
};

export default AllScholarship;
