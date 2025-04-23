
import { notFound } from 'next/navigation'

import ProductDetail from './ProductDetail'

import { db } from '@/lib/prisma'





// page.tsx
const Page = async ({ params }: { params: { slug: string } }) => {
  const productData = await db.product.findUnique({where: {slug: params.slug}})
  

  if (!productData) return notFound()

  return <ProductDetail product={productData} uuid={productData.id}/>
}

export default Page
