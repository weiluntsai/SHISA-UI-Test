import React, { useState } from 'react';
import { Server, Globe, Network, HardDrive, Save, RefreshCw, Cpu, Activity, Info, MonitorSmartphone } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import DeviceManagement from './DeviceManagement';

interface SystemConfigurationProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
}

const SystemConfiguration: React.FC<SystemConfigurationProps> = ({ onToggleSidebar, isSidebarVisible }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<'device' | 'general' | 'network' | 'storage' | 'about'>('device');

  const menuItems = [
    { id: 'device', label: t.deviceManagement, icon: MonitorSmartphone },
    { id: 'general', label: t.general, icon: Server },
    { id: 'network', label: t.network, icon: Network },
    { id: 'storage', label: t.storage, icon: HardDrive },
    { id: 'about', label: t.about, icon: Info },
  ];

  // If Device Management is active, render it directly (full height)
  if (activeSection === 'device') {
      return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950 overflow-hidden">
             {/* Header (Reused for consistency, though tabs are inside DeviceManagement) */}
             <div className="px-6 pt-6 pb-6 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shrink-0">
                <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{t.systemConfig}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Global system preferences and hardware status</p>
             </div>
             
             <div className="flex-1 flex overflow-hidden">
                 {/* Sidebar */}
                 <div className="w-64 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col p-4 gap-1 hidden md:flex shrink-0">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as any)}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-lg transition-all
                                ${activeSection === item.id 
                                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-slate-700' 
                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }
                            `}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                 </div>
                 
                 {/* Main Content Area - Render DeviceManagement here */}
                 <div className="flex-1 overflow-hidden flex flex-col">
                    <DeviceManagement />
                 </div>
             </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-6 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shrink-0">
          <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{t.systemConfig}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Global system preferences and hardware status</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Settings Sidebar */}
         <div className="w-64 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col p-4 gap-1 hidden md:flex shrink-0">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as any)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold rounded-lg transition-all
                        ${activeSection === item.id 
                            ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-slate-700' 
                            : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                        }
                    `}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
         </div>

         {/* Settings Content */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white dark:bg-slate-950">
            <div className="max-w-3xl space-y-8">
                
                {/* General Section */}
                {activeSection === 'general' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="pb-2 border-b border-gray-100 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Server size={20} className="text-blue-500" /> {t.general}
                            </h2>
                        </div>
                        
                        <div className="grid gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.serverName}</label>
                                <input type="text" defaultValue="SHISA-NVR-01" className="w-full max-w-md px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono text-gray-900 dark:text-gray-100 transition-all" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.timezone}</label>
                                <select className="w-full max-w-md px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-gray-100 transition-all">
                                    <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                                    <option value="UTC">(GMT+00:00) UTC</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.language}</label>
                                <select className="w-full max-w-md px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm text-gray-900 dark:text-gray-100 transition-all">
                                    <option value="zh-TW">繁體中文 (Traditional Chinese)</option>
                                    <option value="en-US">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Network Section */}
                {activeSection === 'network' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="pb-2 border-b border-gray-100 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Network size={20} className="text-blue-500" /> {t.network}
                            </h2>
                        </div>

                        <div className="grid gap-6">
                             <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                                <Activity className="text-blue-500 mt-0.5 shrink-0" size={18} />
                                <div>
                                    <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300">Network Interface (eth0)</h3>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Status: Connected • 1000 Mbps Full Duplex</p>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.ipAddress}</label>
                                    <input type="text" defaultValue="192.168.1.100" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono text-gray-900 dark:text-gray-100" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Subnet Mask</label>
                                    <input type="text" defaultValue="255.255.255.0" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono text-gray-900 dark:text-gray-100" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.gateway}</label>
                                    <input type="text" defaultValue="192.168.1.1" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono text-gray-900 dark:text-gray-100" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.dns}</label>
                                    <input type="text" defaultValue="8.8.8.8" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono text-gray-900 dark:text-gray-100" />
                                </div>
                             </div>
                        </div>
                     </div>
                )}

                {/* Storage Section */}
                {activeSection === 'storage' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="pb-2 border-b border-gray-100 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <HardDrive size={20} className="text-blue-500" /> {t.storage}
                            </h2>
                        </div>

                        <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{t.diskUsage}</span>
                                <span className="text-2xl font-black text-gray-900 dark:text-white font-mono">75%</span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 w-3/4 rounded-full shadow-lg shadow-blue-500/20"></div>
                            </div>
                            <div className="flex justify-between mt-3 text-xs font-mono text-gray-500 dark:text-gray-500">
                                <span>Used: 6.0 TB</span>
                                <span>{t.totalCapacity}: 8.0 TB</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                             <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{t.retentionDays}</label>
                             <div className="flex items-center gap-4">
                                <input type="range" min="7" max="90" defaultValue="30" className="flex-1 h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                <span className="w-12 text-center font-bold text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-slate-800 py-1 rounded">30</span>
                             </div>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Older footage will be automatically overwritten when retention period is reached.</p>
                        </div>
                    </div>
                )}

                {/* About Section */}
                {activeSection === 'about' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="pb-2 border-b border-gray-100 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Info size={20} className="text-blue-500" /> {t.about}
                            </h2>
                        </div>

                        <div className="flex flex-col items-center py-8">
                             <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/20 mb-4">
                                <Cpu className="text-white" size={32} />
                             </div>
                             <h3 className="text-xl font-black text-gray-900 dark:text-white">Shisa NVR System</h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Professional Surveillance Solution</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                                <label className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block mb-1">{t.version}</label>
                                <span className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">v2.4.1-stable</span>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
                                <label className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block mb-1">{t.serialNumber}</label>
                                <span className="text-sm font-mono font-bold text-gray-800 dark:text-gray-200">SN-9923-8841-A2</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Save Button (Sticky Footer Style) */}
                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Save size={18} />
                        {t.saveChanges}
                    </button>
                </div>

            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;