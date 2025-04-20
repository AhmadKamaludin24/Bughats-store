import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
import { NextResponse, NextRequest } from 'next/server'


export async function POST(request: NextRequest) {
    try {
        const {amount, email, username} = await request.json()
        console.log(amount, email, username)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                email: email,
                username: username,
            }
        })
        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        return NextResponse.json({ error: error}, { status: 500 })
    }
}