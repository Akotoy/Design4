import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'icon' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Swiss Pop: Rounded-xl, Solid Colors, No Gradients, Active Scale
  const baseStyles = "relative py-4 px-6 rounded-xl font-bold tracking-tight transition-transform duration-100 active:scale-[0.96] flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary: Electric Violet, Solid
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    
    // Secondary: Light Gray / Dark Gray
    secondary: "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700",
    
    // Outline: Thick borders
    outline: "bg-transparent border-2 border-gray-200 dark:border-zinc-800 text-black dark:text-white hover:border-black dark:hover:border-white",
    
    // Icon: Simple square-ish
    icon: "p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-zinc-700",
    
    // Ghost
    ghost: "bg-transparent text-gray-500 hover:text-black dark:hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};