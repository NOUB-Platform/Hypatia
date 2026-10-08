// ==============================================================================
// بيانات ومواصفات كابينة الراك المركزية بالمعادي (Perla 27U Datacenter Rack)
// هندسة تفاعلية Data-Driven تدعم تتبع كافة المنافذ (48 Port Switch, Patch Panels,
// NVR 16ch, Grandstream PBX, Firewall, Dell R640 Server)
// ==============================================================================

export interface RackPort {
  portNumber: number;
  label: string;
  status: 'active' | 'inactive' | 'disabled' | 'warning' | 'standby';
  connectedDevice: string;
  deviceType: 'printer' | 'workstation' | 'camera' | 'voip_phone' | 'server' | 'uplink' | 'access_point' | 'switch' | 'firewall' | 'empty';
  userEndpoint: string;
  ipAddress?: string;
  macAddress?: string;
  vlan: string;
  vlanId: number;
  speed: string; // e.g. "1000 Mbps Full Duplex"
  poeWatts?: number; // e.g. 15.4W or 0W
  patchPanelMapping?: {
    panelId: string;
    portNumber: number;
    roomDrop: string;
  };
  notes?: string;
}

export interface RackHardwareDevice {
  id: string;
  name: string;
  arabicName: string;
  model: string;
  manufacturer: string;
  category: 'patch_panel' | 'switch' | 'server' | 'nvr' | 'pbx' | 'firewall' | 'spacer';
  uPositionStart: number; // e.g. 24
  uHeight: number;        // e.g. 1U, 2U
  frontColor: string;
  specs: string[];
  powerWatts: number;
  tempCelsius: number;
  status: 'online' | 'standby' | 'configuring';
  invoiceInfo: string;
  responsible: string;
  ports: RackPort[];
  extraMetadata?: {
    ipAddress?: string;
    macAddress?: string;
    firmware?: string;
    serialNumber?: string;
    managementUrl?: string;
    [key: string]: any;
  };
}

// ------------------------------------------------------------------------------
// 1. PATCH PANEL 1 (24 Ports) - علوي (Top Network Distribution)
// ------------------------------------------------------------------------------
const PATCH_PANEL_1_PORTS: RackPort[] = Array.from({ length: 24 }).map((_, idx) => {
  const pNum = idx + 1;
  if (pNum === 7) {
    return {
      portNumber: 7,
      label: 'PP1-P07',
      status: 'active',
      connectedDevice: 'طابعة ليزر شبكية HP LaserJet Pro M404n',
      deviceType: 'printer',
      userEndpoint: 'مكتب 5 (مكتب CTO وم/ سامح ياسين وم/ عماد)',
      ipAddress: '192.168.10.45',
      macAddress: '3C:D9:2B:44:17:8A',
      vlan: 'VLAN 10 - الإدارة والموظفين (Staff & Admin)',
      vlanId: 10,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: 7,
        roomDrop: 'مكتب 5 - حائط رقم A3 بجوار مكتب م/ سامح'
      },
      notes: 'نقطة طابعة التقارير والعقود والخرائط التنفيذية'
    };
  }

  if (pNum <= 6) {
    const workstations = [
      'محطة عمل م/ سامح ياسين (Dell Precision CTO)',
      'محطة عمل م/ عماد الشرقاوي (ThinkStation Pro)',
      'محطة المستشار القانوني أ/ محمد مصطفى',
      'محطة المدير المالي أ/ هاني',
      'محطة مدير التشغيل أ/ موفق',
      'محطة مدير الأساطيل أ/ عمرو'
    ];
    const macs = [
      'D4:5D:64:11:02:FA',
      'F8:75:A4:99:31:BC',
      '2C:F0:5D:88:12:44',
      '44:85:00:22:98:AA',
      '90:E8:68:55:71:01',
      '74:86:7A:33:45:90'
    ];
    return {
      portNumber: pNum,
      label: `PP1-P${String(pNum).padStart(2, '0')}`,
      status: 'active',
      connectedDevice: workstations[pNum - 1],
      deviceType: 'workstation',
      userEndpoint: `مكتب ${pNum === 1 || pNum === 2 ? '5 (التقنية)' : pNum === 3 ? '4 (القانوني)' : pNum === 4 ? '3 (المالي)' : '2 (التشغيل)'}`,
      ipAddress: `192.168.10.${10 + pNum}`,
      macAddress: macs[pNum - 1],
      vlan: 'VLAN 10 - الإدارة والموظفين (Staff & Admin)',
      vlanId: 10,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `مكتب ${pNum} - نقطة عمل رئيسية`
      }
    };
  }

  if (pNum <= 12) {
    return {
      portNumber: pNum,
      label: `PP1-P${String(pNum).padStart(2, '0')}`,
      status: 'active',
      connectedDevice: `جهاز كول سنتر المعادي رقم ${pNum - 6} (Dell OptiPlex)`,
      deviceType: 'workstation',
      userEndpoint: 'صالة خدمة العملاء والدعم الفني (مكتب 1)',
      ipAddress: `192.168.10.${50 + pNum}`,
      macAddress: `00:1A:2B:3C:4D:${String(pNum + 20).padStart(2, '0')}`,
      vlan: 'VLAN 15 - الكول سنتر وخدمة العملاء',
      vlanId: 15,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `صالة الكول سنتر - ديسك ${pNum - 6}`
      }
    };
  }

  if (pNum <= 18) {
    return {
      portNumber: pNum,
      label: `PP1-P${String(pNum).padStart(2, '0')}`,
      status: 'active',
      connectedDevice: `تليفون IP مكتبي Grandstream GRP2614 رقم ${pNum - 12}`,
      deviceType: 'voip_phone',
      userEndpoint: `تحويلة هاتفية رقم 10${pNum - 12}`,
      ipAddress: `192.168.30.${pNum}`,
      macAddress: `C0:74:AD:12:00:${String(pNum).padStart(2, '0')}`,
      vlan: 'VLAN 30 - شبكة الاتصالات الصوتية VoIP',
      vlanId: 30,
      speed: '100 Mbps Full Duplex',
      poeWatts: 6.5,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `مكاتب المقر - نقطة اتصال صوتي ${pNum - 12}`
      }
    };
  }

  return {
    portNumber: pNum,
    label: `PP1-P${String(pNum).padStart(2, '0')}`,
    status: pNum <= 20 ? 'active' : 'inactive',
    connectedDevice: pNum <= 20 ? `نقطة شبكية احتياطية قاعة الاجتماعات ${pNum - 18}` : 'منفذ شاغر للتوسع المستقبلي',
    deviceType: pNum <= 20 ? 'workstation' : 'empty',
    userEndpoint: pNum <= 20 ? 'قاعة الاجتماعات الرئيسية (Meeting Hall)' : 'غير متصل',
    ipAddress: pNum <= 20 ? `192.168.10.${70 + pNum}` : undefined,
    vlan: 'VLAN 10 - الإدارة والموظفين',
    vlanId: 10,
    speed: pNum <= 20 ? '1000 Mbps Full Duplex' : 'Disconnected',
    poeWatts: 0,
    patchPanelMapping: {
      panelId: 'patch-panel-1',
      portNumber: pNum,
      roomDrop: `قاعة الاجتماعات - فيش أرضي #${pNum}`
    }
  };
});

