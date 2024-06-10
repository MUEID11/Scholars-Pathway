import { useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Tooltip } from "antd";
import toast from "react-hot-toast";

const ReviewScholarship = () => {
  const { scholarshipId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: scholarship = {} } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarship/${scholarshipId}`);
      return res.data.result;
    },
    queryKey: ["scholarshipsforreview"],
  });
console.log(scholarship)
  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    // Change to async function
    e.preventDefault();
    try {
      // Prepare the review data
      const reviewData = {
        scholarshipId,
        scholarshipName: scholarship?.scholarshipName,
        universityName: scholarship?.universityName,
        rating,
        comment,
        reviewDate: currentDate,
        applicantPhoto: user?.photoURL,
        applicantName: user?.displayName,
        applicantEmail: user?.email,
      };
      console.log(reviewData);
      await axiosSecure.post("/reviews", reviewData);

      toast.success("review submitted successfully");
      setRating(0);
      setComment("");
      console.log("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-600">Submit your review</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-12">
          <label
            htmlFor="rating"
            className="block text-gray-700 font-bold mb-2"
          >
            Rating
          </label>
          {/* Use the Rating component from smastrom/react-rating */}
          <Rating
            style={{ maxWidth: 250 }}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-bold mb-2"
          >
            Review Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none max-w-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>
        <input
          type="hidden"
          name="universityName"
          value={scholarship?.universityName || ""}
        />
        <input
          type="hidden"
          name="userImage"
          value={user?.photoURL || ""}
        />
        <input type="hidden" name="scholarshipId" value={scholarshipId || ""} />
        <input
          type="hidden"
          name="applicantName"
          value={user?.displayName || ""}
        />
        <input type="hidden" name="applicantEmail" value={user?.email || ""} />
        <div className="">
          <Tooltip title="Add rating and comment to submit">
            <button
              disabled={rating === 0 || comment === ""}
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Review
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  );
};

export default ReviewScholarship;
