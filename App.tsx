import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { Menu, Send, Sparkles, ChevronUp, Paperclip, Mic, Image, FileText, ChevronLeft, Sun, Moon, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, AppScreen, Prompt, Persona, Message, AppFont } from './types';
import { INTERESTS, PROMPTS, PERSONAS, APP_NAME } from './constants';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { PromptMarquee } from './components/PromptMarquee';
import { Drawer } from './components/Drawer';
import { PromptLibraryScreen } from './components/PromptLibraryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProfileScreen } from './components/ProfileScreen';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [font, setFont] = useState<AppFont>('sans'); // New Global State

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getFontClass = () => {
    switch (font) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      default: return 'font-sans';
    }
  };

  const [screen, setScreen] = useState<AppScreen>('register');
  const [user, setUser] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    interests: []
  });
  const [promptInput, setPromptInput] = useState('');
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const toggleInterest = (id: string) => {
    setUser(prev => {
      const exists = prev.interests.includes(id);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== id) };
      }
      if (prev.interests.length >= 5) return prev;
      return { ...prev, interests: [...prev.interests, id] };
    });
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setPromptInput(prompt.text);
  };

  const handleLibrarySelect = (text: string) => {
    setPromptInput(text);
  };

  const handleSendMessage = () => {
    if (!promptInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: promptInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setPromptInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `Вот ответ в стиле **${activePersona.name}**:\n\nЭто текст в выбранном шрифте. Швейцарский стиль любит воздух и контраст.\n\n\`\`\`js\nconst swiss = true;\n\`\`\``,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([]);
    setPromptInput('');
  };

  const filteredPrompts = useMemo(() => {
    if (user.interests.length === 0) return PROMPTS;
    const relevant = PROMPTS.filter(p => user.interests.includes(p.category));
    return relevant.length > 0 ? relevant : PROMPTS;
  }, [user.interests]);

  const renderContent = () => {
    // 1. REGISTER
    if (screen === 'register') {
      return (
        <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-6 pt-12 animate-fade-in bg-white dark:bg-black">
           <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
              <div className="mb-10 text-center">
                <div className="inline-flex w-16 h-16 bg-violet-600 rounded-2xl items-center justify-center text-white mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                   <Zap size={32} fill="currentColor" />
                </div>
                <h1 className="text-4xl font-black text-black dark:text-white tracking-tighter mb-2">
                  Вход
                </h1>
                <p className="text-gray-500 font-bold">Настройте профиль</p>
              </div>

              <div className="flex flex-col gap-5">
                <Input label="Имя" placeholder="Елена" value={user.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                <Input label="Фамилия" placeholder="Смирнова" value={user.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                <Input label="Пол" as="select" value={user.gender} onChange={(e) => handleInputChange('gender', e.target.value)} options={[{ value: '', label: 'Пол' }, { value: 'male', label: 'Мужской' }, { value: 'female', label: 'Женский' }]} />
                <Input label="Возраст" type="number" placeholder="25" value={user.age} onChange={(e) => handleInputChange('age', e.target.value)} />
                <Button className="mt-6" onClick={() => setScreen('interests')} disabled={!user.firstName}>Продолжить</Button>
              </div>
           </div>
        </div>
      );
    }

    // 2. INTERESTS
    if (screen === 'interests') {
      return (
        <div className="h-full flex flex-col bg-white dark:bg-black animate-fade-in">
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-black dark:text-white tracking-tighter leading-[1.1]">
                Выберите <br/> <span className="text-violet-600">Интересы</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {INTERESTS.map((interest) => {
                const isSelected = user.interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`
                      p-5 rounded-xl flex flex-col items-start gap-4 border-2 transition-all duration-200
                      ${isSelected 
                        ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black translate-y-[-4px] shadow-swiss' 
                        : 'bg-transparent border-gray-200 dark:border-zinc-800 text-black dark:text-white hover:border-black dark:hover:border-white'
                      }
                    `}
                  >
                    <span className="text-3xl">{interest.emoji}</span>
                    <span className="text-xs font-black uppercase tracking-wide">
                      {interest.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-6 border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-black">
            <Button fullWidth onClick={() => setScreen('dashboard')} disabled={user.interests.length === 0}>
              Запустить
            </Button>
          </div>
        </div>
      );
    }

    // 3. DASHBOARD
    const hasMessages = messages.length > 0;

    return (
      <div className={`h-full flex flex-col bg-white dark:bg-black animate-fade-in relative`}>
        <Drawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onOpenLibrary={() => setIsLibraryOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          userName={user.firstName}
        />

        {isLibraryOpen && <PromptLibraryScreen onClose={() => setIsLibraryOpen(false)} onSelectPrompt={handleLibrarySelect} />}
        {isSettingsOpen && <SettingsScreen onClose={() => setIsSettingsOpen(false)} onClearHistory={handleClearChat} currentFont={font} onFontChange={setFont} />}
        {isProfileOpen && <ProfileScreen onClose={() => setIsProfileOpen(false)} user={user} onUpdateUser={handleUpdateUser} />}

        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md sticky top-0 border-b border-gray-100 dark:border-zinc-900">
           <div className="flex items-center gap-2">
             {hasMessages ? (
                <button onClick={handleClearChat} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-black dark:text-white">
                  <ChevronLeft size={24} />
                </button>
             ) : (
                <button onClick={() => setIsDrawerOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-black dark:text-white">
                  <Menu size={24} />
                </button>
             )}
             <span className="text-lg font-black tracking-tight text-black dark:text-white uppercase">{activePersona.name}</span>
           </div>
           
           <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 text-black dark:text-white">
             {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
           </button>
        </header>

        {/* Chat */}
        <main className="flex-1 overflow-y-auto flex flex-col custom-scrollbar p-4 bg-white dark:bg-black">
          {hasMessages ? (
            <div className="flex flex-col gap-6 pb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex w-full animate-slide-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-5 rounded-2xl text-base font-medium shadow-sm border-2
                    ${msg.role === 'user' 
                      ? 'bg-black text-white border-black rounded-tr-none' 
                      : 'bg-white text-black border-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700 rounded-tl-none'
                    }
                  `}>
                    <div className="markdown-content">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start w-full">
                   <div className="bg-gray-100 dark:bg-zinc-800 px-5 py-4 rounded-2xl rounded-tl-none flex gap-2 items-center">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center gap-6 pb-20 opacity-40">
                <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                   <Zap className="text-black dark:text-white" size={40} strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl font-black text-black dark:text-white tracking-tighter text-center max-w-xs">
                  Привет, {user.firstName}
                </h1>
            </div>
          )}
        </main>

        {/* Input Area - Dock Style */}
        <div className={`p-4 bg-white dark:bg-black transition-all z-30`}>
            {!hasMessages && (
              <div className="mb-4">
                <PromptMarquee prompts={filteredPrompts} onSelect={handlePromptSelect} />
              </div>
            )}

            <div className="relative bg-gray-50 dark:bg-zinc-900 rounded-[2rem] p-2 border-2 border-transparent focus-within:border-black dark:focus-within:border-white transition-colors">
                  
                  {isPersonaMenuOpen && (
                      <div className="absolute bottom-[105%] left-0 w-64 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-swiss p-2 z-[60] animate-pop">
                        {PERSONAS.map(p => (
                            <button 
                                key={p.id}
                                onClick={() => { setActivePersona(p); setIsPersonaMenuOpen(false); }}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg font-bold text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${activePersona.id === p.id ? 'text-violet-600' : 'text-black dark:text-white'}`}
                            >
                                <span className="text-xl">{p.emoji}</span>
                                {p.name}
                            </button>
                        ))}
                      </div>
                  )}

                  <textarea 
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder={`Напиши сообщение...`}
                      className={`w-full bg-transparent text-black dark:text-white placeholder:text-gray-400 px-4 py-2 outline-none resize-none align-top font-medium ${hasMessages ? 'h-12' : 'h-20'}`}
                  />

                  <div className="flex items-center gap-2 px-2 pb-1">
                      <button 
                          onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
                          className="h-10 px-4 bg-white dark:bg-black rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wide border-2 border-transparent hover:border-gray-200 dark:hover:border-zinc-700 text-black dark:text-white transition-all"
                      >
                          {activePersona.emoji} {activePersona.name} <ChevronUp size={12} />
                      </button>

                      <div className="flex-1" />

                      <button onClick={handleSendMessage} disabled={!promptInput.trim()} className="h-10 w-10 flex items-center justify-center bg-violet-600 text-white rounded-full hover:bg-violet-700 active:scale-90 transition-all disabled:opacity-50 disabled:bg-gray-300">
                          <Send size={18} />
                      </button>
                  </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full ${getFontClass()}`}>
      {renderContent()}
    </div>
  );
}