"use client"

import React from 'react'
import BreadcumbComponents
from '../../_components/BreadcumbComponents'
import { usePathname } from "next/navigation";


const page = () => {
    const pathname = usePathname()
    
  return (

    <>
    <BreadcumbComponents page={pathname} />
    <div className="flex flex-1 flex-col gap-4 pt-0 p-5">
  <div className=" flex-1 gap-4 rounded-2xl bg-muted/100 p-6">
    <div className="bg-card rounded-xl p-5 ">
        
    </div>
    
        
  </div>
  
</div>
    </>
  )
}

export default page
