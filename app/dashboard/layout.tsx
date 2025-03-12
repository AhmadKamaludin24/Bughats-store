import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"




import React from 'react'

const layout = ( {children} : {children: React.ReactNode} ) => {
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
