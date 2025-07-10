import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FloatingElements from '../components/FloatingElements';
import MagicalCursor from '../components/MagicalCursor';
import InteractiveBackground from '../components/InteractiveBackground';

const ILoveYou: React.FC = () => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const loveReasons = [
    { hint: '😊', message: 'Your smile lights up my entire world' },
    { hint: '💫', message: 'The way you make ordinary moments magical' },
    { hint: '🎵', message: 'Your beautiful laugh that I could listen to forever' },
    { hint: '🌟', message: 'How you believe in me even when I doubt myself' },
    { hint: '🤗', message: 'Your warm presence that feel like home' },
    { hint: '💝', message: 'Your kind heart that loves so generously' },
    { hint: '🌈', message: 'How you bring color to my black and white world' },
    { hint: '✨', message: 'Your incredible strength and resilience' },
    { hint: '🦋', message: 'The butterflies you still give me' },
    { hint: '🌙', message: 'How you make even the darkest nights beautiful' },
    { hint: '☕', message: 'Your energy' },
    { hint: '📚', message: 'Those naina' },
    { hint: '🎨', message: 'Your creative spirit that inspires me' },
    { hint: '🌻', message: 'Your optimism that brightens every day' },
    { hint: '🤝', message: 'How you say kya bakchodi h bhayy' },
    { hint: '🧠', message: 'Your brilliant mind that amazes me' },
    { hint: '🍳', message: 'The way you make even anything so lively' },
    { hint: '🌊', message: 'Your free spirit that reminds me that you are none less than a goddess' },
    { hint: '🛌', message: 'How peaceful that smile is' },
    { hint: '🎉', message: 'Your excitement for life that\'s contagious' },
    { hint: '🌠', message: 'The way you make wishes come true' },
    { hint: '🧩', message: 'How perfectly we clicked' },
    { hint: '🍂', message: 'Your appreciation for simple pleasures' },
    { hint: '🚀', message: 'The way you talk' },
    { hint: '🛁', message: 'Your relaxing presence after long days' },
    { hint: '🎶', message: 'How bitching connects us on another level' },
    { hint: '🍕', message: 'Our shared love for late night gossips' },
    { hint: '📷', message: 'How you capture beautiful moments' },
    { hint: '🌎', message: 'Your curiosity about the world' },
    { hint: '💌', message: 'The sweet little steps of yours' },
    { hint: '⏳', message: 'How time flies when we\'re together' },
    { hint: '🧦', message: 'Your silly quirks that make me smile' },
    { hint: '🛒', message: 'Even convo is fun with you' },
    { hint: '🎭', message: 'Your dramatic reactions that make me laugh' },
    { hint: '🧵', message: 'How you pay attention to small details' },
    { hint: '🪴', message: 'Your nurturing nature with everything' },
    { hint: '🎲', message: 'Your memes huh' },
    { hint: '🛋️', message: 'Our conversations' },
    { hint: '🧳', message: 'How adventurous you are' },
    { hint: '🍿', message: 'Your k drama selection' },
    { hint: '🧘', message: 'Your calming influence when I\'m stressed' },
    { hint: '🎁', message: 'How you remember all my favorites' },
    { hint: '🖌️', message: 'Your artistic talents that impress me' },
    { hint: '🔍', message: 'How you notice things no one else does' },
    { hint: '🧸', message: 'Your childlike wonder at simple things' },
    { hint: '🌱', message: 'Your growth mindset that motivates me' },
    { hint: '🕯️', message: 'The romantic atmosphere you create' },
    { hint: '🧚', message: 'Your magical presence in my life' },
    { hint: '🌻', message: 'Your soul' }
  
  ];

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        <MagicalCursor />
        <InteractiveBackground />
        <FloatingElements />
        
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-20 h-20 text-pink-500 mx-auto mb-6 drop-shadow-xl" />
            </motion.div>
            <motion.h1 
              className="text-6xl font-dancing font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              What I Love About You
            </motion.h1>
            <p className="text-2xl text-pink-400 mb-2">Click each card to discover what makes you special</p>
            <motion.p 
              className="text-lg text-pink-300"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              {flippedCards.length} / {loveReasons.length} discovered
            </motion.p>
          </motion.div>

          {/* Updated card grid with square cards and top-left alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16 px-4 justify-items-start">
            {loveReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative w-48 h-48 cursor-pointer group" // Square dimensions
                onClick={() => handleCardFlip(index)}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="relative w-full h-full preserve-3d"
                  animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front of card - square */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl shadow-2xl flex items-center justify-center text-5xl hover:shadow-pink-500/30 transition-all duration-300">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: flippedCards.includes(index) ? [0, 360] : [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {reason.hint}
                    </motion.div>
                    
                    {/* Glow effect when not flipped */}
                    {!flippedCards.includes(index) && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            '0 0 15px rgba(236, 72, 153, 0.3)',
                            '0 0 30px rgba(236, 72, 153, 0.5)',
                            '0 0 15px rgba(236, 72, 153, 0.3)'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Back of card - square */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-100 via-white to-pink-50 rounded-xl shadow-xl p-4 flex items-center justify-center text-center transform rotate-y-180 border-2 border-pink-200/50 overflow-hidden">
                    <motion.p 
                      className="text-pink-700 font-medium text-sm leading-tight px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {reason.message}
                    </motion.p>
                    
                    {/* Sparkle effect when flipped */}
                    {flippedCards.includes(index) && (
                      <>
                        <motion.div
                          className="absolute top-2 right-2 text-yellow-400"
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        >
                          <Star className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                          className="absolute bottom-2 left-2 text-yellow-400"
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, -360],
                          }}
                          transition={{
                            delay: 0.5,
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        >
                          <Star className="w-4 h-4" />
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {flippedCards.length === loveReasons.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="bg-gradient-to-r from-pink-100 via-white to-purple-100 p-10 rounded-2xl shadow-2xl max-w-3xl mx-auto relative overflow-hidden border-2 border-pink-200/50">
                  {/* Background sparkles */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-300/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 10 + 10}px`
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Star />
                    </motion.div>
                  ))}
                  
                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-6" />
                    </motion.div>
                    <h2 className="text-4xl font-dancing font-bold text-pink-600 mb-6">
                      And so much more...
                    </h2>
                    <p className="text-xl text-pink-700 leading-relaxed mb-6">
                      These are just 50 of the countless reasons why I love you. 
                      You are extraordinary in every way, and I'm grateful every day 
                      for the privilege of loving you.
                    </p>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="w-12 h-12 text-pink-500 mx-auto" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              onClick={() => navigate('/puzzle')}
              className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                rotateZ: [0, -2, 2, 0],
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <span className="relative z-10 flex items-center justify-center">
                Solve Our Puzzle
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6 ml-3" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ILoveYou;  