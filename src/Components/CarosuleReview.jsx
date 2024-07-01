import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CarouselReview = ({ id }) => {
  const axiosPublic = useAxiosPublic();

  // Fetch reviews data
  const { data: reviewsData = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarshipreviews/${id}`);
      return res.data.result;
    },
  });

  // Fetch average rating data
//   const { data: avgRatingData } = useQuery({
//     queryKey: ["averageRating", id],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/scholarshipreviews/${id}`);
//       return res.data.avg;
//     },
//   });

  return (
    <div>
      <div className="mySwiper p-8 z-0">
        <Swiper
          modules={[Pagination]}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          pagination={{ clickable: true }}
        >
          {reviewsData.length === 0 ? (
            <SwiperSlide>No reviews yet</SwiperSlide>
          ) : (
            reviewsData.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <div className="flex justify-center -mt-16 md:justify-end">
                    <img
                      className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                      alt="Testimonial avatar"
                      src={review.applicantPhoto}
                    />
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                    {review.applicantName}
                  </h2>
                  {/* Display additional review information */}
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-200 font-medium">
                    Scholarship Name: {review.scholarshipName}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                    University Name: {review.universityName}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                    Date: {review.reviewDate}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                    {review.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselReview;
