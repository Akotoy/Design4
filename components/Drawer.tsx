import React, { useRef } from 'react';
import { X, Settings, CreditCard, Gem, MessageSquare, ChevronRight, Library } from 'lucide-react';
import { APP_NAME } from '../constants';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLibrary: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  userName: string;
}

export const Drawer: React.FC<DrawerProps> = ({ 
  isOpen, 
  onClose, 
  onOpenLibrary, 
  onOpenSettings,
  onOpenProfile,
  userName, 
}) => {
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`
          fixed top-0 left-0 h-full w-[85%] max-w-[320px] z-50 transform transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col
          bg-white dark:bg-black border-r border-gray-200 dark:border-zinc-800
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white">
              <Gem size={20} />
            </div>
            <span className="font-black text-xl text-black dark:text-white tracking-tighter">{APP_NAME}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
          <div className="mb-8">
            <p className="text-xs font-extrabold text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-4">История</p>
            <div className="flex flex-col gap-1">
              <DialogItem title="Как вести бюджет" time="14:20" active />
              <DialogItem title="Анализ Биткоина" time="Вчера" />
              <DialogItem title="План тренировок" time="Вчера" />
            </div>
          </div>

           <div className="mb-8">
            <p className="text-xs font-extrabold text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-4">Меню</p>
             <div className="space-y-1">
               <MenuButton icon={<Library size={20} />} label="Библиотека" onClick={() => { onClose(); onOpenLibrary(); }} />
               <MenuButton icon={<Settings size={20} />} label="Настройки" onClick={() => { onClose(); onOpenSettings(); }} />
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="p-6 border-t border-gray-100 dark:border-zinc-900"> 
          <button 
            onClick={() => { onClose(); onOpenProfile(); }}
            className="w-full flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-900 border-2 border-transparent group-hover:border-violet-600 transition-colors flex items-center justify-center text-black dark:text-white font-bold text-lg">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-black dark:text-white">{userName || 'Пользователь'}</p>
              <p className="text-xs text-violet-600 font-bold uppercase tracking-wide">Free Plan</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

const DialogItem: React.FC<{ title: string; time: string; active?: boolean }> = ({ title, time, active }) => (
  <button className={`
    w-full flex items-center justify-between p-3 rounded-xl transition-all
    ${active 
      ? 'bg-black text-white dark:bg-white dark:text-black' 
      : 'hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-zinc-400'
    }
  `}>
    <span className="text-sm font-bold truncate">{title}</span>
    <span className={`text-[10px] font-medium opacity-60`}>{time}</span>
  </button>
);

const MenuButton: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors group text-black dark:text-white">
    <div className="text-gray-400 group-hover:text-violet-600 transition-colors">
      {icon}
    </div>
    <span className="font-bold text-base">{label}</span>
  </button>
);