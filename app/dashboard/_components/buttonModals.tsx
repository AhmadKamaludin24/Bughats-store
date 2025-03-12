import { Button } from '@/components/ui/button'
import React from 'react'

const ButtonModals = ({title, action}: {title: string, action?: ()=> void }) => {
  return (
    <div>
      <Button onClick={action}>{title}</Button>
    </div>
  )
}

export default ButtonModals
