import React from 'react';

const StyleSelector = ({ selectedStyle, onStyleChange, disabled }) => {
  const styles = [
    { 
      id: 'cinematic', 
      name: 'Cinematic', 
      description: 'Filmqualität, dramatisch',
      icon: '🎬',
      gradient: 'from-indigo-500 to-purple-600'
    },
    { 
      id: 'realistic', 
      name: 'Realistic', 
      description: 'Fotorealistisch, detailliert',
      icon: '📷',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'animated', 
      name: 'Animated', 
      description: 'Cartoon, farbenfroh',
      icon: '🎨',
      gradient: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'noir', 
      name: 'Film Noir', 
      description: 'Schwarz-weiß, dramatisch',
      icon: '🎭',
      gradient: 'from-gray-700 to-gray-900'
    },
    { 
      id: 'scifi', 
      name: 'Sci-Fi', 
      description: 'Futuristisch, Neon',
      icon: '🚀',
      gradient: 'from-cyan-500 to-blue-700'
    },
    { 
      id: 'horror', 
      name: 'Horror', 
      description: 'Dunkel, unheimlich',
      icon: '👻',
      gradient: 'from-red-900 to-black'
    },
    { 
      id: 'fantasy', 
      name: 'Fantasy', 
      description: 'Magisch, ätherisch',
      icon: '✨',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'documentary', 
      name: 'Documentary', 
      description: 'Realistisch, natürlich',
      icon: '📹',
      gradient: 'from-green-600 to-teal-700'
    },
    { 
      id: 'anime', 
      name: 'Anime', 
      description: 'Lebendige Farben, stylisiert',
      icon: '🎌',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-purple-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Film-Stil wählen</h2>
          <p className="text-sm text-slate-400">Wählen Sie den visuellen Stil Ihres Films</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            data-testid={`style-${style.id}`}
            onClick={() => onStyleChange(style.id)}
            disabled={disabled}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${
              selectedStyle === style.id
                ? `border-transparent bg-gradient-to-br ${style.gradient} shadow-xl`
                : 'border-slate-700/50 bg-slate-950/50 hover:border-slate-600 hover:bg-slate-900/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-3xl mb-2">{style.icon}</div>
            <div className={`font-semibold mb-1 ${
              selectedStyle === style.id ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}>
              {style.name}
            </div>
            <div className={`text-xs ${
              selectedStyle === style.id ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-400'
            }`}>
              {style.description}
            </div>
            
            {selectedStyle === style.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