// ------------------------------------------------------------------------------
// 2. CISCO CATALYST 3850 48-PORT SWITCH (العصب الشبكي المركزي)
// ------------------------------------------------------------------------------
const CISCO_SWITCH_48_PORTS: RackPort[] = Array.from({ length: 48 }).map((_, idx) => {
  const pNum = idx + 1;

  // Port 7: THE SPECIFIC USER EXAMPLE
  if (pNum === 7) {
    return {
      portNumber: 7,
      label: 'Gi1/0/7',
      status: 'active',
      connectedDevice: 'طابعة ليزر شبكية HP LaserJet Pro M404n',
      deviceType: 'printer',
      userEndpoint: 'مكتب 5 (مكتب CTO وم/ سامح ياسين وم/ عماد)',
      ipAddress: '192.168.10.45',
      macAddress: '3C:D9:2B:44:17:8A',
      vlan: 'VLAN 10 - Staff & Admin',
      vlanId: 10,
      speed: '1000 Mbps Full Duplex (Auto-Negotiated)',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: 7,
        roomDrop: 'مكتب 5 - دروب A3 (بجوار مكتب CTO)'
      },
      notes: 'طابعة مركزية معتمدة لطباعة بوالص الشحن والعقود والتقارير الفنية'
    };
  }

  // Ports 1-6: Executive Desks
  if (pNum <= 6) {
    const devices = [
      { name: 'محطة م/ سامح ياسين (CTO Precision 5820)', user: 'م/ سامح ياسين - رئيس قطاع التكنولوجيا', ip: '192.168.10.11', mac: 'D4:5D:64:11:02:FA' },
      { name: 'محطة م/ عماد الشرقاوي (ThinkStation P520)', user: 'م/ عماد الشرقاوي - الاستشاري الهندسي الأول', ip: '192.168.10.12', mac: 'F8:75:A4:99:31:BC' },
      { name: 'كمبيوتر الشؤون القانونية', user: 'المستشار القانوني أ/ محمد مصطفى', ip: '192.168.10.13', mac: '2C:F0:5D:88:12:44' },
      { name: 'كمبيوتر الإدارة المالية والحسابات', user: 'المدير المالي أ/ هاني', ip: '192.168.10.14', mac: '44:85:00:22:98:AA' },
      { name: 'كمبيوتر إدارة العمليات الميدانية', user: 'أ/ موفق - مدير العمليات', ip: '192.168.10.15', mac: '90:E8:68:55:71:01' },
      { name: 'كمبيوتر إدارة أساطيل الكباتن', user: 'أ/ عمرو - مسؤول الأساطيل', ip: '192.168.10.16', mac: '74:86:7A:33:45:90' }
    ];
    const dev = devices[pNum - 1];
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: dev.name,
      deviceType: 'workstation',
      userEndpoint: dev.user,
      ipAddress: dev.ip,
      macAddress: dev.mac,
      vlan: 'VLAN 10 - Staff & Admin',
      vlanId: 10,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `غرفة مكاتب المقر - نقطة #${pNum}`
      }
    };
  }

  // Ports 8-12: Call Center Workstations
  if (pNum <= 12) {
    const cId = pNum - 7;
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: `كمبيوتر كول سنتر خدمة العملاء #${cId}`,
      deviceType: 'workstation',
      userEndpoint: `طاقم الدعم الفني والشكاوى - مقعد #${cId}`,
      ipAddress: `192.168.15.${20 + cId}`,
      macAddress: `50:7B:9D:3A:41:${String(10 + cId).padStart(2, '0')}`,
      vlan: 'VLAN 15 - Call Center',
      vlanId: 15,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `صالة الكول سنتر - مقعد ${cId}`
      }
    };
  }

  // Ports 13-16: Grandstream IP PBX & VoIP phones
  if (pNum <= 16) {
    const vId = pNum - 12;
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: pNum === 13 ? 'سنترال جراند ستريم Grandstream UCM6304 (LAN Interface)' : `تليفون IP مكتبي Grandstream GRP2614 تحويلة #${100 + vId}`,
      deviceType: pNum === 13 ? 'switch' : 'voip_phone',
      userEndpoint: pNum === 13 ? 'حاضنة الاتصالات والسنترال المركزي' : `مكتب ${vId} - اتصال صوتي مباشر`,
      ipAddress: pNum === 13 ? '192.168.30.1' : `192.168.30.${10 + vId}`,
      macAddress: `C0:74:AD:44:88:${String(20 + pNum).padStart(2, '0')}`,
      vlan: 'VLAN 30 - VoIP PBX Network',
      vlanId: 30,
      speed: '1000 Mbps Full Duplex',
      poeWatts: pNum === 13 ? 0 : 8.4,
      patchPanelMapping: {
        panelId: 'patch-panel-1',
        portNumber: pNum,
        roomDrop: `نقطة اتصالات صوتية #${vId}`
      }
    };
  }

  // Ports 17-24: 16-Channel NVR Trunk & Critical IP Cameras PoE
  if (pNum <= 24) {
    const camIdx = pNum - 16;
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: pNum === 17 ? 'جهاز تسجيل الكاميرات NVR 16 Channel (LAN1 Uplink)' : `كاميرا مراقبة IP بدقة 5MP - موقع #${camIdx}`,
      deviceType: pNum === 17 ? 'server' : 'camera',
      userEndpoint: pNum === 17 ? 'غرفة السيرفرات - NVR 16ch Mainboard' : `موقع الكاميرا #${camIdx} بالمقر`,
      ipAddress: pNum === 17 ? '192.168.20.100' : `192.168.20.${10 + camIdx}`,
      macAddress: `BC:54:51:77:AA:${String(pNum).padStart(2, '0')}`,
      vlan: 'VLAN 20 - CCTV Surveillance',
      vlanId: 20,
      speed: '1000 Mbps Full Duplex',
      poeWatts: pNum === 17 ? 0 : 12.8,
      patchPanelMapping: {
        panelId: 'patch-panel-2',
        portNumber: camIdx,
        roomDrop: `سقف معلق - مسار الكاميرا #${camIdx}`
      }
    };
  }

  // Ports 25-28: Dell PowerEdge R640 Server LACP Port-Channel (Team of 4x 1Gbps)
  if (pNum <= 28) {
    const nicId = pNum - 24;
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: `سيرفر ديل بلاتينيوم Dell PowerEdge R640 - NIC Port #${nicId} (LACP Port-Channel 1)`,
      deviceType: 'server',
      userEndpoint: 'سيرفر مشاوير الإنتاجي وقواعد بيانات 4B',
      ipAddress: '192.168.10.10',
      macAddress: `D8:9E:F3:11:42:0${nicId}`,
      vlan: 'VLAN 50 - Core Servers & Database',
      vlanId: 50,
      speed: '1000 Mbps Full Duplex (Bonded 4Gbps Aggregate)',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-2',
        portNumber: 8 + nicId,
        roomDrop: 'كابينة الراك - سيرفر ديل R640 المنفذ الخلفي'
      },
      notes: 'مجموعة تجميع منافذ LACP مجمعة لمنع عنق الزجاجة وتأمين الفشل التلقائي'
    };
  }

  // Ports 29-30: Dell iDRAC9 Enterprise Remote Management
  if (pNum === 29) {
    return {
      portNumber: 29,
      label: 'Gi1/0/29',
      status: 'active',
      connectedDevice: 'سيرفر ديل R640 - كارت إدارة ريموت iDRAC9 Enterprise Dedicated Port',
      deviceType: 'server',
      userEndpoint: 'وحدة التحكم وإعادة التشغيل عن بعد لم/ سامح وم/ عماد',
      ipAddress: '192.168.10.9',
      macAddress: 'D8:9E:F3:FF:EE:01',
      vlan: 'VLAN 99 - Out-of-Band Management (OOB)',
      vlanId: 99,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      patchPanelMapping: {
        panelId: 'patch-panel-2',
        portNumber: 13,
        roomDrop: 'كابينة الراك - منفذ iDRAC المستقل'
      }
    };
  }

  // Ports 30-32: HP Z440 Workstation / Proxmox VE Server
  if (pNum <= 32) {
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: 'محطة العمل وسيرفر المستودع HP Z440 (حاضنة Proxmox VE)',
      deviceType: 'server',
      userEndpoint: 'حاوية Docker & OPNsense & NVR Staging',
      ipAddress: `192.168.10.${14 + (pNum - 30)}`,
      macAddress: `70:5A:0F:82:19:D${pNum - 30}`,
      vlan: 'VLAN 50 - Core Servers',
      vlanId: 50,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0
    };
  }

  // Ports 33-36: Enterprise Firewall Interfaces (OPNsense / Netgate Core)
  if (pNum <= 36) {
    const ifaceName = pNum === 33 ? 'LAN Core Trunk' : pNum === 34 ? 'DMZ Interface' : pNum === 35 ? 'Guest VLAN' : 'CCTV Isolator';
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: `الجدار الناري Firewall Enterprise Gateway - ${ifaceName}`,
      deviceType: 'firewall',
      userEndpoint: 'بوابة الحماية وتأمين الشبكة وفصل الـ VLANs',
      ipAddress: `192.168.10.${1 + (pNum - 33)}`,
      macAddress: `00:08:A2:09:77:A${pNum - 33}`,
      vlan: 'All VLANs (802.1Q Dot1Q Trunk)',
      vlanId: 1,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0,
      notes: 'الترنك الأساسي لجدار الحماية لتطبيق سياسات العزل وحظر الاختراق'
    };
  }

  // Ports 37-40: Ceiling Cisco Wi-Fi Access Points (PoE+)
  if (pNum <= 40) {
    const apId = pNum - 36;
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'active',
      connectedDevice: `أكسس بوينت واي فاي سيسكو سقفية Cisco Aironet AP #${apId}`,
      deviceType: 'access_point',
      userEndpoint: `تغطية الوايرلس - زون #${apId} بالمقر`,
      ipAddress: `192.168.40.${10 + apId}`,
      macAddress: `70:6D:15:33:44:${String(10 + apId).padStart(2, '0')}`,
      vlan: 'VLAN 40 - Corporate & Guest Wi-Fi',
      vlanId: 40,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 15.4,
      patchPanelMapping: {
        panelId: 'patch-panel-2',
        portNumber: 16 + apId,
        roomDrop: `سقف معلق - منتصف صالة المقر #${apId}`
      }
    };
  }

  // Ports 41-44: Spare Active Ports
  if (pNum <= 44) {
    return {
      portNumber: pNum,
      label: `Gi1/0/${pNum}`,
      status: 'inactive',
      connectedDevice: 'منفذ شبكي شاغر وجاهز للتوصيل',
      deviceType: 'empty',
      userEndpoint: 'غرفة السيرفرات - كابينة الراك',
      vlan: 'VLAN 10 - Staff & Admin',
      vlanId: 10,
      speed: 'Down',
      poeWatts: 0
    };
  }

  // Ports 45-48: Specialized Dedicated Telecom & 4B System Leased Lines
  if (pNum === 45) {
    return {
      portNumber: 45,
      label: 'Gi1/0/45',
      status: 'active',
      connectedDevice: 'خط الربط المباشر لبرنامج 4B (4B Primary Dedicated Link - WE)',
      deviceType: 'uplink',
      userEndpoint: 'سنترال المعادي ↔ خوادم برنامج 4B المركزية (10.10.40.10)',
      ipAddress: '10.10.40.10',
      macAddress: '00:90:7F:88:51:45',
      vlan: 'VLAN 91 - 4B System Core Circuit',
      vlanId: 91,
      speed: '1000 Mbps Full Duplex (Clear-Channel)',
      poeWatts: 0,
      notes: 'دائرة رقم TE-CAI-4B-PRI-4821 المخصصة لربط ومزامنة بيانات برنامج 4B لشركة مشاوير بمقر المعادي'
    };
  }

  if (pNum === 46) {
    return {
      portNumber: 46,
      label: 'Gi1/0/46',
      status: 'standby',
      connectedDevice: 'خط طوارئ برنامج 4B الاحتياطي (4B DR Backup Link - Orange)',
      deviceType: 'uplink',
      userEndpoint: 'مسار المعادي اللاسلكي البديل ↔ خوادم برنامج 4B الاحتياطية (10.10.40.11)',
      ipAddress: '10.10.40.11',
      macAddress: '00:90:7F:88:51:46',
      vlan: 'VLAN 92 - 4B DR Standby Circuit',
      vlanId: 92,
      speed: '1000 Mbps Standby (Failover)',
      poeWatts: 0,
      notes: 'دائرة رقم OR-CAI-4B-DR-4822 تعمل بنمط Standby للتحويل الفوري لبرنامج 4B في حال انقطاع المسار الأساسي'
    };
  }

  if (pNum === 47) {
    return {
      portNumber: 47,
      label: 'Gi1/0/47',
      status: 'active',
      connectedDevice: 'خادم بث الأسعار اللحظية لمصر لنظم المعلومات (MIST Market Feed)',
      deviceType: 'uplink',
      userEndpoint: 'سنترال باب اللوق / القرية الذكية ↔ خادم بث MIST (196.205.112.55:8080)',
      ipAddress: '196.205.112.55',
      macAddress: '00:90:7F:88:51:47',
      vlan: 'VLAN 93 - MIST Ticker Multicast Feed',
      vlanId: 93,
      speed: '1000 Mbps Full Duplex (High-Throughput)',
      poeWatts: 0,
      notes: 'دائرة رقم WE-LL-MIST-METRO-109 لبث الأسعار Tick-by-Tick وصفقات السوق ومؤشرات EGX30 لحظياً'
    };
  }

  // Port 48: WE Central Telecom Fiber Uplinks & Gateway L3VPN
  return {
    portNumber: 48,
    label: 'Gi1/0/48',
    status: 'active',
    connectedDevice: 'خط تجميع فايبر المصرية للاتصالات WE (24 Mbps L3VPN Hub)',
    deviceType: 'uplink',
    userEndpoint: 'سنترال المعادي ↔ مركز بيانات القرية الذكية (Smart Village Cloud)',
    ipAddress: '10.50.10.1',
    macAddress: '00:90:7F:88:51:48',
    vlan: 'VLAN 90 - WE Telecom L3VPN Metro Link',
    vlanId: 90,
    speed: '1000 Mbps Full Duplex (Aggregated Trunk)',
    poeWatts: 0,
    notes: 'خط الربط البصري التجميعي لمنظومة مشاوير ومقر المعادي المعتمد في أمر توريد المصرية للاتصالات (360 ألف ج.م)'
  };
});

