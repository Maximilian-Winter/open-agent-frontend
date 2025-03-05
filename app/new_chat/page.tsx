'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot } from 'lucide-react';

export default function NewChatPage() {
  const [chatName, setChatName] = useState('');
  const router = useRouter();

  const handleCreateChat = () => {
    // In a real app, we would make an API call here to create a new chat
    const newChatId = Date.now().toString(); // Using timestamp as a temporary ID
    
    // Navigate to the new chat
    router.push(`/chats/${newChatId}`);
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-dark-600 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/chats" className="text-slate-300 hover:text-slate-100">
                  Chats
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-300">New Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Create a New Chat</CardTitle>
            <CardDescription>Start a new conversation with OpenAgent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center rounded-full bg-primary/10 h-20 w-20">
                  <Bot className="h-10 w-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Input
                  placeholder="Chat name (optional)"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleCreateChat} className="gap-2">
              Create Chat <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}