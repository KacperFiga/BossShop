import React from "react";
import { Icon } from "@iconify/react";

import { ProductImagesSlider } from "@/app/components/Product/ProductSlider";
import { AddToCartSection } from "@/app/components/Product/AddToCartSection";
import { AvgReviews } from "@/app/components/Product/AvgReviews";
import { ReviewsSection } from "@/app/components/Product/Reviews/ReviewSection/index";

import { ProductExtendedI } from "@/app/types";
import { PricingSection } from "@/app/components/Product/PricingSection";

export default async function page(context: { params: any }) {
  const { params } = context;
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/products?id=${id}`);
  if (!res.ok) {
    return <div>Product not found.</div>;
  }
  const data = await res.json();
  const product: ProductExtendedI = data;

  const groupedRatings = product.reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const percentageRatings = Object.entries(groupedRatings).reduce(
    (acc, [rating, count]) => {
      acc[rating] = Math.round((count / product.reviews.length) * 100) + "%";
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto p-2 pt-4">
      <div className="md:grid grid-cols-[65%,30%] justify-around">
        <ProductImagesSlider images={product.images} />

        <div className="container p-2 md:w-full">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <Icon
                icon="tabler:heart"
                width="30"
                height="30"
                style={{ color: "#cd3737" }}
                className="ml-auto self-start"
              />
            </div>
            <p>{product.short_description}</p>
            <div>
              <PricingSection
                promoPrice={product.promo_price}
                regularPrice={product.regular_price}
                currency={product.currency}
              />
            </div>
            <AvgReviews
              reviewsNumber={product.reviews.length}
              avgReview={product.avgReview}
            />
          </div>

          <div className="border-2 rounded-sm py-4 border-gray-150 p-2 mt-4 -mx-2">
            <p className="text-lg mb-2 text-secondary font-semibold border-b-[1px] pb-2 border-gray-150">
              Delivery
            </p>

            <div className="flex mt-4 items-center">
              <Icon icon="tabler:clock" width="20" height="20" />
              <p className="ml-1">
                Delivery time: {product.Product_details?.shipping_time || "N/A"}
              </p>
            </div>

            <div className="flex mt-1 items-center">
              <Icon icon="tabler:truck-delivery" width="20" height="20" />
              <p className="ml-1">
                Delivery cost: {product.Product_details?.delivery_cost || "N/A"}
              </p>
            </div>
          </div>

          <AddToCartSection productId={product.id} />
        </div>
      </div>

      <div>
        <p className="mt-8 md:text-lg font-medium md:max-w-[65%]">
          {product.description}
        </p>
      </div>

      <ReviewsSection
        reviews={product.reviews}
        avgReviews={product.avgReview}
        reviewsNumber={product.reviews.length}
        percentageRatings={percentageRatings}
      />
    </div>
  );
}