// ------------------------------------------------------------------------------
// 3. PATCH PANEL 2 (24 Ports) - سفلي (Lower Network & CCTV / Server Drops)
// ------------------------------------------------------------------------------
const PATCH_PANEL_2_PORTS: RackPort[] = Array.from({ length: 24 }).map((_, idx) => {
  const pNum = idx + 1;
  if (pNum <= 16) {
    return {
      portNumber: pNum,
      label: `PP2-P${String(pNum).padStart(2, '0')}`,
      status: 'active',
      connectedDevice: `توصيلة مسار كاميرا المراقبة #${pNum} (Cat6 UTP Direct)`,
      deviceType: 'camera',
      userEndpoint: `نظام تسجيل الكاميرات NVR - القناة #${pNum}`,
      ipAddress: `192.168.20.${10 + pNum}`,
      macAddress: `BC:54:51:77:AA:${String(pNum).padStart(2, '0')}`,
      vlan: 'VLAN 20 - CCTV Surveillance',
      vlanId: 20,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 12.8,
      patchPanelMapping: {
        panelId: 'patch-panel-2',
        portNumber: pNum,
        roomDrop: `موقع الكاميرا #${pNum} بالمعادي`
      }
    };
  }

  if (pNum <= 20) {
    const sPort = pNum - 16;
    return {
      portNumber: pNum,
      label: `PP2-P${String(pNum).padStart(2, '0')}`,
      status: 'active',
      connectedDevice: `سيرفر ديل R640 - كارت الشبكة المنفذ #${sPort}`,
      deviceType: 'server',
      userEndpoint: 'خادم الإنتاج المركزي لمنظومة 4B',
      ipAddress: '192.168.10.10',
      vlan: 'VLAN 50 - Core Servers',
      vlanId: 50,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0
    };
  }

  return {
    portNumber: pNum,
    label: `PP2-P${String(pNum).padStart(2, '0')}`,
    status: 'inactive',
    connectedDevice: 'منفذ شاغر للربط البيني وتوسعات المقر',
    deviceType: 'empty',
    userEndpoint: 'غير متصل',
    vlan: 'VLAN 10',
    vlanId: 10,
    speed: 'Down',
    poeWatts: 0
  };
});

