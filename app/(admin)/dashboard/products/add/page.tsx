"use client"

import React from 'react'
import BreadcumbComponents
from '../../_components/BreadcumbComponents'
import { usePathname } from "next/navigation";
import { Form, FormField } from '@/components/ui/form';
import FormAddProduct from '../../_components/FormAddProduct';


const page = () => {
    const pathname = usePathname()
    
  return (

    <>
      <BreadcumbComponents page={pathname} />
        <div className="flex flex-1 flex-col gap-4 pt-0 p-5">
          <div className="flex flex-1 justify-center rounded-2xl bg-muted/100 p-6">
          <div>
          <FormAddProduct/>
          </div>
           
          </div>
        </div>
    </>
  )
}

export default page
