import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Building, 
  Network, 
  Users, 
  Key, 
  HelpCircle, 
  Mic, 
  ChevronRight, 
  ChevronLeft, 
  HardDrive, 
  FileText, 
  Receipt, 
  FileCheck2, 
  Sparkles, 
  LayoutGrid, 
  Check, 
  CheckSquare,
  Layers, 
  Cpu, 
  Smartphone, 
  Flame, 
  Search,
  ExternalLink,
  BookOpen,
  Calendar,
  Camera,
  Server,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X,
  Code2,
  Database,
  Wrench,
  Mail,
  FolderArchive,
  ArrowUpRight,
  Shield,
  Clock,
  Sparkle,
  Radio,
  Activity
} from 'lucide-react';
import { ProjectItem, TabType } from '../types';
import { KaggleWhiteLionModal } from './KaggleWhiteLionModal';

interface AdminSidebarLayoutProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  activeProject: ProjectItem;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenVoiceCommand: () => void;
  onOpenContacts: () => void;
  onOpenCredentials: () => void;
  onOpenProjectSource: () => void;
  onOpenInquiries: () => void;
  pendingInquiriesCount: number;
  children: React.ReactNode;
  onOpenMasterRoadmap?: () => void;
  onOpenTeamSimulation?: () => void;
  onOpenWorkflows?: () => void;
  onOpenServerRack?: () => void;
}

