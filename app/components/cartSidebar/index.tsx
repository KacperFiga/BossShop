'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { getCart } from '@/app/utils/cart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/app/store/cartSlice';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import { CartSidebarProduct } from './CartSideBarProduct';

export const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const handleCart = async() =>{
    const data = await getCart()
    if(data?.cart){
      dispatch(setCart(data.cart));
    }
  }

  const toggleIsOpen = ()=>setIsOpen(prev=>!prev)

  useEffect(()=>{
    handleCart()
  },[])


  useEffect(()=>{
    console.log(cart)
  },[cart])

  return (
    <>
    <button className='flex flex-col items-center' onClick={toggleIsOpen}>
        <Icon icon="tabler:shopping-cart" width="24" height="24" />
        <span className="hidden md:block text-sm">
        Cart
        </span>
    </button>        
    { isOpen ?<div className={"absolute top-0 left-0 bg-black w-full h-full z-10 bg-opacity-20" }> </div> : null }
  
    <div onClick={(e)=>toggleIsOpen()} className={`${isOpen ? 'top-0 translate-x-[-100%]' : '' } top-0 fixed w-full h-full z-10 duration-700 right-[-100%]`}>
        <div className="ml-auto w-[90vw] flex flex-col md:w-[30vw] md:min-w-[350px] h-full bg-white p-5" onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center border-b-2 pb-4'>
          <p className="">Your Shopping Bag</p>
        <button className="ml-auto block" onClick={toggleIsOpen}>
            <Icon icon="material-symbols:close-rounded" width="24" height="24"/>
        </button>
        </div>

        <div className="flex flex-col h-full">

        <div className="flex flex-col">
        <div>
          { cart?.products?.length > 0 ? 
            cart?.products.map(product=>(
             <CartSidebarProduct product={product} key={product.id} cart_id={cart.id}/>
            ))
          : <p>Add products to Your shopping bag</p>}
        </div>
     
        </div>
        <div className=" mt-auto items-end border-t py-2">
          <div className='flex justify-between font-bold'>
            <p> Products in total: </p>
            <p> {cart?.total_cost}  </p>
          </div>
          <p className='text-gray-700 mt-2 text-sm'>Delivery costs will be added in the summary.</p>
          <Link href="/cart" className=" mt-4 w-full block text-center bg-secondary-700 text-white rounded-md text-md p-[5px] font-semibold hover:bg-secondary-800 transition"> Go to cart </Link>
          <button className='w-full text-center mt-2 text-gray-700 text-sm' onClick={toggleIsOpen}> or continue shopping </button>
        </div>
       
        </div>

        </div>
    </div>
    </>

  )
}
