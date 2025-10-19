import React from 'react';

const QualitySelector = ({ selectedQuality, onQualityChange, disabled }) => {
  const qualities = [
    { 
      id: 'low', 
      name: 'Low', 
      description: '768x432',
      icon: '⚡',
      speed: 'Schnell',
      badge: 'text-green-400 bg-green-400/10 border-green-400/30'
    },
    { 
      id: 'medium', 
      name: 'Medium', 
      description: '1024x576',
      icon: '⭐',
      speed: 'Ausgewogen',
      badge: 'text-blue-400 bg-blue-400/10 border-blue-400/30'
    },
    { 
      id: 'high', 
      name: 'High', 
      description: '1280x720 (HD)',
      icon: '💎',
      speed: 'Langsamer',
      badge: 'text-purple-400 bg-purple-400/10 border-purple-400/30'
    },
    { 
      id: 'ultra', 
      name: 'Ultra', 
      description: '1920x1080 (Full HD)',
      icon: '👑',
      speed: 'Am langsamsten',
      badge: 'text-amber-400 bg-amber-400/10 border-amber-400/30'
    }
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-emerald-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Video-Qualität</h2>
          <p className="text-sm text-slate-400">Höhere Qualität = längere Generierungszeit</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {qualities.map((quality) => (
          <button
            key={quality.id}
            data-testid={`quality-${quality.id}`}
            onClick={() => onQualityChange(quality.id)}
            disabled={disabled}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
              selectedQuality === quality.id
                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                : 'border-slate-700/50 bg-slate-950/50 hover:border-slate-600 hover:bg-slate-900/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-2xl">{quality.icon}</div>
              {selectedQuality === quality.id && (
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div className={`font-semibold mb-1 ${
              selectedQuality === quality.id ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}>
              {quality.name}
            </div>
            <div className={`text-xs mb-2 ${
              selectedQuality === quality.id ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'
            }`}>
              {quality.description}
            </div>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
              selectedQuality === quality.id ? quality.badge : 'text-slate-500 bg-slate-800/50 border-slate-700/50'
            }`}>
              {quality.speed}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QualitySelector;
