import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Cake: React.FC = () => {
  const navigate = useNavigate();
  const [candlesLit, setCandlesLit] = useState(false);
  const [showWish, setShowWish] = useState(false);

  const lightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => {
      setShowWish(true);
    }, 1000);
  };

  return (
    <PageTransition>
      {/* Beautiful Pink Background */}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-200 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3], 
                y: [100, -100, 100],
                x: [0, 30, -30, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="w-6 h-6 text-pink-300 opacity-50" />
              ) : i % 3 === 1 ? (
                <Star className="w-4 h-4 text-rose-300 opacity-50" />
              ) : (
                <Sparkles className="w-5 h-5 text-pink-400 opacity-50" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-200/30 via-transparent to-pink-100/20"></div>

        <div className="max-w-4xl mx-auto px-4 py-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <h1 className="text-6xl font-dancing text-pink-600 mb-4 drop-shadow-lg">
                Make a Wish!
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-pink-500 font-medium"
            >
              Click the magical cake to light the candles ✨
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-16"
          >
            <div className="relative mx-auto w-80 h-80">
              {/* Cake Platform/Base */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-6 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full shadow-2xl opacity-60"></div>
              
              <div 
                onClick={lightCandles}
                className="relative mx-auto w-64 h-64 cursor-pointer hover:scale-105 transition-transform duration-300 group"
              >
                {/* Cake Base - Enhanced */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-52 h-36 bg-gradient-to-t from-pink-400 via-pink-300 to-pink-200 rounded-t-2xl shadow-2xl border-4 border-pink-200">
                  {/* Cake Decorations */}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-rose-400 rounded-full"></div>
                  <div className="absolute top-4 right-3 w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-rose-300 rounded-full"></div>
                  <div className="absolute bottom-6 right-4 w-3 h-3 bg-pink-400 rounded-full"></div>
                  
                  {/* Cake Layers - Enhanced */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg"></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-48 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg"></div>
                  
                  {/* Frosting Details */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-white rounded-full opacity-80"></div>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-44 h-2 bg-white rounded-full opacity-80"></div>
                  
                  {/* Candles - Enhanced */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="w-3 h-12 bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-sm shadow-md border border-yellow-400"></div>
                        {candlesLit && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                          >
                            <div className="relative">
                              <div className="w-4 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full shadow-lg">
                                <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
                              </div>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute -inset-1 bg-orange-300 rounded-full opacity-30"
                              ></motion.div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Sparkles around cake */}
                {candlesLit && (
                  <>
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          delay: 0.3 + i * 0.08, 
                          duration: 2,
                          repeat: Infinity
                        }}
                        className="absolute"
                        style={{
                          top: `${10 + Math.random() * 80}%`,
                          left: `${10 + Math.random() * 80}%`,
                        }}
                      >
                        {i % 3 === 0 ? (
                          <Sparkles className="w-5 h-5 text-yellow-400" />
                        ) : i % 3 === 1 ? (
                          <Star className="w-4 h-4 text-pink-400" />
                        ) : (
                          <Heart className="w-4 h-4 text-rose-400" />
                        )}
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Hover Effect Glow */}
                <div className="absolute inset-0 rounded-full bg-pink-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </div>
            </div>
          </motion.div>

          {showWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-pink-100 via-white to-pink-100 p-8 rounded-2xl shadow-2xl border-2 border-pink-200 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl font-dancing text-pink-600 mb-6 drop-shadow-sm">
                    My Wish for You 💕
                  </h2>
                  <p className="text-xl text-pink-700 leading-relaxed font-medium">
                    I wish for endless happiness, beautiful adventures, and dreams coming true.
                    May this new year bring you all the joy your heart can hold! 🎂✨
                  </p>
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full opacity-70"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-rose-400 rounded-full opacity-70"></div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showWish ? 1.5 : 2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/gift')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-xl shadow-2xl hover:shadow-pink-300/50 transform transition-all duration-300 border-2 border-pink-300"
            >
              Our Journey Together
              <ArrowRight className="w-6 h-6 inline ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cake;