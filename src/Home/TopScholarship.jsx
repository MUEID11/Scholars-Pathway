import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import Loading from "../Components/Loading";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import ShowReviewsById from "../Components/ShowReviewsById";

const TopScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const fetchScholarships = async () => {
    const res = await axiosPublic.get(`/topscholarships`);
    return res.data;
  };

  const { data: scholarshipsData = [], isLoading } = useQuery({
    queryKey: ["topscholarship"],
    queryFn: fetchScholarships,
  });

  // console.log(scholarshipsData, "scholarship data");
  if (isLoading) return <Loading />;

  return (
    <div data-aos="fade-up" data-aos-duration="400">
      <SectionTitle
        heading={`Top Scholarship`}
        subHeading={`Offering unparalleled opportunities for academic excellence, financial support, and professional growth, our scholarships are designed to empower future leaders. Don’t miss your chance to excel. Apply today and transform your future!`}
      />
      <div
        className="grid lg:grid-cols-2 gap-12"
      >
        {/* Display scholarships */}
        {scholarshipsData.map((scholarship) => (
          <div data-aos="zoom-in" data-aos-duration="900"  key={scholarship?._id}>
            <div className="max-w-2xl min-h-[650px] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ">
              <img
                className="object-cover w-full h-64"
                src={scholarship?.universityImage}
                alt="Article"
              />
              <div className="p-6">
                <div>
                  <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                    <Link to={`/scholarship/${scholarship?._id}`}>Detials</Link>
                  </span>
                  <div
                    className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                    tabIndex="0"
                    role="link"
                  >
                    {scholarship?.scholarshipName}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {scholarship?.description.slice(0, 100)} <span>...</span>
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
                    Application Fee: {`${scholarship?.applicationFees}`}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Application deadleine:{" "}
                    {`${new Date(scholarship?.deadLine).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        className="object-cover size-10 rounded-full"
                        src={scholarship?.universityImage}
                        alt="Avatar"
                      />
                      <div
                        className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                        tabIndex="0"
                        role="link"
                      >
                        {`${scholarship?.universityName}`}
                      </div>
                    </div>
                    <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                      Scholarship category: {scholarship?.scholarshipType}
                    </span>
                  </div>
                  <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                    <ShowReviewsById id={scholarship?._id} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-6">
        <Link to="/all" className="btn bg-violet-100 text-violet-600 mt-8">
          View All
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
