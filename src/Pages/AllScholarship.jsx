import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import SectionTitle from "../Components/SectionTitle";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ScholarshipCard from "../Components/ScholarshipCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const AllScholarship = () => {
  // State to manage pagination
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    itemsPerPage: 6, // Number of items per page
    total: 0, // Total number of items
  });

  const axiosPublic = useAxiosPublic();

  // React Query hook to fetch scholarships data
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships", pagination], // Refetch data when pagination state changes
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/scholarships?current=${pagination.current}&pageSize=${pagination.itemsPerPage}`
      );
      // Update total number of items after fetching data
      setPagination((prev) => ({ ...prev, total: res.data.total }));
      return res.data.result;
    },
  });

  if (isLoading) return <Loading />;

  // Calculate total number of pages
  const totalPages = Math.ceil(pagination.total / pagination.itemsPerPage);

  // Create an array for pagination buttons
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page change
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  return (
    <div className="container mx-auto -mt-6 sm:-mt-20">
      <SectionTitle
        heading="All scholarship"
        subHeading="Explore our comprehensive scholarship offerings today! From academic excellence to diverse fields of study, our scholarships cater to all students' needs. Don't miss out. Apply now!"
      />
      <div>search implement korte hobe</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-2 sm:m-0">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship?._id} scholarship={scholarship} />
        ))}
      </div>
      <div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={pagination.current === 1}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <FaArrowLeft />
              <span className="mx-1">previous</span>
            </div>
          </button>

          {pageNumbers.map((btnNum) => (
            <button
              key={btnNum}
              onClick={() => handlePageChange(btnNum)}
              className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
                btnNum === pagination.current
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={pagination.current === totalPages}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
              <FaArrowRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllScholarship;
