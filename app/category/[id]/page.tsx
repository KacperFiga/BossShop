import React from 'react'
import prisma from '@/lib/db'

export default async function page(context: PromiseLike<{ id: any; }> | { id: any; }) {
    const {id} = await context;

    const categoryData = await prisma.categories.findMany({
      where: {
        id: id, 
      },
      select: {
        category_name: true,
        products: {
          select: {
            Product: {
              select: {
                id: true,
                name: true,
                regular_price: true,
                promo_price: true,
                currency: true,
              },
            },
          },
        },
      },
    });
    
  

    const category = categoryData[0];


  return (
    <div className='container mx-auto'>
        <h1> {category.category_name} </h1>
        <div>
            {category.products.map(({Product})=>(<div key={Product.id}>{Product.name}</div>))}
        </div>
    </div>
  )
}
