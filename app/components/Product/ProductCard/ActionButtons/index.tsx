import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

export const ActionButtons =  ()  => {
  return (
    <div className="flex gap-4 mt-auto pt-2">
        <button className="bg-gray-100 border-[2px] p-1 w-full rounded-md flex items-center justify-center shadow-md"><Icon icon="tabler:heart" width="20" height="20"  style={{color: "#cd3737"}} /></button>
        <button className="bg-secondary p-1 w-full rounded-md flex items-center justify-center"><Icon icon="tabler:shopping-bag-plus" width="20" height="20"  style={{color: '#fff'}} /></button>
    </div>
  )
}
