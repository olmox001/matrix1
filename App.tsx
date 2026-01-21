import React from 'react';
import { Scene } from './components/Scene';
import { ConsoleOverlay } from './components/ConsoleOverlay';
import DigitalRain from './components/DigitalRain';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative selection:bg-green-500 selection:text-black">
      {/* Background Effect */}
      <DigitalRain />
      
      {/* 3D World */}
      <Scene />
      
      {/* UI Overlay */}
      <ConsoleOverlay />
      
      {/* Vignette Overlay for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)] z-10" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default App;