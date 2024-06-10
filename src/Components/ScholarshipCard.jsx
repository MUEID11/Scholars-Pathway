import { BiDollar } from "react-icons/bi";
import { Link } from "react-router-dom";
import ShowReviewsById from "./ShowReviewsById";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityName,
    universityImage,
    universityCountry,
    description,
    scholarshipName,
    subjectCategory,
    universityCity,
    scholarshipType,
    applicationFees,
    deadLine,
  } = scholarship;
  const formattedDate = new Date(deadLine);
  const dateString = formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/scholarship/${_id}`}>
      <div className="w-full min-w-md px-4 py-3 bg-white rounded-md shadow-lg dark:bg-gray-800 p-4 tracking-tight transform hover:shadow-xl hover:scale-105 transition duration-150 ease-in-out">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-light text-gray-800 dark:text-gray-400 uppercase">
            university name: {universityName}
          </span>
          <span className="px-3 py-1 text-xs text-violet-800 uppercase bg-violet-200 rounded-full dark:bg-violet-300 dark:text-violet-900">
            {subjectCategory}
          </span>
        </div>

        <div className="flex">
          <img
            className="object-cover w-1/3 sm:h-64 h-auto rounded"
            src={universityImage}
            alt="University image"
          />
          <div className="ml-2 flex flex-col justify-between">
            <div>
              <h1 className="mt-2 text-md font-semibold text-gray-800 dark:text-white">
                {scholarshipName}
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {description.slice(0, 50)} . . .
              </p>

              <div className="mt-2 text-gray-700 dark:text-gray-200 space-y-1">
                <span className="text-sm font-medium">
                  Location: {universityCity}, {universityCountry}
                </span>
                <div>
                  <span>
                    Deadline: <span className="text-red-500">{dateString}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-500">
                    Scholarship: {scholarshipType}
                  </span>{" "}
                  <span className="text-sm flex items-center">
                    Application Fee: {applicationFees} <BiDollar />
                  </span>
                </div>
              </div>
            </div>
            {/* the perfect position */}
            <button className=""><ShowReviewsById id={_id}></ShowReviewsById></button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScholarshipCard;
