import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GroupedReviewsI } from "../../..";

export const GroupedReviews: React.FC<GroupedReviewsI> = ({
  percentageRatings,
  rating,
}) => {
  return (
    <div className="flex items-center gap-2" key={rating}>
      <Icon
        icon="tabler:star-filled"
        width="18"
        height="18"
        style={{ color: "#735024" }}
      />
      {rating}{" "}
      <div className="w-[150px] h-[8px] bg-gray-200 rounded-xl relative">
        {" "}
        <span
          className={`bg-secondary absolute h-full top-0 left-0 rounded-xl`}
          style={{ width: `${percentageRatings[rating]}` }}
        >
          {" "}
        </span>{" "}
      </div>{" "}
      {percentageRatings[rating]}
    </div>
  );
};
