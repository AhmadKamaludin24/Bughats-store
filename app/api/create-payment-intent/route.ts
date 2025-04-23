import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
import { NextResponse, NextRequest } from 'next/server'


export async function POST(request: NextRequest) {
    try {
        const {amount, email, username, productId} = await request.json()
        console.log(amount, email, username, productId)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                email: email,
                username: username,
                productId: Array.isArray(productId) ? JSON.stringify(productId) : String(productId),
            }
        })
        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        return NextResponse.json({ error: error}, { status: 500 })
    }
}