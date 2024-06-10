import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";

const ShowReviewsById = ({ id }) => {
  console.log(id, "nikhoj");
  const axiosPublic = useAxiosPublic();

  // Fetch reviews data
  //   const { data: reviewsData = [] } = useQuery({
  //     queryKey: ["reviews", id], // Use a unique key for fetching reviews
  //     queryFn: async () => {
  //       const res = await axiosPublic.get(`/scholarshipreviews/${id}`);
  //       return res.data.result; // Return only the reviews data
  //     },
  //   });

  // Fetch average rating data
  const { data: avgRatingData } = useQuery({
    queryKey: ["averageRating", id], // Use a unique key for fetching average rating
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarshipreviews/${id}`);
      return res.data.avg; // Return only the average rating data
    },
  });

  return (
    <div>
      {/* Render average rating */}
      {avgRatingData && (
        <p className="flex items-end justify-center">
          Average Rating: <Rating style={{ maxWidth: 100 }} value={avgRatingData[0]?.avg_rating} readOnly />
        </p>
      )}
    </div>
  );
};

export default ShowReviewsById;
