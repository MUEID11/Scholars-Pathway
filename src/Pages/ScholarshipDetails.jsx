import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { BiDetail, BiDollar } from "react-icons/bi";

const ScholarshipDetails = () => {
  const axiosSceure = useAxiosSecure();
  const { id } = useParams();
  const { data: scholarshipdetails = {}, isLoading } = useQuery({
    queryKey: ["datails", id],
    queryFn: async () => {
      try {
        const res = await axiosSceure.get(`/scholarship/${id}`);
        return res.data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  });
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto mt-6">
        <h2 className="text-xl font-bold flex items-center">Scholarship Details <BiDetail className="ml-2"/></h2>
        <div className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded-md my-6">
        
        <div className="flex flex-col items-center mb-6">
          <img
            src={scholarshipdetails?.universityImage}
            alt="University"
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">
            {scholarshipdetails?.universityName}
          </h1>
          <h2 className="text-xl font-semibold mb-2">
            {scholarshipdetails?.scholarshipName}
          </h2>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-lg">University Name</h3>
            <p>{scholarshipdetails?.universityName}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Scholarship Name</h3>
            <p>{scholarshipdetails?.scholarshipName}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Country</h3>
            <p>{scholarshipdetails?.universityCountry}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">City</h3>
            <p>{scholarshipdetails?.universityCity}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Subject Category</h3>
            <p>{scholarshipdetails?.subjectCategory}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Degree</h3>
            <p>{scholarshipdetails?.degree}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Scholarship Type</h3>
            <p>{scholarshipdetails?.scholarshipType}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Application Fees</h3>
            <p className="flex items-center">
              {scholarshipdetails?.applicationFees}
              <BiDollar />
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Service Charge</h3>
            <p className="flex items-center">
              {scholarshipdetails?.serviceCharge}
              <BiDollar />
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">World Rank</h3>
            <p className="flex items-center">
             {scholarshipdetails?.worldRank}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Posted On</h3>
            <p>
              {new Date(scholarshipdetails?.postedOn).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg">Deadline</h3>
            <p>
              {new Date(scholarshipdetails?.deadLine).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
          <div className="text-sm pr-2">
            <h3 className="font-medium text-lg">Contact</h3>
            <a className="link-hover" href={`mailto: ${scholarshipdetails?.contactEmail}`}>
              {scholarshipdetails?.contactEmail}
            </a>
          </div>
          <div className="text-sm pr-2">
            <h3 className="font-medium text-lg">Description</h3>
            <p>{scholarshipdetails?.description}</p>
          </div>
          <div className="text-sm pr-2">
            <h3 className="font-medium text-lg">Rating</h3>
            <p>Rating</p>
          </div>
          <div className="text-sm pr-2">
            <h3 className="font-medium text-lg">Apply Now</h3>
            <button className="btn btn-square w-auto py-2 px-6 mt-4 bg-green-600 hover:bg-green-700 text-white">Apply Now !</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
