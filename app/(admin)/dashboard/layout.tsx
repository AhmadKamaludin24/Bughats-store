"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"



import React from 'react'
import Loading from "./loading"

const layout = ( {children} : {children: React.ReactNode} ) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const {user, isLoaded} = useUser()
   useEffect(() => {
        const fetchData =  async () =>{
            const res = await fetch('/api/auth/callback')
        }
        fetchData()

        if (isLoaded) {
          const validUser = user?.emailAddresses[0].emailAddress === "lamakganteng@gmail.com"
          setIsAuthorized(validUser)
        }

      }, [isLoaded, user]);

      if (isAuthorized == false) {
        return notFound()
      }
      if (isAuthorized == null) {
        return <Loading/>
      }
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      {children}
    </SidebarInset>
  </SidebarProvider>
  )
}

export default layout
