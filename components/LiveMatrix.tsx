import React, { useState } from 'react';
import { Grid, LayoutTemplate, Layers, Search, Bell, Menu, Grid2x2, Grid3x3, Square } from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import ProfileDropdown from './ProfileDropdown';
import { CHANNELS } from '../constants';
import { useLanguage } from '../LanguageContext';

interface LiveMatrixProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
  onChannelSelect: (id: number) => void;
}

const LiveMatrix: React.FC<LiveMatrixProps> = ({ onToggleSidebar, isSidebarVisible, onChannelSelect }) => {
  const [gridSize, setGridSize] = useState(4);
  const [position, setPosition] = useState(100); // Live usually at the end
  const { t } = useLanguage();
  
  const iconProps = { strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };

  const getGridCols = () => {
    if (gridSize === 1) return 'grid-cols-1';
    if (gridSize === 2) return 'grid-cols-1 sm:grid-cols-2'; // Split view
    if (gridSize === 4) return 'grid-cols-1 sm:grid-cols-2'; // 2x2
    if (gridSize === 9) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'; // 3x3
    if (gridSize === 16) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // 4x4
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950">
        {/* Toolbar Header - z-30 for dropdown overlap */}
        <div className="h-12 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-3 z-30 shrink-0 shadow-sm/50">
           {/* Left: Sidebar & Grid Controls */}
           <div className="flex items-center gap-3">
              <button 
                onClick={onToggleSidebar}
                className={`p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-colors ${isSidebarVisible ? 'text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-950/30' : ''}`}
                title="Toggle Sidebar"
              >
                <Menu size={18} {...iconProps} />
              </button>

              <div className="h-4 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>

              {/* Grid Toggle Group */}
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-0.5 rounded-md border border-gray-200 dark:border-slate-700">
                 {[
                    { size: 1, Icon: Square, title: "1x1" },
                    { size: 4, Icon: Grid2x2, title: "2x2" },
                    { size: 9, Icon: Grid3x3, title: "3x3" },
                    { size: 16, Icon: Grid, title: "4x4" },
                 ].map(({ size, Icon, title }) => (
                     <button 
                       key={size}
                       onClick={() => setGridSize(size)}
                       className={`p-1.5 rounded-[4px] transition-all ${gridSize === size ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'} ${size > 4 ? 'hidden sm:block' : ''}`}
                       title={title}
                     >
                       <Icon size={14} {...iconProps} />
                     </button>
                 ))}
              </div>
           </div>

           {/* Right: Search & Profile */}
           <div className="flex items-center gap-3">
              <div className="relative hidden md:block group">
                 <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" {...iconProps} />
                 <input 
                   type="text" 
                   placeholder={t.findCamera}
                   className="bg-gray-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 text-sm rounded-md pl-8 pr-3 py-1.5 w-48 lg:w-64 text-gray-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 dark:placeholder-slate-600 transition-all"
                 />
              </div>
              
              <button className="relative p-1.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors">
                 <Bell size={18} {...iconProps} />
                 <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              
              <div className="w-px h-4 bg-gray-200 dark:bg-slate-700 mx-1"></div>
              
              <ProfileDropdown />
           </div>
        </div>

        {/* Video Grid - Gap-px for a "Video Wall" look */}
        <div className="flex-1 bg-gray-200 dark:bg-slate-950 p-px overflow-y-auto md:overflow-hidden relative">
           <div className={`grid gap-px w-full h-full min-h-[50vh] auto-rows-fr ${getGridCols()}`}>
              {CHANNELS.map(channel => (
                <div key={channel.id} onClick={() => onChannelSelect(channel.id)} className="cursor-pointer h-full overflow-hidden">
                  <VideoFeed channel={channel} />
                </div>
              ))}
           </div>
        </div>

        {/* Timeline */}
        <Timeline position={position} onPositionChange={setPosition} />
    </div>
  );
};

export default LiveMatrix;