import React from 'react'

import {Review} from "@/app/components/Product/Reviews/ReviewSection/Review"
import Stars from "@/app/components/global/Stars"
import { ReviewsSectionPropsI } from '..'
import { GroupedReviews } from './Review/GroupedReviews/GroupedReviews'


export const ReviewsSection:React.FC<ReviewsSectionPropsI> = ({reviews, avgReviews, reviewsNumber, percentageRatings}) => {
  return (
    <div className="mt-6">

    <div>
        <p className="mb-2 font-semibold text-lg border-b-[1px] pb-2 border-gray-150 text-secondary">Customer Reviews</p>
        <p className="font-thin text-gray-700 text-sm">In-store reviews are not checked for authenticity before they are published. They may therefore also come from consumers who did not actually buy/use the products being assessed.</p>
            <div className="flex gap-1 mt-2">
                <p> {avgReviews} </p>
                <Stars avgReview={avgReviews}/>
                <p>based on {reviewsNumber} { reviewsNumber > 1 ? "reviews" : "review" } </p>
            </div>

            
            <div className='mt-2'>
            {Object.keys(percentageRatings).map(rating=>(
            <GroupedReviews key={rating} rating={rating} percentageRatings={percentageRatings}/>
            ))}
            </div>


    </div>

    {reviews.map(review=>(
       <Review key={review.id} review={review}/>
    ))}
</div>
  )
}
