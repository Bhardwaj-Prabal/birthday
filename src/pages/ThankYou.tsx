import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import HeartParticles from '../components/HeartParticles';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeartParticles />
      <PageTransition>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            className="mb-16"
          >
            <div className="relative">
              <Heart className="w-32 h-32 text-pink-500 mx-auto mb-8 animate-pulse-slow" />
              <div className="absolute inset-0 animate-ping">
                <Heart className="w-32 h-32 text-pink-300 mx-auto opacity-75" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-dancing text-pink-600 mb-6">
              Thank You
            </h1>
            <p className="text-2xl md:text-3xl font-great text-pink-500 mb-8">
              for existing.
            </p>
            
            <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-pink-700 leading-relaxed mb-6">
                Happy Birthday once again!
              </p>
              <p className="text-lg md:text-xl text-pink-700 leading-relaxed">
                Here's to another year of adventures, laughter, and endless love. 
                I can't wait to see a brilliant girl taking over this world with a glee and and that smile! 💕
                You know we thank people for merely living at the same time as we do , i thank you for the fact that i met you , that i will remember you for my whole life , and even if we never talk again , please remember that i am forever changed by who you are and what you meant to me , bye as if it was meant to be .

              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex justify-center space-x-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              <Sparkles className="w-6 h-6 text-pink-400 animate-bounce" />
              <Sparkles className="w-10 h-10 text-rose-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="space-y-4"
          >
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Replay the Journey
            </button>
            
            <div className="mt-8 text-sm text-pink-400">
              Made with 💖 by someone who loves you more than words can express
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
};

export default ThankYou;