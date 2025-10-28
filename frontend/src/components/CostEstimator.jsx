import React, { useMemo } from 'react';

const CostEstimator = ({ screenplay, selectedQuality, selectedStyle }) => {
  // Estimate costs based on screenplay
  const costEstimate = useMemo(() => {
    if (!screenplay || screenplay.trim().length === 0) {
      return null;
    }

    // Count scenes (INT. or EXT.)
    const sceneMatches = screenplay.match(/\b(INT\.|EXT\.)/gi) || [];
    const estimatedScenes = sceneMatches.length || 1;

    // Count dialog characters (approximation)
    const lines = screenplay.split('\n');
    let dialogCharCount = 0;
    let inDialog = false;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      // Character name (all caps)
      if (trimmedLine.length > 0 && trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 30) {
        inDialog = true;
      } else if (trimmedLine.length === 0) {
        inDialog = false;
      } else if (inDialog && !trimmedLine.startsWith('(')) {
        dialogCharCount += trimmedLine.length;
      }
    });

    // Video costs based on quality
    const videoCosts = {
      low: 0.01,
      medium: 0.03,
      high: 0.06,
      ultra: 0.10
    };

    const videoCostPerScene = videoCosts[selectedQuality] || 0.03;
    const totalVideoCost = estimatedScenes * videoCostPerScene;

    // TTS costs (OpenAI: $0.015 per 1000 characters)
    const ttsCost = (dialogCharCount / 1000) * 0.015;

    const totalCost = totalVideoCost + ttsCost;

    return {
      scenes: estimatedScenes,
      dialogChars: dialogCharCount,
      videoCost: totalVideoCost,
      ttsCost: ttsCost,
      totalCost: totalCost
    };
  }, [screenplay, selectedQuality]);

  if (!costEstimate) {
    return null;
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Kostenschätzung</h2>
          <p className="text-sm text-slate-400">Geschätzte Kosten für dieses Projekt</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3">
        {/* Scenes */}
        <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span className="text-sm text-slate-300">Szenen (Video)</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-white">${costEstimate.videoCost.toFixed(2)}</div>
            <div className="text-xs text-slate-500">{costEstimate.scenes} Szenen</div>
          </div>
        </div>

        {/* TTS */}
        <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm text-slate-300">Stimmen (TTS)</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-white">${costEstimate.ttsCost.toFixed(3)}</div>
            <div className="text-xs text-slate-500">{Math.round(costEstimate.dialogChars / 1000)}k Zeichen</div>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/30 mt-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-base font-semibold text-white">Gesamt (ca.)</span>
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            ${costEstimate.totalCost.toFixed(2)}
          </div>
        </div>

        {/* Info Note */}
        <div className="flex items-start gap-2 p-3 bg-slate-950/30 rounded-lg border border-slate-800/30 mt-3">
          <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dies ist eine Schätzung. Tatsächliche Kosten können je nach API-Nutzung variieren. Demo-Modus ist kostenlos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
