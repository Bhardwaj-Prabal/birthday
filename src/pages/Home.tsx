import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import HeartParticles from '../components/HeartParticles';
import PageTransition from '../components/PageTransition';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeartParticles />
      <PageTransition>
        <div className="text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            className="mb-8"
          >
            <Heart className="w-24 h-24 text-pink-500 mx-auto mb-4 animate-pulse-slow" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-6xl md:text-8xl font-dancing text-pink-600 mb-4"
          >
            Happy Birthday
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-4xl md:text-5xl font-great text-pink-500 mb-8"
          >
            Latishaaa 💖
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/timeline')}
              className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow"
            >
              <Sparkles className="w-6 h-6 inline mr-2" />
              Start the Journey
            </button>
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
};

export default Home;