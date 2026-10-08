import React from 'react';
import { 
  X, 
  Database, 
  Server, 
  Mail, 
  SlidersHorizontal, 
  CheckSquare, 
  Lock, 
  Bot, 
  Sparkles, 
  ExternalLink,
  ChevronLeft,
  Calendar,
  Users,
  Key,
  Receipt,
  FileCheck2,
  FileText,
  Code2,
  Network,
  HelpCircle,
  Flame,
  Cloud,
  Download,
  Building2,
  Building,
  Github,
  Scale,
  HardDrive,
  BookOpen,
  Radio
} from 'lucide-react';
import { TabType, ProjectItem } from '../types';

interface MoreMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  currentTab: TabType;
  activeProject: ProjectItem;
  pendingInquiriesCount?: number;
  onAskHypatia: (prompt: string) => void;
  onOpenContacts: () => void;
  onOpenCredentials: () => void;
  onOpenProjectSource?: () => void;
  onTriggerDriveSync?: () => void;
  onDownloadZip?: () => void;
  isDriveSyncing?: boolean;
}

export const MoreMenuDrawer: React.FC<MoreMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  currentTab,
  activeProject,
  pendingInquiriesCount = 0,
  onAskHypatia,
  onOpenContacts,
  onOpenCredentials,
  onOpenProjectSource,
  onTriggerDriveSync,
  onDownloadZip,
  isDriveSyncing = false,
}) => {
  if (!isOpen) return null;

  const menuSections = [
    {
      title: 'الإدارة اليومية وجداول الأعمال',
      items: [
        {
          id: 'agenda' as TabType,
          title: 'جدول الأعمال وقرارات اليوم (Agenda)',
          description: 'مواعيد السبت 26/9، حسم الكاميرات، وشراء أجهزة وسط البلد',
          icon: Calendar,
          badge: 'اليوم',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
        {
          id: 'home' as TabType,
          title: 'غرفة العمليات • الحدث الآن',
          description: 'الموجز اللحظي العاجل، وتنبيهات الأوامر والسيرفرات',
          icon: Flame,
          badge: 'Live',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
        },
        {
          id: 'inquiries' as TabType,
          title: 'الأسئلة والتحديثات المستمرة',
          description: 'استفسارات هيباتيا لجمع البيانات وأرقام وعناوين المسؤولين',
          icon: HelpCircle,
          badge: pendingInquiriesCount > 0 ? `${pendingInquiriesCount} معلقة` : 'محدث',
          color: 'text-rose-700 bg-rose-50 border-rose-200',
        },
      ]
    },
    {
      title: 'دليل المسؤولين والمالية والاشتراكات',
      items: [
        {
          action: onOpenContacts,
          title: 'دليل جهات الاتصال والمسؤولين (Contacts)',
          description: 'أبو خالد، م/ عماد، أ/ محمد مصطفى، أ/ هاني، م/ علي، ومسؤولي WE',
          icon: Users,
          badge: '12 مسؤول',
          color: 'text-blue-700 bg-blue-50 border-blue-200',
        },
        {
          id: 'subscriptions' as TabType,
          title: 'سجل الاشتراكات والتجديدات (Subscriptions)',
          description: 'تكاليف السيرفرات والدومين والإيميلات ومواعيد التجديد مع أ/ هاني',
          icon: Receipt,
          badge: 'المالية',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
          action: onOpenCredentials,
          title: 'خزينة الحسابات ومذكرة تفويض العمل',
          description: 'تنظيم كلمات المرور وإعداد مذكرة استلام للزملاء عند الغياب',
          icon: Key,
          badge: 'Safe',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
        },
      ]
    },
    {
      title: 'العروض والمشتريات والمشاريع',
      items: [
        {
          id: 'quotations' as TabType,
          title: 'عروض الأسعار وأوامر الشراء (Quotations & POs)',
          description: 'خادم 4B مع WE (Ubuntu, PostGIS, Redis) وكاميرات الأصدقاء (55,050 ج.م)',
          icon: FileText,
          badge: 'عرضين معتمدين',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
          id: 'projects' as TabType,
          title: 'المشاريع والتطبيقات (Projects & APKs)',
          description: 'مشاوير، 4B، وكالة، نوب، ومشروع كاجل والبروتوكول الذكي (11 مشروع)',
          icon: Building2,
          badge: '11 مشروع',
          color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        },
        {
          action: onOpenProjectSource,
          title: 'مستودع المزامنة السحابي (Hypatia_Source)',
          description: 'مجلد Hypatia_Source بتفريعات المشاريع ومجلدات فرعية للقرارات والعقود والعروض',
          icon: HardDrive,
          badge: 'Google Drive',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
        {
          id: 'contracts' as TabType,
          title: 'العقود وتسليمات الأكواد (Contracts)',
          description: 'عقود قيمة تك ومراحل التسليم والدفعات المالية والشروط الجزائية',
          icon: FileCheck2,
          badge: 'العقود',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
        {
          id: 'neural_graph' as TabType,
          title: 'مخطط العلاقات والشبكة التفاعلية',
          description: 'خريطة الربط الهندسي للقرارات والسيرفرات والمقر',
          icon: Network,
          badge: '2026-2030',
          color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
        },
        {
          id: 'hq_floorplan' as TabType,
          title: 'مخطط المقر التفاعلي وتوزيع العتاد (Maadi HQ)',
          description: 'الرسم المعماري للمقر (25.91م × 20.94م)، الـ 16 كاميرا، وراك السيرفرات',
          icon: Building,
          badge: 'جديد • معتمد',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
          id: 'master_ledger' as TabType,
          title: 'السجل العربي الشامل للمنظومة (150+ نقطة)',
          description: 'المذكرة المركزية الشاملة لكافة بنود وقرارات وأجهزة وعقود المنظومة',
          icon: BookOpen,
          badge: '150+ نقطة',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
      ]
    },
    {
      title: 'البنية التحتية والربط الخارجي',
      items: [
        {
          id: 'meshawir_network' as TabType,
          title: 'فحص الشبكة والـ Ping لمشاوير (Ping Monitor)',
          description: 'متابعة حية لخادم ديل R640 وسويتش سيسكو والسنترال وبوابة فايبر WE',
          icon: Radio,
          badge: '12 نقطة',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
        {
          id: 'mashweer_emails' as TabType,
          title: 'إيميلات مشاوير الرسمية (mashawer.com.eg)',
          description: 'الـ 6 إيميلات المحجوزة عبر المصرية لتكنولوجيا المعلومات EC',
          icon: Mail,
          badge: '6 إيميلات',
          color: 'text-purple-700 bg-purple-50 border-purple-200',
        },
        {
          id: 'database' as TabType,
          title: 'سوبابيز واستوديو البيانات (Supabase)',
          description: 'جداول المنظومة والذاكرة المركزية ومحرك الاستعلامات',
          icon: Database,
          badge: 'Cloud DB',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        {
          id: 'tasks' as TabType,
          title: 'سجل المهام التقنية (20 مهمة للمطور)',
          description: 'متابعة قائمة المهام العاجلة والتطوير المعماري',
          icon: CheckSquare,
          badge: '20 Tasks',
          color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        },
        {
          id: 'code' as TabType,
          title: 'مستودعات الأكواد و GitHub',
          description: 'مستودع هيباتيا الرسمي NOUB-Hypatia والتطبيقات المرتبطة',
          icon: Code2,
          badge: 'GitHub',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        },
        {
          id: 'settings' as TabType,
          title: 'إعدادات النظام والنموذج الذكي',
          description: 'تخصيص نموذج الذكاء الاصطناعي ومفاتيح التشغيل',
          icon: SlidersHorizontal,
          badge: 'Settings',
          color: 'text-slate-700 bg-slate-100 border-slate-200',
        },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-150 select-none text-slate-800">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm">
              ☰
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">قائمة المنظومة الشاملة</h2>
              <p className="text-[11px] text-slate-500">
                الوصول السريع لجدول الأعمال، جهات الاتصال، الاشتراكات، والمزامنة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Sync & Offline Actions Row (Inside Hamburger Menu as requested) */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border-b border-slate-200">
          <button
            onClick={() => {
              if (onTriggerDriveSync) onTriggerDriveSync();
            }}
            disabled={isDriveSyncing}
            className="p-2.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 transition flex items-center justify-center gap-2 text-xs font-bold text-blue-800 shadow-sm"
          >
            <Cloud className={`w-4 h-4 text-blue-600 ${isDriveSyncing ? 'animate-spin' : ''}`} />
            <span>{isDriveSyncing ? 'جاري الرفع...' : 'مزامنة Google Drive'}</span>
          </button>

          <button
            onClick={() => {
              if (onDownloadZip) onDownloadZip();
            }}
            className="p-2.5 rounded-xl bg-white border border-rose-200 hover:border-rose-400 transition flex items-center justify-center gap-2 text-xs font-bold text-rose-800 shadow-sm"
          >
            <Download className="w-4 h-4 text-rose-600" />
            <span>تحميل الأرشيف (Offline ZIP)</span>
          </button>
        </div>

        {/* Drawer Body Items Grouped */}
        <div className="p-3 sm:p-4 space-y-4 overflow-y-auto flex-1 bg-white">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                {section.title}
              </span>
              <div className="space-y-1.5">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = 'id' in item && currentTab === item.id;

                  return (
                    <button
                      key={itemIdx}
                      onClick={() => {
                        if ('action' in item && item.action) {
                          item.action();
                          onClose();
                        } else if ('id' in item && item.id) {
                          onSelectTab(item.id);
                          onClose();
                        }
                      }}
                      className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-right active:scale-[0.99] ${
                        isActive
                          ? 'bg-teal-50 border-teal-400 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 truncate">{item.title}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-600 shrink-0">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 truncate">{item.description}</p>
                        </div>
                      </div>

                      <ChevronLeft className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* GitHub Repository Quick Link */}
          <a
            href="https://github.com/NOUB-Platform/NOUB-Hypatia"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 transition flex items-center justify-between gap-2 group mt-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <Github className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition flex items-center gap-1.5">
                  <span>مستودع هيباتيا الرسمي على GitHub</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold">
                    NOUB-Hypatia
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  github.com/NOUB-Platform/NOUB-Hypatia
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
          </a>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>هيباتيا • مساعد العمليات والتطوير الشخصي</span>
          <span className="font-mono text-teal-700 font-bold">mashweer.com.eg</span>
        </div>

      </div>
    </div>
  );
};
