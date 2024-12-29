import React from 'react'
import prisma from '@/lib/db'
import Image from 'next/image';

export default async function page(context: { params: any; }) {
    const { params } = context;
    const { id } = await params; 
  
     const product = await prisma.product.findFirst(
    {
        where: { id: id },
        include:{
            images: true,
            categories:true
        }
    }
  )

  return (
   <div>
    <h1>
        {product.name}
    </h1>
    <p>{product.regular_price} {product.currency} </p>
    <p> {product.description} </p>
    <div>
        {product?.images.map(img=>(
            <Image key={img.id} src={img.url} width="200" height="200" alt={img.alt}>

            </Image>
        ))}
    </div>
   </div>
  )
}
