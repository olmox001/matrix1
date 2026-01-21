export enum AgentRole {
  ARCHITECT = 'ARCHITECT',   // Level 3: Generates rules
  SUPERVISOR = 'SUPERVISOR', // Level 2: Monitors workers
  WORKER = 'WORKER'          // Level 1: Modifies geometry/physics
}

export enum ModuleState {
  STABLE = 'STABLE',
  UNSTABLE = 'UNSTABLE',
  CORRUPTED = 'CORRUPTED',
  RAW_DATA = 'RAW_DATA' // Distance optimization state
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface WorldModule {
  id: string;
  position: Vector3;
  type: 'cube' | 'pyramid' | 'data_stream';
  state: ModuleState;
  integrity: number; // 0-100
  dataPayload: string; // The "source code" of the object
  createdAt: number;
}

export interface Agent {
  id: string;
  role: AgentRole;
  position: Vector3;
  targetPosition: Vector3 | null;
  permissionLevel: number;
  status: 'idle' | 'moving' | 'analyzing' | 'building' | 'purging';
  currentTask: string;
  logs: string[];
}

export interface SimulationConfig {
  ollamaUrl: string;
  modelName: string;
  useAI: boolean;
  maxModules: number;
  gravity: number;
}