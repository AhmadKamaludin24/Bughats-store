"use client"
import { useActionState, useState } from 'react'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatToRupiah } from '@/lib/formater'
import { addProduct } from '../products/_actions/action'
import { useFormState } from 'react-dom'
import { number } from 'zod'
import ButtonForm from './buttonForm'

const FormAddProduct = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [priceInIDR, setPriceInIDR] = useState<number | null>(null) 
  const [state, formAction] = useActionState(addProduct, null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  
  return (
    <div className='bg-card md:min-w-3xl h-auto lg:max-w-3 p-5 rounded-2xl '>
      <form action={formAction}>
        <div className='grid grid-cols-1 gap-4'>
          <h1 className='font-bold '>Add Product</h1>
          <div className='space-y-3'>
           <Label htmlFor='name' >Product Name</Label>
           <Input required id='name' name='name'/>
         </div>
         <p className='text-red-700'>{state?.error?.name}</p>
         <div className='space-y-3'>
           <Label htmlFor='description' >Product Description</Label>
           <Textarea required id='description' name='description'  />
         </div>
         <p className='text-red-700'>{state?.error?.description}</p>
         <div className='space-y-3'>
           <Label htmlFor='price' >Product Price</Label>
           <Input type='number'  name='price' required id='price' 
            value={priceInIDR ?? ""}
            onChange={e => setPriceInIDR(e.target.value ? Number(e.target.value) : null)}
            />
           <div className="text-muted-foreground"> {priceInIDR !== null ? formatToRupiah(priceInIDR) : ""}</div>
           <p className='text-red-700'>{state?.error?.price}</p>
         </div>

         

         <div className='space-y-3'>
           <Label htmlFor='image'>Product Image</Label>
           <Input id="image" type='file' name='image' onChange={handleImageChange} required/>
         </div>
         <p className='text-red-700'>{state?.error?.image}</p>


         {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <Image
                src={imagePreview}
                alt="Product Preview"
                width={200}
                height={200}
                className="mt-2 rounded-lg border"
              />
            </div>
          )}

          <ButtonForm/>

        </div>
        
       
      </form>
    </div>
  )
}

export default FormAddProduct
