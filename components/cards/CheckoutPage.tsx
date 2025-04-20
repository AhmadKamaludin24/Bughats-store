"use client"
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'

import { formatCurrency } from '@/lib/FormatCurrency'
import { Input } from '../ui/input'


const CheckoutPage = ({amount, email, username} : {amount: number, email:string, username: string}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = React.useState('')
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(false)
   
   
    useEffect(() => {
        if (amount > 0) {
            const fetchClientSecret = async () => {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount,
                        email,
                        username                     
                    }),
                })
                const data = await response.json()
                setClientSecret(data.clientSecret)
            }
            fetchClientSecret()
        }
    },[amount])

  

    const handleCheckout = async (event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
       try {
        
    
        if (!stripe || !elements) return
        const {error: submitError} = await elements.submit()
        if (submitError) {
            setError(submitError.message ?? null)
            setLoading(false)
            return
        }
        const {error: stripeError} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/success?amount=${amount}`,

            },
        })
        
        if (stripeError) {
          setError(stripeError.message ?? null);
        }
        setLoading(false)
       } catch (error) {
        setError('Something went wrong')
       } finally{
        setLoading(false)
       }
    }
  return (
  
        <form className='bg-white h-full flex flex-col gap-4' onSubmit={handleCheckout}>
         
            
            {clientSecret ? <PaymentElement id="payment-element" className='h-full'/> : <div className='w-full h-full text-center text-black'><h1>loading...</h1></div>}
            {error && <div className='text-red-500 text-center'>{error}</div>}
      
            {clientSecret &&  <Button disabled={!stripe || loading} className='w-full py-3' type='submit'>{loading ? 'processing...' : `Pay ${formatCurrency(Number(amount))}`}</Button>}
        </form>
  
        
  )
}

export default CheckoutPage
