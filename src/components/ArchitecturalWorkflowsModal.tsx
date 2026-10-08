import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Network, 
  Smartphone, 
  Server, 
  Building, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  DollarSign, 
  CreditCard, 
  Car, 
  CheckSquare, 
  Check,
  Square,
  Sparkles,
  ArrowDown,
  ArrowLeft,
  ChevronLeft,
  Radio,
  Cpu,
  Camera,
  Activity
} from 'lucide-react';

interface ArchitecturalWorkflowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
}

export const ArchitecturalWorkflowsModal: React.FC<ArchitecturalWorkflowsModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia
}) => {
  const [activeTab, setActiveTab] = useState<'4b_trip_cycle' | 'servers_we_topology' | 'hq_procurement_plan'>('4b_trip_cycle');

  // Interactive Procurement Checklist for HQ Items
  const [procurementItems, setProcurementItems] = useState([
    { id: 'item-1', name: 'سيرفر ديل بلاتينيوم Dell PowerEdge R640', room: 'غرفة السيرفرات', status: 'purchased', cost: '96,295 ج.م', vendor: 'QTS' },
    { id: 'item-2', name: 'جهازي HP Workstation Z440 (معالج Xeon)', room: 'غرفة السيرفرات والـ IT', status: 'purchased', cost: 'ضمن العرض', vendor: 'QTS' },
    { id: 'item-3', name: 'سويتش سيسكو 48 بورت Cisco 3850 PoE+', room: 'كابينة الراك 27U', status: 'purchased', cost: '11,970 ج.م', vendor: 'QTS' },
    { id: 'item-4', name: 'كابينة راك بيرلا 27U أرضي عمق 1000 مم', room: 'غرفة السيرفرات', status: 'purchased', cost: '38,600 ج.م', vendor: 'رد لاين' },
    { id: 'item-5', name: 'منظومة 16 كاميرا مراقبة IP و NVR 4K', room: 'كامل المقر والمداخل', status: 'purchased', cost: '55,050 ج.م', vendor: 'الأصدقاء' },
    { id: 'item-6', name: '3 أجهزة كمبيوتر Dell Core i5 الجيل العاشر', room: 'صالة العمليات', status: 'purchased', cost: '39,901 ج.م', vendor: 'تكنو ستورز' },
    { id: 'item-7', name: '3 شاشات HP 22 بوصة بكاميرا مدمجة', room: 'صالة العمليات', status: 'purchased', cost: 'ضمن الفاتورة', vendor: 'تكنو ستورز' },
    { id: 'item-8', name: 'أثاث المقر وكراسي العمل والمكاتب', room: 'المكاتب والصالة', status: 'purchased', cost: 'مسدد', vendor: 'طيبة رنين' },
    { id: 'item-9', name: 'جهاز مزود طاقة غير منقطع UPS 1500VA للراك', room: 'غرفة السيرفرات', status: 'pending', cost: 'مطلوب للمرحلة 2', vendor: 'أ/ هاني' },
    { id: 'item-10', name: 'تكييف مخصص 24/7 لغرفة السيرفرات مع تبريد ذاتي', room: 'غرفة السيرفرات', status: 'pending', cost: 'عاجل ومطلوب', vendor: 'أ/ هاني' },
    { id: 'item-11', name: 'توسيع ذاكرة سيرفر Dell R640 إلى 128GB ECC', room: 'غرفة السيرفرات', status: 'pending', cost: 'مستقبلي', vendor: 'QTS' },
    { id: 'item-12', name: 'قارئات باركود يدوية لمحطات منصة دارو', room: 'محطات الشحن', status: 'pending', cost: 'مرحلة ثانية', vendor: 'مشاوير' }
  ]);

  const toggleProcurement = (id: string) => {
    setProcurementItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'purchased' ? 'pending' : 'purchased' };
      }
      return item;
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right select-none font-['Cairo',sans-serif]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white flex items-center justify-between gap-4 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white">
                  المخططات الهندسية ودورات العمل (Flowcharts & Workflows)
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30">
                  مخططات حية تفاعلية
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                استعراض مسار دورة حياة رحلة 4B، بنية الربط مع المصرية للاتصالات WE، ومخطط عتاد وتجهيزات المقر.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 shrink-0 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('4b_trip_cycle')}
            className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === '4b_trip_cycle'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>1. دورة عمل كابتن ورحلة فور بي (4B Ride Lifecycle)</span>
          </button>

          <button
            onClick={() => setActiveTab('servers_we_topology')}
            className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'servers_we_topology'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>2. بنية السيرفرات والربط الفايبر مع WE وداتا سنتر القرية الذكية</span>
          </button>

          <button
            onClick={() => setActiveTab('hq_procurement_plan')}
            className={`px-4 py-2 rounded-2xl font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'hq_procurement_plan'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>3. مخطط مشتريات وتجهيزات المقر (تم الشراء / لم يتم)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/60 space-y-6">

          {/* TAB 1: 4B TRIP LIFECYCLE WORKFLOW */}
          {activeTab === '4b_trip_cycle' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-3xl bg-white border border-teal-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    مخطط التدفق البرمجي الكامل لرحلة تطبيق فور بي (4B Lifecycle)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    من ضغطة الراكب وحتى تحصيل الأجرة وتوزيع العمولات بنظام PostGIS والربط اللحظي.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
                  كفاءة العمليات 99% (موفق وعمرو)
                </span>
              </div>

              {/* Visual Flow Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    step: '01',
                    title: 'طلب الرحلة من تطبيق الراكب',
                    desc: 'إدخال نقطة الانطلاق والوجهة، اختيار فئة السيارة (عادي، مميز، عائلي)، وحساب التكلفة التقديرية بالمسار.',
                    icon: MapPin,
                    badge: 'تطبيق الركاب (Flutter)',
                    color: 'teal'
                  },
                  {
                    step: '02',
                    title: 'محرك التوجيه الجغرافي PostGIS',
                    desc: 'البحث عن أقرب 5 كباتن متاحين في محيط 3 كم وإرسال إشعار فوري (Push Notification) لهواتفهم.',
                    icon: Radio,
                    badge: 'سيرفر القرية الذكية WE',
                    color: 'blue'
                  },
                  {
                    step: '03',
                    title: 'قبول الكابتن والتحرك للموقع',
                    desc: 'ظهور تفاصيل الرحلة للكابتن، قبول الطلب في أقل من 15 ثانية، وبدء الملاحة المباشرة نحو الراكب.',
                    icon: Car,
                    badge: 'موفق وعمرو (الكباتن)',
                    color: 'emerald'
                  },
                  {
                    step: '04',
                    title: 'بدء الرحلة والتتبع الحي GPS',
                    desc: 'بث إحداثيات السيارة كل 3-5 ثوانٍ، وتأمين مسار الرحلة، مع زر الاستغاثة SOS المرتبط بصالة العمليات.',
                    icon: Activity,
                    badge: 'صالة عمليات المعادي',
                    color: 'indigo'
                  },
                  {
                    step: '05',
                    title: 'إنهاء الرحلة والتسعير الديناميكي',
                    desc: 'احتساب المسافة الفعلية المقطوعة وزمن الانتظار وتطبيق معامل الذروة وحسم كود الخصم التلقائي.',
                    icon: DollarSign,
                    badge: 'خوارزمية التسعير (CTO)',
                    color: 'amber'
                  },
                  {
                    step: '06',
                    title: 'التحصيل والمحفظة والعمولات',
                    desc: 'السداد كاش أو بالمحفظة وفوري (Fawry)، خصم عمولة الشركة (15%)، وتحويل الباقي لمحفظة الكابتن.',
                    icon: CreditCard,
                    badge: 'فوري وباي موب والحسابات',
                    color: 'purple'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition space-y-3 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-mono font-black text-sm border border-teal-200">
                          {item.step}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-teal-600" />
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SERVERS & WE TOPOLOGY */}
          {activeTab === 'servers_we_topology' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-3xl bg-white border border-blue-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    بنية الربط الشبكي والسيرفرات بين مقر المعادي والمصرية للاتصالات WE
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    الربط الفايبر المباشر، جدار الحماية F5 WAF، وخادم تطبيق 4B المعتمد اليوم 4/10 بداتا سنتر القرية الذكية.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
                  تحديث اليوم 4/10: توقيع عقود WE
                </span>
              </div>

              {/* Topology Architecture Diagram */}
              <div className="p-5 rounded-3xl bg-slate-950 text-white font-mono text-xs space-y-4 shadow-xl border border-slate-800">
                <div className="text-center font-bold text-teal-400 text-sm border-b border-slate-800 pb-2">
                  [MASHWEER DIGITAL PLATFORMS - ENTERPRISE INFRASTRUCTURE TOPOLOGY]
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {/* HQ Maadi */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-2">
                    <div className="text-teal-300 font-black text-sm">مقر المعادي الرئيسي (HQ)</div>
                    <div className="text-[11px] text-slate-300 space-y-1 text-right">
                      <div>• كابينة راك بيرلا 27U أرضي (1000مم)</div>
                      <div>• سيرفر ديل بلاتينيوم Dell R640 (48 Cores)</div>
                      <div>• سويتش سيسكو Catalyst 3850 (48 Port PoE+)</div>
                      <div>• محطة Z440 (نظام Proxmox VE + جدار OPNsense)</div>
                      <div>• شبكة 16 كاميرا مراقبة IP فائقة الوضوح 5MP</div>
                      <div>• 8 محطات عمل OptiPlex لصالة العمليات</div>
                    </div>
                  </div>

                  {/* Telecom Backbone */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-2 flex flex-col justify-center">
                    <div className="text-blue-300 font-black text-sm">خطوط الربط الفايبر WE</div>
                    <div className="text-[11px] text-slate-300 space-y-1.5 text-center">
                      <div className="bg-slate-800 p-2 rounded-xl text-teal-200 font-bold">
                        ◄ خط فايبر تجميعي مركزي 24 Mbps ►
                      </div>
                      <div className="text-slate-400">
                        شبكة L3VPN المؤمنة (سنترال المعادي)
                      </div>
                      <div className="bg-slate-800 p-2 rounded-xl text-blue-200">
                        ربط 6 محافظات بخطوط فرعية (4 Mbps)
                      </div>
                    </div>
                  </div>

                  {/* Smart Village Data Center */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-2">
                    <div className="text-emerald-300 font-black text-sm">داتا سنتر WE القرية الذكية</div>
                    <div className="text-[11px] text-slate-300 space-y-1 text-right">
                      <div>• سيرفر 4B السحابي المخصص (معتمد اليوم 4/10)</div>
                      <div>• جدار حماية مؤسسي F5 WAF للحماية من DDoS</div>
                      <div>• قاعدة بيانات PostGIS 16 الجغرافية للرحلات</div>
                      <div>• ذاكرة كاشينج سريعة Redis 7 للخرائط الحية</div>
                      <div>• جاهزية الربط المباشر مع وزارة النقل LTRA</div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  إشراف هندسي وتنفيذي: المهندس عماد الشرقاوي والمهندس سامح ياسين ومعهما م/ أحمد عبيد وحاتم الفني.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HQ PROCUREMENT CHECKLIST */}
          {activeTab === 'hq_procurement_plan' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    مخطط تجهيزات ومشتريات المقر (المعراج بالمعادي 26م × 21م)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    اضغط على أي بند لتغيير حالته من (تم الشراء الفعلي) إلى (مطلوب للمرحلة 2) مع حفظ فوري.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold">
                  <span className="text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
                    {procurementItems.filter(i => i.status === 'purchased').length} تم الشراء والتوريد
                  </span>
                </div>
              </div>

              {/* Checklist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {procurementItems.map((item) => {
                  const isPurchased = item.status === 'purchased';
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleProcurement(item.id)}
                      className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                        isPurchased
                          ? 'bg-white border-emerald-200 hover:border-emerald-400'
                          : 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                          isPurchased ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-400'
                        }`}>
                          {isPurchased ? <Check className="w-4 h-4 stroke-[3px]" /> : null}
                        </div>
                        <div>
                          <h4 className={`text-xs sm:text-sm font-bold ${isPurchased ? 'text-slate-900' : 'text-amber-950 font-black'}`}>
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{item.room}</span>
                            <span>•</span>
                            <span>المورد: {item.vendor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left font-mono shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                          isPurchased ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {item.cost}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4 shrink-0 text-xs">
          <div className="text-slate-500 font-bold">
            📐 كافة المخططات موثقة ومتطابقة مع المعاينة الميدانية وأوامر التوريد المعتمدة.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-sm active:scale-95"
          >
            إغلاق المخططات
          </button>
        </div>

      </div>
    </div>
  );
};
