import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import {
  ChevronLeft,
  MoreVertical,
  Send,
  Star,
  StarOff,
  PlusCircle,
  Settings,
  Trash2,
  Copy,
  Share2,
  MessageSquare,
  Sparkles,
  Loader2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { Agent, Chat, Message } from '@/lib/types';

interface ChatInterfaceProps {
  chat: Chat;
  agent: Agent;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
  onStarChat: () => Promise<void>;
  onDeleteChat: () => Promise<void>;
  onRenameChat: (name: string) => Promise<void>;
}

export function ChatInterface({
  chat,
  agent,
  messages,
  onSendMessage,
  onStarChat,
  onDeleteChat,
  onRenameChat
}: ChatInterfaceProps) {
  const router = useRouter();
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newChatName, setNewChatName] = useState(chat.name);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!messageInput.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setMessageInput('');
      await onSendMessage(messageInput);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRenameChat = async () => {
    if (newChatName.trim() && newChatName !== chat.name) {
      await onRenameChat(newChatName);
    }
    setIsRenameDialogOpen(false);
  };

  const handleDeleteChat = async () => {
    await onDeleteChat();
    setIsDeleteDialogOpen(false);
    router.push('/dashboard');
  };

  const getMessageAvatar = (role: string) => {
    if (role === 'user') {
      return (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
        </Avatar>
      );
    } else if (role === 'assistant') {
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={`/agents/${agent.id}.png`} alt={agent.name} />
          <AvatarFallback className="bg-linear-to-br from-violet-500 to-indigo-700 text-white">
            {agent.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between bg-card/50 backdrop-blur-xs sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Avatar className="h-9 w-9">
            <AvatarImage src={`/agents/${agent.id}.png`} alt={agent.name} />
            <AvatarFallback className="bg-linear-to-br from-violet-500 to-indigo-700 text-white">
              {agent.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h2 className="text-base font-medium leading-none flex items-center gap-1">
              {chat.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onStarChat}
              >
                {chat.starred ?
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> :
                  <StarOff className="h-4 w-4 text-muted-foreground" />
                }
              </Button>
            </h2>
            <p className="text-sm text-muted-foreground">{agent.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Rename Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onStarChat}>
                {chat.starred ?
                  <><StarOff className="mr-2 h-4 w-4" /><span>Unstar Chat</span></> :
                  <><Star className="mr-2 h-4 w-4" /><span>Star Chat</span></>
                }
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share Chat</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Chat Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Chat</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" id="message-container">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 opacity-80">
            <Sparkles className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-medium">Begin Your Conversation</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Start chatting with {agent.name} to explore new ideas and get assistance with your projects.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-3xl mx-auto",
                message.role === 'system' && "hidden"
              )}
            >
              {getMessageAvatar(message.role)}

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {message.role === 'user' ? 'You' : agent.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(message.createdAt), 'h:mm a')}
                  </span>
                </div>

                <div className={cn(
                  "prose prose-sm max-w-none",
                  "prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-1",
                  "prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5",
                  "prose-code:px-1 prose-code:py-0.5 prose-code:bg-muted prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none"
                )}>
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>

                {message.role === 'assistant' && (
                  <div className="flex gap-2 pt-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Improve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />

        {/* Assistant typing indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mx-auto">
            {getMessageAvatar('assistant')}
            <div className="flex items-center py-2">
              <motion.div
                className="flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2 h-2 rounded-full bg-primary/60"
                    animate={{
                      y: ["0%", "-50%", "0%"]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: dot * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <footer className="border-t p-4 bg-background/80 backdrop-blur-xs">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 max-w-3xl mx-auto"
        >
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${agent.name}...`}
            className="flex-1 py-6 bg-background border-input"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!messageInput.trim() || isLoading}
            className={cn(
              "h-10 w-10 rounded-full transition-colors",
              messageInput.trim() ? "bg-primary" : "bg-muted text-muted-foreground"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </footer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteChat}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
            <DialogDescription>
              Enter a new name for this conversation
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            className="my-4"
            placeholder="Chat name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameChat}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
