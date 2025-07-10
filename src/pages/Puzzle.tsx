import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Gift, ArrowRight, RotateCcw, Sparkles, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface BirthdayLock {
  id: number;
  clue: string;
  answer: string;
  isUnlocked: boolean;
  attempts: number;
  maxAttempts: number;
}

const Puzzle: React.FC = () => {
  const navigate = useNavigate();
  
  const birthdayLocks: BirthdayLock[] = [
    {
      id: 1,
      clue: "The three letters that describe someone uniquely special - what everyone calls her ✨",
      answer: "you",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 2,
      clue: "What she does to every room she enters - she makes it feel whole and perfect 🌟",
      answer: "brighten",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 3,
      clue: "A word that shows whose special day this is - belonging to the birthday girl 🎂",
      answer: "your",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 4,
      clue: "The word that describes this entire celebration - it's her special ______ 🎉",
      answer: "day",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 5,
      clue: "A connecting word that brings everything together, like how she connects with everyone 🤝",
      answer: "and",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 6,
      clue: "What she does for everyone around her - she _____ them smile and feel happy 😊",
      answer: "makes",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 7,
      clue: "What we all feel when we're with her - pure joy and _________ 💫",
      answer: "happiness",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    },
    {
      id: 8,
      clue: "The emotion that describes how we feel about her - completely _______ 💝",
      answer: "amazing",
      isUnlocked: false,
      attempts: 0,
      maxAttempts: 3
    }
  ];

  const [locks, setLocks] = useState<BirthdayLock[]>(birthdayLocks);
  const [currentLock, setCurrentLock] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [allUnlocked, setAllUnlocked] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'hint'>('success');

  const initializePuzzle = () => {
    setLocks(birthdayLocks);
    setCurrentLock(0);
    setUserAnswer('');
    setAllUnlocked(false);
    setMessage('');
  };

  useEffect(() => {
    initializePuzzle();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) {
      setMessage('Please enter an answer! 🎈');
      setMessageType('error');
      return;
    }

    const currentLockData = locks[currentLock];
    const isCorrect = userAnswer.toLowerCase().trim() === currentLockData.answer.toLowerCase();

    if (isCorrect) {
      // Unlock current lock
      const newLocks = [...locks];
      newLocks[currentLock] = { ...currentLockData, isUnlocked: true };
      setLocks(newLocks);
      
      if (currentLock < locks.length - 1) {
        setCurrentLock(currentLock + 1);
        setMessage(`Perfect! 🎉 Mystery ${currentLock + 1} solved!`);
        setMessageType('success');
      } else {
        setAllUnlocked(true);
        setMessage('All mysteries solved! You revealed the birthday message! 🎂');
        setMessageType('success');
      }
      
      setUserAnswer('');
    } else {
      // Wrong answer
      const newLocks = [...locks];
      newLocks[currentLock] = { 
        ...currentLockData, 
        attempts: currentLockData.attempts + 1 
      };
      setLocks(newLocks);
      
      if (newLocks[currentLock].attempts >= newLocks[currentLock].maxAttempts) {
        setMessage(`Here's the answer: "${currentLockData.answer}" 💡`);
        setMessageType('hint');
      } else {
        setMessage(`Not quite! ${newLocks[currentLock].maxAttempts - newLocks[currentLock].attempts} attempts left 🤔`);
        setMessageType('error');
      }
    }
  };

  const getHint = () => {
    const currentLockData = locks[currentLock];
    const answer = currentLockData.answer;
    const hint = answer.charAt(0) + '_'.repeat(answer.length - 1);
    setMessage(`Hint: ${hint} 💡`);
    setMessageType('hint');
  };

  const resetPuzzle = () => {
    initializePuzzle();
  };

  const getUnlockedMessage = () => {
    return locks
      .filter(lock => lock.isUnlocked)
      .map(lock => lock.answer)
      .join(' ');
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-4">
            <Lock className="w-16 h-16 text-pink-500 mr-2" />
            <Gift className="w-12 h-12 text-purple-500 animate-bounce" />
            <Unlock className="w-16 h-16 text-green-500 ml-2" />
          </div>
          <h1 className="text-5xl font-dancing text-pink-600 mb-4">Birthday Mystery Challenge</h1>
          <p className="text-xl text-pink-400">
            {allUnlocked 
              ? 'You solved all the birthday mysteries! 🎉' 
              : `Solve the clues to unlock the birthday message! (${locks.filter(l => l.isUnlocked).length}/${locks.length})`}
          </p>
        </motion.div>

        {/* Mystery Locks Display */}
        <div className="max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl shadow-2xl"
          >
            <div className="grid grid-cols-4 gap-4 mb-6">
              {locks.map((lock, index) => (
                <motion.div
                  key={lock.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`
                    h-20 rounded-lg flex flex-col items-center justify-center
                    transition-all duration-300
                    ${lock.isUnlocked
                      ? 'bg-gradient-to-br from-green-400 to-green-500 text-white'
                      : index === currentLock
                        ? 'bg-gradient-to-br from-purple-400 to-purple-500 text-white ring-4 ring-purple-300'
                        : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600'
                    }
                  `}
                >
                  {lock.isUnlocked ? (
                    <>
                      <Star className="w-6 h-6 mb-1" />
                      <span className="text-sm font-dancing font-bold">
                        {lock.answer}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-6 h-6 mb-1" />
                      <span className="text-xs">
                        Clue {index + 1}
                      </span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Unlocked Message Preview */}
            {locks.some(lock => lock.isUnlocked) && (
              <div className="bg-white/50 p-4 rounded-lg mb-6">
                <p className="text-2xl font-dancing text-pink-600 text-center">
                  "{getUnlockedMessage()}"
                  {!allUnlocked && (
                    <span className="text-pink-400"> ...</span>
                  )}
                  {allUnlocked && " 🎂"}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Current Mystery Challenge */}
        {!allUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Gift className="w-12 h-12 text-purple-500 mr-3" />
                <h3 className="text-3xl font-dancing text-pink-600">
                  Birthday Clue {currentLock + 1}
                </h3>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p className="text-lg text-pink-700 leading-relaxed text-center">
                  {locks[currentLock]?.clue}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:border-pink-500 focus:outline-none text-lg font-dancing text-center"
                    autoComplete="off"
                  />
                  <Sparkles className="absolute right-3 top-3 w-6 h-6 text-pink-400" />
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Solve Mystery 🎁
                  </button>
                  
                  {locks[currentLock]?.attempts < locks[currentLock]?.maxAttempts && (
                    <button
                      type="button"
                      onClick={getHint}
                      className="bg-gradient-to-r from-yellow-400 to-orange-600 hover:from-yellow-500 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Hint 💡
                    </button>
                  )}
                </div>
              </form>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg text-center font-dancing text-lg ${
                    messageType === 'success' 
                      ? 'bg-green-100 text-green-700' 
                      : messageType === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {allUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
              <Gift className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-dancing text-pink-600 mb-4">
                All Mysteries Solved! 🎉
              </h2>
              <p className="text-xl font-dancing text-pink-600 mb-4">
                "You brighten your day and makes happiness amazing 🎂"
              </p>
              <p className="text-lg text-pink-700 leading-relaxed">
                Just like you solved each mystery with your brilliance, you solve 
                life's puzzles with grace and wisdom! Your birthday is a celebration 
                of all the amazing qualities that make you so special. Here's to 
                another year of your wonderful self! 
              </p>
            </div>
          </motion.div>
        )}

        <div className="text-center space-y-4">
          <button
            onClick={resetPuzzle}
            className="bg-pink-300 hover:bg-pink-400 text-pink-700 font-semibold py-2 px-4 rounded-full text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 mr-4"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reset Mystery
          </button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            onClick={() => navigate('/future')}
            className="bg-gradient-to-r from-pink-400 to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Continue Birthday Journey
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Puzzle;