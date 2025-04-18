"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { SignInButton } from "@/app/(auth)/_components/ButtonFormAuth";
import { useRouter } from "next/navigation";
import { SignInSchema } from "@/lib/zod";
import { db } from "@/lib/prisma";
import next from "next";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const {isSignedIn, user } = useUser()



  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handlerOauth = async () => {
    try {
      signIn?.authenticateWithRedirect({ strategy: "oauth_google" , redirectUrl: "/",redirectUrlComplete: "/",})
    } catch (error) {
     setError(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({ email: "", password: "" });
    setError("");

    const result = SignInSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });
      return;
    }

    if (!isLoaded || !signIn) {
      console.error("signIn is not loaded or is undefined");
      return;
    }
    

    try {
      const res = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      await setActive({ session: res.createdSessionId });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Login gagal.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {error && (
        <Alert variant="destructive" className="border-2 border-red-500 bg-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {fieldErrors.email && <p className="text-red-500">{fieldErrors.email}</p>}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {fieldErrors.password && <p className="text-red-500">{fieldErrors.password}</p>}
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handlerOauth}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
