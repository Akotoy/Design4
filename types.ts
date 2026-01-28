export interface UserProfile {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other' | '';
  age: string;
  interests: string[];
}

export interface Interest {
  id: string;
  label: string;
  emoji: string;
}

export interface Prompt {
  id: string;
  text: string;
  icon: string; // Emoji or icon name
  category: string;
  color: string;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  emoji: string;
  systemPrompt: string;
  gradient: string; // Tailwind gradient classes
}

export interface PromptCategory {
  id: string;
  label: string;
  emoji: string;
  prompts: string[]; // Array of prompt texts
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export type AppScreen = 'register' | 'interests' | 'dashboard';

export type AppFont = 'sans' | 'serif' | 'mono';