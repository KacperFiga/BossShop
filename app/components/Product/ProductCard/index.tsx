import { ProductI, ProductImageI } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PricingSection } from '../PricingSection'
import { ActionButtons } from './ActionButtons'
import { ProductCardImage } from './ProductCardImage'


interface ProductCardI {
    product: ProductI
}

export const ProductCard:React.FC<ProductCardI> = ({product})=> {
  return (
    <div className="flex flex-col">
    <Link
      href={`/product/${product.id}`}
      className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg relative"
    >
     
      <div className="bg-gray-100 flex items-center justify-center p-2 rounded-md">
        <ProductCardImage images={product.images}/>
      </div>
      
       
      <p className="text-gray-700 font-bold text-sm mt-4">{product.name}</p>
    </Link>
  
    <PricingSection
      promoPrice={product.promo_price}
      regularPrice={product.regular_price}
      currency={product.currency}
    />
    <ActionButtons/>
  </div>
  )
}
