import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Smartphone, 
  Truck, 
  Users, 
  Receipt, 
  Brain, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Server, 
  Network, 
  ShieldCheck, 
  DollarSign, 
  HardDrive, 
  Plus, 
  Check, 
  CheckSquare,
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Camera,
  Filter,
  Layers,
  Cpu,
  PackageCheck,
  FileCode2,
  Lock,
  Zap,
  Info,
  Database,
  Maximize2,
  Flame,
  Thermometer,
  Radio,
  Activity,
  Download
} from 'lucide-react';
import { ProjectItem } from '../types';
import { ZWorkstationAndCoresModal } from './ZWorkstationAndCoresModal';
import { DeviceDetailModal, DeviceDetailItem } from './DeviceDetailModal';
import { ServerRackGraphicModal } from './ServerRackGraphicModal';

interface HomeTabProps {
  activeProject: ProjectItem;
  pendingInquiriesCount: number;
  totalInquiriesCount: number;
  onOpenInquiries: () => void;
  onNavigateToTab: (tab: any) => void;
  onAskHypatia: (prompt: string) => void;
  onOpenContacts: () => void;
  onOpenCredentials: () => void;
  onOpenProjectSource?: () => void;
  onOpenFirewallModal?: () => void;
  onOpenMasterRoadmap?: (personFilter?: string) => void;
  onOpenTeamSimulation?: () => void;
  onOpenWorkflows?: () => void;
  onOpenServerRack?: () => void;
}

