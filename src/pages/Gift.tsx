import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift as GiftIcon, Heart, ArrowRight, Sparkles, Star, Crown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FloatingElements from '../components/FloatingElements';
import MagicalCursor from '../components/MagicalCursor';
import InteractiveBackground from '../components/InteractiveBackground';

const Gift: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const openGift = () => {
    setIsOpen(true);
    
    // Create explosion of particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 3000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        <MagicalCursor />
        <InteractiveBackground />
        <FloatingElements />

        {/* Particle explosion */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2, 
                scale: 0,
                opacity: 1 
              }}
              animate={{ 
                x: particle.x, 
                y: particle.y, 
                scale: [0, 1, 0],
                opacity: [1, 0.8, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="fixed w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full pointer-events-none z-30"
            />
          ))}
        </AnimatePresence>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 text-center">
          {/* Animated title with morphing text */}
          <motion.div
            initial={{ opacity: 0, y: -100, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-black mb-6 relative"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #ec4899, #8b5cf6, #06b6d4)',
                  'linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899)',
                  'linear-gradient(225deg, #06b6d4, #ec4899, #8b5cf6)',
                  'linear-gradient(315deg, #ec4899, #8b5cf6, #06b6d4)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 30px rgba(236, 72, 153, 0.3)',
              }}
            >
              ✨ MAGICAL GIFT ✨
            </motion.h1>
            
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Click the enchanted gift to reveal your surprise
              </p>
              <motion.div
                animate={{ 
                  x: [0, 10, -10, 0],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
                className="absolute -right-8 top-0 text-yellow-400"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Gift Box */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 80 }}
            className="mb-16 relative"
          >
            <div className="relative mx-auto w-96 h-96 flex items-center justify-center perspective-1000">
              <motion.div
                className="cursor-magic relative group"
                onClick={openGift}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {!isOpen ? (
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotateZ: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Gift box with 3D effect */}
                    <div className="relative w-72 h-72 mx-auto">
                      {/* Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 to-purple-900/40 rounded-2xl blur-2xl transform translate-y-8 scale-110"></div>
                      
                      {/* Main box */}
                      <div className="relative w-full h-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-300 transform-gpu">
                        {/* Holographic effect */}
                        <motion.div
                          animate={{
                            background: [
                              'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                              'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)',
                              'linear-gradient(225deg, transparent, rgba(255,255,255,0.3), transparent)',
                              'linear-gradient(315deg, transparent, rgba(255,255,255,0.3), transparent)',
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-0"
                        />
                        
                        {/* Decorative patterns */}
                        <div className="absolute inset-4 border-2 border-pink-200/50 rounded-xl"></div>
                        <div className="absolute inset-8 border border-pink-100/30 rounded-lg"></div>
                        
                        {/* Ribbons with gradient */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-gradient-to-b from-pink-700 via-pink-800 to-pink-900 shadow-inner"></div>
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-16 bg-gradient-to-r from-pink-700 via-pink-800 to-pink-900 shadow-inner"></div>
                        
                        {/* Magical bow */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="relative"
                          >
                            <div className="w-20 h-12 bg-gradient-to-b from-pink-600 via-pink-700 to-pink-800 rounded-full shadow-xl"></div>
                            <div className="absolute top-1 left-1 w-7 h-10 bg-gradient-to-b from-pink-700 to-pink-900 rounded-full shadow-inner"></div>
                            <div className="absolute top-1 right-1 w-7 h-10 bg-gradient-to-b from-pink-700 to-pink-900 rounded-full shadow-inner"></div>
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-pink-900 rounded-full"></div>
                            
                            {/* Sparkles on bow */}
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute -top-2 -right-2"
                            >
                              <Star className="w-4 h-4 text-yellow-300" />
                            </motion.div>
                          </motion.div>
                        </div>
                        
                        {/* Center icon with glow */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/30 rounded-full blur-lg scale-150"></div>
                            <GiftIcon className="relative w-16 h-16 text-white drop-shadow-2xl" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0, rotateY: -180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
                    className="relative"
                  >
                    {/* Opened gift with magical effects */}
                    <div className="relative w-72 h-72 mx-auto">
                      {/* Magical aura */}
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-blue-400/30 rounded-full blur-2xl"
                      />
                      
                      {/* Gift container */}
                      <div className="relative w-full h-full bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-pink-200 to-purple-200">
                        {/* Magical shimmer */}
                        <motion.div
                          animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                        />
                        
                        {/* Central heart with complex animation */}
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 10, -10, 0],
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div className="relative">
                            {/* Heart glow */}
                            <motion.div
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute inset-0 bg-pink-400/50 rounded-full blur-xl scale-150"
                            />
                            <Heart className="relative w-32 h-32 text-pink-500 drop-shadow-2xl" />
                          </div>
                        </motion.div>
                        
                        {/* Magical particles */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: [0, -60, -120],
                              x: [0, (Math.random() - 0.5) * 100],
                              rotate: [0, 360],
                            }}
                            transition={{ 
                              delay: i * 0.1, 
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeOut"
                            }}
                            className="absolute w-4 h-4 rounded-full"
                            style={{
                              background: `linear-gradient(45deg, ${
                                ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'][i % 5]
                              }, ${
                                ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'][i % 5]
                              })`,
                              top: `${45 + Math.random() * 10}%`,
                              left: `${45 + Math.random() * 10}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Gift message with creative layout */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
                className="mb-16"
              >
                <div className="relative max-w-4xl mx-auto">
                  {/* Decorative frame */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-3xl blur-xl opacity-50"></div>
                  
                  <div className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 p-12 rounded-3xl shadow-2xl border border-pink-200/50 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20 + i, repeat: Infinity, ease: "linear" }}
                          className="absolute w-2 h-2 bg-pink-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative z-10">
                      <motion.h2 
                        className="text-5xl md:text-6xl font-black mb-8"
                        animate={{
                          backgroundImage: [
                            'linear-gradient(45deg, #ec4899, #8b5cf6)',
                            'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                            'linear-gradient(225deg, #06b6d4, #ec4899)',
                            'linear-gradient(315deg, #ec4899, #8b5cf6)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        💝 My Gift to You 💝
                      </motion.h2>
                      
                      <motion.p 
                        className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        The gift of my <span className="text-pink-600 font-bold">unconditional love</span>, 
                        my promise to be there through every <span className="text-purple-600 font-bold">season of life</span>,
                        and my commitment to making every day as <span className="text-blue-600 font-bold">special</span> as you are to me.
                      </motion.p>
                      
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="relative inline-block"
                        >
                          <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-xl scale-150"></div>
                          <Heart className="relative w-20 h-20 text-pink-500 mx-auto mb-4" />
                        </motion.div>
                        
                        <motion.p 
                          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          You are just pure love ✨💕✨
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Creative navigation button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isOpen ? 2.5 : 1.5, duration: 1 }}
          >
            <motion.button
              onClick={() => navigate('/note')}
              className="cursor-magic relative group bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                rotateZ: [0, -2, 2, 0],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Button background effects */}
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              
                <motion.button
                  onClick={() => navigate('/note')} // Replace with your target route
                  className="relative z-10 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button content container */}
                  <span className="flex items-center justify-center">
                    <Crown className="w-6 h-6 mr-3 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    <span className="font-medium">What I Love About You</span>
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:text-pink-300 transition-colors" />
                    </motion.div>
                  </span>

                  {/* Optional hover effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.button>
              {/* Magical sparkles around button */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    delay: i * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Gift;