import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/db'

import {NavbarDesktop} from "@/app/components/NavbarDesktop/index"
import {FavoritesSidebar} from "@/app/components/favorites"
import {CartSidebar} from "@/app/components/cartSidebar"
import {MobileNavbar} from "@/app/components/NavbarMobile"

export const Header = async () => {

  const categories = await prisma.categories.findMany({
    where:{
      is_home_page: true
    }
  })

  return (
    <>
    <header className="p-2 pt-4 border-b border-6 border-gray-300 mx-auto ">
      <div className='container flex mx-auto'>
        <h1 className="cursor-pointer font-semibold italic md:text-xl flex items-center">
           <Link href="/">Boss<span className="text-secondary">Zone</span> </Link>
       </h1>
        <div className="flex ml-auto gap-2 md:gap-4 items-center">

        <FavoritesSidebar/>
        <CartSidebar/>
        <MobileNavbar categories={categories}/>

        </div>
      </div>
     <NavbarDesktop/>
    </header>
    </>
  )
}
