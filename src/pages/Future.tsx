import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight, DraftingCompass, Palette, BookOpen } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Future: React.FC = () => {
  const navigate = useNavigate();

  const dreams = [
    {
      id: 1,
      title: 'World Explorer',
      description: 'Fulfilling your dream of visiting every continent, collecting memories from Paris to Bali',
      icon: MapPin,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 2,
      title: 'Brilliant Architect',
      description: 'Designing breathtaking structures that blend beauty and functionality, your signature style',
      icon: DraftingCompass,
      color: 'from-rose-400 to-pink-500'
    },
    {
      id: 3,
      title: 'Creative Visionary',
      description: 'Expressing your artistic soul through design, photography, and all your creative passions',
      icon: Palette,
      color: 'from-pink-500 to-rose-400'
    },
    {
      id: 4,
      title: 'Lifelong Learner',
      description: 'Always growing, taking courses, reading books - your curiosity knows no bounds',
      icon: BookOpen,
      color: 'from-rose-500 to-pink-400'
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Star className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-5xl font-dancing text-pink-600 mb-4">Your Bright Future</h1>
          <p className="text-xl text-pink-400">All the amazing things you'll accomplish</p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Starry background */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex overflow-x-auto pb-4 space-x-8">
            {dreams.map((dream, index) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="flex-shrink-0 w-80"
              >
                <div className={`bg-gradient-to-br ${dream.color} p-1 rounded-xl shadow-2xl`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 h-full">
                    <div className="text-center">
                      <dream.icon className="w-16 h-16 text-pink-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-dancing text-pink-600 mb-4">
                        {dream.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {dream.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-pink-100 to-pink-200 p-8 rounded-lg shadow-xl max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-dancing text-pink-600 mb-4">
              The World Awaits Your Brilliance
            </h2>
            <p className="text-lg text-pink-700 leading-relaxed">
              Watching you chase your dreams is one of life's greatest joys. 
              Your talent, passion and determination will take you everywhere you want to go.
            </p>
          </div>

          <button
            onClick={() => navigate('/gift')}
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Continue
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Future;