
import { NextResponse, NextRequest } from 'next/server';
import { ProductTypes } from '@/types/ProductTypes';
import {db} from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const products = await db.product.findMany()
        
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
        
    }
}