"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isClicking, setIsClicking] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  // if (typeof window === "undefined") return null;

  return (
    <div 
      className='pointer-events-none fixed inset-0 z-[9999]'
    >
      {/* Main cursor dot */}
      <motion.div
        className='absolute top-0 left-0 w-[10px] h-[10px] rounded-full bg-[#C24141]'
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className='absolute top-0 left-0 w-[24px] h-[24px] rounded-full border-[1.5px] border-[#C24141]'
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: 1,
          borderWidth: "1.5px",
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
        initial={false}
      />

      {/* Outer glow */}
      <motion.div
        className='absolute top-0 left-0 w-[36px] h-[36px] rounded-full bg-[#C24141] blur-[10px]'
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          scale: 1,
          opacity: 0.2,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
        initial={false}
      />
    </div>
  );
}
