import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Building, 
  Network, 
  Users, 
  Key, 
  HelpCircle, 
  Mic, 
  ChevronDown, 
  HardDrive, 
  FileText, 
  Receipt, 
  FileCheck2, 
  Sparkles, 
  LayoutGrid, 
  Check, 
  Layers, 
  Cpu, 
  Smartphone, 
  Flame, 
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ProjectItem, TabType } from '../types';

interface EnterpriseHeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  activeProject: ProjectItem;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  ecosystemMode: 'mashweer' | 'sameh';
  onToggleEcosystemMode: (mode: 'mashweer' | 'sameh') => void;
  onOpenVoiceCommand: () => void;
  onOpenContacts: () => void;
  onOpenCredentials: () => void;
  onOpenProjectSource: () => void;
  onOpenInquiries: () => void;
  pendingInquiriesCount: number;
}

export const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({
  currentTab,
  onSelectTab,
  activeProject,
  projects,
  onSelectProject,
  ecosystemMode,
  onToggleEcosystemMode,
  onOpenVoiceCommand,
  onOpenContacts,
  onOpenCredentials,
  onOpenProjectSource,
  onOpenInquiries,
  pendingInquiriesCount,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mashweerProjects = projects.filter(p => p.category === 'مشاوير' || p.id.includes('4b') || p.id.includes('daro') || p.id.includes('wekala') || p.id.includes('driver'));
  const samehProjects = projects.filter(p => p.category === 'نوب NOUB' || p.category === 'خاص' || p.id.includes('noub') || p.id.includes('kaggle') || p.id.includes('trade'));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm select-none text-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo + Dual Ecosystem Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Hypatia Brand Logo */}
          <button 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-right focus:outline-none group"
            title="الصفحة الرئيسية - لوحة العمليات"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
              <span className="font-mono font-black text-sm tracking-wider">HY</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>هيباتيا للتحكم المركزي</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                  v2026.9
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                نظام إدارة العمليات والسيادة التقنية
              </div>
            </div>
          </button>

          {/* Master Division Toggle: مشاوير vs م/ سامح ونوب */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onToggleEcosystemMode('mashweer')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                ecosystemMode === 'mashweer'
                  ? 'bg-white text-teal-800 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span>منظومة مشاوير</span>
            </button>
            <button
              onClick={() => onToggleEcosystemMode('sameh')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                ecosystemMode === 'sameh'
                  ? 'bg-white text-indigo-800 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>م/ سامح ونوب</span>
            </button>
          </div>

        </div>

        {/* Center: Categorized Dropdown Menus (Replacing overcrowded icons) */}
        <div ref={menuRef} className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700">
          
          {/* 1. المقر والعمليات (HQ & Ops) */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'hq' ? null : 'hq')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                ['hq_floorplan', 'neural_graph'].includes(currentTab) || activeMenu === 'hq'
                  ? 'bg-teal-50 text-teal-800 font-black'
                  : 'hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4 text-teal-600" />
              <span>المقر والشبكة</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'hq' ? 'rotate-180' : ''}`} />
            </button>

            {activeMenu === 'hq' && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => { onSelectTab('hq_floorplan'); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <Building className="w-4 h-4 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">مخطط المقر التفاعلي (Maadi Floorplan)</div>
                    <div className="text-[11px] text-slate-400">الرسم المعماري، المكاتب 1 حتى 7، وتوزيع الكاميرات</div>
                  </div>
                </button>
                <button
                  onClick={() => { onSelectTab('neural_graph'); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <Network className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">الجرافيك الحي التفاعلي (Live Matrix)</div>
                    <div className="text-[11px] text-slate-400">شبكة العلاقات والقرارات الفيزيائية المتحركة</div>
                  </div>
                </button>
                <button
                  onClick={() => { onOpenContacts(); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5 border-t border-slate-100"
                >
                  <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">دليل المسؤولين وجهات الاتصال</div>
                    <div className="text-[11px] text-slate-400">12 مسؤول: أبو خالد، سامح، هاني، محمد مصطفى...</div>
                  </div>
                </button>
                <button
                  onClick={() => { onOpenCredentials(); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <Key className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">خزينة الحسابات وتفويض المهام</div>
                    <div className="text-[11px] text-slate-400">كلمات المرور والمذكرة الاحتياطية عند الغياب</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 2. المشاريع والتطبيقات (Ecosystem Apps) */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'apps' ? null : 'apps')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                currentTab === 'projects' || activeMenu === 'apps'
                  ? 'bg-teal-50 text-teal-800 font-black'
                  : 'hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>المشاريع والتطبيقات</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'apps' ? 'rotate-180' : ''}`} />
            </button>

            {activeMenu === 'apps' && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 border-b border-slate-100 mb-1">
                  تطبيقات منظومة مشاوير ({mashweerProjects.length})
                </div>
                {mashweerProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { onSelectProject(p); onSelectTab('projects'); setActiveMenu(null); }}
                    className="w-full text-right px-2.5 py-1.5 rounded-xl hover:bg-slate-50 transition flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800">{p.name}</span>
                    <span className="text-[10px] text-slate-400">{p.status}</span>
                  </button>
                ))}

                <div className="text-[10px] font-bold text-slate-400 px-2 py-1 border-b border-slate-100 mt-2 mb-1">
                  منظومة م/ سامح ونوب وكاجل ({samehProjects.length})
                </div>
                {samehProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { onSelectProject(p); onSelectTab('projects'); setActiveMenu(null); }}
                    className="w-full text-right px-2.5 py-1.5 rounded-xl hover:bg-slate-50 transition flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800">{p.name}</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">{p.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. المالية والعقود والمشتريات (Finance & Procurement) */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'finance' ? null : 'finance')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                ['quotations', 'subscriptions', 'contracts'].includes(currentTab) || activeMenu === 'finance'
                  ? 'bg-teal-50 text-teal-800 font-black'
                  : 'hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>المالية والعقود</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'finance' ? 'rotate-180' : ''}`} />
            </button>

            {activeMenu === 'finance' && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => { onSelectTab('quotations'); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <Receipt className="w-4 h-4 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">عروض الأسعار والفواتير (Quotations & POs)</div>
                    <div className="text-[11px] text-slate-400">فواتير كيو تي اس، رد لاين، والأصدقاء (184,895 ج.م)</div>
                  </div>
                </button>
                <button
                  onClick={() => { onSelectTab('contracts'); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">عقود وتسليمات قيمة تك (Contracts)</div>
                    <div className="text-[11px] text-slate-400">خطة الـ 7 أسابيع و 5 محطات M1 إلى M5</div>
                  </div>
                </button>
                <button
                  onClick={() => { onSelectTab('subscriptions'); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5"
                >
                  <Receipt className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">سجل الاشتراكات والتجديدات</div>
                    <div className="text-[11px] text-slate-400">مواعيد التجديد مع أ/ هاني وتكاليف السيرفرات</div>
                  </div>
                </button>
                <button
                  onClick={() => { onOpenProjectSource(); setActiveMenu(null); }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-slate-50 transition flex items-start gap-2.5 border-t border-slate-100"
                >
                  <HardDrive className="w-4 h-4 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">شجرة أصول جوجل درايف (Hypatia_Source)</div>
                    <div className="text-[11px] text-slate-400">تفريعات الأصول والمجلدات المركزية</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 4. السجل العربي الشامل (Master Arabic Ledger) */}
          <button
            onClick={() => onSelectTab('master_ledger')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentTab === 'master_ledger'
                ? 'bg-teal-50 text-teal-800 font-black'
                : 'hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>السجل العربي (150+ نقطة)</span>
          </button>

          {/* 5. الشات والذكاء الاصطناعي */}
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentTab === 'chat'
                ? 'bg-teal-600 text-white font-black shadow-sm'
                : 'hover:bg-slate-100 text-teal-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>شات هيباتيا</span>
          </button>

        </div>

        {/* Right Side: Quick Action Pills */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Continuous Inquiries Badge Trigger */}
          <button
            onClick={onOpenInquiries}
            title="الأسئلة والاستفسارات المستمرة"
            className="relative px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">الأسئلة المعلقة</span>
            {pendingInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-mono font-bold text-[10px]">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Voice Command Button */}
          <button
            onClick={onOpenVoiceCommand}
            title="أمر صوتي مباشر لهيباتيا"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition active:scale-95 shadow-sm flex items-center gap-1.5"
          >
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">أمر صوتي</span>
          </button>

        </div>

      </div>
    </header>
  );
};