export const AdminSidebarLayout: React.FC<AdminSidebarLayoutProps> = ({
  currentTab,
  onSelectTab,
  activeProject,
  projects,
  onSelectProject,
  onOpenVoiceCommand,
  onOpenContacts,
  onOpenCredentials,
  onOpenProjectSource,
  onOpenInquiries,
  pendingInquiriesCount,
  children,
  onOpenMasterRoadmap,
  onOpenTeamSimulation,
  onOpenWorkflows,
  onOpenServerRack,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobileMenuOpen = false;
  const [isKaggleModalOpen, setIsKaggleModalOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Real dynamic live date and time
  const [liveClock, setLiveClock] = useState(() => {
    const d = new Date();
    return {
      date: d.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      time: d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setLiveClock({
        date: d.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        time: d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // 1. Mashweer Enterprise Applications Suite Exclusively (4B, WeKaLa, Daro)
  const mashweerApps = useMemo(() => {
    return projects.filter(
      p => (p.category === 'مشاوير' || 
           p.id.includes('4b') || 
           p.id.includes('daro') || 
           p.id.includes('wekala') || 
           p.id.includes('driver')) &&
           !p.id.includes('kaggle') &&
           !p.id.includes('noub')
    );
  }, [projects]);

  // Search Results
  const searchResults = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return [];
    
    const results: Array<{ title: string; subtitle: string; tab?: TabType; project?: ProjectItem; action?: () => void }> = [];

    // Search Tabs
    const tabMap: Array<{ id: TabType; name: string; desc: string }> = [
      { id: 'home', name: 'لوحة القيادة الرئيسية (Overview)', desc: 'نظرة عامة ومؤشرات التشغيل' },
      { id: 'hq_floorplan', name: 'مخطط مقر المعادي الفعلي (HQ Floorplan)', desc: 'الرسم المعماري 26×21م وتوزيع الكاميرات والسيرفرات' },
      { id: 'neural_graph', name: 'الجرافيك الحي والربط العصبي (Live Graph)', desc: 'خريطة العلاقات الهندسية اللحظية' },
      { id: 'quotations', name: 'الفواتير الضريبية وأوامر الشراء', desc: 'فاتورة QTS (96,295 ج) وريد لاين (38,600 ج) ووي (50,000 ج)' },
      { id: 'contracts', name: 'عقود وتسليمات قيمة تك (Qema Tech)', desc: 'جدول الـ 7 أسابيع والربط المالي' },
      { id: 'subscriptions', name: 'الاشتراكات والتجديدات الدورية', desc: 'خدمات الاستضافة والسحابة والنطاقات' },
      { id: 'agenda', name: 'جدول الأعمال والمواعيد', desc: 'مواعيد الاجتماعات والتشغيل' },
      { id: 'chat', name: 'شات هيباتيا ومساعد الذكاء الاصطناعي', desc: 'الاستفسارات والأوامر التنفيذية' },
      { id: 'master_ledger', name: 'السجل العربي الشامل', desc: '150+ قرار وتوثيق مؤسسي' },
      { id: 'tasks', name: 'مهام المنظومة ومتابعة التنفيذ', desc: '16 مهمة إدارية وتقنية' },
      { id: 'code', name: 'المستودعات البرمجية والأكواد', desc: 'مستودعات GitHub والتطوير' },
      { id: 'database', name: 'قواعد البيانات والـ API', desc: 'جداول Supabase والربط' },
      { id: 'tools', name: 'الأدوات والروابط الهندسية', desc: 'نقاط الـ API والمكتبات' },
      { id: 'mashweer_emails', name: 'إيميلات موظفي مشاوير', desc: 'حسابات @mashweer.net' },
      { id: 'providers', name: 'دليل الموردين وشركاء الخدمات', desc: 'بيانات الشركات والمزودين' },
      { id: 'meshawir_network', name: 'فحص الشبكة والـ Ping لمشاوير', desc: 'متابعة حية لخوادم وسويتشات وكاميرات وخطوط مشاوير' },
      { id: 'settings', name: 'إعدادات المنظومة والصلاحيات', desc: 'تخصيص النظام والمفاتيح' },
    ];

    tabMap.forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) {
        results.push({ title: t.name, subtitle: t.desc, tab: t.id });
      }
    });

    // Search Mashweer Apps
    mashweerApps.forEach(app => {
      if (app.name.toLowerCase().includes(q) || app.description.toLowerCase().includes(q) || app.code.toLowerCase().includes(q)) {
        results.push({ title: app.name, subtitle: `تطبيق من منظومة مشاوير (${app.code})`, tab: 'projects', project: app });
      }
    });

    return results.slice(0, 6);
  }, [globalSearch, mashweerApps]);

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
  };

  const handleProjectClick = (p: ProjectItem) => {
    onSelectProject(p);
    onSelectTab('projects');
  };

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'home': return 'لوحة القيادة الرئيسية (Overview)';
      case 'hq_floorplan': return 'مخطط مقر المعادي الفعلي';
      case 'neural_graph': return 'الجرافيك الحي والربط الهندسي';
      case 'quotations': return 'الفواتير الضريبية والمشتريات';
      case 'contracts': return 'عقود وتسليمات قيمة تك';
      case 'subscriptions': return 'سجل الاشتراكات والتجديدات';
      case 'agenda': return 'جدول الأعمال والمواعيد';
      case 'chat': return 'شات هيباتيا ومساعد العمليات';
      case 'master_ledger': return 'السجل العربي الشامل';
      case 'tasks': return 'مهام المنظومة ومتابعة التنفيذ';
      case 'projects': return `مشروع: ${activeProject.name.split(' (')[0]}`;
      case 'code': return 'المستودعات البرمجية والأكواد';
      case 'database': return 'قواعد البيانات (Supabase)';
      case 'tools': return 'الأدوات ونقاط الربط API';
      case 'meshawir_network': return 'فحص الشبكة والـ Ping ومتابعة البنية التحتية لمشاوير';
      case 'settings': return 'إعدادات المنظومة';
      case 'mashweer_emails': return 'إيميلات موظفي مشاوير';
      default: return 'منظومة مشاوير للمنصات الرقمية';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-['Cairo',sans-serif] selection:bg-teal-500 selection:text-white antialiased">
      
      {/* 1. PERMANENT COLLAPSIBLE RIGHT SIDEBAR (Always Docked as an Admin Dashboard) */}
      <aside 
        className={`fixed inset-y-0 right-0 z-40 bg-white border-l border-slate-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 select-none ${
          isSidebarCollapsed ? 'w-20' : 'w-64 sm:w-72'
        }`}
      >
        {/* Sidebar Header: Enterprise Branding & Toggles */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-3 sm:px-4 shrink-0 bg-white">
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-700 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 shrink-0">
                <span className="font-mono font-black text-sm tracking-wider">M</span>
              </div>
              <div className="truncate text-right">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-black text-slate-900 truncate">مشاوير للمنصات</h1>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-teal-50 text-teal-800 font-bold border border-teal-200/70">
                    مؤسسي
                  </span>
                </div>
                <p className="text-[10px] text-teal-700 font-bold truncate">بوابة العمليات والـ IT • هيباتيا</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center text-white font-mono font-black text-sm shadow-md">
              M
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Collapse Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 items-center justify-center transition shrink-0"
              title={isSidebarCollapsed ? 'توسيع القائمة' : 'تصغير القائمة'}
            >
              {isSidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sidebar Scrollable Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin">
          
          {/* Section 1: Command & Dashboards */}
          <div className="space-y-1">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 text-right">
                لوحات القيادة والتحكم
              </div>
            )}

            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'home'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="نظرة عامة شاملة (Overview)"
            >
              <LayoutGrid className={`w-4 h-4 shrink-0 ${currentTab === 'home' ? 'text-teal-600' : 'text-slate-400'}`} />
              {(!isSidebarCollapsed || isMobileMenuOpen) && <span>الرئيسية الشاملة (Overview)</span>}
            </button>

            <button
              onClick={() => handleNavClick('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'agenda'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="جدول الأعمال والعمليات"
            >
              <Calendar className={`w-4 h-4 shrink-0 ${currentTab === 'agenda' ? 'text-teal-600' : 'text-slate-400'}`} />
              {(!isSidebarCollapsed || isMobileMenuOpen) && <span>جدول الأعمال والعمليات</span>}
            </button>

            <button
              onClick={() => handleNavClick('chat')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'chat'
                  ? 'bg-teal-600 text-white font-black shadow-md'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="شات ومساعد هيباتيا الذكي"
            >
              <Sparkles className={`w-4 h-4 shrink-0 ${currentTab === 'chat' ? 'text-white' : 'text-teal-600'}`} />
              {(!isSidebarCollapsed || isMobileMenuOpen) && <span>شات هيباتيا ومساعد العمليات</span>}
            </button>

            <button
              onClick={() => handleNavClick('neural_graph')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'neural_graph'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="الجرافيك الحي والربط العصبي"
            >
              <div className="flex items-center gap-3 truncate">
                <Network className={`w-4 h-4 shrink-0 ${currentTab === 'neural_graph' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">الجرافيك الحي والربط</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-800 font-mono">
                  60 FPS
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('master_ledger')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'master_ledger'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="السجل العربي الشامل"
            >
              <div className="flex items-center gap-3 truncate">
                <BookOpen className={`w-4 h-4 shrink-0 ${currentTab === 'master_ledger' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">السجل العربي الشامل</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                  150+ بند
                </span>
              )}
            </button>

            {/* Master 135 Interactive Roadmap Trigger */}
            {onOpenMasterRoadmap && (
              <button
                onClick={onOpenMasterRoadmap}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 shadow-2xs group"
                title="لوحة الـ 135 مهمة التفاعلية"
              >
                <div className="flex items-center gap-3 truncate">
                  <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 group-hover:scale-110 transition-transform" />
                  {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate font-black">لوحة الـ 135 مهمة التفاعلية</span>}
                </div>
                {(!isSidebarCollapsed || isMobileMenuOpen) && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-600 text-white font-mono font-black">
                    135
                  </span>
                )}
              </button>
            )}

            {/* Team Simulation Profiles Trigger */}
            {onOpenTeamSimulation && (
              <button
                onClick={onOpenTeamSimulation}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                title="محاكاة فريق العمل وأصحاب القرار"
              >
                <div className="flex items-center gap-3 truncate">
                  <Users className="w-4 h-4 text-teal-600 shrink-0" />
                  {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">محاكاة فريق العمل والقدرات</span>}
                </div>
              </button>
            )}

            {/* Workflows & Flowcharts Trigger */}
            {onOpenWorkflows && (
              <button
                onClick={onOpenWorkflows}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                title="المخططات الهندسية ودورات العمل"
              >
                <div className="flex items-center gap-3 truncate">
                  <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                  {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">المخططات ودورات العمل</span>}
                </div>
              </button>
            )}
          </div>

          {/* Section 2: Mashweer Enterprise Applications Suite */}
          <div className="space-y-1">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>منظومة وتطبيقات مشاوير</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                  {mashweerApps.length} تطبيقات
                </span>
              </div>
            )}

            {mashweerApps.map((app) => {
              const isSelected = app.id === activeProject.id && currentTab === 'projects';
              return (
                <button
                  key={app.id}
                  onClick={() => handleProjectClick(app)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                    isSelected
                      ? 'bg-teal-50 text-teal-950 font-black shadow-xs border border-teal-300/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title={app.name}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Smartphone className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                    {(!isSidebarCollapsed || isMobileMenuOpen) && (
                      <span className="truncate">{app.name.split(' (')[0]}</span>
                    )}
                  </div>
                  {(!isSidebarCollapsed || isMobileMenuOpen) && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-500">
                      {app.code}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 3: Headquarters, Network & Hardware */}
          <div className="space-y-1">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 text-right">
                مقر المعادي والعتاد والشبكة
              </div>
            )}

            {/* The Server Rack Navigation Item */}
            <button
              onClick={() => {
                if (onOpenServerRack) {
                  onOpenServerRack();
                } else {
                  handleNavClick('server_rack');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'server_rack'
                  ? 'bg-cyan-950/90 text-cyan-200 font-black shadow-xs border border-cyan-500/80'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="كابينة الراك المركزية 27U ومحتوياتها"
            >
              <div className="flex items-center gap-3 truncate">
                <Server className={`w-4 h-4 shrink-0 ${currentTab === 'server_rack' ? 'text-cyan-400' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate font-black">الراك (كابينة 27U)</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-900 font-mono font-bold">
                  27U
                </span>
              )}
            </button>

            {/* Meshawir Network & Ping Tool Navigation Item */}
            <button
              onClick={() => handleNavClick('meshawir_network')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'meshawir_network'
                  ? 'bg-cyan-50 text-cyan-950 font-black shadow-xs border border-cyan-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="فحص الشبكة والـ Ping ومتابعة البنية التحتية لشركة مشاوير"
            >
              <div className="flex items-center gap-3 truncate">
                <Radio className={`w-4 h-4 shrink-0 ${currentTab === 'meshawir_network' ? 'text-cyan-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate font-black">فحص الشبكة والـ Ping (مشاوير)</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-100 text-cyan-900 font-mono font-bold">
                  12 نقطة
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('hq_floorplan')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'hq_floorplan'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="مخطط مقر المعادي الفعلي المعماري"
            >
              <div className="flex items-center gap-3 truncate">
                <Building className={`w-4 h-4 shrink-0 ${currentTab === 'hq_floorplan' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">مخطط المقر الفعلي (26×21م)</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  8 مكاتب
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('quotations')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'quotations'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="الفواتير الضريبية وأوامر الشراء"
            >
              <div className="flex items-center gap-3 truncate">
                <Receipt className={`w-4 h-4 shrink-0 ${currentTab === 'quotations' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">الفواتير الضريبية والمشتريات</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                  185,266 ج
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('subscriptions')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'subscriptions'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="سجل الاشتراكات والتجديدات"
            >
              <div className="flex items-center gap-3 truncate">
                <Clock className={`w-4 h-4 shrink-0 ${currentTab === 'subscriptions' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">الاشتراكات والتجديدات</span>}
              </div>
            </button>
          </div>

          {/* Section 4: Contracts, Vendors & Corporate Directory */}
          <div className="space-y-1">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 text-right">
                التعاقدات والإدارة والمسؤولين
              </div>
            )}

            <button
              onClick={() => handleNavClick('contracts')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'contracts'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="عقود وتسليمات شركة قيمة تك"
            >
              <div className="flex items-center gap-3 truncate">
                <FileCheck2 className={`w-4 h-4 shrink-0 ${currentTab === 'contracts' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">عقود وتسليمات قيمة تك</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-mono">
                  7 أسابيع
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('mashweer_emails')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'mashweer_emails'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="إيميلات موظفي مشاوير الرسمية"
            >
              <div className="flex items-center gap-3 truncate">
                <Mail className={`w-4 h-4 shrink-0 ${currentTab === 'mashweer_emails' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">إيميلات مشاوير (@mashweer.net)</span>}
              </div>
            </button>

            <button
              onClick={onOpenContacts}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-right"
              title="دليل المسؤولين وفريق المقر"
            >
              <div className="flex items-center gap-3 truncate">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">دليل مسؤولي المقر والمهندسين</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-mono">
                  12 جهة
                </span>
              )}
            </button>

            <button
              onClick={onOpenCredentials}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-right"
              title="خزينة الحسابات وتفويض المهام"
            >
              <div className="flex items-center gap-3 truncate">
                <Key className="w-4 h-4 text-slate-400 shrink-0" />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">خزينة الحسابات والتفويض</span>}
              </div>
            </button>

            <button
              onClick={onOpenProjectSource}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-right"
              title="شجرة أصول وملفات جوجل درايف"
            >
              <div className="flex items-center gap-3 truncate">
                <HardDrive className="w-4 h-4 text-slate-400 shrink-0" />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">أصول وملفات جوجل درايف</span>}
              </div>
              {(!isSidebarCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 font-mono">
                  15 مجلد
                </span>
              )}
            </button>
          </div>

          {/* Section 5: Engineering, Code & Database */}
          <div className="space-y-1">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 text-right">
                التطوير والهندسة وقواعد البيانات
              </div>
            )}

            <button
              onClick={() => handleNavClick('tasks')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'tasks'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="مهام المنظومة ومتابعة التنفيذ"
            >
              <div className="flex items-center gap-3 truncate">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${currentTab === 'tasks' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">مهام المنظومة ومتابعة التنفيذ</span>}
              </div>
            </button>

            <button
              onClick={() => handleNavClick('code')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'code'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="المستودعات البرمجية والأكواد"
            >
              <div className="flex items-center gap-3 truncate">
                <Code2 className={`w-4 h-4 shrink-0 ${currentTab === 'code' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">الأكواد والمستودعات</span>}
              </div>
            </button>

            <button
              onClick={() => handleNavClick('database')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'database'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="قواعد البيانات والـ API"
            >
              <div className="flex items-center gap-3 truncate">
                <Database className={`w-4 h-4 shrink-0 ${currentTab === 'database' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">قواعد البيانات (Supabase)</span>}
              </div>
            </button>

            <button
              onClick={() => handleNavClick('tools')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'tools'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="الأدوات ونقاط الـ API"
            >
              <div className="flex items-center gap-3 truncate">
                <Wrench className={`w-4 h-4 shrink-0 ${currentTab === 'tools' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">الأدوات ونقاط الربط API</span>}
              </div>
            </button>

            <button
              onClick={() => handleNavClick('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition text-right ${
                currentTab === 'settings'
                  ? 'bg-teal-50 text-teal-900 font-black shadow-xs border border-teal-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title="الإعدادات والصلاحيات"
            >
              <div className="flex items-center gap-3 truncate">
                <SlidersHorizontal className={`w-4 h-4 shrink-0 ${currentTab === 'settings' ? 'text-teal-600' : 'text-slate-400'}`} />
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">إعدادات المنظومة</span>}
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Sameh Yassin Profile Tile & Discrete Kaggle Trigger */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
          {!isSidebarCollapsed || isMobileMenuOpen ? (
            <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  SY
                </div>
                <div className="truncate text-right">
                  <div className="text-xs font-black text-slate-900 truncate">م/ سامح يس</div>
                  <div className="text-[10px] text-teal-700 font-bold truncate">مدير التكنولوجيا والـ IT (CTO)</div>
                  <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>مقر المعادي • نشط</span>
                  </div>
                </div>
              </div>

              {/* Discrete Kaggle Button - As requested: 'بيك أيقونة كده تحت لما سامح يخش عليها يبقى يلاقي حاجته وسميها كاجل' */}
              <button
                onClick={() => setIsKaggleModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition flex items-center gap-1.5 shrink-0 shadow-xs group"
                title="كاجل (البحث العلمي ومحرك الأسد الأبيض - ديدلاين 17 أكتوبر)"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-12 transition-transform" />
                <span className="text-[11px] font-black tracking-tight">كاجل</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs" title="م/ سامح يس (CTO)">
                SY
              </div>
              <button
                onClick={() => setIsKaggleModalOpen(true)}
                className="w-10 h-10 mx-auto rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center shadow-xs"
                title="كاجل"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MAIN DESKTOP WORKSPACE (Responsive Margin based on sidebar width) */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'mr-20' : 'mr-64 sm:mr-72'
        }`}
      >
        
        {/* Top Navbar Header (Clean, Light, Minimal Daylight Style) */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 shadow-xs select-none">
          
          {/* Active Tab Indicator & Context */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                {getTabTitle(currentTab)}
              </h2>
            </div>

            {/* Real-time Dynamic Live Date & Clock Chip */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-mono text-slate-600 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-bold text-slate-700">{liveClock.date}</span>
              <span className="text-slate-300">|</span>
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-teal-700">{liveClock.time}</span>
            </div>
          </div>

          {/* Search Box Input */}
          <div className="relative flex-1 max-w-md mx-2">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="ابحث في السيرفرات، الكاميرات، التطبيقات، العقود..."
              className="w-full pr-10 pl-10 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
            {globalSearch && (
              <button 
                onClick={() => setGlobalSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}

            {/* Instant Search Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 border-b border-slate-100 mb-1">
                  نتائج البحث السريع ({searchResults.length})
                </div>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (res.project) onSelectProject(res.project);
                      if (res.tab) onSelectTab(res.tab);
                      if (res.action) res.action();
                      setGlobalSearch('');
                    }}
                    className="w-full px-3 py-2 text-right hover:bg-teal-50 transition flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{res.title}</div>
                      <div className="text-[10px] text-slate-500">{res.subtitle}</div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Master Interactive Roadmap (135 Tasks) Button */}
            {onOpenMasterRoadmap && (
              <button
                onClick={onOpenMasterRoadmap}
                title="لوحة المهام والمحاور الـ 135 التفاعلية (Master Roadmaps Board)"
                className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <CheckSquare className="w-4 h-4 text-emerald-200 shrink-0" />
                <span className="hidden sm:inline">لوحة الـ 135 مهمة</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white font-mono text-[10px]">
                  135
                </span>
              </button>
            )}

            {/* Team Simulation Profiles Button */}
            {onOpenTeamSimulation && (
              <button
                onClick={onOpenTeamSimulation}
                title="محاكاة فريق العمل وأصحاب القرار (القدرات ومحرك توجيه المشكلات)"
                className="px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200/90 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <Users className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="hidden md:inline">محاكاة الفريق</span>
              </button>
            )}

            {/* Flowcharts & Workflows Button */}
            {onOpenWorkflows && (
              <button
                onClick={onOpenWorkflows}
                title="المخططات الهندسية ودورات العمل (دورة 4B، بنية WE، ومشتريات المقر)"
                className="px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200/90 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="hidden md:inline">المخططات</span>
              </button>
            )}

            {/* Server Rack 27U Button */}
            <button
              onClick={() => {
                if (onOpenServerRack) {
                  onOpenServerRack();
                } else {
                  handleNavClick('server_rack');
                }
              }}
              title="كابينة الراك المركزية بيرلا 27U ومحتوياتها"
              className="px-2.5 py-1.5 rounded-2xl bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Server className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline font-black">الراك</span>
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/30 text-cyan-200 font-mono text-[9px] font-bold">
                27U
              </span>
            </button>

            {/* Continuous Inquiries Alert Button */}
            <button
              onClick={onOpenInquiries}
              title="الأسئلة والاستفسارات المستمرة"
              className="relative px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="hidden md:inline">الأسئلة المعلقة</span>
              {pendingInquiriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-mono font-bold text-[10px]">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>

          </div>

        </header>

        {/* Main Content Workspace Viewport */}
        <main className="flex-1 p-3 sm:p-5 lg:p-7 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
          {children}
        </main>

      </div>

      {/* 3. DISCRETE KAGGLE & WHITE LION PROTOCOL MODAL */}
      <KaggleWhiteLionModal 
        isOpen={isKaggleModalOpen} 
        onClose={() => setIsKaggleModalOpen(false)} 
      />

    </div>
  );
};
