import { Button } from '@/components/ui/button'

import { useFormStatus } from 'react-dom'


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

