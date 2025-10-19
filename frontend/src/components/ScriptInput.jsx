import React, { useState, useCallback } from 'react';

const ScriptInput = ({ screenplay, onScriptChange, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        onScriptChange(event.target.result);
      };
      reader.readAsText(file);
    }
  }, [disabled, onScriptChange]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        onScriptChange(event.target.result);
      };
      reader.readAsText(file);
    }
  }, [onScriptChange]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Drehbuch eingeben</h2>
            <p className="text-sm text-slate-400">INT./EXT., Kamera, Dialoge, Licht, Sound</p>
          </div>
        </div>
        
        {/* File Upload Button */}
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileSelect}
            disabled={disabled}
            className="hidden"
          />
          <div className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>Datei laden</span>
          </div>
        </label>
      </div>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isDragging ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-900' : ''
        }`}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm z-10 flex items-center justify-center border-2 border-dashed border-cyan-500 rounded-xl">
            <div className="text-center">
              <svg className="w-12 h-12 text-cyan-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-cyan-300 font-medium">Drehbuch-Datei hier ablegen</p>
            </div>
          </div>
        )}
        
        <textarea
          data-testid="screenplay-input"
          value={screenplay}
          onChange={(e) => onScriptChange(e.target.value)}
          disabled={disabled}
          placeholder={`Beispiel:

INT. WOHNZIMMER - TAG

KAMERA: Wide shot, langsames Zoom
LICHT: Warmes Tageslicht durch große Fenster
SOUND: Leise Klaviermusik im Hintergrund

Ein modernes, gemütliches Wohnzimmer. Eine junge Frau sitzt auf dem Sofa und liest ein Buch.

ANNA
Das ist unglaublich...

Sie schaut auf und lächelt.

EXT. PARK - TAG

KAMERA: Tracking shot, folgt der Hauptfigur
LICHT: Goldene Stunde, warme Töne

Anna geht durch einen herbstlichen Park.`}
          className="w-full h-96 bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-mono text-sm resize-none"
          style={{lineHeight: '1.8'}}
        />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Verwenden Sie INT./EXT. für Szenen, GROSSBUCHSTABEN für Charakternamen</span>
        </div>
        <div className="text-sm text-slate-500">
          {screenplay.length} Zeichen
        </div>
      </div>
    </div>
  );
};

export default ScriptInput;
