'use client'

import dynamic from 'next/dynamic'
import {  useState } from 'react'
import { Button } from '../ui/button'

import Image from 'next/image'
import { CardProductProps} from '@/types/ProductTypes'
import { formatCurrency } from '@/lib/FormatCurrency'

const Display3d = dynamic(() => import('../three/Display3d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  ),
})



export function Loader() {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
      </div>
    )
  }

export default function CardsProducts({ model, name, price, description, imageUrl, onClick }: CardProductProps) {
  const [mode3D, setMode3D] = useState(false)

  return (
    <div style={{cursor: 'pointer'}} className="lg:w-[24%] md:w-[48%] w-[100%] bg-card-foreground rounded-2xl grid grid-rows-[130px_auto] md:grid-rows-[150px_auto] overflow-hidden shadow-2xl text-white border-gray-700 border-2">
      {/* Bagian Canvas */}
      <div className="group relative rounded-t-2xl overflow-hidden h-full w-full">
        {mode3D ? 
           <Display3d model={model[0]} /> 
      
        
       : 
       <div >
     
        <Image src={imageUrl} alt="product image" className='object-cover' fill/>
        <Button variant="outline" className="absolute text-black top-2 right-3 z-10 max-sm:text-[15px]" onClick={() => setMode3D(!mode3D)}>3D</Button>
        
       </div>
       
       }
        
    
       


      </div>

      {/* Info Produk */}
      <div onClick={onClick} className="max-w-full max-h-fit rounded-b-2xl flex flex-col items-center justify-center gap-2 ">
      <div className="w-full py-2 ">
      <h1 className="ml-2 font-bold text-[17px] line-clamp-2 sm:w-[230px] w-[250px]  ">{name}</h1>
      <p className="ml-2 text-[13px] text-gray-500 line-clamp-2 sm:w-[230px] w-[200px] h-fit text-ellipsis ">
      {description}
      </p>
      </div>

       <div className='flex  w-full h-full items-end justify-between p-2'>
        <p className="font-bold text-[15px] text-green-800">{formatCurrency(price)}</p>
        <Button variant="outline" className="text-black mt-2 " onClick={onClick}>Add to Cart</Button>

       </div>
      </div>
    </div>
  )
}
