"use server"

import { db } from "@/lib/prisma"


export async function createUserDB(name: string, email: string) {
    try {
      
        const user = await db.user.create({
            data: { name, email }
        });
        return user; 
    } catch (error) {
        console.log("failed to create user ")
    }
    
}