import { ProductI } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PricingSection } from '../PricingSection'
import { ActionButtons } from './ActionButtons'



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
      {product.images.length > 0 ? (
        <div className="bg-gray-100 flex items-center justify-center p-2 rounded-md">
        <Image
          src={product.images[0].url}
          width={146}
          height={146}
          alt={product.images[0].alt}
          className="w-[146px] h-[146px] object-cover object-center bg-gray-100 rounded-md"
        />
        </div>
      ) : (
        <Image
          src="/no-image.jpg"
          alt="no image"
          width={150}
          height={150}
          className="w-[150px] h-[150px] object-cover object-center bg-white rounded-md"
        />
      )}
      <p className="text-gray-700 font-bold text-sm">{product.name}</p>
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
