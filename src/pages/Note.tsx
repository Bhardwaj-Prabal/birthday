import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PenTool, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Note: React.FC = () => {
  const navigate = useNavigate();

  const loveNote = `My Dearest Love,

  On this special day, I want you to know how much you mean to me. Every moment we've shared has been a treasure, every laugh a melody, and every touch a reminder of how blessed I am to have you in my life.

  You are my sunshine on cloudy days, my anchor in stormy seas, and my greatest adventure. Your smile lights up my world in ways I never thought possible, and you  have transformed me into someone I'm proud to be.

  Today, as we celebrate another year of your beautiful existence, I promise to love you more with each passing day, to support your dreams, and to be your partner in all of life's adventures.

  Happy Birthday to the most amazing person I know. Here's to many more years of love, laughter, and endless happiness together.

  With all my love,
  Your devoted admirer 💕`;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <PenTool className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-5xl font-dancing text-pink-600 mb-4">A Letter From My Heart</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-pink-50 to-white p-8 md:p-12 rounded-lg shadow-2xl border-2 border-pink-200 relative overflow-hidden">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pink-100 to-pink-200"></div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="relative z-10"
            >
              <pre className="font-dancing text-lg md:text-xl text-pink-700 leading-relaxed whitespace-pre-wrap">
                {loveNote}
              </pre>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-pink-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-pink-300 rounded-full opacity-20"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/thankyou')}
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Note;