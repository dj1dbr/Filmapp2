import React from 'react';

const CreditsSection = () => {
  const creditServices = [
    {
      name: 'Replicate',
      description: 'KI-Video-Generierung',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      url: 'https://replicate.com/account/billing',
      color: 'from-purple-500 to-pink-600',
      shadowColor: 'shadow-purple-500/20',
      hoverShadow: 'hover:shadow-purple-500/40',
      usage: 'Generiert Videos für jede Szene',
      cost: '~$0.01-0.10 pro Video'
    },
    {
      name: 'OpenAI',
      description: 'Text-to-Speech (TTS)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      url: 'https://platform.openai.com/account/billing',
      color: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/20',
      hoverShadow: 'hover:shadow-emerald-500/40',
      usage: 'Generiert AI-Stimmen für Dialoge',
      cost: '~$0.015 pro 1000 Zeichen'
    }
  ];

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white" style={{fontFamily: 'Space Grotesk, sans-serif'}}>API-Credits aufladen</h2>
          <p className="text-sm text-slate-400">Guthaben für KI-Services verwalten</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-indigo-300 leading-relaxed">
              Diese App verwendet externe KI-Services. Für die Produktion benötigen Sie Credits bei den jeweiligen Anbietern. 
              <span className="font-semibold text-indigo-200"> Demo-Modus funktioniert kostenlos!</span>
            </p>
          </div>
        </div>
      </div>

      {/* Credit Services Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {creditServices.map((service, index) => (
          <div
            key={index}
            className="group bg-slate-950/50 border border-slate-800/50 rounded-xl p-5 hover:border-slate-700/50 transition-all duration-300"
          >
            {/* Service Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg ${service.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-slate-400">{service.description}</p>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-400">{service.usage}</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-400">{service.cost}</span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3 px-4 bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold rounded-lg shadow-lg ${service.shadowColor} ${service.hoverShadow} transition-all duration-300 text-center group-hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Credits aufladen</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-slate-800/50">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="text-green-400 font-semibold">Tipp:</span> Starten Sie mit kleinen Credits-Paketen ($10-20) um die App zu testen. 
              Der Demo-Modus funktioniert ohne Credits und zeigt Ihnen, wie die App arbeitet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsSection;
