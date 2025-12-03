import React from 'react';
import { ChevronRight, ChevronDown, RotateCcw, RotateCw, Pause, Lock, Search, Bell, Download } from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import { CHANNELS } from '../constants';

const PlaybackView: React.FC = () => {
  const activeChannel = CHANNELS[0]; // Default to first channel for demo

  return (
    <div className="flex flex-col h-full w-full bg-[#0a0a0a]">
        {/* Playback Header (Replaces Global Header for this view) */}
        <div className="h-14 bg-[#111111] border-b border-gray-800 flex items-center justify-between px-2 md:px-4 z-10 shrink-0">
           {/* Left: Breadcrumbs */}
           <div className="flex items-center gap-1 md:gap-2 text-sm text-gray-400">
               <span className="hover:text-white cursor-pointer transition-colors hidden sm:block">Shisa Cloud</span>
               <ChevronRight size={14} className="text-gray-600 hidden sm:block" />
               <span className="hover:text-white cursor-pointer transition-colors hidden xs:block">News Channels</span>
               <ChevronRight size={14} className="text-gray-600 hidden xs:block" />
               <div className="flex items-center gap-1 text-white font-medium bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="truncate max-w-[150px] md:max-w-none">{activeChannel.name}</span>
                  <ChevronDown size={12} />
               </div>
           </div>

           {/* Right: Common Utils */}
           <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-[#111111] shadow-sm">
                AD
              </div>
           </div>
        </div>

        {/* Sub-Header / Tabs */}
        <div className="px-4 md:px-6 pt-4 border-b border-gray-800 bg-[#111111] flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
           <button className="text-blue-400 border-b-2 border-blue-400 pb-3 text-sm font-medium tracking-wide whitespace-nowrap">Video</button>
           <button className="text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-700 pb-3 text-sm font-medium tracking-wide transition-all whitespace-nowrap">Channel Info</button>
           <button className="text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-700 pb-3 text-sm font-medium tracking-wide transition-all whitespace-nowrap">Analytics</button>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-hidden p-2 md:p-6 relative">
             {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{
                    backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', 
                    backgroundSize: '20px 20px'
                }}>
            </div>

            <div className="w-full h-full max-w-6xl max-h-[80vh] bg-black border border-gray-800 relative shadow-2xl rounded-sm overflow-hidden ring-1 ring-white/5">
                <VideoFeed channel={activeChannel} />
            </div>
        </div>

        {/* Timeline & Footer Controls */}
        <div className="bg-[#111111] border-t border-gray-800 shrink-0">
            {/* Timeline Component */}
            <Timeline /> 
            
            {/* Playback Controls Footer */}
            <div className="px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-gray-800 bg-[#0e0e0e]">
                {/* Playback Transport */}
                <div className="flex items-center gap-4 w-full lg:w-auto justify-between md:justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"><RotateCcw size={16} /></button>
                        <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all active:scale-95">
                            <Pause size={18} fill="currentColor" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"><RotateCw size={16} /></button>
                    </div>
                    
                    <div className="h-8 w-px bg-gray-800 mx-2 hidden md:block"></div>

                    <div className="flex flex-col items-start">
                       <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Speed</span>
                       <button className="flex items-center gap-1 text-gray-300 hover:text-white text-xs font-mono mt-0.5">
                          1.0X <ChevronDown size={10} />
                       </button>
                    </div>
                </div>

                {/* Range & Export Tools */}
                <div className="flex-1 w-full lg:px-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-end">
                    
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                        {/* Date/Time Input Start */}
                        <div className="flex items-center gap-2 bg-[#050505] p-1 rounded border border-gray-700 shadow-inner w-full md:w-auto">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-800 py-1">
                                <Lock size={12} className="text-gray-500" />
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Start</span>
                            </div>
                            <input type="text" defaultValue="2025/12/03 12:16:00" className="bg-transparent border-none text-xs font-mono text-blue-400 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                        
                        <span className="text-gray-600 font-light hidden sm:block">to</span>

                        {/* Date/Time Input End */}
                        <div className="flex items-center gap-2 bg-[#050505] p-1 rounded border border-gray-700 shadow-inner w-full md:w-auto">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-800 py-1">
                                <Lock size={12} className="text-gray-500" />
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">End</span>
                            </div>
                            <input type="text" defaultValue="2025/12/03 12:16:00" className="bg-transparent border-none text-xs font-mono text-blue-400 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                    </div>

                    <div className="h-6 w-px bg-gray-800 mx-2 hidden lg:block"></div>

                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium rounded border border-gray-600 transition-all shadow-sm active:bg-gray-600">
                       <Download size={14} />
                       <span>Export Clip</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlaybackView;