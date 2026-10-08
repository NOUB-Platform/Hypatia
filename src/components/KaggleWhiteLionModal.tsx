import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Calendar, 
  Clock, 
  Award, 
  FileText, 
  Code2, 
  Brain, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  ArrowRight,
  Gift,
  Target
} from 'lucide-react';

interface KaggleWhiteLionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
}

export const KaggleWhiteLionModal: React.FC<KaggleWhiteLionModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(19);

  // Target deadline: October 17, 2026 (Birthday celebration: Oct 18, 2026)
  useEffect(() => {
    const targetDate = new Date('2026-10-17T23:59:59');
    const currentDate = new Date('2026-09-28T00:00:00');
    const diffTime = targetDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, diffDays));
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-right select-none animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-purple-50/40 to-amber-50/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
              <Brain className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  مشروع كاجل والبحث العلمي • بروتوكول UCP
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold border border-purple-200">
                  محرك الأسد الأبيض (The White Lion)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                المستودع العلمي الخاص لم/ سامح ياسين • مسابقة كاجل الرسمية (Gemma 4 Developer Agent)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition shrink-0"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* 1. Target Deadline & Birthday Countdown Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-100 text-xs font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  <span>الديدلاين الحاسم وموعد الإنجاز المستهدف (Hard Deadline)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  17 أكتوبر 2026 (اكتمال البحث ومشروع كاجل 100%)
                </h3>
                <p className="text-xs text-amber-100 leading-relaxed max-w-xl">
                  الانتهاء الكامل من الورقة البحثية وتدريب النموذج قبل الاحتفال بيوم عيد ميلاد م/ سامح في 18 أكتوبر 2026 🎂!
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                <Clock className="w-5 h-5 text-amber-200 animate-pulse" />
                <div className="text-center">
                  <div className="text-2xl font-black font-mono leading-none">{daysRemaining}</div>
                  <div className="text-[10px] text-amber-200 font-bold">يوماً متبقياً</div>
                </div>
                <div className="w-px h-8 bg-white/20 mx-2" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
                  <Gift className="w-4 h-4 text-amber-200" />
                  <span>عيد الميلاد 18/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. The White Lion Philosophy Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2.5 text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>فلسفة محرك "الأسد الأبيض" (The White Lion Engine)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              «الذكاء اللغوي كالأسد الأبيض؛ نادر، جميل، قوي، يجمع بين هيبة الأسد وجمال وندرة المظهر. خبير في المعرفة، دقيق الخطوات، يراجع ويدقق بعناية الرجل الحريص، فائق السرعة والاستجابة، ويمتلك أفق الخبير في التكنولوجيا والذكاء الاصطناعي».
            </p>
          </div>

          {/* 3. Research Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pillar 1: Kaggle Challenge */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>مسابقة كاجل الرسمية</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                    $100,000 Prizes
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  Gemma 4 Developer Agent Challenge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  دعوة رسمية من Ryan Holbrook لتطوير وكيل برمجيات ذاتي أوفلاين باستخدام نماذج Gemma 4 مفتوحة المصدر يعمل على Consumer Hardware دون اتصال خارجي.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>المسار المستهدف:</span>
                <span className="font-bold text-purple-700">Paper Track + Autonomous Agent</span>
              </div>
            </div>

            {/* Pillar 2: UCP Protocol */}
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-teal-700 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>بروتوكول UCP v2.0</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                    User Context Protocol
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-1">
                  محاذاة الإدراك المعرفي (Cognitive Alignment)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  بروتوكول موحد لتغذية النماذج اللغوية بالسياق الشخصي والمؤسسي، حل مشكلة النسيان وفقدان السياق بين الجلسات، مع الحفاظ على خصوصية التفكير وهيكل البيانات.
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>الأداة التفاعلية:</span>
                <span className="font-bold text-teal-700">Eve Edition Generator HTML v1.1.0</span>
              </div>
            </div>
          </div>

          {/* 4. Action Plan & 17-Day Milestones */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>مراحل خطة الـ 17 يوماً (من 1/10 حتى 17/10/2026)</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-900">المرحلة 1 (1 - 5 أكتوبر): صياغة مسودة الورقة البحثية</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    تدقيق هيكل البحث الإنجليزي: Cognitive Alignment in Autonomous Software Engineering Agents.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-900">المرحلة 2 (6 - 12 أكتوبر): ضبط كود Gemma 4 ومكتبة البايثون</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    تشغيل نوت بوك كاجل أوفلاين واختبار خوارزميات Collatz و Magic Square و ucp_llm_manager.py.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-900">المرحلة 3 (13 - 17 أكتوبر): المراجعة النهائية والتسليم</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    إنهاء كافة متطلبات كاجل بنسبة 100% وإيداع البحث للاحتفال بعيد الميلاد يوم 18 أكتوبر.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Approved Practical Case Study in Paper Track */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-teal-50/30 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>دراسة الحالة العملية 01 المعتمدة بالورقة البحثية (Case Study 01: Enterprise Infrastructure Decision Engine):</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold font-mono">
                PoC: Maadi HQ & 4B
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              تعتمد ورقة <strong className="text-purple-900">The White Lion</strong> على حالة م/ سامح ياسين ومنظومة مشاوير كدليل واقعي تجريبي على قدرة النماذج (Gemma 4 & UCP Protocol) على أداء دور رئيس قطاع تكنولوجيا مستقل (Autonomous Co-CTO):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <strong className="text-slate-900 block font-black">1. فحص الفواتير المادية</strong>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  قراءة مواصفات Dell R640 Platinum وسويتش Cisco 3850 من الفواتير الرسمية وبناء القرار الشبكي من واقع ما تم شراؤه فعلياً.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <strong className="text-slate-900 block font-black">2. المقارنة الهندسية والمالية</strong>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  مقارنة FortiGate مع OPNsense Appliance، وتوفير 80-120 ألف ج.م سنوياً مع الحفاظ على أمان السيرفر بنسبة 100%.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-purple-100 space-y-1">
                <strong className="text-slate-900 block font-black">3. التوليد العتادي لـ VLANs</strong>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  توليد أكواد سيسكو CLI وقواعد الجدار الناري آلياً لعزل أجهزة موظفي المكاتب عن قواعد بيانات R640 وسيرفر القرية الذكية.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-slate-500 font-mono">
            UCP-LLM Core • Private Scientific Workspace
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
