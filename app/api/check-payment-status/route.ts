import { NextRequest,NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
    const {paymentIntentId} = await request.json()
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        if (!paymentIntent) {
            return NextResponse.json({ message: 'Payment intent not found' }, { status: 404 })
        }

        if(paymentIntent.status === 'succeeded') {
            return NextResponse.json({ status: true, message: 'Payment successful' })
        } else{
            return NextResponse.json({ status: false, message: 'Payment not successful' })
        }
    
        
        return NextResponse.json({status: paymentIntent.status})
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve payment status' }, { status: 500 })
    }
}