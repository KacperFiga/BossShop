'use client'

import React from 'react'
import { Icon } from "@iconify/react";

export const CartSidebar = () => {

  return (
    <button className='flex flex-col items-center'>
        <Icon icon="tabler:shopping-cart" width="24" height="24" />
        <span className="hidden md:block text-sm">
        Cart
        </span>
    </button>        
  )
}
