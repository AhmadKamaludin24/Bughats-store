import {string, z} from "zod"


export const RegisterSchema = z.object({
    name: string().min(3, "username must be more than 3 character"),
    email: string().email("Invalid email"),
    password: string().min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
    ConfirmPassword: string().min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters")
}).refine(data=> data.password === data.ConfirmPassword, {message: " password does not match", path: ["ConfirmPassword"]})


export const SignInSchema = z.object({
    email: string().email("Invalid email"),
    password: string().min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),

   
})