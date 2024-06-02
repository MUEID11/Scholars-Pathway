import SectionTitle from "../Components/SectionTitle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
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
    queryFn: getReviews,
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
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="col-span-2">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`flex flex-col justify-between w-full h-full p-8 bg-white rounded-md shadow-lg dark:bg-gray-800 my-8 ${
                    idx % 2 === 0 ? "bg-violet-400" : ""
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
                    <div className="mx-2">
                      <h1 className="font-semibold text-gray-800 dark:text-white">
                        {review?.reviewer_name}
                      </h1>
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        {review?.review_date}
                      </span>
                    </div>
                  </div>
                  <div className="my-6">
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