// ------------------------------------------------------------------------------
// 4. DELL POWEREDGE R640 SERVER (1U Enterprise Server)
// ------------------------------------------------------------------------------
const DELL_R640_INTERFACES: RackPort[] = [
  {
    portNumber: 1,
    label: 'iDRAC9',
    status: 'active',
    connectedDevice: 'iDRAC9 Enterprise Remote Management Card',
    deviceType: 'server',
    userEndpoint: 'بوابة الإدارة المستقلة خارج النطاق (OOB Management)',
    ipAddress: '192.168.10.9',
    macAddress: 'D8:9E:F3:FF:EE:01',
    vlan: 'VLAN 99 - Out-of-Band Management',
    vlanId: 99,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0,
    notes: 'تحكم كامل بالباور والحرارة وكونسول KVM الافتراضي عن بعد'
  },
  {
    portNumber: 2,
    label: 'NIC-1 (LACP)',
    status: 'active',
    connectedDevice: 'Cisco 3850 Port Gi1/0/25 (Bond 1/4)',
    deviceType: 'switch',
    userEndpoint: 'حركة مرور بيانات قواعد البيانات Supabase و PostgreSQL',
    ipAddress: '192.168.10.10',
    macAddress: 'D8:9E:F3:11:42:01',
    vlan: 'VLAN 50 - Core Servers',
    vlanId: 50,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 3,
    label: 'NIC-2 (LACP)',
    status: 'active',
    connectedDevice: 'Cisco 3850 Port Gi1/0/26 (Bond 2/4)',
    deviceType: 'switch',
    userEndpoint: 'حركة مرور خوادم API و Node.js لتطبيق فور بي 4B',
    ipAddress: '192.168.10.10',
    macAddress: 'D8:9E:F3:11:42:02',
    vlan: 'VLAN 50 - Core Servers',
    vlanId: 50,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 4,
    label: 'NIC-3 (LACP)',
    status: 'active',
    connectedDevice: 'Cisco 3850 Port Gi1/0/27 (Bond 3/4)',
    deviceType: 'switch',
    userEndpoint: 'حركة مرور نظم تتبع الكباتن GPS اللحظية عبر WebSockets',
    ipAddress: '192.168.10.10',
    macAddress: 'D8:9E:F3:11:42:03',
    vlan: 'VLAN 50 - Core Servers',
    vlanId: 50,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 5,
    label: 'NIC-4 (LACP)',
    status: 'active',
    connectedDevice: 'Cisco 3850 Port Gi1/0/28 (Bond 4/4)',
    deviceType: 'switch',
    userEndpoint: 'النسخ الاحتياطي السحابي اليومي ومزامنة Google Drive',
    ipAddress: '192.168.10.10',
    macAddress: 'D8:9E:F3:11:42:04',
    vlan: 'VLAN 50 - Core Servers',
    vlanId: 50,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  }
];

