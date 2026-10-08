import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Phone, 
  MapPin, 
  Scale, 
  AlertCircle, 
  Camera, 
  Server, 
  Monitor, 
  ShoppingBag, 
  ChevronRight, 
  Bot, 
  Sparkles,
  Share2,
  FileCheck2,
  HelpCircle,
  Flame,
  ArrowRight,
  Building2,
  Copy,
  Check,
  Send,
  FileText
} from 'lucide-react';
import { 
  SATURDAY_AGENDA_26_SEP, 
  SATURDAY_DECISIONS, 
  LAWYER_MOHAMED_MOSTAFA_DOSSIER,
  ABU_KHALED_SUBSIDIARY_PROPOSAL,
  AgendaItem,
  DecisionItem,
  LawyerTask 
} from '../data/agendaData';

interface AgendaTabProps {
  onAskHypatia: (prompt: string) => void;
  onOpenContacts: () => void;
}

export const AgendaTab: React.FC<AgendaTabProps> = ({
  onAskHypatia,
  onOpenContacts,
}) => {
  const [activeSection, setActiveSection] = useState<'schedule' | 'decisions' | 'lawyer' | 'proposal'>('schedule');
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(SATURDAY_AGENDA_26_SEP);
  const [selectedCameraOption, setSelectedCameraOption] = useState<string>('5mp');
  const [copiedType, setCopiedType] = useState<'none' | 'whatsapp' | 'formal'>('none');
  const [proposalSubView, setProposalSubView] = useState<'whatsapp' | 'formal'>('whatsapp');

  const copyToClipboard = (text: string, type: 'whatsapp' | 'formal') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType('none'), 3000);
  };

  const toggleItemDone = (id: string) => {
    setAgendaItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'done' ? 'pending' : 'done' }
          : item
      )
    );
  };

  const completedCount = agendaItems.filter(i => i.status === 'done').length;

  const todayFormatted = React.useMemo(() => {
    return new Date().toLocaleDateString('ar-EG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);

  return (
    <div className="space-y-3.5 pb-24 animate-in fade-in select-none text-slate-800">
      
      {/* 1. TOP HEADER BANNER (Dynamic Live Calendar Mode) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-50 via-white to-amber-50 border border-teal-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
            </span>
            <span className="text-xs font-bold text-teal-800 font-mono">
              التقويم التشغيلي التفاعلي • {todayFormatted}
            </span>
          </div>

          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold font-mono">
            {completedCount} من {agendaItems.length} مكتمل
          </span>
        </div>

        <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          أجندة المواعيد والقرارات التشغيلية الميدانية لمقر المعادي
        </h1>

        <p className="text-xs text-slate-600 leading-relaxed">
          الجدول التفاعلي لمتابعة معاينات المقر، خطوط ربط المصرية للاتصالات WE، شراء السيرفر وأجهزة المقر، وتصفية المهام مع المهندسين.
        </p>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          <button
            onClick={() => setActiveSection('schedule')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeSection === 'schedule'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>المواعيد ({agendaItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('decisions')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeSection === 'decisions'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>القرارات (2)</span>
          </button>

          <button
            onClick={() => setActiveSection('lawyer')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeSection === 'lawyer'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>ملف المحامي (4)</span>
          </button>

          <button
            onClick={() => setActiveSection('proposal')}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeSection === 'proposal'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>مذكرة أبو خالد</span>
          </button>
        </div>
      </div>

      {/* 2. SECTION 1: SATURDAY SCHEDULE TIMELINE */}
      {activeSection === 'schedule' && (
        <div className="space-y-2.5">
          {agendaItems.map((item, index) => {
            const isDone = item.status === 'done';
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition shadow-sm space-y-2.5 ${
                  isDone 
                    ? 'bg-slate-50/70 border-slate-200 opacity-60' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleItemDone(item.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 hover:border-teal-500'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div>
                      <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {item.time}
                      </span>
                      <h3 className={`text-xs sm:text-sm font-bold text-slate-900 mt-1 ${isDone ? 'line-through text-slate-400' : ''}`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium shrink-0">
                    {item.person}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mr-8">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{item.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mr-8 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {item.details}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1 mr-8">
                  {item.id === 'ag-1' && (
                    <button
                      onClick={() => setActiveSection('proposal')}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold transition flex items-center gap-1 border border-amber-200"
                    >
                      <Building2 className="w-3 h-3 text-amber-700" />
                      <span>مذكرة الشركة التابعة</span>
                    </button>
                  )}
                  <button
                    onClick={() => onAskHypatia(`أريد متابعة تحضيرات ميعاد: ${item.title} مع ${item.person} في ${item.location}`)}
                    className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-bold transition flex items-center gap-1"
                  >
                    <Bot className="w-3 h-3" />
                    <span>ملاحظات هيباتيا</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. SECTION 2: DECISIONS AGENDA */}
      {activeSection === 'decisions' && (
        <div className="space-y-3">
          
          {/* Decision 1: Camera Resolution Choice with Abu Khaled */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    حسم قرار كاميرات المقر والمطعم مع أبو خالد
                  </h3>
                  <span className="text-[11px] text-slate-500">متابعة واتساب صباح السبت قبل إبلاغ م/ علي (الأصدقاء)</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                عاجل جداً
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div 
                onClick={() => setSelectedCameraOption('2mp')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedCameraOption === '2mp' 
                    ? 'bg-teal-50/70 border-teal-500 ring-1 ring-teal-500' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">عرض 2 ميجا بكسل</span>
                  <span className="text-[10px] font-mono text-teal-700 font-bold">Full HD</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  14 كاميرا جودة عادية للمقر، تكلفة اقتصادية مناسبة لتجهيز مكاتب العمل الداخلية.
                </p>
              </div>

              <div 
                onClick={() => setSelectedCameraOption('5mp')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedCameraOption === '5mp' 
                    ? 'bg-teal-50/70 border-teal-500 ring-1 ring-teal-500' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">عرض 5 ميجا بكسل (الموصى به)</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">Super HD 5MP</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  دقة فائقة ورؤية ليلية متقدمة وقراءة دقيقة للمداخل والمخارج وكاشير مطعم المشويات.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 flex items-center justify-between">
              <span>الخيار المحدد لمناقشته مع أبو خالد: <strong className="text-teal-800">{selectedCameraOption === '5mp' ? 'عرض 5 ميجا بكسل' : 'عرض 2 ميجا بكسل'}</strong></span>
              <button
                onClick={() => onAskHypatia(`أريد صياغة رسالة واتساب لأبو خالد لعرض مقارنة كاميرات الـ 2 ميجا والـ 5 ميجا مع م/ علي وترشيح خيار الـ ${selectedCameraOption}`)}
                className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
              >
                <Bot className="w-3 h-3" />
                <span>صياغة رسالة الواتساب لأبو خالد</span>
              </button>
            </div>
          </div>

          {/* Decision 2: Remind Eng Emad about WE Software Install Email */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    تذكير م/ عماد بطلب تثبيت وإعداد السوفت وير من WE
                  </h3>
                  <span className="text-[11px] text-slate-500">طلبنا بإيميل رسمي تحديد تكلفة تثبيت Node.js و PostGIS و Redis</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                معاينة المعادي
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              📌 <strong className="text-slate-900">المطلوب غداً عند اللقاء 12:00 م:</strong> إطلاع م/ عماد على فحوى الإيميل المرسل للمهندس أحمد غريب في WE لتحديد ما إذا كان فريق WE سيقوم بتثبيت وضبط بيئة الخادم (Node.js + PostgreSQL 16 + PostGIS + Redis 7 + F5 WAF) أم سنقوم بذلك ذاتياً.
            </p>

            <button
              onClick={() => onAskHypatia('أريد تجهيز ملخص كامل لإيميل تثبيت وإعداد السوفت وير من المصرية للاتصالات WE لعرضه على م/ عماد')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5 text-teal-600" />
              <span>عرض مسودة الإيميل وتجهيز نقاط النقاش مع م/ عماد</span>
            </button>
          </div>

        </div>
      )}

      {/* 4. SECTION 3: LAWYER MOHAMED MOSTAFA DOSSIER */}
      {activeSection === 'lawyer' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                ملف الأستاذ محمد مصطفى (المستشار القانوني)
              </span>
              <button
                onClick={onOpenContacts}
                className="text-[11px] text-teal-700 hover:underline font-bold"
              >
                الاتصال به
              </button>
            </div>
            <p className="text-slate-600">
              يتابع 4 ملفات حيوية للشركة تتطلب اتصالات وتنسيق مباشر صباح السبت.
            </p>
          </div>

          <div className="space-y-2">
            {LAWYER_MOHAMED_MOSTAFA_DOSSIER.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{task.title}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                    task.status === 'مطلوب استعجاله'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : task.status === 'بانتظار توقيع أبو خالد'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {task.description}
                </p>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 flex items-center justify-between">
                  <span>⚡ <strong className="text-slate-900">المطلوب السبت:</strong> {task.actionNeeded}</span>
                  <button
                    onClick={() => onAskHypatia(`أريد صياغة رسالة رسمية أو نقاط اتصال مع المحامي أ/ محمد مصطفى بخصوص: ${task.title}`)}
                    className="text-teal-700 hover:text-teal-600 font-bold shrink-0 mr-2"
                  >
                    صياغة اتصال
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SECTION 4: ABU KHALED SUBSIDIARY PROPOSAL DOSSIER */}
      {activeSection === 'proposal' && (
        <div className="space-y-3.5">
          {/* Top Memo Header Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                  مذكرة ومقترح تنفيذي رسمي
                </span>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  {ABU_KHALED_SUBSIDIARY_PROPOSAL.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                  <span><strong>الموجّه إليه:</strong> {ABU_KHALED_SUBSIDIARY_PROPOSAL.recipient}</span>
                  <span>•</span>
                  <span><strong>مقدّم المقترح:</strong> {ABU_KHALED_SUBSIDIARY_PROPOSAL.sender}</span>
                </div>
              </div>

              {/* View Switcher: WhatsApp vs Formal */}
              <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-amber-200 self-start sm:self-auto">
                <button
                  onClick={() => setProposalSubView('whatsapp')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    proposalSubView === 'whatsapp'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>رسالة الواتساب السريعة</span>
                </button>
                <button
                  onClick={() => setProposalSubView('formal')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    proposalSubView === 'formal'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>المذكرة الرسمية بالجدول</span>
                </button>
              </div>
            </div>

            {/* Quick Action Copy Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => copyToClipboard(ABU_KHALED_SUBSIDIARY_PROPOSAL.whatsappQuickMessage, 'whatsapp')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                {copiedType === 'whatsapp' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم نسخ رسالة الواتساب ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ رسالة الواتساب لأبو خالد</span>
                  </>
                )}
              </button>

              <button
                onClick={() => copyToClipboard(ABU_KHALED_SUBSIDIARY_PROPOSAL.formalMemoMarkdown, 'formal')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                {copiedType === 'formal' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم نسخ المذكرة الرسمية ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ نص المذكرة بالكامل (Markdown)</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(ABU_KHALED_SUBSIDIARY_PROPOSAL.whatsappQuickMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>إرسال عبر WhatsApp</span>
              </a>
            </div>
          </div>

          {/* SubView 1: WhatsApp Message Preview */}
          {proposalSubView === 'whatsapp' && (
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-emerald-600" />
                  معاينة رسالة الواتساب (صيغة سلسة ومباشرة للهاتف المحمول):
                </span>
                <span className="text-[11px] text-emerald-700 font-mono font-bold">جاهزة للإرسال المباشر</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans select-text">
                {ABU_KHALED_SUBSIDIARY_PROPOSAL.whatsappQuickMessage}
              </div>
            </div>
          )}

          {/* SubView 2: Formal Executive Memo with Tables */}
          {proposalSubView === 'formal' && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 select-text">
              
              {/* Header Title */}
              <div className="text-center border-b border-slate-200 pb-4 space-y-1">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  شركة مشاوير للمنصات الرقمية
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  الموضوع: مقترح إنشاء شركة تابعة
                </h2>
                <p className="text-xs text-slate-500">
                  موجّه إلى: أ/ أبو خالد • إعداد: م/ سامح ياسين (مدير التكنولوجيا)
                </p>
              </div>

              {/* First Section: The Proposal */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-r-4 border-teal-600 pr-2">
                  <span>أولاً: المقترح</span>
                </h3>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    يُقترح إنشاء شركة جديدة <strong>تابعة لشركة مشاوير للمنصات الرقمية</strong>، تختص بالأعمال التكنولوجية والرقمية والإبداعية المساندة لمشروعات الشركة وتطبيقاتها الحالية والمستقبلية.
                  </p>
                  <p>
                    ويُراعى في تأسيسها أن تكون جزءًا من هيكل المجموعة من البداية، بما يحقق <strong>تنظيمًا أفضل للاستثمار والأصول والأعمال المرتبطة بالمشروعات الرقمية</strong>، مع إمكانية نمو الشركة وتوسع نشاطها مستقبلاً.
                  </p>
                </div>
              </div>

              {/* Second Section: 10 Drivers and Objectives Table */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-r-4 border-teal-600 pr-2">
                  <span>ثانياً: دوافع وأهداف الإنشاء (10 أهداف محددة)</span>
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-12 text-center">م</th>
                        <th className="p-2.5 w-48">المهمة / الدافع</th>
                        <th className="p-2.5">الهدف والبيان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {ABU_KHALED_SUBSIDIARY_PROPOSAL.objectives.map((obj) => (
                        <tr key={obj.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-2.5 text-center font-bold text-slate-400 font-mono">{obj.id}</td>
                          <td className="p-2.5 font-bold text-slate-900">{obj.title}</td>
                          <td className="p-2.5 text-slate-600 leading-relaxed">{obj.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Third Section: Proposed Structure Table */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-r-4 border-teal-600 pr-2">
                  <span>ثالثاً: الهيكل المقترح</span>
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-44">البند</th>
                        <th className="p-2.5">المقترح والبيان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {ABU_KHALED_SUBSIDIARY_PROPOSAL.structure.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="p-2.5 font-bold text-slate-900">{row.item}</td>
                          <td className="p-2.5 text-slate-700 font-medium">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Signature Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <strong className="text-slate-900 block font-bold">م/ سامح ياسين</strong>
                  <span>مدير التكنولوجيا - شركة مشاوير للمنصات الرقمية</span>
                </div>
                <span className="font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded-xl">
                  تاريخ التقديم: 26 سبتمبر 2026
                </span>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
