"use client"
import React, { Suspense, useState } from 'react'
import Navbar from '@/components/Navbar'
import Display3d from '@/components/three/Display3d'
import { Spotlight } from '@/components/ui/aceternity/spotlight-new'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/CartStore'
import { ProductTypes } from '@/types/ProductTypes'
import { formatCurrency } from '@/lib/FormatCurrency'



const ProductDetail = ({ product, uuid}: { product: ProductTypes, uuid: string }) => {
  const [currentModel, setCurrentModel] = useState(product.model[0])
  const productModel = product.model
  const [showDetails, setShowDetails] = useState(false)
  const {addToCart} = useCartStore((state) => state)
  const handleAddToCart = () => {
    addToCart({ name: product.name, slug: product.slug ,description: product.description, image: product.imageUrl ,price: product.price, uuid:uuid  })
    alert('Added to cart!')
  }


  return (
    <div>
      <div className='flex flex-col select-none justify-center items-center w-full h-screen bg-card-foreground relative overflow-hidden'>
        <Navbar />
        <Spotlight />
        <div className="absolute inset-0 z-40 ">
          <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" /></div>}>
            <Display3d model={currentModel} />
          </Suspense>
         
        </div>

          {/* Product detail */}
          <div className={`absolute lg:right-44 max-lg:bottom-0 lg:min-w-md lg:max-w-xl max-lg:w-full  text-white backdrop-blur-md border space-y-3 p-7 max-sm:p-3 border-white/20 z-50 ${showDetails ? "" : "hidden"} md:block`}>
            <div className='w-full flex justify-end items-center'>
              <button className={`bg-white py-1 px-3 text-black rounded-xl md:hidden `} onClick={()=> setShowDetails(!showDetails)} >x</button>
            
            </div>
            
            <h1 className='text-4xl max-sm:text-2xl font-bold max-md:max-w-screen text-wrap'>{product.name}</h1>
            <p className='text-[14px] max-h-[100px] max-sm:text-[15px] text-gray-400 overflow-y-auto max-w-fit max-sm:max-w-screen text-wrap'>{product.description}</p>
            <div className="flex justify-between items-center pointer-events-auto">
              <p className='text-lg'>Price: <span className='text-green-700'>{formatCurrency(product.price)}</span></p>
              <Button variant="outline" className="text-black mt-2 " onClick={ handleAddToCart}>Add to Cart</Button>
           </div>
          </div>
        <div className="absolute max-[607px]:hidden "></div>
        <Button className={`absolute min-[765px]:hidden bottom-24 z-50 w-32 border-white/20 border-2 bg-transparent ${showDetails ? "hidden" : ""} `} onClick={()=>setShowDetails(!showDetails)}>Show details</Button>
        <Button className={`absolute min-[765px]:hidden bottom-36 z-50 w-32 border-white/20 border-2 bg-transparent ${showDetails ? "hidden" : ""} `} onClick={handleAddToCart}>Add to cart</Button>

        <div className="absolute sm:bottom-32 max-sm:top-32  w-full flex justify-center items-center z-50 gap-5">
          {productModel.map((model, index) => (
            <button key={index} className={`w-[70px] h-[70px] text-white max-sm:w-[50px]  max-sm:h-[50px] border-2 rounded-xl ${currentModel === model ? `border-white` : `border-white/20` } `} onClick={() => setCurrentModel(model)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
