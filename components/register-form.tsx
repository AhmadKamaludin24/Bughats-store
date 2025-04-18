"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { db } from "@/lib/prisma";
import { createUserDB } from "@/app/(auth)/_actions/action";

// Skema validasi dengan Zod
const RegisterSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    name: z.string().min(3, "Nama minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password harus sama",
    path: ["confirmPassword"],
  });

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validasi dengan Zod
    const result = RegisterSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (!isLoaded) return;

    setLoading(true);
    try {
      const res = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });
    

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email })
      });
  
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
  

    router.push("/")
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="border-2 border-red-500 bg-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground text-sm">Enter your email</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Username</Label>
          <Input id="name" type="text" name="name" required onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" required onChange={handleChange} />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processing..." : "Register"}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/sign-in" className="underline underline-offset-4">
            Sign In
          </a>
        </div>
      </div>
    </form>
  );
}
