'use client';

import { createCart, addToCart } from '@/app/store/cartSlice';
import { AppDispatch, RootState } from '@/app/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import { QuantitySection } from './QuantitySection';

interface AddToCartSectionProps {
  productId: string;
}

export const AddToCartSection = ({ productId }: AddToCartSectionProps) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [qty, setQty] = useState<number>(1)

  const {id:cartId, products} = cart


  const handleAddToCart = async () => {
    let _cartId = cartId || Cookies.get('cart_id');

    if (!_cartId) {
      const resultAction = await dispatch(createCart());
      if (createCart.fulfilled.match(resultAction)) {
        _cartId = resultAction.payload as string;
      }
    }

    if (_cartId) {
      await dispatch(
        addToCart({
          product_id: productId,
          cart_id: _cartId,
          quantity: qty,
        })
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
     <QuantitySection qty={qty} setQty={setQty}/>
      <button
        className="w-full text-center bg-secondary-700 text-white md:my-4 rounded-2xl text-lg p-[5px] font-semibold hover:bg-secondary-800 transition"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};
