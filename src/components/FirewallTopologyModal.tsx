import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Server, 
  Network, 
  Layers, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Zap,
  Info,
  SlidersHorizontal,
  FolderTree,
  Terminal,
  Activity,
  Sparkles
} from 'lucide-react';

interface FirewallTopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
}

export const FirewallTopologyModal: React.FC<FirewallTopologyModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison' | 'vlans' | 'cisco_config' | 'kaggle_study' | 'z440_deployment'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Cisco 3850 IOS Configuration Snippet
  const ciscoConfigSnippet = `! Cisco Catalyst 3850 Configuration for Maadi HQ
! VLAN & Trunking Setup for OPNsense Firewall Appliance
enable
configure terminal

! 1. Define VLANs
vlan 10
 name USERS_OFFICE
vlan 20
 name SERVERS_CORE
vlan 30
 name IT_ADMIN_MGMT
vlan 40
 name CCTV_SECURITY
vlan 50
 name GUEST_WIFI
exit

! 2. Trunk Port to OPNsense Firewall (Port G1/0/48)
interface GigabitEthernet1/0/48
 description TRUNK_TO_OPNSENSE_APPLIANCE
 switchport mode trunk
 switchport trunk encapsulation dot1q
 switchport trunk allowed vlan 10,20,30,40,50
 spanning-tree portfast trunk
 no shutdown
exit

! 3. Dell PowerEdge R640 Server Port (VLAN 20)
interface GigabitEthernet1/0/1
 description DELL_R640_PRIMARY_DATA_NIC
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
 no shutdown
exit

! 4. HP Z440 Workstation Port (VLAN 20)
interface GigabitEthernet1/0/2
 description HP_Z440_ENG_WORKSTATION
 switchport mode access
 switchport access vlan 20
 spanning-tree portfast
 no shutdown
exit

! 5. CCTV Cameras Ports 1-16 (VLAN 40 with PoE+)
interface range GigabitEthernet1/0/17 - 32
 description CCTV_IP_CAMERAS_POE
 switchport mode access
 switchport access vlan 40
 power inline auto
 spanning-tree portfast
 no shutdown
exit

write memory
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-right select-none animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-teal-50 via-white to-sky-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  الاستشارة المعمارية للشبكة وجدار الحماية (OPNsense vs FortiGate)
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  تصميم معتمد لمقر المعادي
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                عزل سيرفر Dell R640، تقسيم الـ VLANs، وتأمين وصول موظفي 4B بدون مخاطر اختراق أو تكاليف باهظة
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

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-100 bg-slate-50/50 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'architecture'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>الطوبولوجيا المعمارية</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'comparison'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>مقارنة OPNsense مع FortiGate</span>
          </button>

          <button
            onClick={() => setActiveTab('vlans')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'vlans'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>تقسيم الـ VLANs وقواعد الأمان</span>
          </button>

          <button
            onClick={() => setActiveTab('cisco_config')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'cisco_config'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>أكواد ضبط Cisco 3850</span>
          </button>

          <button
            onClick={() => setActiveTab('kaggle_study')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'kaggle_study'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>دراسة حالة مسابقة كاجل (The White Lion)</span>
          </button>

          <button
            onClick={() => setActiveTab('z440_deployment')}
            className={`pb-3 px-3 font-bold border-b-2 transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'z440_deployment'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4 text-emerald-600" />
            <span>توظيف جهاز HP Z440 (الفايرول + الكاميرات + التراخيص)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB 1: ARCHITECTURE & HARDWARE DECISION */}
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              {/* Executive Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/90 text-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>القرار الهندسي المعتمد لمقر المعادي وم/ سامح ياسين:</span>
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  اعتماد جهاز جدار ناري مستقل (Dedicated Appliance) بنظام OPNsense، وعدم تثبيته كـ VM داخل سيرفر Dell R640.
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  سيرفر Dell R640 يمتلك معالجين Intel Xeon Platinum 8160 (48 نواة) و 64GB RAM و 3 وحدات تخزين 1.2TB SAS؛ لذا يجب تخصيص 100% من موارده لقواعد بيانات مشاوير ومحرك الـ Backend والتحليل، بينما يتولى جهاز OPNsense المستقل حماية الشبكة دون التأثير على استقرار السيرفر.
                </p>
              </div>

              {/* Visual ASCII / Topology Diagram Card */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 font-mono text-xs border border-slate-800 shadow-md">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>مخطط التدفق الطوبولوجي المعتمد (Enterprise Edge Topology)</span>
                  </span>
                  <span className="text-[10px] text-teal-400">1Gbps / 2.5Gbps Line Rate</span>
                </div>

                <pre className="p-3 bg-slate-950 rounded-xl overflow-x-auto text-[11px] text-teal-300 leading-relaxed text-left" dir="ltr">
{`                    INTERNET (WE Fiber Leased Line 24Mbps + Backup ADSL)
                                       │
                                [ ISP Router ]
                                       │ WAN (Public IP / PPPoE)
                        ┌──────────────▼──────────────┐
                        │   OPNsense Firewall Device  │ (Dedicated x86 Appliance)
                        │  (Stateful / Suricata IPS)  │ (WireGuard & IPsec VPN)
                        └──────────────┬──────────────┘
                                       │ 802.1Q Trunk (1G/2.5G)
                        ┌──────────────▼──────────────┐
                        │   Cisco Catalyst 3850 PoE   │ (48-Port Gigabit Switch)
                        │ (WS-C3850-48P-S Dual 715W) │ (Layer 2/3 Hardware Switching)
                        └──────────────┬──────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┬──────────────────────────────┐
        │                              │                              │                              │
   [ VLAN 10 ]                    [ VLAN 20 ]                    [ VLAN 30 ]                    [ VLAN 40 ]
  OFFICE EMPLOYEES             SERVERS & CORE DB               IT & ADMIN MGMT                CCTV & SECURITY
        │                              │                              │                              │
  ├── PCs الموظفين               ├── Dell R640 Platinum         ├── جهاز م/ سامح (CTO)         ├── 16 كاميرا IP مراقبة
  ├── Dashboards APK             ├── HP Z440 Workstations       ├── م/ أحمد عبيد               ├── NVR 16ch مسجل
  ├── Google Play / Apple        ├── PostgreSQL 16 + PostGIS    ├── Cisco Console CLI          └── هارديسك WD Purple
  └── منع الوصول للسيرفرات ❌    └── سحابة WE / القرية الذكية  └── OPNsense WebGUI            (معزولة عن الموظفين)`}
                </pre>
              </div>

              {/* Hardware Specifications of Dedicated OPNsense Appliance */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                  <Cpu className="w-4 h-4 text-teal-600" />
                  <span>المواصفات الموصى بها لجهاز الـ Firewall المستقل (OPNsense Hardware Appliance):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">المعالج (Processor)</span>
                    <strong className="text-slate-800 block mt-0.5">Intel N100 أو Core i3</strong>
                    <span className="text-[10px] text-teal-700">دعم تشفير AES-NI عتادي</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">المنافذ (NICs)</span>
                    <strong className="text-slate-800 block mt-0.5">4× Intel i226-V 2.5GbE</strong>
                    <span className="text-[10px] text-teal-700">ثبات فائق وعدم إسقاط باكتات</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">الذاكرة (RAM)</span>
                    <strong className="text-slate-800 block mt-0.5">8GB إلى 16GB DDR4/DDR5</strong>
                    <span className="text-[10px] text-teal-700">كافية لقواعد Suricata الكاملة</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">التخزين (Storage)</span>
                    <strong className="text-slate-800 block mt-0.5">128GB إلى 256GB NVMe SSD</strong>
                    <span className="text-[10px] text-teal-700">تسجيل الـ Logs والتقارير</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPNSENSE VS FORTIGATE DECISION MATRIX */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 text-xs text-slate-700 leading-relaxed">
                <strong>لماذا OPNsense هو الخيار الذكي لمقر المعادي حالياً؟</strong>
                <p className="mt-1">
                  شراء FortiGate يتطلب دفع تكلفة جهاز مرتفعة (Hardware) بالإضافة إلى اشتراك سنوي إلزامي في حزم FortiGuard (تبلغ 60,000 إلى 120,000 ج.م سنوياً) لتفعيل ميزات الأمان. OPNsense يوفر لك 95% من نفس الوظائف مجاناً ودون أي اشتراكات دورية، وعندما يتوسع المقر لعدة فروع يمكن الترقية بسهولة دون تغيير بنية الشبكة.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                      <th className="p-3 font-bold">الوظيفة / الميزة الأمنية</th>
                      <th className="p-3 font-bold text-teal-800 bg-teal-50/50">OPNsense (الخيار المعتمد)</th>
                      <th className="p-3 font-bold text-slate-600">FortiGate (التجاري)</th>
                      <th className="p-3 font-bold">التأثير على مشاوير</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold">Stateful Packet Inspection</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">✅ ممتاز وقوي جداً</td>
                      <td className="p-3 text-emerald-700 font-bold">✅ ممتاز</td>
                      <td className="p-3 text-slate-500">حماية تامة من هجمات الاختراق</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">عزل الشبكات والـ VLANs (802.1Q)</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">✅ دعم غير محدود</td>
                      <td className="p-3 text-emerald-700 font-bold">✅ دعم كامل</td>
                      <td className="p-3 text-slate-500">عزل الموظفين عن سيرفر Dell R640</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">منع الاختراق (IDS / IPS)</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">✅ Suricata مفتوح المصدر ومحدث</td>
                      <td className="p-3 text-emerald-700 font-bold">✅ FortiGuard IPS</td>
                      <td className="p-3 text-slate-500">فحص الحركة الخبيثة لحظياً</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">الشبكة الخاصة الافتراضية (VPN)</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">✅ WireGuard فائق السرعة + IPsec</td>
                      <td className="p-3 text-emerald-700 font-bold">✅ IPsec + SSL VPN</td>
                      <td className="p-3 text-slate-500">ربط م/ سامح والمهندسين بالمقر عن بُعد</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">الرسوم والاشتراكات السنوية</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">0 جنيه (مجاني للأبد)</td>
                      <td className="p-3 text-rose-600 font-bold">60,000 - 120,000 ج.م سنوياً</td>
                      <td className="p-3 text-emerald-700 font-bold">توفير مالي ضخم يوجّه للتطوير</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">الحاجة إلى رخص تجديد لعمل الجهاز</td>
                      <td className="p-3 text-emerald-700 font-bold bg-teal-50/20">❌ لا يحتاج أي ترخيص</td>
                      <td className="p-3 text-rose-600 font-bold">⚠️ يتوقف التحديث إذا انتهى الاشتراك</td>
                      <td className="p-3 text-slate-500">استمرارية تشغيل 100% دون قلق</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VLANS & ACCESS CONTROL POLICIES */}
          {activeTab === 'vlans' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>قاعدة الأمان الذهبية:</strong>
                «لا يُسمح لأي جهاز كمبيوتر خاص بالموظفين بالوصول المباشر إلى سيرفر Dell R640 أو قواعد البيانات؛ الوصول فقط عبر الإنترنت لواجهات لوحات التحكم المحمية والموثقة».
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* VLAN 10 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">VLAN 10: موظفي المقر (Office Users)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold">192.168.10.0/24</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li><strong className="text-emerald-700">مسموح:</strong> تصفح الإنترنت، Google Play Console، Apple Dev، إيميلات Zoho، وبوابات السحابة.</li>
                    <li><strong className="text-rose-600">ممنوع قطعياً (DENY):</strong> الوصول لمنفذ SSH، أو قاعدة بيانات PostgreSQL، أو إدارة سيرفر Dell R640.</li>
                  </ul>
                </div>

                {/* VLAN 20 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">VLAN 20: السيرفرات والداتا سنتر (Core Servers)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">192.168.20.0/24</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>يحتوي: سيرفر Dell PowerEdge R640 بلاتينيوم، محطة HP Z440، ووحدات الـ Backup.</li>
                    <li>متصل مباشرة بقناة ربط المصرية للاتصالات WE L3VPN وسيرفر القرية الذكية.</li>
                    <li>لا يقبل اتصالات إلا من منافذ موثقة أو من خلال الـ Reverse Proxy و VPN فقط.</li>
                  </ul>
                </div>

                {/* VLAN 30 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">VLAN 30: الإدارة والتحكم (IT / Admin Management)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold">192.168.30.0/24</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>مخصص فقط لحواسيب: م/ سامح ياسين (CTO)، وم/ أحمد عبيد.</li>
                    <li>مسموح بالوصول إلى لوحة OPNsense WebGUI، كونسول سويتش سيسكو، وواجهة Dell iDRAC.</li>
                    <li>محمي بجدار حماية حازم وكلمات مرور معقدة وتوثيق ثنائي 2FA.</li>
                  </ul>
                </div>

                {/* VLAN 40 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">VLAN 40: المراقبة الرقمية (CCTV & NVR)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono font-bold">192.168.40.0/24</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    <li>16 كاميرا مراقبة IP تتغذى بالكهرباء والبيانات عبر منافذ PoE بسويتش سيسكو 3850.</li>
                    <li>معزولة تماماً عن شبكة الإنترنت لمنع اختراق الكاميرات وبثها خارجياً.</li>
                    <li>التسجيل حصري على جهاز NVR الداخلي وهارديسك المراقبة WD Purple.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CISCO 3850 CONFIGURATION CODE */}
          {activeTab === 'cisco_config' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  أوامر سطر الأوامر (Cisco IOS Commands) جاهزة للتطبيق على سويتش Catalyst 3850:
                </span>
                <button
                  onClick={() => handleCopy(ciscoConfigSnippet, 'cisco')}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5"
                >
                  {copiedKey === 'cisco' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cisco' ? 'تم النسخ!' : 'نسخ الأوامر'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 max-h-[360px] text-left" dir="ltr">
                <pre>{ciscoConfigSnippet}</pre>
              </div>
            </div>
          )}

          {/* TAB 5: KAGGLE THE WHITE LION CASE STUDY */}
          {activeTab === 'kaggle_study' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/40 to-white border border-purple-200 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-purple-800 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>دراسة الحالة العلمية 01 لمسابقة كاجل (UCP-LLM The White Lion):</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  كيف يحل بروتوكول UCP و Gemma 4 مسألة اتخاذ القرار المعماري وتوفير تكاليف البنية التحتية ذاتياً؟
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  هذه الحالة الواقعية الخاصة بم/ سامح ياسين ومنظومة مشاوير هي النموذج العملي المثالي (Proof of Concept) لورقة البحث العلمي:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white border border-purple-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-800">التدقيق الذاتي للفواتير (Hardware Ingestion):</strong>
                      <p className="text-slate-500 text-[11px] mt-0.5">قراءة فواتير الشراء المعتمدة (سيرفر Dell R640 بقيمة 54 ألف ج.م وسويتش Cisco 3850 بقيمة 12 ألف ج.م) وبناء الطوبولوجيا بناءً عليها دون فرض افتراضات خيالية.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-purple-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-800">الموازنة الاقتصادية الهندسية (Trade-off Optimization):</strong>
                      <p className="text-slate-500 text-[11px] mt-0.5">المقارنة المعمارية بين حلول FortiGate التجارية المكلفة (60k-120k ج.م اشتراكات) والبدائل مفتوحة المصدر OPNsense على Appliance مستقل، وتوفير الميزانية لتطوير تطبيق 4B.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-purple-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-800">التوليد الآلي لقواعد الأمان والأكواد (Zero-Touch Provisioning):</strong>
                      <p className="text-slate-500 text-[11px] mt-0.5">توليد أكواد سويتش سيسكو وقواعد الـ VLANs تلقائياً لضمان عدم وصول أجهزة الموظفين العادية لقواعد البيانات الحساسة.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HP Z440 MULTI-ROLE DEPLOYMENT & LICENSING GUIDE */}
          {activeTab === 'z440_deployment' && (
            <div className="space-y-5">
              
              {/* Executive Decision Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200 text-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>الرأي الهندسي النهائي: نعم، فكرة ممتازة لتحويل أحد جهازي Z440 إلى «متحكم المقر» (Proxmox Hub):</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  استخدام جهاز HP Z440 لتشغيل (OPNsense + سيستم الكاميرات NVR + مستودع التطبيقات الداخلية) هو قرار فائق الذكاء يوفر شراء أجهزة جديدة، بشرط تنفيذه عبر نظام Proxmox VE.
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  جهاز HP Z440 بمعالج Intel Xeon E5-2697 v4 يمتلك <strong className="text-teal-800 font-bold">18 نواة حقيقية و 36 مسار معالجة</strong> مع كاش ضخم 45MB، وهو في حقيقته خادم كامل في هيئة Workstation قادرة على العمل 24/7 لسنوات.
                </p>
              </div>

              {/* Technical Questions Answered in Depth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Generation & Performance in 2026 */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">1. معالج Xeon E5-2697 v4 يعادل جيل كام؟</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">Broadwell-EP</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    من الناحية المعمارية، معمارية Broadwell-EP تقابل <strong className="text-slate-800">الجيل الخامس/السادس</strong> في معالجات إنتل المكتبية (Core i7).
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1">
                    <strong className="text-teal-800 block">لكن في مهام السيرفرات وتعدد المهام (Multi-threading):</strong>
                    <span>امتلاكه لـ 18 نواة حقيقية و 36 ثريد و 4 قنوات ذاكرة DDR4 ECC يجعله يتفوق في معالجة السيرفرات والافتراضية (Virtualization) على معالجات Core i7 من الجيل العاشر والحادي عشر! إنه بمثابة محرك شاحنة عملاق يتحمل أوزاناً ثقيلة 24 ساعة دون أن يهتز.</span>
                  </div>
                </div>

                {/* 2. Cores & Licensing Explained */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">2. كيف تحسب التراخيص مع الـ 18 كور؟</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">Per-Core Model</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-2">
                    <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <strong className="text-emerald-900 block font-bold">مع الأنظمة مفتوحة المصدر (Proxmox / Linux / OPNsense):</strong>
                      <span className="text-[11px] text-emerald-800">الترخيص = <strong className="font-mono">0 جنيه / 0 دولار</strong> مهما زاد عدد الكور؛ تستغل كامل الـ 18 كور مجاناً دون قيود.</span>
                    </div>

                    <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-200">
                      <strong className="text-rose-900 block font-bold">مع أنظمة مايكروسوفت (Windows Server):</strong>
                      <span className="text-[11px] text-rose-800">تفرض مايكروسوفت شراء رخص بحزم 2-Core بحد أدنى 16 كور، وللـ 18 كور ستحتاج ترخيص 20 كور بتكلفة تتجاوز 1,500$ إلى 2,000$!</span>
                    </div>
                  </div>
                </div>

                {/* 3. The Proxmox Blueprint for Z440 */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">3. كيف نشغل الفايرول والكاميرات معاً؟</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">Proxmox VE Hub</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    OPNsense نظام تشغيل كامل (FreeBSD)، لذا لا يمكنك تثبيت ويندوز معه على نفس القرص مباشرة. الحل الهندسي الصحيح هو تثبيت **Proxmox VE** وتقسيم موارد الـ Z440:
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <li><strong>VM 1: OPNsense Firewall:</strong> (4 كور + 4GB RAM + كارت شبكة مخصص).</li>
                    <li><strong>VM 2: NVR سيستم الكاميرات:</strong> (4 كور + 6GB RAM + هارد تخزين WD Purple).</li>
                    <li><strong>VM 3 / Containers: التطبيقات الداخلية:</strong> (8 كور + 6GB RAM).</li>
                    <li><strong>متبقي:</strong> 2 كور احتياطي لنظام Proxmox الأساسي.</li>
                  </ul>
                </div>

                {/* 4. Critical Hardware Requirement: Network Card */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">4. الشرط العتادي الوحيد في الـ Z440</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono font-bold">Dual/Quad NIC</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    جهاز HP Z440 يأتي بـ <strong className="text-slate-900">منفذ شبكة واحد فقط (Single LAN)</strong>. والـ Firewall يحتاج منفذين على الأقل (WAN لدخول الإنترنت من الراوتر، و LAN للربط مع سويتش سيسكو 3850).
                  </p>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                    <strong className="block font-bold">الحل العملي السريع:</strong>
                    <span>شراء كارت شبكة PCIe إنتل ثنائي أو رباعي المنافذ (Intel i350-T2 أو i350-T4) سعره حوالي 500 إلى 800 جنيه فقط وتركيبه في الـ Z440.</span>
                  </div>
                </div>

              </div>

              {/* 5. Warning: Exchange Server vs Zoho Lite */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 leading-relaxed space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>تنبيه هندسي حاسم بخصوص سيرفر الإيميل (Exchange Server):</span>
                </div>
                <p>
                  لا ننصح إطلاقاً بتركيب Microsoft Exchange Server محلياً في 2026. سيرفر Exchange يحتاج رخصاً باهظة جداً (Windows Server + Exchange Server + CALs لكل مستخدم)، ويستهلك ما لا يقل عن 32GB RAM لوحده، والأخطر أنه مستهدف بأعنف ثغرات الاختراق العالمية (مثل ثغرات ProxyLogon و ProxyShell)، بالإضافة إلى أن إيميلاتك ستدخل في قائمة الـ Spam لأن الـ IP الأرضي سيتغير أو يُصنف كـ Residential.
                </p>
                <p className="font-bold text-teal-900 pt-1">
                  القرار الصحيح 100%: الاستمرار في خطتكم المعتمدة عبر <strong className="text-teal-700">Zoho Lite (5 حسابات رسمية مجانية ومحمية سحابياً من مزود المصرية لتكنولوجيا المعلومات)</strong> مع سجلات MX و SPF المعتمدة دون استهلاك موارد أجهزتكم أو تكبد أي مصاريف ترخيص.
                </p>
              </div>

              {/* 6. Advice on HP Z6 G4 / Z660 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <strong className="text-slate-900 font-bold block text-sm">هل تشتري أجهزة إضافية مثل HP Z6 G4 أو Z660 في المرحلة القادمة؟</strong>
                <p className="text-slate-600 leading-relaxed">
                  نصيحتي لك كشريك تقني حريص على ميزانيتك: <strong className="text-emerald-700 font-bold">«لا تشترِ أي خوادم أو أجهزة إضافية الآن!»</strong>
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                  <div>• سيرفر Dell R640 Platinum = <strong className="text-slate-900">48 نواة معالجة</strong> + 64GB RAM</div>
                  <div>• جهاز HP Z440 الأول = <strong className="text-slate-900">18 نواة معالجة</strong> + 16GB RAM</div>
                  <div>• جهاز HP Z440 الثاني = <strong className="text-slate-900">18 نواة معالجة</strong> + 16GB RAM</div>
                  <div className="pt-1 border-t border-slate-200 font-bold text-teal-800">
                    الإجمالي الحالي في مقر المعادي = 84 نواة سيرفر حقيقية و 96GB ذاكرة عشوائية ECC!
                  </div>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1">
                  هذه القوة الحوسبية تفوق احتياج مقر مشاوير بالكامل بنسبة 300% في مرحلة الإطلاق الحالية؛ لذا احتفظ بالسيولة النقدية للحملات التسويقية، ترخيص النقل الذكي، وتطوير تطبيق 4B.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>جاهز للتطبيق في مقر المعراج بالمعادي بمتابعة م/ سامح وم/ عماد الشرقاوي</span>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onAskHypatia) {
                onAskHypatia('أريد مناقشة تفاصيل شراء جهاز OPNsense المستقل وضبط منافذ سويتش سيسكو 3850 لمقر المعادي.');
              }
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <span>استشر هيباتيا حول الجدار الناري</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
