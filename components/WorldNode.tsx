import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { WorldModule, ModuleState } from '../types';
import * as THREE from 'three';
import { MATRIX_GREEN, AGENT_RED, DATA_STREAM_COLOR } from '../constants';

interface WorldNodeProps {
  module: WorldModule;
  distanceToCamera: number;
}

export const WorldNode: React.FC<WorldNodeProps> = ({ module, distanceToCamera }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  // Holographic effect: pulsing opacity based on integrity
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Unstable modules glitch
    if (module.state === ModuleState.UNSTABLE) {
      meshRef.current.position.x = module.position.x + (Math.random() - 0.5) * 0.1;
    }
    
    // Visual Pulse
    if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
       meshRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
    }
  });

  const color = useMemo(() => {
    if (module.state === ModuleState.CORRUPTED) return AGENT_RED;
    if (module.state === ModuleState.RAW_DATA) return DATA_STREAM_COLOR;
    return MATRIX_GREEN;
  }, [module.state]);

  // Information -> Holographic optimization
  // If too far, render as a simple point (simulated by small size) or just edges
  if (distanceToCamera > 50) {
     return (
        <mesh position={[module.position.x, module.position.y, module.position.z]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color={color} wireframe />
        </mesh>
     )
  }

  return (
    <mesh 
      ref={meshRef} 
      position={[module.position.x, module.position.y, module.position.z]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.4} 
        wireframe={false}
      />
      <Edges color={color === AGENT_RED ? '#ff4444' : '#44ff44'} threshold={15} />
    </mesh>
  );
};