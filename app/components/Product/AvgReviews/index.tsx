import React from 'react'
import Stars from "@/app/components/global/Stars"

interface avgReviewsPropsI {
    reviewsNumber: number,
    avgReview: number
}

export default function index({reviewsNumber, avgReview}: avgReviewsPropsI) {
  return (
    <div className="flex">
    <Stars avgReview={avgReview}/>
    <p className="ml-2 text-sm">({reviewsNumber})</p>
</div>
  )
}
