import React, { useState } from 'react';
import { Download, FileVideo, CheckCircle2, Loader2, AlertCircle, Search, Filter, Scan, User, Car, Eye, Brain, ChevronRight, XCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { CHANNELS } from '../constants';

// Mock Data
const DOWNLOAD_ITEMS = [
  { id: 101, channelId: 1, startTime: '2025/12/14 09:15:00', duration: '00:10:00', size: '125 MB', status: 'completed' },
  { id: 102, channelId: 2, startTime: '2025/12/14 10:30:00', duration: '01:00:00', size: '850 MB', status: 'processing' },
  { id: 103, channelId: 1, startTime: '2025/12/13 23:45:00', duration: '00:05:00', size: '45 MB', status: 'completed' },
  { id: 104, channelId: 3, startTime: '2025/12/13 18:20:00', duration: '00:15:00', size: '180 MB', status: 'failed' },
  { id: 105, channelId: 5, startTime: '2025/12/13 14:00:00', duration: '00:30:00', size: '350 MB', status: 'completed' },
  { id: 106, channelId: 4, startTime: '2025/12/13 08:00:00', duration: '02:00:00', size: '1.4 GB', status: 'completed' },
];

// Mock Detected Events
const MOCK_EVENTS = [
  { id: 'ev1', sourceId: 101, type: 'person', time: '09:16:23', confidence: 98, thumbnailColor: 'bg-red-900' },
  { id: 'ev2', sourceId: 101, type: 'person', time: '09:18:45', confidence: 92, thumbnailColor: 'bg-red-900' },
  { id: 'ev3', sourceId: 103, type: 'vehicle', time: '23:46:10', confidence: 88, thumbnailColor: 'bg-indigo-900' },
  // Item 105 and 106 have 0 events for demo purposes
];

interface DownloadManagerProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ onToggleSidebar, isSidebarVisible }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'recording' | 'events'>('recording');
  
  // State to track scanning status of items: 'idle' | 'scanning' | 'scanned'
  const [scanStatus, setScanStatus] = useState<Record<number, 'idle' | 'scanning' | 'scanned'>>({
    101: 'scanned', // Mock one as already scanned
    103: 'idle',
    105: 'idle',
    106: 'idle'
  });

  const handleScan = (id: number) => {
    // 1. Set status to scanning
    setScanStatus(prev => ({ ...prev, [id]: 'scanning' }));

    // 2. Mock delay for analysis
    setTimeout(() => {
        setScanStatus(prev => ({ ...prev, [id]: 'scanned' }));
        // In a real app, this would fetch new events. 
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            <CheckCircle2 size={12} />
            {t.statusCompleted}
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800">
            <Loader2 size={12} className="animate-spin" />
            {t.statusProcessing}
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-xs bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full border border-red-100 dark:border-red-800">
            <AlertCircle size={12} />
            {t.statusFailed}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{t.downloadManager}</h1>
          
          {/* Search/Filter Toolbar */}
          <div className="flex gap-2">
             <div className="relative hidden md:block group">
                 <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder={t.findCamera}
                   className="bg-gray-100 dark:bg-slate-800 border-transparent text-sm rounded-md pl-8 pr-3 py-1.5 w-48 focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-gray-200 placeholder-gray-400"
                 />
             </div>
             <button className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <Filter size={16} />
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('recording')}
            className={`pb-3 border-b-2 font-bold text-sm tracking-wide transition-colors ${activeTab === 'recording' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            {t.surveillanceRec}
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`pb-3 border-b-2 font-bold text-sm tracking-wide transition-colors ${activeTab === 'events' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            {t.events}
          </button>
        </div>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-auto p-0 md:p-6 bg-gray-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden min-h-[400px]">
          
          {/* ----------------- RECORDING VIEW ----------------- */}
          {activeTab === 'recording' && (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                {[
                    { label: t.thumbnail, cols: 'col-span-3 md:col-span-2' },
                    { label: t.source, cols: 'col-span-3' },
                    { label: t.startTime, cols: 'col-span-2' },
                    { label: t.status, cols: 'col-span-2 md:col-span-2' },
                    { label: t.aiDetection, cols: 'col-span-2 md:col-span-2 text-center' },
                    { label: t.download, cols: 'col-span-1 hidden md:block text-center' }
                ].map((header, index, arr) => (
                    <div key={index} className={`${header.cols} py-3 px-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center`}>
                      {header.label}
                    </div>
                ))}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {DOWNLOAD_ITEMS.map((item) => {
                  const channel = CHANNELS.find(c => c.id === item.channelId);
                  const currentScanStatus = scanStatus[item.id] || 'idle';
                  const eventCount = MOCK_EVENTS.filter(e => e.sourceId === item.id).length;
                  
                  return (
                    <div key={item.id} className="grid grid-cols-12 items-center hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                      
                      {/* Thumbnail */}
                      <div className="col-span-3 md:col-span-2 p-3">
                        <div className="aspect-video bg-slate-800 rounded overflow-hidden relative border border-gray-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
                          <div className={`absolute inset-0 bg-gradient-to-br ${channel?.color} opacity-40`}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FileVideo className="text-white/50" size={24} />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">MP4</div>
                        </div>
                      </div>

                      {/* Source */}
                      <div className="col-span-3 p-3 md:border-l border-gray-100 dark:border-slate-800 h-full flex flex-col justify-center">
                        <div className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-0.5 truncate">{channel?.name}</div>
                        <div className="text-xs text-gray-400 dark:text-slate-500 font-mono">CH-{item.channelId.toString().padStart(2, '0')}</div>
                      </div>

                      {/* Start Time */}
                      <div className="col-span-2 p-3 md:border-l border-gray-100 dark:border-slate-800 h-full flex flex-col justify-center">
                        <span className="font-mono text-sm text-gray-600 dark:text-slate-300 font-medium truncate">
                            {item.startTime.split(' ')[1]}
                        </span>
                         <span className="text-[10px] text-gray-400">{item.duration}</span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 md:col-span-2 p-3 md:border-l border-gray-100 dark:border-slate-800 h-full flex items-center">
                        {getStatusBadge(item.status)}
                      </div>

                      {/* AI Detection Action */}
                      <div className="col-span-2 md:col-span-2 p-3 md:border-l border-gray-100 dark:border-slate-800 h-full flex items-center justify-center">
                          {item.status === 'completed' ? (
                             <>
                                {currentScanStatus === 'idle' && (
                                    <button 
                                        onClick={() => handleScan(item.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-md border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm group/btn"
                                    >
                                        <Brain size={14} className="group-hover/btn:scale-110 transition-transform" />
                                        <span>{t.startAnalysis}</span>
                                    </button>
                                )}
                                {currentScanStatus === 'scanning' && (
                                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800/30">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span>{t.analyzing}</span>
                                    </div>
                                )}
                                {currentScanStatus === 'scanned' && (
                                    eventCount > 0 ? (
                                      <button 
                                          onClick={() => setActiveTab('events')}
                                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-md border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-300 transition-all shadow-sm group/btn"
                                      >
                                          <Eye size={14} className="group-hover/btn:scale-110 transition-transform" />
                                          <span>{eventCount} {t.eventsFound}</span>
                                          <ChevronRight size={12} className="opacity-50" />
                                      </button>
                                    ) : (
                                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-md border border-gray-200 dark:border-slate-700 opacity-80 cursor-default">
                                          <XCircle size={14} />
                                          <span>{t.noEvents}</span>
                                      </div>
                                    )
                                )}
                             </>
                          ) : (
                              <span className="text-gray-300 dark:text-slate-700">-</span>
                          )}
                      </div>

                      {/* Download Action */}
                      <div className="col-span-1 hidden md:flex p-3 md:border-l border-gray-100 dark:border-slate-800 h-full items-center justify-center">
                        <button 
                          disabled={item.status !== 'completed'}
                          className={`p-2 rounded-full transition-all ${
                            item.status === 'completed' 
                              ? 'bg-gray-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 hover:shadow-md' 
                              : 'text-gray-300 dark:text-slate-700 cursor-not-allowed'
                          }`}
                        >
                          <Download size={16} strokeWidth={2.5} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ----------------- EVENTS VIEW ----------------- */}
          {activeTab === 'events' && (
             <>
               {/* Table Header */}
               <div className="grid grid-cols-12 bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                {[
                    { label: t.thumbnail, cols: 'col-span-3' },
                    { label: t.objectType, cols: 'col-span-3' },
                    { label: t.source, cols: 'col-span-3' },
                    { label: t.eventTime, cols: 'col-span-2' },
                    { label: t.confidence, cols: 'col-span-1' }
                ].map((header, index) => (
                    <div key={index} className={`${header.cols} py-3 px-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center`}>
                      {header.label}
                    </div>
                ))}
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800">
                 {MOCK_EVENTS.map((event) => {
                     // Find parent download source
                     const source = DOWNLOAD_ITEMS.find(i => i.id === event.sourceId);
                     const channel = CHANNELS.find(c => c.id === source?.channelId);

                     return (
                        <div key={event.id} className="grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors py-1">
                            
                             {/* Thumbnail with Bounding Box Mock */}
                             <div className="col-span-3 p-3">
                                <div className="aspect-video bg-slate-800 rounded overflow-hidden relative border border-gray-200 dark:border-slate-700">
                                    <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-60`}></div>
                                    {/* Mock Object Snapshot */}
                                    <div className="absolute inset-2 border-2 border-yellow-400 rounded-sm opacity-80"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       {event.type === 'person' ? <User className="text-gray-500" size={24} /> : <Car className="text-gray-500" size={24} />}
                                    </div>
                                </div>
                             </div>

                             {/* Object Type */}
                             <div className="col-span-3 p-3 flex items-center gap-2">
                                 <div className={`p-1.5 rounded-md ${event.type === 'person' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                                    {event.type === 'person' ? <User size={16} /> : <Car size={16} />}
                                 </div>
                                 <span className="font-bold text-sm text-gray-800 dark:text-gray-200">
                                     {event.type === 'person' ? t.person : t.vehicle}
                                 </span>
                             </div>

                             {/* Source */}
                             <div className="col-span-3 p-3">
                                 <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{channel?.name}</div>
                                 <div className="text-xs text-gray-400">ID: {source?.id}</div>
                             </div>

                             {/* Event Time */}
                             <div className="col-span-2 p-3">
                                 <span className="font-mono text-sm font-medium text-gray-600 dark:text-slate-400">{event.time}</span>
                             </div>

                             {/* Confidence */}
                             <div className="col-span-1 p-3">
                                 <div className={`text-xs font-bold px-2 py-0.5 rounded w-fit ${event.confidence > 90 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                                     {event.confidence}%
                                 </div>
                             </div>

                        </div>
                     );
                 })}
                 
                 {MOCK_EVENTS.length === 0 && (
                     <div className="p-8 text-center text-gray-400 dark:text-slate-600">
                         No AI events detected yet. Scan a video from the Recording tab.
                     </div>
                 )}
              </div>
             </>
          )}
          
          {/* Footer / Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-slate-500 font-medium">
                  {activeTab === 'recording' ? 'Showing 1-6 of 24 items' : `Showing ${MOCK_EVENTS.length} detections`}
              </span>
              <div className="flex gap-1">
                 <button className="px-2 py-1 text-xs border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                 <button className="px-2 py-1 text-xs border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">Next</button>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DownloadManager;