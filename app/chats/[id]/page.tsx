'use client';

import { useEffect, useState, use } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ChatInterface from "@/components/chat-interface";
import { getChat, getChatMessages } from "@/lib/api";
import { Chat, Message } from "@/lib/types";

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChatPage(props: ChatPageProps) {
  const params = use(props.params);
  const { id } = params;
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-dark-600 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/all_chats" className="text-slate-300 hover:text-slate-100">
                  All Chats
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-300">
                  {`Chat ${id}` }
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
     <ChatInterface chatId={id} />
    </div>
  );
}