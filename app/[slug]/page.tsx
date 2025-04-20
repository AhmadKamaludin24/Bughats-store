
import { notFound } from 'next/navigation'

import ProductDetail from './ProductDetail'
import { product } from '@/lib/data/index'
import { db } from '@/lib/prisma'


// page.tsx
const Page = async ({ params }: { params: { slug: string } }) => {
  const productData = await db.product.findFirst({where: {slug: params.slug}})
  if (!productData) return notFound()

  return <ProductDetail product={productData}/>
}

export default Page
