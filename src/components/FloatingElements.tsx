import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Zap, Crown, Gem } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Heart, color: 'text-pink-400', size: 'w-5 h-5' },
    { Icon: Sparkles, color: 'text-yellow-400', size: 'w-4 h-4' },
    { Icon: Star, color: 'text-purple-400', size: 'w-4 h-4' },
    { Icon: Zap, color: 'text-blue-400', size: 'w-3 h-3' },
    { Icon: Crown, color: 'text-amber-400', size: 'w-4 h-4' },
    { Icon: Gem, color: 'text-emerald-400', size: 'w-3 h-3' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Dynamic floating elements */}
      {Array.from({ length: 20 }).map((_, i) => {
        const Element = elements[i % elements.length];
        const randomDelay = Math.random() * 5;
        const randomDuration = 8 + Math.random() * 4;
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            initial={{ 
              x: `${randomX}vw`, 
              y: `${randomY}vh`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [`${randomY}vh`, `${randomY - 20}vh`, `${randomY}vh`],
              x: [`${randomX}vw`, `${randomX + 10}vw`, `${randomX}vw`],
              rotate: [0, 360],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "easeInOut"
            }}
            className={`absolute ${Element.color} opacity-60`}
          >
            <Element.Icon className={Element.size} />
          </motion.div>
        );
      })}
      
      {/* Magical orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-sm"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;