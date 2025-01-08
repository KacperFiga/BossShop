'use client'

import { ProductImageI } from '@/app/types'
import Image from 'next/image'
import React, {useState, useEffect} from 'react'

interface ProductCardImagePropsI {
    images: ProductImageI[]
}

type AppWidthT =  number;

export const ProductCardImage:React.FC<ProductCardImagePropsI> = ({images}) => {
    const useWindowSize = () => {
        const [appWidth, setAppWidth] = useState<AppWidthT>(767);
      
        useEffect(() => {
          function handleResize() {
            setAppWidth(window.innerWidth);
          }
          
          window.addEventListener("resize", handleResize);
           
          handleResize();
          
          return () => window.removeEventListener("resize", handleResize);
        }, []); 
        return appWidth;
      }
    
    const size = useWindowSize();


  return (
    <div>
        {
            images.length > 0 ? 
            <Image
            src={images[0].url}
            width={size < 767 ? 146 : 200}
            height={size < 767 ? 146 : 200}
            alt={images[0].alt}
            className={`object-cover object-center bg-gray-100 rounded-md ${size < 767 ? 'w-[146px] h-[146px]' : 'w-[200px] h-[200px]'}`}
        />
            :
            <Image
            src="/no-image.jpg"
            alt="no image"
            width={size < 767 ? 146 : 200}
            height={size < 767 ? 146 : 200}
            className={`object-cover object-center bg-gray-100 rounded-md ${size < 767 ? 'w-[146px] h-[146px]' : 'w-[200px] h-[200px]'}`}
            />
        }
    </div>
  )

  
}
