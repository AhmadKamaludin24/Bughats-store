import { NextResponse, NextRequest } from 'next/server';
import {db} from '@/lib/prisma';

type Params = {
    params: {
      name: string
    }
  }

export async function GET(request: NextRequest, {params}: Params) {
    const {name} = params
   
    try {

        if (name === "all" ) {

            
            const products = await db.product.findMany({
                orderBy: {
                    createdAt: 'desc'  }
            })
            return NextResponse.json(products, { status: 200 });
            
          
            
        } else 
        {   

            const products = await db.product.findMany({
                where:{
                    name: {
                        contains: name,
                        mode: 'insensitive',
                    }
                }
            })
            
            return NextResponse.json(products, { status: 200 });


        }
      
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
        
    }
}