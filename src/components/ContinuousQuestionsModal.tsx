import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Send, 
  Filter, 
  AlertTriangle, 
  Plus,
  Minus,
  RotateCcw,
  CheckSquare,
  Square,
  Search,
  Check,
  FileText,
  Sparkles
} from 'lucide-react';
import { SystemInquiry } from '../types';
import { HypatiaIcon } from './HypatiaIcon';

interface ContinuousQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: SystemInquiry[];
  onAnswerInquiry: (inquiryId: string, answerText: string) => void;
  onReopenInquiry?: (inquiryId: string) => void;
  onAddNewInquiry?: (newInquiry: SystemInquiry) => void;
  onAskHypatia: (prompt: string) => void;
}

export const ContinuousQuestionsModal: React.FC<ContinuousQuestionsModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onAnswerInquiry,
  onReopenInquiry,
  onAddNewInquiry,
  onAskHypatia,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [activeTab, setActiveTab] = useState<'pending' | 'answered'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  
  // Per-inquiry interactive form states for checkboxes & custom comments
  const [checkedOptions, setCheckedOptions] = useState<Record<string, string[]>>({});
  const [standardDecisions, setStandardDecisions] = useState<Record<string, string>>({});
  const [customComments, setCustomComments] = useState<Record<string, string>>({});
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // New Question Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionContext, setNewQuestionContext] = useState('');
  const [newQuestionCat, setNewQuestionCat] = useState<'telecom_servers' | 'maadi_cctv' | 'mashweer_apps' | 'kaggle_ucp'>('telecom_servers');

  if (!isOpen) return null;

  // Categories pure and clean for Mashweer & Maadi HQ
  const categories = [
    { id: 'الكل', label: 'الكل' },
    { id: 'telecom_servers', label: 'الاتصالات وخوادم الـ WE والـ Z' },
    { id: 'mashweer_apps', label: 'تطبيقات مشاوير (4B، وكالة، دارو)' },
    { id: 'maadi_cctv', label: 'مقر المعادي والكاميرات وسيسكو' },
    { id: 'legal_official', label: 'الملف القانوني والتراخيص' },
    { id: 'subsidiary_company', label: 'تأسيس الشركة والمقر' },
    { id: 'kaggle_ucp', label: 'مسابقة كاجل والـ UCP' },
    { id: 'financial_trading', label: 'غرفة عمليات التداول والربط' },
    { id: 'subscriptions_budget', label: 'الاشتراكات والماليات' },
  ];

  const standardChoices = [
    { id: 'yes_no_comment', label: 'نعم بدون تعليق', badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    { id: 'yes_with_comment', label: 'نعم بتعليق', badgeClass: 'bg-teal-50 text-teal-800 border-teal-300' },
    { id: 'no_no_comment', label: 'لا بدون تعليق', badgeClass: 'bg-rose-50 text-rose-800 border-rose-300' },
    { id: 'no_with_comment', label: 'لا بتعليق', badgeClass: 'bg-amber-50 text-amber-800 border-amber-300' },
    { id: 'none_now', label: 'لا يوجد الآن / مؤجل حالياً', badgeClass: 'bg-slate-100 text-slate-800 border-slate-300' },
  ];

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesCategory = selectedCategory === 'الكل' || inq.category === selectedCategory;
    const matchesTab = activeTab === 'pending' ? !inq.answered : inq.answered;
    const matchesSearch = searchQuery.trim() === '' || 
      inq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.answer && inq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTab && matchesSearch;
  });

  const pendingCount = inquiries.filter((i) => !i.answered).length;
  const answeredCount = inquiries.filter((i) => i.answered).length;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredInquiries.forEach(i => { allExpanded[i.id] = true; });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const toggleOptionCheckbox = (inquiryId: string, optionText: string) => {
    setCheckedOptions(prev => {
      const current = prev[inquiryId] || [];
      if (current.includes(optionText)) {
        return { ...prev, [inquiryId]: current.filter(x => x !== optionText) };
      } else {
        return { ...prev, [inquiryId]: [...current, optionText] };
      }
    });
  };

  const handleSelectStandardDecision = (inquiryId: string, decisionLabel: string) => {
    setStandardDecisions(prev => ({
      ...prev,
      [inquiryId]: prev[inquiryId] === decisionLabel ? '' : decisionLabel
    }));
  };

  const handleCommentChange = (inquiryId: string, val: string) => {
    setCustomComments(prev => ({ ...prev, [inquiryId]: val }));
  };

  const handleCommitAnswer = (inquiryId: string) => {
    const selected = checkedOptions[inquiryId] || [];
    const standard = standardDecisions[inquiryId] || '';
    const comment = (customComments[inquiryId] || '').trim();

    if (selected.length === 0 && !standard && !comment) {
      alert('يرجى اختيار أحد الخيارات (تشيك بوكس) أو تحديد قرار (نعم/لا) أو كتابة تعليق قبل الحفظ.');
      return;
    }

    const parts: string[] = [];
    if (standard) {
      parts.push(`[القرار: ${standard}]`);
    }
    if (selected.length > 0) {
      parts.push(`[الخيارات المحددة: ${selected.join(' + ')}]`);
    }
    if (comment) {
      parts.push(`توجيه/ملاحظة: ${comment}`);
    }

    const fullAnswer = parts.join(' - ');
    onAnswerInquiry(inquiryId, fullAnswer);

    setSavedFeedback(`تم اعتماد وحفظ القرار ونقله لقسم (تمت الإجابة)!`);
    setTimeout(() => setSavedFeedback(null), 3500);

    // Clear local draft state for this inquiry
    setCheckedOptions(prev => {
      const next = { ...prev };
      delete next[inquiryId];
      return next;
    });
    setStandardDecisions(prev => {
      const next = { ...prev };
      delete next[inquiryId];
      return next;
    });
    setCustomComments(prev => {
      const next = { ...prev };
      delete next[inquiryId];
      return next;
    });
  };

  const handleReopen = (inquiryId: string) => {
    if (onReopenInquiry) {
      onReopenInquiry(inquiryId);
      setSavedFeedback('تمت إعادة فتح الاستفسار ونقله للأسئلة المعلقة للتعديل.');
      setTimeout(() => setSavedFeedback(null), 3000);
    }
  };

  const handleCreateCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !onAddNewInquiry) return;

    const newInq: SystemInquiry = {
      id: `inq-custom-${Date.now()}`,
      question: newQuestionText.trim(),
      context: newQuestionContext.trim() || 'استفسار مضاف يدوياً لمتابعة المتطلبات التشغيلية.',
      category: newQuestionCat,
      urgency: 'high',
      inputType: 'options',
      options: ['موافق ومعتمد للتنفيذ', 'يحتاج لمراجعة إضافية', 'مؤجل حالياً'],
      answered: false,
    };

    onAddNewInquiry(newInq);
    setNewQuestionText('');
    setNewQuestionContext('');
    setShowAddModal(false);
    setSavedFeedback('تمت إضافة الاستفسار الجديد بنجاح!');
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-right select-none animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-amber-50/60 via-white to-teal-50/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  منظومة حسم القرارات والاستفسارات (Decision & Inquiries Engine)
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono font-bold border border-rose-200">
                  {pendingCount} معلق
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold border border-emerald-200">
                  {answeredCount} معتمد
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                نظام تشيك بوكس متعدد (اختيار خيار واحد أو أكثر، نعم/لا بتعليق أو بدون تعليق، وحفظ دائم في الذاكرة وسوبابيز).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAddNewInquiry && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                title="إضافة استفسار جديد"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">سؤال جديد</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {savedFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 text-emerald-900 text-xs font-bold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedFeedback}</span>
          </div>
        )}

        {/* Toolbar & Filter Tabs */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          
          {/* Status Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'pending'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>الأسئلة المعلقة ({pendingCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('answered')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === 'answered'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>سجل القرارات المعتمدة ({answeredCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في نص السؤال أو السياق..."
              className="w-full pr-8 pl-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Expand/Collapse All buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition flex items-center gap-1 shadow-xs"
              title="توسيع كافة الفروع"
            >
              <Plus className="w-3 h-3 text-teal-600" />
              <span>توسيع الكل</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition flex items-center gap-1 shadow-xs"
              title="طي كافة الفروع"
            >
              <Minus className="w-3 h-3 text-slate-500" />
              <span>طي الكل</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[11px] text-slate-400 font-bold ml-1 shrink-0">القسم:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Modal Tree Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-slate-50/40">
          {filteredInquiries.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-slate-400">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500/80 stroke-1" />
              <p className="text-xs font-bold text-slate-600">
                {activeTab === 'pending' 
                  ? 'لا توجد استفسارات معلقة في هذا القسم حالياً؛ تم حسم كل البنود بنجاح!' 
                  : 'لم يتم اعتماد أي إجابات في هذا القسم بعد.'}
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isExpanded = Boolean(expandedIds[inq.id]);
              const isAnswered = inq.answered;
              const currentSelected = checkedOptions[inq.id] || [];
              const currentStandard = standardDecisions[inq.id] || '';
              const currentComment = customComments[inq.id] || '';
              
              const statusPill = isAnswered 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200';

              const urgencyBadge = 
                inq.urgency === 'critical' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                inq.urgency === 'high' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                'bg-slate-100 text-slate-700 border-slate-200';

              return (
                <div
                  key={inq.id}
                  className={`rounded-2xl border transition-all duration-150 overflow-hidden ${
                    isExpanded 
                      ? 'bg-white border-teal-500 shadow-md ring-1 ring-teal-500/20' 
                      : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Tree Row Header */}
                  <div 
                    onClick={() => toggleExpand(inq.id)}
                    className="p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/70 transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Plus / Minus Explorer Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(inq.id);
                        }}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 font-bold ${
                          isExpanded
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>

                      {/* Question Headline */}
                      <div className="truncate text-right">
                        <span className={`text-xs font-bold block truncate ${isAnswered ? 'text-slate-700' : 'text-slate-900'}`}>
                          {inq.question}
                        </span>
                      </div>
                    </div>

                    {/* Right side tags */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${urgencyBadge}`}>
                        {inq.urgency === 'critical' ? 'عاجل جداً' : inq.urgency === 'high' ? 'هام' : 'متوسط'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${statusPill}`}>
                        {isAnswered ? 'تمت الإجابة' : 'معلق بحاجة لحسم'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Sub-Branch */}
                  {isExpanded && (
                    <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3.5 text-xs animate-in fade-in duration-100">
                      
                      {/* Context Information Box */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/90 text-slate-700 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 block">سياق الاستفسار وخلفيته الفنية:</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {inq.id}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{inq.context}</p>
                      </div>

                      {/* If Answered: Display recorded answer + option to re-open */}
                      {isAnswered && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-[11px] font-bold text-emerald-900">القرار المعتمد والمسجل:</span>
                            </div>
                            {inq.answeredAt && (
                              <span className="text-[10px] text-emerald-700 font-mono font-bold">
                                تاريخ الاعتماد: {inq.answeredAt}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-900 bg-white p-2.5 rounded-xl border border-emerald-200 leading-relaxed">
                            {inq.answer}
                          </p>

                          {/* Re-open / Modify Answer Button */}
                          <div className="flex items-center justify-end pt-1">
                            <button
                              onClick={() => handleReopen(inq.id)}
                              className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition flex items-center gap-1.5 shadow-2xs"
                              title="إعادة فتح هذا السؤال لتعديل القرار"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                              <span>تعديل الإجابة أو إعادة فتح السؤال</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* If Pending: Interactive Multi-Choice Checkboxes Engine */}
                      {!isAnswered && (
                        <div className="space-y-3.5 pt-1">
                          
                          {/* 1. Multi-Select Checkboxes for Question Options */}
                          {inq.options && inq.options.length > 0 && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-700">
                                  اختر إجابة واحدة أو عدة خيارات (تشيك بوكس):
                                </span>
                                <span className="text-[10px] text-teal-700 font-bold">
                                  محدد: {currentSelected.length} خيار
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {inq.options.map((opt, idx) => {
                                  const isChecked = currentSelected.includes(opt);
                                  return (
                                    <div
                                      key={idx}
                                      onClick={() => toggleOptionCheckbox(inq.id, opt)}
                                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                                        isChecked
                                          ? 'bg-teal-50 border-teal-500 shadow-2xs text-teal-950 font-bold'
                                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                      }`}
                                    >
                                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition ${
                                        isChecked ? 'bg-teal-700 text-white' : 'border border-slate-300 bg-white'
                                      }`}>
                                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <span className="text-xs leading-snug">{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* 2. Standard Decision Checkboxes / Options */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-slate-700 block">
                              خيارات القرار القياسي السريع:
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {standardChoices.map((choice) => {
                                const isSelected = currentStandard === choice.label;
                                return (
                                  <button
                                    key={choice.id}
                                    type="button"
                                    onClick={() => handleSelectStandardDecision(inq.id, choice.label)}
                                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                                      isSelected
                                        ? 'bg-teal-800 text-white border-teal-900 shadow-xs ring-2 ring-teal-500/20'
                                        : `${choice.badgeClass} hover:opacity-90`
                                    }`}
                                  >
                                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 ${
                                      isSelected ? 'bg-white text-teal-800' : 'border border-slate-400 bg-white'
                                    }`}>
                                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                    <span>{choice.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 3. Notes / Comments Text Input */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              ملاحظة، توجيه خاص، أو تعليق مخصص (اختياري):
                            </label>
                            <input
                              type="text"
                              value={currentComment}
                              onChange={(e) => handleCommentChange(inq.id, e.target.value)}
                              placeholder="اكتب أي ملاحظة أو توجيه إضافي هنا لحفظه مع القرار..."
                              className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                            />
                          </div>

                          {/* 4. Action Bar: Commit Decision */}
                          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200/80">
                            {/* Hypatia Consultation Button */}
                            <button
                              onClick={() => {
                                onClose();
                                onAskHypatia(inq.suggestedPrompt || `أريد استشارتك ومناقشة هذا القرار: ${inq.question}`);
                              }}
                              className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1.5 transition p-1 hover:bg-teal-50 rounded-lg"
                              title="استشارة هيباتيا حول هذا الموضوع"
                            >
                              <HypatiaIcon className="w-4 h-4 text-teal-700" />
                              <span className="hidden sm:inline">استشر هيباتيا في هذا السؤال</span>
                            </button>

                            {/* Prominent Save / Commit Button */}
                            <button
                              onClick={() => handleCommitAnswer(inq.id)}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>اعتماد وحفظ القرار</span>
                            </button>
                          </div>

                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">
            سجل القرارات التفاعلي لمشاوير ومقر المعادي • جميع الإجابات محفوظة في الذاكرة ومزامنة سوبابيز
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-xs"
          >
            إغلاق
          </button>
        </div>
      </div>

      {/* Add Custom Inquiry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 text-right space-y-4" dir="rtl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                <span>إضافة استفسار أو قرار تشغيلي جديد</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomQuestion} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">نص الاستفسار أو القرار:</label>
                <input
                  type="text"
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="مثال: هل نعتمد سداد فاتورة رد لاين عبر الحساب البنكي؟"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">السياق والخلفية الفنية:</label>
                <textarea
                  rows={3}
                  value={newQuestionContext}
                  onChange={(e) => setNewQuestionContext(e.target.value)}
                  placeholder="تفاصيل العرض، الأجهزة المستهدفة، أو أطراف القرار..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">القسم المستهدف:</label>
                <select
                  value={newQuestionCat}
                  onChange={(e) => setNewQuestionCat(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="telecom_servers">الاتصالات وخوادم الـ WE والـ Z</option>
                  <option value="mashweer_apps">تطبيقات مشاوير (4B، وكالة، دارو)</option>
                  <option value="maadi_cctv">مقر المعادي والكاميرات والشبكة</option>
                  <option value="kaggle_ucp">مسابقة كاجل والـ UCP</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-xs"
                >
                  حفظ ونشر في الأسئلة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
