'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { getCart } from '@/app/utils/cart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '@/app/store/cartSlice';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import Image from 'next/image';

export const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {cart} = useSelector((state: RootState) => state.cart.cart);

  const handleCart = async() =>{
    const cart = await getCart()
    if(cart){
      dispatch(setCart(cart));
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
        <div className="ml-auto w-[90vw] flex flex-col md:w-[30vvw] h-full bg-white p-5" onClick={(e) => e.stopPropagation()}>
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
              <div key={product.id} className="flex my-4 w-full">
                 <div className="rounded-lg w-[90px] h-[90px] min-h-[90px] min-w-[90px]">
                  <Link href={`/product/${product.Product.id}`}>
                    { product.Product?.images?.length > 0  ? <Image src={product.Product.images[0].url} alt={product.Product.images[0].alt} width={90} height={90} className='w-[90px] h-[90px]  min-h-[90px] min-w-[90px] object-cover rounded-lg'/>  : <Image src='/no-image.jpg' alt='no image' width={90} height={90} className='w-[90px] h-[90px] object-cover rounded-lg' /> }
                  </Link>
                 </div>
                 <div className='ml-2 w-full'>
                  <div className='flex items-baseline'>
                    <p className="text-sm font-bold py-2">{product.Product.name}</p>
                    <p className='ml-auto text-sm'> {product.Product.regular_price} {product.Product.currency}</p>
                  </div>
                    <div className='w-full flex'>
                    <div>
                    </div>
                    <p className="font-bold ml-auto block text-[16px]">
                        {product.Product.promo_price > 0
                          ? `${(Number(product.Product.promo_price) * Number(product.quantity)).toFixed(2)} ${product.Product.currency}`
                          : `${(Number(product.Product.regular_price) * Number(product.quantity)).toFixed(2)} ${product.Product.currency}`}
                    </p>

                    </div>
                 </div>
              </div>
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
