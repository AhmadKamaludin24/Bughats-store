import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='fixed top-0 z-30 left-0 w-full py-5 bg-card-foreground'>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5">
      <div className='text-white font-bold text-xl'>Icikiwir Shop</div>
        <div className='flex items-center gap-4'>
            <a href="/" className='text-white'>Home</a>
            <a href="/about" className='text-white'>About</a>
            <a href="/contact" className='text-white'>Contact</a>
        </div>
        <div className="flex items-center justify-between gap-5">
          
          <Link href={"/"} >
            <Image src={"/icons/cart.svg"} width={40} height={40} alt='cart'></Image>
          </Link>
          <Button variant={"outline"} className='text-black'>
            Sign Up
          </Button>
        </div>
      </div>
       
    </div>
  )
}

export default Navbar
