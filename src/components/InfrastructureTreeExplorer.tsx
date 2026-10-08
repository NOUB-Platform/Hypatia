import React, { useState } from 'react';
import { 
  Server, 
  Network, 
  ShieldCheck, 
  Camera, 
  Wifi, 
  HardDrive, 
  Folder, 
  FolderOpen, 
  Plus, 
  Minus, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { HypatiaIcon } from './HypatiaIcon';

interface TreeItemDef {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'pending' | 'ready';
  driveFolder: string;
  specs: { label: string; value: string }[];
  notes: string;
}

interface TreeCategoryDef {
  id: string;
  title: string;
  icon: any;
  items: TreeItemDef[];
}

interface InfrastructureTreeExplorerProps {
  onAskHypatia?: (prompt: string) => void;
  onOpenFirewallModal?: () => void;
}

export const InfrastructureTreeExplorer: React.FC<InfrastructureTreeExplorerProps> = ({
  onAskHypatia,
  onOpenFirewallModal,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'cat-servers': true,
    'cat-network': false,
    'cat-firewall': false,
    'cat-cctv': false,
    'cat-telecom': false,
  });

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const expandAll = () => {
    const cats: Record<string, boolean> = {};
    const items: Record<string, boolean> = {};
    CATEGORIES.forEach(c => {
      cats[c.id] = true;
      c.items.forEach(i => { items[i.id] = true; });
    });
    setExpandedCategories(cats);
    setExpandedItems(items);
  };

  const collapseAll = () => {
    setExpandedCategories({});
    setExpandedItems({});
  };

  const handleCopyPath = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(id);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const CATEGORIES: TreeCategoryDef[] = [
    {
      id: 'cat-servers',
      title: 'الخوادم ومحطات العمل (Servers & Workstations)',
      icon: Server,
      items: [
        {
          id: 'item-dell-r640',
          title: 'سيرفر DELL PowerEdge R640 بلاتينيوم',
          subtitle: 'الخادم الرئيسي للداتا سنتر المحلي لقواعد البيانات',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/01_SERVERS_DELL_R640_PLATINUM/',
          specs: [
            { label: 'المعالج', value: '2x Intel Xeon Platinum 8160 (48 Cores / 96 Threads)' },
            { label: 'الذاكرة العشوائية', value: '64GB ECC DDR4 Registered' },
            { label: 'وحدات التخزين', value: '2x 256GB SAS SSD (OS) + 3x 1.2TB SAS 10K (Data)' },
            { label: 'الفاتورة المعتمدة', value: '54,000 ج.م قبل الضريبة (مورد ومعتمد بالراك)' },
          ],
          notes: 'مخصص بالكامل لقواعد بيانات PostgreSQL 16 + PostGIS ومحركات 4B وسيرفر الـ Backend والتحليل، محمي من أي مهام ثانوية.'
        },
        {
          id: 'item-hp-z440-1',
          title: 'محطة عمل HP Z440 رقم 1 (Proxmox Hub)',
          subtitle: 'متحكم المقر: الجدار الناري OPNsense + سيستم الكاميرات NVR',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/03_WORKSTATIONS_HP_Z440/',
          specs: [
            { label: 'المعالج', value: 'Intel Xeon E5-2697 v4 (18 Cores / 36 Threads - Broadwell)' },
            { label: 'الذاكرة', value: '16GB ECC DDR4' },
            { label: 'التخزين', value: '256GB SSD + 500GB HDD (يدعم إضافة WD Purple للـ NVR)' },
            { label: 'الدور المقترح', value: 'تثبيت Proxmox VE وتشغيل OPNsense VM + NVR الكاميرات' },
          ],
          notes: 'يمتلك 18 نواة حقيقية، مع إضافة كارت شبكة Intel Dual NIC يصبح جدار حماية ومسجل كاميرات متكامل دون شراء أجهزة جديدة.'
        },
        {
          id: 'item-hp-z440-2',
          title: 'محطة عمل HP Z440 رقم 2 (Engineering Lab)',
          subtitle: 'محطة التطوير المكتبي الهندسي لم/ سامح ياسين (CTO)',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/03_WORKSTATIONS_HP_Z440/',
          specs: [
            { label: 'المعالج', value: 'Intel Xeon E5-2697 v4 (18 Cores / 36 Threads)' },
            { label: 'الذاكرة', value: '16GB DDR4 ECC' },
            { label: 'كارت الشاشة', value: 'NVIDIA Dedicated 1GB' },
            { label: 'الاستخدام', value: 'تطوير وفحص الأكواد، محاكاة النماذج، وأبحاث كاجل والـ UCP' },
          ],
          notes: 'محطة عمل مخصصة لمهام الإدارة الهندسية ومتابعة عمليات الربط والسيرفرات.'
        }
      ]
    },
    {
      id: 'cat-network',
      title: 'شبكة التوزيع وكابينة الراك (Cisco & 27U Perla Rack)',
      icon: Network,
      items: [
        {
          id: 'item-cisco-3850',
          title: 'سويتش سيسكو Cisco Catalyst 3850 PoE+ (48 Port)',
          subtitle: 'نواة توزيع الشبكة وتغذية الكاميرات والـ Wi-Fi بالكهرباء والبيانات',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
          specs: [
            { label: 'المنافذ', value: '48 Port Gigabit PoE+ (WS-C3850-48P-S)' },
            { label: 'مزود الطاقة', value: 'Dual Redundant Power Supplies 715W' },
            { label: 'الـ Uplinks', value: '4x 1G SFP Modules' },
            { label: 'الوظيفة', value: 'توزيع الـ VLANs وتغذية كاميرات المراقبة بالـ PoE' },
          ],
          notes: 'سويتش مؤسسي Layer 3 قوي جداً، تم إعداد أوامر الـ IOS لعزل شبكة الموظفين عن السيرفرات.'
        },
        {
          id: 'item-perla-rack',
          title: 'كابينة راك شبكات بيرلا 27U (عمق 1000 مم)',
          subtitle: 'استضافة خوادم الداتا سنتر، السويتشات، ووحدات الباور المنظم',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
          specs: [
            { label: 'الأبعاد', value: 'Perla 27U - عمق 1000 مم (1 متر) لغرفة السيرفرات' },
            { label: 'الملحقات', value: 'مراوح تبريد سقفية، وحدة باور PDU منظم، وريل كيت للسيرفر' },
            { label: 'الفاتورة', value: 'فاتورة شركة رد لاين المعتمدة' },
          ],
          notes: 'مثبتة داخل غرفة السيرفرات المخصصة بمقر المعراج بالمعادي.'
        },
        {
          id: 'item-patch-panel',
          title: 'باتش بانل 48 بورت وترانكات كوابل Cat6',
          subtitle: 'تنظيم تمديدات كابلات الشبكة من المكاتب إلى كابينة الراك',
          status: 'pending',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
          specs: [
            { label: 'السعة', value: '48 Port Cat6 RJ45 Patch Panel' },
            { label: 'الكابلات', value: 'كابلات Cat6 UTP أصلية لتوصيل المكاتب والكاميرات' },
            { label: 'المسؤول', value: 'م/ أحمد عبيد وحاتم (فني الشبكات)' },
          ],
          notes: 'يتم تأريج وتثبيت الكابلات داخل الترانكات السقفية إلى الباتش بانل مباشرة.'
        }
      ]
    },
    {
      id: 'cat-firewall',
      title: 'الجدار الناري وتوزيع الـ VLANs (OPNsense Security)',
      icon: ShieldCheck,
      items: [
        {
          id: 'item-opnsense-appliance',
          title: 'جهاز الجدار الناري المستقل OPNsense (Hardware Appliance)',
          subtitle: 'حماية المقر، فحص الباكتات، وتطبيق قواعد العزل الصارمة بين الأقسام',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/05_FIREWALL_OPNSENSE_APPLIANCE/',
          specs: [
            { label: 'نظام التشغيل', value: 'OPNsense 24.x (FreeBSD Hardened)' },
            { label: 'الميزات', value: 'Stateful Firewall, Suricata IDS/IPS, WireGuard VPN' },
            { label: 'المنافذ', value: 'منفذ WAN للإنترنت + منفذ LAN Trunk لسويتش سيسكو' },
            { label: 'التكلفة السنوية', value: '0 جنيه (يوفر 80k-120k ج.م مقارنة بـ FortiGate)' },
          ],
          notes: 'يمكن تشغيله إما على جهاز مخصص أو عبر Proxmox على أحد جهازي Z440 مع كارت شبكة ثنائي.'
        },
        {
          id: 'item-vlans-segmentation',
          title: 'هيكل تقسيم الشبكات الافتراضية (Zero-Trust VLANs)',
          subtitle: 'عزل الموظفين عن السيرفرات والكاميرات',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/05_FIREWALL_OPNSENSE_APPLIANCE/',
          specs: [
            { label: 'VLAN 10', value: 'الموظفين (192.168.10.0/24) - إنترنت فقط، ممنوع دخول السيرفرات' },
            { label: 'VLAN 20', value: 'السيرفرات (192.168.20.0/24) - Dell R640 و Z440 وقواعد البيانات' },
            { label: 'VLAN 30', value: 'الإدارة (192.168.30.0/24) - م/ سامح وأحمد عبيد للتحكم' },
            { label: 'VLAN 40', value: 'الكاميرات (192.168.40.0/24) - معزولة عن النت والتسجيل داخلي' },
          ],
          notes: 'تم توليد وتجهيز أكواد Cisco 3850 المقابلة لتفعيل هذه الـ VLANs.'
        }
      ]
    },
    {
      id: 'cat-cctv',
      title: 'شبكة المراقبة الرقمية (16 كاميرا مراقبة IP)',
      icon: Camera,
      items: [
        {
          id: 'item-cctv-cameras',
          title: 'منظومة 16 كاميرا مراقبة بدقة 5MP',
          subtitle: 'تغطية المداخل، المكاتب الإدارية، وغرفة الـ IT على مدار الساعة',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/04_CCTV_CAMERAS_16_IP/',
          specs: [
            { label: 'العدد والنوع', value: '16x IP Cameras 5MP (Dome / Bullet)' },
            { label: 'التغذية', value: 'PoE مباشر من سويتش سيسكو 3850' },
            { label: 'جهاز التسجيل', value: 'NVR 16 Channel مع هارديسك مراقبة WD Purple' },
            { label: 'المورد', value: 'شركة الأصدقاء للأنظمة الأمنية' },
          ],
          notes: 'الكاميرات معزولة على VLAN 40 لمنع أي اختراق عبر الإنترنت، والتسجيل محلي مؤمن.'
        }
      ]
    },
    {
      id: 'cat-telecom',
      title: 'خطوط ربط المصرية للاتصالات WE (L3VPN & Fiber)',
      icon: Wifi,
      items: [
        {
          id: 'item-we-vpn-contract',
          title: 'عرض وأمر شراء خط الربط L3VPN (360 ألف ج.م)',
          subtitle: 'تأمين خطوط الربط المشفرة لتطبيق 4B وربط المقر بالداتا سنتر السيادي',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
          specs: [
            { label: 'القيمة', value: '360,000 ج.م سنوياً (عرض رسمي معتمد)' },
            { label: 'السرعات', value: 'خط تجميع فايبر 24Mbps + 6 خطوط فرعية 4Mbps' },
            { label: 'المسؤول', value: 'م/ أحمد غريب وم/ أحمد محرم (شركة WE)' },
          ],
          notes: 'خط الربط الإلزامي لتشغيل تطبيق 4B والربط مع وزارة النقل LTRA.'
        },
        {
          id: 'item-we-smart-village',
          title: 'سيرفر 4B السحابي وجدار الحماية F5 WAF بالقرية الذكية',
          subtitle: 'الاستضافة السحابية الإنتاجية لتطبيق فور بي داخل مصر (807 ألف ج.م)',
          status: 'ready',
          driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
          specs: [
            { label: 'البيئة', value: 'داتا سنتر المصرية للاتصالات بالقرية الذكية' },
            { label: 'الحماية', value: 'F5 WAF ضد هجمات DDoS والـ Web Attacks' },
            { label: 'الخوادم', value: '3 خوادم افتراضية (App, DB, Cache) مع نسخ يومي' },
          ],
          notes: 'البيئة السحابية السيادية لضمان بقاء بيانات رحلات المواطنين داخل جمهورية مصر العربية.'
        }
      ]
    }
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden text-right select-none text-slate-800">
      
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-teal-50/20 to-white flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                متصفح شجرة العتاد والشبكات (Hardware Tree Explorer)
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                نظام + / -
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              تصفح عتاد مقر المعادي كشجرة متدرجة؛ اضغط (+) لعرض التفاصيل والمواصفات ومسارات Drive دون ازدحام نصوص
            </p>
          </div>
        </div>

        {/* Global Expand / Collapse + Firewall Button */}
        <div className="flex items-center gap-2">
          {onOpenFirewallModal && (
            <button
              onClick={onOpenFirewallModal}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200 shadow-xs"
              title="عرض الاستشارة المعمارية للفايرول"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>استشارة الفايرول</span>
            </button>
          )}

          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
            title="توسيع كافة الفروع"
          >
            <Plus className="w-3.5 h-3.5 text-teal-600" />
            <span>توسيع الكل</span>
          </button>

          <button
            onClick={collapseAll}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
            title="طي كافة الفروع"
          >
            <Minus className="w-3.5 h-3.5 text-slate-500" />
            <span>طي الكل</span>
          </button>
        </div>
      </div>

      {/* Main Tree Container */}
      <div className="p-3 sm:p-5 space-y-3 bg-slate-50/30">
        {CATEGORIES.map((cat) => {
          const isCatExpanded = Boolean(expandedCategories[cat.id]);
          const Icon = cat.icon;

          return (
            <div 
              key={cat.id} 
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition"
            >
              {/* Category Folder Row */}
              <div
                onClick={() => toggleCategory(cat.id)}
                className="p-3 sm:p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2.5">
                  {/* Category Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(cat.id);
                    }}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs transition ${
                      isCatExpanded 
                        ? 'bg-teal-700 text-white border-teal-700' 
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isCatExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200/80">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {cat.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                    {cat.items.length} قطع
                  </span>
                  {isCatExpanded ? (
                    <FolderOpen className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Folder className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Sub-items (Devices / Lines) */}
              {isCatExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-2 sm:p-3 space-y-2">
                  {cat.items.map((item) => {
                    const isItemExpanded = Boolean(expandedItems[item.id]);

                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl border transition-all ${
                          isItemExpanded
                            ? 'bg-white border-teal-400/80 shadow-xs'
                            : 'bg-white border-slate-200/90 hover:border-slate-300'
                        }`}
                      >
                        {/* Device Row Header */}
                        <div
                          onClick={() => toggleItem(item.id)}
                          className="p-2.5 sm:p-3 flex items-center justify-between gap-2.5 cursor-pointer select-none hover:bg-slate-50/80 transition"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Device Sub-item Toggle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(item.id);
                              }}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                                isItemExpanded
                                  ? 'bg-teal-600 text-white border-teal-600'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                              }`}
                            >
                              {isItemExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            </button>

                            <div className="truncate">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {item.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>

                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shrink-0">
                            مورد ومعتمد
                          </span>
                        </div>

                        {/* Expanded Technical Drawer (Progressive Disclosure) */}
                        {isItemExpanded && (
                          <div className="p-3 pt-1 border-t border-slate-100 bg-slate-50/60 space-y-3 text-xs animate-in fade-in duration-100">
                            
                            {/* Technical Specs Table Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {item.specs.map((spec, sidx) => (
                                <div key={sidx} className="p-2 rounded-xl bg-white border border-slate-200/80">
                                  <span className="text-[10px] text-slate-400 block font-bold">{spec.label}</span>
                                  <strong className="text-slate-800 text-[11px] block mt-0.5 font-mono">{spec.value}</strong>
                                </div>
                              ))}
                            </div>

                            {/* Operational Notes */}
                            <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-600 leading-relaxed text-[11px]">
                              {item.notes}
                            </div>

                            {/* Action Bar (Icons without redundant captions) */}
                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap">
                              {/* Drive Path with Copy Button */}
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono truncate max-w-sm">
                                <span className="text-slate-400">Drive:</span>
                                <span className="truncate">{item.driveFolder}</span>
                                <button
                                  onClick={() => handleCopyPath(item.driveFolder, item.id)}
                                  className="p-1 rounded hover:bg-slate-200 text-slate-500 transition shrink-0"
                                  title="نسخ مسار المجلد على Drive"
                                >
                                  {copiedPath === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              {/* Hypatia Consultation Button with Hypatia Classical Icon */}
                              {onAskHypatia && (
                                <button
                                  onClick={() => onAskHypatia(`أريد استشارة ومواصفات قطعة العتاد: ${item.title} لمقر المعادي`)}
                                  className="p-1.5 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs transition flex items-center gap-1.5 border border-teal-200"
                                  title="استشارة هيباتيا حول هذه القطعة"
                                >
                                  <HypatiaIcon className="w-4 h-4 text-teal-700" />
                                  <span>استشر هيباتيا</span>
                                </button>
                              )}
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
export default InfrastructureTreeExplorer;
