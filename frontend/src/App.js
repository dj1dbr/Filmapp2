import { useState, useEffect } from "react";
import "@/App.css";
import { Toaster, toast } from "sonner";
import ScriptInput from "@/components/ScriptInput";
import StyleSelector from "@/components/StyleSelector";
import QualitySelector from "@/components/QualitySelector";
import GenerationProgress from "@/components/GenerationProgress";
import VideoPreview from "@/components/VideoPreview";
import CreditsSection from "@/components/CreditsSection";
import CostEstimator from "@/components/CostEstimator";
import SettingsModal from "@/components/SettingsModal";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [screenplay, setScreenplay] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedQuality, setSelectedQuality] = useState("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [exportInfo, setExportInfo] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [generationDuration, setGenerationDuration] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!screenplay.trim()) {
      toast.error("Bitte geben Sie ein Drehbuch ein");
      return;
    }

    try {
      setIsGenerating(true);
      setProgress(0);
      setExportInfo(null);
      setScenes([]);
      setGenerationDuration(null);
      const now = Date.now();
      setStartTime(now);

      const response = await axios.post(`${API}/generate-film`, {
        screenplay: screenplay,
        style: selectedStyle,
        quality: selectedQuality
      });

      const { job_id } = response.data;
      setJobId(job_id);
      toast.success("Filmgenerierung gestartet!");

      // Poll for status
      pollJobStatus(job_id);
    } catch (error) {
      console.error("Error starting generation:", error);
      toast.error("Fehler beim Starten der Generierung");
      setIsGenerating(false);
    }
  };

  const pollJobStatus = async (id) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${API}/job/${id}`);
        const jobData = response.data;

        setProgress(jobData.progress);
        setStatus(jobData.status);

        if (jobData.status === "completed") {
          clearInterval(interval);
          setIsGenerating(false);
          setExportInfo(jobData.export_info);
          setGenerationDuration(jobData.generation_duration);
          toast.success("Film erfolgreich generiert!");
          
          // Fetch scenes
          fetchScenes(id);
        } else if (jobData.status === "failed") {
          clearInterval(interval);
          setIsGenerating(false);
          toast.error(`Filmgenerierung fehlgeschlagen: ${jobData.error || 'Unbekannter Fehler'}`);
        }
      } catch (error) {
        console.error("Error polling status:", error);
      }
    }, 2000);
  };

  const fetchScenes = async (id) => {
    try {
      const response = await axios.get(`${API}/job/${id}/scenes`);
      setScenes(response.data.scenes || []);
      if (response.data.export_info) {
        setExportInfo(response.data.export_info);
      }
    } catch (error) {
      console.error("Error fetching scenes:", error);
    }
  };

  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Paradoxon Film Generator</h1>
                  <p className="text-slate-400 text-sm mt-1">Vollautomatische KI-Filmproduktion mit Direkt-Streaming</p>
                </div>
              </div>
              
              {/* Version Badge */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">v2.0 • Demo Mode</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <ScriptInput 
                screenplay={screenplay}
                onScriptChange={setScreenplay}
                disabled={isGenerating}
              />
              
              <StyleSelector 
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                disabled={isGenerating}
              />
              
              <QualitySelector
                selectedQuality={selectedQuality}
                onQualityChange={setSelectedQuality}
                disabled={isGenerating}
              />
              
              {/* Credits Section - After Settings */}
              <CreditsSection />
              
              <button
                data-testid="generate-film-btn"
                onClick={handleGenerate}
                disabled={isGenerating || !screenplay.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generiere Film...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Film generieren</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column - Progress & Preview */}
            <div className="space-y-6">
              {isGenerating || progress > 0 ? (
                <GenerationProgress 
                  progress={progress}
                  status={status}
                  isGenerating={isGenerating}
                  generationDuration={generationDuration}
                  startTime={startTime}
                />
              ) : (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Bereit zur Generierung</h3>
                  <p className="text-slate-400 mb-4">Geben Sie Ihr Drehbuch ein, wählen Sie Stil und Qualität</p>
                  
                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {[
                      { icon: '🎬', text: '9 Film-Stile' },
                      { icon: '🎨', text: '4 Qualitätsstufen' },
                      { icon: '🎙️', text: 'AI-Stimmen' },
                      { icon: '📊', text: 'Echtzeit-Status' }
                    ].map((feature, idx) => (
                      <div key={idx} className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <div className="text-2xl mb-1">{feature.icon}</div>
                        <div className="text-xs text-slate-400">{feature.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {exportInfo && scenes.length > 0 && (
                <VideoPreview 
                  videoUrl={null}
                  scenes={scenes}
                  exportInfo={exportInfo}
                />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div>
                Powered by Replicate AI, OpenAI TTS & Emergent LLM
              </div>
              <div className="flex items-center gap-4">
                <span>v2.0.0</span>
                <span>•</span>
                <span>Demo Mode Aktiv</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
