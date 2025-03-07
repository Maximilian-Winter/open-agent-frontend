import { ChatMessage } from "./chat_message";

// ToolType Enum
export enum ToolType {
  Python = 'python310',
  Python313 = 'python313',
  JavaScript = 'javascript',
  C = 'c',
  Cpp = 'cpp',
  Executable = 'executable',
}

// ToolDependencyType Enum
export enum ToolDependencyType {
  PythonPackage = 'python_package',
  NodeJsPackage = 'nodejs_package',
  SharedLibrary = 'shared_library',
  StaticLibrary = 'static_library',
}

// ToolDependency
export class ToolDependency {
  dependencyType: ToolDependencyType;
  dependencyValue: string;

  constructor(dependencyType: ToolDependencyType, dependencyValue: string) {
    this.dependencyType = dependencyType;
    this.dependencyValue = dependencyValue;
  }
}

// ToolBuildConfiguration
export class ToolBuildConfiguration {
  dockerBaseImage: string;
  dependencies: ToolDependency[];
  buildCommand: string;

  constructor(dockerBaseImage: string, dependencies: ToolDependency[], buildCommand: string) {
    this.dockerBaseImage = dockerBaseImage;
    this.dependencies = dependencies;
    this.buildCommand = buildCommand;
  }
}

// ToolRuntimeConfiguration
export class ToolRuntimeConfiguration {
  dockerBaseImage: string;
  dependencies: ToolDependency[];
  runCommand: string;

  constructor(dockerBaseImage: string, dependencies: ToolDependency[], runCommand: string) {
    this.dockerBaseImage = dockerBaseImage;
    this.dependencies = dependencies;
    this.runCommand = runCommand;
  }
}

// AgentTool
export class AgentTool {
  id: string;
  name: string;
  toolType: ToolType;
  toolPath: string;
  toolRuntimeConfiguration: ToolRuntimeConfiguration;
  toolBuildConfiguration?: ToolBuildConfiguration;

  constructor(
    id: string,
    name: string,
    toolType: ToolType,
    toolPath: string,
    toolRuntimeConfiguration: ToolRuntimeConfiguration,
    toolBuildConfiguration?: ToolBuildConfiguration
  ) {
    this.id = id;
    this.name = name;
    this.toolType = toolType;
    this.toolPath = toolPath;
    this.toolRuntimeConfiguration = toolRuntimeConfiguration;
    this.toolBuildConfiguration = toolBuildConfiguration;
  }
}

// Agent
export class Agent {
  id: string;
  name: string;
  description: string;
  systemMessage: ChatMessage;
  tools: AgentTool[];

  constructor(id: string, name: string, description: string, systemMessage: ChatMessage, tools: AgentTool[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.systemMessage = systemMessage;
    this.tools = tools;
  }
}