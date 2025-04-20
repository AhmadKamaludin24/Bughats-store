"use client"
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import ConvertToSubCurrency from '@/lib/ConvertToSubCurency'
import { useSearchParams } from 'next/navigation'
import CheckoutPage from '@/components/cards/CheckoutPage'
import { formatCurrency } from '@/lib/FormatCurrency'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Page = () => {
  const amount = Number(useSearchParams().get('amount'))
  const email = useSearchParams().get('email')
  const username = useSearchParams().get('username')

  useEffect(() => {
    if (!email || !username) {
      window.location.href = '/cart'
    }
    if (amount <= 0) {
      window.location.href = '/cart'
    }
  },[])
   
  return (
    <div className='w-full min-h-screen bg-card-foreground relative '>
      <div className='pt-24 max-w-7xl relative mx-auto gap-3 flex max-sm:flex-col px-3 '>
        <div className="flex flex-col border-2 w-full h-auto text-black pb-12 px-3 bg-white rounded-2xl">
          <h1 className='text-2xl text-center p-7'>Total: {formatCurrency(amount)}</h1>
          <Elements stripe={stripePromise} options={{
            mode: 'payment',
            amount: ConvertToSubCurrency(amount),
            currency: 'usd',
          }}>
            <CheckoutPage amount={amount} email={email!} username={username!}/>
          </Elements>
        </div>
      </div>
    </div>
  )
}

export default Page
