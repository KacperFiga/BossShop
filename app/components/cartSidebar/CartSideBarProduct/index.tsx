"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuantitySection } from "../../Product/AddToCartSection/QuantitySection";
import debounce from "lodash.debounce";
import { sendUpdateProductQuantity } from "@/app/utils/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { changeProductQty, removeProductFromCart } from "@/app/store/cartSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CartProduct } from "@/app/types";

interface CartSidebarProductPropsI {
  product: CartProduct;
  cart_id: string;
}

export const CartSidebarProduct = ({
  product,
  cart_id,
}: CartSidebarProductPropsI) => {
  console.log(product);
  const [qty, setQty] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const updateQty = useCallback(
    debounce(async (qty) => {
      await sendUpdateProductQuantity({
        product_id: product.productId,
        cart_id,
        quantity: qty,
      });
      dispatch(
        changeProductQty({
          product_id: product.productId,
          cart_id: cart_id,
          quantity: qty,
        })
      );
    }, 500),
    []
  );

  const handleRemoveProductFromCart = async () => {
    const response = await dispatch(
      removeProductFromCart({ product_id: product.productId, cart_id })
    );
  };

  useEffect(() => {
    if (qty !== product.quantity && qty !== 0) {
      updateQty(qty);
    }
  }, [qty]);

  useEffect(() => {
    setQty(() => product.quantity);
  }, [product.quantity]);

  return (
    <div>
      <div className="flex my-4 w-full">
        <div className="rounded-lg w-[90px] h-[90px] min-h-[90px] min-w-[90px]">
          <Link href={`/product/${product.productId}`}>
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

          <div className="w-full flex items-center gap-[2px]">
            <button className="mr-[2px]" onClick={handleRemoveProductFromCart}>
              <Icon
                icon="tabler:trash"
                width="20"
                height="20"
                style={{ color: "#cd3737" }}
              />
            </button>
            <QuantitySection qty={qty} setQty={setQty} variant="SIDEBAR" />
            <p className="font-bold ml-auto block text-[16px]">
              {product.Product.promo_price > 0
                ? `${(
                    Number(product.Product.promo_price) *
                    Number(product.quantity)
                  ).toFixed(2)} ${product.Product.currency}`
                : `${(
                    Number(product.Product.regular_price) *
                    Number(product.quantity)
                  ).toFixed(2)} ${product.Product.currency}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
