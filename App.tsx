import React, { useState } from 'react';
import { 
  Grid, 
  LayoutTemplate, 
  Settings, 
  Video, 
  Download, 
  Users, 
  Search, 
  Bell, 
  ChevronLeft,
  ChevronRight,
  Layers,
  Activity
} from 'lucide-react';

import VideoFeed from './components/VideoFeed';
import Timeline from './components/Timeline';
import SidebarItem from './components/SidebarItem';
import { CHANNELS } from './constants';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [gridSize, setGridSize] = useState(4); // 2x2 (4), 3x3 (9), 4x4 (16) basically

  // Dynamically calculate grid class based on state (mock implementation for visual only)
  // In a real app, this would change the `grid-cols` class.
  const getGridCols = () => {
    if (gridSize === 2) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
    if (gridSize === 4) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    if (gridSize === 9) return 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <div className={`flex flex-col bg-[#111111] border-r border-gray-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        {/* Logo Area */}
        <div className="h-14 flex items-center px-4 border-b border-gray-800 bg-[#0f0f0f]">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
             <svg viewBox="0 0 32 32" className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.439 1.592a.078.078 0 0 0-.022-.142c-.951-.245-5.52-1.41-6.47-1.444a7.91 7.91 0 0 0-6.372 3.491c-2.145 2.987-4.293 3-7.54 4.6-1.663.823-1.215 2.792.577 4.208.147-.232-.182.686.687 1.9a4.625 4.625 0 0 0 3.268 1.711.077.077 0 0 0 .088-.084 3.687 3.687 0 0 1 2.783-3.984 5.832 5.832 0 0 1 5.427 1.56.079.079 0 0 1-.094.124c-2.089-1.049-3.014-.472-3.709.2-.46.449-1.111 1.586-1.543 2.061a3.149 3.149 0 0 1-1.267.771 2.231 2.231 0 0 1-1.325-.316.076.076 0 0 0-.109.091 2.308 2.308 0 0 1-.03 1.395 2.06 2.06 0 0 0-.049 1.233 1.8 1.8 0 0 0 .648 1.053c1.228.837 2.178.7 1.768 2.295a.078.078 0 0 0 .1.1c.735-.311.841-.621.99-1.339l.006-.02a4.448 4.448 0 0 1 3.18-2.949c1.628-.492 2.5.064 2.955 1.7 1.016 3.7 3.934 5.193 7.22 3.762a4.191 4.191 0 0 0 .825-.474 1.054 1.054 0 0 1 .934-.255 4.769 4.769 0 0 0 2.215-.05 6.63 6.63 0 0 0 3.326-2.083 6.51 6.51 0 0 0 1.285-2.114 13.094 13.094 0 0 0 .4-8.139 7.657 7.657 0 0 0-.565-1.531c-2.99-5.436-8.553-7.006-13.294-4.785a3.843 3.843 0 0 1-3.412.07 1.545 1.545 0 0 1-.943-1.744 1.755 1.755 0 0 1 .536-.972c.081.035-.36.789-.144 1.4a2.234 2.234 0 0 0 2.454 1.124 20.018 20.018 0 0 0 5.216-2.424Zm-4.042 5.835a.082.082 0 0 1-.034-.143 8.225 8.225 0 0 1 3.318-1.663c7.1-1.4 10.221 5.119 10.114 9.168s-2.372 6.43-3.886 6.826c-1.943.508-3.09.054-3.8-.868a3.87 3.87 0 0 1-.661-3.47 1.972 1.972 0 0 1 2.115-1.3c1.267.03 1.307 1.369 1.307 2.278a.076.076 0 0 0 .139.045 2.7 2.7 0 0 0 .062-3.294 2.566 2.566 0 0 0-2.946-.666 4.541 4.541 0 0 0-1.735 7.607 3.34 3.34 0 0 0 1.576.712.078.078 0 0 1 .032.137 3.854 3.854 0 0 1-1.925.845 3.507 3.507 0 0 1-3.258-1.795 5.1 5.1 0 0 1 1.539-6.677 4.62 4.62 0 0 0 1.308-1.587 5.546 5.546 0 0 0 .484-2.91 2.492 2.492 0 0 0-.072-.346 2.842 2.842 0 0 0-.291-.626 4.579 4.579 0 0 0-2.051-1.81 6.8 6.8 0 0 0-1.335-.465Zm-5.534-1.059a.078.078 0 0 1-.026.15c-.538.035-1.51.227-1.589 1.147-.034.313-.688.531-1.105.3a1.214 1.214 0 0 1-.508-1.318 1.316 1.316 0 0 1 1.67-.862 12.038 12.038 0 0 1 1.558.581Z" data-name="Path 575"></path>
             </svg>
          </div>
          {!collapsed && <span className="ml-3 font-bold text-lg tracking-tight text-gray-100">SHISA<span className="text-blue-500">.IO</span></span>}
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800">
          <div className={`px-4 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider ${collapsed && 'hidden'}`}>Monitor</div>
          <SidebarItem icon={LayoutTemplate} label="Live Matrix" active={true} collapsed={collapsed} />
          <SidebarItem icon={Video} label="Playback" collapsed={collapsed} />
          <SidebarItem icon={Activity} label="Events" collapsed={collapsed} />
          
          <div className={`px-4 mt-6 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider ${collapsed && 'hidden'}`}>System</div>
          <SidebarItem icon={Download} label="Exports" collapsed={collapsed} />
          <SidebarItem icon={Users} label="Users" collapsed={collapsed} />
          <SidebarItem icon={Settings} label="Configuration" collapsed={collapsed} />
        </div>

        {/* Bottom Toggle */}
        <div className="p-4 border-t border-gray-800">
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="flex items-center justify-center w-full p-2 rounded hover:bg-gray-800 text-gray-400 transition-colors"
           >
             {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        
        {/* Top Header / Toolbar */}
        <div className="h-14 bg-[#111111] border-b border-gray-800 flex items-center justify-between px-4 z-10 shrink-0">
           {/* Left: View Controls */}
           <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400 mr-2 hidden md:block">Views:</span>
              <div className="flex bg-gray-800 rounded p-1 gap-1">
                 <button 
                    onClick={() => setGridSize(2)}
                    className={`p-1 rounded transition-colors ${gridSize === 2 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <Grid size={16} />
                 </button>
                 <button 
                    onClick={() => setGridSize(4)}
                    className={`p-1 rounded transition-colors ${gridSize === 4 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <LayoutTemplate size={16} />
                 </button>
                 <button 
                    onClick={() => setGridSize(9)}
                    className={`p-1 rounded transition-colors ${gridSize === 9 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <Layers size={16} />
                 </button>
              </div>
              <div className="h-4 w-px bg-gray-700 mx-2"></div>
              <span className="text-sm font-semibold text-white truncate">Default View Group</span>
           </div>

           {/* Right: Search & Profile */}
           <div className="flex items-center gap-4">
              {/* Contextual Search Input */}
              <div className="relative hidden md:block">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                 <input 
                   type="text" 
                   placeholder="Find camera or event..." 
                   className="bg-[#050505] border border-gray-700 text-sm rounded-full pl-9 pr-4 py-1.5 w-64 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 transition-all"
                 />
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 border border-gray-700 rounded px-1">⌘K</span>
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111111]"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-[#111111] shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                AD
              </div>
           </div>
        </div>

        {/* Video Grid Area */}
        <div className="flex-1 bg-black p-0.5 overflow-hidden relative">
           <div className={`grid gap-0.5 w-full h-full auto-rows-fr ${getGridCols()}`}>
              {CHANNELS.map(channel => (
                <VideoFeed key={channel.id} channel={channel} />
              ))}
           </div>
        </div>

        {/* Timeline Docker */}
        <Timeline />
      </div>
    </div>
  );
}