"use server"
import { db } from "@/lib/prisma"
import { RegisterSchema, SignInSchema } from "@/lib/zod"
import {hashSync} from "bcrypt-ts"
import { redirect } from "next/navigation"

import AuthError from "next-auth"
import { signIn } from "@/auth"


export async function signUpCredentials(prevState: unknown, formData :FormData) {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {name, email, password} = validatedFields.data
    const hashedPassword = hashSync(password, 10)

    try {
        await db.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })

    } catch (error) {
        return {message : "failed to register user"}
    }
    redirect("/")
}

export async function signInCredentials(prevState: unknown, formData: FormData) {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, password} = validatedFields.data

    try {
    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      return { message: "Invalid email or password" };
    }

    return {success : true}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Email atau password salah!" };
                default:
                    return { message: "Terjadi kesalahan. Coba lagi nanti!" };
            }
        }

        return { message: "Server error" };
    }
}
