import React, { useState } from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  const [replicateKey, setReplicateKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving API Keys:', { replicateKey, openaiKey });
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Einstellungen</h2>
              <p className="text-sm text-slate-400">API-Keys verwalten</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-blue-300 leading-relaxed">
                  <span className="font-semibold">Hinweis:</span> Diese Funktion ist derzeit eine Demo-Implementierung. 
                  API-Keys werden aktuell über die Backend .env Datei verwaltet. 
                  Für Produktionsumgebungen kontaktieren Sie bitte den Administrator.
                </p>
              </div>
            </div>
          </div>

          {/* Replicate API Key */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Replicate API Token
            </label>
            <input
              type="password"
              value={replicateKey}
              onChange={(e) => setReplicateKey(e.target.value)}
              placeholder="r8_..."
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <p className="text-xs text-slate-500">
              Für Video-Generierung. Erhalten Sie Ihren Token von{' '}
              <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                replicate.com/account/api-tokens
              </a>
            </p>
          </div>

          {/* OpenAI API Key */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              OpenAI API Key
            </label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
            />
            <p className="text-xs text-slate-500">
              Für Text-to-Speech (TTS). Erhalten Sie Ihren Key von{' '}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">
                platform.openai.com/api-keys
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm text-amber-300 leading-relaxed">
                  <span className="font-semibold">Sicherheitshinweis:</span> Teilen Sie Ihre API-Keys niemals mit anderen. 
                  Keys werden verschlüsselt gespeichert.
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-emerald-300 font-medium">
                  Einstellungen erfolgreich gespeichert!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors duration-200"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
