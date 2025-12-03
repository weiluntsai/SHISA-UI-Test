import React from 'react';
import { SidebarItemProps } from '../types';

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, collapsed }) => (
  <div className={`flex items-center cursor-pointer p-3 mb-1 transition-all duration-200 
    ${active 
      ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-r-2 border-transparent'
    }`}>
    <Icon size={20} />
    {!collapsed && <span className="ml-3 text-sm font-medium tracking-wide">{label}</span>}
  </div>
);

export default SidebarItem;