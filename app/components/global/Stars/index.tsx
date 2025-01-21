import React from "react";
import { Icon } from "@iconify/react";

import { StarsPropsI } from "@/app/types/index";

export const Stars: React.FC<StarsPropsI> = ({ starsNumber }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const starPosition = index + 1;
        if (starPosition <= Math.floor(starsNumber)) {
          return (
            <Icon
              key={index}
              icon="tabler:star-filled"
              width="18"
              height="18"
              style={{ color: "#735024" }}
            />
          );
        } else if (
          starPosition === Math.ceil(starsNumber) &&
          !Number.isInteger(starsNumber)
        ) {
          return (
            <Icon
              key={index}
              icon="tabler:star-half-filled"
              width="18"
              height="18"
              style={{ color: "#735024" }}
            />
          );
        } else {
          return (
            <Icon
              key={index}
              icon="tabler:star"
              width="18"
              height="18"
              style={{ color: "#735024" }}
            />
          );
        }
      })}
    </div>
  );
};
