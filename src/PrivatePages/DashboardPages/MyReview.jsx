import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import useAuth from "../../Hooks/useAuth";

const MyReview = () => {
  const { user } = useAuth();


  const {
    data: userReviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/reviews`, {
        eamil: user?.email,
      });
      console.log('consoling response', res)
      return res.data.result;
    },
    queryKey: ["user-reviews"],
  });

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (isError) {
    return <h1>Error loading reviews.</h1>;
  }

  return (
    <div>
      <h3 className="text-2xl font-medium text-gray-600 text-center my-6">
        My reviews
      </h3>
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
            {userReviews?.length === 0
              ? "No reviews yet"
              : userReviews.map((review) => (
                  <SwiperSlide key={review?._id}>
                    <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                      <div className="flex justify-center -mt-16 md:justify-end">
                        <img
                          className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                          alt="Testimonial avatar"
                          src={review?.applicantPhoto}
                        />
                      </div>

                      <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                       {review?.applicantName}
                      </h2>

                      {/* Additional fields */}
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-200 font-medium">
                      Scholarship Name: {`${review?.scholarshipName}`}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      University Name: {`${review?.universityName}`}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      Date: {`${review?.reviewDate}`}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      <Rating
                      style={{ maxWidth: 180 }}
                      value={review?.rating}
                      readOnly
                    />
                      </p>
                     
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                       {`${review?.comment}`}
                      </p>

                      <div className="flex justify-end mt-4">
                        <a
                          href="#"
                          className="text-lg font-medium text-blue-600 dark:text-blue-300"
                          tabIndex="0"
                          role="link"
                        >
                          Reviewer Name: {review.applicantName}
                        </a>
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

export default MyReview;
