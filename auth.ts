import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/navigation"
import { SignInSchema } from "./lib/zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/prisma"
import { compareSync } from "bcrypt-ts"
 


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
        credentials: {
            email: {label: "email", placeholder: "email", type: "email"},
            password: {label: "password", placeholder: "password", type: "password"}
        },
        async authorize(credentials) {
            console.log("Credentials received:", credentials);
        
            const validatedFields = SignInSchema.safeParse(credentials);
            if (!validatedFields.success) {
                console.log("Validation error:", validatedFields.error);
                return null // <-- Tambahkan error eksplisit
            }
        
            const { email, password } = validatedFields.data;
            console.log("Validated fields:", { email, password });
        
            const user = await db.user.findUnique({ where: { email } });
            console.log("User found:", user);
        
            if (!user || !user.password) {
                console.log("User not found or no password set");
                return null// <-- Tambahkan error eksplisit
            }
        
            const passwordMatch = compareSync(password, user.password);
            console.log("Password match:", passwordMatch);
        
            if (!passwordMatch) {
              return null
            }
        
            return user;
        }
        
    })
  ],
  pages:{
    signIn: "/sign-in"
  }
  
})