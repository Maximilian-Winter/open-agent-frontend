'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash } from 'lucide-react';

export default function DeleteChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');
  const chatName = searchParams.get('name') || 'this chat';
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call to delete chat
    setTimeout(() => {
      // After successful deletion, navigate back to the all chats page
      router.push('/all_chats');
    }, 1000);
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
                <BreadcrumbLink href="/all_chats" className="text-slate-300 hover:text-slate-100">
                  Chats
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden text-slate-500 md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-300">Delete Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <CardTitle>Delete Chat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Are you sure you want to delete <span className="font-medium">{chatName}</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. All messages in this chat will be permanently deleted.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Link href={chatId ? `/chats/${chatId}` : '/all_chats'}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="gap-2"
            >
              {isDeleting ? 'Deleting...' : (
                <>
                  <Trash className="h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}