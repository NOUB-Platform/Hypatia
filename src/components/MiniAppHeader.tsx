import React, { useState } from 'react';
import { 
  ChevronDown, 
  Plus, 
  Check, 
  Mic,
  Calendar,
  Users,
  Key,
  HelpCircle,
  Receipt,
  Menu,
  HardDrive,
  Network,
  Building
} from 'lucide-react';
import { ProjectItem } from '../types';

interface MiniAppHeaderProps {
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  onOpenNewProjectModal: () => void;
  onOpenSettings: () => void;
  onOpenVoiceCommand?: () => void;
  onOpenContacts?: () => void;
  onOpenCredentials?: () => void;
  onOpenProjectSource?: () => void;
  onOpenNeuralGraph?: () => void;
  onOpenHQFloorplan?: () => void;
  onOpenMore?: () => void;
  pendingInquiriesCount?: number;
  onOpenInquiries?: () => void;
}

export const MiniAppHeader: React.FC<MiniAppHeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenSettings,
  onOpenVoiceCommand,
  onOpenContacts,
  onOpenCredentials,
  onOpenProjectSource,
  onOpenNeuralGraph,
  onOpenHQFloorplan,
  onOpenMore,
  pendingInquiriesCount = 0,
  onOpenInquiries,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-2.5 sm:px-4 py-2 shadow-sm select-none text-slate-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Left: Hypatia Minimalist Brand Logo (Geometric Modern SVG) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative group cursor-pointer" onClick={onOpenMore}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-100 group-hover:scale-105 transition">
              {/* Modern Hypatia Monogram Logo */}
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 4v16" />
                <path d="M20 4v16" />
                <path d="M4 12h16" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-white"></span>
          </div>

          <div className="hidden xs:block text-right">
            <span className="text-[11px] font-black text-slate-900 tracking-wider font-mono block leading-none">
              HYPATIA
            </span>
            <span className="text-[9px] text-teal-700 font-bold block mt-0.5">
              مشاوير 2026
            </span>
          </div>
        </div>

        {/* Center: Clean Project Switcher Pill Dropdown */}
        <div className="relative flex-1 max-w-[170px] xs:max-w-xs sm:max-w-sm">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500/60 transition shadow-inner text-right"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
              <div className="truncate">
                <span className="text-[11px] sm:text-xs font-bold text-slate-900 block truncate">
                  {activeProject.name}
                </span>
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} shrink-0`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 px-2 py-1 flex items-center justify-between border-b border-slate-100 mb-1">
                <span>المشاريع والتطبيقات ({projects.length})</span>
                <span>المنظومات والأبحاث</span>
              </div>

              <div className="space-y-1">
                {projects.map((p) => {
                  const isSelected = p.id === activeProject.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-right transition ${
                        isSelected 
                          ? 'bg-teal-50 border border-teal-200 text-teal-800' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="truncate pr-1">
                        <div className="text-xs font-semibold flex items-center gap-1.5 truncate">
                          <span>{p.name}</span>
                          {p.category === 'مشاوير' && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                              مشاوير
                            </span>
                          )}
                          {p.category === 'خاص' && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                              شخصي / كاجل
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {p.status}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Add New Project Button */}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenNewProjectModal();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-teal-700 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ إضافة تطبيق / مشروع جديد</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Action Triggers */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* HQ Architectural Floorplan Trigger */}
          {onOpenHQFloorplan && (
            <button
              onClick={onOpenHQFloorplan}
              title="مخطط المقر التفاعلي والعتاد الهندسي (Maadi HQ Digital Twin)"
              className="p-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 text-emerald-800 transition shadow-sm"
            >
              <Building className="w-4 h-4 text-emerald-700" />
            </button>
          )}

          {/* Live Neural Graph Trigger */}
          {onOpenNeuralGraph && (
            <button
              onClick={onOpenNeuralGraph}
              title="جرافيك شبكة العلاقات الحية والمتحركة (Live Neural Matrix)"
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-50 to-indigo-50 hover:from-cyan-100 hover:to-indigo-100 border border-cyan-200 text-cyan-800 transition shadow-sm"
            >
              <Network className="w-4 h-4 text-cyan-600 animate-pulse" />
            </button>
          )}

          {/* Google Drive Project Source Seed Trigger */}
          {onOpenProjectSource && (
            <button
              onClick={onOpenProjectSource}
              title="شجرة أصول جوجل درايف (Project Source Seed)"
              className="p-2 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 border border-teal-200 text-teal-800 transition shadow-sm"
            >
              <HardDrive className="w-4 h-4 text-teal-700" />
            </button>
          )}

          {/* Contacts Trigger */}
          {onOpenContacts && (
            <button
              onClick={onOpenContacts}
              title="دليل جهات الاتصال"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
            >
              <Users className="w-4 h-4" />
            </button>
          )}

          {/* Credentials Safe Trigger */}
          {onOpenCredentials && (
            <button
              onClick={onOpenCredentials}
              title="خزينة الحسابات وتفويض المهام"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
            >
              <Key className="w-4 h-4" />
            </button>
          )}

          {/* Continuous Inquiries Badge */}
          {onOpenInquiries && (
            <button
              onClick={onOpenInquiries}
              title="الأسئلة والتحديثات المستمرة"
              className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-amber-700 transition"
            >
              <HelpCircle className="w-4 h-4" />
              {pendingInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-mono font-bold text-[9px] min-w-[14px] text-center animate-pulse">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
          )}

          {/* Voice Command Button */}
          {onOpenVoiceCommand && (
            <button
              onClick={onOpenVoiceCommand}
              title="أمر صوتي لهيباتيا"
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition active:scale-95 shadow-sm"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
