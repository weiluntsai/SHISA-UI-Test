import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Timeline: React.FC = () => {
  // Generate 24 hour ticks
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <div className="h-24 bg-[#121212] border-t border-gray-800 flex flex-col select-none shrink-0">
      {/* Timeline Controls */}
      <div className="h-8 flex items-center justify-between px-4 border-b border-gray-800 bg-[#1a1a1a]">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400 hover:text-white cursor-pointer transition-colors">
              <Calendar size={14} />
              <span className="text-xs font-mono">2025/12/14</span>
            </div>
            <div className="h-3 w-px bg-gray-700"></div>
            <div className="flex gap-2">
               <button className="text-gray-400 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
               <button className="text-white hover:text-blue-400 transition-colors"><Play size={16} fill="currentColor" /></button>
               <button className="text-gray-400 hover:text-white transition-colors"><ChevronRight size={16} /></button>
            </div>
            <div className="text-xs text-blue-400 font-mono cursor-pointer hover:text-blue-300">1X SPEED</div>
         </div>
         <div className="flex gap-2">
            <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors">1H</button>
            <button className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600/30 transition-colors">24H</button>
         </div>
      </div>

      {/* Scrubber Area */}
      <div className="flex-1 relative overflow-hidden cursor-crosshair group">
        {/* Playhead */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,0.5)] pointer-events-none">
           <div className="absolute top-0 -translate-x-1/2 -mt-1 w-3 h-3 bg-red-500 transform rotate-45"></div>
        </div>

        {/* Time Ticks */}
        <div className="absolute inset-0 flex items-end">
           {hours.map(hour => (
             <div key={hour} className="flex-1 flex flex-col items-start h-full justify-end border-l border-gray-800 relative group-hover:border-gray-700 transition-colors">
                {/* Recording Blocks (Simulated Data) */}
                <div className="absolute bottom-4 left-0 right-0 h-2 bg-green-900/40"></div>
                {hour % 3 === 0 && <div className="absolute bottom-4 left-10 right-2 h-2 bg-green-500/80"></div>}
                
                {/* Tick Label */}
                <span className="text-[10px] text-gray-500 font-mono ml-1 mb-1">{hour.toString().padStart(2, '0')}:00</span>
                <div className="h-1.5 w-px bg-gray-600"></div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;