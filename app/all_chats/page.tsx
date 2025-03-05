'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Search, MessageSquare, Star, Clock, Plus } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  starred: boolean;
}

export default function AllChatsPage() {
  // Use state with empty initial array to prevent hydration mismatch
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Initialize data on client side only to prevent hydration mismatch
  useEffect(() => {
    setChats([
      {
        id: '1',
        name: 'Project Ideas',
        lastMessage: 'Can you suggest some project ideas for a machine learning portfolio?',
        timestamp: new Date(2023, 5, 15),
        starred: true,
      },
      {
        id: '2',
        name: 'Code Review',
        lastMessage: 'Here is my React component. Can you review it?',
        timestamp: new Date(2023, 5, 16),
        starred: false,
      },
      {
        id: '3',
        name: 'Learning Path',
        lastMessage: 'What is the best way to learn TypeScript?',
        timestamp: new Date(2023, 5, 17),
        starred: true,
      },
    ]);
    setIsClient(true);
  }, []);

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-dark-600 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-300">All Chats</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Chats</h1>
          <Link href="/new_chat">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Chat
            </Button>
          </Link>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!isClient ? (
            // Loading state when client-side rendering hasn't happened yet
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="h-32 hover:bg-secondary/50 transition-colors cursor-pointer animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 w-24 bg-muted rounded mb-2"></div>
                  <div className="h-3 w-20 bg-muted rounded opacity-70"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 w-full bg-muted rounded mt-2"></div>
                  <div className="h-3 w-4/5 bg-muted rounded mt-2"></div>
                </CardContent>
              </Card>
            ))
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <Link href={`/chats/${chat.id}`} key={chat.id} className="block">
                <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {chat.name}
                      </CardTitle>
                      {chat.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {chat.timestamp.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{chat.lastMessage}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-10 text-center">
              <Bot className="h-16 w-16 mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-medium mb-2">No chats found</h3>
              <p className="text-muted-foreground mb-4">Start a new conversation or adjust your search.</p>
              <Link href="/new_chat">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Create your first chat
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}