export interface review {
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
    images: Array<{ url: string }>;
    Product_details: {
        shipping_time: string;
        delivery_cost: string;
    };
    reviews: review[]
    avgReview: number
};