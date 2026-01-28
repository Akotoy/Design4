import React from 'react';
import { Prompt } from '../types';

interface PromptMarqueeProps {
  prompts: Prompt[];
  onSelect: (prompt: Prompt) => void;
}

export const PromptMarquee: React.FC<PromptMarqueeProps> = ({ prompts, onSelect }) => {
  if (prompts.length === 0) return null;

  const marqueeItems = [...prompts, ...prompts, ...prompts];

  return (
    <div className="relative w-[calc(100%+2rem)] -ml-4 overflow-hidden h-14 group">
      <div className="flex items-center gap-3 absolute whitespace-nowrap animate-marquee hover:[animation-play-state:paused] h-full pl-4">
        {marqueeItems.map((prompt, index) => (
          <button
            key={`${prompt.id}-${index}`}
            onClick={() => onSelect(prompt)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full 
              bg-white dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800
              hover:border-violet-600 dark:hover:border-violet-600
              text-black dark:text-white transition-colors
            `}
          >
            <span className="text-base">{prompt.icon}</span>
            <span className="text-xs font-bold uppercase tracking-wide">{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};