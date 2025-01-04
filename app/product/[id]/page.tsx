import React from 'react';
import { Icon } from "@iconify/react";

import ProductImagesSlider from "@/app/components/Product/ProductSlider";
import AddToCartSection from "@/app/components/Product/AddToCartSection"
import AvgReviews from "@/app/components/Product/AvgReviews"
import Stars from "@/app/components/global/Stars"

import { ProductI } from '@/app/types';

export default async function page(context: { params: any; }) {
    const { params } =  context;
    const { id } = await params; 

    const res = await fetch(`http://localhost:3000/api/products?id=${id}`);
    if (!res.ok) {
        return <div>Product not found.</div>;
    }

    const data = await res.json();
    const product:ProductI = data;

    return (
        <div className="container mx-auto p-2 pt-4">
            <ProductImagesSlider images={product.images} />
            <div className="container p-2">
                <div className="flex flex-col gap-2">

                <h1 className="text-xl font-bold">{product.name}</h1>
                <p>
                  {product.short_description}
                </p>
                <div>
                <p className="text-lg font-semibold">
                    {product.regular_price} {product.currency}
                </p>
                </div>
                    <AvgReviews reviewsNumber={product.reviews.length} avgReview={product.avgReview}/>

                </div>


                <div className="border-2 rounded-sm py-4 border-gray-150 p-2 mt-4 -mx-2">
                    <p className="text-lg mb-2 text-secondary font-semibold border-b-[1px] pb-2 border-gray-150">Delivery</p>

                    <div className="flex mt-4 items-center">
                        <Icon icon="tabler:clock" width="20" height="20" />
                        <p className="ml-1">Delivery time: {product.Product_details.shipping_time}</p>
                    </div>

                    <div className="flex mt-1 items-center">
                        <Icon icon="tabler:truck-delivery" width="20" height="20" />
                        <p className="ml-1">Delivery cost: {product.Product_details?.delivery_cost}</p>
                    </div>


                </div>


                <AddToCartSection/>

                <div>

                <p className="mt-8">{product.description}</p>

                </div>

                
                <div className="mt-6">
                    <p className="mb-2 font-semibold text-lg border-b-[1px] pb-2 border-gray-150 text-secondary">Reviews</p>
                    {product.reviews.map(review=>(
                        <div key={review.id}>
                            <Stars avgReview={review.rating}/>
                            <p>{review.author}</p>
                            <p>{review.rating}</p>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
