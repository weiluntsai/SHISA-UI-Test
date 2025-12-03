import React, { useState } from 'react';
import { Maximize2, Settings, MoreVertical, Activity } from 'lucide-react';
import { Channel } from '../types';

interface VideoFeedProps {
  channel: Channel;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ channel }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full bg-black group overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Simulated Video Content */}
      <div className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-40 animate-pulse-slow`}></div>
      
      {/* Scan lines effect overlay - using CSS pattern simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '20px 20px'
           }}>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/90 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
            CH-{channel.id.toString().padStart(2, '0')}
          </span>
          <span className="text-sm font-semibold text-white shadow-sm truncate max-w-[120px] md:max-w-[200px]">
            {channel.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
           {channel.status === 'live' && (
             <div className="flex items-center gap-1.5 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-red-400">LIVE</span>
             </div>
           )}
           {channel.status === 'recording' && (
             <div className="flex items-center gap-1.5 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
               <span className="text-[10px] font-bold text-blue-400">REC</span>
             </div>
           )}
           {channel.status === 'error' && (
             <div className="flex items-center gap-1.5 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/30">
               <Activity size={10} className="text-yellow-500" />
               <span className="text-[10px] font-bold text-yellow-500">NO SIGNAL</span>
             </div>
           )}
        </div>
      </div>

      {/* Center Status for Error/Loading */}
      {channel.status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
           <Activity size={32} className="mb-2 opacity-50" />
           <span className="text-xs font-mono uppercase tracking-widest">Signal Lost</span>
        </div>
      )}
       {channel.status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
           <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-2"></div>
           <span className="text-xs font-mono uppercase tracking-widest">Connecting...</span>
        </div>
      )}

      {/* Timestamp Overlay (Bottom Left) */}
      <div className="absolute bottom-2 left-2 font-mono text-xs text-green-400/80 bg-black/60 px-1 rounded">
        {new Date().toLocaleTimeString()} <span className="text-gray-400">|</span> 30FPS
      </div>

      {/* Hover Controls (Bottom Right) */}
      <div className={`absolute bottom-2 right-2 flex gap-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"><Maximize2 size={14} /></button>
        <button className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"><Settings size={14} /></button>
        <button className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"><MoreVertical size={14} /></button>
      </div>
    </div>
  );
};

export default VideoFeed;