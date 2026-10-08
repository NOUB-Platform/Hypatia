import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  DollarSign, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Bot, 
  Plus, 
  Check, 
  Lock, 
  GitBranch, 
  Sparkles,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { ContractDeliverable, ContractChecklistItem, ProjectItem } from '../types';

interface ContractsTabProps {
  contracts: ContractDeliverable[];
  onUpdateContract: (contract: ContractDeliverable) => void;
  onAskHypatia: (prompt: string) => void;
  projects?: ProjectItem[];
  onNavigateToTab?: (tab: any) => void;
}

export const ContractsTab: React.FC<ContractsTabProps> = ({
  contracts,
  onUpdateContract,
  onAskHypatia,
  onNavigateToTab,
}) => {
  const [selectedContractId, setSelectedContractId] = useState<string>(contracts[0]?.id || 'contract-4b');
  const [showAddChecklistModal, setShowAddChecklistModal] = useState(false);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newChecklistCategory, setNewChecklistCategory] = useState<'code' | 'keystore' | 'figma' | 'db' | 'apk' | 'docs'>('code');

  const activeContract = contracts.find((c) => c.id === selectedContractId) || contracts[0];

  const handleToggleChecklistItem = (itemId: string) => {
    if (!activeContract) return;

    const updatedChecklist = activeContract.checklist.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    onUpdateContract({
      ...activeContract,
      checklist: updatedChecklist,
    });
  };

  const handleAddChecklistItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistText.trim() || !activeContract) return;

    const newItem: ContractChecklistItem = {
      id: `chk-${Date.now()}`,
      item: newChecklistText.trim(),
      completed: false,
      required: true,
      category: newChecklistCategory,
    };

    onUpdateContract({
      ...activeContract,
      checklist: [...activeContract.checklist, newItem],
    });

    setNewChecklistText('');
    setShowAddChecklistModal(false);
  };

  const totalChecklist = activeContract?.checklist?.length || 0;
  const completedChecklist = activeContract?.checklist?.filter((i) => i.completed).length || 0;
  const completionPercent = totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  return (
    <div className="space-y-4 pb-20 select-none text-slate-800">
      
      {/* Top Banner - Daylight Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <FileCheck2 className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                متابعة عقود وتسليمات تطبيقات مشاوير
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                مشاوير 4B • WeKaLa • Daro
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              متابعة بنود التسليم الفني للكود، ملفات Keystore الرسمية، وتوافق الـ API للتطبيقات الثلاثة المستلمة من المطور الخارجي.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('quotations')}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>فواتير المقر وأوامر الشراء</span>
            </button>
          )}

          <button
            onClick={() =>
              onAskHypatia(
                `أنا في مرحلة استلام تطبيقات مشاوير الثلاثة (فور بي 4B، وكالة WeKaLa بالـ ي، ودارو Daro) من المطور الخارجي. قدمي لي قائمة تحقق دقيقة (Acceptance Criteria & Code Audit) لفحص السورس كود وملفات الـ Keystore والأمان قبل صرف الدفعة النهائية.`
              )
            }
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            <Bot className="w-4 h-4" />
            <span>استشارة هيباتيا</span>
          </button>
        </div>
      </div>

      {/* Contract App Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {contracts.map((c) => {
          const isSelected = c.id === selectedContractId;
          const completed = c.checklist.filter((i) => i.completed).length;
          const total = c.checklist.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedContractId(c.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between gap-3 shadow-xs ${
                isSelected
                  ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-xs sm:text-sm text-slate-900">{c.appName}</span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono border ${
                    c.contractStatus === 'تم الاعتماد النهائي'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {c.contractStatus}
                </span>
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span>نسبة استيفاء البنود:</span>
                  <span className="font-mono font-bold text-teal-800">{pct}% ({completed}/{total})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 transition-all duration-300 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2 w-full">
                <span className="flex items-center gap-1 font-mono text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>التسليم: {c.targetDeliveryDate}</span>
                </span>
                <span className="font-mono font-bold text-slate-500 text-[10px]">{c.appCode}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Contract Details */}
      {activeContract && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
          
          {/* Header & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900">{activeContract.appName}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                  {activeContract.appCode}
                </span>
                <span className="text-xs text-slate-500">
                  (المطور: {activeContract.developerName})
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeContract.notes}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onAskHypatia(
                    `افحصي عقد تسليم تطبيق ${activeContract.appName}، البنود المتبقية هي: ${activeContract.checklist
                      .filter((i) => !i.completed)
                      .map((i) => i.item)
                      .join('، ')}. ما هي الأسئلة الفنية التي يجب أن أطرحها على المطور الآن؟`
                  )
                }
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>تحليل البنود المتبقية</span>
              </button>

              <button
                onClick={() => setShowAddChecklistModal(true)}
                className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة بند فحص</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">إجمالي بنود الاستلام</span>
              <span className="text-base font-bold text-slate-900 font-mono">{totalChecklist} بنود</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">المستلم والمعتمد</span>
              <span className="text-base font-bold text-teal-800 font-mono">{completedChecklist} بنود</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">المتبقي قبل الصرف</span>
              <span className="text-base font-bold text-amber-800 font-mono">{totalChecklist - completedChecklist} بنود</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">نسبة الإنجاز الفني</span>
              <span className="text-base font-bold text-teal-800 font-mono">{completionPercent}%</span>
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-800 block">قائمة بنود الفحص والتسليم التقني:</span>
            <div className="space-y-2">
              {activeContract.checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    item.completed
                      ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                      : 'bg-white border-slate-200 hover:border-teal-300 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                        item.completed
                          ? 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {item.completed && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'font-bold'}`}>
                      {item.item}
                    </span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono shrink-0">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Checklist Modal */}
      {showAddChecklistModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">إضافة بند فحص جديد للعقد</h3>
              <button
                onClick={() => setShowAddChecklistModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddChecklistItem} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">نص البند المطلوب:</label>
                <input
                  type="text"
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  placeholder="مثال: تسليم شهادات الـ SHA256 الخاصة بـ Google Sign-In"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">التصنيف الفني:</label>
                <select
                  value={newChecklistCategory}
                  onChange={(e: any) => setNewChecklistCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="code">سورس كود (Code)</option>
                  <option value="keystore">مفاتيح التوقيع (Keystore)</option>
                  <option value="figma">مطابقة شاشات (Figma)</option>
                  <option value="db">قواعد بيانات (Database)</option>
                  <option value="apk">ملف الحزمة (APK / AAB)</option>
                  <option value="docs">توثيق وتعليمات (Docs)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddChecklistModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                >
                  إضافة البند
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
