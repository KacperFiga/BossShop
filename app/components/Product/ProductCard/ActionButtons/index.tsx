'use client';

import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useWindowWidth } from '@/app/hooks/useWindowWidth'

export const ActionButtons =  ()  => {
  const appWidth = useWindowWidth();

  return (
    <div className="flex gap-4 mt-auto pt-2">
        <button className="bg-gray-100 border-[2px] hover:bg-gray-50 duration-150 p-1 w-full rounded-md flex items-center justify-center shadow-md"><Icon icon="tabler:heart" width="20" height="20"  style={{color: "#cd3737"}} /></button>
        <button className="bg-secondary hover:bg-secondary-900 duration-150 p-1 w-full rounded-md flex items-center justify-center"><Icon icon="tabler:shopping-bag-plus" width="20" height="20"  style={{color: '#fff'}} />  {appWidth  > 1023 ?  <span className="ml-1 text-white"> Add to cart</span> : null} </button>
    </div>
  )
}