// ------------------------------------------------------------------------------
// 5. 16-CHANNEL NVR (منظومة كاميرات المراقبة)
// ------------------------------------------------------------------------------
const NVR_16_PORTS: RackPort[] = Array.from({ length: 16 }).map((_, idx) => {
  const pNum = idx + 1;
  const camNames = [
    'CAM-01 (مكتب CTO وم/ سامح - تسجيل صوت وصورة بدقة 5MP)',
    'CAM-02 (مكتب الاستشاري م/ عماد - صوت وصورة 5MP)',
    'CAM-03 (مكتب الإدارة المالية والحسابات - صوت وصورة 5MP)',
    'CAM-04 (مكتب الشؤون القانونية - صوت وصورة 5MP)',
    'CAM-05 (صالة خدمة العملاء والكول سنتر - وايد أنجل)',
    'CAM-06 (مكتب إدارة العمليات والأساطيل)',
    'CAM-07 (المدخل الرئيسي وباب الدخول الإلكتروني)',
    'CAM-08 (ممر المكاتب الرئيسي والموزع الداخلي)',
    'CAM-09 (منطقة الاستقبال والانتظار العامة)',
    'CAM-10 (قاعة الاجتماعات والعروض التنفيذية)',
    'CAM-11 (غرفة السيرفرات والـ IT - فحص كابينة الراك 27U)',
    'CAM-12 (منطقة لوحات الكهرباء والقواطع الرئيسية)',
    'CAM-13 (مخرج الطوارئ والسلالم الخلفية)',
    'CAM-14 (مواقف السيارات وبوابة المبنى الخارجية)',
    'CAM-15 (واجهة المقر الخارجية لشارع النصر)',
    'CAM-16 (السطح ومسار كابل الفايبر الأرضي للشارع)'
  ];

  return {
    portNumber: pNum,
    label: `CH-${String(pNum).padStart(2, '0')}`,
    status: 'active',
    connectedDevice: camNames[pNum - 1],
    deviceType: 'camera',
    userEndpoint: `كاميرا مراقبة IP بدقة 5MP (${pNum <= 4 ? 'مدعمة بميكروفون صوتي' : 'فائقة الوضوح'})`,
    ipAddress: `192.168.20.${10 + pNum}`,
    macAddress: `BC:54:51:77:AA:${String(pNum).padStart(2, '0')}`,
    vlan: 'VLAN 20 - CCTV Surveillance',
    vlanId: 20,
    speed: '100 Mbps Full Duplex',
    poeWatts: pNum <= 4 ? 14.2 : 11.5,
    patchPanelMapping: {
      panelId: 'patch-panel-2',
      portNumber: pNum,
      roomDrop: `نقطة الكاميرا #${pNum}`
    },
    notes: 'تسجيل مستمر 24/7 بدقة 5MP مع تخزين حلقي 30 يوماً على قرص WD Purple 4TB'
  };
});

// ------------------------------------------------------------------------------
// 6. GRANDSTREAM IP PBX / CENTRAL (سنترال المقر الذكي)
// ------------------------------------------------------------------------------
const GRANDSTREAM_PBX_PORTS: RackPort[] = [
  {
    portNumber: 1,
    label: 'WAN',
    status: 'active',
    connectedDevice: 'Firewall VoIP Interface (OPNsense VLAN 30)',
    deviceType: 'firewall',
    userEndpoint: 'بوابة الاتصال بخطوط SIP Trunk ومكالمات الإنترنت',
    ipAddress: '192.168.30.2',
    macAddress: 'C0:74:AD:44:88:01',
    vlan: 'VLAN 30 - VoIP PBX Network',
    vlanId: 30,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 2,
    label: 'LAN',
    status: 'active',
    connectedDevice: 'Cisco Switch Port Gi1/0/13',
    deviceType: 'switch',
    userEndpoint: 'الشبكة المحلية لتغذية هواتف الـ IP المكتبي بالمقر',
    ipAddress: '192.168.30.1',
    macAddress: 'C0:74:AD:44:88:02',
    vlan: 'VLAN 30 - VoIP PBX Network',
    vlanId: 30,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 3,
    label: 'FXO-1',
    status: 'active',
    connectedDevice: 'خط أرضي سنترال المعادي رقم 02-2517xxxx (الخط الرئيسي 1)',
    deviceType: 'uplink',
    userEndpoint: 'استقبال مكالمات العملاء والاستفسارات العامة',
    vlan: 'Analog PSTN',
    vlanId: 0,
    speed: 'PSTN Line',
    poeWatts: 0
  },
  {
    portNumber: 4,
    label: 'FXO-2',
    status: 'active',
    connectedDevice: 'خط أرضي سنترال المعادي رقم 02-2517xxxx (الخط الرئيسي 2)',
    deviceType: 'uplink',
    userEndpoint: 'خط إدارة العمليات وحجز الكباتن',
    vlan: 'Analog PSTN',
    vlanId: 0,
    speed: 'PSTN Line',
    poeWatts: 0
  },
  {
    portNumber: 5,
    label: 'FXS-1',
    status: 'active',
    connectedDevice: 'تليفون أنالوج مكتب الاستقبال والفاكس',
    deviceType: 'voip_phone',
    userEndpoint: 'الاستقبال المباشر (تحويلة 100)',
    ipAddress: 'Extension 100',
    vlan: 'VLAN 30',
    vlanId: 30,
    speed: 'Analog Loop',
    poeWatts: 0
  },
  {
    portNumber: 6,
    label: 'FXS-2',
    status: 'inactive',
    connectedDevice: 'منفذ أنالوج احتياطي لخط الطوارئ',
    deviceType: 'empty',
    userEndpoint: 'غير متصل',
    vlan: 'Analog Loop',
    vlanId: 0,
    speed: 'Analog Loop',
    poeWatts: 0
  }
];

