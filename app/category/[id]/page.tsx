import React from "react";
import prisma from "@/lib/db";
import { ProductCard } from "@/app/components/Product/ProductCard";

export default async function page(
  context: PromiseLike<{ id: any }> | { id: any }
) {
  const { id } = await context;

  const categoryData = await prisma.categories.findMany({
    where: {
      id: id,
    },
    select: {
      category_name: true,
      products: {
        select: {
          Product: {
            select: {
              id: true,
              name: true,
              regular_price: true,
              promo_price: true,
              currency: true,
              images: true,
            },
          },
        },
      },
    },
  });

  const category = categoryData[0];

  return (
    <div>
      <div className="bg-gray-100 pt-14">
        <div className="container mx-auto text-2xl font-bold px-4 pb-4">
          {category.category_name}{" "}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4">
        {/* space for filters */}
        sortowanie
        <div className="md:grid md:grid-cols-[15%,85%]">
          <div> filtry</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {category.products.map((product) => (
              <ProductCard product={product.Product} key={product.Product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
