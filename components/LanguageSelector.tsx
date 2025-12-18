
import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中文' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-[10px] font-bold transition-all border border-gray-700 shadow-sm"
      >
        <Globe size={14} className="text-blue-400" />
        <span>{language.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#1a1a1a] border border-gray-700 rounded shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLanguage(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between
                ${language === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
              `}
            >
              {option.label}
              {language === option.value && <div className="w-1 h-1 rounded-full bg-blue-400"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
