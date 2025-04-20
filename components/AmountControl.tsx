'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const AmountControl = () => {
  const [amount, setAmount] = useState(1)

  const decrease = () => {
    if (amount > 1) setAmount(amount - 1)
  }

  const increase = () => {
    setAmount(amount + 1)
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <Button variant="outline" size="sm" onClick={decrease} className='text-black'>-</Button>
      <span className="text-white text-lg w-8 text-center">{amount}</span>
      <Button variant="outline" size="sm" onClick={increase} className='text-black'>+</Button>
    </div>
  )
}

export default AmountControl
