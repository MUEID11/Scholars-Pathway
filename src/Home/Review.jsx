import React from "react";
import SectionTitle from "../Components/SectionTitle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

const Review = () => {
  const getReviews = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
    return data;
  };

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: async() => getReviews(),
    queryKey: ["allreviews"],
  });

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (isError) {
    return <h1>Error loading reviews.</h1>;
  }

  return (
    <div>
      <SectionTitle
        heading="Students Review"
        subHeading="Students praise our program for its exceptional quality and supportive environment. With top-notch instructors, engaging curriculum, and a vibrant community, our program equips students with the skills and confidence to succeed. Join us today!"
      />
      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="col-span-2">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`relative flex flex-col justify-between w-full m-4 p-4 sm:p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800 my-10 ${
                    idx % 2 === 0
                      ? "bg-violet-200"
                      : "bg-white"
                  }`}
                >
                  <p className="leading-loose text-gray-800 dark:text-gray-400 flex-grow">
                    {review.reviewer_comments}
                  </p>
                  <div className="flex items-center mt-6 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 h-14"
                      src={review.reviewer_image}
                      alt={review.name}
                    />
                    <div className="mx-2 py-8">
                      <h1 className="font-semibold text-gray-800 dark:text-white">
                        {review?.reviewer_name}
                      </h1>
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Date: {review?.review_date}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`absolute w-5/6 rounded-lg p-6 -bottom-8 shadow-md flex items-center justify-center ${
                      idx % 2 !== 0
                        ? " bg-violet-200"
                        : "bg-white"
                    }`}
                  >
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={review?.rating_point}
                      readOnly
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Review;
