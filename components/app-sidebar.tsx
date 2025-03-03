"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
    MessageSquareQuote,
  SquareTerminal,
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
import {ModeToggle} from "@/components/theme_button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Chats",
      url: "/chats",
      icon: MessageSquareQuote,
      isActive: true,
      items: [{
          title: "All Chats",
          url: "/all_chats",
        },
        {
          title: "Starred Chats",
          url: "/starred_chats",
        },
        {
          title: "New Chat",
          url: "/new_chat",
        },
        {
          title: "Delete Chat",
          url: "/delete_chat",
        }
      ],
    },
    {
      title: "Agents",
      url: "/agents",
      icon: Bot,
      items: [
        {
          title: "All Agents",
          url: "/all_agents",
        },
        {
          title: "Create Agent",
          url: "/create_agent",
        },
        {
          title: "Delete Agent",
          url: "/delete_agent",
        },
      ],
    },
    {
      title: "Files",
      url: "/files",
      icon: BookOpen,
      items: [
        {
          title: "File Management",
          url: "/file_management",
        },
        {
          title: "File Upload",
          url: "/file_upload",
        },
        {
          title: "Templates",
          url: "/templates",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <ModeToggle />
      <SidebarRail />
    </Sidebar>
  )
}
