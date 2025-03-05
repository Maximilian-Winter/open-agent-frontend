// components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/types';
import { sendMessage, getAssistantResponse } from '@/lib/api';

interface ChatInterfaceProps {
  chatId: string;
  initialMessages?: Message[];
}

export default function ChatInterface({ chatId, initialMessages = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setIsLoading(true);

    try {
      // Send the user message to the API
      const { data: userMessage } = await sendMessage(chatId, input.trim());
      
      // Add user message to the chat
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      
      // Get the assistant's response
      const { data: assistantMessage } = await getAssistantResponse(chatId, userMessage.id);
      
      // Add assistant message to the chat
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] border border-border overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <Bot size={48} className="mb-4 opacity-50" />
            <p className="text-center max-w-md">What would you like to explore today?</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-4 mb-2",
                message.role === 'assistant'
                  ? "bg-secondary/50"
                  : message.role === 'system'
                  ? "bg-muted/50 border border-border"
                  : "bg-primary/10"
              )}
            >
              <div className="flex items-center justify-center rounded-full bg-background h-8 w-8 border">
                {message.role === 'assistant' ? (
                  <Bot className="h-4 w-4" />
                ) : message.role === 'system' ? (
                  <FileText className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="prose dark:prose-invert max-w-none break-words">
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your message..."
            className="min-h-10 flex-1 resize-none overflow-hidden"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}