import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Stars, PerspectiveCamera } from '@react-three/drei';
import { useMatrixStore } from '../store';
import { WorldNode } from './WorldNode';
import { AgentEntity } from './AgentEntity';
import { AgentRole } from '../types';

const CameraController = () => {
    const { camera } = useThree();
    useEffect(() => {
        camera.position.set(20, 15, 20);
        camera.lookAt(0, 0, 0);
    }, [camera]);
    return null;
}

const SimulationContent = () => {
  const modules = useMatrixStore(s => s.modules);
  const agents = useMatrixStore(s => s.agents);
  const { camera } = useThree();

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff00" />
      
      <Grid 
        infiniteGrid 
        fadeDistance={50} 
        sectionColor="#00ff00" 
        cellColor="#003300" 
        sectionThickness={1}
        cellThickness={0.5}
      />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {modules.map((mod) => (
        <WorldNode 
            key={mod.id} 
            module={mod} 
            distanceToCamera={camera.position.distanceTo({x: mod.position.x, y: mod.position.y, z: mod.position.z} as any)} 
        />
      ))}

      {agents.map((agent) => (
        <AgentEntity key={agent.id} agent={agent} />
      ))}
      
      <CameraController />
    </>
  );
};

export const Scene: React.FC = () => {
  const addAgent = useMatrixStore(s => s.addAgent);
  const modules = useMatrixStore(s => s.modules);

  useEffect(() => {
    // Initial Seed
    if (modules.length === 0) {
        // Create the "Architect"
        addAgent({
            id: 'architect-1',
            role: AgentRole.ARCHITECT,
            position: { x: 0, y: 10, z: 0 },
            targetPosition: { x: 5, y: 5, z: 5 },
            permissionLevel: 3,
            status: 'idle',
            currentTask: 'Initializing Construct',
            logs: []
        });

        // Create a Supervisor
        addAgent({
            id: 'supervisor-1',
            role: AgentRole.SUPERVISOR,
            position: { x: -5, y: 2, z: -5 },
            targetPosition: null,
            permissionLevel: 2,
            status: 'idle',
            currentTask: 'Waiting for orders',
            logs: []
        });
        
        // Create Workers
        for(let i=0; i<3; i++) {
            addAgent({
                id: `worker-${i}`,
                role: AgentRole.WORKER,
                position: { x: Math.random() * 10, y: 0, z: Math.random() * 10 },
                targetPosition: null,
                permissionLevel: 1,
                status: 'idle',
                currentTask: 'Syncing',
                logs: []
            });
        }
    }
  }, []);

  return (
    <div className="w-full h-full relative z-10">
      <Canvas>
        <PerspectiveCamera makeDefault fov={60} />
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.1} />
        <SimulationContent />
      </Canvas>
    </div>
  );
};