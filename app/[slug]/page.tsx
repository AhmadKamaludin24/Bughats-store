import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'
import { db } from '@/lib/prisma'

// page.tsx
interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  // Mengambil data produk berdasarkan slug
  const productData = await db.product.findUnique({ where: { slug: params.slug } })

  // Jika produk tidak ditemukan, arahkan ke halaman 404
  if (!productData) return notFound()

  // Kirimkan data produk ke komponen ProductDetail
  return <ProductDetail product={productData} uuid={productData.id} />
}

export default Page
