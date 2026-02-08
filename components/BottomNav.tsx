import React from 'react';
import { Home, Heart, User, Sparkles } from 'lucide-react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: AppScreen.HOME, icon: Home, label: 'Hoje' },
    { id: AppScreen.FEED, icon: Heart, label: 'Comunidade' },
    { id: AppScreen.PROFILE, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-end pb-4">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-brand-600 -translate-y-2' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-brand-50 shadow-sm' : ''}`}>
                <item.icon size={isActive ? 28 : 24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};