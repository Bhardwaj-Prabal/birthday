import { useState } from 'react';
import { Baby, Zap, Crown, Gamepad2, Trophy, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import babyImage from "../assets/1.png"; // adjust path and extension as needed
import evolutionImage from "../assets/2.png";
import finalFormImage from "../assets/3.jpeg";
function Timeline() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [isHeartBeating, setIsHeartBeating] = useState(false);
  const navigate=useNavigate();
  const evolutionStages = [
    {
      id: 1,
      stage: 'Born',
      title: 'The Innocent Beginning',
      subtitle: 'Level 1: Just a baby',
      icon: Baby,
      color: 'emerald',
      bgGradient: 'from-emerald-400 to-teal-500',
      image: babyImage,
      description: 'Confused about everything, asks "How do I adult?" unironically',
      traits: [
        'Thinks cereal is a valid dinner',
        'Calls mom for everything',
        'Impressed by anyone with a coffee'
      ],
      funnyQuote: '"Smol h abhi "',
      stats: {
        wisdom: 15,
        confidence: 25,
        bank_account: 5,
        anxiety: 85,
        love: 10
      }
    },
    {
      id: 2,
      stage: 'Evolution',
      title: 'The Awkward Middle',
      subtitle: 'Level 50: Sorta Functional',
      icon: Zap,
      color: 'purple',
      bgGradient: 'from-purple-400 to-pink-500',
      image:evolutionImage,
      description: 'Half-adult, half-disaster. Owns plants but somehow keeps them alive',
      traits: [
        'Has strong opinions about coffee',
        'Got into dance',
        'Meal preps... sometimes',
        'Aunty becomes more savage ab'
      ],
      funnyQuote: '"I\'m not like other millennials"',
      stats: {
        wisdom: 65,
        confidence: 70,
        bank_account: 45,
        anxiety: 60,
        love: 50
      }
    },
    {
      id: 3,
      stage: 'Final Form',
      title: 'The Ultimate Being',
      subtitle: 'Level 100: Peak Performance',
      icon: Crown,
      color: 'yellow',
      bgGradient: 'from-yellow-400 to-orange-500',
      image: finalFormImage,
      description: 'Achieved legendary status: Can fold fitted sheets AND has emergency coffee',
      traits: [
        'Is a power generator',
        'Rotates',
        'Pure din pade rehna ',
        'Seen pe chodh dena '
      ],
      funnyQuote: '"final boss"',
      stats: {
        wisdom: 95,
        confidence: 90,
        bank_account: 80,
        anxiety: 20,
        love: 100
      }
    }
  ];

  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-800 font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Evolution Timeline
          </h1>
          <p className="text-xl text-gray-600">The Three Sacred Stages of a Bakchod's development</p>
          <div className="mt-6 text-sm text-gray-500">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              ⚠️ Warning: May cause excessive self-reflection
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-purple-400 to-yellow-400 rounded-full"></div>

          {evolutionStages.map((stage, index) => (
            <div key={stage.id} className="relative mb-20">
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r ${stage.bgGradient} rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center`}>
                <stage.icon className="w-4 h-4 text-white" />
              </div>

              {/* Content card */}
              <div className={`${index % 2 === 0 ? 'pr-8 mr-8' : 'pl-8 ml-8'} ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div 
                  className={`bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    selectedStage === stage.id ? 'ring-4 ring-opacity-50' : ''
                  } ${selectedStage === stage.id ? `ring-${stage.color}-400` : ''}`}
                  onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                >
                  {/* Card content with image positioning */}
                  <div className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} gap-6 items-start`}>
                    {/* Image section */}
                    <div className="flex-shrink-0">
                      <img 
                        src={stage.image} 
                        alt={stage.title}
                        className="w-48 h-48 object-cover rounded-xl shadow-lg"
                      />
                    </div>

                    {/* Text content section */}
                    <div className="flex-1">
                      {/* Stage header */}
                      <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`bg-gradient-to-r ${stage.bgGradient} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                          {stage.stage.toUpperCase()}
                        </div>
                      </div>

                      <h2 className={`text-3xl font-bold text-${stage.color}-600 mb-2`}>
                        {stage.title}
                      </h2>
                      <p className={`text-lg text-${stage.color}-500 mb-4 font-medium`}>
                        {stage.subtitle}
                      </p>
                      <p className="text-gray-600 text-lg mb-6">
                        {stage.description}
                      </p>

                      {/* Funny quote */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-gray-700 italic text-center">
                          {stage.funnyQuote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable content */}
                  {selectedStage === stage.id && (
                    <div className="border-t pt-6 mt-6 space-y-6">
                      {/* Traits */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          Key Traits
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {stage.traits.map((trait, idx) => (
                            <div key={idx} className="flex items-center bg-gray-50 rounded-lg p-3">
                              <div className={`w-2 h-2 bg-${stage.color}-500 rounded-full mr-3`}></div>
                              <span className="text-gray-700">{trait}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                          <Gamepad2 className="w-5 h-5 mr-2" />
                          Life Stats
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <StatBar label="Wisdom" value={stage.stats.wisdom} color={stage.color} />
                          <StatBar label="Confidence" value={stage.stats.confidence} color={stage.color} />
                          <StatBar label="Bank Account" value={stage.stats.bank_account} color={stage.color} />
                          <StatBar label="Anxiety Level" value={stage.stats.anxiety} color="red" />
                          <StatBar label="Love Capacity" value={stage.stats.love} color="pink" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Click to expand hint */}
                  <div className="text-center mt-4">
                    <span className="text-gray-400 text-sm">
                      {selectedStage === stage.id ? 'Click to collapse' : 'Click to expand'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final Heart Button */}
          <div className="relative flex justify-center mt-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            
            <button 
              className={`mt-12 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center ${
                isHeartBeating ? 'animate-pulse' : ''
              }`}
              onMouseEnter={() => setIsHeartBeating(true)}
              onMouseLeave={() => setIsHeartBeating(false)}
              onClick={() => navigate('/gallery ')}
            >
              <span>Continue Your Love Story</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Romantic Quote */}
          <div className="text-center mt-16 mb-8">
            <div className="inline-block bg-white p-6 rounded-xl shadow-md max-w-2xl">
              <Heart className="w-8 h-8 mx-auto text-pink-500 mb-4" />
              <p className="text-xl text-gray-700 italic">
                "The greatest adventure is what lies ahead. Today and tomorrow are yet to be said. The chances, the changes are all yours to make. The mold of your life is in your hands to break."
              </p>
              <p className="mt-4 text-gray-500">- J.R.R. Tolkien</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;