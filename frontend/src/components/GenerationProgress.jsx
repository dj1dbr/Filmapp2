import React, { useMemo } from 'react';

const GenerationProgress = ({ progress, status, isGenerating, generationDuration, startTime }) => {
  const getProgressMessage = (progress) => {
    if (progress < 10) return 'Wird initialisiert...';
    if (progress < 20) return 'Drehbuch wird analysiert...';
    if (progress < 30) return 'Szenen werden aufgebaut...';
    if (progress < 40) return 'Charaktere werden extrahiert...';
    if (progress < 50) return 'Kamera wird eingerichtet...';
    if (progress < 60) return 'Beleuchtung wird konfiguriert...';
    if (progress < 70) return 'Sound-Design wird erstellt...';
    if (progress < 80) return 'AI-Stimmen werden generiert...';
    if (progress < 90) return 'Videos werden gerendert...';
    if (progress < 95) return 'Timeline wird erstellt...';
    if (progress < 100) return 'Film wird exportiert...';
    return 'Abgeschlossen!';
  };

  const estimatedTimeRemaining = useMemo(() => {
    if (!isGenerating || progress === 0) return null;
    
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    const rate = elapsed / progress;
    const remaining = rate * (100 - progress);
    
    if (remaining < 60) {
      return `${Math.ceil(remaining)}s`;
    } else {
      return `${Math.ceil(remaining / 60)}min`;
    }
  }, [isGenerating, progress, startTime]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}m ${secs}s`;
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl" data-testid="generation-progress">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          {isGenerating ? (
            <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            {isGenerating ? 'Film wird generiert' : 'Generierung abgeschlossen'}
          </h2>
          <p className="text-sm text-slate-400">{getProgressMessage(progress)}</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">{progress}%</span>
          {estimatedTimeRemaining && isGenerating && (
            <span className="text-sm text-slate-400">
              Noch ca. {estimatedTimeRemaining}
            </span>
          )}
        </div>
        <div className="h-3 bg-slate-950/50 rounded-full overflow-hidden border border-slate-800/50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
          <div className="text-xs text-slate-500 mb-1">Status</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isGenerating ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
            }`}></div>
            <div className="text-sm font-medium text-white capitalize">
              {isGenerating ? 'Wird verarbeitet' : 'Fertig'}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
          <div className="text-xs text-slate-500 mb-1">Fortschritt</div>
          <div className="text-sm font-medium text-white">
            {progress}%
          </div>
        </div>
        
        <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
          <div className="text-xs text-slate-500 mb-1">Dauer</div>
          <div className="text-sm font-medium text-white">
            {generationDuration ? formatDuration(generationDuration) : 
             startTime ? formatDuration((Date.now() - startTime) / 1000) : '0s'}
          </div>
        </div>
      </div>
      
      {/* Processing Steps */}
      {isGenerating && (
        <div className="mt-6 space-y-2">
          <div className="text-xs font-medium text-slate-400 mb-3">Verarbeitungsschritte:</div>
          {[
            { step: 'Parsing', range: [0, 10], icon: '📖' },
            { step: 'Szenen aufbauen', range: [10, 20], icon: '🎬' },
            { step: 'Charaktere', range: [20, 30], icon: '👥' },
            { step: 'Kamera', range: [30, 40], icon: '📷' },
            { step: 'Beleuchtung', range: [40, 50], icon: '💡' },
            { step: 'Sound', range: [50, 60], icon: '🎵' },
            { step: 'Stimmen', range: [60, 70], icon: '🎤' },
            { step: 'Rendering', range: [70, 80], icon: '🎥' },
            { step: 'Timeline', range: [80, 90], icon: '⏱️' },
            { step: 'Export', range: [90, 100], icon: '📦' }
          ].map((item, idx) => {
            const isActive = progress >= item.range[0] && progress < item.range[1];
            const isComplete = progress >= item.range[1];
            
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  isComplete ? 'bg-green-500/20 border border-green-500/50' :
                  isActive ? 'bg-indigo-500/20 border border-indigo-500/50 animate-pulse' :
                  'bg-slate-800/50 border border-slate-700/50'
                }`}>
                  {isComplete ? (
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{item.icon}</span>
                  )}
                </div>
                <div className={`text-xs transition-colors duration-300 ${
                  isComplete ? 'text-green-400' :
                  isActive ? 'text-white font-medium' :
                  'text-slate-600'
                }`}>
                  {item.step}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenerationProgress;
