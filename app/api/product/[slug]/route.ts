import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";


export async function GET(request: NextRequest, {params}: {params: {slug: string}} ){
    try {
        const {slug} = params
        const product = await db.product.findFirst({
            where: {
                slug
            }
        })
        if (!product) {
            return NextResponse.json({message: "Product not found"}, {status: 404})
        }
        return NextResponse.json(product, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
}