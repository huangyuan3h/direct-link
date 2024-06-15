'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Mesh } from 'three';

const Banner: React.FC = () => {
  return (
    <div className="mt-4" style={{ height: '400px' }}>
      <Canvas>
        <color attach="background" args={['#001424']} />
        <Stars
          radius={100}
          count={5000}
          factor={20}
          saturation={0}
          fade
          depth={450}
        />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default Banner;
