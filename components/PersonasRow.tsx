import React from 'react';
import { Persona } from '../types';

interface PersonasRowProps {
  personas: Persona[];
  activePersonaId: string;
  onSelect: (persona: Persona) => void;
}

export const PersonasRow: React.FC<PersonasRowProps> = ({ personas, activePersonaId, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-2">
      <div className="flex gap-3 px-1">
        {personas.map((persona) => {
          const isActive = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
              className={`
                flex flex-col items-center gap-2 p-3 rounded-2xl min-w-[80px] transition-all duration-300 relative overflow-hidden group
                ${isActive ? 'bg-slate-800 ring-2 ring-blue-500 scale-105 shadow-lg shadow-blue-500/20' : 'bg-surface/50 border border-slate-700 hover:bg-slate-800'}
              `}
            >
              {/* Active Indicator Background */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-10`} />
              )}

              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner
                ${isActive ? `bg-gradient-to-br ${persona.gradient} text-white` : 'bg-slate-700 text-slate-400 grayscale group-hover:grayscale-0 transition-all'}
              `}>
                {persona.emoji}
              </div>
              
              <span className={`text-[10px] font-medium text-center truncate w-full ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {persona.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};