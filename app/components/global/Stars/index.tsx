import React from 'react'
import { Icon } from "@iconify/react";


export default function index({avgReview}) {
  return (
    <div className="flex items-center">
    {Array.from({ length: 5 }, (_, index) => {
        const starPosition = index + 1;
        if (starPosition <= Math.floor(avgReview)) {
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
            starPosition === Math.ceil(avgReview) &&
            !Number.isInteger(avgReview)
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
  )
}
