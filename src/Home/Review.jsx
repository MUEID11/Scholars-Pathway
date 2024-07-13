import SectionTitle from "../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loading from "../Components/Loading";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const getReviews = async () => {
    const { data } = await axiosPublic.get(`/reviews`);
    return data?.result;
  };

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getReviews(),
    queryKey: ["allreviews"],
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>Error loading reviews.</h1>;
  }

  return (
    <div data-aos="fade-up" data-aos-duration="500">
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
            className="mySwiper mt-6"
          >
            {reviews?.map((review) => (
              <SwiperSlide key={review?._id}>
                <div data-aos="fade-left" className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <div className="flex justify-center -mt-16 md:justify-end">
                    <img
                      className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                      alt="Testimonial avatar"
                      src={review?.applicantPhoto}
                    />
                  </div>

                  <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                    {review?.scholarshipName}
                  </h2>

                  {/* Additional fields */}
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

export default Review;
