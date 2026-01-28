import React, { useState, useRef } from 'react';
import { X, User, Save, BarChart3, Clock, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { Input } from './Input';
import { Button } from './Button';

interface ProfileScreenProps {
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose, user, onUpdateUser }) => {
  const [formData, setFormData] = useState(user);
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateUser(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex flex-col animate-slide-up bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="p-6 flex items-center justify-between sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900">
        <h2 className="text-2xl font-black text-black dark:text-white tracking-tighter">Профиль</h2>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white hover:bg-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-32">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center text-white text-3xl font-black border-4 border-white dark:border-black shadow-xl">
             {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {formData.firstName || 'Имя'} <br/>
              <span className="text-gray-400 dark:text-zinc-600">{formData.lastName || 'Фамилия'}</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
            <StatItem icon={<BarChart3 size={20} />} val="124" label="Чатов" />
            <StatItem icon={<Clock size={20} />} val="12" label="Дней" />
            <StatItem icon={<Zap size={20} />} val="4.2k" label="Токенов" />
        </div>

        <div className="space-y-6">
             <Input label="Имя" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
             <Input label="Фамилия" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
              <Input label="Пол" as="select" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)} options={[{ value: '', label: 'Не указано' }, { value: 'male', label: 'Мужской' }, { value: 'female', label: 'Женский' }, { value: 'other', label: 'Другой' }]} />
              <Input label="Возраст" type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} />
        </div>
      </div>

      {hasChanges && (
          <div className="absolute bottom-8 left-6 right-6 animate-pop">
              <Button fullWidth onClick={handleSave} className="shadow-2xl shadow-violet-900/50">
                  <Save size={20} />
                  Сохранить
              </Button>
          </div>
      )}
    </div>
  );
};

const StatItem = ({ icon, val, label }: any) => (
  <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl flex flex-col items-center justify-center gap-1">
      <div className="text-violet-600 mb-1">{icon}</div>
      <span className="text-xl font-black text-black dark:text-white">{val}</span>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
  </div>
);