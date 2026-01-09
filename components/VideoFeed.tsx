import React from 'react';
import { Activity, WifiOff } from 'lucide-react';
import { Channel } from '../types';
import { useLanguage } from '../LanguageContext';

interface VideoFeedProps {
  channel: Channel;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ channel }) => {
  const { t } = useLanguage();

  return (
    <div 
      className="relative w-full h-full bg-slate-950 group overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-200"
    >
      {/* Video Content Placeholder or Stream */}
      <div className="absolute inset-0 bg-slate-900">
         {channel.status === 'live' || channel.status === 'recording' ? (
             <div className={`w-full h-full bg-gradient-to-br ${channel.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                {/* Simulated Video Content */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60"></div>
             </div>
         ) : null}
      </div>

      {/* Status Overlay - Top (Always Visible) */}
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10">
         <div className="flex flex-col gap-0.5 pointer-events-auto">
            <span className="text-[10px] font-mono text-white/70">
                CH-{channel.id.toString().padStart(2, '0')}
            </span>
            <span className="text-sm font-semibold text-white drop-shadow-md tracking-tight">
                {channel.name}
            </span>
         </div>
      </div>

      {/* Persistent Status Indicators (Always Visible) */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
           {channel.status === 'live' && (
             <div className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
               <span className="text-[10px] font-bold text-white uppercase tracking-wider">{t.live}</span>
             </div>
           )}
           {channel.status === 'recording' && (
             <div className="flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
               <span className="text-[10px] font-bold text-white uppercase tracking-wider">{t.rec}</span>
             </div>
           )}
      </div>

      {/* Error / Loading States */}
      {channel.status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-0">
           {/* Diagonal Stripes Pattern */}
           <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 10%, transparent 10%, transparent 50%, #ffffff 50%, #ffffff 60%, transparent 60%, transparent 100%)', backgroundSize: '10px 10px' }}></div>
           
           <div className="relative z-10 flex flex-col items-center gap-2 text-slate-600">
               <WifiOff size={32} strokeWidth={1.5} />
               <span className="text-xs font-mono uppercase tracking-widest font-bold">{t.signalLost}</span>
           </div>
        </div>
      )}

       {channel.status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-slate-900 z-10">
           <div className="w-5 h-5 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin mb-3"></div>
           <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{t.connecting}</span>
        </div>
      )}

      {/* Hover Focus Effect */}
      <div className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-blue-500/50 pointer-events-none transition-all duration-200"></div>
    </div>
  );
};

export default VideoFeed;