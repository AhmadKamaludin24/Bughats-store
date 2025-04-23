"use client"
import React from 'react'

import { Input } from '../ui/input'
import SkeletonCardsProduct from '../skeleton/CardsProducts'
import Image from 'next/image'
import CardsProducts from '../cards/CardsProducts'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { ProductTypes } from '@/types/ProductTypes'



const HeroSection = () => {
  const [product, setProduct] = React.useState<ProductTypes[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState<string>("all")

  useEffect(() => {
    const getProducts = async () => {
      
      const res = await fetch(`/api/get-all-product/${encodeURI(search)}`, {
        method: 'GET',
        cache: 'no-store',
        next: {
          revalidate: 10,
        },
      });
      const data: ProductTypes[] = await res.json();
      setProduct(data);
      setLoading(false)
    };
    getProducts();
     }, [search, setSearch, setLoading]);

  return (
    <div className="min-h-screen">
       <div className="grid grid-rows-[250px_auto] sm:grid-rows-[350px_auto] w-full gap-5">
      
      <div className="mt-24 w-full row-start-1 rounded-3xl relative overflow-hidden object-cover">
        <Image src="/auth-bg/bg2.jpg" alt="banner" className='object-cover' fill/>
      </div>
      
      <div className="flex flex-col w-full row-start-2 gap-2 pb-7">
        <div className="px-4 py-4 flex gap-2 items-center justify-between mb-4 border-white/20 border-2 rounded-2xl">
          <h1 className="font-bold text-2xl text-white">New Products</h1>
          <Input placeholder={`Search...`} className="w-[200px] bg-gray-200" onChange={(e)=> setSearch(e.target.value || "all")} />
        </div>
        <div className="flex w-full gap-2 flex-wrap px-4">
         {loading 
         ? 
         <>
          <SkeletonCardsProduct/>
          <SkeletonCardsProduct/>
          <SkeletonCardsProduct/>
          <SkeletonCardsProduct/>
         </>
         : 
          <>
           {product.length > 0 ? 
           <>
              {product.map((item, index) => (
              
              <CardsProducts key={index} onClick={()=>redirect(item.slug)} model={item.model} name={item.name} description={item.description} imageUrl={item.imageUrl} price={item.price} />
               ))}
           </> : 
           <>
              <div className='flex w-full h-72 justify-center items-center'>
                <h1 className='text-white text-lg text-center'>product not found</h1>
              </div>
           </>}
          </>
         
         }
      
          
        
      
        </div>
       
       
      </div>
    </div>
    </div>
   
  )
}

export default HeroSection
