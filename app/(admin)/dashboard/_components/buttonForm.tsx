import { Button } from '@/components/ui/button'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-hook-form'

const ButtonForm = () => {
    const {pending} = useFormStatus()
  return (
   
      <Button disabled={pending} type='submit'>{pending ? "Submiting.." : "submit"}</Button>
    
  )
}

export default ButtonForm
