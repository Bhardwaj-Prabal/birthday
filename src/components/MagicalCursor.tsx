import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MagicalCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, [role="button"], .cursor-magic');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Trailing particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 bg-pink-300 rounded-full pointer-events-none z-40 opacity-60"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300 - i * 50, 
            damping: 20 + i * 5,
            delay: i * 0.02
          }}
        />
      ))}
    </>
  );
};

export default MagicalCursor;