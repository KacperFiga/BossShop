'use client'

import React from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import 'swiper/css';




export default function index({images}) {
  return (
    <div className="bg-gray-100">
    <Swiper spaceBetween={50} slidesPerView={1} loop={true}  pagination={{ clickable: true }} navigation modules={[Navigation]}>
    {images.map(image=>{return(
        <SwiperSlide key={image.alt}>
            <Image src={image.url} alt={image.alt} width={450} height={450}/>
        </SwiperSlide>
    )})}
    </Swiper>
    </div>
  )
}
