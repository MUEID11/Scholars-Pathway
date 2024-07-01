import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle";

const MyReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: userReviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosPublic.get(`/userreviews/${user?.email}`);
      return res.data;
    },
    queryKey: ["specific-user review"],
  });

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const goToNextReview = () => {
    if (currentReviewIndex < userReviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
    }
  };

  const goToPreviousReview = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error loading reviews.</h1>;
  }

  return (
    <div>
      <Helmet>
        <title>My Reviews</title>
      </Helmet>
      <SectionTitle
        heading="My Reviews"
        subHeading="Here are the reviews provided by you. Your feedback helps us improve and provides valuable insights to other students."
      />
      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="col-span-2">
          {userReviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex justify-center -mt-16 md:justify-end">
                <img
                  className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                  alt="Testimonial avatar"
                  src={userReviews[currentReviewIndex].applicantPhoto}
                />
              </div>

              <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                {userReviews[currentReviewIndex].scholarshipName}
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                University Name:{" "}
                {userReviews[currentReviewIndex].universityName}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                Date: {userReviews[currentReviewIndex].reviewDate}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                Rating: {userReviews[currentReviewIndex].rating}
              </p>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                {userReviews[currentReviewIndex].comment}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  className="text-lg font-medium text-blue-600 dark:text-blue-300"
                  onClick={goToPreviousReview}
                  disabled={currentReviewIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="text-lg font-medium text-blue-600 dark:text-blue-300"
                  onClick={goToNextReview}
                  disabled={currentReviewIndex === userReviews.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReview;
