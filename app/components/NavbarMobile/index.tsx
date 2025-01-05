'use client'

import React, {useState} from 'react'
import { Icon } from "@iconify/react";
import {MenuSidebar} from "@/app/components/NavbarMobile/sidebar"
import { CategoryI } from '@/app/types';

interface MobileNavbarPropsI {
  categories: CategoryI[]
}

export const MobileNavbar:React.FC<MobileNavbarPropsI>= ({categories}) =>{
  const [isMenuOpen, HandleIsMenuOpen] = useState<boolean>(false);
  const toggleIsMenuOpen = () => HandleIsMenuOpen((prev) => !prev);


  return (
    <>
      <button onClick={toggleIsMenuOpen} className="block md:hidden">
          <Icon icon="tabler:menu-2" width="24" height="24" /> 
      </button>
      <MenuSidebar isOpen={isMenuOpen} toggleIsOpen={toggleIsMenuOpen} categories={categories}/>
    </>

  )
}
