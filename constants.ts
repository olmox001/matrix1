export const MATRIX_GREEN = '#00FF41';
export const MATRIX_DARK = '#0D0208';
export const MATRIX_GLOW = '#008F11';
export const AGENT_RED = '#FF0000'; // For rogue/corrupt agents
export const DATA_STREAM_COLOR = '#003B00';

export const DEFAULT_CONFIG = {
  ollamaUrl: 'http://localhost:11434',
  modelName: 'llama3.2:1b', // Recommended lightweight model
  useAI: true,
  maxModules: 150, // Optimize for 32GB RAM / Browser limits
  gravity: 9.81
};

export const SYSTEM_PROMPT = `
You are an autonomous agent inside a Matrix-like simulation. 
You possess specific permissions based on your role.
You must maintain the stability of the system.
Output your decision in JSON format: { "action": "MOVE" | "BUILD" | "DELETE", "target": [x,y,z], "reason": "string" }
`;