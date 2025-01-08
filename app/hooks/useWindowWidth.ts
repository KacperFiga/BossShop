'use client'

import { useEffect, useState } from "react";

type AppWidthT =  number;

export const useWindowWidth = () => {
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

