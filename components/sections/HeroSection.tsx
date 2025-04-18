import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const HeroSection = () => {
  return (
    <div className="grid grid-rows-[200px_500px_340px] h-screen w-full gap-5">
      <div className="mt-28 w-full row-start-1 bg-amber-600"></div>
      <div className=" w-full row-start-2 rounded-3xl bg-gray-800"></div>
      
      <div className="flex flex-col row-start-3">
        <div className="px-4">
          <h1 className="font-bold text-2xl">New Products</h1>
        </div>

       
      </div>
    </div>
  )
}

export default HeroSection
