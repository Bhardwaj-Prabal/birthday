import React from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient base */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(45deg, #fce7f3, #e0e7ff, #fce7f3)',
            'linear-gradient(135deg, #e0e7ff, #fce7f3, #f3e8ff)',
            'linear-gradient(225deg, #fce7f3, #f3e8ff, #e0e7ff)',
            'linear-gradient(315deg, #f3e8ff, #e0e7ff, #fce7f3)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Morphing shapes */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 opacity-20"
        animate={{
          borderRadius: ['50%', '30% 70% 70% 30%', '70% 30% 30% 70%', '50%'],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 360],
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 opacity-25"
        animate={{
          borderRadius: ['30% 70% 70% 30%', '70% 30% 30% 70%', '50%', '30% 70% 70% 30%'],
          scale: [0.8, 1.3, 1, 0.8],
          rotate: [360, 270, 180, 0],
          x: [0, -80, 30, 0],
          y: [0, 80, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #ec4899)',
          filter: 'blur(35px)',
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 opacity-15"
        animate={{
          borderRadius: ['50%', '40% 60% 60% 40%', '60% 40% 40% 60%', '50%'],
          scale: [1, 0.7, 1.4, 1],
          rotate: [0, -90, -180, -360],
          x: [-144, -44, -244, -144],
          y: [-144, -244, -44, -144],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
        style={{
          background: 'linear-gradient(225deg, #f59e0b, #8b5cf6)',
          filter: 'blur(45px)',
        }}
      />
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            x: [0, Math.sin(i) * 100, 0],
            y: [0, Math.cos(i) * 100, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5
          }}
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${15 + (i * 6)}%`,
            width: `${20 + i * 3}px`,
            height: `${20 + i * 3}px`,
            background: `linear-gradient(${i * 30}deg, #ec4899, #8b5cf6)`,
            clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                     i % 3 === 1 ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' : 
                     'circle(50%)',
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;