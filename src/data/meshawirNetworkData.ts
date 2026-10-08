// ==============================================================================
// منظومة فحص الشبكة والـ Ping والبنية التحتية لشركة مشاوير (مقر المعادي)
// تركز 100% على شبكة وخوادم وسيرفرات وأجهزة مشاوير وخط فايبر برنامج 4B
// ==============================================================================

export interface MeshawirNetworkNode {
  id: string;
  name: string;
  category: 'server' | 'switch' | 'firewall' | 'cctv' | 'telephony' | 'office' | 'isp' | 'cloud';
  ipAddress: string;
  macAddress?: string;
  port?: number;
  rackUnit?: string;
  location: string;
  status: 'online' | 'degraded' | 'offline';
  latencyMs: number;
  packetLoss: number;
  jitterMs: number;
  expectedSlaMs: number;
  description: string;
  responsible: string;
}

export const MESHAWIR_NETWORK_NODES: MeshawirNetworkNode[] = [
  // 1. خوادم وبيئة الإنتاج (Servers)
  {
    id: 'node-dell-r640',
    name: 'سيرفر ديل الرئيسي Dell PowerEdge R640',
    category: 'server',
    ipAddress: '192.168.10.10',
    macAddress: 'F8:B1:56:A1:33:01',
    port: 443,
    rackUnit: 'Rack 24U - Slot 4',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 1.2,
    packetLoss: 0,
    jitterMs: 0.3,
    expectedSlaMs: 5,
    description: 'خادم التشغيل الرئيسي لبيئة العمل والتطبيقات والمحاكاة وقواعد البيانات المحلية',
    responsible: 'م/ سامح يس & م/ عماد الشرقاوي'
  },
  {
    id: 'node-idrac-r640',
    name: 'وحدة التحكم عن بعد iDRAC9 Enterprise',
    category: 'server',
    ipAddress: '192.168.10.9',
    macAddress: 'F8:B1:56:A1:33:02',
    port: 443,
    rackUnit: 'Dell R640 Front/Rear Out-of-band',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 1.4,
    packetLoss: 0,
    jitterMs: 0.4,
    expectedSlaMs: 5,
    description: 'واجهة الإدارة والإقلاع والتحكم في عتاد السيرفر عن بُعد عبر شبكة معزولة',
    responsible: 'م/ عماد الشرقاوي'
  },

  // 2. سويتشات وراوترات المقر (Networking Core)
  {
    id: 'node-cisco-3850',
    name: 'سويتش سيسكو الأساسي Cisco Catalyst 3850-48P',
    category: 'switch',
    ipAddress: '192.168.10.1',
    macAddress: '00:FE:C8:41:8B:00',
    port: 22,
    rackUnit: 'Rack 26U - Slot 2',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 0.8,
    packetLoss: 0,
    jitterMs: 0.2,
    expectedSlaMs: 2,
    description: 'السويتش الموزع لجميع مكاتب وكاميرات وسيرفرات المقر مع دعم تغذية PoE+',
    responsible: 'م/ سامح يس & م/ عماد الشرقاوي'
  },
  {
    id: 'node-fortinet-fw',
    name: 'جدار الحماية وبوابة الإنترنت Fortinet Gateway',
    category: 'firewall',
    ipAddress: '192.168.10.254',
    macAddress: '70:4C:A5:10:E2:80',
    port: 8443,
    rackUnit: 'Rack 18U - Slot 8',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 1.1,
    packetLoss: 0,
    jitterMs: 0.3,
    expectedSlaMs: 4,
    description: 'بوابة الحماية وتشفير الـ VPN وإدارة سرعات الإنترنت وتوزيع الـ DHCP',
    responsible: 'م/ عماد الشرقاوي'
  },

  // 3. الاتصالات وكاميرات المراقبة (Telephony & Security)
  {
    id: 'node-grandstream-pbx',
    name: 'سنترال جراند ستريم Grandstream UCM IP PBX',
    category: 'telephony',
    ipAddress: '192.168.30.1',
    macAddress: '00:0B:82:94:12:3C',
    port: 5060,
    rackUnit: 'Rack 19U - Slot 7',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 1.8,
    packetLoss: 0,
    jitterMs: 0.5,
    expectedSlaMs: 10,
    description: 'سنترال الاتصالات الداخلية للشركة والهواتف المكتبية وقنوات الـ SIP والـ IVR',
    responsible: 'م/ سامح يس'
  },
  {
    id: 'node-hikvision-nvr',
    name: 'مسجل كاميرات المراقبة Hikvision 16-Channel 4K NVR',
    category: 'cctv',
    ipAddress: '192.168.20.100',
    macAddress: 'C4:2F:90:3A:55:12',
    port: 8000,
    rackUnit: 'Rack 20U - Slot 6',
    location: 'غرفة الـ IT المركزية بالمعادي',
    status: 'online',
    latencyMs: 2.1,
    packetLoss: 0,
    jitterMs: 0.6,
    expectedSlaMs: 10,
    description: 'تسجيل ومراقبة 16 كاميرا داخلية وخارجية لمقر المعادي والمخازن والبوابات',
    responsible: 'م/ عماد الشرقاوي & م/ علي'
  },

  // 4. أجهزة وبصمة الحضور والشبكة المكتبية (Office IoT)
  {
    id: 'node-biometric-attendance',
    name: 'جهاز بصمة الحضور والانصراف ZKTeco Biometric',
    category: 'office',
    ipAddress: '192.168.10.88',
    macAddress: '00:17:61:02:88:99',
    port: 4370,
    location: 'مدخل مقر الشركة بالمعادي',
    status: 'online',
    latencyMs: 2.5,
    packetLoss: 0,
    jitterMs: 0.8,
    expectedSlaMs: 15,
    description: 'ساعات تسجيل حضور وانصراف الموظفين والمهندسين وسائقي العمليات',
    responsible: 'أ/ سارة حسن (HR) & م/ سامح'
  },
  {
    id: 'node-wifi-ap-reception',
    name: 'نقطة بث واي فاي الإدارة Ubiquiti UniFi AP 1',
    category: 'office',
    ipAddress: '192.168.10.150',
    macAddress: '74:83:C2:55:40:AA',
    port: 80,
    location: 'صالة الاستقبال والإدارة',
    status: 'online',
    latencyMs: 1.6,
    packetLoss: 0,
    jitterMs: 0.4,
    expectedSlaMs: 8,
    description: 'بث شبكة الواي فاي المؤمنة لأجهزة اللابتوب والهواتف للموظفين والزوار',
    responsible: 'م/ عماد الشرقاوي'
  },

  // 5. خطوط ومزودي الإنترنت لشركة مشاوير (ISP Links)
  {
    id: 'node-isp-we-fiber',
    name: 'بوابة فايبر المصرية للاتصالات WE (الخط الرئيسي)',
    category: 'isp',
    ipAddress: '197.35.40.1',
    port: 80,
    location: 'سنترال المعادي 1 - كابينة الفايبر',
    status: 'online',
    latencyMs: 5.4,
    packetLoss: 0,
    jitterMs: 1.2,
    expectedSlaMs: 15,
    description: 'خط الفايبر الرئيسي فائق السرعة لمقر مشاوير وسيرفرات التطبيقات',
    responsible: 'المصرية للاتصالات WE & م/ عماد'
  },
  {
    id: 'node-isp-orange-backup',
    name: 'خط الطوارئ اللاسلكي 4G Backup (أورنج مصر)',
    category: 'isp',
    ipAddress: '192.168.8.1',
    port: 80,
    location: 'غرفة الـ IT - راوتر الطوارئ',
    status: 'online',
    latencyMs: 18.2,
    packetLoss: 0,
    jitterMs: 3.5,
    expectedSlaMs: 35,
    description: 'خط النسخ الاحتياطي في حال انقطاع كابل الفايبر الأرضي للتبديل التلقائي (Failover)',
    responsible: 'أورنج مصر & م/ عماد'
  },

  // 6. خوادم السحابة وتتبع الأسطول (Cloud & Fleet Endpoints)
  {
    id: 'node-cloud-api',
    name: 'خادم واجهة التطبيقات السحابية Meshawir Cloud API',
    category: 'cloud',
    ipAddress: 'api.mashweer.com.eg',
    port: 443,
    location: 'السحابة الرقمية (Cloud DC)',
    status: 'online',
    latencyMs: 12.8,
    packetLoss: 0,
    jitterMs: 1.8,
    expectedSlaMs: 30,
    description: 'الخادم السحابي المسؤول عن طلبات الرحلات والشحن عبر تطبيقات الهواتف',
    responsible: 'فريق التطوير السحابي & م/ سامح'
  },
  {
    id: 'node-fleet-gps-server',
    name: 'خادم تتبع أجهزة GPS لسيارات أسطول مشاوير',
    category: 'cloud',
    ipAddress: 'gps.mashweer.com.eg',
    port: 5023,
    location: 'سحابة تتبع المركبات والأساطيل',
    status: 'online',
    latencyMs: 15.1,
    packetLoss: 0,
    jitterMs: 2.1,
    expectedSlaMs: 40,
    description: 'استقبال إحداثيات GPS المباشرة من سيارات وفانات ومشاوير المناديب لحظة بلحظة',
    responsible: 'إدارة العمليات والأسطول (أ/ أحمد جمال)'
  },
  {
    id: 'node-dns-google',
    name: 'خادم فحص الإنترنت العام Google Primary DNS',
    category: 'cloud',
    ipAddress: '8.8.8.8',
    port: 53,
    location: 'الشبكة العالمية (Global Internet)',
    status: 'online',
    latencyMs: 14.2,
    packetLoss: 0,
    jitterMs: 1.1,
    expectedSlaMs: 25,
    description: 'فحص الاتصال العام بالإنترنت والتأكد من عدم وجود عزل شبكي خارجي',
    responsible: 'منظومة الفحص الآلي'
  }
];

