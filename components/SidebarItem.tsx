import React from 'react';
import { SidebarItemProps } from '../types';

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, collapsed, onClick }) => (
  <div className="px-3 mb-1">
    <div 
        onClick={onClick}
        className={`flex items-center cursor-pointer px-3 py-2.5 rounded-lg transition-all duration-200 group
        ${active 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
        }`}>
        <Icon 
        size={18} 
        strokeLinecap="square"
        strokeLinejoin="miter"
        className={`${active ? 'text-white' : 'text-gray-500 dark:text-slate-500 group-hover:text-gray-700 dark:group-hover:text-slate-300'}`} 
        />
        {!collapsed && <span className="ml-3 text-sm font-medium tracking-wide">{label}</span>}
    </div>
  </div>
);

export default SidebarItem;