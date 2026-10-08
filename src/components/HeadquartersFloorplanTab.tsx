import React, { useState, useMemo } from 'react';
import { 
  Building, 
  Camera, 
  Server, 
  Monitor, 
  ShieldAlert, 
  Wifi, 
  Layers, 
  Info, 
  CheckCircle2, 
  Zap, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  Users, 
  Key, 
  DoorClosed,
  Mic,
  Cpu,
  HardDrive,
  SlidersHorizontal,
  Flame,
  Search,
  ExternalLink,
  Lock,
  ArrowRight,
  Bot
} from 'lucide-react';
import { INITIAL_QUOTATIONS } from '../data/initialQuotations';
import { DeviceDetailModal, DeviceDetailItem } from './DeviceDetailModal';
import { ZWorkstationAndCoresModal } from './ZWorkstationAndCoresModal';

interface HeadquartersFloorplanTabProps {
  onAskHypatia: (prompt: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export type FloorplanLayer = 'all' | 'cctv' | 'workstations' | 'servers_network' | 'power_safety' | 'inventory_audit';

interface RoomDef {
  id: string;
  number: number | string;
  name: string;
  arabicName: string;
  arabicRole: string;
  assignedPerson?: string;
  dimensionsText: string;
  widthMeters: number;
  heightMeters: number;
  areaSqMeters: number;
  // SVG bounding box (canvas coordinates based on 25.91m x 20.94m)
  x: number;
  y: number;
  w: number;
  h: number;
  door: { x: number; y: number; side: 'top' | 'bottom' | 'left' | 'right'; label: string };
  windows?: Array<{ x: number; y: number; w: number; h: number }>;
  networkDrops: number;
  powerOutlets: number;
  suggestedCameras: string[];
  equipmentList: string[];
  notes: string;
}

interface CameraDef {
  id: string;
  code: string;
  name: string;
  type: 'audio_mic' | 'standard_dome' | 'bullet_outdoor';
  roomId: string;
  x: number;
  y: number;
  angle: number; // direction in degrees
  fov: number; // field of view in degrees
  range: number;
  model: string;
  status: 'تم التوريد والمعاينة' | 'جاهزة للتركيب' | 'مخططة';
  isAudio: boolean;
}

interface DeviceDef {
  id: string;
  name: string;
  category: 'server' | 'workstation' | 'network' | 'power' | 'display';
  roomId: string;
  x: number;
  y: number;
  spec: string;
  status: 'تم الشراء والتوريد الفعلي' | 'قيد التركيب' | 'مطلوب للمرحلة 2';
  invoiceId?: string;
}

export const HeadquartersFloorplanTab: React.FC<HeadquartersFloorplanTabProps> = ({
  onAskHypatia,
  onNavigateToTab
}) => {
  const [activeLayer, setActiveLayer] = useState<FloorplanLayer>('all');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-server');
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [showFovCones, setShowFovCones] = useState<boolean>(true);
  const [showCableTrunks, setShowCableTrunks] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Architectural Rooms according to the provided floor plan "الاصلي.jpg"
  // Blueprint canvas coordinate space: 1000 width x 780 height
  const rooms: RoomDef[] = useMemo(() => [
    {
      id: 'room-1',
      number: 1,
      name: 'مكتب 1 (Office 1)',
      arabicName: 'مكتب الإدارة العليا ومجلس الإدارة',
      arabicRole: 'مكتب الإدارة والاستراتيجية وعقد الصفقات',
      assignedPerson: 'أبو خالد (المستثمر الرئيسي ورئيس مجلس الإدارة)',
      dimensionsText: '5.67m × 7.39m',
      widthMeters: 5.67,
      heightMeters: 7.39,
      areaSqMeters: 41.9,
      x: 775,
      y: 65,
      w: 195,
      h: 245,
      door: { x: 795, y: 310, side: 'bottom', label: 'باب مكتب 1' },
      windows: [{ x: 830, y: 62, w: 70, h: 6 }, { x: 967, y: 150, w: 6, h: 60 }],
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-01 (Audio Mic)'],
      equipmentList: [
        'مكتب تنفيذي فخم + طاولة اجتماعات مصغرة',
        'شاشة عرض ذكية 65 بوصة للاجتماعات وعرض داشبورد مشاوير',
        'نقطة هاتف IP Phone وشبكة Cat6 مزدوجة'
      ],
      notes: 'المكتب الأكبر في الصف العلوي، يتمتع بإطلالة مزدوجة ونافذتين وخصوصية عالية.'
    },
    {
      id: 'room-2',
      number: 2,
      name: 'مكتب 2 (Office 2)',
      arabicName: 'مكتب الإدارة المالية والحسابات',
      arabicRole: 'المحاسبة، الاشتراكات، ومتابعة فواتير السيرفرات والضرائب',
      assignedPerson: 'أ/ هاني (الشؤون الإدارية والمالية)',
      dimensionsText: '1.84m × 7.39m',
      widthMeters: 1.84,
      heightMeters: 7.39,
      areaSqMeters: 13.6,
      x: 700,
      y: 65,
      w: 75,
      h: 245,
      door: { x: 720, y: 310, side: 'bottom', label: 'باب مكتب 2' },
      windows: [{ x: 715, y: 62, w: 45, h: 6 }],
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-02 (Standard Dome)'],
      equipmentList: [
        'مكتب إداري + أرشيف مستندات وسجلات ضريبية',
        'جهاز كمبيوتر مكتبي محاسبي + طابعة فواتير وشيكات',
        'أرشيف الفواتير الورقية والإلكترونية (ETA)'
      ],
      notes: 'غرفة مركزية بين مكاتب الإدارة، مجهزة بنقاط شبكة مباشرة لحماية سرية البيانات المالية.'
    },
    {
      id: 'room-3',
      number: 3,
      name: 'مكتب 3 (Office 3)',
      arabicName: 'مكتب الشؤون القانونية والعقود',
      arabicRole: 'مراجعة عقود الشركات، التراخيص الحكومية، والشروط الجزائية',
      assignedPerson: 'أ/ محمد مصطفى (المستشار القانوني)',
      dimensionsText: '1.86m × 7.39m',
      widthMeters: 1.86,
      heightMeters: 7.39,
      areaSqMeters: 13.7,
      x: 625,
      y: 65,
      w: 75,
      h: 245,
      door: { x: 645, y: 310, side: 'bottom', label: 'باب مكتب 3' },
      windows: [{ x: 640, y: 62, w: 45, h: 6 }],
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-03 (Standard Dome)'],
      equipmentList: [
        'مكتب قانوني + خزينة مستندات العقود الأصلية',
        'جهاز كمبيوتر متصل بقاعدة بيانات النماذج القانونية',
        'هاتف مكتبي IP Phone'
      ],
      notes: 'ملاصق لمكتب الحسابات، مخصص لمراجعة عقود قيمة تك والمصرية للاتصالات والجهات الرسمية.'
    },
    {
      id: 'room-4',
      number: 4,
      name: 'مكتب 4 (Office 4)',
      arabicName: 'مكتب إدارة العمليات والكباتن',
      arabicRole: 'إدارة أسطول الكباتن، الدعم الميداني، ومتابعة الرحلات',
      assignedPerson: 'م/ موفق (مدير العمليات التشغيلية)',
      dimensionsText: '4.42m × 7.39m',
      widthMeters: 4.42,
      heightMeters: 7.39,
      areaSqMeters: 32.7,
      x: 445,
      y: 65,
      w: 180,
      h: 245,
      door: { x: 535, y: 310, side: 'bottom', label: 'باب مكتب 4' },
      windows: [{ x: 490, y: 62, w: 90, h: 6 }],
      networkDrops: 6,
      powerOutlets: 8,
      suggestedCameras: ['CAM-04 (Audio Mic Dome)'],
      equipmentList: [
        'مكتب إدارة العمليات + شاشة مراقبة خريطة الرحلات الحية لـ 4B',
        '2 أجهزة كمبيوتر لمشرفي العمليات ومتابعة شكاوى الكباتن',
        'نظام طابور وانتظار ونداء الكباتن'
      ],
      notes: 'مكتب واسع يستوعب فريق العمليات والمقابلات الميدانية للكباتن.'
    },
    {
      id: 'room-open-hall',
      number: 'القاعة',
      name: 'القاعة الكبرى المفتوحة (Open Workspace)',
      arabicName: 'قاعة التطوير والعمل الجماعي والـ Operations Hub',
      arabicRole: 'أسطول أجهزة الموظفين، خدمة العملاء، وفريق المطورين',
      assignedPerson: 'فريق التطوير + خدمة العملاء (17 محطة عمل)',
      dimensionsText: '9.60m × 12.28m',
      widthMeters: 9.60,
      heightMeters: 12.28,
      areaSqMeters: 117.9,
      x: 55,
      y: 65,
      w: 390,
      h: 390,
      door: { x: 440, y: 390, side: 'right', label: 'مدخل القاعة الكبرى' },
      windows: [{ x: 160, y: 62, w: 140, h: 6 }, { x: 52, y: 200, w: 6, h: 90 }],
      networkDrops: 24,
      powerOutlets: 28,
      suggestedCameras: ['CAM-05 (Wide Angle Dome)', 'CAM-06 (Wide Angle Dome)'],
      equipmentList: [
        'أسطول أجهزة الموظفين (17 محطة عمل كاملة + شاشات)',
        '3 أجهزة ديل OptiPlex 3090 مع 3 شاشات Dell 22 بوصة بكاميرات مدمجة',
        'طاولات عمل تشاركية بتمريرات كوابل أرضية منظمة (Floor Cable Trunks)',
        'أكسس بوينت واي فاي سقفية احترافية UniFi 6'
      ],
      notes: 'المساحة الأكبر في المقر (حوالي 118 متر مربع)، مركز النشاط الحي لأسطول الموظفين وفريق خدمة عملاء مشاوير.'
    },
    {
      id: 'room-5',
      number: 5,
      name: 'مكتب 5 (Office 5)',
      arabicName: 'مكتب قيادة التكنولوجيا والأنظمة (CTO Tech Hub)',
      arabicRole: 'إدارة البنية التحتية، السيرفرات، البرمجة، وتدريب نماذج كاجل',
      assignedPerson: 'م/ سامح ياسين (CTO & Systems Lead)',
      dimensionsText: '4.54m × 7.39m',
      widthMeters: 4.54,
      heightMeters: 7.39,
      areaSqMeters: 33.5,
      x: 55,
      y: 455,
      w: 185,
      h: 245,
      door: { x: 160, y: 455, side: 'top', label: 'باب مكتب 5 (CTO)' },
      windows: [{ x: 52, y: 530, w: 6, h: 70 }],
      networkDrops: 8,
      powerOutlets: 10,
      suggestedCameras: ['CAM-07 (Audio Mic Dome)'],
      equipmentList: [
        'محطتي العمل الفائقة HP Workstation Z440 (Xeon E5-2697v4 - 18 Cores) للتطوير والاختبار',
        'لابتوب العمل الرئيسي HP ZBook Firefly 14 (Core i7)',
        'شاشات مراقبة برمجية متعددة (Multi-Display Development Desk)',
        'كونسول إدارة سيرفرات WE وسيرفر ديل R640 المحلي'
      ],
      notes: 'غرفة التكنولوجيا الأساسية لم/ سامح؛ متصلة بخط شبكة مباشر فائق السرعة مع غرفة السيرفرات.'
    },
    {
      id: 'room-6',
      number: 6,
      name: 'مكتب 6 (Office 6)',
      arabicName: 'مكتب هندسة النظم الخلفية وقواعد البيانات',
      arabicRole: 'تطوير الباك إند، السوبابيز، وربط الـ APIs مع البنوك والجهات',
      assignedPerson: 'م/ عمرو (Senior Backend Engineer)',
      dimensionsText: '2.01m × 7.39m',
      widthMeters: 2.01,
      heightMeters: 7.39,
      areaSqMeters: 14.8,
      x: 240,
      y: 455,
      w: 80,
      h: 245,
      door: { x: 265, y: 455, side: 'top', label: 'باب مكتب 6' },
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-08 (Standard Dome)'],
      equipmentList: [
        'محطة عمل تطويرية بمواصفات عالية + شاشتين',
        'نقطة فحص سورس كود 4B وقيمة تك والوكالة'
      ],
      notes: 'مكتب هندسي هادئ مخصص للتركيز البرمجي وبناء المعمارية.'
    },
    {
      id: 'room-7',
      number: 7,
      name: 'مكتب 7 (Office 7)',
      arabicName: 'مكتب جودة التطبيقات وتجربة المستخدم (QA & Mobile Lead)',
      arabicRole: 'اختبار ملفات الـ APK، فحص الـ Bug fixes، والـ Releases',
      assignedPerson: 'م/ علي (Mobile QA & Lead Tester)',
      dimensionsText: '1.98m × 7.39m',
      widthMeters: 1.98,
      heightMeters: 7.39,
      areaSqMeters: 14.6,
      x: 320,
      y: 455,
      w: 80,
      h: 245,
      door: { x: 345, y: 455, side: 'top', label: 'باب مكتب 7' },
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-09 (Standard Dome)'],
      equipmentList: [
        'معمل اختبار الأجهزة المحمولة (Test Devices Lab - Android/iOS)',
        'جهاز كمبيوتر مكتبي لاختبار الـ End-to-End والـ Clean Architecture'
      ],
      notes: 'مكتب فحص وتجربة التطبيقات قبل الإطلاق الرسمي.'
    },
    {
      id: 'room-entrance',
      number: 'المدخل',
      name: 'مدخل المقر الرئيسي (Main Reception & Entrance)',
      arabicName: 'بهو الاستقبال ومدخل الأمان للمقر',
      arabicRole: 'الاستقبال، التوجيه، بصمة الحضور والانصراف، والتحكم بالأبواب',
      dimensionsText: '4.04m × 7.39m',
      widthMeters: 4.04,
      heightMeters: 7.39,
      areaSqMeters: 29.8,
      x: 520,
      y: 455,
      w: 165,
      h: 245,
      door: { x: 520, y: 550, side: 'left', label: 'باب الدخول الذكي' },
      networkDrops: 4,
      powerOutlets: 6,
      suggestedCameras: ['CAM-10 (Audio Mic - Entry Face Detection)'],
      equipmentList: [
        'كونتر استقبال عصري + جهاز تسجيل الزوار',
        'جهاز بصمة وكروت ذكية (Biometric Access Control)',
        'لوحة إنذار الحريق المركزية (Honeywell 8 Zones)'
      ],
      notes: 'المدخل الرئيسي بالباب الموضح بالسهم الأخضر، مزود بأعلى درجات المراقبة والتحكم.'
    },
    {
      id: 'room-wc-1',
      number: 'WC 1',
      name: 'دورة مياه 1 (Executive Restroom)',
      arabicName: 'دورة مياه الإدارة والضيوف',
      arabicRole: 'خدمات صحية ونظافة',
      dimensionsText: '5.74m × 2.34m',
      widthMeters: 5.74,
      heightMeters: 2.34,
      areaSqMeters: 13.4,
      x: 755,
      y: 455,
      w: 185,
      h: 70,
      door: { x: 755, y: 480, side: 'left', label: 'باب WC 1' },
      networkDrops: 0,
      powerOutlets: 2,
      suggestedCameras: [],
      equipmentList: ['تجهيزات صحية كاملة ومجفف أيدي آلي'],
      notes: 'خدمات مجهزة للمقر.'
    },
    {
      id: 'room-wc-2',
      number: 'WC 2',
      name: 'دورة مياه 2 (Staff Restroom)',
      arabicName: 'دورة مياه الموظفين وفريق العمل',
      arabicRole: 'خدمات صحية ونظافة',
      dimensionsText: '5.74m × 2.27m',
      widthMeters: 5.74,
      heightMeters: 2.27,
      areaSqMeters: 13.0,
      x: 755,
      y: 535,
      w: 185,
      h: 75,
      door: { x: 755, y: 560, side: 'left', label: 'باب WC 2' },
      networkDrops: 0,
      powerOutlets: 2,
      suggestedCameras: [],
      equipmentList: ['تجهيزات صحية كاملة ومغاسل مزدوجة'],
      notes: 'خدمات مجهزة للمقر.'
    },
    {
      id: 'room-server',
      number: 'السيرفرات',
      name: 'غرفة السيرفرات الرئيسية (Central Server Room & IT Core)',
      arabicName: 'النواة التكنولوجية للمقر وسيرفرات البنية التحتية',
      arabicRole: 'حاضنة الراك 27U، سيرفر ديل بلاتينيوم، سويتشات الشبكة، والـ UPS',
      assignedPerson: 'تحت الإشراف المباشر لم/ سامح يس (مقفلة برمز إلكتروني)',
      dimensionsText: '5.74m × 1.96m',
      widthMeters: 5.74,
      heightMeters: 1.96,
      areaSqMeters: 11.2,
      x: 685,
      y: 620,
      w: 255,
      h: 80,
      door: { x: 685, y: 645, side: 'left', label: 'باب غرفة السيرفرات المصفح' },
      networkDrops: 16,
      powerOutlets: 12,
      suggestedCameras: ['CAM-11 (Audio Mic 4K Rack Monitor)'],
      equipmentList: [
        'راك بيرلا 27U أرضي (600×1000 مم) المعتمد في فاتورة رد لاين (18,550 ج.م)',
        'سيرفر ركوة إنتاجي ديل بلاتينيوم DELL PowerEdge R640 (2x Xeon Platinum 8160 - 48 Cores / 64GB RAM)',
        '2 باتش بانل 48 بورت لتنظيم كوابل Cat6 القادمة من كافة مكاتب المقر',
        'PDU مشترك توزيع طاقة 8 منافذ سيرفري للمعدات',
        'جهاز تسجيل كاميرات شبكي NVR 16 قناة مع قرص 4TB WD Purple',
        'سويتش سيسكو فئة مؤسسية Cisco Catalyst 3850 48-Port PoE+ بباور سبلاي مزدوج 715W المعتمد في فاتورة QTS اليوم (11,970 ج.م)',
        'وحدة تغذية كهربائية غير منقطعة Smart-UPS 3000VA لحماية السيرفر عند انقطاع التيار',
        'عدة الفحص والتركيب المعتمدة: جهاز تتبع الكوابل I-Pook PK65H والأراجة الـ Root 2*1'
      ],
      notes: 'القلب النابض للبنية التحتية المحلية للشركة؛ مبردة ومؤمنة بقفل بيومتري وباب أمان عازل.'
    }
  ], []);

  // 16 CCTV Cameras placement mapped to the architectural rooms
  const cameras: CameraDef[] = useMemo(() => [
    {
      id: 'cam-1',
      code: 'CAM-01',
      name: 'كاميرا مكتب الإدارة 1',
      type: 'audio_mic',
      roomId: 'room-1',
      x: 790,
      y: 85,
      angle: 135,
      fov: 85,
      range: 120,
      model: 'Hikvision 4K Audio Mic Dome (تغطية كاملة للمكتب وطاولة الاجتماعات)',
      status: 'تم التوريد والمعاينة',
      isAudio: true
    },
    {
      id: 'cam-2',
      code: 'CAM-02',
      name: 'كاميرا مكتب الحسابات 2',
      type: 'standard_dome',
      roomId: 'room-2',
      x: 710,
      y: 85,
      angle: 120,
      fov: 75,
      range: 100,
      model: 'Hikvision 4MP Standard Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-3',
      code: 'CAM-03',
      name: 'كاميرا مكتب الشؤون القانونية 3',
      type: 'standard_dome',
      roomId: 'room-3',
      x: 635,
      y: 85,
      angle: 120,
      fov: 75,
      range: 100,
      model: 'Hikvision 4MP Standard Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-4',
      code: 'CAM-04',
      name: 'كاميرا مكتب العمليات والكباتن 4',
      type: 'audio_mic',
      roomId: 'room-4',
      x: 460,
      y: 85,
      angle: 130,
      fov: 85,
      range: 110,
      model: 'Hikvision 4K Audio Mic Dome (تسجيل صوت وصورة للمقابلات)',
      status: 'تم التوريد والمعاينة',
      isAudio: true
    },
    {
      id: 'cam-5',
      code: 'CAM-05',
      name: 'كاميرا القاعة المفتوحة (الزاوية الشمالية)',
      type: 'standard_dome',
      roomId: 'room-open-hall',
      x: 75,
      y: 85,
      angle: 135,
      fov: 90,
      range: 160,
      model: 'Hikvision 4MP Ultra-Wide Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-6',
      code: 'CAM-06',
      name: 'كاميرا القاعة المفتوحة (الزاوية الشرقية)',
      type: 'standard_dome',
      roomId: 'room-open-hall',
      x: 420,
      y: 85,
      angle: 225,
      fov: 90,
      range: 160,
      model: 'Hikvision 4MP Ultra-Wide Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-7',
      code: 'CAM-07',
      name: 'كاميرا مكتب CTO والتكنولوجيا 5',
      type: 'audio_mic',
      roomId: 'room-5',
      x: 75,
      y: 475,
      angle: 45,
      fov: 85,
      range: 120,
      model: 'Hikvision 4K Audio Mic Dome (حماية وتوثيق غرفة التكنولوجيا)',
      status: 'تم التوريد والمعاينة',
      isAudio: true
    },
    {
      id: 'cam-8',
      code: 'CAM-08',
      name: 'كاميرا مكتب الباك إند 6',
      type: 'standard_dome',
      roomId: 'room-6',
      x: 250,
      y: 475,
      angle: 60,
      fov: 75,
      range: 100,
      model: 'Hikvision 4MP Standard Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-9',
      code: 'CAM-09',
      name: 'كاميرا مكتب الجودة والـ QA 7',
      type: 'standard_dome',
      roomId: 'room-7',
      x: 330,
      y: 475,
      angle: 60,
      fov: 75,
      range: 100,
      model: 'Hikvision 4MP Standard Dome',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-10',
      code: 'CAM-10',
      name: 'كاميرا المدخل والاستقبال الرئيسية',
      type: 'audio_mic',
      roomId: 'room-entrance',
      x: 535,
      y: 475,
      angle: 60,
      fov: 90,
      range: 130,
      model: 'Hikvision 4K Audio Mic AI Face Detection (التعرف على الوجوه والصوت)',
      status: 'تم التوريد والمعاينة',
      isAudio: true
    },
    {
      id: 'cam-11',
      code: 'CAM-11',
      name: 'كاميرا راك غرفة السيرفرات',
      type: 'audio_mic',
      roomId: 'room-server',
      x: 705,
      y: 635,
      angle: 30,
      fov: 85,
      range: 110,
      model: 'Hikvision 4K Audio Mic Dome (مراقبة حية لوحدة الراك 27U وباب السيرفر)',
      status: 'تم التوريد والمعاينة',
      isAudio: true
    },
    {
      id: 'cam-12',
      code: 'CAM-12',
      name: 'كاميرا الممر الرئيسي (قطاع الشرق)',
      type: 'standard_dome',
      roomId: 'room-corridor',
      x: 740,
      y: 350,
      angle: 180,
      fov: 80,
      range: 150,
      model: 'Hikvision 4MP Corridor Corridor Mode',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-13',
      code: 'CAM-13',
      name: 'كاميرا الممر الرئيسي (قطاع الغرب والمدخل)',
      type: 'standard_dome',
      roomId: 'room-corridor',
      x: 480,
      y: 350,
      angle: 0,
      fov: 80,
      range: 150,
      model: 'Hikvision 4MP Corridor Corridor Mode',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-14',
      code: 'CAM-14',
      name: 'كاميرا ممر السيرفرات والخدمات',
      type: 'standard_dome',
      roomId: 'room-corridor',
      x: 710,
      y: 430,
      angle: 90,
      fov: 80,
      range: 120,
      model: 'Hikvision 4MP Corridor Mode',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-15',
      code: 'CAM-15',
      name: 'كاميرا باب الطوارئ والخروج الخلفي',
      type: 'bullet_outdoor',
      roomId: 'room-open-hall',
      x: 60,
      y: 380,
      angle: 45,
      fov: 85,
      range: 110,
      model: 'Hikvision 4MP Outdoor/Indoor Bullet IR 30m',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    },
    {
      id: 'cam-16',
      code: 'CAM-16',
      name: 'كاميرا الواجهة ومدخل العمارة الرئيسي',
      type: 'bullet_outdoor',
      roomId: 'room-entrance',
      x: 670,
      y: 690,
      angle: 270,
      fov: 90,
      range: 140,
      model: 'Hikvision 4K Bullet IR 50m (مراقبة حركة السيارات والشارع والمصعد)',
      status: 'تم التوريد والمعاينة',
      isAudio: false
    }
  ], []);

  // Hardware devices located inside rooms
  const devices: DeviceDef[] = useMemo(() => [
    {
      id: 'dev-rack27u',
      name: 'راك بيرلا 27U عمق 1000 مم',
      category: 'network',
      roomId: 'room-server',
      x: 780,
      y: 650,
      spec: 'Perla Rack 27U 600*1000 - فاتورة رد لاين (18,550 ج.م)',
      status: 'تم الشراء والتوريد الفعلي',
      invoiceId: 'quote-redline-rack27u-tools'
    },
    {
      id: 'dev-dell-r640',
      name: 'سيرفر DELL PowerEdge R640 Platinum',
      category: 'server',
      roomId: 'room-server',
      x: 820,
      y: 650,
      spec: '2x Xeon Platinum 8160 (48 Cores) • 64GB RAM (لـ 128GB) • فاتورة كيو تي اس (96,295 ج.م)',
      status: 'تم الشراء والتوريد الفعلي',
      invoiceId: 'quote-qts-server-z440-invoice'
    },
    {
      id: 'dev-nvr16',
      name: 'جهاز تسجيل الكاميرات NVR 16Ch + 4TB WD Purple',
      category: 'power',
      roomId: 'room-server',
      x: 860,
      y: 650,
      spec: 'تسجيل مستمر 30 يوماً لـ 16 كاميرا بجودة 4K',
      status: 'تم الشراء والتوريد الفعلي'
    },
    {
      id: 'dev-z440-1',
      name: 'محطة عمل HP Workstation Z440 (الرئيسية)',
      category: 'workstation',
      roomId: 'room-5',
      x: 100,
      y: 570,
      spec: 'Intel Xeon E5-2697v4 (18 Cores) • 16GB RAM • SSD 256GB - لم/ سامح',
      status: 'تم الشراء والتوريد الفعلي',
      invoiceId: 'quote-qts-server-z440-invoice'
    },
    {
      id: 'dev-z440-2',
      name: 'محطة عمل HP Workstation Z440 (الثانوية للـ Docker)',
      category: 'workstation',
      roomId: 'room-5',
      x: 140,
      y: 570,
      spec: 'Intel Xeon E5-2697v4 (18 Cores) • بيئة الاختبارات ومحاكاة السيرفرات',
      status: 'تم الشراء والتوريد الفعلي',
      invoiceId: 'quote-qts-server-z440-invoice'
    },
    {
      id: 'dev-optiplex-3',
      name: '3x أجهزة Dell OptiPlex 3090 + 3 شاشات 22" مدمجة بكاميرا',
      category: 'workstation',
      roomId: 'room-open-hall',
      x: 230,
      y: 240,
      spec: 'شاشات ديل 22 بوصة بكاميرا مدمجة + Core i5',
      status: 'تم الشراء والتوريد الفعلي'
    },
    {
      id: 'dev-staff-17',
      name: 'أسطول أجهزة الموظفين (17 محطة كمبيوتر)',
      category: 'workstation',
      roomId: 'room-open-hall',
      x: 300,
      y: 280,
      spec: 'محطات عمل للموظفين وخدمة العملاء والعمليات',
      status: 'قيد التركيب'
    }
  ], []);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];
  const selectedCamera = cameras.find(c => c.id === selectedCameraId);

  const [showZModal, setShowZModal] = useState(false);
  const [selectedDevDetail, setSelectedDevDetail] = useState<DeviceDetailItem | null>(null);

  // Filtered cameras based on layer
  const visibleCameras = useMemo(() => {
    if (activeLayer === 'workstations' || activeLayer === 'servers_network') return [];
    return cameras;
  }, [activeLayer, cameras]);

  // Filtered devices based on layer
  const visibleDevices = useMemo(() => {
    if (activeLayer === 'cctv') return [];
    if (activeLayer === 'workstations') return devices.filter(d => d.category === 'workstation' || d.category === 'display');
    if (activeLayer === 'servers_network') return devices.filter(d => d.category === 'server' || d.category === 'network');
    return devices;
  }, [activeLayer, devices]);

  // Total metrics
  const totalArea = rooms.reduce((acc, r) => acc + r.areaSqMeters, 0).toFixed(1);
  const totalNetworkDrops = rooms.reduce((acc, r) => acc + r.networkDrops, 0);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200 select-none text-slate-800">
      
      {/* Top Header Card - Daylight Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Building className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                مخطط المقر الفعلي والعتاد الهندسي (Maadi HQ Digital Twin)
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                المعراج - زهراء المعادي
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                مطابق للمخطط المعماري الفعلي
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              محاكاة رقمية للرسم المعماري للمقر (25.91م × 20.94م)، مع التوزيع الدقيق للـ 16 كاميرا مراقبة، راك السيرفرات 27U، سيرفر DELL R640، وأسطول محطات العمل.
            </p>
          </div>
        </div>

        {/* Quick Statistics Badges & Z-Server Action */}
        <div className="flex items-center gap-2 self-start lg:self-center flex-wrap">
          <button
            onClick={() => setShowZModal(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs active:scale-95"
            title="سيرفر محطة Z ودراسة الكور والتراخيص"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>سيرفر الـ Z والكور (16 Cores)</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
            <div className="text-[10px] text-slate-500">إجمالي المكاتب والقاعات</div>
            <div className="text-xs font-mono font-bold text-teal-800">8 غرف رئيسية + WC</div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
            <div className="text-[10px] text-slate-500">كاميرات المراقبة</div>
            <div className="text-xs font-mono font-bold text-amber-800">16 كاميرا (4 صوتية)</div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
            <div className="text-[10px] text-slate-500">نقاط شبكة Cat6</div>
            <div className="text-xs font-mono font-bold text-emerald-800">{totalNetworkDrops} نقطة باتش بانل</div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Layers & Filters */}
      <div className="p-3 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        
        {/* Layer Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-700 ml-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>طبقات العرض:</span>
          </span>

          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>الكل (المقر الموحد)</span>
          </button>

          <button
            onClick={() => setActiveLayer('cctv')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'cctv'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>الكاميرات (16 كاميرا)</span>
          </button>

          <button
            onClick={() => setActiveLayer('servers_network')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'servers_network'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>غرفة السيرفرات والشبكة</span>
          </button>

          <button
            onClick={() => setActiveLayer('workstations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'workstations'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>أجهزة العمل والأسطول</span>
          </button>

          <button
            onClick={() => setActiveLayer('power_safety')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'power_safety'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>الحماية والإنذار والطاقة</span>
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          {activeLayer === 'cctv' || activeLayer === 'all' ? (
            <button
              onClick={() => setShowFovCones(!showFovCones)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 ${
                showFovCones 
                  ? 'bg-amber-50 border-amber-200 text-amber-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
              title="إظهار أو إخفاء زوايا رؤية الكاميرات"
            >
              <span>زوايا الرؤية (FOV)</span>
            </button>
          ) : null}

          {activeLayer === 'servers_network' || activeLayer === 'all' ? (
            <button
              onClick={() => setShowCableTrunks(!showCableTrunks)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 ${
                showCableTrunks 
                  ? 'bg-teal-50 border-teal-200 text-teal-800' 
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
              title="إظهار مسارات الكوابل والترانكات الرئيسية"
            >
              <span>مسار الكوابل</span>
            </button>
          ) : null}

          <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-200">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 transition"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 text-slate-600 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))}
              className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 transition"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 transition"
              title="إعادة ضبط"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Architectural Floorplan SVG (Left) + Inspector Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Floorplan Interactive Canvas (Col 8/12) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-2 sm:p-4 relative overflow-hidden shadow-xs flex flex-col justify-between">
          
          {/* Floorplan Title & Status Overlay */}
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 mb-2 px-2 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-mono text-slate-800 font-bold">25.91m × 20.94m Architectural Blueprint</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-3">
              <span>انقر على أي مكتب أو كاميرا لعرض المواصفات</span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="w-full overflow-auto flex items-center justify-center p-1 sm:p-2 min-h-[460px] sm:min-h-[520px]">
            <div 
              style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-out'
              }}
              className="w-full max-w-[960px] select-none"
            >
              <svg 
                viewBox="0 0 1000 750" 
                className="w-full h-auto drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))' }}
              >
                <defs>
                  {/* Grid pattern */}
                  <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                  </pattern>

