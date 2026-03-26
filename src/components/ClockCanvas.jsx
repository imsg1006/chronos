import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// An abstract premium clock model built from primitives
const AbstractClock = () => {
  const groupRef = useRef();
  const handsRef = useRef();
  const minuteHandRef = useRef();
  const hourHandRef = useRef();

  useLayoutEffect(() => {
    // Scroll animation for the entire clock group
    const ctx = gsap.context(() => {
      gsap.to(groupRef.current.position, {
        y: -2,
        z: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
      gsap.to(groupRef.current.rotation, {
        x: Math.PI / 4,
        y: Math.PI,
        ease: 'none',
        scrollTrigger: {
          trigger: '.app',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Continuous rotation of hands
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -t * 1; 
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -t * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]} rotation={[0.2, -0.4, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Ring */}
        <mesh>
          <torusGeometry args={[2.2, 0.1, 32, 100]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Inner Face Background */}
        <mesh position={[0, 0, -0.1]}>
          <cylinderGeometry args={[2.1, 2.1, 0.05, 64]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[Math.sin((i / 12) * Math.PI * 2) * 1.8, Math.cos((i / 12) * Math.PI * 2) * 1.8, 0.05]} rotation={[0, 0, -(i / 12) * Math.PI * 2]}>
            <boxGeometry args={[0.05, 0.3, 0.05]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#d4af37" : "#fff"} metalness={0.5} roughness={0.2} />
          </mesh>
        ))}

        {/* Hands */}
        <group ref={handsRef} position={[0, 0, 0.1]}>
          {/* Hour Hand */}
          <group ref={hourHandRef}>
            <mesh position={[0, 0.6, 0]}>
              <boxGeometry args={[0.08, 1.2, 0.05]} />
              <meshStandardMaterial color="#fff" metalness={0.5} roughness={0.2} />
            </mesh>
          </group>
          {/* Minute Hand */}
          <group ref={minuteHandRef}>
            <mesh position={[0, 1, 0.02]}>
              <boxGeometry args={[0.04, 2, 0.05]} />
              <meshStandardMaterial color="#d4af37" metalness={0.5} roughness={0.2} />
            </mesh>
          </group>
          {/* Center Pin */}
          <mesh position={[0, 0, 0.05]}>
            <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

export default function ClockCanvas() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#030303']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <AbstractClock />
        </PresentationControls>
        
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
