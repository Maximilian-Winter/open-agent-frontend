// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project types
export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Agent types
export interface Agent {
  id: string;
  name: string;
  description: string;
  instructions: string; // System message
  userId?: string; // Only set when agent created by user
  createdAt: Date;
  updatedAt: Date;
}

// Chat types
export interface Chat {
  id: string;
  name: string;
  projectId: string;
  agentId: string;
  starred: boolean;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'system' | 'assistant' | 'user';
  content: string;
  createdAt: Date;
}
// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}