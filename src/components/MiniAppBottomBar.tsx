import React from 'react';
import { 
  Bot, 
  Smartphone, 
  HelpCircle, 
  Calendar, 
  Menu,
  Flame
} from 'lucide-react';
import { TabType } from '../types';

interface MiniAppBottomBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenMore: () => void;
  isMoreOpen?: boolean;
  projectsCount?: number;
  pendingInquiriesCount?: number;
}

export const MiniAppBottomBar: React.FC<MiniAppBottomBarProps> = ({
  currentTab,
  onSelectTab,
  onOpenMore,
  isMoreOpen = false,
  pendingInquiriesCount = 5,
}) => {
  const isMoreTab = [
    'projects',
    'contracts', 
    'quotations', 
    'subscriptions',
    'neural_graph', 
    'hq_floorplan',
    'code', 
    'database', 
    'providers', 
    'tools', 
    'mashweer_emails', 
    'tasks', 
    'settings'
  ].includes(currentTab);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg safe-area-pb select-none text-slate-600">
      <div className="max-w-md sm:max-w-lg mx-auto flex items-center justify-between px-3 py-1.5 relative">
        
        {/* 1. Home / Daily Ops Briefing Tab */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'home'
              ? 'text-teal-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Flame className={`w-5 h-5 transition-transform ${currentTab === 'home' ? 'stroke-[2.5px] scale-110 text-teal-600' : 'stroke-[1.8px]'}`} />
          </div>
          <span className="text-[10px] mt-1 whitespace-nowrap">الحدث الآن</span>
          {currentTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-0.5"></span>
          )}
        </button>

        {/* 2. Agenda Tab (Saturday 26/9 & Decisions) */}
        <button
          onClick={() => onSelectTab('agenda')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'agenda'
              ? 'text-teal-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 transition-transform ${currentTab === 'agenda' ? 'stroke-[2.5px] scale-110 text-teal-600' : 'stroke-[1.8px]'}`} />
          </div>
          <span className="text-[10px] mt-1 whitespace-nowrap">جدول الأعمال</span>
          {currentTab === 'agenda' && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-0.5"></span>
          )}
        </button>

        {/* 3. CENTER BUTTON: Sculpted Curved Circular Chat FAB with Web3 Monogram */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-3.5 z-20">
          <button
            onClick={() => onSelectTab('chat')}
            aria-label="العودة للشات الذكي مع هيباتيا"
            className={`w-14 h-14 rounded-2xl p-0.5 transition-all transform active:scale-95 shadow-xl ${
              currentTab === 'chat'
                ? 'bg-gradient-to-tr from-teal-400 via-cyan-400 to-indigo-500 ring-4 ring-teal-100/80 scale-105 shadow-teal-500/30'
                : 'bg-gradient-to-tr from-slate-800 via-teal-700 to-cyan-600 hover:scale-105 shadow-slate-900/30'
            }`}
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-teal-300 relative overflow-hidden group border border-teal-500/20">
              {/* Futuristic Cyber Monogram 'H' */}
              <div className="relative z-10 flex items-center justify-center">
                <svg className="w-7 h-7 transition-transform group-hover:scale-110" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Hexagon Outer Guide */}
                  <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" stroke="url(#hex-grad)" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
                  {/* Stylized Cyber Monogram 'H' */}
                  <path d="M9 8V24M23 8V24M9 16H23" stroke="url(#h-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Central Radiant Neural Core */}
                  <circle cx="16" cy="16" r="2.2" fill="#2dd4bf" className="animate-pulse" />
                  <defs>
                    <linearGradient id="h-grad" x1="9" y1="8" x2="23" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2dd4bf" />
                      <stop offset="0.5" stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="hex-grad" x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2dd4bf" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span className="text-[8px] font-black z-10 text-cyan-200 tracking-wider font-mono -mt-0.5">
                HYPATIA
              </span>
            </div>
          </button>
          <span className={`text-[10px] mt-1 font-bold whitespace-nowrap ${currentTab === 'chat' ? 'text-teal-700' : 'text-slate-500'}`}>
            المحرك الذكي
          </span>
        </div>

        {/* 4. Inquiries Tab */}
        <button
          onClick={() => onSelectTab('inquiries')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            currentTab === 'inquiries'
              ? 'text-amber-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <HelpCircle className={`w-5 h-5 transition-transform ${currentTab === 'inquiries' ? 'stroke-[2.5px] scale-110 text-amber-600' : 'stroke-[1.8px]'}`} />
            {pendingInquiriesCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 py-0.1 rounded-full bg-rose-600 text-white font-mono font-bold text-[9px] min-w-[14px] text-center animate-pulse">
                {pendingInquiriesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 whitespace-nowrap">الأسئلة</span>
          {currentTab === 'inquiries' && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5"></span>
          )}
        </button>

        {/* 5. More Menu Tab */}
        <button
          onClick={onOpenMore}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            isMoreOpen || isMoreTab
              ? 'text-teal-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Menu className={`w-5 h-5 transition-transform ${isMoreOpen || isMoreTab ? 'stroke-[2.5px] scale-110 text-teal-600' : 'stroke-[1.8px]'}`} />
            {isMoreTab && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-teal-600"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 whitespace-nowrap">المزيد ☰</span>
          {(isMoreOpen || isMoreTab) && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-0.5"></span>
          )}
        </button>

      </div>
    </nav>
  );
};
