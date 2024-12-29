'use client'

import React, {useState} from 'react'
import { Icon } from "@iconify/react";

import NavbarSidebar from "@/app/components/NavbarMobile/sidebar"

export default function index({categories}) {

  const [isMenuOpen, HandleIsMenuOpen] = useState<boolean>(false);

  const toggleIsMenuOpen = () => HandleIsMenuOpen((prev) => !prev);


  return (
    <>
      <button onClick={toggleIsMenuOpen} className="block md:hidden">
          <Icon icon="tabler:menu-2" width="24" height="24" /> 
      </button>
      <NavbarSidebar isOpen={isMenuOpen} toggleIsOpen={toggleIsMenuOpen} categories={categories}/>
    </>

  )
}
