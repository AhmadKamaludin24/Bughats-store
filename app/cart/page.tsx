"use client"

import CartItems from '@/components/cards/CartItems'
import Navbar from '@/components/Navbar'
import { useCartStore } from '@/lib/store/CartStore'

import { Input } from '@/components/ui/input'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutPage from '@/components/cards/CheckoutPage'
import ConvertToSubCurrency from '@/lib/ConvertToSubCurency'
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { formatCurrency } from '@/lib/FormatCurrency'


const Page = () => {
  const cart = useCartStore((state) => state.cart)
  const totalPrice = useCartStore((state) => state.totalPrice)
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      if(!email || !username){
        setError('Please fill in email and username fields')
        return
      }
      router.push(`/cart/checkout?amount=${totalPrice()}&&email=${email}&&username=${username}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-card-foreground relative '>
      <Navbar />
      {cart.length > 0 ? (
          <div className='pt-24 max-w-7xl relative mx-auto gap-3 flex max-[1000px]:flex-col px-3 '>
          <div className="flex flex-col gap-3">
            {cart.map((item, index)=>(
              <CartItems key={index} id={item.id} name={item.name} description={item.description} image={item.image} price={`${formatCurrency(item.price)}`} slug={item.slug} /> 
            ))}
                 
          </div>
         
          
  e
          <div className="flex flex-col border-2 w-full max-h-fit text-black pb-12 px-3 bg-white rounded-2xl">
            <h1 className='text-2xl text-center p-7'>Total: {formatCurrency(totalPrice())}</h1>
            <Elements stripe={stripePromise} options={{
              mode: 'payment',
              amount: ConvertToSubCurrency(totalPrice()),
              currency: 'usd',
            }}>
          <div className="flex flex-col w-full gap-2 mb-3">
            <label htmlFor="username" className='text-sm'>Username</label>
            <Input name='username' placeholder='Enter Your Name' value={username} onChange={(e)=> setUsername(e.target.value)} className={`${error ? "border-2 border-red-400" : ""}`} />
          </div>
          <div className={`flex flex-col w-full gap-2 mb-3`}>
            <label htmlFor="email" className='text-sm'>Email address</label>
            <Input name='email' type='email' placeholder='example@gmail.com' value={email} onChange={(e)=> setEmail(e.target.value)} className={`${error ? "border-2 border-red-400" : ""}`} />
          </div>
          
              <Button disabled={loading} className='w-full py-3' type='submit' onClick={handleCheckout}>{loading ? 'processing...' : `Checkout`}</Button>
            </Elements>
          </div>
  
        </div>
      ) : 
        <div className='w-full h-screen text-white flex flex-col justify-center items-center'> Cart Is Empety </div>
      }
      
    </div>
  )
}

export default Page
