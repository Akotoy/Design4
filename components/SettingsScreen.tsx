import React, { useRef } from 'react';
import { X, Trash2, Type, ChevronRight, Check } from 'lucide-react';
import { AppFont } from '../types';

interface SettingsScreenProps {
  onClose: () => void;
  onClearHistory: () => void;
  currentFont: AppFont;
  onFontChange: (font: AppFont) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  onClose, 
  onClearHistory, 
  currentFont, 
  onFontChange 
}) => {
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchEnd.current - touchStart.current;
    if (distance > 50) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex flex-col animate-slide-up bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900">
        <h2 className="text-2xl font-black text-black dark:text-white tracking-tighter">Настройки</h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white hover:bg-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        
        {/* Section: Typography */}
        <div className="mb-10">
          <p className="text-xs font-extrabold text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-4">Типографика</p>
          <div className="space-y-2">
            <FontOption 
              label="Modern Sans" 
              sub="Inter" 
              fontClass="font-sans" 
              isActive={currentFont === 'sans'} 
              onClick={() => onFontChange('sans')} 
            />
            <FontOption 
              label="Editorial" 
              sub="Playfair Display" 
              fontClass="font-serif" 
              isActive={currentFont === 'serif'} 
              onClick={() => onFontChange('serif')} 
            />
             <FontOption 
              label="Technical" 
              sub="JetBrains Mono" 
              fontClass="font-mono" 
              isActive={currentFont === 'mono'} 
              onClick={() => onFontChange('mono')} 
            />
          </div>
        </div>

        {/* Section: Data */}
        <div className="mb-8">
           <button 
            onClick={() => {
              if(window.confirm('Вы уверены?')) {
                onClearHistory();
                onClose();
              }
            }}
            className="w-full p-4 rounded-xl border-2 border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 flex items-center justify-center gap-2 text-red-600 dark:text-red-400 active:scale-[0.98] transition-transform"
           >
             <Trash2 size={20} />
             <span className="font-bold">Очистить историю</span>
           </button>
           <p className="text-center text-xs font-bold text-gray-300 dark:text-zinc-700 mt-6 uppercase tracking-widest">
             Swiss Design v2.0
           </p>
        </div>
      </div>
    </div>
  );
};

const FontOption: React.FC<{ label: string, sub: string, fontClass: string, isActive: boolean, onClick: () => void }> = ({ label, sub, fontClass, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all active:scale-[0.98]
      ${isActive 
        ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20' 
        : 'border-transparent bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800'
      }
    `}
  >
    <div className="text-left">
      <div className={`text-base font-bold text-black dark:text-white ${fontClass}`}>{label}</div>
      <div className="text-xs text-gray-500 dark:text-zinc-500 font-medium">{sub}</div>
    </div>
    {isActive && (
      <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white">
        <Check size={14} strokeWidth={3} />
      </div>
    )}
  </button>
);