import { 
  ApiResponse, 
  Chat, 
  Message, 
  PaginatedResponse, 
  Project, 
  Agent 
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function for API requests
async function fetchAPI<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

// Projects API
export async function getProjects(): Promise<ApiResponse<Project[]>> {
  // This would be a real API call in production
  // Mock data for development
  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Personal Assistant',
      description: 'A personal assistant project for everyday tasks',
      userId: 'user1',
      user: {
        id: 'user1',
        email: 'user@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Code Helper',
      description: 'AI assistant for coding tasks',
      userId: 'user1',
      user: {
        id: 'user1',
        email: 'user@example.com',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return { data: mockProjects };
  // In production:
  // return fetchAPI<ApiResponse<Project[]>>('/projects');
}

export async function getProject(id: string): Promise<ApiResponse<Project>> {
  // Mock data
  const mockProject: Project = {
    id,
    name: id === '1' ? 'Personal Assistant' : 'Code Helper',
    description: id === '1' 
      ? 'A personal assistant project for everyday tasks' 
      : 'AI assistant for coding tasks',
    userId: 'user1',
    user: {
      id: 'user1',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return { data: mockProject };
  // In production:
  // return fetchAPI<ApiResponse<Project>>(`/projects/${id}`);
}

// Agents API
export async function getAgents(): Promise<ApiResponse<Agent[]>> {
  // Mock data
  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'General Assistant',
      description: 'A general-purpose AI assistant',
      instructions: 'You are a helpful AI assistant.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Code Assistant',
      description: 'Specialized in helping with code',
      instructions: 'You are a coding assistant. Help users with programming questions and tasks.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return { data: mockAgents };
  // In production:
  // return fetchAPI<ApiResponse<Agent[]>>('/agents');
}

export async function getAgent(id: string): Promise<ApiResponse<Agent>> {
  // Mock data
  const mockAgent: Agent = {
    id,
    name: id === '1' ? 'General Assistant' : 'Code Assistant',
    description: id === '1' 
      ? 'A general-purpose AI assistant' 
      : 'Specialized in helping with code',
    instructions: id === '1' 
      ? 'You are a helpful AI assistant.' 
      : 'You are a coding assistant. Help users with programming questions and tasks.',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return { data: mockAgent };
  // In production:
  // return fetchAPI<ApiResponse<Agent>>(`/agents/${id}`);
}

// Chats API
export async function getChats(projectId?: string): Promise<ApiResponse<Chat[]>> {
  // Mock data
  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Project Ideas',
      projectId: '1',
      agentId: '1',
      starred: true,
      lastMessageAt: new Date(2023, 5, 15),
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 5, 15)
    },
    {
      id: '2',
      name: 'Code Review',
      projectId: '2',
      agentId: '2',
      starred: false,
      lastMessageAt: new Date(2023, 5, 16),
      createdAt: new Date(2023, 5, 16),
      updatedAt: new Date(2023, 5, 16)
    },
    {
      id: '3',
      name: 'Learning Path',
      projectId: '1',
      agentId: '1',
      starred: true,
      lastMessageAt: new Date(2023, 5, 17),
      createdAt: new Date(2023, 5, 17),
      updatedAt: new Date(2023, 5, 17)
    }
  ];

  // Filter by project if projectId is provided
  const filteredChats = projectId 
    ? mockChats.filter(chat => chat.projectId === projectId)
    : mockChats;

  return { data: filteredChats };
  // In production:
  // const endpoint = projectId ? `/projects/${projectId}/chats` : '/chats';
  // return fetchAPI<ApiResponse<Chat[]>>(endpoint);
}

export async function getChat(id: string): Promise<ApiResponse<Chat>> {
  // Mock data
  const mockChat: Chat = {
    id,
    name: id === '1' ? 'Project Ideas' : id === '2' ? 'Code Review' : 'Learning Path',
    projectId: id === '2' ? '2' : '1',
    agentId: id === '2' ? '2' : '1',
    starred: id === '1' || id === '3',
    lastMessageAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return { data: mockChat };
  // In production:
  // return fetchAPI<ApiResponse<Chat>>(`/chats/${id}`);
}

export async function createChat(data: { 
  name: string; 
  projectId: string; 
  agentId: string; 
}): Promise<ApiResponse<Chat>> {
  // Mock data
  const newChat: Chat = {
    id: Date.now().toString(),
    name: data.name || 'New Chat',
    projectId: data.projectId,
    agentId: data.agentId,
    starred: false,
    lastMessageAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return { data: newChat };
  // In production:
  // return fetchAPI<ApiResponse<Chat>>('/chats', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
}

// Messages API
export async function getChatMessages(chatId: string): Promise<ApiResponse<Message[]>> {
  // Mock data based on chatId
  let mockMessages: Message[] = [];
  
  if (chatId === '1') {
    mockMessages = [
      {
        id: '1-1',
        chatId: '1',
        role: 'user',
        content: 'Can you suggest some project ideas for a machine learning portfolio?',
        createdAt: new Date(2023, 5, 15)
      },
      {
        id: '1-2',
        chatId: '1',
        role: 'assistant',
        content: 'Here are some machine learning project ideas for your portfolio:\n\n1. Image Classification System\n2. Sentiment Analysis Tool\n3. Recommendation Engine\n4. Natural Language Processing Chatbot\n5. Time Series Forecasting App',
        createdAt: new Date(2023, 5, 15, 0, 1)
      }
    ];
  } else if (chatId === '2') {
    mockMessages = [
      {
        id: '2-1',
        chatId: '2',
        role: 'system',
        content: 'You are a coding assistant. Help users with programming questions and tasks.',
        createdAt: new Date(2023, 5, 16)
      },
      {
        id: '2-2',
        chatId: '2',
        role: 'user',
        content: 'Here is my React component. Can you review it?',
        createdAt: new Date(2023, 5, 16, 0, 1)
      },
      {
        id: '2-3',
        chatId: '2',
        role: 'assistant',
        content: 'Your React component looks good! Here are a few suggestions to improve it...',
        createdAt: new Date(2023, 5, 16, 0, 2)
      }
    ];
  } else if (chatId === '3') {
    mockMessages = [
      {
        id: '3-1',
        chatId: '3',
        role: 'user',
        content: 'What is the best way to learn TypeScript?',
        createdAt: new Date(2023, 5, 17)
      },
      {
        id: '3-2',
        chatId: '3',
        role: 'assistant',
        content: 'The best way to learn TypeScript is to start with JavaScript basics, then gradually incorporate TypeScript features...',
        createdAt: new Date(2023, 5, 17, 0, 1)
      }
    ];
  } else {
    // For new chats, return an empty array or system message
    mockMessages = [
      {
        id: `${chatId}-1`,
        chatId,
        role: 'system',
        content: 'You are a helpful AI assistant.',
        createdAt: new Date()
      }
    ];
  }

  return { data: mockMessages };
  // In production:
  // return fetchAPI<ApiResponse<Message[]>>(`/chats/${chatId}/messages`);
}

export async function sendMessage(chatId: string, content: string): Promise<ApiResponse<Message>> {
  // Mock a user message
  const userMessage: Message = {
    id: `${chatId}-${Date.now()}-user`,
    chatId,
    role: 'user',
    content,
    createdAt: new Date()
  };

  // In production, you would send the user message to the API and get a response
  // For mock, we'll simulate an assistant response after a delay
  const assistantMessage: Message = {
    id: `${chatId}-${Date.now()}-assistant`,
    chatId,
    role: 'assistant',
    content: `This is a simulated response to: "${content}"`,
    createdAt: new Date(Date.now() + 1000)
  };

  // In a real implementation, you'd return the assistant's response from the API
  return { data: userMessage };
  // In production:
  // return fetchAPI<ApiResponse<Message>>(`/chats/${chatId}/messages`, {
  //   method: 'POST',
  //   body: JSON.stringify({ content }),
  // });
}

// Simulate getting an assistant response
export async function getAssistantResponse(chatId: string, userMessageId: string): Promise<ApiResponse<Message>> {
  // This would be a streaming response or polling in a real implementation
  // For mock, we'll just return a fake response after a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const assistantMessage: Message = {
    id: `${chatId}-${Date.now()}-assistant`,
    chatId,
    role: 'assistant',
    content: `This is a simulated response to your message. In a real application, this would be generated by an AI model.`,
    createdAt: new Date()
  };

  return { data: assistantMessage };
}