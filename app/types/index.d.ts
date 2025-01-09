export interface ReviewI {
    id: string,
    productId: string,
    author: string,
    content: string,
    rating: number
}

export interface ProductExtendedI extends ProductI {
    description: string;
    short_description: string;
    images: ProductImageI[];
    reviews: ReviewI[]
    avgReview: number
    Product_details: ProductDetailsI
};

export interface ProductI {
    id: string;
    name: string;
    regular_price: number;
    currency: string;
    images: ProductImageI[];
    promo_price: number;
};

interface StarsPropsI{
    starsNumber: number
}

interface ProductDetailsI {
    shipping_time: string;
    delivery_cost: string;
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


interface CartProduct {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    Cart: string;
    Product: string;
}

interface CartI{
    cart:{
        id: string
        products: CartProduct[]
        total_cost: number;
    }
}