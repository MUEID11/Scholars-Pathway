import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = ({ scholarships }) => {
  const bannerData = scholarships?.slice(0, 6);
  console.log(bannerData);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="my-swiper w-full h-56 md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg"
      >
        {bannerData.map((slide) => (
          <SwiperSlide
            key={slide?._id}
            className="flex justify-center items-center"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={slide?.universityImage}
                alt={slide.title}
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-black bg-opacity-50 duration-300 opacity-75">
                <h2 className="text-white text-2xl sm:text-3xl font-bold">
                  {slide?.universityName}
                </h2>
                <p className="text-white text-lg">{slide?.scholarshipName}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
