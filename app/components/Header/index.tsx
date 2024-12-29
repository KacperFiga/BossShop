import React from 'react'
import prisma from '@/lib/db'

import DesktopNavbar from "@/app/components/NavbarDesktop/index"
import Favorites from "@/app/components/favorites"
import Cart from "@/app/components/cartSidebar"
import MobileNavbar from "@/app/components/NavbarMobile"

export default async function index() {

  const categories = await prisma.categories.findMany({
    where:{
      is_home_page: true
    }
  })

  return (
    <>
    <header className="p-2 pt-4 border-b border-6 border-gray-300 mx-auto">
      <div className='container flex mx-auto'>
        <h1 className="font-semibold italic md:text-xl flex items-center">Boss<span className="text-secondary">Zone</span></h1>
        <div className="flex ml-auto gap-2 md:gap-4 items-center">

        <Favorites/>
        <Cart/>
        <MobileNavbar categories={categories}/>

        </div>
      </div>
     <DesktopNavbar/>
    </header>
    </>
  )
}