                  {/* Gradient for camera FOV cone */}
                  <radialGradient id="cam-fov-audio" cx="0%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="cam-fov-std" cx="0%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>

                  {/* Room Highlight Gradient */}
                  <linearGradient id="room-selected-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.18)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.12)" />
                  </linearGradient>

                  {/* Server Room Pulsing Gradient */}
                  <linearGradient id="server-room-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.22)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.15)" />
                  </linearGradient>
                </defs>

                {/* Blueprint Background */}
                <rect width="1000" height="750" fill="#090d16" rx="16" />
                <rect width="1000" height="750" fill="url(#arch-grid)" rx="16" />

                {/* Outer Perimeter Walls (25.91m x 20.94m boundary) */}
                <rect 
                  x="45" 
                  y="55" 
                  width="930" 
                  height="655" 
                  fill="none" 
                  stroke="#1e293b" 
                  strokeWidth="8" 
                  rx="6"
                />

                {/* Central Corridor Area (الممر الرئيسي) */}
                <rect 
                  x="440" 
                  y="310" 
                  width="530" 
                  height="145" 
                  fill="rgba(30, 41, 59, 0.3)" 
                  stroke="#334155" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                />
                <text 
                  x="630" 
                  y="385" 
                  fill="#64748b" 
                  fontSize="12" 
                  fontWeight="bold" 
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  الممر الداخلي المركزي (Central Corridor)
                </text>

