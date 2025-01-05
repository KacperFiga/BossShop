'use client'

import React from 'react'
import { Icon } from "@iconify/react";

export const FavoritesSidebar = () => {

  return (
    <button className='flex flex-col items-center'>
    <Icon icon="tabler:heart" width="24" height="24" />
    <span className="hidden md:block text-sm">
    Favorites
    </span>
    </button>
  )
}
