import React, { useRef, useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import DatePicker from './DatePicker';

interface TimelineProps {
  hideControls?: boolean;
  position: number;
  onPositionChange: (position: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ hideControls = false, position, onPositionChange }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Date and Time State
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 14));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeInput, setTimeInput] = useState({ h: '11', m: '49', s: '15' });

  const updatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onPositionChange(percentage);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        updatePosition(e.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const totalMinutes = 24 * 60;
  const currentMinutes = (position / 100) * totalMinutes;
  const h = Math.floor(currentMinutes / 60);
  const m = Math.floor(currentMinutes % 60);
  const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDateValue = (date: Date) => {
      return `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };
  
  const iconProps = { strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };

  return (
    <div className={`flex flex-col select-none shrink-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-200 ${hideControls ? 'h-16' : 'h-24'}`}>
      {!hideControls && (
        <div className="h-10 flex items-center justify-between px-3 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
           <div className="flex items-center gap-3">
              {/* Date Picker */}
              <div className="relative">
                  <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className={`flex items-center gap-2 px-2 py-0.5 bg-white dark:bg-slate-800 border rounded text-xs transition-all
                        ${showDatePicker ? 'border-blue-500 text-blue-600' : 'border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-blue-400'}
                    `}
                  >
                     <span className="font-mono font-bold">{formatDateValue(selectedDate)}</span>
                     <Calendar size={12} />
                  </button>
                  {showDatePicker && (
                      <DatePicker 
                        selectedDate={selectedDate} 
                        onChange={handleDateChange} 
                        onClose={() => setShowDatePicker(false)} 
                      />
                  )}
              </div>

              {/* Time Display */}
              <div className="flex items-center gap-1 hidden sm:flex bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded px-1.5 py-0.5">
                  <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{timeInput.h}:{timeInput.m}:{timeInput.s}</span>
              </div>

              <div className="h-3 w-px bg-gray-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>

              {/* Mini Controls */}
              <div className="flex gap-1">
                 <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400"><ChevronLeft size={16} /></button>
                 <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400"><Play size={16} fill="currentColor" /></button>
                 <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400"><ChevronRight size={16} /></button>
              </div>
           </div>
           
           <div className="flex gap-1.5">
              <button className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-transparent hover:border-gray-300 dark:hover:border-slate-600 transition-all">1H</button>
              <button className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-all">24H</button>
           </div>
        </div>
      )}

      {/* Timeline Ruler */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 relative overflow-hidden cursor-ew-resize group bg-gray-50 dark:bg-slate-950 touch-none"
      >
        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-red-500 z-30 pointer-events-none"
          style={{ left: `${position}%` }}
        >
           <div className="absolute top-0 -translate-x-1/2 w-3 h-3 bg-red-500 transform rotate-45 -mt-1.5 shadow-sm"></div>
           <div className="absolute top-4 -translate-x-1/2 bg-red-500 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
             {timeString}
           </div>
           <div className="absolute bottom-0 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full mb-0.5"></div>
        </div>

        {/* Ruler Marks */}
        <div className="absolute inset-0 flex items-end pointer-events-none select-none">
           {hours.map(hour => (
             <div key={hour} className="flex-1 flex flex-col items-start h-full justify-end border-l border-gray-200 dark:border-slate-800 relative">
                
                {/* Recording Data Blocks */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-transparent">
                    {/* Mock Recording Segments */}
                    {hour >= 8 && hour <= 20 && (
                        <div className="absolute bottom-2 left-0 right-0 h-4 bg-emerald-500/20 border-b-2 border-emerald-500/50"></div>
                    )}
                    {/* Motion Events */}
                    {hour % 5 === 0 && (
                        <div className="absolute bottom-2 left-2 w-1 h-4 bg-amber-500"></div>
                    )}
                </div>

                {/* Ticks */}
                <div className="w-px h-2 bg-gray-300 dark:bg-slate-600 absolute bottom-0 left-0"></div>
                <div className="w-px h-1 bg-gray-200 dark:bg-slate-700 absolute bottom-0 left-1/4"></div>
                <div className="w-px h-1.5 bg-gray-200 dark:bg-slate-700 absolute bottom-0 left-1/2"></div>
                <div className="w-px h-1 bg-gray-200 dark:bg-slate-700 absolute bottom-0 left-3/4"></div>
                
                <span className={`text-[10px] text-gray-400 dark:text-slate-500 font-mono ml-1 mb-6 ${hour % 2 !== 0 ? 'hidden md:block' : ''}`}>
                    {hour.toString().padStart(2, '0')}:00
                </span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;