'use client'

import React from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { ProductImageI } from '@/app/types';

interface ProductImagesPropsI {
  images: ProductImageI[]
}

export const ProductImagesSlider:React.FC<ProductImagesPropsI> = ({images}) => {
  return (
    <div className=" w-full">
    <Swiper spaceBetween={50} slidesPerView={1} loop={true}  pagination={{ clickable: true }} navigation modules={[Navigation]}>
    {images.map(image=>{return(
        <SwiperSlide key={image.alt}>
            <Image src={image.url} alt={image.alt} width={450} height={450} className="mx-auto"/>
        </SwiperSlide>
    )})}
    </Swiper>
    </div>

  )
}
