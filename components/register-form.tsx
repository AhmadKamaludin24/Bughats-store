"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { signUpCredentials } from "@/app/(auth)/_actions/action"
import { Alert, AlertTitle, AlertDescription,  } from "./ui/alert"
import { AlertCircle } from "lucide-react"
import { RegisterButton } from "@/app/(auth)/_components/ButtonFormAuth"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction] = useActionState(signUpCredentials, null)

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} action={formAction}>
      {state?.message ? (
        <Alert variant="destructive" className="border-2 border-red-500 bg-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {state?.message}
          </AlertDescription>
        </Alert>
      ) : null }
      
      <div className="flex flex-col items-center gap-2 text-center">
      
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
          <p className="text-red-500" >{state?.error?.email}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" name="name" placeholder="your name" required />
          <p className="text-red-500" >{state?.error?.name}</p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            
          </div>
          <Input id="password" name="password" type="password" required />
          <p className="text-red-500" >{state?.error?.password}</p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            
          </div>
          <Input id="confirm-password" name="ConfirmPassword" type="password" required />
          <p className="text-red-500" >{state?.error?.ConfirmPassword}</p>
        </div>
        <RegisterButton/>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
          Continue with Google
        </Button>
      </div>
      <div className="text-center text-sm">
         have an account?{" "}
        <a href="/sign-in" className="underline underline-offset-4">
          Sign In
        </a>
      </div>
    </form>
  )
}