interface CalendarEventItem {
  id: string;
  title: string;
  category: 'mashweer' | '4b' | 'telecom' | 'infra' | 'kaggle' | 'finance';
  assignedPerson: string;
  targetDate: string; // YYYY-MM-DD
  status: 'completed' | 'ongoing' | 'critical_deadline';
  notes: string;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  activeProject,
  pendingInquiriesCount,
  totalInquiriesCount,
  onOpenInquiries,
  onNavigateToTab,
  onAskHypatia,
  onOpenContacts,
  onOpenCredentials,
  onOpenProjectSource,
  onOpenFirewallModal,
  onOpenMasterRoadmap,
  onOpenTeamSimulation,
  onOpenWorkflows,
  onOpenServerRack,
}) => {
  // 1. Live Dynamic Date & Clock
  const today = useMemo(() => new Date(), []);
  const todayFormatted = useMemo(() => {
    return today.toLocaleDateString('ar-EG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, [today]);

  // 2. Interactive Calendar Events (Dynamic Timeline from Real Life)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventItem[]>([
    {
      id: 'cal-1',
      title: 'جلسة العمل المباشرة: اعتماد بنية أودو وتأكيد عروض المصرية للاتصالات WE VPN',
      category: 'telecom',
      assignedPerson: 'م/ سامح ياسين',
      targetDate: '2026-09-29',
      status: 'completed',
      notes: 'تمت بنجاح: تخصيص الشاشات بنمط أودو الفاتح، اعتماد خط 24Mbps وعرض 360 ألف ج.م'
    },
    {
      id: 'cal-2',
      title: 'تثبيت سويتش سيسكو 3850 وسيرفر Dell R640 في راك المعادي 27U',
      category: 'infra',
      assignedPerson: 'م/ أحمد عبيد وم/ عماد الشرقاوي',
      targetDate: '2026-10-02',
      status: 'ongoing',
      notes: 'تنظيم كابلات Cat6 مع حاتم الفني وتوصيل الباور المزدوج 715W'
    },
    {
      id: 'cal-3',
      title: 'استكمال إعدادات استضافة 4B بداتا سنتر WE القرية الذكية',
      category: 'telecom',
      assignedPerson: 'م/ أحمد محرم وم/ أحمد غريب',
      targetDate: '2026-10-06',
      status: 'ongoing',
      notes: 'تأكيد جاهزية بيئة Ubuntu 22.04 و PostgreSQL 16 + PostGIS'
    },
    {
      id: 'cal-4',
      title: 'تسليم المرحلة 2 من تطبيق 4B (التسعير الديناميكي وباقات الكباتن) من قيمة تك',
      category: '4b',
      assignedPerson: 'شركة قيمة تك (Qeema Tech)',
      targetDate: '2026-10-10',
      status: 'ongoing',
      notes: 'المحطة 2 من خطة الـ 7 أسابيع المستلمة من المطور'
    },
    {
      id: 'cal-5',
      title: 'تسليم اختبارات التكامل الشاملة UAT لتطبيق 4B وحسم النسخة الإنتاجية',
      category: '4b',
      assignedPerson: 'فريق الـ QA وقيمة تك',
      targetDate: '2026-10-15',
      status: 'ongoing',
      notes: 'المحطة الخامسة والأخيرة قبل الطرح الرسمي على المتاجر'
    },
    {
      id: 'cal-6',
      title: 'الموعد النهائي لتقديم ورقة The White Lion ومسابقة كاجل UCP-LLM ($100k)',
      category: 'kaggle',
      assignedPerson: 'م/ سامح ياسين',
      targetDate: '2026-10-17',
      status: 'critical_deadline',
      notes: 'مسار Paper Track وخوارزميات الذكاء الاصطناعي التوليدي'
    }
  ]);

  const [calendarFilter, setCalendarFilter] = useState<'all' | 'completed' | 'ongoing' | 'critical_deadline'>('all');
  const [selectedPersonFilter, setSelectedPersonFilter] = useState<string>('all');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showZWorkstationModal, setShowZWorkstationModal] = useState(false);
  const [showServerRackModal, setShowServerRackModal] = useState(false);
  const [selectedDeviceDetail, setSelectedDeviceDetail] = useState<DeviceDetailItem | null>(null);

  const handleOpenRack = () => {
    if (onOpenServerRack) {
      onOpenServerRack();
    } else {
      setShowServerRackModal(true);
    }
  };

  // Primary Hardware Devices ("الحاجة من جوه الحاجة" - Minimal label, click reveals complete technical depth)
  const primaryDevices: DeviceDetailItem[] = [
    {
      id: 'dev-cisco-3850',
      name: 'سويتش سيسكو 48 بورت PoE',
      shortBadge: '48-Port PoE+ Layer 3',
      subtitle: 'Cisco Catalyst 3850 • Dual PSU 715W',
      hint: 'السويتش المؤسسي Layer 3 لتوزيع خطوط الإنترنت وتغذية كاميرات المراقبة بالكهرباء والبيانات.',
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
      invoiceInfo: 'فاتورة QTS الرسمية (11,970 ج.م)',
      category: 'network',
      status: 'مورد ومعتمد بالراك',
      location: 'كابينة الراك 27U بغرفة السيرفرات',
      specs: [
        '48 منفذ Gigabit إيثرنت تدعم PoE+',
        'باور سبلاي مزدوج 715W لضمان استمرارية التشغيل',
        'توجيه طبقة ثالثة Layer 3 وعزل VLANs متقدم',
        'سعة تحويل عالية لنقل بث الكاميرات والبيانات'
      ]
    },
    {
      id: 'dev-dell-r640',
      name: 'سيرفر DELL PowerEdge R640',
      shortBadge: '2x Xeon Platinum (48 Cores)',
      subtitle: 'DELL PowerEdge R640 Platinum • 64GB RAM',
      hint: 'السيرفر الإنتاجي المركزي للبنية التحتية المحلية للشركة وقواعد البيانات والنسخ الاحتياطي.',
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/01_DELL_POWEREDGE_R640_SERVER/',
      invoiceInfo: 'فاتورة QTS الرسمية (96,295 ج.م)',
      category: 'server',
      status: 'تم التوريد والمعاينة',
      location: 'كابينة راك بيرلا 27U (غرفة السيرفرات)',
      specs: [
        '2 معالج Intel Xeon Platinum 8160 (48 Cores)',
        'ذاكرة 64GB DDR4 ECC قابلة للزيادة لـ 128GB',
        'وحدات تخزين NVMe فائقة السرعة مع مصفوفة RAID',
        'إدارة ريموت iDRAC9 Enterprise للتحكم عن بعد'
      ]
    },
    {
      id: 'dev-z-workstation',
      name: 'محطة عمل Z (سيرفر المستودع الداخلي)',
      shortBadge: '16 Cores Xeon • 0$ Licensing',
      subtitle: 'HP/Dell Workstation Z • مستودع التطبيقات & OPNsense & NVR',
      hint: 'خادم محلي ومستودع للتطبيقات الداخلية وحاضنة لجدار OPNsense الناري وتسجيل الكاميرات بتكلفة تراخيص 0$.',
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/03_WORKSTATIONS_AND_STAFF_FLEET/',
      invoiceInfo: 'فاتورة QTS (ضمن أمر التوريد المعتمد)',
      category: 'workstation',
      status: 'معتمد للتشغيل كسيرفر مستودع',
      location: 'غرفة الـ IT ومكتب CTO (مكتب 5)',
      specs: [
        'معالج Intel Xeon فئة Enterprise (16 Cores / 32 Threads)',
        'نظام Proxmox VE الافتراضي بدون أي تراخيص مدفوعة',
        'ماكينة افتراضية لجدار OPNsense الناري وفصل الـ VLANs',
        'ماكينة افتراضية لتسجيل كاميرات المراقبة NVR',
        'حاويات Docker لمستودع التطبيقات والـ Staging الداخلي'
      ]
    },
    {
      id: 'dev-cctv-16',
      name: 'منظومة المراقبة (16 كاميرا IP)',
      shortBadge: '16x IP Cameras 5MP (4 Audio)',
      subtitle: '16 IP Dome/Bullet Cameras + NVR 16ch',
      hint: 'المنظومة الأمنية والمراقبة الرقمية على مدار الساعة مع تسجيل صوتي بالمكاتب الحساسة وتخزين آمن.',
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/04_CCTV_CAMERAS_16_IP/',
      invoiceInfo: 'أمر توريد شركة الأصدقاء للأنظمة الأمنية',
      category: 'cctv',
      status: 'معاينة وتوريد معتمد',
      location: 'مكاتب المقر، المداخل، وغرفة السيرفرات',
      specs: [
        '16 كاميرا مراقبة بدقة 5 ميجابكسل فائقة الوضوح',
        '4 كاميرات مدعمة بميكروفون مدمج لتسجيل الصوت',
        'جهاز تسجيل شبكي NVR 16 قناة بتسجيل حلقي',
        'قرص صلب مخصص للمراقبة WD Purple 4TB'
      ]
    },
    {
      id: 'dev-we-vpn',
      name: 'خط التجميع الفايبر و WE VPN',
      shortBadge: '24 Mbps Aggregated Fiber',
      subtitle: 'شبكة L3VPN المؤمنة مع سنترال المعادي ووزارة النقل',
      hint: 'الشبكة الافتراضية الخاصة المؤمنة لربط المقر بتطبيق 4B وداتا سنتر WE ووزارة النقل LTRA.',
      driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
      invoiceInfo: 'عرض وأمر شراء المصرية للاتصالات (360 ألف ج.م)',
      category: 'telecom',
      status: 'عرض رسمي معتمد للإطلاق',
      location: 'سنترال المعادي ↔ مقر المعادي ↔ القرية الذكية',
      specs: [
        'خط تجميع فايبر مركزي 24Mbps لمقر المعادي',
        '6 خطوط ربط L3VPN فرعية بالمحافظات (4Mbps)',
        'تأمين مشفر مع خوادم تطبيق 4B بداتا سنتر القرية الذكية',
        'جاهزية الربط المباشر مع جهاز تنظيم النقل البري LTRA'
      ]
    },
    {
      id: 'dev-perla-27u',
      name: 'كابينة الراك بيرلا 27U أرضي',
      shortBadge: '27U Depth 1000mm • Heavy Duty',
      subtitle: 'Perla 27U Server Rack Cabinet • PDU 8 Ports',
      hint: 'كابينة الراك الكبرى لغرفة السيرفرات بعمق 1 متر لاستيعاب سيرفر DELL R640 وجميع السويتشات.',
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
      invoiceInfo: 'فاتورة رد لاين RedLine (38,600 ج.م)',
      category: 'network',
      status: 'مركبة بغرفة السيرفرات',
      location: 'غرفة السيرفرات المستقلة بالمقر',
      specs: [
        'أبعاد قياسية 600×1000 مم عمق سيرفري كامل',
        'مراوح تهوية سقفية منظمة لخفض درجات الحرارة',
        'وحدة PDU سيرفرية 8 منافذ لتوزيع التيار المنظم',
        'أبواب زجاجية مصفحة مع قفل أمان'
      ]
    }
  ];

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-10-05');
  const [newEventPerson, setNewEventPerson] = useState('م/ سامح ياسين');
  const [newEventStatus, setNewEventStatus] = useState<'completed' | 'ongoing' | 'critical_deadline'>('ongoing');

  // Toggle Event Status (Completed <-> Ongoing)
  const handleToggleEvent = (id: string) => {
    setCalendarEvents(prev => prev.map(ev => {
      if (ev.id === id) {
        const nextStatus = ev.status === 'completed' ? 'ongoing' : 'completed';
        return { ...ev, status: nextStatus };
      }
      return ev;
    }));
  };

  const handleAddNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const newEv: CalendarEventItem = {
      id: `cal-${Date.now()}`,
      title: newEventTitle.trim(),
      category: 'mashweer',
      assignedPerson: newEventPerson,
      targetDate: newEventDate,
      status: newEventStatus,
      notes: 'تمت إضافتها حديثاً من جدول الأعمال التفاعلي'
    };
    setCalendarEvents(prev => [newEv, ...prev]);
    setShowAddEventModal(false);
    setNewEventTitle('');
  };

  // Filtered Calendar Events
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(ev => {
      const matchStatus = calendarFilter === 'all' || ev.status === calendarFilter;
      const matchPerson = selectedPersonFilter === 'all' || ev.assignedPerson.includes(selectedPersonFilter);
      return matchStatus && matchPerson;
    });
  }, [calendarEvents, calendarFilter, selectedPersonFilter]);

  // People Connected to Sameh & Emad Metrics (Rule: Eng. Emad is always mentioned first when with Eng. Sameh)
  const teamMembers = useMemo(() => [
    {
      id: 'emad',
      name: 'المهندس عماد الشرقاوي',
      role: 'استشاري تقني أول ومسؤول السيرفرات والإنشاءات',
      badge: 'الاستشاري الهندسي',
      tasksCount: 14,
      completedCount: 10,
      ongoingCount: 4,
      criticalTask: 'الإشراف على راك 27U وتوزيع الكاميرات وتنسيق فايبر WE',
      color: 'emerald',
      filterKey: 'emad'
    },
    {
      id: 'sameh',
      name: 'المهندس سامح ياسين',
      role: 'رئيس قطاع التكنولوجيا (CTO) ومسؤول المنظومة البرمجية',
      badge: 'القيادة التقنية',
      tasksCount: 18,
      completedCount: 14,
      ongoingCount: 4,
      criticalTask: 'المسار العلمي لكاجل (17 أكتوبر) ومتابعة سورس كود 4B وقيمة تك',
      color: 'blue',
      filterKey: 'sameh'
    },
    {
      id: 'mowaffaq_amr',
      name: 'أ/ موفق و أ/ عمرو',
      role: 'مديرو العمليات الميدانية وإدارة أساطيل الكباتن',
      badge: 'كفاءة 99% في الميدان',
      tasksCount: 10,
      completedCount: 8,
      ongoingCount: 2,
      criticalTask: 'اختبارات تطبيق 4B APK مع كباتن حقيقيين وتشغيل صالة المعادي',
      color: 'amber',
      filterKey: 'mowaffaq'
    },
    {
      id: 'support_team',
      name: 'طاقم خدمة العملاء والدعم الفني',
      role: 'فريق كول سنتر المعادي (5 موظفين بنظام الورديات)',
      badge: 'كفاءة تفوق 90%',
      tasksCount: 6,
      completedCount: 4,
      ongoingCount: 2,
      criticalTask: 'استقبال بلاغات الركاب واستغاثات SOS وبدء تشغيل أجهزة OptiPlex',
      color: 'teal',
      filterKey: 'support'
    },
    {
      id: 'obeid',
      name: 'المهندس أحمد عبيد',
      role: 'مهندس IT ومساعد ميداني تنفيذي',
      badge: 'سريع الحركة والاستجابة',
      tasksCount: 8,
      completedCount: 5,
      ongoingCount: 3,
      criticalTask: 'المساعدة في تركيبات الراك والشبكة والالتحاق بالكورسات التخصصية',
      color: 'indigo',
      filterKey: 'emad'
    },
    {
      id: 'hatem',
      name: 'حاتم الفني',
      role: 'فني تمديدات شبكات وبنية سلكية',
      badge: 'ميداني بالاستدعاء',
      tasksCount: 6,
      completedCount: 4,
      ongoingCount: 2,
      criticalTask: 'إنهاء كابلات السقف المعلق وتأريج نقاط الشبكة الـ 17 بالصالة',
      color: 'amber',
      filterKey: 'emad'
    }
  ], []);

  // 3. The 6 Odoo-Style Primary Applications
  const odooApps = [
    {
      id: 'app-core-infra',
      title: 'منظومة مشاوير والـ IT',
      subtitle: 'Mashweer Core & Infra',
      description: 'مركز العمليات، سيرفر DELL R640 بلاتينيوم، كابينة راك 27U، سويتش سيسكو، وخطوط الربط الفايبر WE (24 Mbps)',
      icon: Network,
      tag: 'البنية المركزية',
      kpis: [
        { label: 'سيرفر ديل', value: 'R640 معتمد', status: 'done' },
        { label: 'خط ربط WE VPN', value: '360 ألف ج.م', status: 'done' },
        { label: 'راك بيرلا', value: '27U راكب', status: 'done' },
      ],
      targetTab: 'neural_graph',
      color: 'teal'
    },
    {
      id: 'app-4b-passenger',
      title: 'تطبيق فور بي (4B)',
      subtitle: 'Passenger Mobility App',
      description: 'تطبيق الركاب والرحلات، خطة الـ 7 أسابيع مع قيمة تك، فحص الأكواد، ملفات APK، وسيرفر داتا سنتر القرية الذكية',
      icon: Smartphone,
      tag: 'تطبيق الركاب',
      kpis: [
        { label: 'إصدار APK', value: 'v1.4.2 جاهز', status: 'done' },
        { label: 'مراحل قيمة تك', value: '5 محطات تسليم', status: 'pending' },
        { label: 'سحابة WE', value: 'F5 WAF جاهز', status: 'done' },
      ],
      targetTab: 'contracts',
      color: 'sky'
    },
    {
      id: 'app-wekala-agency',
      title: 'منظومة وكالة (WeKaLa)',
      subtitle: 'Agency & Fleet Systems',
      description: 'إدارة أساطيل المكاتب بالمحافظات، كود فلاتر، العمولات الأسبوعية، ونظام توثيق المركبات ومستندات السائقين',
      icon: Users,
      tag: 'الوكلاء والأساطيل',
      kpis: [
        { label: 'سورس كود', value: 'Flutter Code', status: 'pending' },
        { label: 'نظام العمولات', value: 'جداول Supabase', status: 'done' },
        { label: 'التوثيق', value: 'شهادات المركبات', status: 'pending' },
      ],
      targetTab: 'projects',
      color: 'indigo'
    },
    {
      id: 'app-daro-cargo',
      title: 'منصة دارو (Daro)',
      subtitle: 'Cargo Logistics Hub',
      description: 'شحن الطرود والبضائع بين المحافظات، البوالص الإلكترونية، ماسح الباركود، ومسارات الشاحنات ومحطات التوزيع',
      icon: Truck,
      tag: 'الشحن والطرود',
      kpis: [
        { label: 'تتبع الشحنات', value: 'Barcode Scan', status: 'pending' },
        { label: 'محطات التوزيع', value: 'جداول Hubs', status: 'done' },
        { label: 'البوالص', value: 'إلكترونية فورية', status: 'pending' },
      ],
      targetTab: 'projects',
      color: 'purple'
    },
    {
      id: 'app-maadi-ops',
      title: 'المقر والمالية والعمليات',
      subtitle: 'Maadi HQ & Finance',
      description: 'سجل الفواتير الضريبية ETA، أوامر التوريد، المخطط المعماري (26م × 21م)، شبكة 16 كاميرا مراقبة IP، واشتراكات المقر',
      icon: Receipt,
      tag: 'الماليات والمقر',
      kpis: [
        { label: 'فواتير معتمدة', value: 'ETA رسمية', status: 'done' },
        { label: 'كاميرات المراقبة', value: '16 IP Camera', status: 'done' },
        { label: 'المخطط الهندسي', value: '26م × 21م', status: 'done' },
      ],
      targetTab: 'quotations',
      color: 'amber'
    },
    {
      id: 'app-ai-kaggle',
      title: 'البروتوكول الذكي وكاجل',
      subtitle: 'UCP-LLM & AI Protocol',
      description: 'المسار العلمي والورقة البحثية The White Lion (موعد 17 أكتوبر)، بروتوكول UCP-LLM ($100k)، مساعد هيباتيا ومحرك Gemma 4 للأساطيل',
      icon: Brain,
      tag: 'الأبحاث والذكاء',
      kpis: [
        { label: 'موعد كاجل', value: '17 أكتوبر 2026', status: 'critical' },
        { label: 'بروتوكول UCP', value: 'جاهز للنشر', status: 'done' },
        { label: 'مساعد هيباتيا', value: 'جاهز للعمليات', status: 'done' },
      ],
      targetTab: 'master_ledger',
      color: 'rose'
    }
  ];

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-150 select-none text-slate-800">
      
      {/* 1. TOP EXECUTIVE BANNER: Real Live Date & Dynamic Odoo Cockpit */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              {todayFormatted}
            </span>
            <span className="text-xs font-bold text-slate-500">
              • لوحة تشغيل منظومة مشاوير للمنصات الرقمية
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
            بوابة العمليات والأنظمة (Enterprise Odoo Cockpit)
          </h1>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            الوصول المباشر إلى التطبيقات الستة المستقلة، العتاد، الفواتير، خطوط ربط المصرية للاتصالات WE، وجدول الأعمال التفاعلي المربوط بالتواريخ الحقيقية ومسؤوليات المهندسين.
          </p>
        </div>

        {/* Quick Actions & Status Summary */}
        <div className="flex items-center gap-2 flex-wrap shrink-0 z-10">
          
          {/* 135 Master Roadmaps Board Button */}
          {onOpenMasterRoadmap && (
            <button
              onClick={() => onOpenMasterRoadmap()}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition flex items-center gap-2 shadow-md shadow-teal-700/20 active:scale-95 ring-2 ring-emerald-400/30"
              title="لوحة المهام والمحاور الـ 135 التفاعلية بنمط كروت الألعاب"
            >
              <CheckSquare className="w-4 h-4 text-emerald-200" />
              <span>لوحة الـ 135 مهمة التفاعلية</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold">
                135 محور
              </span>
            </button>
          )}

          {/* Team Simulation & Decision Capabilities Button */}
          {onOpenTeamSimulation && (
            <button
              onClick={onOpenTeamSimulation}
              className="px-3.5 py-2 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold transition flex items-center gap-1.5 border border-teal-300 shadow-xs active:scale-95"
              title="محاكاة فريق العمل وأصحاب القرار ومحرك توجيه المشكلات"
            >
              <Users className="w-3.5 h-3.5 text-teal-700" />
              <span>محاكاة الفريق وحل المشاكل</span>
            </button>
          )}

          {/* Architectural Workflows & Flowcharts Button */}
          {onOpenWorkflows && (
            <button
              onClick={onOpenWorkflows}
              className="px-3.5 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-950 text-xs font-bold transition flex items-center gap-1.5 border border-blue-200 shadow-xs active:scale-95"
              title="المخططات الهندسية ودورة عمل 4B وبنية WE ومشتريات المقر"
            >
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              <span>المخططات ودورات العمل</span>
            </button>
          )}

          {/* Supabase & GitHub Quick Link Button */}
          <button
            onClick={() => onNavigateToTab('database')}
            className="px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 shadow-xs active:scale-95"
            title="بوابة ربط سوبابيز وجيت هاب والمزامنة السحابية"
          >
            <Database className="w-3.5 h-3.5 text-teal-700" />
            <span>سوبابيز وجيت هاب</span>
          </button>

          {/* Server Rack 27U Quick Button */}
          <button
            onClick={handleOpenRack}
            className="px-3.5 py-2 rounded-2xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 text-xs font-bold transition flex items-center gap-1.5 border border-cyan-500/40 shadow-xs active:scale-95"
            title="فتح صفحة جرافيك كابينة الراك 27U ومحتوياته"
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>الراك (27U)</span>
          </button>

          {/* Download Standalone Single-File HTML */}
          <a
            href="/api/system/download-standalone-html"
            download="hypatia_mashweer_standalone.html"
            className="px-3.5 py-2 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
            title="تحميل المنظومة بالكامل كملف HTML واحد مستقل يعمل على أي متصفح بدون خوادم أو Node.js"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل نسخة HTML مستقلة</span>
          </a>

          {/* Z Workstation & Cores Licensing Button */}
          <button
            onClick={() => setShowZWorkstationModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition flex items-center gap-1.5 border border-indigo-200/90 shadow-xs active:scale-95"
            title="سيرفر محطة Z ودراسة الكور والتراخيص"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>سيرفر الـ Z</span>
          </button>

          {onOpenFirewallModal && (
            <button
              onClick={onOpenFirewallModal}
              className="px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center gap-1.5 border border-emerald-200/90 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>الجدار الناري</span>
            </button>
          )}

          <button
            onClick={() => onNavigateToTab('agenda')}
            className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>الأجندة</span>
          </button>
        </div>
      </div>

      {/* TODAY 4/10/2026 EXECUTIVE REAL-TIME UPDATE ALERT (تحديثات اليوم التاريخية الحصرية) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white border border-teal-500/30 shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-teal-300" />
            <h3 className="text-xs sm:text-sm font-black text-white">
              إنجازات وتحديثات اليوم 4/10/2026 (متابعة حية للملفات العالقة)
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30">
            تاريخ اليوم: 4 أكتوبر 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Milestone 1: D-U-N-S Number */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-teal-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ملف رقم D-U-N-S (جوجل بلاي وأبل ستور)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">
                استكمال وإرسال اليوم ✓
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              كنا متأخرين سابقاً في استكمال الأوراق، لكن اليوم 4/10 تم استكمال كافة المستندات وإرسالها للشركة المسجلة. إفادة الشركة تؤكد استلام الرقم خلال أسبوع لتقديمه لفتح حسابات المطورين المؤسسية.
            </p>
          </div>

          {/* Milestone 2: WE Server & L3VPN Contracts */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>عقود المصرية للاتصالات WE (السيرفر وخطوط الربط)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono">
                توقيع واعتماد اليوم ✓
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              تم اليوم 4/10 توقيع واعتماد مستندات السيرفر السحابي المخصص لتطبيق 4B بمركز بيانات القرية الذكية وخطوط ربط الفايبر L3VPN المعتمدة، وقيدها رسمياً بالحسابات مع أ/ هاني.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE 6 PRIMARY ODOO-STYLE APPLICATIONS (تطبيقات المنظومة الـ 6) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              تطبيقات المنظومة الرئيسية (Odoo Apps Launcher)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            6 تطبيقات معتمدة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {odooApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                onClick={() => onNavigateToTab(app.targetTab)}
                className="group p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500/80 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 text-right"
              >
                <div className="space-y-3">
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-teal-50 text-teal-700 flex items-center justify-center border border-slate-200/80 group-hover:border-teal-200 transition shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2.2px]" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800 transition">
                      {app.tag}
                    </span>
                  </div>

                  {/* App Titles */}
                  <div>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-teal-800 transition">
                      {app.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {app.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* KPIs / Badges */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {app.kpis.map((kpi, idx) => {
                      let badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200'; // Done
                      if (kpi.status === 'pending') {
                        badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200'; // Pending/Pink
                      } else if (kpi.status === 'critical') {
                        badgeStyle = 'bg-red-50 text-red-800 border-red-200 font-bold'; // Critical
                      }
                      return (
                        <div key={idx} className={`p-1.5 rounded-xl border text-[9px] font-mono ${badgeStyle}`}>
                          <div className="opacity-75">{kpi.label}</div>
                          <div className="font-bold truncate">{kpi.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Open App Button */}
                  <div className="flex items-center justify-end text-xs font-bold text-teal-700 group-hover:translate-x-[-3px] transition pt-1 gap-1">
                    <span>فتح التطبيق</span>
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* كارت "الراك" الجديد - يفتح صفحة جرافيك احترافية تمثل الراك ومحتوياته */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <span>كارت الراك المركزي</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-900 font-bold">
                Perla 27U Rack • Heavy Duty
              </span>
            </h2>
          </div>
          <button
            onClick={handleOpenRack}
            className="text-xs text-cyan-800 hover:text-cyan-950 font-bold flex items-center gap-1.5 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-xl border border-cyan-200/80 transition shadow-2xs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-700" />
            <span>فتح الجرافيك التفاعلي للراك</span>
          </button>
        </div>

        <div 
          onClick={handleOpenRack}
          className="group relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a1120] to-slate-900 border-2 border-teal-500/40 hover:border-teal-400 shadow-xl hover:shadow-2xl hover:shadow-teal-950/40 transition-all duration-300 cursor-pointer overflow-hidden text-right text-white select-none"
        >
          {/* Glowing Decorative Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/15 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Right Part: Titles & Specifications */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  كابينة السيرفرات المركزية 27U • Perla Server Enclosure
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Depth: 1000mm • Heavy Duty
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  حالة التشغيل: نشط ومأهول
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                    <Server className="w-7 h-7 stroke-[2.2px]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-teal-300 transition-colors flex items-center gap-2">
                      <span>الراك</span>
                      <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono">
                        (Perla 27U Datacenter Rack)
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      غرفة السيرفرات والـ IT المستقلة بمقر المعراج بالمعادي • العصب الشبكي والفيزيائي لكافة المنصات
                    </p>
                  </div>
                </div>
              </div>

              {/* Units Summary Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">سويتش الشبكة:</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block">Cisco 3850 48P</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">سيرفر الإنتاج:</span>
                  <span className="text-xs font-bold text-sky-400 truncate block">Dell R640 48C</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">كاميرات المراقبة:</span>
                  <span className="text-xs font-bold text-amber-400 truncate block">16-Ch PoE NVR</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block">السنترال وجدار النار:</span>
                  <span className="text-xs font-bold text-blue-400 truncate block">PBX & Firewall</span>
                </div>
              </div>

              {/* Quick Live Telemetry Strip */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>21.4 °C حرارة</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>950W استهلاك</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>4 مراوح سقف 2400 RPM</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-teal-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Dual PSU 715W Redundant</span>
                </span>
              </div>
            </div>

            {/* Left Part: Interactive Mini Rack Elevation Simulation Graphic */}
            <div className="flex flex-col items-center lg:items-end justify-center shrink-0 space-y-3">
              
              {/* Visual Miniature Rack Graphic - STRICT ORDER FROM TOP TO BOTTOM */}
              <div className="w-full sm:w-80 bg-[#060a12] p-2.5 rounded-2xl border-2 border-slate-700/80 shadow-2xl relative space-y-1 font-mono text-[9px] group-hover:border-teal-400/60 transition-colors">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[8px] text-slate-400">
                  <span className="text-teal-400 font-bold">PERLA 27U HARDWARE STACK</span>
                  <span className="text-emerald-400 font-bold">7 LAYERS ORDERED</span>
                </div>

                {/* The 7 Layers Exact Sequence */}
                <div className="space-y-1">
                  {/* 1. Patch Panel 24 Port */}
                  <div className="h-4 bg-slate-900 rounded px-1.5 flex items-center justify-between border border-slate-700">
                    <span className="text-slate-300">1. Patch Panel 24 Port (علوي)</span>
                    <span className="text-[8px] text-teal-400">Cat6 • 24P</span>
                  </div>

                  {/* 2. Cisco Switch 48 Port */}
                  <div className="h-5 bg-gradient-to-r from-emerald-950 to-slate-900 rounded px-1.5 flex items-center justify-between border border-emerald-500/50">
                    <span className="text-emerald-300 font-bold">2. Cisco Switch 48 Port</span>
                    <div className="flex gap-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    </div>
                  </div>

                  {/* 3. Patch Panel 24 Port */}
                  <div className="h-4 bg-slate-900 rounded px-1.5 flex items-center justify-between border border-slate-700">
                    <span className="text-slate-300">3. Patch Panel 24 Port (سفلي)</span>
                    <span className="text-[8px] text-teal-400">Cat6 • 24P</span>
                  </div>

                  {/* 4. Dell PowerEdge R640 Server */}
                  <div className="h-6 bg-gradient-to-r from-sky-950 to-slate-900 rounded px-1.5 flex items-center justify-between border border-sky-400/60">
                    <span className="text-sky-300 font-bold">4. Dell PowerEdge R640 Server</span>
                    <span className="px-1 py-0.2 rounded bg-sky-900 text-sky-200 text-[8px] font-bold">48 CORES</span>
                  </div>

                  {/* [ مسافة فارغة واضحة ] */}
                  <div className="h-4 bg-[#070b14] rounded px-1.5 flex items-center justify-center border border-dashed border-slate-700/60 text-[8px] text-slate-500 font-bold">
                    [ مسافة تهوية وتوسع فارغة واضحة • Clear Spacing ]
                  </div>

                  {/* 5. NVR 16 Channel */}
                  <div className="h-5 bg-gradient-to-r from-slate-900 to-[#1e293b] rounded px-1.5 flex items-center justify-between border border-amber-600/50">
                    <span className="text-amber-300">5. 16-Channel NVR (الكاميرات)</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[7px] text-amber-200">16× PoE</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                  </div>

                  {/* 6. Grandstream IP PBX / Central */}
                  <div className="h-5 bg-gradient-to-r from-blue-950 to-slate-900 rounded px-1.5 flex items-center justify-between border border-blue-500/50">
                    <span className="text-blue-300">6. Grandstream IP PBX (السنترال)</span>
                    <span className="text-[7px] bg-blue-900 px-1 rounded text-blue-200">LCD • SIP</span>
                  </div>

                  {/* 7. Firewall */}
                  <div className="h-5 bg-gradient-to-r from-red-950 to-slate-900 rounded px-1.5 flex items-center justify-between border border-red-600/50">
                    <span className="text-red-300 font-bold">7. Enterprise Firewall</span>
                    <span className="text-[7px] text-emerald-300">24M L3VPN</span>
                  </div>
                </div>
              </div>

              {/* Glowing Action Button inside card */}
              <div className="w-full flex items-center justify-center">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30 group-hover:scale-102"
                >
                  <Maximize2 className="w-4 h-4 stroke-[2.5px]" />
                  <span>فتح صفحة جرافيك الراك التفاعلية (27U)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* كارت مركز فحص الشبكة والـ Ping لمشاوير (Meshawir Network & Ping Monitor) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <span>فحص الشبكة والـ Ping لمشاوير (Ping Monitor)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-bold">
                بنية مقر المعادي • خوادم وسويتش 4B
              </span>
            </h2>
          </div>
          <button
            onClick={() => onNavigateToTab('meshawir_network')}
            className="text-xs text-teal-800 hover:text-teal-950 font-bold flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200/80 transition shadow-2xs"
          >
            <Radio className="w-3.5 h-3.5 text-teal-700" />
            <span>فتح شاشة فحص الشبكة والـ Ping</span>
          </button>
        </div>

        <div 
          onClick={() => onNavigateToTab('meshawir_network')}
          className="group relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-[#061817] to-slate-900 border-2 border-teal-500/40 hover:border-teal-400 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden text-right text-white select-none"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Right Information */}
            <div className="space-y-3.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  12 نقطة شبكة وسيرفرات نشطة • Zero Packet Loss
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  متوسط زمن الاستجابة: 1.2ms
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2.5">
                  <Radio className="w-5 h-5 text-teal-400" />
                  <span>أدوات فحص الشبكة والـ Ping ومتابعة البنية التحتية لشركة مشاوير</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  فحص مباشر لحظي ومستمر لاستجابة خادم ديل <strong className="text-white">Dell R640 (192.168.10.10)</strong>، وسويتش سيسكو الأساسي <strong className="text-white">Cisco 3850 (192.168.10.1)</strong>، وسنترال جراند ستريم، وكاميرات المراقبة، وبوابة فايبر المصرية للاتصالات WE.
                </p>
              </div>

              {/* Badges of Key Endpoints */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                  ● Dell R640: 1.2ms
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-teal-300 font-bold">
                  ● Cisco Switch: 0.8ms
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-sky-400 font-bold">
                  ● Grandstream PBX: 1.8ms
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-bold">
                  ● Hikvision NVR: 2.1ms
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-purple-400 font-bold">
                  ● WE Fiber Gateway: 5.4ms
                </span>
              </div>
            </div>

            {/* Left Action Box */}
            <div className="flex flex-col justify-center items-start lg:items-end gap-3 min-w-[240px]">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs w-full space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>وضع الـ Ping المباشر:</span>
                  <span className="text-emerald-400 font-bold">Continuous Active</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>بوابة الإنترنت (WE):</span>
                  <span className="text-teal-300 font-bold">Fiber 100M Online</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>بلاغات الصيانة الداخلية:</span>
                  <span className="text-slate-300">4 بلاغات تشغيل</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTab('meshawir_network');
                }}
                className="w-full py-2.5 px-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 group-hover:scale-102"
              >
                <Radio className="w-4 h-4 stroke-[2.5px]" />
                <span>دخول أداة فحص الـ Ping المستمر</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2.5 CORE HARDWARE & INFRASTRUCTURE ("الحاجة من جوه الحاجة" - اضغط على العنصر لعرض كامل التفاصيل الهندسية والمسار والفواتير) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              أجهزة وعتاد المقر والشبكة ("الحاجة من جوه الحاجة")
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold hidden sm:inline">
              اضغط على أي جهاز لعرض المواصفات وفواتير الشراء والمسار
            </span>
          </div>
          <button
            onClick={() => setShowZWorkstationModal(true)}
            className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-xl transition"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>دراسة تراخيص الـ 16 كور لسيرفر Z</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {primaryDevices.map((dev) => (
            <div
              key={dev.id}
              onClick={() => {
                if (dev.id === 'dev-perla-27u') {
                  handleOpenRack();
                } else {
                  setSelectedDeviceDetail(dev);
                }
              }}
              className="group p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition cursor-pointer text-right flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-teal-50 text-teal-700 flex items-center justify-center border border-slate-200 group-hover:border-teal-200 transition shadow-2xs">
                  {dev.category === 'server' ? (
                    <Server className="w-4 h-4 stroke-[2.2px]" />
                  ) : dev.category === 'cctv' ? (
                    <Camera className="w-4 h-4 stroke-[2.2px]" />
                  ) : dev.category === 'workstation' ? (
                    <Cpu className="w-4 h-4 stroke-[2.2px]" />
                  ) : dev.category === 'telecom' ? (
                    <Network className="w-4 h-4 stroke-[2.2px]" />
                  ) : (
                    <Layers className="w-4 h-4 stroke-[2.2px]" />
                  )}
                </div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-teal-800 line-clamp-1 leading-snug">
                  {dev.name}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800 font-bold truncate">
                  {dev.shortBadge}
                </span>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-[-2px] transition shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC INTERACTIVE CALENDAR & REAL-LIFE TIMELINE (الكالندر التفاعلي من واقع اليوم) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  جدول الأعمال والتواريخ الحية التفاعلية
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-mono font-bold">
                  مربوط بالتقويم
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                تواريخ حقيقية مرتبطة بالبداية والنهاية ومسؤولية كل طرف، مع ألوان دلالية طبيعية (أخضر للمنتهي، وردي للمعلق، وأحمر للموعد النهائي)
              </p>
            </div>
          </div>

          {/* Action to Add Event */}
          <button
            onClick={() => setShowAddEventModal(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة موعد أو مهمة بالتقويم</span>
          </button>
        </div>

        {/* Filters Bar: Semantic Status & Person Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 font-bold ml-1">حالة التنفيذ:</span>
            <button
              onClick={() => setCalendarFilter('all')}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                calendarFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الكل ({calendarEvents.length})
            </button>
            <button
              onClick={() => setCalendarFilter('completed')}
              className={`px-3 py-1 rounded-xl font-bold transition flex items-center gap-1 border ${
                calendarFilter === 'completed'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>منجز بنجاح ({calendarEvents.filter(e => e.status === 'completed').length})</span>
            </button>
            <button
              onClick={() => setCalendarFilter('ongoing')}
              className={`px-3 py-1 rounded-xl font-bold transition flex items-center gap-1 border ${
                calendarFilter === 'ongoing'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>معلق / قيد العمل ({calendarEvents.filter(e => e.status === 'ongoing').length})</span>
            </button>
            <button
              onClick={() => setCalendarFilter('critical_deadline')}
              className={`px-3 py-1 rounded-xl font-bold transition flex items-center gap-1 border ${
                calendarFilter === 'critical_deadline'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>موعد نهائي حاسم ({calendarEvents.filter(e => e.status === 'critical_deadline').length})</span>
            </button>
          </div>

          {/* Filter by Person */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold">تصفية بالمسؤول:</span>
            <select
              value={selectedPersonFilter}
              onChange={(e) => setSelectedPersonFilter(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">كافة الأطراف</option>
              <option value="سامح">م/ سامح ياسين</option>
              <option value="عماد">م/ عماد الشرقاوي</option>
              <option value="أحمد عبيد">م/ أحمد عبيد</option>
              <option value="قيمة تك">شركة قيمة تك</option>
              <option value="غريب">المصرية للاتصالات WE</option>
            </select>
          </div>
        </div>

        {/* Interactive Event Cards List */}
        <div className="space-y-2.5">
          {filteredEvents.map((ev) => {
            const isDone = ev.status === 'completed';
            const isCritical = ev.status === 'critical_deadline';
            
            // Semantic styling matching user preference
            let cardBg = 'bg-white border-slate-200 hover:border-slate-300';
            let badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
            let badgeText = 'قيد المتابعة والتنفيذ';
            
            if (isDone) {
              cardBg = 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300';
              badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              badgeText = 'مكتمل بنجاح';
            } else if (isCritical) {
              cardBg = 'bg-red-50/20 border-red-200 hover:border-red-300';
              badgeBg = 'bg-red-50 text-red-800 border-red-200';
              badgeText = 'موعد نهائي حرج (Deadline)';
            }

            return (
              <div
                key={ev.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right ${cardBg}`}
              >
                <div className="flex items-start gap-3">
                  {/* Interactive Toggle Checkbox */}
                  <button
                    onClick={() => handleToggleEvent(ev.id)}
                    className={`w-7 h-7 rounded-xl border flex items-center justify-center transition shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 hover:border-teal-500 text-transparent'
                    }`}
                    title={isDone ? 'إعادة إلى قيد الانتظار' : 'تحديد كمكتمل'}
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {ev.title}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.2 rounded-full border font-bold ${badgeBg}`}>
                        {badgeText}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {ev.notes}
                    </p>
                  </div>
                </div>

                {/* Date & Responsible Person Pill */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-left font-mono">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{ev.targetDate}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      المسؤول: {ev.assignedPerson}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TEAM & DECISION CAPABILITIES (القاعدة: المهندس عماد أولاً دائماً عند ذكره مع المهندس سامح) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                فريق العمل وأصحاب القرار (المهندس عماد الشرقاوي والمهندس سامح ياسين والكوادر)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                ميزان الكفاءات والقدرات
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              متابعة المهام التخصصية لكل شريك وعضو، ومستوى الكفاءة في حل المشكلات الميدانية والتقنية
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTeamSimulation && (
              <button
                onClick={onOpenTeamSimulation}
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <Users className="w-3.5 h-3.5 text-teal-700" />
                <span>فتح محاكاة الفريق ومحرك المشاكل</span>
              </button>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              {teamMembers.length} كوادر ومسؤولين
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {teamMembers.map((member) => {
            const completionRate = Math.round((member.completedCount / member.tasksCount) * 100);
            return (
              <div
                key={member.id}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-400 hover:bg-white transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{member.name}</h4>
                      <span className="text-[11px] text-teal-700 font-bold block">{member.role}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold">
                      {member.badge}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>نسبة إنجاز المهام:</span>
                      <span className="font-bold text-slate-800">{completionRate}% ({member.completedCount}/{member.tasksCount})</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className="h-full bg-teal-600 rounded-full transition-all duration-300"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Critical Next Task */}
                  <div className="p-2 rounded-xl bg-white border border-slate-100 text-[10px] text-slate-600 space-y-0.5">
                    <span className="text-slate-400 block font-bold">المهمة ذات الأولوية:</span>
                    <span className="text-slate-800 font-medium block truncate">{member.criticalTask}</span>
                  </div>
                </div>

                {/* Card Action Link to 135 Master Roadmap */}
                {onOpenMasterRoadmap && (
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenMasterRoadmap(member.filterKey)}
                      className="w-full text-center text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-white hover:bg-teal-50 py-1.5 rounded-xl border border-slate-200 hover:border-teal-300 transition flex items-center justify-center gap-1"
                    >
                      <span>عرض مهام {member.name.split(' ')[1] || member.name} في لوحة الـ 135</span>
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ADD EVENT MODAL DIALOG */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">إضافة موعد أو مهمة جديدة بالتقويم</h3>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="w-7 h-7 rounded-xl hover:bg-slate-100 text-slate-400 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewEvent} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">عنوان الموعد / المهمة:</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="مثال: مراجعة كابلات سيسكو وسيرفر ديل..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">التاريخ المستهدف:</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">الشخص المسؤول:</label>
                  <select
                    value={newEventPerson}
                    onChange={(e) => setNewEventPerson(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="م/ سامح ياسين">م/ سامح ياسين</option>
                    <option value="م/ عماد الشرقاوي">م/ عماد الشرقاوي</option>
                    <option value="م/ أحمد عبيد">م/ أحمد عبيد</option>
                    <option value="حاتم (فني شبكات)">حاتم (فني شبكات)</option>
                    <option value="شركة قيمة تك">شركة قيمة تك</option>
                    <option value="المصرية للاتصالات WE">المصرية للاتصالات WE</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">الحالة الأولية:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNewEventStatus('completed')}
                    className={`p-2 rounded-xl border font-bold text-[10px] transition ${
                      newEventStatus === 'completed'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    منجز بنجاح
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEventStatus('ongoing')}
                    className={`p-2 rounded-xl border font-bold text-[10px] transition ${
                      newEventStatus === 'ongoing'
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    معلق / قيد العمل
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEventStatus('critical_deadline')}
                    className={`p-2 rounded-xl border font-bold text-[10px] transition ${
                      newEventStatus === 'critical_deadline'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                  >
                    موعد نهائي حاسم
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  حفظ بالتقويم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Z Workstation & Cores Licensing Modal */}
      <ZWorkstationAndCoresModal
        isOpen={showZWorkstationModal}
        onClose={() => setShowZWorkstationModal(false)}
        onAskHypatia={onAskHypatia}
      />

      {/* Server Rack 27U Interactive Graphic Modal ("الراك ومحتوياته") */}
      <ServerRackGraphicModal
        isOpen={showServerRackModal}
        onClose={() => setShowServerRackModal(false)}
        onAskHypatia={onAskHypatia}
      />

      {/* Hardware Device Deep-Dive Modal ("الحاجة من جوه الحاجة") */}
      <DeviceDetailModal
        device={selectedDeviceDetail}
        onClose={() => setSelectedDeviceDetail(null)}
        onAskHypatia={onAskHypatia}
        onOpenProjectSource={onOpenProjectSource}
      />

    </div>
  );
};
