export interface ReviewI {
    id: string,
    productId: string,
    author: string,
    content: string,
    rating: number
}

export interface ProductI {
    name: string;
    regular_price: string;
    currency: string;
    description: string;
    short_description: string;
    images: ProductImageI[];
    Product_details: {
        shipping_time: string;
        delivery_cost: string;
    };
    reviews: ReviewI[]
    avgReview: number
};

interface StarsPropsI{
    starsNumber: number
}

interface AvgReviewsPropsI {
    reviewsNumber: number,
    avgReview: number
}

interface ProductImageI{
    id: string
    url: string
    alt: string
    productId: string
}

interface CategoryWithProductsI  extends CategoryI{
    products: ProductI[];
}

interface CategoryI {
    id: string
    is_home_page: boolean;
    category_name: string;
}