// ------------------------------------------------------------------------------
// 7. ENTERPRISE FIREWALL (جدار الحماية OPNsense / Netgate)
// ------------------------------------------------------------------------------
const FIREWALL_INTERFACES: RackPort[] = [
  {
    portNumber: 1,
    label: 'WAN 1 (Fiber)',
    status: 'active',
    connectedDevice: 'خط تجميع فايبر WE سنترال المعادي (24 Mbps L3VPN Dedicated)',
    deviceType: 'uplink',
    userEndpoint: 'بوابة الإنترنت الحكومية والمشفرة مع مركز بيانات القرية الذكية',
    ipAddress: '10.240.18.2',
    macAddress: '00:08:A2:09:77:01',
    vlan: 'VLAN 90 - WE Telecom Gateway',
    vlanId: 90,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0,
    notes: 'مزود بحماية F5 WAF وجدار ناري مشفر مع وزارة النقل LTRA'
  },
  {
    portNumber: 2,
    label: 'WAN 2 (Backup)',
    status: 'standby',
    connectedDevice: 'خط راوتر 4G/LTE النسخ الاحتياطي في حال انقطاع الفايبر',
    deviceType: 'uplink',
    userEndpoint: 'بوابة الطوارئ المستقلة (Failover Route)',
    ipAddress: '192.168.8.1',
    macAddress: '00:08:A2:09:77:02',
    vlan: 'WAN Backup',
    vlanId: 91,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 3,
    label: 'LAN Core (Trunk)',
    status: 'active',
    connectedDevice: 'Cisco Catalyst 3850 Switch (Port Gi1/0/33)',
    deviceType: 'switch',
    userEndpoint: 'ترنك الشبكة المركزية وعزل الـ VLANs للمقر',
    ipAddress: '192.168.10.1',
    macAddress: '00:08:A2:09:77:03',
    vlan: 'Dot1Q 802.1Q (VLANs 10, 15, 20, 30, 50, 99)',
    vlanId: 1,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 4,
    label: 'DMZ (Servers)',
    status: 'active',
    connectedDevice: 'بيئة الاستضافة المباشرة والتطبيقات العامة (Staging/API)',
    deviceType: 'server',
    userEndpoint: 'بوابة استضافة خوادم 4B الخارجية المعزولة',
    ipAddress: '192.168.100.1',
    macAddress: '00:08:A2:09:77:04',
    vlan: 'VLAN 100 - DMZ Isolated Network',
    vlanId: 100,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  },
  {
    portNumber: 5,
    label: 'MGMT / OOB',
    status: 'active',
    connectedDevice: 'كمبيوتر م/ سامح ياسين (CTO Secure Console)',
    deviceType: 'workstation',
    userEndpoint: 'لوحة التحكم والتحصين الأمني للجدار الناري',
    ipAddress: '192.168.1.1',
    macAddress: '00:08:A2:09:77:05',
    vlan: 'VLAN 99 - Out-of-Band Management',
    vlanId: 99,
    speed: '1000 Mbps Full Duplex',
    poeWatts: 0
  }
];