                {/* Cable Runs / Backbone Trunks (Yellow/Cyan dashed line connecting server room to all rooms) */}
                {showCableTrunks && (
                  <g className="cable-backbone opacity-75">
                    {/* Main Backbone Trunk from Server Room (x: 720, y: 640) into Corridor */}
                    <path
                      d="M 720 640 L 720 400 L 450 400 L 250 400 L 250 250"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                    />
                    {/* Branch into Office 1 */}
                    <path d="M 720 400 L 850 400 L 850 310" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Office 2 */}
                    <path d="M 735 400 L 735 310" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Office 3 */}
                    <path d="M 660 400 L 660 310" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Office 4 */}
                    <path d="M 540 400 L 540 310" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Open Hall */}
                    <path d="M 440 400 L 260 400 L 260 330" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2" />
                    {/* Branch into Office 5 (CTO) */}
                    <path d="M 250 400 L 160 400 L 160 455" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2" />
                    {/* Branch into Office 6 */}
                    <path d="M 275 400 L 275 455" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Office 7 */}
                    <path d="M 355 400 L 355 455" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                    {/* Branch into Entrance */}
                    <path d="M 520 400 L 520 455" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                  </g>
                )}

                {/* Render Rooms */}
                {rooms.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  const isServerRoom = room.id === 'room-server';
                  const isEntrance = room.id === 'room-entrance';
                  const isHall = room.id === 'room-open-hall';

                  return (
                    <g 
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className="cursor-pointer transition-all duration-150 group"
                    >
                      {/* Room Wall & Floor */}
                      <rect 
                        x={room.x} 
                        y={room.y} 
                        width={room.w} 
                        height={room.h} 
                        fill={
                          isSelected 
                            ? 'url(#room-selected-grad)' 
                            : isServerRoom
                            ? 'url(#server-room-grad)'
                            : isEntrance
                            ? 'rgba(71, 85, 105, 0.25)'
                            : '#0f172a'
                        }
                        stroke={
                          isSelected 
                            ? '#06b6d4' 
                            : isServerRoom
                            ? '#10b981'
                            : '#334155'
                        }
                        strokeWidth={isSelected ? '3' : '2'}
                        rx="4"
                      />

                      {/* Windows */}
                      {room.windows?.map((win, idx) => (
                        <rect 
                          key={idx}
                          x={win.x}
                          y={win.y}
                          width={win.w}
                          height={win.h}
                          fill="#38bdf8"
                          stroke="#0284c7"
                          strokeWidth="1"
                          opacity="0.8"
                        />
                      ))}

                      {/* Door Indicator & Swing Arc */}
                      <g className="door-symbol">
                        <circle 
                          cx={room.door.x} 
                          cy={room.door.y} 
                          r="4" 
                          fill={isSelected ? '#06b6d4' : '#64748b'} 
                        />
                        <line 
                          x1={room.door.x} 
                          y1={room.door.y} 
                          x2={room.door.side === 'bottom' ? room.door.x + 14 : room.door.x} 
                          y2={room.door.side === 'bottom' ? room.door.y - 14 : room.door.y + 14} 
                          stroke={isSelected ? '#06b6d4' : '#64748b'} 
                          strokeWidth="1.5" 
                        />
                      </g>

                      {/* Room Label Badge & Details */}
                      <g transform={`translate(${room.x + room.w / 2}, ${room.y + room.h / 2})`}>
                        {/* Number Badge */}
                        <circle 
                          cx="0" 
                          cy={isHall ? -25 : -18} 
                          r={isHall ? 16 : 13} 
                          fill={isSelected ? '#06b6d4' : isServerRoom ? '#10b981' : '#1e293b'} 
                          stroke={isSelected ? '#fff' : '#475569'}
                          strokeWidth="1.5"
                        />
                        <text 
                          x="0" 
                          y={isHall ? -20 : -13} 
                          fill="#ffffff" 
                          fontSize={isHall ? '11' : '10'} 
                          fontWeight="bold" 
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {room.number}
                        </text>

                        {/* Room Arabic Name */}
                        <text 
                          x="0" 
                          y={isHall ? 5 : 4} 
                          fill={isSelected ? '#38bdf8' : isServerRoom ? '#34d399' : '#e2e8f0'} 
                          fontSize={isHall ? '13' : room.w < 100 ? '9' : '11'} 
                          fontWeight="bold" 
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {room.w < 100 ? room.name.split(' ')[0] : room.arabicName}
                        </text>

                        {/* Metric Dimension */}
                        <text 
                          x="0" 
                          y={isHall ? 24 : 20} 
                          fill="#94a3b8" 
                          fontSize="9" 
                          fontFamily="monospace" 
                          textAnchor="middle"
                        >
                          {room.dimensionsText} ({room.areaSqMeters}م²)
                        </text>

                        {/* Person in charge if available */}
                        {room.assignedPerson && room.w > 120 && (
                          <text 
                            x="0" 
                            y={isHall ? 42 : 35} 
                            fill="#cbd5e1" 
                            fontSize="8" 
                            fontWeight="500" 
                            textAnchor="middle"
                          >
                            {room.assignedPerson.split(' ')[0]} {room.assignedPerson.split(' ')[1] || ''}
                          </text>
                        )}
                      </g>

                      {/* Entrance Arrow (Green Arrow into Entrance Hall) */}
                      {isEntrance && (
                        <g transform="translate(535, 540)">
                          <polygon points="0,0 20,-10 20,-4 35,-4 35,4 20,4 20,10" fill="#22c55e" stroke="#16a34a" strokeWidth="1" />
                          <text x="42" y="4" fill="#22c55e" fontSize="9" fontWeight="bold">مدخل المقر</text>
                        </g>
                      )}

                      {/* Server Room Highlights: Rack 27U & Dell Server Icon */}
                      {isServerRoom && (
                        <g transform="translate(850, 640)">
                          <rect x="0" y="0" width="36" height="24" fill="#065f46" stroke="#10b981" strokeWidth="1.5" rx="3" />
                          <text x="18" y="15" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">27U RACK</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Render Devices (Workstations, Servers, Displays) */}
                {visibleDevices.map((dev) => {
                  const isServer = dev.category === 'server';
                  const isRack = dev.category === 'network';
                  return (
                    <g 
                      key={dev.id} 
                      transform={`translate(${dev.x}, ${dev.y})`}
                      className="cursor-pointer group"
                    >
                      <circle 
                        cx="0" 
                        cy="0" 
                        r={isServer ? 10 : 8} 
                        fill={isServer ? '#06b6d4' : isRack ? '#f59e0b' : '#6366f1'} 
                        stroke="#ffffff" 
                        strokeWidth="1.5" 
                      />
                      <title>{dev.name} - {dev.spec}</title>
                    </g>
                  );
                })}

                {/* Render CCTV Cameras and their FOV Cones */}
                {visibleCameras.map((cam) => {
                  const isSelected = cam.id === selectedCameraId;
                  const isAudio = cam.type === 'audio_mic';

                  // Calculate FOV polygon coordinates
                  const radAngle = (cam.angle * Math.PI) / 180;
                  const halfFovRad = ((cam.fov / 2) * Math.PI) / 180;
                  const r = cam.range;
                  const x1 = cam.x + r * Math.cos(radAngle - halfFovRad);
                  const y1 = cam.y + r * Math.sin(radAngle - halfFovRad);
                  const x2 = cam.x + r * Math.cos(radAngle + halfFovRad);
                  const y2 = cam.y + r * Math.sin(radAngle + halfFovRad);

                  return (
                    <g 
                      key={cam.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCameraId(cam.id);
                        setSelectedRoomId(cam.roomId);
                      }}
                      className="cursor-pointer group"
                    >
                      {/* FOV Cone Overlay */}
                      {showFovCones && (
                        <path 
                          d={`M ${cam.x} ${cam.y} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                          fill={isAudio ? 'url(#cam-fov-audio)' : 'url(#cam-fov-std)'}
                          opacity={isSelected ? 0.9 : 0.45}
                          className="transition-opacity"
                        />
                      )}

                      {/* Camera Body Icon */}
                      <circle 
                        cx={cam.x} 
                        cy={cam.y} 
                        r={isSelected ? 10 : 7} 
                        fill={isSelected ? '#ffffff' : isAudio ? '#f59e0b' : '#38bdf8'} 
                        stroke={isAudio ? '#b45309' : '#0284c7'} 
                        strokeWidth={isSelected ? 2.5 : 1.5} 
                        className="transition-transform group-hover:scale-125"
                      />

                      {/* Inner Lens Dot */}
                      <circle 
                        cx={cam.x} 
                        cy={cam.y} 
                        r="2.5" 
                        fill="#090d16" 
                      />

                      {/* Camera Code Label Badge */}
                      <rect 
                        x={cam.x - 16} 
                        y={cam.y - 18} 
                        width="32" 
                        height="11" 
                        fill="#0f172a" 
                        stroke={isSelected ? '#38bdf8' : '#334155'} 
                        strokeWidth="1" 
                        rx="3" 
                      />
                      <text 
                        x={cam.x} 
                        y={cam.y - 10} 
                        fill={isAudio ? '#f59e0b' : '#38bdf8'} 
                        fontSize="7" 
                        fontWeight="bold" 
                        textAnchor="middle" 
                        fontFamily="monospace"
                      >
                        {cam.code}
                      </text>
                    </g>
                  );
                })}

                {/* Metric Dimensions Outer Guides */}
                {/* Horizontal dimension top: 25.91m */}
                <line x1="45" y1="35" x2="975" y2="35" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="510" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  عرض المقر الكامل: 25.91 متر (25.91m)
                </text>

                {/* Vertical dimension right: 20.94m */}
                <line x1="985" y1="55" x2="985" y2="710" stroke="#475569" strokeWidth="1" />
                <text 
                  x="985" 
                  y="380" 
                  fill="#94a3b8" 
                  fontSize="11" 
                  fontWeight="bold" 
                  fontFamily="monospace" 
                  textAnchor="middle" 
                  transform="rotate(90, 985, 380)"
                >
                  عمق المقر الكامل: 20.94 متر (20.94m)
                </text>
              </svg>
            </div>
          </div>

          {/* SVG Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] pt-3 border-t border-slate-100 px-2 text-slate-600">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>كاميرا صوتية ميكروفون (4 Audio Mic)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                <span>كاميرا مراقبة فائقة (12 Standard Dome)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>غرفة السيرفرات والـ 27U Rack</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-teal-500 border-t border-dashed border-teal-500"></span>
                <span>ترانكات كوابل الشبكة Cat6</span>
              </span>
            </div>

            <button
              onClick={() => onAskHypatia(`أريد استشارة معمارية وتقنية حول توزيع المكاتب والكاميرات في مقر المعادي: ${selectedRoom.name} - ${selectedRoom.arabicRole}`)}
              className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 transition"
            >
              <span>استشر هيباتيا حول هذه الغرفة</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Inspector Panel (Col 4/12) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Room Inspector Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            
            {/* Room Title */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-mono font-bold text-xs">
                    {selectedRoom.number}
                  </span>
                  <h2 className="text-sm font-black text-slate-900">
                    {selectedRoom.name}
                  </h2>
                </div>
                <p className="text-xs text-teal-800 font-bold mt-0.5">
                  {selectedRoom.arabicName}
                </p>
              </div>

              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold">
                {selectedRoom.areaSqMeters} م²
              </span>
            </div>

            {/* Role & Person */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
                <span className="text-[10px] text-slate-500 block mb-0.5">الوظيفة والمسؤول المخصص:</span>
                <span className="font-bold text-slate-900 block">{selectedRoom.assignedPerson || 'مشترك / خدمات'}</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">{selectedRoom.arabicRole}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-right">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">الأبعاد المعمارية:</span>
                  <span className="font-mono font-bold text-slate-800 text-xs">{selectedRoom.dimensionsText}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">نقاط شبكة Cat6:</span>
                  <span className="font-mono font-bold text-emerald-800 text-xs">{selectedRoom.networkDrops} مخارج RJ45</span>
                </div>
              </div>
            </div>

            {/* Equipment & Hardware in this room */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Server className="w-3.5 h-3.5 text-teal-700" />
                <span>العتاد والأجهزة المسكنة داخل الغرفة:</span>
              </h3>
              <ul className="space-y-1.5">
                {selectedRoom.equipmentList.map((eq, i) => (
                  <li key={i} className="text-[11px] p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CCTV Security in this room */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                <Camera className="w-3.5 h-3.5 text-amber-700" />
                <span>كاميرات المراقبة المغطية للمكتب:</span>
              </h3>
              {selectedRoom.suggestedCameras.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedRoom.suggestedCameras.map((cam, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1">
                        <Camera className="w-3 h-3 text-amber-700" />
                        <span>{cam}</span>
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                        متصل بالـ NVR
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic p-2 rounded-xl bg-slate-50 border border-slate-100">
                  لا توجد كاميرات داخلية (خاصة أو خدمات صحية).
                </p>
              )}
            </div>

            {/* Room Architectural Notes */}
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-[11px] text-teal-900">
              <span className="font-bold block mb-1">ملاحظة هندسية وتنسيقية:</span>
              <span>{selectedRoom.notes}</span>
            </div>

          </div>

          {/* IT Infrastructure & Facilities Operations Panel */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-teal-700" />
                <span>غرفة السيرفرات والشبكة • مؤشرات التشغيل (IT Telemetry)</span>
              </h3>
              <div className="flex items-center gap-1.5">
                {onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('server_rack')}
                    className="px-2.5 py-1 rounded-xl bg-cyan-950 text-cyan-200 border border-cyan-500/40 text-[10px] font-bold hover:bg-cyan-900 transition flex items-center gap-1"
                    title="فتح صفحة جرافيك كابينة الراك 27U ومحتوياته"
                  >
                    <Server className="w-3 h-3 text-cyan-400" />
                    <span>جرافيك الراك 27U</span>
                  </button>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                  Online • Active
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {/* Rack 27U & Server Status */}
              <div 
                onClick={() => setSelectedDevDetail({
                  id: 'dev-dell-r640',
                  name: 'سيرفر DELL PowerEdge R640 Platinum',
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
                })}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-white hover:border-teal-400 hover:shadow-2xs transition cursor-pointer border border-slate-200 space-y-1"
                title="اضغط لعرض كامل تفاصيل السيرفر والمسار"
              >
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Cpu className="w-3.5 h-3.5 text-teal-700" />
                    <span>DELL PowerEdge R640 Platinum</span>
                  </span>
                  <span className="text-[10px] text-teal-800 font-mono font-bold">48 Cores / 64GB</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>كابينة بيرلا 27U عمق 1000 مم • خط فايبر داخلي</span>
                  <span className="text-[10px] text-teal-600 font-bold">تفاصيل ↗</span>
                </div>
              </div>

              {/* Cisco Catalyst 3850 PoE Switch ("الحاجة من جوه الحاجة") */}
              <div 
                onClick={() => setSelectedDevDetail({
                  id: 'dev-cisco-3850',
                  name: 'سويتش سيسكو 48 بورت PoE (Catalyst 3850)',
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
                })}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-white hover:border-teal-400 hover:shadow-2xs transition cursor-pointer border border-slate-200 space-y-1"
                title="اضغط لعرض كامل تفاصيل السويتش والمسار"
              >
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Layers className="w-3.5 h-3.5 text-teal-700" />
                    <span>سويتش سيسكو 48 بورت PoE</span>
                  </span>
                  <span className="text-[10px] text-teal-800 font-mono font-bold">Catalyst 3850</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>توزيع خطوط النت وتغذية 16 كاميرا</span>
                  <span className="text-[10px] text-teal-600 font-bold">11,970 ج.م ↗</span>
                </div>
              </div>

              {/* HP Z Workstation as Server & OPNsense & NVR */}
              <div 
                onClick={() => setShowZModal(true)}
                className="p-2.5 rounded-2xl bg-indigo-50/60 hover:bg-indigo-50 hover:border-indigo-400 transition cursor-pointer border border-indigo-200/90 space-y-1"
                title="اضغط لعرض دراسة تراخيص الكور وخطة الـ Z كـ سيرفر"
              >
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-indigo-950">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                    <span>محطة عمل Z (سيرفر المستودع والكور)</span>
                  </span>
                  <span className="text-[10px] text-indigo-800 font-mono font-bold">16 Cores • 0$ Lic</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>سيرفر التطبيقات الداخلية + فايروول OPNsense</span>
                  <span className="text-[10px] text-indigo-600 font-bold">دراسة الكور ↗</span>
                </div>
              </div>

              {/* Patch Panel & Cabling Status */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Layers className="w-3.5 h-3.5 text-emerald-700" />
                    <span>توزيع نقاط الباتش بانل (Cat6)</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-mono font-bold">36 موصلة / 12 احتياطي</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  تم اختبار المسارات بجهاز I-Pook PK65H وتأريج T568B بنسبة اجتياز 100%
                </div>
              </div>

              {/* Power & Cooling Telemetry */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Zap className="w-3.5 h-3.5 text-amber-700" />
                    <span>الطاقة والتبريد (UPS & Cooling)</span>
                  </span>
                  <span className="text-[10px] text-amber-800 font-mono font-bold">19°C • 45 دقيقة طوارئ</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  تغذية عبر Smart-UPS 3000VA و PDU 8 منافذ سيرفري مع تكييف مزدوج لغرفة السيرفرات
                </div>
              </div>

              {/* CCTV NVR Health */}
              <div 
                onClick={() => setSelectedDevDetail({
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
                })}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-white hover:border-teal-400 hover:shadow-2xs transition cursor-pointer border border-slate-200 space-y-1"
                title="اضغط لعرض كامل تفاصيل شبكة الكاميرات والمسار"
              >
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Camera className="w-3.5 h-3.5 text-teal-700" />
                    <span>تسجيل الكاميرات NVR 16ch</span>
                  </span>
                  <span className="text-[10px] text-teal-800 font-mono font-bold">16/16 نشطة • WD 4TB</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>تسجيل حلقي مستمر 28 يوماً مع صوت</span>
                  <span className="text-[10px] text-teal-600 font-bold">تفاصيل ↗</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span>قفل غرفة السيرفرات:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>بصمة إلكترونية مخصصة لم/ سامح</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Z Workstation & Cores Licensing Modal */}
      <ZWorkstationAndCoresModal
        isOpen={showZModal}
        onClose={() => setShowZModal(false)}
        onAskHypatia={onAskHypatia}
      />

      {/* Hardware Device Deep-Dive Modal ("الحاجة من جوه الحاجة") */}
      <DeviceDetailModal
        device={selectedDevDetail}
        onClose={() => setSelectedDevDetail(null)}
        onAskHypatia={onAskHypatia}
      />

    </div>
  );
};
