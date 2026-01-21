import { Agent, AgentRole } from '../types';

interface AIResponse {
  action: 'MOVE' | 'BUILD' | 'DELETE' | 'ANALYZE' | 'IDLE';
  target: [number, number, number];
  reason: string;
}

export const queryOllama = async (
  agent: Agent, 
  context: string, 
  url: string, 
  model: string
): Promise<AIResponse> => {
  try {
    const prompt = `
      Role: ${agent.role} (Level ${agent.permissionLevel}).
      Current Pos: [${agent.position.x.toFixed(1)}, ${agent.position.y.toFixed(1)}, ${agent.position.z.toFixed(1)}].
      Context: ${context}.
      Task: Maintain system stability. Architects build, Supervisors monitor, Workers repair.
      Return ONLY valid JSON.
      Response Format: { "action": "string", "target": [x, y, z], "reason": "short string" }
    `;

    const response = await fetch(`${url}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
        format: "json"
      }),
    });

    if (!response.ok) throw new Error('Ollama connection failed');

    const data = await response.json();
    const result = JSON.parse(data.response);
    return result as AIResponse;

  } catch (error) {
    // Fallback simulation logic if AI is offline or hallucinates
    return simulateDecision(agent);
  }
};

const simulateDecision = (agent: Agent): AIResponse => {
  const r = Math.random();
  const range = 10;
  
  // Random movement target
  const tx = (Math.random() - 0.5) * range * 2;
  const tz = (Math.random() - 0.5) * range * 2;
  const ty = Math.max(0, (Math.random()) * 5);

  if (agent.role === AgentRole.WORKER) {
    if (r > 0.7) return { action: 'BUILD', target: [agent.position.x + 1, 0, agent.position.z + 1], reason: 'Expanding grid' };
    return { action: 'MOVE', target: [tx, ty, tz], reason: 'Patrolling sector' };
  }
  
  if (agent.role === AgentRole.SUPERVISOR) {
    if (r > 0.8) return { action: 'ANALYZE', target: [0,0,0], reason: 'Scanning for anomalies' };
    return { action: 'MOVE', target: [tx, 5, tz], reason: 'Overseeing operations' };
  }

  // Architect
  if (r > 0.9) return { action: 'BUILD', target: [0, 10, 0], reason: 'Constructing monolith' };
  return { action: 'MOVE', target: [0, 8, 0], reason: 'Observing construct' };
};