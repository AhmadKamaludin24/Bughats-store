"use client"
import React from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const page = () => {
  const {signOut} = useClerk()
  const router = useRouter()
  const handleLogout = async() => {
    await signOut()
    router.push("/")
  }
  return (
    <div>
      user route

      <Button onClick={handleLogout} >sing out</Button>
    </div>
  )
}

export default page
