'use client';

import { useState, useEffect } from 'react';
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
import { Send, Bot, Loader2 } from 'lucide-react';
import { createChat, getProjects, getAgents } from '@/lib/api';
import { Project, Agent } from '@/lib/types';

export default function NewChatPage() {
  const [chatName, setChatName] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch projects and agents
  useEffect(() => {
    async function fetchData() {
      try {
        setIsInitializing(true);
        
        // Fetch projects and agents in parallel
        const [projectsResponse, agentsResponse] = await Promise.all([
          getProjects(),
          getAgents()
        ]);
        
        setProjects(projectsResponse.data);
        setAgents(agentsResponse.data);
        
        // Set defaults
        if (projectsResponse.data.length > 0) {
          setSelectedProject(projectsResponse.data[0].id);
        }
        
        if (agentsResponse.data.length > 0) {
          setSelectedAgent(agentsResponse.data[0].id);
        }
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load projects and agents');
      } finally {
        setIsInitializing(false);
      }
    }
    
    fetchData();
  }, []);

  const handleCreateChat = async () => {
    if (!selectedProject || !selectedAgent) {
      setError('Please select a project and agent');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create the new chat
      const { data: newChat } = await createChat({
        name: chatName || 'New Chat',
        projectId: selectedProject,
        agentId: selectedAgent
      });
      
      // Navigate to the new chat
      router.push(`/chats/${newChat.id}`);
      
    } catch (err) {
      console.error('Error creating chat:', err);
      setError('Failed to create chat');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-700 bg-dark-600 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
            {error && (
              <div className="mb-4 p-2 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                {error}
              </div>
            )}
            
            {isInitializing ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center justify-center rounded-full bg-primary/10 h-20 w-20">
                    <Bot className="h-10 w-10" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Chat Name (optional)</label>
                    <Input
                      placeholder="Chat name"
                      value={chatName}
                      onChange={(e) => setChatName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Project</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                    >
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Agent</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                    >
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleCreateChat} 
              className="gap-2"
              disabled={isLoading || isInitializing || !selectedProject || !selectedAgent}
            >
              {isLoading ? (
                <>Creating <Loader2 className="h-4 w-4 animate-spin" /></>
              ) : (
                <>Create Chat <Send className="h-4 w-4" /></>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}