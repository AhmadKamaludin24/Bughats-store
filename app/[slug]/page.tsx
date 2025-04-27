"use client"
import React from 'react'

import ProductDetail from './ProductDetail'
import { notFound, useParams } from 'next/navigation'
import { Loader } from '@/components/cards/CardsProducts'
import { ProductTypes } from '@/types/ProductTypes'

const Page = () => {
  const { slug } = useParams()
  const [product, setProduct] = React.useState<ProductTypes>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/get-product-slug/${slug}`)
        if(!response.ok) {
          return notFound()
        }
        const data = await response.json()
        console.log(data[0])
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
      } 
    }
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
          <Loader/>
      </div>
    )
  }


  return (
    <ProductDetail product={product} />
  )
}

export default Page