// ==============================================================================
// THE EXACT MASTER RACK ORDERING (AS DIRECTED BY USER - TOP TO BOTTOM):
// 1. Patch Panel 24 Port
// 2. Cisco Switch 48 Port
// 3. Patch Panel 24 Port
// 4. Dell PowerEdge R640 Server
// [ CLEAR EMPTY SPACE / مسافة فارغة واضحة ]
// 5. NVR 16 Channel (Cameras)
// 6. Grandstream IP PBX / Central
// 7. Firewall
// ==============================================================================
export const MASTER_RACK_DEVICES: RackHardwareDevice[] = [
  {
    id: 'patch-panel-1',
    name: 'لوحة توزيع كابلات الشبكة 1 (Patch Panel 24 Port)',
    arabicName: 'الباتش بانل الأول Cat6 (توزيع نقاط صالة العمليات والمكاتب)',
    model: 'Cat6 Unshielded 24-Port 1U Rackmount Patch Panel',
    manufacturer: 'Cisco / Perla Systems',
    category: 'patch_panel',
    uPositionStart: 27,
    uHeight: 1,
    frontColor: '#1e293b',
    specs: [
      '24 منفذ RJ45 فئة Cat6 مع شريط ترقيم وترميز لوني 1-24',
      'توزيع نقاط مكاتب الإدارة، م/ سامح، م/ عماد، والمكتب القانوني والمالي',
      'المنافذ 7: مخصصة لطابعة التقارير المركزية HP LaserJet Pro M404n',
      'المنافذ 8-12: صالة خدمة العملاء والكول سنتر بالمعادي',
      'معدن مجلفن سميك مضاد للصدمات مع مشابك تثبيت الكابلات الخلفية'
    ],
    powerWatts: 0,
    tempCelsius: 21.0,
    status: 'online',
    invoiceInfo: 'فاتورة رد لاين البستان (1,850 ج.م)',
    responsible: 'المهندس عماد الشرقاوي ومعه حاتم الفني وم/ أحمد عبيد',
    ports: PATCH_PANEL_1_PORTS,
    extraMetadata: {
      firmware: 'Passive Hardware',
      serialNumber: 'PP1-24P-CAT6-EG-01',
      totalPoints: 24,
      activePoints: 20
    }
  },
  {
    id: 'cisco-switch-48',
    name: 'سويتش سيسكو 48 بورت (Cisco Switch 48 Port)',
    arabicName: 'سويتش سيسكو المؤسسي Cisco Catalyst 3850-48P PoE+ (كريس)',
    model: 'Cisco Catalyst WS-C3850-48P-S Layer 3 Switch with Dual 715W PSU',
    manufacturer: 'Cisco Systems Inc.',
    category: 'switch',
    uPositionStart: 26,
    uHeight: 1,
    frontColor: '#047857',
    specs: [
      '48 منفذ Gigabit إيثرنت تدعم تقنية PoE+ لتغذية الكاميرات وتليفونات الـ IP',
      'مزود طاقة مزدوج Redundant Dual Power Supply 715W Platinum',
      'سعة تحويل 176 Gbps مع توجيه طبقة ثالثة Layer 3 Routing متقدم',
      '4 منافذ 10G SFP+ Uplink للربط فائق السرعة مع سيرفر ديل R640',
      'عزل متقدم لـ 6 شبكات افتراضية VLANs (إدارة، كول سنتر، كاميرات، VoIP، سيرفرات، ضيوف)'
    ],
    powerWatts: 340,
    tempCelsius: 24.5,
    status: 'online',
    invoiceInfo: 'فاتورة QTS الرسمية المعتمدة بالضرائب ETA (11,970 ج.م)',
    responsible: 'المهندس عماد الشرقاوي والمهندس سامح ياسين',
    ports: CISCO_SWITCH_48_PORTS,
    extraMetadata: {
      ipAddress: '192.168.10.1',
      macAddress: 'F4:0F:1B:7A:48:00',
      firmware: 'Cisco IOS-XE 16.12.5b Gibraltar',
      serialNumber: 'FCW2148L0P9',
      managementUrl: 'https://192.168.10.1:443',
      poeBudgetWatts: 715,
      poeUsedWatts: 185.4
    }
  },
  {
    id: 'patch-panel-2',
    name: 'لوحة توزيع كابلات الشبكة 2 (Patch Panel 24 Port)',
    arabicName: 'الباتش بانل الثاني Cat6 (توزيع الكاميرات والسيرفرات والواي فاي)',
    model: 'Cat6 Unshielded 24-Port 1U Rackmount Patch Panel',
    manufacturer: 'Cisco / Perla Systems',
    category: 'patch_panel',
    uPositionStart: 25,
    uHeight: 1,
    frontColor: '#1e293b',
    specs: [
      '24 منفذ RJ45 فئة Cat6 مع شريط ترقيم وترميز لوني 1-24',
      'المنافذ 1-16: خطوط كاميرات المراقبة المباشرة من المكاتب للـ NVR',
      'المنافذ 17-20: كابلات تجميع سيرفر ديل R640 ومنافذ الشبكة المزدوجة',
      'المنافذ 21-24: نقاط أكسس بوينت الوايرلس السقفية سيسكو Aironet APs',
      'تأريج واختبار شامل بجهاز I-Pook PK65H المعتمد لدى م/ عماد'
    ],
    powerWatts: 0,
    tempCelsius: 21.2,
    status: 'online',
    invoiceInfo: 'فاتورة رد لاين البستان (1,850 ج.م)',
    responsible: 'المهندس عماد الشرقاوي ومعه حاتم الفني',
    ports: PATCH_PANEL_2_PORTS,
    extraMetadata: {
      firmware: 'Passive Hardware',
      serialNumber: 'PP2-24P-CAT6-EG-02',
      totalPoints: 24,
      activePoints: 22
    }
  },
  {
    id: 'dell-r640',
    name: 'سيرفر ديل بلاتينيوم (Dell PowerEdge R640 Server)',
    arabicName: 'سيرفر الإنتاج المركزي DELL PowerEdge R640 Platinum (1U Enterprise)',
    model: 'DELL PowerEdge R640 1U Dual Intel Xeon Platinum 8160',
    manufacturer: 'Dell Technologies',
    category: 'server',
    uPositionStart: 24,
    uHeight: 1, // 1U High-Density Rack Server
    frontColor: '#0369a1',
    specs: [
      '2 معالج Intel Xeon Platinum 8160 (إجمالي 48 Cores / 96 Threads بسرعة 3.7GHz Turbo)',
      'ذاكرة 64GB DDR4 ECC Registered فئة Server Grade (قابلة للزيادة لـ 1.5TB)',
      '8 حوامل هاردات 2.5 بوصة Hot-Swap SAS/NVMe فائقة السرعة مع مصفوفة RAID PERC H730P',
      'كارت إدارة ريموت iDRAC9 Enterprise للتحكم وإعادة التشغيل عن بعد من أي مكان',
      'باور سبلاي مزدوج بلاتينيوم 750W Titanium Hot-Plug Redundant لضمان صفر انقطاع'
    ],
    powerWatts: 380,
    tempCelsius: 26.2,
    status: 'online',
    invoiceInfo: 'فاتورة QTS الرسمية المعتمدة بالضرائب ETA (96,295 ج.م)',
    responsible: 'المهندس عماد الشرقاوي والمهندس سامح ياسين',
    ports: DELL_R640_INTERFACES,
    extraMetadata: {
      ipAddress: '192.168.10.10',
      idracIp: '192.168.10.9',
      macAddress: 'D8:9E:F3:11:42:01',
      serviceTag: '7X9K4R2',
      os: 'Ubuntu Server 22.04 LTS (Kernel 6.8 Enterprise)',
      database: 'PostgreSQL 16 + PostGIS 3.4 for 4B Mobility Maps'
    }
  },

  // ----------------------------------------------------------------------------
  // المسافة الفارغة الواضحة (Clear Empty Space / Rack Expansion Bay)
  // ----------------------------------------------------------------------------
  {
    id: 'rack-spacer-empty',
    name: 'مسافة فارغة واضحة (Clear Empty Space / Airflow Bay)',
    arabicName: 'مسافة تهوية وتوسع فارغة واضحة (Airflow Separation & Future Expansion)',
    model: 'Clear Rack Spacing Bay (3U Height)',
    manufacturer: 'Perla Datacenter Enclosures',
    category: 'spacer',
    uPositionStart: 23,
    uHeight: 3, // 3U Empty Space
    frontColor: '#0a0f1d',
    specs: [
      'مسافة عزل هوائي وفيزيائي واضحة ومدروسة هندسياً',
      'فصل حراري بين سيرفر ديل R640 عالي الأداء وأجهزة الكاميرات والسنترال',
      'تمنع تراكم الحرارة وتتيح التوسع المستقبلي لسيرفرات إضافية',
      'قضبان الراك ومسامير التثبيت (Cage Nuts) مرئية وواضحة'
    ],
    powerWatts: 0,
    tempCelsius: 20.5,
    status: 'online',
    invoiceInfo: 'ضمن مساحة كابينة راك بيرلا 27U المعتمدة',
    responsible: 'المهندس عماد الشرقاوي',
    ports: []
  },

  // ----------------------------------------------------------------------------
  // 5. NVR 16 CHANNEL (الكاميرات)
  // ----------------------------------------------------------------------------
  {
    id: 'nvr-16-ch',
    name: 'مسجل كاميرات المراقبة (16-Channel NVR)',
    arabicName: 'جهاز تسجيل المراقبة الشبكي 16 قناة 4K مع باور PoE مدمج (NVR 16ch)',
    model: 'Hikvision DS-7616NI-I2/16P 4K 16-Channel Embedded PoE NVR',
    manufacturer: 'Hikvision Digital Technology',
    category: 'nvr',
    uPositionStart: 20,
    uHeight: 1,
    frontColor: '#334155',
    specs: [
      '16 منفذ PoE مدمج لتغذية وتسجيل 16 كاميرا مراقبة رقمية 5MP/4K مباشرة',
      '4 قنوات صوتية مخصصة للكاميرات ذات الميكروفون الداخلي بمكاتب الإدارة',
      'قرص صلب مخصص للمراقبة WD Purple 4TB مسجل بحلقة أرشيفية 30 يوماً',
      'دعم ضغط الفيديو H.265+ الفائق لتوفير مساحة التخزين وعرض النطاق',
      'مخرج HDMI 4K مستقل للعرض المباشر على شاشات المراقبة بغرفة العمليات'
    ],
    powerWatts: 140,
    tempCelsius: 23.5,
    status: 'online',
    invoiceInfo: 'أمر توريد شركة الأصدقاء للأنظمة الأمنية (معتمد)',
    responsible: 'المهندس عماد الشرقاوي ومعه حاتم الفني',
    ports: NVR_16_PORTS,
    extraMetadata: {
      ipAddress: '192.168.20.100',
      macAddress: 'BC:54:51:77:AA:00',
      firmware: 'V4.61.025 build 230915',
      storageUsedGb: 3450,
      storageTotalGb: 4000,
      camerasActive: 16
    }
  },

  // ----------------------------------------------------------------------------
  // 6. GRANDSTREAM IP PBX / CENTRAL (السنترال)
  // ----------------------------------------------------------------------------
  {
    id: 'grandstream-pbx',
    name: 'سنترال المقر الذكي (Grandstream IP PBX / Central)',
    arabicName: 'سنترال الاتصالات والمكالمات الهاتفية الذكي Grandstream UCM IP PBX',
    model: 'Grandstream UCM6304 / UCM6208 Enterprise IP PBX Appliance with LCD',
    manufacturer: 'Grandstream Networks Inc.',
    category: 'pbx',
    uPositionStart: 19,
    uHeight: 1,
    frontColor: '#1e3a8a',
    specs: [
      'شاشة عرض LCD أمامية 128×32 بكسل مع أزرار ملاحة لعرض الـ IP وحالة الخطوط',
      '4 منافذ FXO مخصصة لربط خطوط التليفون الأرضي لسنترال المعادي 02-2517xxxx',
      '2 منفذ FXS للتليفونات الأنالوج وأجهزة الفاكس والطوارئ',
      'سعة حتى 500 مستخدم و75 مكالمة متزامنة مع تسجيل مكالمات الدعم الفني',
      'دعم كامل لبروتوكول SIP وربط هواتف Grandstream GRP2614 الموزعة بالمكاتب'
    ],
    powerWatts: 45,
    tempCelsius: 22.8,
    status: 'online',
    invoiceInfo: 'فاتورة تكنو ستورز المعتمدة (ضمن تجهيزات الاتصالات)',
    responsible: 'المهندس سامح ياسين والمهندس عماد الشرقاوي',
    ports: GRANDSTREAM_PBX_PORTS,
    extraMetadata: {
      ipAddress: '192.168.30.1',
      macAddress: 'C0:74:AD:44:88:00',
      firmware: '1.0.23.17',
      activeExtensions: 24,
      pstnTrunks: 4
    }
  },

  // ----------------------------------------------------------------------------
  // 7. FIREWALL (جدار الحماية OPNsense / Netgate Enterprise)
  // ----------------------------------------------------------------------------
  {
    id: 'firewall-core',
    name: 'جدار الحماية وتأمين الشبكة (Enterprise Firewall Gateway)',
    arabicName: 'جدار الحماية المؤسسي وتأمين خطوط الربط OPNsense / Netgate 6100 Gateway',
    model: 'Netgate 6100 / OPNsense Enterprise Security Appliance 1U',
    manufacturer: 'Netgate / OPNsense Enterprise',
    category: 'firewall',
    uPositionStart: 18,
    uHeight: 1,
    frontColor: '#991b1b', // Red security motif
    specs: [
      'جدار حماية مؤسسي متقدم مع نظام منع التسلل واكتشاف الاختراق IDS/IPS (Suricata)',
      'تأمين خط الربط البصري الفايبر 24Mbps مع سنترال المعادي ومزود الخدمة WE',
      'عزل كامل لشبكات الـ VLANs وتأمين خوادم تطبيق 4B من هجمات DDoS والـ Brute Force',
      'نفق مشفر L3VPN / WireGuard مخصص لربط داتا سنتر القرية الذكية ووزارة النقل LTRA',
      'فلترة حزم البيانات بسرعة تفوق 8 Gbps مع مراقبة حية لاستهلاك النطاق الترددي'
    ],
    powerWatts: 65,
    tempCelsius: 23.0,
    status: 'online',
    invoiceInfo: 'ضمن عتاد السيرفرات والأمن السيبراني (شركة QTS)',
    responsible: 'المهندس سامح ياسين (CTO)',
    ports: FIREWALL_INTERFACES,
    extraMetadata: {
      ipAddress: '192.168.10.1',
      wanIp: '10.240.18.2 (WE Fiber Metro)',
      macAddress: '00:08:A2:09:77:00',
      os: 'OPNsense 24.7 Business Edition / FreeBSD 14',
      activeVlans: 6,
      throughputLive: '24.2 Mbps (Peak)'
    }
  }
];

// Helper to look up any port by device ID and port number
export function findPortInRack(deviceId: string, portNumber: number): RackPort | undefined {
  const device = MASTER_RACK_DEVICES.find(d => d.id === deviceId);
  if (!device) return undefined;
  return device.ports.find(p => p.portNumber === portNumber);
}

// Helper to find cross-connection mappings (e.g. which Cisco port connects to Patch Panel 1 Port 7)
export function findMappedConnection(port: RackPort): {
  sourceDevice: string;
  targetDevice: string;
  targetPortNumber?: number;
  details: string;
} | null {
  if (port.patchPanelMapping) {
    return {
      sourceDevice: 'Patch Panel',
      targetDevice: port.connectedDevice,
      targetPortNumber: port.patchPanelMapping.portNumber,
      details: `${port.patchPanelMapping.roomDrop} -> ${port.connectedDevice}`
    };
  }
  return null;
}
