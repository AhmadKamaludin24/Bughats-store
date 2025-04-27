import { NextResponse, NextRequest } from 'next/server';
import {db} from '@/lib/prisma';

type Params = {
    params: {
      slug: string
    }
  }

export async function GET(request: NextRequest , {params}: Params) {
    const {slug} =  params

    try {
        const product = await db.product.findUnique({
            where:{
                slug
            }
        })
        if (!product) {
            return NextResponse.json({ error: 'product not found' }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}