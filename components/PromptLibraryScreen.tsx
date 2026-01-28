import React, { useState } from 'react';
import { ChevronLeft, Folder, X, Search, Sparkles } from 'lucide-react';
import { PROMPT_LIBRARY } from '../constants';

interface PromptLibraryScreenProps {
  onClose: () => void;
  onSelectPrompt: (text: string) => void;
}

export const PromptLibraryScreen: React.FC<PromptLibraryScreenProps> = ({ onClose, onSelectPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const activeCategoryData = selectedCategory ? PROMPT_LIBRARY.find(c => c.id === selectedCategory) : null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col animate-slide-in-right bg-white dark:bg-black">
      
      {/* Header */}
      <div className="p-6 flex items-center gap-4 sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900">
        {selectedCategory ? (
          <button onClick={() => setSelectedCategory(null)} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
        ) : (
           <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-black dark:text-white hover:bg-gray-200">
            <X size={20} />
          </button>
        )}
        <h2 className="text-xl font-black text-black dark:text-white tracking-tighter">
          {selectedCategory ? activeCategoryData?.label : 'Библиотека'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {!selectedCategory ? (
          <div className="grid grid-cols-2 gap-4">
             {PROMPT_LIBRARY.map((category) => (
               <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="p-6 rounded-2xl flex flex-col gap-4 text-left group bg-gray-50 dark:bg-zinc-900 border-2 border-transparent hover:border-black dark:hover:border-white transition-all active:scale-[0.98]"
               >
                 <div className="text-4xl">{category.emoji}</div>
                 <div>
                   <h3 className="font-bold text-black dark:text-white text-base leading-tight">{category.label}</h3>
                   <p className="text-xs font-bold text-gray-400 mt-1">{category.prompts.length} prompts</p>
                 </div>
               </button>
             ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="mb-4 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-bold text-sm border-l-4 border-violet-600">
              Выберите идею, чтобы начать диалог.
            </div>
            {activeCategoryData?.prompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectPrompt(prompt);
                  onClose();
                }}
                className="text-left p-5 rounded-xl border-2 border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all active:scale-[0.99] bg-white dark:bg-black"
              >
                <p className="text-base font-medium text-black dark:text-white">{prompt}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};