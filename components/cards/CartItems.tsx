"use client"
import React from 'react'

import { useCartStore } from '@/lib/store/CartStore'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const CartItems = ({id, name, description, price, slug, image } : {id: number,name: string, description: string, price: string, slug: string,image: string ,onClick?: ()=> void}) => {
  const {removeItem} = useCartStore((state) => state)
  const handleRemove = () => {
    removeItem(id)
  }
  return (
    <div className="p-3 border-2 border-white/20 flex sm:min-w-xl h-auto relative cursor-pointer" >
      <div className='text-white  absolute right-5 top-2 text-[25px]' onClick={handleRemove} >x</div>
        <div onClick={()=>redirect(`/${slug}`)} className="w-32 h-32 max-sm:w-24 max-sm:h-24 bg-accent flex flex-shrink-0 relative object-cover">
           
            <Image src={image} alt="image" fill className='object-cover'/>
        </div>
        <div className="text-white pl-5 ">
            <h1 className='text-3xl max-sm:text-2xl line-clamp-2'>{name}</h1>
            <p className='text-gray-400 max-sm:text-[10px] line-clamp-3'>{description}</p>
            <p className='text-lg'>Price: <span className='text-green-700'>{price}</span></p>
            
         
        </div>
    </div>
  )
}

export default CartItems
