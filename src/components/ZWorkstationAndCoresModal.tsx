import React, { useState } from 'react';
import { 
  Server, Cpu, ShieldCheck, Camera, Layers, HardDrive, 
  CheckCircle2, DollarSign, Zap, HelpCircle, 
  Settings, Database, Network, ArrowRight, BookOpen, AlertTriangle
} from 'lucide-react';

interface ZWorkstationAndCoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
}

export const ZWorkstationAndCoresModal: React.FC<ZWorkstationAndCoresModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia
}) => {
  const [activeTab, setActiveTab] = useState<'decision' | 'licensing' | 'distribution' | 'architecture'>('decision');
  
  // Interactive Core Allocation State (Total 16 Cores on Xeon Z440/Z640/Z840)
  const [coresAllocation, setCoresAllocation] = useState({
    opnsense: 4,
    cctv: 4,
    internalApps: 6,
    staging: 2
  });

  if (!isOpen) return null;

  const totalAllocated = coresAllocation.opnsense + coresAllocation.cctv + coresAllocation.internalApps + coresAllocation.staging;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200 text-right text-slate-800">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shadow-inner">
              <Server className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white">
                  محطة عمل Z كسيرفر تشغيلي ومستودع تطبيقات داخلي
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30 font-bold">
                  HP/Dell Z Workstation • 16 Cores
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 font-bold">
                  توفير 100% تراخيص
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                دراسة قرار الاعتماد على جهاز Z كمستودع للتطبيقات والفايروول والـ NVR، مع تحليل شامل لطريقة احتساب تراخيص الكور (Cores Licensing).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95 shrink-0"
            title="إغلاق"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('decision')}
            className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'decision'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>رأي المستشار والقرار الهندسي</span>
          </button>

          <button
            onClick={() => setActiveTab('licensing')}
            className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'licensing'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>فكرة الكور (Cores) وحساب التراخيص</span>
          </button>

          <button
            onClick={() => setActiveTab('distribution')}
            className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'distribution'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span>محاكي توزيع الـ 16 كور (Live Simulator)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-3 px-3 transition border-b-2 flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-600" />
            <span>المعمارية المقترحة (Proxmox + OPNsense)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs">
          
          {/* TAB 1: DECISION & APPROVAL */}
          {activeTab === 'decision' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-emerald-900">
                    موافقة وتأييد كامل لقرارك يا باشمهندس سامح (100% صائب وعملي)
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    استخدام أحد جهازي الـ Z (الـ 16 كور) ليكون "سيرفر ومستودع تطبيقات داخلي + فايروول OPNsense + نظام كاميرات NVR" هو القرار الهندسي الأمثل والأنضج مالياً وتقنياً للأسباب التالية:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-black text-slate-900 text-xs">جهاز Z هو سيرفر حقيقي في جسد كيسة</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    أجهزة الـ Workstation من فئة Z (مثل HP Z440/Z640 أو Dell Precision) مزودة بمعالجات Intel Xeon فئة Enterprise، وذاكرة ECC المسجلة المقاومة للأخطاء (Error-Correcting Code)، وبور سبلاي مصنف 80 Plus Gold يعمل 24/7 لسنين دون توقف.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-black text-slate-900 text-xs">عزل تام وتوفير لسيرفر Dell R640</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    بدلاً من إرهاق سيرفر الديل الرئيسي R640 بالمهام الثانوية كالفايروول والتسجيل المكتبي، يتحمل جهاز الـ Z عبء حماية الشبكة، وتشغيل الكاميرات الـ 16، واستضافة تطبيقات الشركة الداخلية (Staging & Docker Repository).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-black text-slate-900 text-xs">استقلالية المنظومة المحلية (Air-Gapped Ops)</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    إذا انقطع الإنترنت الخارجي، يظل جهاز الـ Z عاملاً داخل مقر المعادي: تسجيل الكاميرات شغال، السويتش يوزع، التطبيقات الداخلية للموظفين تعمل محلياً بلا أي توقف أو بطء.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      4
                    </div>
                    <h4 className="font-black text-slate-900 text-xs">الهروب الذكي من فخ تراخيص مايكروسوفت</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    باستخدام بيئة مفتوحة المصدر (Proxmox VE + OPNsense + Linux Containers)، تستفيد من كامل الـ 16 كور والـ 32 ثريد دون دفع مليم واحد في تراخيص الويندوز سيرفر أو تراخيص الكور التعسفية.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CORES LICENSING EXPLANATION */}
          {activeTab === 'licensing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-black text-white">
                    كيف يتم احتساب تراخيص السيرفرات بعدد الكور (Per-Core Licensing)؟
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  سؤالك في الصميم يا باشمهندس: "هل السيرفرات والتراخيص بتتحسب بعدد الكور؟"
                  الإجابة تعتمد تماماً على نوع النظام: أنظمة مايكروسوفت التجارية تحاسبك على كل كور فيزيكال، بينما البرمجيات الحرة ومفتوحة المصدر تعطيك الكور مجاناً بلا قيود!
                </p>
              </div>

              {/* Comparison Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-right border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">المنتج / النظام</th>
                      <th className="p-3">طريقة الترخيص</th>
                      <th className="p-3">تكلفة الترخيص لجهاز 16-Core</th>
                      <th className="p-3">شروط وتكاليف إضافية (CALs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        Windows Server 2022/2025 Standard
                      </td>
                      <td className="p-3 text-slate-600">
                        ترخيص إلزامي لكل أنوية المعالج (بحد أدنى 16 كور للسيرفر، تباع في حزم 2-Core Packs)
                      </td>
                      <td className="p-3 font-mono font-bold text-rose-700">
                        حوالي 1,069 $ (≈ 52,000 ج.م)
                      </td>
                      <td className="p-3 text-slate-500">
                        يلزم شراء CAL لكل مستخدم يتصل بالسيرفر (45$ لكل موظف)
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        Microsoft Exchange Server
                      </td>
                      <td className="p-3 text-slate-600">
                        ترخيص سيرفر أساسي + ترخيص ويندوز سيرفر + ترخيص Exchange CAL لكل إيميل
                      </td>
                      <td className="p-3 font-mono font-bold text-rose-700">
                        من 2,500$ إلى 4,000$+ (أكثر من 150 ألف ج)
                      </td>
                      <td className="p-3 text-slate-500">
                        تراخيص سنوية وتجديد إجباري وتكلفة ضخمة لكل بريد إلكتروني
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        Microsoft SQL Server (Enterprise/Std)
                      </td>
                      <td className="p-3 text-slate-600">
                        تراخيص صارمة بعدد الكور (حزم 2 Cores، بحد أدنى 4 كور)
                      </td>
                      <td className="p-3 font-mono font-bold text-rose-700">
                        3,945 $ لكل 2 كور (16 كور تتجاوز 31,000$)
                      </td>
                      <td className="p-3 text-slate-500">
                        تكلفة خيالية لا تناسب المقرات الناشئة
                      </td>
                    </tr>

                    <tr className="bg-emerald-50/60 font-bold hover:bg-emerald-50">
                      <td className="p-3 text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>منظومة Open Source (OPNsense + Proxmox + Linux + Docker)</span>
                      </td>
                      <td className="p-3 text-emerald-900">
                        مفتوحة المصدر بالكامل (GPL/BSD) • غير مقيدة بعدد الكور أو المستخدمين
                      </td>
                      <td className="p-3 font-mono text-emerald-700 font-black">
                        0.00 $ (صفر جنيه مصري)
                      </td>
                      <td className="p-3 text-emerald-800">
                        عدد مستخدمين غير محدود، وتحديثات مجانية مستمرة مدى الحياة
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial Insight Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>الخلاصة العملية بالنسبة لسيرفر Exchange والبريد:</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  تحويل جهاز الـ Z إلى Exchange سيرفر سيكلفك آلاف الدولارات في تراخيص الويندوز سيرفر وتراخيص الإكستشينج والـ CALs، وإذا لم ترخصها ستكون المنظومة عرضة للحظر وتوقف التحديثات. البديل العبقري هو:
                  <strong> إما استخدام بريد جوجل ووركسبيس/المصرية للاتصالات للبريد الرسمي</strong>، أو تنصيب حاوية <strong>Mailcow / Postfix</strong> مفتوحة المصدر داخل جهاز الـ Z مجاناً وبلا أي قيود على عدد الكور!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE CORES DISTRIBUTION SIMULATOR */}
          {activeTab === 'distribution' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900">
                    محاكي توزيع الـ 16 كور لجهاز الـ Z (Xeon Cores Planner)
                  </h3>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    totalAllocated === 16 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {totalAllocated} / 16 Cores موزعة
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  يمكنك تعديل عدد الكور المخصصة لكل نظام لتوزيع الحمل بشكل متزن بين الفايروول، الكاميرات، ومستودع التطبيقات:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* OPNsense VM */}
                <div className="p-4 rounded-2xl bg-white border border-teal-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>جدار ناري OPNsense</span>
                    </span>
                    <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                      {coresAllocation.opnsense} Cores (8GB RAM)
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    value={coresAllocation.opnsense} 
                    onChange={(e) => setCoresAllocation({...coresAllocation, opnsense: parseInt(e.target.value)})}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    كافية لفحص حركة بيانات الشبكة، تشغيل جدار Suricata IDS/IPS، وعزل شبكات الـ VLANs في المقر.
                  </p>
                </div>

                {/* CCTV NVR VM */}
                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-amber-600" />
                      <span>سيستم الكاميرات (NVR System)</span>
                    </span>
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                      {coresAllocation.cctv} Cores (16GB RAM)
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    value={coresAllocation.cctv} 
                    onChange={(e) => setCoresAllocation({...coresAllocation, cctv: parseInt(e.target.value)})}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    تسجيل متزامن لـ 16 كاميرا بجودة 5MP بترميز H.265 دون تأخير مع توجيه الحفظ لهارديسك WD Purple.
                  </p>
                </div>

                {/* Internal Apps & Microservices */}
                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>مستودع التطبيقات والـ Docker</span>
                    </span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
                      {coresAllocation.internalApps} Cores (24GB RAM)
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="10" 
                    value={coresAllocation.internalApps} 
                    onChange={(e) => setCoresAllocation({...coresAllocation, internalApps: parseInt(e.target.value)})}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    حاويات لتطبيقات مشاوير الداخلية، خادم تخزين محلي MinIO S3، ومستودع أكواد Git الداخلي.
                  </p>
                </div>

                {/* Staging & Test Lab */}
                <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-purple-600" />
                      <span>بيئة الاختبارات (Staging Lab)</span>
                    </span>
                    <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                      {coresAllocation.staging} Cores (8GB RAM)
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="6" 
                    value={coresAllocation.staging} 
                    onChange={(e) => setCoresAllocation({...coresAllocation, staging: parseInt(e.target.value)})}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    بيئة معزولة لتجربة وتدقيق ملفات APK وتحديثات كود تطبيق 4B وقيمة تك قبل الرفع الحي.
                  </p>
                </div>
              </div>

              {/* Total Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-700" />
                  <span>إجمالي تكلفة تراخيص هذه المنظومة الرباعية:</span>
                </span>
                <span className="font-mono font-black text-sm text-teal-800">
                  0.00 $ (100% Free & Open Source)
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: RECOMMENDED ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-teal-600" />
                  <span>خطة التنفيذ المعمارية لجهاز الـ Z خطوة بخطوة:</span>
                </h3>

                <ol className="list-decimal list-inside space-y-2.5 text-slate-700 text-xs">
                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>الخطوة 1: تثبيت Proxmox VE 8 (Type-1 Hypervisor):</strong>
                    <div className="text-[11px] text-slate-500 mt-1">
                      نظام خفيف مبني على دبيان لينكس، يحول جهاز الـ Z إلى منصة سيرفرات افتراضية احترافية مع لوحة تحكم ويب سهلة.
                    </div>
                  </li>

                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>الخطوة 2: إنشاء ماكينة OPNsense الافتراضية (VM 100):</strong>
                    <div className="text-[11px] text-slate-500 mt-1">
                      تخصيص 4 Cores وكارتين شبكة (Dual NICs): الأول لمدخل الإنترنت (WAN) والثاني لسويتش سيسكو 3850 لتوزيع الـ LAN وعزل الـ VLANs.
                    </div>
                  </li>

                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>الخطوة 3: إنشاء ماكينة الـ NVR للكاميرات (VM 101):</strong>
                    <div className="text-[11px] text-slate-500 mt-1">
                      تنصيب نظام NVR خفيف مثل Shinobi أو Milestone أو استخدام برمجية التسجيل المرفقة، وتوصيل هارديسك التخزين مباشرة عبر PCIe Passthrough لضمان سرعة الحفظ.
                    </div>
                  </li>

                  <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>الخطوة 4: تنصيب حاويات Docker و Portainer للتطبيقات الداخلية (LXC 102):</strong>
                    <div className="text-[11px] text-slate-500 mt-1">
                      استضافة النسخ التجريبية لتطبيقات مشاوير (WeKaLa و 4B و Daro) محلياً بحيث يقدر موظفو المقر العمل عليها بسرعة الـ Gigabit الداخلية.
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between text-xs">
                <span>هل تريد استشارة إضافية من هيباتيا حول تخصيص كروت الشبكة والـ Passthrough؟</span>
                {onAskHypatia && (
                  <button
                    onClick={() => {
                      onAskHypatia('أريد استشارة تفصيلية حول إعداد Proxmox VE على جهاز Z440 مع OPNsense و PCIe Passthrough لكروت الشبكة وهارديسك الكاميرات');
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1 shadow-xs"
                  >
                    <span>استشر هيباتيا</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-teal-700" />
            <span>محطة عمل Z: إجمالي 16 Cores • 32 Threads • ECC RAM</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-xs active:scale-95"
            >
              حفظ ومتابعة
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
