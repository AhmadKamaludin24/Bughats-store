"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Box,
  BoxesIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  GiftIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {isLoaded, user} = useUser()





  const data = {
    user: {
      name: user?.fullName,
      email: user?.emailAddresses[0].emailAddress,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: BoxesIcon,
        isActive: true,
        items: [
          {
            title: "Users",
            url: "/dashboard/users",
          },
          {
            title: "Products",
            url: "/dashboard/products",
          },
          
        ],
      },
      
    ],
    
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