export interface MeshawirItTicket {
  id: string;
  ticketNumber: string;
  title: string;
  affectedDevice: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
  assignedEngineer: string;
  actionTaken: string;
}

export const MESHAWIR_IT_TICKETS: MeshawirItTicket[] = [
  {
    id: 'ticket-1',
    ticketNumber: 'MSH-IT-2026-081',
    title: 'ضبط نطاق الـ DHCP وعزل كاميرات المراقبة على VLAN 20',
    affectedDevice: 'Cisco Catalyst 3850 & Hikvision NVR',
    priority: 'high',
    status: 'resolved',
    createdAt: '2026-10-06 11:30',
    assignedEngineer: 'م/ عماد الشرقاوي',
    actionTaken: 'تم ضبط الـ Access Ports وتفعيل العزل الأمني وتأكيد تدفق الفيديو بسلاسة.'
  },
  {
    id: 'ticket-2',
    ticketNumber: 'MSH-IT-2026-082',
    title: 'فحص وتثبيت كابل الفايبر الصاعد من كابينة WE إلى راك المعادي',
    affectedDevice: 'المصرية للاتصالات WE Fiber Terminal',
    priority: 'critical',
    status: 'resolved',
    createdAt: '2026-10-06 14:15',
    assignedEngineer: 'م/ عماد الشرقاوي & فني WE',
    actionTaken: 'تم لحام الفايبر بنجاح وقياس الفقد الضوئي (-16.2 dBm) والاتصال مستقر 100%.'
  },
  {
    id: 'ticket-3',
    ticketNumber: 'MSH-IT-2026-083',
    title: 'ربط أجهزة البصمة مع قاعدة بيانات الحضور والانصراف بالمعراج',
    affectedDevice: 'ZKTeco Biometric Clock (192.168.10.88)',
    priority: 'medium',
    status: 'open',
    createdAt: '2026-10-07 09:00',
    assignedEngineer: 'م/ سامح يس',
    actionTaken: 'جاري مزامنة سجلات البصمة وربطها مع جدول الموظفين في سوبابيز.'
  },
  {
    id: 'ticket-4',
    ticketNumber: 'MSH-IT-2026-084',
    title: 'تخصيص تحويلات السنترال الداخلي Grandstream UCM للمكاتب الإدارية',
    affectedDevice: 'Grandstream UCM PBX (192.168.30.1)',
    priority: 'medium',
    status: 'investigating',
    createdAt: '2026-10-07 10:45',
    assignedEngineer: 'م/ سامح يس',
    actionTaken: 'تم إعداد التحويلات من 101 إلى 116 مع قائمة الرد الآلي IVR للمكالمات الواردة.'
  }
];
