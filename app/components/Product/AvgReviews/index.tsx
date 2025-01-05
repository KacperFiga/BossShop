import React from 'react'
import {Stars} from "@/app/components/global/Stars"
import {AvgReviewsPropsI} from '@/app/types'


export const AvgReviews:React.FC<AvgReviewsPropsI> = ({reviewsNumber, avgReview}) => {
  return (
    <div className="flex">
    <Stars starsNumber={avgReview}/>
    <p className="ml-2 text-sm">({reviewsNumber})</p>
</div>
  )
}
