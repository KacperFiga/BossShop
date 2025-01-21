"use client";

import { ProductImageI } from "@/app/types";
import Image from "next/image";
import React from "react";
import { useWindowWidth } from "@/app/hooks/useWindowWidth";

interface ProductCardImagePropsI {
  images: ProductImageI[];
}

export const ProductCardImage: React.FC<ProductCardImagePropsI> = ({
  images,
}) => {
  const size = useWindowWidth();

  return (
    <div>
      {images.length > 0 ? (
        <Image
          src={images[0].url}
          width={size < 767 ? 146 : 200}
          height={size < 767 ? 146 : 200}
          alt={images[0].alt}
          className={`object-cover object-center bg-gray-100 rounded-md ${
            size < 767 ? "w-[146px] h-[146px]" : "w-[200px] h-[200px]"
          }`}
        />
      ) : (
        <Image
          src="/no-image.jpg"
          alt="no image"
          width={size < 767 ? 146 : 200}
          height={size < 767 ? 146 : 200}
          className={`object-cover object-center bg-gray-100 rounded-md ${
            size < 767 ? "w-[146px] h-[146px]" : "w-[200px] h-[200px]"
          }`}
        />
      )}
    </div>
  );
};
