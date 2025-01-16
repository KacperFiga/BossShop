'use client'

import React, { useEffect } from 'react'
import { Icon } from "@iconify/react";
import { getCart } from '@/app/utils/cart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/app/store/cartSlice';
import { RootState } from '@/app/store/store';

export const CartSidebar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handleCart = async() =>{
    const cart = await getCart()
    if(cart){
      dispatch(setCart(cart));
    }
  }

  useEffect(()=>{
    handleCart()
  },[])

  return (
    <button className='flex flex-col items-center'>
        <Icon icon="tabler:shopping-cart" width="24" height="24" />
        <span className="hidden md:block text-sm">
        Cart
        </span>
    </button>        
  )
}
