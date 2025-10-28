import React, { useState } from 'react';

const VideoPreview = ({ videoUrl, scenes, exportInfo }) => {
  const [selectedScene, setSelectedScene] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleSceneClick = (scene) => {
    setSelectedScene(scene);
    if (scene.video_url && !scene.video_url.startsWith('placeholder')) {
      setSelectedVideoUrl(scene.video_url);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  const downloadUrls = exportInfo?.download_urls || [];
  const sceneVideos = exportInfo?.scene_videos || [];
  const totalFileSize = exportInfo?.total_file_size || 0;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl" data-testid="video-preview-container">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>Film Vorschau</h2>
          <p className="text-sm text-slate-400">
            {exportInfo?.storage_type === 'replicate_urls' ? 'Direkt-Streaming' : 'Ihr generierter Film'}
          </p>
        </div>
      </div>
      
      {/* Video Player */}
      {selectedVideoUrl ? (
        <div className="bg-slate-950 rounded-xl overflow-hidden mb-6 aspect-video border border-slate-800 shadow-2xl">
          <video 
            controls 
            className="w-full h-full"
            src={selectedVideoUrl}
            data-testid="video-player"
            autoPlay
          >
            Ihr Browser unterstützt keine Videos.
          </video>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-xl overflow-hidden mb-6 aspect-video flex items-center justify-center border border-slate-800 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="text-center relative z-10">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <p className="text-slate-300 mb-2 font-medium">Film erfolgreich generiert</p>
            <p className="text-sm text-slate-500">Klicken Sie auf eine Szene zum Abspielen</p>
          </div>
        </div>
      )}
      
      {/* Film Info */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 transition-all duration-300 hover:border-indigo-500/50">
          <div className="text-2xl font-bold text-white mb-1">{scenes.length}</div>
          <div className="text-xs text-slate-400">Szenen</div>
        </div>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 transition-all duration-300 hover:border-indigo-500/50">
          <div className="text-2xl font-bold text-white mb-1">{exportInfo?.resolution || '1024x576'}</div>
          <div className="text-xs text-slate-400">Auflösung</div>
        </div>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 transition-all duration-300 hover:border-indigo-500/50">
          <div className="text-2xl font-bold text-white mb-1">MP4</div>
          <div className="text-xs text-slate-400">Format</div>
        </div>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 transition-all duration-300 hover:border-indigo-500/50">
          <div className="text-lg font-bold text-white mb-1">{formatFileSize(totalFileSize)}</div>
          <div className="text-xs text-slate-400">Gesamtgröße</div>
        </div>
      </div>
      
      {/* Demo Mode Warning */}
      {scenes.some(s => s.is_demo) && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-amber-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Demo-Modus:</strong> Videos sind Platzhalter. Fügen Sie Replicate-Guthaben hinzu für echte Video-Generierung.
            </span>
          </div>
        </div>
      )}
      
      {/* Storage Info */}
      {exportInfo?.storage_type && (
        <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-indigo-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {exportInfo.storage_type === 'replicate_urls' 
                ? '✓ Videos werden direkt gestreamt'
                : `✓ Gespeichert in ${exportInfo.storage_type}`
              }
            </span>
          </div>
        </div>
      )}
      
      {/* Scene List */}
      {scenes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            Szenen ({scenes.length})
            <span className="text-xs text-slate-500 font-normal">Klicken zum Abspielen</span>
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {scenes.map((scene, index) => {
              const hasVideo = scene.video_url && !scene.video_url.startsWith('placeholder');
              const isSelected = selectedScene?.scene_number === scene.scene_number;
              
              return (
                <div
                  key={index}
                  data-testid={`scene-${index}`}
                  className={`scene-card bg-slate-950/50 rounded-xl p-4 border transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20'
                      : 'border-slate-800/50 hover:border-indigo-500/50 hover:bg-slate-900/50'
                  } ${!hasVideo && 'opacity-50'}`}
                  onClick={() => hasVideo && handleSceneClick(scene)}
                >
                  <div className="flex items-start gap-4">
                    {/* Scene Number Badge */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-lg font-bold text-white shadow-lg">
                      {scene.scene_number}
                    </div>
                    
                    {/* Scene Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <span>{scene.type}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300">{scene.location}</span>
                      </div>
                      
                      {/* Scene Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          💬 {scene.dialogs?.length || 0} Dialoge
                        </span>
                        <span className="flex items-center gap-1">
                          👥 {scene.characters?.length || 0} Charaktere
                        </span>
                        {scene.file_size && (
                          <span className="flex items-center gap-1">
                            💾 {formatFileSize(scene.file_size)}
                          </span>
                        )}
                        {scene.generation_time && (
                          <span className="flex items-center gap-1">
                            ⏱️ {scene.generation_time.toFixed(1)}s
                          </span>
                        )}
                      </div>
                      
                      {/* Video Status Badge */}
                      <div className="flex items-center gap-2">
                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Video verfügbar
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-slate-700/50 text-slate-400 border border-slate-600/50">
                            Video nicht verfügbar
                          </span>
                        )}
                        {scene.is_demo && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-400/10 text-amber-400 border border-amber-400/30">
                            Demo
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Play Icon */}
                    {hasVideo && (
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' 
                            : 'bg-slate-800 group-hover:bg-indigo-500/50'
                        }`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Download All Button */}
      {scenes.length > 0 && scenes.some(s => s.video_url && !s.video_url.startsWith('placeholder')) && (
        <div className="mt-6">
          <button
            data-testid="download-all-button"
            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3"
            onClick={() => {
              const validUrls = scenes
                .filter(s => s.video_url && !s.video_url.startsWith('placeholder'))
                .map(s => s.video_url);
              
              validUrls.forEach((url, index) => {
                setTimeout(() => {
                  window.open(url, '_blank');
                }, index * 100);
              });
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Alle Szenen herunterladen ({scenes.filter(s => s.video_url && !s.video_url.startsWith('placeholder')).length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
