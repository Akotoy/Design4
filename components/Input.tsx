import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  as?: 'input' | 'select';
  options?: { value: string; label: string }[];
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  as = 'input', 
  options, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <label className="text-xs font-bold text-black dark:text-white uppercase tracking-wider ml-1">{label}</label>
      
      {as === 'select' ? (
        <div className="relative">
          <select 
            className={`
              w-full rounded-xl px-4 py-4 appearance-none cursor-pointer outline-none font-medium
              bg-gray-50 dark:bg-zinc-900
              border-2 border-transparent
              text-black dark:text-white 
              focus:bg-white dark:focus:bg-black
              focus:border-violet-600 dark:focus:border-violet-600
              transition-colors
              ${className}
            `}
            {...props as React.SelectHTMLAttributes<HTMLSelectElement>}
          >
            {options?.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-black text-black dark:text-white">{opt.label}</option>
            ))}
          </select>
        </div>
      ) : (
        <input 
          className={`
            w-full rounded-xl px-4 py-4 outline-none font-medium
            bg-gray-50 dark:bg-zinc-900
            border-2 border-transparent
            text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600
            focus:bg-white dark:focus:bg-black
            focus:border-violet-600 dark:focus:border-violet-600
            transition-colors
            ${className}
          `}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
    </div>
  );
};