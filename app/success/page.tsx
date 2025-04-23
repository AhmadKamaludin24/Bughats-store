"use client"
import { Loader } from '@/components/cards/CardsProducts'
import Icon from '@/components/icons/icon'
import { Spotlight } from '@/components/ui/aceternity/spotlight-new'
import { formatCurrency } from '@/lib/FormatCurrency'
import {  useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'


const Page = () => {
   const amount = useSearchParams().get('amount')
   const paymentIntentId = useSearchParams().get('payment_intent')
   const [loading, setLoading] = useState<boolean>(true)
   const [message, setMessage] = useState<string | null>(null)
    const [status, setStatus] = useState<boolean>(false)

   useEffect(() => {
    const checkStatus = async () => {
      if (!paymentIntentId || !amount || Number(amount) <= 0) {
        window.location.href = '/cart'
        return
      }
  
      try {
        setLoading(true)
        const res = await fetch('/api/check-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentIntentId }),
        })
  
        const data = await res.json()
        setMessage(data.message)
        setStatus(data.status)
        setLoading(false)
        
      } catch (error) {
        console.error(error)
        window.location.href = '/cart'
      }
    }
  
    checkStatus()
  }, [])
  
   
  return (
    <div className='relative overflow-hidden flex flex-col items-center justify-center h-screen text-white text-center'>
        <Spotlight/>
        {loading ? <Loader/> : 
          <>
          {status ?
           <div className='flex flex-col items-center justify-center h-full w-full bg-black/50 absolute top-0 left-0'>
           <Icon props={true}  />
              <h1 className='text-3xl sm:text-5xl font-bold'>{message}</h1>
              <p className='text-2xl sm:text-4xl mt-5'>{formatCurrency(Number(amount))}</p>
          </div>
        :
          <div className='flex flex-col items-center justify-center h-full w-full bg-black/50 absolute top-0 left-0'>
          <Icon props={false}  />
              <h1 className='text-3xl sm:text-5xl font-bold'>{message}</h1>
              <p className='text-2xl sm:text-4xl mt-5'>{formatCurrency(Number(amount))}</p>
          </div>
        }
          </>
        }
        
        
    </div>
  )
}

export default Page
  
