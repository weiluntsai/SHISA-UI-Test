import React from 'react';
import { UserPlus, Search, MoreHorizontal, Shield, User, Mail, Clock, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// Mock Data
const USERS = [
  { id: 1, name: 'Admin User', email: 'admin@shisa.io', role: 'admin', status: 'active', lastLogin: '2025/12/14 10:42' },
  { id: 2, name: 'John Doe', email: 'john.doe@company.com', role: 'genUser', status: 'active', lastLogin: '2025/12/13 15:30' },
  { id: 3, name: 'Security Team A', email: 'sec.team.a@company.com', role: 'genUser', status: 'active', lastLogin: '2025/12/14 08:00' },
  { id: 4, name: 'Guest Viewer', email: 'guest@company.com', role: 'genUser', status: 'inactive', lastLogin: '2025/11/20 09:15' },
  { id: 5, name: 'System Operator', email: 'ops@shisa.io', role: 'admin', status: 'active', lastLogin: '2025/12/14 11:20' },
];

interface UserManagementProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
}

const UserManagement: React.FC<UserManagementProps> = ({ onToggleSidebar, isSidebarVisible }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 pt-6 pb-6 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{t.userManagement}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage system access and permissions</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative group">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Search users..."
                   className="bg-gray-100 dark:bg-slate-800 border-transparent text-sm rounded-lg pl-9 pr-3 py-2 w-full md:w-64 focus:bg-white dark:focus:bg-slate-950 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-gray-200 placeholder-gray-400"
                 />
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap">
                <UserPlus size={16} />
                <span>{t.addUser}</span>
             </button>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-auto p-0 md:p-6 bg-gray-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
             {[
                { label: t.name, cols: 'col-span-4 md:col-span-3' },
                { label: t.role, cols: 'col-span-3 md:col-span-2' },
                { label: t.status, cols: 'col-span-2' },
                { label: t.lastLogin, cols: 'col-span-3 hidden md:block' },
                { label: t.actions, cols: 'col-span-3 md:col-span-2 text-right md:text-center' }
             ].map((header, index, arr) => (
                <div key={index} className={`${header.cols} py-3 px-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider flex items-center ${index === arr.length - 1 ? 'justify-end md:justify-center' : ''}`}>
                  {header.label}
                </div>
             ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {USERS.map((user) => (
                <div key={user.id} className="grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group py-1">
                  
                  {/* Name & Email */}
                  <div className="col-span-4 md:col-span-3 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold border border-gray-200 dark:border-slate-700">
                        {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                            <Mail size={10} /> {user.email}
                        </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-3 md:col-span-2 p-4 flex items-center">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${user.role === 'admin' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'}`}>
                        {user.role === 'admin' ? <Shield size={10} /> : <User size={10} />}
                        {user.role === 'admin' ? t.admin : t.genUser}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 p-4 flex items-center">
                     {user.status === 'active' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                            <CheckCircle2 size={12} /> <span className="hidden sm:inline">{t.active}</span>
                        </div>
                     ) : (
                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-bold">
                            <XCircle size={12} /> <span className="hidden sm:inline">{t.inactive}</span>
                        </div>
                     )}
                  </div>

                  {/* Last Login */}
                  <div className="col-span-3 hidden md:flex p-4 items-center text-gray-500 dark:text-slate-400 text-sm font-mono">
                     <Clock size={12} className="mr-2 opacity-70" /> {user.lastLogin}
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 md:col-span-2 p-4 flex items-center justify-end md:justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title={t.edit}>
                        <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title={t.delete}>
                        <Trash2 size={16} />
                    </button>
                  </div>

                </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-slate-500 font-medium">Showing 1-5 of 5 users</span>
              <div className="flex gap-1">
                 <button className="px-2 py-1 text-xs border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                 <button className="px-2 py-1 text-xs border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Next</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;