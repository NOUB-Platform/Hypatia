import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Copy, 
  Check, 
  Printer, 
  Layers, 
  Building2, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  CheckSquare,
  Square,
  ListOrdered,
  Share2,
  RotateCcw
} from 'lucide-react';
import { MASTER_ARABIC_LEDGER, MasterLedgerEntry } from '../data/masterArabicLedger';
import { EMAD_CHECKLIST_105, EmadChecklistItem } from '../data/emadChecklistData';

interface MasterArabicLedgerViewProps {
  onAskHypatia: (prompt: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const MasterArabicLedgerView: React.FC<MasterArabicLedgerViewProps> = ({
  onAskHypatia,
  onNavigateToTab
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'emad_checklist' | 'full_ledger'>('emad_checklist');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checklistStatusFilter, setChecklistStatusFilter] = useState<'all' | 'تم' | 'جاري التنفيذ' | 'لم يتم'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAllChecklist, setCopiedAllChecklist] = useState(false);

  // Local state for Emad checklist items to allow toggling status interactively
  const [checklistItems, setChecklistItems] = useState<EmadChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_emad_checklist_status');
      if (saved) {
        const statusMap: Record<number, 'تم' | 'لم يتم' | 'جاري التنفيذ'> = JSON.parse(saved);
        return EMAD_CHECKLIST_105.map(item => ({
          ...item,
          status: statusMap[item.number] || item.status
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return EMAD_CHECKLIST_105;
  });

  useEffect(() => {
    try {
      const statusMap: Record<number, string> = {};
      checklistItems.forEach(i => { statusMap[i.number] = i.status; });
      localStorage.setItem('hypatia_emad_checklist_status', JSON.stringify(statusMap));
    } catch (e) {
      console.error(e);
    }
  }, [checklistItems]);

  const toggleItemStatus = (number: number) => {
    setChecklistItems(prev => prev.map(item => {
      if (item.number !== number) return item;
      const nextStatus = item.status === 'تم' ? 'جاري التنفيذ' : item.status === 'جاري التنفيذ' ? 'لم يتم' : 'تم';
      return { ...item, status: nextStatus };
    }));
  };

  const handleResetChecklist = () => {
    if (window.confirm('هل تريد استعادة الحالات الافتراضية لقائمة م/ عماد؟')) {
      setChecklistItems(EMAD_CHECKLIST_105);
      localStorage.removeItem('hypatia_emad_checklist_status');
    }
  };

  // Stats for Emad checklist
  const stats = useMemo(() => {
    const done = checklistItems.filter(i => i.status === 'تم').length;
    const inProgress = checklistItems.filter(i => i.status === 'جاري التنفيذ').length;
    const notDone = checklistItems.filter(i => i.status === 'لم يتم').length;
    return { total: checklistItems.length, done, inProgress, notDone };
  }, [checklistItems]);

  // Categories for full ledger
  const fullLedgerCategories = useMemo(() => [
    { id: 'all', title: 'كافة البنود والقرارات', count: MASTER_ARABIC_LEDGER.length },
    { id: 'leadership_people', title: 'القيادة ومجلس الإدارة والأشخاص', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'leadership_people').length },
    { id: 'mashweer_apps', title: 'تطبيقات ومنظومة مشاوير', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'mashweer_apps').length },
    { id: 'contracts_qema', title: 'عقود وتسليمات قيمة تك (4B)', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'contracts_qema').length },
    { id: 'servers_hardware', title: 'الخوادم والعتاد والسيرفرات', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'servers_hardware').length },
    { id: 'maadi_hq_cctv', title: 'مقر المعادي والمخطط والكاميرات', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'maadi_hq_cctv').length },
    { id: 'quotations_invoices', title: 'الفواتير وأوامر الشراء المعتمدة', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'quotations_invoices').length },
    { id: 'kaggle_ucp_protocol', title: 'مسابقة كاجل والبروتوكول الذكي', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'kaggle_ucp_protocol').length },
    { id: 'telecom_legal_domain', title: 'الاتصالات والتراخيص و DNS', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'telecom_legal_domain').length },
    { id: 'tasks_roadmap', title: 'المهام وأولويات التنفيذ', count: MASTER_ARABIC_LEDGER.filter(i => i.category === 'tasks_roadmap').length },
  ], []);

  // Filtered Checklist
  const filteredChecklist = useMemo(() => {
    return checklistItems.filter(item => {
      const matchStatus = checklistStatusFilter === 'all' || item.status === checklistStatusFilter;
      const matchQuery = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.responsibleParty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [checklistItems, checklistStatusFilter, searchQuery]);

  // Filtered Full Ledger
  const filteredFullLedger = useMemo(() => {
    return MASTER_ARABIC_LEDGER.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.partiesInvolved?.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Copy full checklist as WhatsApp ready text
  const handleCopyEntireChecklist = () => {
    let output = `📌 جدول متابعة بنود العمل المشتركة - م/ عماد الشرقاوي وم/ سامح ياسين\n`;
    output += `إجمالي البنود: ${checklistItems.length} بنداً | تم: ${stats.done} | جاري التنفيذ: ${stats.inProgress} | لم يتم: ${stats.notDone}\n`;
    output += `-------------------------------------------------------------\n`;

    checklistItems.forEach(item => {
      const icon = item.status === 'تم' ? '✅ تم' : item.status === 'جاري التنفيذ' ? '⏳ جاري التنفيذ' : '❌ لم يتم';
      output += `[${item.number}] ${item.title} -> (${icon}) [المسؤول: ${item.responsibleParty}]\n`;
    });

    navigator.clipboard.writeText(output);
    setCopiedAllChecklist(true);
    setTimeout(() => setCopiedAllChecklist(false), 3000);
  };

  const handleCopySingleItem = (item: EmadChecklistItem) => {
    const text = `[بند ${item.number}]: ${item.title}\nالحالة: ${item.status}\nالمسؤول: ${item.responsibleParty}\nالقسم: ${item.category}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyFullLedgerItem = (item: MasterLedgerEntry) => {
    const text = `[بند ${item.itemNumber}]: ${item.title}\nالتفاصيل: ${item.detail}\nالحالة: ${item.status}\nالأطراف: ${item.partiesInvolved?.join('، ') || 'عام'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200 text-slate-800">
      
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <ListOrdered className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                جدول متابعة م/ عماد الشرقاوي وم/ سامح ياسين (105 بنود تنفيذية)
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                105 بنود (تم / لم يتم)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                بدون شروحات مطولة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              حصر شامل ومباشر لكافة المواضيع والمهام المطروحة للنقاش بنظام الجدول الصريح (تم / جاري التنفيذ / لم يتم) لتسهيل المراجعة وحسم كل نقطة مع الباشمهندس عماد.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0 flex-wrap">
          <button
            onClick={handleCopyEntireChecklist}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
            title="نسخ القائمة كاملة لإرسالها عبر واتساب أو تلجرام"
          >
            {copiedAllChecklist ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAllChecklist ? 'تم نسخ الـ 105 بنود!' : 'نسخ القائمة كاملة (WhatsApp)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            title="طباعة الجدول"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
        <button
          onClick={() => setActiveMainTab('emad_checklist')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeMainTab === 'emad_checklist'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-teal-600" />
          <span>قائمة م/ عماد الشرقاوي (105 بنود: تم / لم يتم)</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-mono font-bold">
            105
          </span>
        </button>

        <button
          onClick={() => setActiveMainTab('full_ledger')}
          className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeMainTab === 'full_ledger'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>السجل العربي التفصيلي الموثق (150+ بند مفصل)</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-mono font-bold">
            {MASTER_ARABIC_LEDGER.length}
          </span>
        </button>
      </div>

      {/* TAB 1: EMAD'S 105 POINTS CHECKLIST */}
      {activeMainTab === 'emad_checklist' && (
        <div className="space-y-4">
          
          {/* Quick KPI Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div 
              onClick={() => setChecklistStatusFilter('all')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                checklistStatusFilter === 'all' 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl font-black block font-mono">{stats.total}</span>
              <span className="text-[11px] opacity-80 font-bold">إجمالي نقاط النقاش</span>
            </div>

            <div 
              onClick={() => setChecklistStatusFilter('تم')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                checklistStatusFilter === 'تم' 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <span className="text-xl font-black block font-mono text-emerald-800">{stats.done}</span>
              <span className="text-[11px] font-bold">تم الإنجاز والاعتماد</span>
            </div>

            <div 
              onClick={() => setChecklistStatusFilter('جاري التنفيذ')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                checklistStatusFilter === 'جاري التنفيذ' 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs' 
                  : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <span className="text-xl font-black block font-mono text-amber-800">{stats.inProgress}</span>
              <span className="text-[11px] font-bold">جاري التنفيذ والمتابعة</span>
            </div>

            <div 
              onClick={() => setChecklistStatusFilter('لم يتم')}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                checklistStatusFilter === 'لم يتم' 
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                  : 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100'
              }`}
            >
              <span className="text-xl font-black block font-mono text-rose-800">{stats.notDone}</span>
              <span className="text-[11px] font-bold">لم يتم / بحاجة لقرار</span>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في البنود، الأجهزة، أو المسؤولين..."
                className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-[11px] text-slate-500">
                عرض: <strong className="text-slate-800">{filteredChecklist.length}</strong> من أصل {checklistItems.length}
              </span>

              <button
                onClick={handleResetChecklist}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                title="استعادة الحالات الأصلية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 105 Table View */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-3 w-14 text-center">#</th>
                    <th className="py-3 px-4">موضوع البند / النقطة</th>
                    <th className="py-3 px-3 w-36">القسم</th>
                    <th className="py-3 px-3 w-32 text-center">الحالة (انقر للتغيير)</th>
                    <th className="py-3 px-4 w-44">المسؤول / الأطراف</th>
                    <th className="py-3 px-3 w-16 text-center">نسخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredChecklist.map((item) => {
                    const isDone = item.status === 'تم';
                    const isInProgress = item.status === 'جاري التنفيذ';

                    let statusClass = 'bg-rose-50 text-rose-800 border-rose-200';
                    if (isDone) statusClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    else if (isInProgress) statusClass = 'bg-amber-50 text-amber-800 border-amber-200';

                    return (
                      <tr 
                        key={item.id}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-400">
                          {item.number}
                        </td>

                        <td className="py-2.5 px-4 font-bold text-slate-900">
                          <span>{item.title}</span>
                        </td>

                        <td className="py-2.5 px-3 text-[11px] text-slate-500 font-medium">
                          {item.category}
                        </td>

                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => toggleItemStatus(item.number)}
                            title="انقر لتغيير الحالة (تم ↔ جاري التنفيذ ↔ لم يتم)"
                            className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition active:scale-95 flex items-center justify-center gap-1 mx-auto ${statusClass}`}
                          >
                            {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            {isInProgress && <Clock className="w-3 h-3 text-amber-600" />}
                            {!isDone && !isInProgress && <AlertCircle className="w-3 h-3 text-rose-600" />}
                            <span>{item.status}</span>
                          </button>
                        </td>

                        <td className="py-2.5 px-4 text-[11px] text-slate-600 font-medium">
                          {item.responsibleParty}
                        </td>

                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleCopySingleItem(item)}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
                            title="نسخ هذا البند"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FULL DETAILED LEDGER */}
      {activeMainTab === 'full_ledger' && (
        <div className="space-y-4">
          
          {/* Categories Bar */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            {fullLedgerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Full Ledger Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredFullLedger.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 font-mono font-bold text-xs flex items-center justify-center border border-teal-200">
                        {item.itemNumber}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {item.categoryTitleArabic}
                      </span>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>الأطراف: {item.partiesInvolved?.join('، ') || 'عام'}</span>
                  <button
                    onClick={() => handleCopyFullLedgerItem(item)}
                    className="p-1 rounded bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                    title="نسخ البند"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
