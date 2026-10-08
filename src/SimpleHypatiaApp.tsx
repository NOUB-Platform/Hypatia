import React, { useState, useEffect } from 'react';
import { 
  ProjectCard, 
  OFFICIAL_10_PROJECTS, 
  SUPABASE_CLEAN_REBUILD_SQL 
} from './data/officialProjects';
import { SystemDiagramView } from './components/SystemDiagramView';
import { 
  Menu, 
  X, 
  Sparkles, 
  Building2, 
  Server, 
  UtensilsCrossed, 
  FolderDown, 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  Layers,
  ChevronLeft
} from 'lucide-react';

export function SimpleHypatiaApp() {
  const [mainView, setMainView] = useState<'diagram' | 'cards'>('diagram');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showMaadiModal, setShowMaadiModal] = useState<boolean>(false);
  const [showWeModal, setShowWeModal] = useState<boolean>(false);
  const [showRestaurantModal, setShowRestaurantModal] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectCard[]>(() => {
    const saved = localStorage.getItem('hypatia_official_10_projects_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return OFFICIAL_10_PROJECTS;
  });

  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [showSqlModal, setShowSqlModal] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<ProjectCard | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hypatia_official_10_projects_v2', JSON.stringify(projects));
  }, [projects]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const filters = ['الكل', 'قيد التجربة', 'موبايل', 'ويب', 'مكتمل', 'خاص'];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'الكل') return true;
    return p.category === activeFilter;
  });

  // Generate the AI Prompt / Brief for ChatGPT / Claude / Gemini
  const generateAiBrief = (p: ProjectCard) => {
    return `مذكرة حالة المشروع: ${p.name} (${p.number})
========================================
- الاسم بالإنجليزية: ${p.nameEn || p.name}
- تصنيف المنظومة: ${p.category}
- حالة الـ APK: ${p.apkStatus}
- حالة لوحة التحكم (Dashboard): ${p.dashboardStatus}
- نسبة إنجاز فيجما (Figma): ${p.figmaProgress}%
- الإيميلات الرسمية: ${p.emailsCount} إيميل ${p.emailsList?.length ? `(${p.emailsList.join(', ')})` : ''}
- الميتنج القادم: ${p.nextMeeting} ${p.meetingLink ? `[رابط الميتنج: ${p.meetingLink}]` : ''}
- الطلبات والملاحظات المفتوحة (${p.openRequestsCount}):
${p.openRequests?.length ? p.openRequests.map((r, i) => `  ${i + 1}. ${r}`).join('\n') : '  لا توجد طلبات معلقة حالياً.'}
- الموقف والملخص الحالي:
  ${p.notes}
- الروابط المباشرة:
  * لوحة التحكم (Dashboard): ${p.dashboardLink || 'غير متوفرة حالياً'}
  * ملف الـ APK: ${p.apkLink || 'غير متوفر حالياً'}
  * رابط الفيجما: ${p.figmaLink || 'غير متوفر حالياً'}
  * مستودع GitHub: ${p.githubLink || 'غير متوفر حالياً'}
  * مجلد Google Drive: ${p.driveLink || 'غير متوفر حالياً'}
========================================
الطلب من الذكاء الاصطناعي:
أنا المشرف التقني والتشغيلي للمشروع. بناءً على الموقف الفعلي والطلبات المحددة بالأعلى، يرجى كتابة رد احترافي موجه لفريق التطوير يحدد الأولويات بدقة ويسألهم عن النقاط العالقة دون استرسال نظري.`;
  };

  const copyToClipboard = (text: string, successMsg: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopyFeedback(successMsg);
          setTimeout(() => setCopyFeedback(null), 3500);
        }).catch(() => {
          fallbackCopy(text, successMsg);
        });
      } else {
        fallbackCopy(text, successMsg);
      }
    } catch {
      fallbackCopy(text, successMsg);
    }
  };

  const fallbackCopy = (text: string, successMsg: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopyFeedback(successMsg);
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch {
      setCopyFeedback('يرجى تحديد النص ونسخه يدوياً');
      setTimeout(() => setCopyFeedback(null), 3000);
    }
  };

  const handleCopyAiBrief = (p: ProjectCard) => {
    const brief = generateAiBrief(p);
    copyToClipboard(brief, 'تم نسخ مذكرة المشروع بنجاح! جاهزة للصق في أي شات 📋');
  };

  const handleCopySql = () => {
    copyToClipboard(SUPABASE_CLEAN_REBUILD_SQL, 'تم نسخ كود الـ SQL النظيف بنجاح! الصقه في Supabase SQL Editor 🚀');
  };

  const resetToOfficial10 = () => {
    setProjects(OFFICIAL_10_PROJECTS);
    setSelectedProjectId(null);
    setIsEditing(false);
    setIsAddingNew(false);
    try {
      localStorage.removeItem('hypatia_official_10_projects_v2');
    } catch (e) {
      console.error(e);
    }
    setCopyFeedback('تم استرجاع الـ 10 مشاريع الأصلية بالترتيب الصحيح (#001 إلى #010)');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const startEdit = (p: ProjectCard) => {
    setEditForm({ ...p });
    setIsAddingNew(false);
    setIsEditing(true);
  };

  const startAddNew = () => {
    const nextNumberNum = projects.length + 1;
    const formattedNum = `#${String(nextNumberNum).padStart(3, '0')}`;
    const newTemplate: ProjectCard = {
      id: 'proj-' + Date.now(),
      number: formattedNum,
      name: 'مشروع جديد',
      nameEn: 'New Project',
      category: 'موبايل',
      badgeColor: 'from-amber-500 via-orange-500 to-rose-500',
      circleBgColor: 'bg-gradient-to-tr from-amber-950/90 to-amber-900/60 text-amber-300 border-amber-500/40',
      icon: '📱',
      apkStatus: 'في انتظار رفع الـ APK الأول',
      dashboardStatus: 'قيد التطوير',
      figmaProgress: 50,
      emailsCount: 2,
      emailsList: ['info@project.com'],
      openRequestsCount: 1,
      openRequests: ['استلام النسخة التجريبية الأولى'],
      nextMeeting: 'السبت القادم - 5:00 مساءً',
      meetingLink: '',
      apkLink: '',
      figmaLink: '',
      dashboardLink: '',
      githubLink: '',
      driveLink: '',
      notes: 'مشروع جديد مضاف في قائمة المتابعة السريعة.'
    };
    setEditForm(newTemplate);
    setIsAddingNew(true);
    setIsEditing(true);
  };

  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (isAddingNew) {
      setProjects((prev) => [...prev, editForm]);
      setSelectedProjectId(editForm.id);
    } else {
      setProjects((prev) =>
        prev.map((item) => (item.id === editForm.id ? editForm : item))
      );
    }
    setIsEditing(false);
    setIsAddingNew(false);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelectedProjectId(null);
    setIsEditing(false);
    setCopyFeedback('تم حذف المشروع من القائمة بنجاح');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 flex justify-center selection:bg-amber-400 selection:text-black font-['Cairo',sans-serif]">
      {/* Viewport container: responsive mobile-app layout */}
      <div className={`w-full ${mainView === 'diagram' && !selectedProjectId ? 'max-w-2xl sm:max-w-3xl' : 'max-w-md sm:max-w-lg'} min-h-screen bg-[#0c0f1c] flex flex-col border-x border-slate-800/80 shadow-2xl relative pb-6 transition-all duration-300`}>

        {/* MOBILE MASTER HEADER & HAMBURGER TRIGGER */}
        <header className="bg-slate-950/95 backdrop-blur-md px-3.5 py-2.5 border-b border-slate-800/90 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-sm"
              title="القائمة الرئيسية للمنظومة"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-amber-400" />
            </button>

            {/* App Brand & Live Pulse */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight text-white">هيباتيا</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">HYPATIA OS</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-[9px] text-slate-400">نظام إدارة العمليات والشبكة العصبية</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Right */}
          <div className="flex items-center gap-1.5">
            <a
              href="/api/system/download-noub-zip"
              download="NOUB_MASTER_SYSTEM_ARCHIVE.zip"
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-[11px] flex items-center gap-1 transition shadow-sm active:scale-95"
              title="تحميل الأرشيف الكامل ZIP"
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">أرشيف</span>
              <span>ZIP</span>
            </a>
          </div>
        </header>

        {/* TOP VIEW SWITCHER TABS */}
        {!selectedProjectId && (
          <div className="bg-[#0b0e1b] px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between gap-2 sticky top-[49px] z-30">
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs w-full">
              <button
                onClick={() => setMainView('diagram')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer text-xs ${
                  mainView === 'diagram'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🧠</span>
                <span>الشبكة العصبية</span>
              </button>
              <button
                onClick={() => setMainView('cards')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition cursor-pointer text-xs ${
                  mainView === 'cards'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>📱</span>
                <span>المشاريع ({projects.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* SLIDE-OUT HAMBURGER MENU DRAWER */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
            <div className="w-4/5 max-w-xs h-full bg-[#0c1020] border-l border-slate-800 p-4 flex flex-col justify-between overflow-y-auto animate-slideLeft shadow-2xl">
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-black text-sm">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white">قائمة المنظومة</h3>
                      <p className="text-[10px] text-slate-400">لوحة التحكم السريعة</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="mt-4 space-y-1.5 text-xs">
                  <button
                    onClick={() => {
                      setMainView('diagram');
                      setSelectedProjectId(null);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl font-bold flex items-center gap-2.5 transition text-right ${
                      mainView === 'diagram' && !selectedProjectId
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <span className="text-base">🧠</span>
                    <div>
                      <div className="text-white font-bold">الشبكة العصبية التقنية</div>
                      <div className="text-[10px] text-slate-400 font-normal">عرض العقد والنبضات والربط</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setMainView('cards');
                      setSelectedProjectId(null);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl font-bold flex items-center gap-2.5 transition text-right ${
                      mainView === 'cards' && !selectedProjectId
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    <span className="text-base">📱</span>
                    <div>
                      <div className="text-white font-bold">بطاقات المشاريع الـ 11</div>
                      <div className="text-[10px] text-slate-400 font-normal">وكالة، 4B، داده، والمطعم</div>
                    </div>
                  </button>

                  <div className="my-2 border-t border-slate-800/80 pt-2 text-[10px] text-slate-500 font-bold px-1">
                    أقسام التأسيس والتشغيل
                  </div>

                  <button
                    onClick={() => {
                      setShowMaadiModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-slate-300 hover:bg-slate-900 flex items-center gap-2.5 transition text-right border border-transparent hover:border-slate-800"
                  >
                    <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-white font-bold">مقر المعادي والبنية الفيزيائية</div>
                      <div className="text-[10px] text-slate-400">أجهزة Dell، راك 140سم، وكاميرات علي</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowWeModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-slate-300 hover:bg-slate-900 flex items-center gap-2.5 transition text-right border border-transparent hover:border-slate-800"
                  >
                    <Server className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-white font-bold">المصرية للاتصالات WE والعرض المالي</div>
                      <div className="text-[10px] text-slate-400">سيرفرات 4B ومتابعة أحمد محرم وعماد</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowRestaurantModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-slate-300 hover:bg-slate-900 flex items-center gap-2.5 transition text-right border border-transparent hover:border-slate-800"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <div className="text-white font-bold">مشروع مطعم المشويات بالعجوزة</div>
                      <div className="text-[10px] text-slate-400">أبو خالد، هاني، وتوريد أنظمة علي</div>
                    </div>
                  </button>

                  <div className="my-2 border-t border-slate-800/80 pt-2 text-[10px] text-slate-500 font-bold px-1">
                    أدوات الأرشيف وقواعد البيانات
                  </div>

                  <a
                    href="/api/system/download-noub-zip"
                    download="NOUB_MASTER_SYSTEM_ARCHIVE.zip"
                    className="w-full p-2.5 rounded-xl text-slate-300 hover:bg-emerald-950/30 flex items-center gap-2.5 transition text-right border border-slate-800/80 hover:border-emerald-500/30"
                  >
                    <FolderDown className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-white font-bold">تحميل حزمة NOUB كاملة (ZIP)</div>
                      <div className="text-[10px] text-slate-400">14 ملف توثيقي وهيكلي بضغطة واحدة</div>
                    </div>
                  </a>

                  <button
                    onClick={() => {
                      setShowSqlModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl text-slate-300 hover:bg-slate-900 flex items-center gap-2.5 transition text-right border border-transparent hover:border-slate-800"
                  >
                    <Database className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-white font-bold">كود Supabase SQL النظيف</div>
                      <div className="text-[10px] text-slate-400">إعادة بناء الجداول والبيانات فوراً</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
                هيباتيا • نظام الذكاء والعمليات الموحد
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: MAADI HQ SPECIFICATIONS */}
        {showMaadiModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full sm:max-w-md bg-[#0c1020] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-base border border-purple-500/30">
                    🖥️
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">تجهيزات مقر المعادي</h3>
                    <p className="text-[10px] text-purple-300">خطة عمل مكثفة 3 أشهر (سامح وعماد)</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMaadiModal(false)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">1. أجهزة محطات العمل (8 أجهزة Dell):</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    3 أجهزة تعمل حالياً بمقر المعادي، و 5 أجهزة قيد الشراء والتوريد غداً لاستكمال طاقم الكول سنتر ومحلل البيانات.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">2. راك 140سم وسيرفر الباك أب المحلي:</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    تجهيز راك شبكات بارتفاع 140 سم يضم سويتش 24-Port وسيرفر الباك أب المحلي لسحب نسخ احتياطية فيزيائية يومية في تمام 3:00 فجراً.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">3. شبكة CAT6 وكاميرات المراقبة الموحدة:</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    تمديد كابلات CAT6 بالسقف المعلق، والتعاقد مع البشمهندس علي لتوريد نفس كاميرات IP عالية الدقة المعتمدة لمطعم العجوزة لتوحيد الصيانة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: TELECOM EGYPT WE OFFER */}
        {showWeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full sm:max-w-md bg-[#0c1020] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-base border border-blue-500/30">
                    🏢
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">المصرية للاتصالات WE</h3>
                    <p className="text-[10px] text-blue-300">العرض المالي قيد الدراسة والتحليل الفني</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWeModal(false)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">الحالة: وصول العرض المالي رسمياً</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    تم استلام العرض المالي والتقني من ممثل المصرية للاتصالات (أحمد محرم). ويقوم حالياً كل من سامح والمهندس عماد الشرقاوي بفحص البنود وتدقيق تكاليف الربط وجدار الحماية F5 WAF.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">مواصفات الخوادم الـ 3 المخصصة لـ 4B:</h4>
                  <ul className="text-slate-300 text-[11px] space-y-1">
                    <li>• خادم التطبيقات 4B-App: 4 vCPU, 8 GB RAM, 40 GB SSD</li>
                    <li>• خادم قواعد البيانات 4B-DB: 4 vCPU, 8 GB RAM, 100 GB SSD + PostGIS</li>
                    <li>• خادم النسخ الاحتياطي 4B-Backup: 2 vCPU, 4 GB RAM, 100 GB SSD</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: AGOUZA RESTAURANT VENTURE */}
        {showRestaurantModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full sm:max-w-md bg-[#0c1020] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-base border border-rose-500/30">
                    🍽️
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">مطعم المشويات بالعجوزة</h3>
                    <p className="text-[10px] text-rose-300">المشروع التجاري ونقاط البيع POS</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRestaurantModal(false)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">القيادة والمتابعة الحصرية:</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    يتابع الأستاذ هاني (CFO) هذا المشروع بشكل استثماري وتنفيذي مباشر بالشراكة مع أبو خالد (صاحب الشركة كلها).
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="font-bold text-slate-200 mb-1">توريدات المهندس علي:</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    تم استلام عروض أسعار نظام نقاط البيع (POS System)، طابعات الفواتير، وشاشات المطبخ، بالإضافة إلى شبكة كاميرات المراقبة الأمنية CCTV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 0: SYSTEM DIAGRAM / FLOWCHART */}
        {!selectedProjectId && mainView === 'diagram' && (
          <SystemDiagramView />
        )}

        {/* ================================================================= */}
        {/* VIEW 1: CARDS GRID (Inspired by Caps Game Screen 1) */}
        {/* ================================================================= */}
        {!selectedProjectId && mainView === 'cards' && (
          <div className="flex flex-col flex-1">
            {/* Top Bar Header */}
            <div className="p-3.5 border-b border-slate-800/70 flex items-center justify-between sticky top-0 bg-[#0c0f1c]/95 backdrop-blur z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-extrabold text-white tracking-tight">بطاقات المشاريع</h1>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                      {projects.length} مشاريع
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">نظام المتابعة والمذكرات السريعة للذكاء الاصطناعي</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSqlModal(true)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-mono border border-slate-700 transition flex items-center gap-1"
                  title="كود إعادة بناء الداتابيز SQL النظيف"
                >
                  <span>🗄️</span> SQL
                </button>
                <button
                  onClick={startAddNew}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition shadow shadow-amber-500/20 flex items-center gap-1"
                >
                  <span>+</span> إضافة
                </button>
              </div>
            </div>

            {/* Notification alert if any */}
            {copyFeedback && (
              <div className="m-3 p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-semibold">
                {copyFeedback}
              </div>
            )}

            {/* Filter Pills (Exact Capsule Game style) */}
            <div className="px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-semibold border-b border-slate-800/40 bg-slate-950/40">
              {filters.map((f) => {
                const isActive = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.2 rounded-full transition whitespace-nowrap text-xs ${
                      isActive
                        ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/30'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid (2 Columns, matching Caps Game card styling) */}
            <div className="p-3 grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
              {filteredProjects.map((p) => {
                const hasAlert = p.openRequestsCount > 0;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className="cursor-pointer group rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950 border border-slate-800/90 hover:border-amber-500/60 p-3 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 relative overflow-hidden"
                  >
                    {/* Top corner number badge (#001, #002...) + Alert badge */}
                    <div className="w-full flex items-center justify-between text-[11px] mb-1">
                      {/* Alert / Notification Badge */}
                      {hasAlert ? (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[9px] font-bold" title={`${p.openRequestsCount} طلبات معلقة`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                          <span>{p.openRequestsCount}</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">
                          ✓ جاهز
                        </span>
                      )}

                      {/* Project Number */}
                      <span className="font-mono font-extrabold text-slate-300 group-hover:text-amber-400 transition tracking-wider">
                        {p.number}
                      </span>
                    </div>

                    {/* Circular Project Badge: Bright Inner Icon contrasted against card */}
                    <div className="relative my-1.5">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${p.badgeColor} p-1 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                        {/* High contrast inner circle */}
                        <div className={`w-full h-full rounded-full ${p.circleBgColor || 'bg-slate-950 text-amber-300 border-slate-800'} border-2 flex flex-col items-center justify-center relative overflow-hidden shadow-inner`}>
                          <span className="text-3xl filter drop-shadow">{p.icon}</span>
                          {/* Figma % Sticker */}
                          <div className="absolute bottom-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow">
                            {p.figmaProgress}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-black text-white group-hover:text-amber-300 transition line-clamp-1 mt-1">
                      {p.name}
                    </h3>

                    {/* Fast Status line */}
                    <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium w-full">
                      <span className="text-amber-400 font-bold">{p.category}</span>
                      <span>•</span>
                      <span className="truncate max-w-[80px]">{p.apkStatus.includes('استلمنا') ? '📱 APK مستلم' : '⏳ قيد الانتظار'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Info */}
            <div className="p-3 border-t border-slate-800/60 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>نظام هيباتيا للمتابعة السريعة</span>
              <button
                onClick={resetToOfficial10}
                className="text-slate-400 hover:text-amber-400 underline decoration-slate-700"
              >
                استرجاع الـ 10 مشاريع الأصلية
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: PROJECT DETAIL CARD (Like Screenshot 2: Zords #150) */}
        {/* ================================================================= */}
        {selectedProject && !isEditing && (
          <div className="flex flex-col flex-1 p-4 overflow-y-auto">
            {/* Top Navigation Row (Back arrow + Project Number + Action Buttons) */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
                title="الرجوع للقائمة"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                <span className="text-base font-mono font-black text-amber-400 tracking-wider">
                  {selectedProject.number}
                </span>
                <button
                  onClick={() => startEdit(selectedProject)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  ✏️ تعديل
                </button>
              </div>
            </div>

            {/* Big Circular Card Badge (Exact visual of Screenshot 2) */}
            <div className="flex flex-col items-center my-2">
              <div className={`w-40 h-40 rounded-full bg-gradient-to-tr ${selectedProject.badgeColor} p-1.5 shadow-2xl shadow-amber-500/20 flex items-center justify-center`}>
                <div className={`w-full h-full rounded-full ${selectedProject.circleBgColor || 'bg-slate-950 text-amber-300'} border-4 border-slate-900 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <span className="text-6xl filter drop-shadow-md">{selectedProject.icon}</span>
                  <span className="absolute bottom-2 text-[10px] font-mono font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Titles */}
            <div className="text-right my-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-white tracking-tight">
                  {selectedProject.name}
                </h2>
                {selectedProject.nameEn && (
                  <span className="text-xs font-mono text-slate-400">
                    {selectedProject.nameEn}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                {selectedProject.notes}
              </p>
            </div>

            {/* Rapid Info Lines (Styled like Game Screenshot 2: Number, Grade, Skin, Outline...) */}
            <div className="my-2 space-y-2 text-right bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
              
              {/* APK Status */}
              <div className="flex items-start justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400 font-medium">حالة الـ APK:</span>
                <span className="text-amber-300 font-semibold text-left max-w-[68%] leading-relaxed">
                  {selectedProject.apkStatus}
                </span>
              </div>

              {/* Dashboard Status */}
              <div className="flex items-start justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400 font-medium">الداش بورد (Dashboard):</span>
                <span className="text-sky-300 font-semibold text-left max-w-[68%] leading-relaxed">
                  {selectedProject.dashboardStatus}
                </span>
              </div>

              {/* Figma Progress */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400 font-medium">إنجاز فيجما (Figma):</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.figmaProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-teal-300 font-mono font-bold">{selectedProject.figmaProgress}%</span>
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400 font-medium">الإيميلات الرسمية:</span>
                <div className="text-left">
                  <span className="text-white font-mono font-bold">{selectedProject.emailsCount} إيميلات</span>
                  {selectedProject.emailsList && selectedProject.emailsList.length > 0 && (
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {selectedProject.emailsList.slice(0, 3).join(', ')}
                      {selectedProject.emailsList.length > 3 ? '...' : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Next Meeting */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400 font-medium">الميتنج القادم:</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-rose-300 font-semibold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 text-[11px]">
                    📅 {selectedProject.nextMeeting}
                  </span>
                  {selectedProject.meetingLink && (
                    <a
                      href={selectedProject.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:underline text-[10px] font-bold"
                    >
                      (رابط)
                    </a>
                  )}
                </div>
              </div>

              {/* Open Requests & Alerts */}
              <div className="flex items-start justify-between py-1.5">
                <span className="text-slate-400 font-medium">الطلبات والملاحظات:</span>
                <div className="text-left max-w-[68%]">
                  <span className={`font-bold font-mono ${selectedProject.openRequestsCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {selectedProject.openRequestsCount > 0 ? `${selectedProject.openRequestsCount} طلبات معلقة` : 'لا توجد طلبات معلقة'}
                  </span>
                  {selectedProject.openRequests && selectedProject.openRequests.length > 0 && (
                    <ul className="text-[11px] text-slate-300 mt-1 space-y-1 text-right">
                      {selectedProject.openRequests.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 text-xs mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

            </div>

            {/* Direct Links Grid (Up to 5 clean links: Dashboard, APK, Figma, GitHub, Drive) */}
            <div className="grid grid-cols-3 gap-2 my-2 text-[11px]">
              {selectedProject.dashboardLink ? (
                <a
                  href={selectedProject.dashboardLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 text-center transition font-medium flex items-center justify-center gap-1"
                >
                  <span>🌐</span> الداش بورد
                </a>
              ) : (
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-600 text-center">
                  الداش بورد (قريباً)
                </div>
              )}

              {selectedProject.apkLink ? (
                <a
                  href={selectedProject.apkLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 text-center transition font-medium flex items-center justify-center gap-1"
                >
                  <span>📲</span> تحميل APK
                </a>
              ) : (
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-600 text-center">
                  APK (قريباً)
                </div>
              )}

              {selectedProject.figmaLink ? (
                <a
                  href={selectedProject.figmaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-purple-400 text-center transition font-medium flex items-center justify-center gap-1"
                >
                  <span>🎨</span> الفيجما
                </a>
              ) : (
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-600 text-center">
                  فيجما (قريباً)
                </div>
              )}
            </div>

            {/* Extra Row: GitHub & Drive Links */}
            {(selectedProject.githubLink || selectedProject.driveLink) && (
              <div className="grid grid-cols-2 gap-2 my-1 text-[11px]">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 text-center transition font-mono flex items-center justify-center gap-1"
                  >
                    <span>💻</span> GitHub
                  </a>
                )}
                {selectedProject.driveLink && (
                  <a
                    href={selectedProject.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-amber-400 text-center transition font-medium flex items-center justify-center gap-1"
                  >
                    <span>📁</span> Google Drive
                  </a>
                )}
              </div>
            )}

            {/* Notification on Copy */}
            {copyFeedback && (
              <div className="my-2 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-semibold animate-bounce">
                {copyFeedback}
              </div>
            )}

            {/* Big Yellow Bottom Action Button (Directly matching Screenshot 2: "Remove from sale (1 TON)") */}
            <div className="mt-auto pt-3">
              <button
                onClick={() => handleCopyAiBrief(selectedProject)}
                className="w-full py-3.5 px-4 bg-[#ffcc00] hover:bg-[#e6b800] active:scale-[0.98] text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-400/20 transition flex items-center justify-center gap-2"
              >
                <span>نسخ مذكرة المشروع للذكاء الاصطناعي 📋</span>
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                تنسخ ملخصاً كاملاً بالموقف والملاحظات جاهزاً للصق في ChatGPT أو Claude.
              </p>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 3: ADD / EDIT PROJECT FORM */}
        {/* ================================================================= */}
        {isEditing && editForm && (
          <form onSubmit={saveForm} className="flex flex-col flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-extrabold text-white text-sm">
                {isAddingNew ? 'إضافة مشروع جديد' : `تعديل بطاقة (${editForm.name})`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setIsAddingNew(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕ إلغاء
              </button>
            </div>

            {/* Project Name and Number */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">اسم المشروع (عربي):</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رقم البطاقة:</label>
                <input
                  type="text"
                  required
                  value={editForm.number}
                  onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                  placeholder="#001"
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold text-center"
                />
              </div>
            </div>

            {/* English Name & Category */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">الاسم بالإنجليزية:</label>
                <input
                  type="text"
                  value={editForm.nameEn || ''}
                  onChange={(e) => setEditForm({ ...editForm, nameEn: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">التصنيف:</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="قيد التجربة">قيد التجربة</option>
                  <option value="موبايل">موبايل</option>
                  <option value="ويب">ويب</option>
                  <option value="مكتمل">مكتمل</option>
                  <option value="خاص">خاص</option>
                </select>
              </div>
            </div>

            {/* Icon & Theme */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">الأيقونة (إيموجي أو رمز):</label>
                <input
                  type="text"
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-center text-lg"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">لون الإطار الخارجي:</label>
                <select
                  value={editForm.badgeColor}
                  onChange={(e) => setEditForm({ ...editForm, badgeColor: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
                >
                  <option value="from-amber-400 via-orange-500 to-rose-600">برتقالي ذهبي (مثل 4B)</option>
                  <option value="from-blue-500 via-indigo-500 to-cyan-400">أزرق وكالة (مثل WeKaLa)</option>
                  <option value="from-emerald-400 via-teal-500 to-cyan-600">أخضر زمردي (مثل Daro)</option>
                  <option value="from-purple-500 via-pink-500 to-rose-500">بنفسجي رياضي (نوب سبورتس)</option>
                  <option value="from-amber-400 via-yellow-500 to-orange-500">ذهبي ملكي (نوب الأساسي)</option>
                  <option value="from-emerald-500 via-green-500 to-teal-400">أخضر مالي (تداول)</option>
                  <option value="from-violet-500 via-purple-600 to-indigo-600">أرجواني (ألعاب)</option>
                </select>
              </div>
            </div>

            {/* APK Status */}
            <div>
              <label className="block text-slate-400 mb-1">حالة الـ APK بالتفصيل:</label>
              <input
                type="text"
                value={editForm.apkStatus}
                onChange={(e) => setEditForm({ ...editForm, apkStatus: e.target.value })}
                placeholder="مثلاً: استلمنا الـ APK التجريبي للتشغيل والتجربة..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            {/* Dashboard Status */}
            <div>
              <label className="block text-slate-400 mb-1">حالة الداش بورد (Dashboard):</label>
              <input
                type="text"
                value={editForm.dashboardStatus}
                onChange={(e) => setEditForm({ ...editForm, dashboardStatus: e.target.value })}
                placeholder="مثلاً: لم نستلم الداش بورد بعد وننتظر الفريق..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            {/* Figma % & Emails Count */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">نسبة الفيجما (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.figmaProgress}
                  onChange={(e) => setEditForm({ ...editForm, figmaProgress: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">عدد الإيميلات:</label>
                <input
                  type="number"
                  min="0"
                  value={editForm.emailsCount}
                  onChange={(e) => setEditForm({ ...editForm, emailsCount: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            {/* Next Meeting */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">الميتنج القادم:</label>
                <input
                  type="text"
                  value={editForm.nextMeeting}
                  onChange={(e) => setEditForm({ ...editForm, nextMeeting: e.target.value })}
                  placeholder="السبت القادم - 5:00 م"
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">رابط الميتنج (Google Meet):</label>
                <input
                  type="url"
                  value={editForm.meetingLink || ''}
                  onChange={(e) => setEditForm({ ...editForm, meetingLink: e.target.value })}
                  placeholder="https://meet.google.com/..."
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Open Requests */}
            <div>
              <label className="block text-slate-400 mb-1">الطلبات والملاحظات (مفصولة بفاصلة ,):</label>
              <textarea
                rows={2}
                value={(editForm.openRequests || []).join(', ')}
                onChange={(e) => {
                  const reqs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  setEditForm({
                    ...editForm,
                    openRequests: reqs,
                    openRequestsCount: reqs.length
                  });
                }}
                placeholder="طلب الداش بورد, فحص الخرائط, تعديل الخط..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            {/* Links: Dashboard, APK, Figma */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-slate-400 font-bold">الروابط المباشرة للمشروع:</label>
              <input
                type="url"
                value={editForm.dashboardLink || ''}
                onChange={(e) => setEditForm({ ...editForm, dashboardLink: e.target.value })}
                placeholder="رابط لوحة التحكم Dashboard..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
              />
              <input
                type="url"
                value={editForm.apkLink || ''}
                onChange={(e) => setEditForm({ ...editForm, apkLink: e.target.value })}
                placeholder="رابط تحميل الـ APK (Google Drive أو غيره)..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
              />
              <input
                type="url"
                value={editForm.figmaLink || ''}
                onChange={(e) => setEditForm({ ...editForm, figmaLink: e.target.value })}
                placeholder="رابط ملف فيجما Figma..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
              />
              <input
                type="url"
                value={editForm.githubLink || ''}
                onChange={(e) => setEditForm({ ...editForm, githubLink: e.target.value })}
                placeholder="رابط مستودع GitHub..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
              />
              <input
                type="url"
                value={editForm.driveLink || ''}
                onChange={(e) => setEditForm({ ...editForm, driveLink: e.target.value })}
                placeholder="رابط مجلد Google Drive (اللوجوهات والملفات)..."
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-slate-400 mb-1">ملاحظات عامة حول الموقف الحالي:</label>
              <textarea
                rows={2}
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              ></textarea>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              {!isAddingNew ? (
                <button
                  type="button"
                  onClick={() => deleteProject(editForm.id)}
                  className="px-3 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-xl border border-rose-800"
                >
                  حذف المشروع
                </button>
              ) : <div></div>}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAddingNew(false);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20"
                >
                  حفظ البيانات
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ================================================================= */}
        {/* MODAL: CLEAN SUPABASE SQL SCRIPT */}
        {/* ================================================================= */}
        {showSqlModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0f1322] border border-slate-800 w-full max-w-lg rounded-2xl p-4 flex flex-col max-h-[85vh] text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-base">🗄️</span>
                  <h3 className="font-extrabold text-white text-sm">كود SQL النظيف لقاعدة البيانات (Supabase)</h3>
                </div>
                <button
                  onClick={() => setShowSqlModal(false)}
                  className="text-slate-400 hover:text-white text-base"
                >
                  ✕
                </button>
              </div>

              <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
                هذا الكود يقوم بإنشاء الجداول الـ 10 الحقيقية، وإيقاف الـ RLS مؤقتاً لتسهيل كل التجارب كما طلبت، ويدخل بيانات المشاريع الـ 10 الحقيقية:
              </p>

              <div className="flex-1 overflow-y-auto bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[10px] text-slate-300 select-all mb-3 dir-ltr text-left">
                <pre>{SUPABASE_CLEAN_REBUILD_SQL}</pre>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500">انسخ الكود والصقه في Supabase SQL Editor واضغط RUN</span>
                <button
                  onClick={handleCopySql}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition"
                >
                  نسخ كود الـ SQL 📋
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
