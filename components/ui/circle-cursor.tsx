'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export default function CircleCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const [origin, setOrigin] = useState('center');

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    return smoothVelocity.on("change", (latest) => {
      if (latest > 0) {
        setOrigin('bottom');
      } else if (latest < 0) {
        setOrigin('top');
      }
    });
  }, [smoothVelocity]);

  const scaleY = useTransform(smoothVelocity, (latest) => {
    return 1 + Math.min(Math.abs(latest) * 0.001, 2);
  });

  const scaleX = useTransform(smoothVelocity, (latest) => {
    return 1 - Math.min(Math.abs(latest) * 0.0005, 0.5);
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scaleX,
          scaleY,
          transformOrigin: origin
      }}
    />
  );
}
