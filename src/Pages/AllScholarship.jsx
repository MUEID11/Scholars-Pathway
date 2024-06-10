import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import SectionTitle from "../Components/SectionTitle";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ScholarshipCard from "../Components/ScholarshipCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const [pagination, setPagination] = useState({
    current: 1,
    itemsPerPage: 6,
    total: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", pagination, searchText],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/scholarships?current=${pagination.current}&pageSize=${pagination.itemsPerPage}&searchText=${searchText}`
      );

      setPagination((prev) => ({ ...prev, total: res.data.total }));
      return res.data.result;
    },
  });

  if (isLoading) return <Loading />;

  const totalPages = Math.ceil(pagination.total / pagination.itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchText(searchInput);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  };

  const handleRefreshClick = () => {
    setSearchText(""); // Clear the search text
    setSearchInput("");
    refetch(); // Refetch the data
  };

  return (
    <div className="container mx-auto -mt-6 sm:-mt-20">
      <Helmet>
        <title>All Scholarship</title>
      </Helmet>
      <SectionTitle
        heading="All scholarship"
        subHeading="Explore our comprehensive scholarship offerings today! From academic excellence to diverse fields of study, our scholarships cater to all students' needs. Don't miss out. Apply now!"
      />
      <div>
        <div className="my-6">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="input input-bordered input-sm"
            placeholder="Search by University or Scholarship Name"
          />
          <button
            onClick={handleSearchClick}
            className="btn btn-sm ml-2 bg-violet-300 text-violet-700"
          >
            Search
          </button>
        </div>
      </div>
      {scholarships.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          No scholarships found
          <button
            onClick={handleRefreshClick}
            className="mt-2 text-blue-500 underline"
          >
            See All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-2 sm:m-0">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship?._id} scholarship={scholarship} />
          ))}
        </div>
      )}
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
