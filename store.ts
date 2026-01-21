import { create } from 'zustand';
import { Agent, AgentRole, ModuleState, SimulationConfig, WorldModule, Vector3 } from './types';
import { DEFAULT_CONFIG } from './constants';

interface MatrixState {
  config: SimulationConfig;
  modules: WorldModule[];
  agents: Agent[];
  logs: string[];
  
  // Actions
  addLog: (msg: string) => void;
  updateConfig: (partial: Partial<SimulationConfig>) => void;
  
  // World Manipulation
  addModule: (module: WorldModule) => void;
  removeModule: (id: string) => void;
  updateModule: (id: string, updates: Partial<WorldModule>) => void;
  
  // Agent Manipulation
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
}

export const useMatrixStore = create<MatrixState>((set, get) => ({
  config: DEFAULT_CONFIG,
  modules: [],
  agents: [],
  logs: ['System initialized...', 'Connecting to Construct...', 'Loading physics engine...'],

  addLog: (msg) => set((state) => ({ logs: [msg, ...state.logs].slice(0, 50) })),
  
  updateConfig: (partial) => set((state) => ({ config: { ...state.config, ...partial } })),

  addModule: (module) => set((state) => {
    if (state.modules.length >= state.config.maxModules) {
        // Garbage collection: Remove oldest/farthest module
        const [first, ...rest] = state.modules;
        return { modules: [...rest, module] };
    }
    return { modules: [...state.modules, module] };
  }),

  removeModule: (id) => set((state) => ({
    modules: state.modules.filter(m => m.id !== id)
  })),

  updateModule: (id, updates) => set((state) => ({
    modules: state.modules.map(m => m.id === id ? { ...m, ...updates } : m)
  })),

  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
  })),

  removeAgent: (id) => set((state) => ({
    agents: state.agents.filter(a => a.id !== id)
  }))
}));