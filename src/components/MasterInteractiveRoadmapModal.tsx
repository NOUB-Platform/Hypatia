import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Save, 
  RotateCcw, 
  Layers, 
  Server, 
  ShieldAlert, 
  Smartphone, 
  FileText, 
  Zap, 
  ChevronLeft,
  Calendar,
  Sparkles,
  ExternalLink,
  Users,
  Database,
  Building,
  Check
} from 'lucide-react';
import { 
  MASTER_INTERACTIVE_TASKS_135, 
  MasterInteractiveTaskItem, 
  TaskStatusType, 
  TaskRiskLevel 
} from '../data/masterInteractiveTasksData';

interface MasterInteractiveRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
  defaultPersonFilter?: string;
}

export const MasterInteractiveRoadmapModal: React.FC<MasterInteractiveRoadmapModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia,
  defaultPersonFilter
}) => {
  // Load tasks state from LocalStorage or initialize with default
  const [tasks, setTasks] = useState<MasterInteractiveTaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_master_interactive_tasks_135');
      if (saved) {
        const parsed: MasterInteractiveTaskItem[] = JSON.parse(saved);
        const savedMap = new Map(parsed.map(t => [t.id, t]));
        return MASTER_INTERACTIVE_TASKS_135.map(t => {
          const existing = savedMap.get(t.id);
          return existing ? { ...t, ...existing } : t;
        });
      }
    } catch (e) {
      console.error(e);
    }
    return MASTER_INTERACTIVE_TASKS_135;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [personPreset, setPersonPreset] = useState<string>(defaultPersonFilter || 'all');
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Sync to localStorage
  const saveToStorage = (updatedTasks: MasterInteractiveTaskItem[]) => {
    try {
      localStorage.setItem('hypatia_master_interactive_tasks_135', JSON.stringify(updatedTasks));
      setSaveBanner('تم حفظ التحديثات وتوثيق القرارات بنجاح ✓');
      setTimeout(() => setSaveBanner(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Checkbox Status
  const handleToggleStatus = (taskId: string, newStatus: TaskStatusType) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          // If clicking already selected status, keep or toggle
          const nextStatus = t.status === newStatus ? 'brainstorming' : newStatus;
          let nextRisk = t.riskLevel;
          if (nextStatus === 'completed') nextRisk = 'safe';
          return { ...t, status: nextStatus, riskLevel: nextRisk };
        }
        return t;
      });
      saveToStorage(updated);
      return updated;
    });
  };

  // Toggle Risk Level
  const handleChangeRisk = (taskId: string, newRisk: TaskRiskLevel) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          return { ...t, riskLevel: newRisk };
        }
        return t;
      });
      saveToStorage(updated);
      return updated;
    });
  };

  // Update Note
  const handleUpdateNote = (taskId: string, noteText: string) => {
    setTasks(prev => {
      const updated = prev.map(t => {
        if (t.id === taskId) {
          return { ...t, userNote: noteText };
        }
        return t;
      });
      saveToStorage(updated);
      return updated;
    });
  };

  // Reset to initial
  const handleResetToDefaults = () => {
    if (window.confirm('هل تريد استعادة الحالة الأصلية لبنك المهام الـ 135؟')) {
      setTasks(MASTER_INTERACTIVE_TASKS_135);
      localStorage.removeItem('hypatia_master_interactive_tasks_135');
      setSaveBanner('تمت استعادة الحالة الافتراضية بنجاح.');
      setTimeout(() => setSaveBanner(null), 2500);
    }
  };

  // Quick preset filter
  useEffect(() => {
    if (defaultPersonFilter) {
      setPersonPreset(defaultPersonFilter);
    }
  }, [defaultPersonFilter]);

  // Filtered List
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      // Category filter
      const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
      // Status filter
      const matchStatus = selectedStatus === 'all' || t.status === selectedStatus;
      // Risk filter
      const matchRisk = selectedRisk === 'all' || t.riskLevel === selectedRisk;
      // Person preset
      let matchPerson = true;
      if (personPreset === 'emad') {
        matchPerson = t.isEmadKeyTask || t.responsible.includes('عماد');
      } else if (personPreset === 'sameh') {
        matchPerson = t.isSamehSoftwareTask || t.responsible.includes('سامح');
      } else if (personPreset === 'mowaffaq') {
        matchPerson = t.isMowaffaqOpsTask || t.responsible.includes('موفق') || t.responsible.includes('عمرو');
      } else if (personPreset === 'lawyer') {
        matchPerson = t.isLawyerTask || t.responsible.includes('محمد مصطفى') || t.responsible.includes('المحامي');
      }

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.responsible.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.number).includes(q) ||
        (t.todayUpdateNote && t.todayUpdateNote.toLowerCase().includes(q));

      return matchCat && matchStatus && matchRisk && matchPerson && matchSearch;
    });
  }, [tasks, selectedCategory, selectedStatus, selectedRisk, personPreset, searchQuery]);

  // Statistics
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const criticalCount = tasks.filter(t => t.riskLevel === 'critical_danger' && t.status !== 'completed').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right select-none font-['Cairo',sans-serif]">
        
        {/* Top Header Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white flex items-center justify-between gap-4 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <CheckSquare className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black text-white">
                  لوحة المهام والمحاور الشاملة التفاعلية (135 محور عمل)
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  {completedCount} منجز من 135
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30">
                  تصميم شبكي ثنائي مستوحى من كروت الألعاب
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                استعراض تفاعلي لكل ما نوقش وخطط له، مع خيارات التحويل والإلغاء ومؤشرات الأمان والخطر والحفظ اللحظي.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDefaults}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition flex items-center gap-1"
              title="استعادة الحالة الأصلية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">استعادة الأصل</span>
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Banner */}
        {saveBanner && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-between animate-in slide-in-from-top-2">
            <span>{saveBanner}</span>
            <button onClick={() => setSaveBanner(null)}>✕</button>
          </div>
        )}

        {/* Filter & Control Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          
          {/* Row 1: Quick Persona Filters (المهندس عماد - المهندس سامح - موفق وعمرو - المستشار القانوني) */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500">تصفية سريعة للمسؤولين:</span>
              
              <button
                onClick={() => setPersonPreset(personPreset === 'emad' ? 'all' : 'emad')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border shadow-xs ${
                  personPreset === 'emad'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>مهام المهندس عماد (السيرفرات والشبكة والمقر)</span>
              </button>

              <button
                onClick={() => setPersonPreset(personPreset === 'sameh' ? 'all' : 'sameh')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border shadow-xs ${
                  personPreset === 'sameh'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>مهام المهندس سامح (البرمجيات والتطبيقات)</span>
              </button>

              <button
                onClick={() => setPersonPreset(personPreset === 'mowaffaq' ? 'all' : 'mowaffaq')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border shadow-xs ${
                  personPreset === 'mowaffaq'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>مهام موفق وعمرو (الكباتن وعمليات 4B)</span>
              </button>

              <button
                onClick={() => setPersonPreset(personPreset === 'lawyer' ? 'all' : 'lawyer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 border shadow-xs ${
                  personPreset === 'lawyer'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>مهام المستشار القانوني أ/ محمد مصطفى</span>
              </button>

              {personPreset !== 'all' && (
                <button
                  onClick={() => setPersonPreset('all')}
                  className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 font-bold transition"
                >
                  إلغاء التصفية ✕
                </button>
              )}
            </div>

            {/* Quick Summary Counts */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-bold">
                ✓ {completedCount} مكتمل
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-900 font-bold">
                ⚙️ {inProgressCount} قيد التنفيذ
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-900 font-bold">
                ⚠️ {criticalCount} خطر وتأخير
              </span>
            </div>
          </div>

          {/* Row 2: Search, Category & Semantic Status Filters */}
          <div className="flex items-center justify-between gap-3 flex-wrap text-xs">
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-300 w-full sm:w-72 shadow-2xs">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الـ 135 مهمة (الاسم، التفاصيل، المورد)..."
                className="w-full text-xs border-none focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-slate-400 font-bold ml-1">الحالة:</span>
              {[
                { id: 'all', label: 'الكل' },
                { id: 'completed', label: 'تم الإنجاز ✓' },
                { id: 'in_progress', label: 'جاري العمل ⚙️' },
                { id: 'brainstorming', label: 'قيد التفكير 🧠' },
                { id: 'waiting_external', label: 'معلق بتوريد ⏳' },
                { id: 'deferred_phase2', label: 'مرحلة 2 📦' },
                { id: 'cancelled', label: 'ملغى ✕' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition ${
                    selectedStatus === st.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Risk Spectrum Filter */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-slate-400 font-bold ml-1">درجة الأمان والخطر:</span>
              {[
                { id: 'all', label: 'الكل' },
                { id: 'safe', label: 'أمان (أخضر)', color: 'text-emerald-700 bg-emerald-50' },
                { id: 'attention', label: 'انتباه (أصفر)', color: 'text-amber-700 bg-amber-50' },
                { id: 'warning', label: 'حذر (برتقالي)', color: 'text-orange-700 bg-orange-50' },
                { id: 'critical_danger', label: 'خطر (أحمر)', color: 'text-rose-700 bg-rose-50' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRisk(r.id)}
                  className={`px-2 py-0.5 rounded-lg font-bold border transition ${
                    selectedRisk === r.id
                      ? 'bg-slate-800 text-white border-slate-800'
                      : `${r.color || 'bg-white text-slate-600'} border-slate-200`
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body: Caps Game 2-Columns Grid of Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>عرض {filteredTasks.length} مهمة مطابقة للبحث والتصفية:</span>
            {personPreset === 'emad' && (
              <span className="text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                أنت الآن تستعرض مهام المهندس عماد الشرقاوي المباشرة
              </span>
            )}
          </div>

          {/* Cards Grid: 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => {
              const isDone = task.status === 'completed';
              const isInProgress = task.status === 'in_progress';
              const isBrainstorm = task.status === 'brainstorming';
              const isWaiting = task.status === 'waiting_external';
              const isDeferred = task.status === 'deferred_phase2';
              const isCancelled = task.status === 'cancelled';

              // Risk Border and Lighting
              let riskBorder = 'border-emerald-300';
              let riskHeaderBg = 'bg-emerald-50 text-emerald-900';
              let riskPill = 'مرحلة الأمان (Safe)';
              if (task.riskLevel === 'attention') {
                riskBorder = 'border-amber-300';
                riskHeaderBg = 'bg-amber-50 text-amber-900';
                riskPill = 'متابعة وتدقيق (Attention)';
              } else if (task.riskLevel === 'warning') {
                riskBorder = 'border-orange-300';
                riskHeaderBg = 'bg-orange-50 text-orange-900';
                riskPill = 'منطقة حذرة (Warning)';
              } else if (task.riskLevel === 'critical_danger') {
                riskBorder = 'border-rose-400 ring-2 ring-rose-500/20';
                riskHeaderBg = 'bg-rose-50 text-rose-900 font-black';
                riskPill = 'منطقة الخطر والتأخير (Critical Danger)';
              }

              return (
                <div
                  key={task.id}
                  className={`rounded-3xl bg-white border p-5 shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-md relative overflow-hidden ${
                    isDone ? 'border-emerald-200 bg-emerald-50/10' : riskBorder
                  }`}
                >
                  {/* Top Task Meta Bar */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                          #{task.number}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                          {task.category}
                        </span>
                      </div>

                      {/* Risk Spectrum Badge */}
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${riskHeaderBg}`}>
                        {riskPill}
                      </span>
                    </div>

                    {/* Task Title & Status */}
                    <div className="space-y-1">
                      <h3 className={`text-sm sm:text-base font-black leading-snug ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    {/* Today's Special Update (e.g. 4/10/2026 DUNS or WE contracts) */}
                    {task.todayUpdateNote && (
                      <div className="p-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs font-bold leading-relaxed flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black text-teal-800 block">تحديث اليوم 4/10/2026 الحصري:</span>
                          <span>{task.todayUpdateNote}</span>
                        </div>
                      </div>
                    )}

                    {/* Responsible Party & Helpers */}
                    <div className="text-xs text-slate-700 space-y-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-500">المسؤول الأول:</span>
                        <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {task.responsible}
                        </span>
                      </div>
                      {task.helpers.length > 0 && (
                        <div className="text-[11px] text-slate-500">
                          <span className="font-bold">المساعدون / الجهة المعاونة:</span> {task.helpers.join(' • ')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* The 6 Interactive Checkboxes / Decision State Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      حدد حالة المهمة وقرارك الحالي (اضغط لتحديث الحالة):
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                      {/* 1. تم الإنجاز */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'completed')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isDone 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                            : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isDone ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>تم الإنجاز ✓</span>
                      </button>

                      {/* 2. جاري العمل */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'in_progress')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isInProgress 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                            : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isInProgress ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>جاري العمل ⚙️</span>
                      </button>

                      {/* 3. قيد التفكير والدراسة */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'brainstorming')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isBrainstorm 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                            : 'bg-white hover:bg-indigo-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isBrainstorm ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>قيد التفكير 🧠</span>
                      </button>

                      {/* 4. معلق بتوريد */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'waiting_external')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isWaiting 
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                            : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isWaiting ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>معلق بتوريد ⏳</span>
                      </button>

                      {/* 5. مؤجل مرحلة 2 */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'deferred_phase2')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isDeferred 
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs' 
                            : 'bg-white hover:bg-purple-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isDeferred ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>مؤجل مرحلة 2 📦</span>
                      </button>

                      {/* 6. مستبعد أو ملغى */}
                      <button
                        onClick={() => handleToggleStatus(task.id, 'cancelled')}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 transition font-bold text-[11px] ${
                          isCancelled 
                            ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                            : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isCancelled ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                        <span>مستبعد / ملغى ✕</span>
                      </button>
                    </div>

                    {/* Change Risk Meter directly */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 font-bold">تعديل مستوى الخطر:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleChangeRisk(task.id, 'safe')}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${task.riskLevel === 'safe' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-transparent'}`}
                          title="مرحلة الأمان"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleChangeRisk(task.id, 'attention')}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${task.riskLevel === 'attention' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-transparent'}`}
                          title="متابعة وانتباه"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleChangeRisk(task.id, 'warning')}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${task.riskLevel === 'warning' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-transparent'}`}
                          title="منطقة حذرة"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleChangeRisk(task.id, 'critical_danger')}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${task.riskLevel === 'critical_danger' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-transparent'}`}
                          title="منطقة الخطر والتأخير"
                        >
                          ✓
                        </button>
                      </div>
                    </div>

                    {/* Custom User Note Input */}
                    <div className="pt-1">
                      <input
                        type="text"
                        defaultValue={task.userNote || ''}
                        onBlur={(e) => handleUpdateNote(task.id, e.target.value)}
                        placeholder="أضف تعليقاً أو قراراً خاصاً بك على هذه المهمة..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4 shrink-0 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">
              إجمالي المهام المسجلة: {tasks.length} مهمة
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-bold">
              نسبة الإنجاز الإجمالية: {Math.round((completedCount / tasks.length) * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                saveToStorage(tasks);
                alert('تم حفظ كافة التحديثات محلياً بنجاح وجاهزة للتصدير لقاعدة البيانات.');
              }}
              className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ وتثبيت القرارات</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-sm active:scale-95"
            >
              إغلاق اللوحة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
