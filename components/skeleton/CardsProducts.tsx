'use client'

import { Button } from '../ui/button'

export default function SkeletonCardsProduct() {
  

  return (
    <div style={{cursor: 'pointer'}} className="lg:w-[24%] md:w-[48%] w-[100%] bg-card-foreground rounded-2xl grid grid-rows-[130px_auto] md:grid-rows-[150px_auto] overflow-hidden shadow-2xl text-white border-gray-700 border-2">
      {/* Bagian Canvas */}
      <div className="animate-pulse rounded-t-2xl overflow-hidden h-full w-full  p-2">
      
       <div className='animate-pulse w-full h-full bg-gray-600 rounded-2xl flex items-center justify-center'>
     
       </div>
       
       
        
    
       


      </div>

      {/* Info Produk */}
      <div className="max-w-full max-h-fit rounded-b-2xl flex flex-col items-center justify-center gap-2 p-2">
      <div className="animate-pulse w-full py-7 rounded-2xl bg-gray-600">
      <h1 className="ml-2 font-bold text-[17px] line-clamp-2 sm:w-[230px] w-[250px]  "></h1>
      <p className="ml-2 text-[13px] text-gray-500 line-clamp-2 sm:w-[230px] w-[200px] h-fit text-ellipsis ">
      
      </p>
      </div>

       <div className='flex  w-full h-full items-end justify-between p-2'>
        <div className="animate-pulse bg-gray-600 px-12 py-5 rounded-2xl"></div>
        <Button className='animate-pulse bg-gray-600 px-12' ></Button>

       </div>
      </div>
    </div>
  )
}
