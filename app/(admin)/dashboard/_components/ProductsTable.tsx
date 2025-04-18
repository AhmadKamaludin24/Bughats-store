
"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import ButtonModals from './buttonModals'
import { usePathname, useRouter } from 'next/navigation'
import { db } from '@/lib/prisma'
import { getProducts } from '../products/_actions/action'
import { formatToRupiah } from '@/lib/formater'
import { Check, X } from 'lucide-react'
import { ChevronsUpDown } from 'lucide-react'
import Icon from '@/components/icons/icon'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {DeleteProductDropDown, ToggleActivateProduct} from './ToggleaActive'


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isavailable: boolean;
  imageUrl: string;
  updateAt: Date;
  createdAt: Date;
 
}



const ProductsTable = ({products}: {products: Product[]}) => {
  const router = useRouter()
  const pathname = usePathname()



return (
  <div>
      <div className='mb-3 flex justify-between'>
          <h1>Data Product</h1>
          <Button asChild ><a href="/dashboard/products/add">Add product</a></Button>
      </div>
     
      <div className='w-full border rounded '>
        {products.length > 0 ? 
    <Table className='p-7'>
      
      <TableHeader>   
          <TableRow>
           
              <TableHead>name</TableHead>
              
              <TableHead>description</TableHead>
              <TableHead>price</TableHead>
              <TableHead>image</TableHead>
              <TableHead>Is Available</TableHead>
          </TableRow>
      </TableHeader>

     
      <TableBody>
     
         {products.map((product)=>(
          <TableRow key={product.id} className='p-9'>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{formatToRupiah(product.price)}</TableCell>
            <TableCell><img src={product.imageUrl} alt={product.imageUrl} width={"200px"} /></TableCell>
            <TableCell className=''>{product.isavailable ? <Icon props={true}/> : <Icon props={false}/>}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><ChevronsUpDown/></DropdownMenuTrigger>
                <DropdownMenuContent className='p-3 bg-card border-2  rounded-2xl mt-7' sideOffset={5}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <ToggleActivateProduct id={product.id} isavailable={product.isavailable} />
                  <DropdownMenuSeparator/>
                  <DeleteProductDropDown id={product.id}  />
                </DropdownMenuContent>
              </DropdownMenu>
              
            </TableCell>
            
          </TableRow>
          ))}
         
         
         
          
        
      
      </TableBody>
       
    </Table>
    : <div className='py-24 text-2xl text-center font-bold'>Product not found</div>}
  </div>
  </div>
 
)
}

export default ProductsTable
