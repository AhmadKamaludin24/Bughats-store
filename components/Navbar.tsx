import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/CartStore'

const Navbar = () => {
  const cart = useCartStore((state) => state.cart)
  return (
    <div className='fixed top-0 z-50 left-0 w-full py-5 bg-card-foreground'>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5">
        <Link href={"/"}>
          <div className='text-white font-bold text-xl' style={{cursor: 'pointer'}}>Bughats Store</div>
        </Link>
        
        <div className="flex items-center justify-between gap-5">
          
          <Link href={"/cart"} className='relative'>
          {cart.length > 0 &&  <div className="w-[10px] h-[10px] absolute right-0 rounded-2xl bg-red-500 z-50"></div>}
           
            <Image src={"/icons/cart.svg"} width={40} height={40} alt='cart'></Image>
          </Link>
         
        </div>
      </div>
       
    </div>
  )
}

export default Navbar
