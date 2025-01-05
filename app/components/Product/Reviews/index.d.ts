import { ReviewI } from "@/app/types";

interface PercentageRatingsI{
    [key: string]: string; 
}

interface ReviewsSectionPropsI {
   reviews: ReviewI[]
   avgReviews: number
   reviewsNumber: number
   percentageRatings: percentageRatingsI
}

interface ReviewComponentPropsI {
    review: ReviewI; 
}

interface GroupedReviewsI {
    percentageRatings: PercentageRatingsI
    rating: string
}