import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2, CheckSquare, Square, Share2, Video } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// Mock Data Structure matching the screenshot
interface DeviceChannel {
  id: string;
  name: string;
  owner: string;
  thumbnailColor: string;
  cloudRecording: boolean;
  shareListNames: string;
}

interface Device {
  id: string;
  name: string;
  group: string;
  channels: DeviceChannel[];
}

const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev_mod',
    name: 'MOD',
    group: 'newsGroup',
    channels: [
      { 
        id: 'ch_1', 
        name: '壹電視', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'from-red-900 to-red-950', 
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      }
    ]
  },
  {
    id: 'dev_yt',
    name: 'YOUTUBE',
    group: 'newsGroup',
    channels: [
      { 
        id: 'ch_2', 
        name: '台視新聞HD', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'bg-gray-100 dark:bg-slate-800', // Placeholder
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
      { 
        id: 'ch_3', 
        name: '寰宇新聞台', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'from-indigo-900 to-indigo-950', 
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
      { 
        id: 'ch_4', 
        name: '中視新聞台HD', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'bg-gray-100 dark:bg-slate-800', // Placeholder
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
      { 
        id: 'ch_5', 
        name: '華視新聞台(HD)', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'from-emerald-900 to-emerald-950', 
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
      { 
        id: 'ch_6', 
        name: '公視13頻道', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'bg-gray-100 dark:bg-slate-800', 
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
      { 
        id: 'ch_7', 
        name: '民視新聞直播', 
        owner: 'recordingAdmin', 
        thumbnailColor: 'bg-gray-100 dark:bg-slate-800', 
        cloudRecording: true, 
        shareListNames: '國防部發言人 and 4 others' 
      },
    ]
  }
];

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange?: () => void }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-400' : 'bg-gray-200 dark:bg-slate-700'}`}
  >
    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
  </button>
);

const DeviceManagement: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'group' | 'all' | 'add'>('all');
  const [expandedDevices, setExpandedDevices] = useState<Record<string, boolean>>({
    'dev_mod': true,
    'dev_yt': true
  });
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (deviceId: string) => {
    setExpandedDevices(prev => ({ ...prev, [deviceId]: !prev[deviceId] }));
  };

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* Top Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 px-6 pt-4 bg-white dark:bg-slate-900 shrink-0">
         <button 
           onClick={() => setActiveTab('group')}
           className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'group' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           {t.groupSettings}
         </button>
         <button 
           onClick={() => setActiveTab('all')}
           className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           {t.allDevices}
         </button>
         <button 
           onClick={() => setActiveTab('add')}
           className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'add' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           {t.addNewDevice}
         </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-950">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">{t.deviceList}</h2>
              <button className="flex items-center gap-2 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
                  <Share2 size={14} />
                  {t.share}
              </button>
          </div>

          {/* Device List */}
          <div className="space-y-8">
            {INITIAL_DEVICES.map(device => (
               <div key={device.id} className="group/device">
                  {/* Device Row */}
                  <div className="flex items-center gap-3 mb-2">
                     <button 
                        onClick={() => toggleExpand(device.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-gray-500 transition-colors"
                     >
                        {expandedDevices[device.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                     </button>
                     
                     <div className="flex-1">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <button onClick={() => toggleSelect(device.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                   {selectedItems[device.id] ? <CheckSquare size={20} /> : <Square size={20} />}
                                </button>
                                <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">{device.name}</span>
                                <button className="text-gray-300 hover:text-blue-500 transition-colors">
                                    <Edit2 size={14} />
                                </button>
                            </div>
                            <button className="text-red-500/0 group-hover/device:text-red-500 opacity-0 group-hover/device:opacity-100 transition-all p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        {/* Sub-label for Group */}
                        <div className="ml-8 mt-1 text-xs text-gray-400 flex items-center gap-2">
                           <span>{t.group}</span>
                           <span className="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400 font-medium">{t[device.group as keyof typeof t] || device.group}</span>
                        </div>
                     </div>
                  </div>

                  {/* Channels List (Collapsible) */}
                  {expandedDevices[device.id] && (
                     <div className="ml-9 border-t border-gray-100 dark:border-slate-800">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 py-3 text-xs font-bold text-gray-900 dark:text-gray-100">
                            <div className="col-span-5 md:col-span-4 pl-9">{t.channelName}</div>
                            <div className="col-span-2 hidden md:block">{t.thumbnail}</div>
                            <div className="col-span-3 md:col-span-2 text-center">{t.cloudRecording}</div>
                            <div className="col-span-4 md:col-span-4">{t.shareList}</div>
                        </div>

                        {/* Channels Rows */}
                        <div className="divide-y divide-gray-100 dark:divide-slate-800 border-b border-gray-100 dark:border-slate-800">
                           {device.channels.map(channel => (
                             <div key={channel.id} className="grid grid-cols-12 py-3 items-center group/channel hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
                                
                                {/* Name Column */}
                                <div className="col-span-5 md:col-span-4 flex items-start gap-3 pl-1">
                                    <button onClick={() => toggleSelect(channel.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-0.5">
                                        {selectedItems[channel.id] ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{channel.name}</span>
                                            <button className="text-gray-300 hover:text-blue-500 transition-colors">
                                                <Edit2 size={12} />
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {t.owner} : <span className="text-gray-500 dark:text-gray-400">{t[channel.owner as keyof typeof t] || channel.owner}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnail Column */}
                                <div className="col-span-2 hidden md:flex items-center">
                                    <div className={`w-14 h-9 rounded ${channel.thumbnailColor.startsWith('bg-') ? channel.thumbnailColor : `bg-gradient-to-br ${channel.thumbnailColor}`} flex items-center justify-center`}>
                                        {channel.thumbnailColor.startsWith('bg-') && <Video size={16} className="text-gray-300" />}
                                    </div>
                                </div>

                                {/* Cloud Recording Toggle */}
                                <div className="col-span-3 md:col-span-2 flex justify-center">
                                     <ToggleSwitch enabled={channel.cloudRecording} />
                                </div>

                                {/* Share List & Delete Action */}
                                <div className="col-span-4 md:col-span-4 flex items-center justify-between pr-2">
                                     <button className="text-xs font-medium text-blue-500 hover:underline truncate max-w-[120px] md:max-w-none text-left">
                                         {channel.shareListNames}
                                     </button>
                                     <button className="text-red-500/0 group-hover/channel:text-red-500 opacity-0 group-hover/channel:opacity-100 transition-all p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                        <Trash2 size={14} />
                                     </button>
                                </div>

                             </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            ))}
          </div>

      </div>
    </div>
  );
};

export default DeviceManagement;