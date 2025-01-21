import React from "react";
import { Stars } from "@/app/components/global/Stars";
import { ReviewComponentPropsI } from "../..";

export const Review: React.FC<ReviewComponentPropsI> = ({ review }) => {
  return (
    <div
      key={review.id}
      className="border-b-2 py-4 border-b-gray-150 p-2 mt-4 -mx-2 flex flex-col gap-2"
    >
      <p className="font-semibold">{review.author}</p>
      <Stars starsNumber={review.rating} />
      <p className="italic font-light">{review.content}</p>
    </div>
  );
};
