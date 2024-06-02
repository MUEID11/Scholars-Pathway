import { useState } from "react";
import SectionTitle from "../Components/SectionTitle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    queryFn: async () => await getReviews(),
    queryKey: ["allreviews"],
  });
  console.log(reviews);
  if (isLoading) {
    <h1>Loading.....</h1>;
  }
  if (isError) {
    console.log(isError);
  }
  return (
    <div>
      <SectionTitle
        heading={`Students Review`}
        subHeading={`Students praise our program for its exceptional quality and supportive environment. With top-notch instructors, engaging curriculum, and a vibrant community, our program equips students with the skills and confidence to succeed. Join us today!`}
      ></SectionTitle>
      <section className="relative flex">
       
      </section>
    </div>
  );
};

export default Review;
