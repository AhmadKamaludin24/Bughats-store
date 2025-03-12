export const runtime = "nodejs"; 
"use server"
import { db } from "@/lib/prisma"
import { redirect } from "next/navigation"
import {object, z} from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

const productSchema = z.object({
   
    name: z.string().min(3, "name must more than 3 character").max(255, "to long"),
    description: z.string().min(3, "description must more than 3 character").max(255, "to long"),
    price: z.coerce.number().min(1, "Price must be at least 1") // Pastikan tidak bisa 0 atau negatif
    .nonnegative("Price cannot be negative"), // Jaga-jaga kalau ada nilai negatif
    image: z.instanceof(File).refine((file) => file.size > 0 , {message: "images is required"})
    .refine(file => file.type.startsWith("image/"), {message: "only image are allowed"})
    .refine(file => file.size < 10000000, {message: "image must less than 10mb"}),
    createdAt: z.date().default(() => new Date()),

})



export async function addProduct(prevState: unknown ,formData: FormData) {
    const result = productSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!result.success) {
        return { error: result.error?.flatten().fieldErrors }
    }

    const {name, description, price,image} = result.data

    fs.mkdir("public/products" , {recursive: true})
    const imagePath = `/products/${crypto.randomUUID()}-${image.name}`
    fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))


    try {
        await db.product.create({
            data:{
                name,
                description,
                price,
                imageUrl: imagePath,
               
            }
        })
    } catch (error) {
        console.log(error)
    }

    redirect("/dashboard/products")
    return {message: "success"}
    
}

export async function getProducts() {
    try {
        const data = await db.product.findMany()
        console.log(data)
        return data
    } catch (error) {
        return[]
    }
}

export async function toggleAvailability(id: string, isavailable: boolean) {
    try {
        const product = await db.product.update({where: {id}, data:{isavailable}})
        revalidatePath("/dashboard/products")
        return product;

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: string) {
    try {
        const product = await db.product.delete({where: {id}})
        revalidatePath("/dashboard/products")
        return product;

    } catch (error) {
        console.log(error)
    }
}