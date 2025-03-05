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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {ModeToggle} from "@/components/theme_button";
import {getProjects} from "@/lib/api";
import {useEffect, useState} from "react";
import {Message, Project} from "@/lib/types";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Chats",
      url: "/all_chats",
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
      url: "/all_agents",
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
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    async function GetProjects()
    {
      const projects = await getProjects();
      setProjects(projects.data)
    }
    GetProjects();
  }, []);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavProjects projects={projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <ModeToggle />
      <SidebarRail />
    </Sidebar>
  )
}
