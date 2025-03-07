// Enums
export enum ChatMessageRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
  Tool = 'tool',
  Custom = 'custom',
}

export enum ContentType {
  Text = 'text',
  Binary = 'binary',
  ToolCall = 'tool_call',
  ToolCallResult = 'tool_call_result',
}

export enum BinaryStorageType {
  Url = 'url',
  Base64 = 'base64',
}

// Content Base Class
export abstract class ContentBase {
  type: ContentType;
  additionalFields: Record<string, any>;

  constructor(type: ContentType, additionalFields: Record<string, any> = {}) {
    this.type = type;
    this.additionalFields = additionalFields;
  }

  abstract getAsText(): string;
}

// TextContent
export class TextContent extends ContentBase {
  content: string;

  constructor(content: string, additionalFields: Record<string, any> = {}) {
    super(ContentType.Text, additionalFields);
    this.content = content;
  }

  getAsText(): string {
    return this.content;
  }
}

// BinaryContent
export class BinaryContent extends ContentBase {
  storageType: BinaryStorageType;
  mimeType: string;
  content: string;

  constructor(storageType: BinaryStorageType, mimeType: string, content: string, additionalFields: Record<string, any> = {}) {
    super(ContentType.Binary, additionalFields);
    this.storageType = storageType;
    this.mimeType = mimeType;
    this.content = content;
  }

  getAsText(): string {
    return `Binary Content\nMime type: ${this.mimeType}`;
  }
}

// ToolCallContent
export class ToolCallContent extends ContentBase {
  toolCallId: string;
  toolCallName: string;
  toolCallArguments: Record<string, any> | null;

  constructor(
    toolCallId: string,
    toolCallName: string,
    toolCallArguments: Record<string, any> | null,
    additionalFields: Record<string, any> = {}
  ) {
    super(ContentType.ToolCall, additionalFields);
    this.toolCallId = toolCallId;
    this.toolCallName = toolCallName;
    this.toolCallArguments = toolCallArguments;
  }

  getAsText(): string {
    return `Tool Use: ${this.toolCallName}\nTool Arguments: ${JSON.stringify(this.toolCallArguments)}`;
  }
}

// ToolCallResultContent
export class ToolCallResultContent extends ContentBase {
  toolCallResultId: string;
  toolCallId: string;
  toolCallName: string;
  toolCallResult: string;

  constructor(
    toolCallResultId: string,
    toolCallId: string,
    toolCallName: string,
    toolCallResult: string,
    additionalFields: Record<string, any> = {}
  ) {
    super(ContentType.ToolCallResult, additionalFields);
    this.toolCallResultId = toolCallResultId;
    this.toolCallId = toolCallId;
    this.toolCallName = toolCallName;
    this.toolCallResult = toolCallResult;
  }

  getAsText(): string {
    return `Tool Use: ${this.toolCallName}\nTool Result: ${this.toolCallResult}`;
  }
}

// ChatMessage
export class ChatMessage {
  id: string;
  role: ChatMessageRole;
  content: ContentBase[];
  createdAt: Date;
  updatedAt: Date;
  additionalFields: Record<string, any>;
  additionalInformation: Record<string, any>;

  constructor(
    id: string,
    role: ChatMessageRole,
    content: ContentBase[],
    createdAt?: Date,
    updatedAt?: Date,
    additionalFields: Record<string, any> = {},
    additionalInformation: Record<string, any> = {}
  ) {
    const now = new Date();
    this.id = id;
    this.role = role;
    this.content = content;
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
    this.additionalFields = additionalFields;
    this.additionalInformation = additionalInformation;
  }

  static createSystemMessage(message: string): ChatMessage {
    return new ChatMessage(
      crypto.randomUUID(),
      ChatMessageRole.System,
      [new TextContent(message)]
    );
  }

  static createUserMessage(message: string): ChatMessage {
    return new ChatMessage(
      crypto.randomUUID(),
      ChatMessageRole.User,
      [new TextContent(message)]
    );
  }

  static createAssistantMessage(message: string): ChatMessage {
    return new ChatMessage(
      crypto.randomUUID(),
      ChatMessageRole.Assistant,
      [new TextContent(message)]
    );
  }

  containsToolCall(): boolean {
    return this.content.some((c) => c.type === ContentType.ToolCall);
  }

  getToolCalls(): ToolCallContent[] {
    return this.content.filter((c): c is ToolCallContent => c instanceof ToolCallContent);
  }

  getAsText(): string {
    return this.content.map((c) => c.getAsText()).join('\n');
  }

  setCustomRole(customRoleName: string): void {
    this.role = ChatMessageRole.Custom;
    this.additionalInformation['custom_role_name'] = customRoleName;
  }

  addText(content: string): void {
    this.content.push(new TextContent(content));
  }

  addImageUrl(url: string, imageFormat: string): void {
    this.content.push(new BinaryContent(BinaryStorageType.Url, `image/${imageFormat}`, url));
  }

  addBase64Data(base64String: string, mimeType: string): void {
    this.content.push(new BinaryContent(BinaryStorageType.Base64, mimeType, base64String));
  }
}


// StreamingChatMessage
export class StreamingChatMessage {
  chunk: string;
  isToolCall: boolean;
  toolCall?: Record<string, any>;
  finished: boolean;
  finishedChatMessage?: ChatMessage;

  constructor(
    chunk: string,
    isToolCall: boolean = false,
    toolCall?: Record<string, any>,
    finished: boolean = false,
    finishedChatMessage?: ChatMessage
  ) {
    this.chunk = chunk;
    this.isToolCall = isToolCall;
    this.toolCall = toolCall;
    this.finished = finished;
    this.finishedChatMessage = finishedChatMessage;
  }

  getChunk(): string {
    return this.chunk;
  }

  getIsToolCall(): boolean {
    return this.isToolCall;
  }

  getToolCall(): Record<string, any> | undefined {
    return this.toolCall;
  }

  getFinished(): boolean {
    return this.finished;
  }

  getFinishedChatMessage(): ChatMessage | undefined {
    return this.finishedChatMessage;
  }
}


// ChatResponse
export class ChatResponse {
  messages: ChatMessage[];
  response: string;

  constructor(messages: ChatMessage[] = [], response: string = '') {
    this.messages = messages;
    this.response = response;
  }
}

// ChatResponseChunk
export class ChatResponseChunk {
  chunk: string;
  hasToolCall: boolean;
  toolCall?: Record<string, any>;
  hasToolCallResult: boolean;
  toolCallResult?: Record<string, any>;
  finished: boolean;
  finishedResponse: ChatResponse;

  constructor(
    chunk: string = '',
    hasToolCall: boolean = false,
    toolCall?: Record<string, any>,
    hasToolCallResult: boolean = false,
    toolCallResult?: Record<string, any>,
    finished: boolean = false,
    finishedResponse: ChatResponse = new ChatResponse()
  ) {
    this.chunk = chunk;
    this.hasToolCall = hasToolCall;
    this.toolCall = toolCall;
    this.hasToolCallResult = hasToolCallResult;
    this.toolCallResult = toolCallResult;
    this.finished = finished;
    this.finishedResponse = finishedResponse;
  }

  getToolName(): string | undefined {
    return this.hasToolCall && this.toolCall ? this.toolCall['tool_call_name'] : undefined;
  }

  getToolArguments(): Record<string, any> | undefined {
    return this.hasToolCall && this.toolCall ? this.toolCall['tool_call_arguments'] : undefined;
  }

  getToolResults(): string | undefined {
    return this.hasToolCallResult && this.toolCallResult ? this.toolCallResult['tool_call_result'] : undefined;
  }
}