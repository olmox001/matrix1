import React, { useState } from 'react';
import { useMatrixStore } from '../store';
import { AgentRole } from '../types';
import { Terminal, Activity, Server, ShieldAlert } from 'lucide-react';

export const ConsoleOverlay: React.FC = () => {
  const logs = useMatrixStore(s => s.logs);
  const agents = useMatrixStore(s => s.agents);
  const modules = useMatrixStore(s => s.modules);
  const config = useMatrixStore(s => s.config);
  const updateConfig = useMatrixStore(s => s.updateConfig);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-20">
      
      {/* Header */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="bg-black/90 border border-green-700 p-4 rounded-sm shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h1 className="text-2xl font-bold text-green-500 tracking-widest uppercase glitch-text mb-2">
            Construct Engine v1.0
          </h1>
          <div className="flex gap-4 text-xs text-green-400 font-mono">
             <div className="flex items-center gap-1">
                <Server size={14} />
                <span>MEM: {agents.length * 128}MB</span>
             </div>
             <div className="flex items-center gap-1">
                <Activity size={14} />
                <span>ENTITIES: {modules.length + agents.length}</span>
             </div>
             <div className="flex items-center gap-1">
                <ShieldAlert size={14} />
                <span>INTEGRITY: 98.4%</span>
             </div>
          </div>
        </div>

        <button 
            onClick={() => setShowConfig(!showConfig)}
            className="bg-green-900/30 hover:bg-green-900/50 text-green-400 border border-green-600 px-4 py-2 font-mono text-sm transition-all"
        >
            [SYSTEM_CONFIG]
        </button>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <div className="absolute top-20 right-4 w-80 bg-black/95 border border-green-600 p-4 pointer-events-auto font-mono text-sm text-green-400">
             <h3 className="border-b border-green-800 pb-2 mb-4">KERNEL PARAMETERS</h3>
             
             <div className="mb-4">
                <label className="block mb-1">Ollama URL</label>
                <input 
                    type="text" 
                    value={config.ollamaUrl}
                    onChange={(e) => updateConfig({ ollamaUrl: e.target.value })}
                    className="w-full bg-green-900/10 border border-green-800 text-green-300 p-1 focus:outline-none focus:border-green-500"
                />
             </div>
             
             <div className="mb-4">
                <label className="block mb-1">Model Name</label>
                <input 
                    type="text" 
                    value={config.modelName}
                    onChange={(e) => updateConfig({ modelName: e.target.value })}
                    className="w-full bg-green-900/10 border border-green-800 text-green-300 p-1"
                />
             </div>

             <div className="mb-4 flex items-center gap-2">
                <input 
                    type="checkbox"
                    checked={config.useAI}
                    onChange={(e) => updateConfig({ useAI: e.target.checked })}
                />
                <label>Enable Neural Link (AI)</label>
             </div>

             <div className="text-xs text-green-600 italic">
                *Requires local Ollama instance.<br/>
                *Defaults to simulated logic if unreachable.
             </div>
        </div>
      )}

      {/* Footer / Logs */}
      <div className="flex items-end gap-4 pointer-events-auto">
        {/* Log Terminal */}
        <div className="w-1/3 h-64 bg-black/80 border-t-2 border-r-2 border-green-800 rounded-tr-xl overflow-hidden backdrop-blur-sm">
           <div className="bg-green-900/20 p-2 flex items-center gap-2 border-b border-green-800">
             <Terminal size={14} className="text-green-500" />
             <span className="text-xs font-mono text-green-400">SYSTEM_LOGS</span>
           </div>
           <div className="p-2 h-full overflow-y-auto pb-10 font-mono text-xs space-y-1 scrollbar-thin">
              {logs.map((log, i) => (
                <div key={i} className="text-green-500/80 hover:text-green-400">
                  <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()} &gt;</span>
                  {log}
                </div>
              ))}
           </div>
        </div>

        {/* Agent Status List */}
        <div className="bg-black/80 border border-green-800 p-4 h-64 overflow-y-auto w-64">
           <h3 className="text-xs text-green-400 mb-2 font-bold border-b border-green-900 pb-1">ACTIVE AGENTS</h3>
           {agents.map(agent => (
             <div key={agent.id} className="mb-2 text-[10px] font-mono border-l-2 border-green-700 pl-2">
                <div className="flex justify-between">
                    <span className={agent.role === AgentRole.ARCHITECT ? 'text-white' : 'text-green-400'}>{agent.role}</span>
                    <span className="text-green-600">Lvl {agent.permissionLevel}</span>
                </div>
                <div className="text-green-500/60 truncate">{agent.currentTask}</div>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
};