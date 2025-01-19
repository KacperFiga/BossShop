'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuantitySection } from '../../Product/AddToCartSection/QuantitySection';



export const CartSidebarProduct = ({ product }) => {

const [qty, setQty] = useState<number>(0)


  return (
    <div>
      <div className="flex my-4 w-full">
        <div className="rounded-lg w-[90px] h-[90px] min-h-[90px] min-w-[90px]">
          <Link href={`/product/${product.Product.id}`}>
            {product.Product?.images?.length > 0 ? (
              <Image
                src={product.Product.images[0].url}
                alt={product.Product.images[0].alt}
                width={90}
                height={90}
                className="w-[90px] h-[90px] min-h-[90px] min-w-[90px] object-cover rounded-lg"
              />
            ) : (
              <Image
                src="/no-image.jpg"
                alt="no image"
                width={90}
                height={90}
                className="w-[90px] h-[90px] object-cover rounded-lg"
              />
            )}
          </Link>
        </div>

        <div className="ml-2 w-full">
          <div className="flex items-baseline">
            <p className="text-sm font-bold py-2">{product.Product.name}</p>

            <p className="ml-auto text-sm">
              {product.Product.regular_price} {product.Product.currency}
            </p>
          </div>

          <div className="w-full flex items-center">
            <QuantitySection qty={qty} setQty={setQty} variant='SIDEBAR'/>
            <p className="font-bold ml-auto block text-[16px]">
              {product.Product.promo_price > 0
                ? `${(Number(product.Product.promo_price) * Number(product.quantity)).toFixed(2)} ${product.Product.currency}`
                : `${(Number(product.Product.regular_price) * Number(product.quantity)).toFixed(2)} ${product.Product.currency}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
