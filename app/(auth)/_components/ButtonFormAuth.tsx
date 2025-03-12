import { Button } from '@/components/ui/button'
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useFormState } from 'react-hook-form'

export const RegisterButton = () => {
    const {pending} = useFormStatus()
  return (
   
      <Button disabled={pending} type='submit'>{pending ? "Registering.." : "Sign Up"}</Button>
    
  )
}

export const SignInButton = () => {
  const {pending} = useFormStatus()
return (
 
    <Button disabled={pending} type='submit'>{pending ? "Logining.." : "Sign In"}</Button>
  
)
}

