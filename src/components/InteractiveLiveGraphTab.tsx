import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { 
  Network, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  HardDrive, 
  Bot, 
  Cpu, 
  Server, 
  FolderPlus,
  FolderMinus,
  CheckCircle2,
  Activity,
  Zap,
  Users,
  ShieldCheck,
  Building,
  Radio,
  Eye,
  EyeOff,
  Share2,
  Workflow,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  Info
} from 'lucide-react';

export interface GraphNodeData extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  role: string;
  category: 'core' | 'hub' | 'mashweer' | 'infra' | 'telecom' | 'team' | 'ai';
  parentId?: string;
  level: number; // 0 = Root, 1 = Hub, 2 = Leaf
  hasChildren?: boolean;
  isCollapsed?: boolean;
  color: string;
  glowColor: string;
  radius: number;
  driveFolder: string;
  metrics: string;
  description: string;
  status: string;
  badge?: string;
  tags?: string[];
}

export interface GraphLinkData extends d3.SimulationLinkDatum<GraphNodeData> {
  id: string;
  source: string | GraphNodeData;
  target: string | GraphNodeData;
  value?: number;
  type?: 'primary' | 'child' | 'cross';
  relationLabel?: string;
  animated?: boolean;
}

interface RawNodeDef {
  id: string;
  name: string;
  role: string;
  category: 'core' | 'hub' | 'mashweer' | 'infra' | 'telecom' | 'team' | 'ai';
  parentId?: string;
  level: number;
  color: string;
  glowColor: string;
  radius: number;
  driveFolder: string;
  metrics: string;
  description: string;
  status: string;
  badge?: string;
  tags?: string[];
  children?: RawNodeDef[];
}

// Master Hierarchical Ecosystem Data - Daylight Enterprise (100% Pure Mashweer & HQ Infrastructure)
const MASTER_GRAPH_DATA: RawNodeDef = {
  id: 'node-hq-root',
  name: 'منظومة مشاوير للمنصات الرقمية',
  role: 'مركز العمليات والأنظمة والتحول الرقمي (HQ Command)',
  category: 'core',
  level: 0,
  color: '#0f766e', // Deep Teal
  glowColor: 'rgba(15, 118, 110, 0.35)',
  radius: 36,
  driveFolder: 'Mashweer_Digital_Platforms/',
  metrics: 'داتا سنتر المقر • 4 تطبيقات ذكية • بنية IT متكاملة • خطوط ربط WE VPN • بروتوكول ذكي',
  description: 'القيادة الهندسية والمركزية لمقر المعادي، إدارة البنية التحتية، السيرفرات وشبكات الاتصال وتطبيقات المنظومة.',
  status: 'نشط 100% • القيادة المركزية',
  badge: 'HQ Root',
  tags: ['القيادة المركزية', 'مقر المعادي', 'البنية التحتية'],
  children: [
    // HUB 1: MASHWEER ENTERPRISE APPLICATIONS
    {
      id: 'hub-apps',
      name: 'منظومة وتطبيقات مشاوير',
      role: 'مجموعة التطبيقات والمنصات الذكية (4 تطبيقات)',
      category: 'hub',
      parentId: 'node-hq-root',
      level: 1,
      color: '#0284c7', // Sky Blue
      glowColor: 'rgba(2, 132, 199, 0.35)',
      radius: 28,
      driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/',
      metrics: '4 تطبيقات رقمية • أسطول ووكلاء وركاب وشحن وبث لحظي',
      description: 'المنظومة الرقمية الشاملة لخدمات الركاب، الوكلاء، الشحن السريع، وتطبيقات الكباتن.',
      status: 'نشطة ميدانياً',
      badge: 'Hub (4)',
      tags: ['تطبيقات', 'مشاوير', 'سحابي'],
      children: [
        {
          id: 'node-4b',
          name: 'تطبيق فور بي 4B',
          role: 'تطبيق الركاب وحجز الرحلات الذكي',
          category: 'mashweer',
          parentId: 'hub-apps',
          level: 2,
          color: '#38bdf8',
          glowColor: 'rgba(56, 189, 248, 0.4)',
          radius: 21,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/01_4B_PASSENGER/',
          metrics: 'APK v1.4.2 • PostGIS Geocoding • Redis Caching • F5 WAF • متصل بـ WE VPN',
          description: 'تطبيق حجز وتوجيه الركاب المعتمد مع خادم سحابي عالي التردد وبث لحظي للمسارات مرتبط بشبكة المصرية للاتصالات.',
          status: 'APK جاهز للإطلاق',
          tags: ['ركاب', 'رحلات', 'WE VPN']
        },
        {
          id: 'node-wekala',
          name: 'منظومة وكالة WeKaLa',
          role: 'إدارة أساطيل المكاتب والوكلاء بالمحافظات',
          category: 'mashweer',
          parentId: 'hub-apps',
          level: 2,
          color: '#0ea5e9',
          glowColor: 'rgba(14, 165, 233, 0.4)',
          radius: 19,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/02_WIKALA_AGENCY_FLEET/',
          metrics: 'Flutter Code • Keystore Signing • عمولات المكاتب والوكلاء',
          description: 'منظومة مكاتب المحافظات والوكلاء لإدارة نسب العمولات والحسابات والأسطول الإقليمي.',
          status: 'سورس فلاتر معتمد',
          tags: ['وكلاء', 'أساطيل', 'فلاتر']
        },
        {
          id: 'node-daro',
          name: 'منصة دارو Daro',
          role: 'شحن الطرود واللوجستيات والمحطات',
          category: 'mashweer',
          parentId: 'hub-apps',
          level: 2,
          color: '#6366f1',
          glowColor: 'rgba(99, 102, 241, 0.4)',
          radius: 19,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/03_DARO_CARGO_LOGISTICS/',
          metrics: 'بوالص إلكترونية • محطات تجميع • ماسح باركود وتتبع شحنات',
          description: 'نظام إدارة ونقل البضائع والطرود وتأمين الشحنات بين المحافظات والمحطات المركزية.',
          status: 'قيد الربط والتكامل',
          tags: ['شحن', 'طرود', 'لوجستيات']
        },
        {
          id: 'node-driver',
          name: 'كابتن مشاوير Driver',
          role: 'تطبيق السائقين واستقبال الرحلات',
          category: 'mashweer',
          parentId: 'hub-apps',
          level: 2,
          color: '#14b8a6',
          glowColor: 'rgba(20, 184, 166, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/04_MASHWEER_CAPTAIN_DRIVER/',
          metrics: 'GPS Sockets • بث المسارات اللحظي • محفظة الكابتن الرقمية',
          description: 'تطبيق استقبال وتوجيه الرحلات وتتبع مسارات السائقين والتوزيع الجغرافي اللحظي.',
          status: 'جاهز للاختبار الميداني',
          tags: ['سائقين', 'GPS', 'محفظة']
        }
      ]
    },

    // HUB 2: HEADQUARTERS IT, NETWORK & HARDWARE INFRASTRUCTURE
    {
      id: 'hub-infra',
      name: 'بنية وشبكات مقر المعادي والـ IT',
      role: 'السيرفرات والشبكات والعتاد المادي للمقر',
      category: 'hub',
      parentId: 'node-hq-root',
      level: 1,
      color: '#059669', // Emerald
      glowColor: 'rgba(5, 150, 105, 0.35)',
      radius: 28,
      driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/',
      metrics: 'سيرفر DELL بلاتينيوم • راك 27U • سويتش Cisco PoE • محطتا Z440 • كاميرات 16 IP',
      description: 'البنية التحتية الصلبة لمقر المعادي، الداتا سنتر المحلي، كبائن الراك والشبكة الداخلية المؤمنة.',
      status: 'بنية تشغيلية معتمدة',
      badge: 'Hub (6)',
      tags: ['عتاد', 'سيرفرات', 'شبكات'],
      children: [
        {
          id: 'node-dell-server',
          name: 'سيرفر DELL PowerEdge R640 بلاتينيوم',
          role: 'الخادم الرئيسي للداتا سنتر المحلي للمقر',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#0d9488',
          glowColor: 'rgba(13, 148, 136, 0.4)',
          radius: 21,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/01_SERVERS_DELL_R640_PLATINUM/',
          metrics: '2x Intel Xeon Platinum 8160 (48 Cores / 96 Threads) • 64GB ECC RAM • SAS RAID • فاتورة ETA 96,295 ج.م',
          description: 'أول خادم مؤسسي حقيقي عالي الأداء للمقر الداخلي لتشغيل قواعد البيانات والخدمات المحلية ومحاكاة النماذج.',
          status: 'مورد ومعتمد بالداتا سنتر',
          tags: ['خادم رئيسي', 'DELL', 'بلاتينيوم']
        },
        {
          id: 'node-workstations',
          name: 'محطتا عمل HP Z440 Workstations',
          role: 'محطات التحكم الهندسي والتشغيل الميداني للمهندسين',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#10b981',
          glowColor: 'rgba(16, 185, 129, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/03_WORKSTATIONS_HP_Z440/',
          metrics: '2x Intel Xeon E5-2697v4 (18 Cores) • 32GB RAM • SSD NVMe • محطات تطوير لم/ سامح',
          description: 'محطتا عمل مخصصتان لمهندسي المقر لإدارة ومتابعة السيرفرات والشبكات محلياً وتطوير الأكواد.',
          status: 'جاهزة للتشغيل',
          tags: ['محطات عمل', 'HP', 'تطوير']
        },
        {
          id: 'node-rack-perla',
          name: 'كابينة راك شبكات بيرلا 27U عمق 1000 مم',
          role: 'كابينة الداتا سنتر واستضافة السيرفر والباور',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#34d399',
          glowColor: 'rgba(52, 211, 153, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
          metrics: 'Perla 27U Depth 1000mm • مراوح تهوية • PDU باور منظم • ريل كيت سيرفر • فاتورة رد لاين',
          description: 'كابينة الراك الكبرى لغرفة الـ IT بالمقر بعمق 1 متر لاستيعاب السيرفر DELL وجميع السويتشات.',
          status: 'مركبة بغرفة السيرفرات',
          tags: ['راك', 'بيرلا 27U', 'داتا سنتر']
        },
        {
          id: 'node-cisco-poe',
          name: 'سويتش سيسكو Cisco Catalyst 3850 PoE',
          role: 'نواة توزيع الشبكة وتغذية الكاميرات والـ Wi-Fi',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#22c55e',
          glowColor: 'rgba(34, 197, 94, 0.4)',
          radius: 19,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/02_NETWORKS_CISCO_AND_PERLA_27U/',
          metrics: '48 Port PoE+ Gigabit • مزود طاقة مزدوج 715W • باتش بانل 48 بورت • فاتورة 11,970 ج.م',
          description: 'السويتش المؤسسي Layer 3 لتوزيع خطوط الإنترنت وتغذية كاميرات المراقبة بالكهرباء والبيانات.',
          status: 'مورد ومعتمد بالراك',
          tags: ['سويتش سيسكو', 'PoE', 'Layer 3']
        },
        {
          id: 'node-cctv-maadi',
          name: 'شبكة المراقبة الرقمية (16 كاميرا IP)',
          role: 'المنظومة الأمنية والمراقبة الرقمية وجهاز NVR',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#f59e0b',
          glowColor: 'rgba(245, 158, 11, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/04_CCTV_CAMERAS_16_IP/',
          metrics: '16x IP Cameras 5MP • NVR 16 Channel • تغطية المداخل وغرفة الـ IT والمكاتب • شركة الأصدقاء',
          description: 'تغطية أمنية شاملة لمقر المعادي على مدار الساعة مع تسجيل مركزي مؤمن على هارديسك WD Purple.',
          status: 'معاينة الموقع وتوريد معتمد',
          tags: ['كاميرات مراقبة', 'NVR', 'أمن المقر']
        },
        {
          id: 'node-opnsense-firewall',
          name: 'جهاز الجدار الناري المستقل OPNsense Appliance',
          role: 'بوابة الحماية المركزية، التوجيه، وعزل الـ VLANs',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#06b6d4',
          glowColor: 'rgba(6, 182, 212, 0.45)',
          radius: 20,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/05_FIREWALL_OPNSENSE_APPLIANCE/',
          metrics: 'Hardware Appliance x86 • 4x 2.5GbE NICs • Suricata IDS/IPS • عزل السيرفرات عن أجهزة الموظفين • بديل FortiGate الاقتصادي',
          description: 'جهاز جدار ناري مستقل مخصص لحماية المقر دون استهلاك موارد سيرفر Dell R640، وتطبيق قواعد الفصل الحازمة بين VLAN 10 للموظفين و VLAN 20 للسيرفرات و VLAN 30 للإدارة.',
          status: 'تصميم ومواصفة هندسية معتمدة',
          badge: 'جديد OPNsense',
          tags: ['جدار ناري', 'OPNsense', 'أمن المقر', 'عزل VLANs']
        },
        {
          id: 'node-floorplan-maadi',
          name: 'المخطط المعماري لمقر المعادي (26م × 21م)',
          role: 'التوزيع الهندسي للمكاتب وغرفة الـ IT ونقاط الشبكة',
          category: 'infra',
          parentId: 'hub-infra',
          level: 2,
          color: '#14b8a6',
          glowColor: 'rgba(20, 184, 166, 0.4)',
          radius: 17,
          driveFolder: 'Mashweer_Digital_Platforms/02_MAADI_HEADQUARTERS_INFRASTRUCTURE/',
          metrics: '25.91م × 20.94م • 8 مكاتب إدارية • قاعة اجتماعات • غرفة سيرفرات مستقلة • مسار كابلات السقف',
          description: 'المخطط الهندسي الدقيق لمقر المعراج بالمعادي لتوجيه مسارات الكابلات والتمديدات ومواقع الكاميرات.',
          status: 'مخطط هندسي معتمد',
          tags: ['مخطط معماري', 'المعادي', 'غرفة IT']
        }
      ]
    },

    // HUB 3: TELECOM EGYPT (WE) VPN & CONNECTIVITY LINES
    {
      id: 'hub-telecom',
      name: 'خطوط الربط والـ VPN (المصرية للاتصالات WE)',
      role: 'الشبكة الافتراضية المؤمنة والربط القومي والسيادي',
      category: 'hub',
      parentId: 'node-hq-root',
      level: 1,
      color: '#2563eb', // Royal Blue
      glowColor: 'rgba(37, 99, 235, 0.35)',
      radius: 28,
      driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
      metrics: 'عرض WE VPN المعتمد (360 ألف ج.م) • خط فايبر تجميعي 24Mbps • سيرفر 4B السحابي',
      description: 'خطوط الربط المشفرة والشبكة الافتراضية الخاصة L3VPN لربط داتا سنتر المقر بتطبيق 4B ووزارة النقل LTRA.',
      status: 'عرض وأمر شراء رسمي معتمد',
      badge: 'Hub (3)',
      tags: ['اتصالات', 'WE VPN', 'فايبر'],
      children: [
        {
          id: 'node-we-vpn-offer',
          name: 'عرض خط الربط والـ VPN من المصرية للاتصالات',
          role: 'الربط الشبكي المجمع L3VPN بالفايبر لتطبيق 4B والمقر',
          category: 'telecom',
          parentId: 'hub-telecom',
          level: 2,
          color: '#0284c7',
          glowColor: 'rgba(2, 132, 199, 0.45)',
          radius: 22,
          driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
          metrics: '360,000 ج.م/سنوياً • خط تجميع فايبر 24Mbps + 6 خطوط فرعية 4Mbps • م/ أحمد غريب',
          description: 'عرض وأمر شراء المصرية للاتصالات WE لتأمين خطوط الربط المشفرة (L3VPN) لتطبيق 4B وربط داتا سنتر المقر بسنترال المعادي وشبكة وزارة النقل LTRA.',
          status: 'عرض رسمي معتمد للإطلاق',
          badge: 'جديد WE VPN',
          tags: ['WE VPN', '360 ألف ج.م', 'خطوط ربط', '4B']
        },
        {
          id: 'node-we-cloud-server',
          name: 'سيرفر 4B السحابي وجدار الحماية F5 WAF',
          role: 'الاستضافة السحابية والسيادية الآمنة لتطبيق فور بي',
          category: 'telecom',
          parentId: 'hub-telecom',
          level: 2,
          color: '#3b82f6',
          glowColor: 'rgba(59, 130, 246, 0.4)',
          radius: 20,
          driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
          metrics: '807,496 ج.م/سنوياً • 3 خوادم افتراضية (App, DB, Cache) • جدار F5 WAF • نسخ احتياطي يومي • داتا سنتر القرية الذكية',
          description: 'البيئة السحابية والسيادية الإنتاجية لتطبيق فور بي المستضافة بداتا سنتر المصرية للاتصالات لضمان بقاء البيانات داخل مصر.',
          status: 'أمر شراء معتمد رسمياً',
          tags: ['سحابة WE', 'F5 WAF', '807 ألف ج.م']
        },
        {
          id: 'node-fiber-central',
          name: 'كابلات الفايبر المباشرة وسنترال المعادي',
          role: 'مسار الألياف الضوئية المادية من سنترال المعادي للمقر',
          category: 'telecom',
          parentId: 'hub-telecom',
          level: 2,
          color: '#06b6d4',
          glowColor: 'rgba(6, 182, 212, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/',
          metrics: 'ألياف ضوئية فائقة السرعة • خطوط هاتفية أرضية • ثبات 99.9% • تنسيق السنترال',
          description: 'خطوط الاتصال والإنترنت المباشر للمقر لضمان أعلى سرعة استجابة وربط دائم مع شبكة WE.',
          status: 'تنسيق السنترال مستمر',
          tags: ['فايبر', 'سنترال المعادي', 'إنترنت مباشر']
        }
      ]
    },

    // HUB 4: HEADQUARTERS TECHNICAL & OPERATIONS TEAM
    {
      id: 'hub-team',
      name: 'فريق الإدارة والتشغيل والتقنية بالمقر',
      role: 'الهيكل البشري والمهندسون المسؤولون عن التشغيل',
      category: 'hub',
      parentId: 'node-hq-root',
      level: 1,
      color: '#4f46e5', // Indigo
      glowColor: 'rgba(79, 70, 229, 0.35)',
      radius: 28,
      driveFolder: 'Mashweer_Digital_Platforms/03_STAFF_AND_CONTACTS/',
      metrics: 'رئيس التكنولوجيا CTO • استشاري أنظمة • مهندس IT • فني مساعد شبكات',
      description: 'فريق العمل الهندسي والتقني المسؤول عن تشغيل وتأسيس مقر المعادي والمنظومة.',
      status: 'فريق العمل معتمد',
      badge: 'Hub (4)',
      tags: ['فريق العمل', 'مهندسون', 'إدارة'],
      children: [
        {
          id: 'node-sameh',
          name: 'م/ سامح ياسين',
          role: 'رئيس قطاع التكنولوجيا والأنظمة (CTO)',
          category: 'team',
          parentId: 'hub-team',
          level: 2,
          color: '#0d9488',
          glowColor: 'rgba(13, 148, 136, 0.4)',
          radius: 22,
          driveFolder: 'Mashweer_Digital_Platforms/',
          metrics: 'قيادة الأنظمة • الإشراف على العتاد والسيرفرات والشبكات • أبحاث كاجل والذكاء',
          description: 'المسؤول التقني الأول عن تصميم وتطوير المنظومة وإدارة البنية التحتية لمقر المعادي واعتماد عروض الأسعار.',
          status: 'نشط 100%',
          badge: 'CTO',
          tags: ['سامح ياسين', 'CTO', 'قيادة تقنية']
        },
        {
          id: 'node-emad',
          name: 'م/ عماد الشرقاوي',
          role: 'استشاري النظم وتطوير الأعمال (استشاري دائم)',
          category: 'team',
          parentId: 'hub-team',
          level: 2,
          color: '#6366f1',
          glowColor: 'rgba(99, 102, 241, 0.4)',
          radius: 19,
          driveFolder: 'Mashweer_Digital_Platforms/03_STAFF_AND_CONTACTS/',
          metrics: 'استشارات هندسية • التنسيق مع المصرية للاتصالات WE • خطة الـ 3 أشهر لتأسيس المقر',
          description: 'الاستشاري الهندسي الدائم للشركة لمتابعة تجهيز المقر وخطة الربط والجاهزية ومراجعة عروض WE.',
          status: 'استشاري دائم',
          tags: ['عماد الشرقاوي', 'استشارات', 'تنسيق WE']
        },
        {
          id: 'node-obeid',
          name: 'م/ أحمد عبيد',
          role: 'مهندس IT وفني مساعد بالمقر',
          category: 'team',
          parentId: 'hub-team',
          level: 2,
          color: '#8b5cf6',
          glowColor: 'rgba(139, 92, 246, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/03_STAFF_AND_CONTACTS/',
          metrics: 'خبرة في مجال النقل الذاتي 4B • تجميع الحواسيب والكابلات والتشغيل الميداني',
          description: 'مهندس مساعد بإدارة م/ سامح ياسين يساعد في تجميع وتوصيل أجهزة الموظفين وشبكات المقر.',
          status: 'مهندس مساعد بالمقر',
          tags: ['أحمد عبيد', 'IT', 'ميداني']
        },
        {
          id: 'node-hatem',
          name: 'حاتم (فني مساعد شبكات)',
          role: 'فني تمديدات وتركيب كابلات شبكة (بالاستدعاء)',
          category: 'team',
          parentId: 'hub-team',
          level: 2,
          color: '#a855f7',
          glowColor: 'rgba(168, 85, 247, 0.4)',
          radius: 17,
          driveFolder: 'Mashweer_Digital_Platforms/03_STAFF_AND_CONTACTS/',
          metrics: 'تمديد كابلات Cat6 • تأريج RJ45 • تنظيم وتثبيت الباتش بانل والترانكات بالسقف',
          description: 'فني مساعد حر يتم استدعاؤه بالأجرة المقطوعة لمساعدة م/ سامح في أعمال الشبكة والتمديدات.',
          status: 'فني مساعد بالاستدعاء',
          tags: ['حاتم', 'تمديدات', 'شبكات']
        }
      ]
    },

    // HUB 5: BACKGROUND AI PROTOCOL & KAGGLE RESEARCH
    {
      id: 'hub-ai-research',
      name: 'بروتوكول الذكاء الاصطناعي والأبحاث (UCP & Kaggle)',
      role: 'النواة المعرفية الذكية لخدمة المنظومة وهيباتيا',
      category: 'hub',
      parentId: 'node-hq-root',
      level: 1,
      color: '#9333ea', // Violet Purple
      glowColor: 'rgba(147, 51, 234, 0.35)',
      radius: 27,
      driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/05_KAGGLE_AND_UCP_LLM_RESEARCH/',
      metrics: 'يعمل في الخلفية • محرك Gemma 4 • بروتوكول UCP-LLM • مسار كاجل حتى 17 أكتوبر',
      description: 'المحرك الذكي الذي يعمل في الخلفية لتشغيل المساعد هيباتيا وأبحاث الذكاء الاصطناعي التوليدي لـ م/ سامح.',
      status: 'محرك خلفي نشط',
      badge: 'Hub (3)',
      tags: ['ذكاء اصطناعي', 'كاجل', 'UCP Protocol'],
      children: [
        {
          id: 'node-gemma-agent',
          name: 'محرك Gemma 4 الذكي للأساطيل',
          role: 'نموذج الذكاء الاصطناعي للتحليل والتوجيه في الخلفية',
          category: 'ai',
          parentId: 'hub-ai-research',
          level: 2,
          color: '#c084fc',
          glowColor: 'rgba(192, 132, 252, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/05_KAGGLE_AND_UCP_LLM_RESEARCH/',
          metrics: 'Offline Intelligence • Context Management • توجيه ذكي للأسطول وتحسين الرحلات',
          description: 'محرك ذكاء اصطناعي يعمل في الخلفية لمعالجة سياق الأوامر وتحسين استجابة وتوجيه أسطول 4B.',
          status: 'محرك خلفي نشط',
          tags: ['Gemma 4', 'توجيه أسطول', 'خلفية']
        },
        {
          id: 'node-kaggle-paper',
          name: 'مسار كاجل البحثي (The White Lion)',
          role: 'المسار العلمي والورقة البحثية ومسابقة كاجل ($100k)',
          category: 'ai',
          parentId: 'hub-ai-research',
          level: 2,
          color: '#d8b4fe',
          glowColor: 'rgba(216, 180, 254, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/01_PROJECTS_ECOSYSTEM/05_KAGGLE_AND_UCP_LLM_RESEARCH/',
          metrics: 'UCP-LLM Protocol • موعد 17 أكتوبر • مسار Paper Track • جوائز 100 ألف دولار',
          description: 'تطوير خوارزميات الذكاء الاصطناعي ومسار الأوراق البحثية العلمية لم/ سامح ياسين.',
          status: 'مسار بحثي مستقل',
          tags: ['كاجل', 'White Lion', 'بحث علمي']
        },
        {
          id: 'node-hypatia-agent',
          name: 'مساعد هيباتيا للعمليات (Hypatia Ops)',
          role: 'المساعد البرمجي والتنفيذي لمهندسي المقر',
          category: 'ai',
          parentId: 'hub-ai-research',
          level: 2,
          color: '#e879f9',
          glowColor: 'rgba(232, 121, 249, 0.4)',
          radius: 18,
          driveFolder: 'Mashweer_Digital_Platforms/',
          metrics: 'أوامر صوتية • إجابة استفسارات المهندسين • فحص البنية التحتية وخطوط الربط',
          description: 'المساعد الذكي لخدمة مهندسي المقر والإجابة عن تفاصيل السيرفرات والشبكات وعروض WE لحظياً.',
          status: 'متصل وجاهز',
          tags: ['هيباتيا', 'مساعد ذكي', 'عمليات']
        }
      ]
    }
  ]
};

// Cross-Functional Relationships Matrix (العلاقات المترابطة بين العقد)
const CROSS_RELATIONSHIPS: Array<{
  source: string;
  target: string;
  label: string;
  description: string;
}> = [
  {
    source: 'node-we-vpn-offer',
    target: 'node-4b',
    label: 'تأمين خطوط ربط 4B',
    description: 'خط L3VPN المجمع 24Mbps يربط مستخدمي وتطبيق 4B بالسيرفرات المؤمنة'
  },
  {
    source: 'node-we-vpn-offer',
    target: 'node-we-cloud-server',
    label: 'ربط السحابة بالـ VPN',
    description: 'قنوات PVC المخصصة تربط خوادم الاستضافة بالقرية الذكية بخطوط VPN'
  },
  {
    source: 'node-we-vpn-offer',
    target: 'node-fiber-central',
    label: 'ألياف السنترال المادية',
    description: 'خطوط الفايبر الواصلة من سنترال المعادي للمقر هي الوسط الناقل للـ VPN'
  },
  {
    source: 'node-we-vpn-offer',
    target: 'node-emad',
    label: 'استشارات الربط الهندسي',
    description: 'م/ عماد الشرقاوي يقود التنسيق الفني ومراجعة اشتراطات المصرية للاتصالات'
  },
  {
    source: 'node-we-vpn-offer',
    target: 'node-sameh',
    label: 'اعتماد المواصفات والـ PO',
    description: 'م/ سامح ياسين يعتمد أوامر الشراء والمواصفات الفنية للربط الشبكي'
  },
  {
    source: 'node-opnsense-firewall',
    target: 'node-cisco-poe',
    label: '802.1Q Trunk 2.5Gbps',
    description: 'كابل الربط التجميعي لنقل حركة كافة الـ VLANs المعزولة بين الجدار الناري وسويتش سيسكو'
  },
  {
    source: 'node-opnsense-firewall',
    target: 'node-dell-server',
    label: 'عزل وحماية R640 (VLAN 20)',
    description: 'منع وصول أجهزة الموظفين المباشر إلى سيرفر Dell Platinum 8160 وقواعد البيانات'
  },
  {
    source: 'node-dell-server',
    target: 'node-rack-perla',
    label: 'تثبيت بالراك 27U',
    description: 'السيرفر DELL R640 مركب على ريل كيت داخل كابينة راك بيرلا 27U'
  },
  {
    source: 'node-cisco-poe',
    target: 'node-rack-perla',
    label: 'قلب الراك الشبكي',
    description: 'سويتش Cisco 3850 مثبت بالراك لتغذية الباتش بانل 48 بورت'
  },
  {
    source: 'node-cisco-poe',
    target: 'node-cctv-maadi',
    label: 'تغذية PoE للكاميرات',
    description: 'السويتش يمد كاميرات المراقبة الـ 16 بالطاقة والبيانات عبر Cat6'
  },
  {
    source: 'node-cisco-poe',
    target: 'node-workstations',
    label: 'شبكة محطات المهندسين',
    description: 'توصيل محطتي العمل HP Z440 بشبكة Gigabit فائقة السرعة'
  },
  {
    source: 'node-4b',
    target: 'node-driver',
    label: 'تكامل الرحلات والكباتن',
    description: 'بث طلبات الركاب من 4B واستقبالها على تطبيق الكابتن Driver'
  },
  {
    source: 'node-4b',
    target: 'node-daro',
    label: 'تكامل الشحن اللوجستي',
    description: 'منظومة الشحن السريع دارو تتكامل مع كباتن وأسطول 4B'
  },
  {
    source: 'node-wekala',
    target: 'node-4b',
    label: 'أساطيل الوكلاء الإقليمية',
    description: 'مكاتب الوكلاء تدير كباتن وسيارات منظومة 4B بالمحافظات'
  },
  {
    source: 'node-sameh',
    target: 'node-dell-server',
    label: 'إدارة وتطوير السيرفر',
    description: 'م/ سامح يشرف مباشرة على تهيئة وحماية سيرفر الداتا سنتر المحلي'
  },
  {
    source: 'node-sameh',
    target: 'node-gemma-agent',
    label: 'تدريب وتطوير النماذج',
    description: 'بناء خوارزميات Gemma 4 وبروتوكول UCP-LLM المعرفي'
  },
  {
    source: 'node-sameh',
    target: 'node-hypatia-agent',
    label: 'المساعد الهندسي الشخصي',
    description: 'هيباتيا تقدم الدعم البرمجي والمعماري لم/ سامح على مدار الساعة'
  },
  {
    source: 'node-obeid',
    target: 'node-hatem',
    label: 'فريق التمديدات الميدانية',
    description: 'م/ أحمد عبيد ينسق مع الفني حاتم في إنهاء نقاط الشبكة وكابلات السقف'
  },
  {
    source: 'node-floorplan-maadi',
    target: 'node-rack-perla',
    label: 'موقع غرفة السيرفرات',
    description: 'غرفة الـ IT المخصصة بالرسم الهندسي تستضيف راك بيرلا والداتا سنتر'
  }
];

export const InteractiveLiveGraphTab: React.FC<{
  onAskHypatia?: (prompt: string) => void;
  onOpenProjectSource?: () => void;
}> = ({ onAskHypatia, onOpenProjectSource }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-we-vpn-offer');
  const [collapsedHubIds, setCollapsedHubIds] = useState<Set<string>>(new Set());
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set());
  const [showRelationships, setShowRelationships] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [dimensions, setDimensions] = useState({ width: 960, height: 640 });

  // D3 References
  const simulationRef = useRef<d3.Simulation<GraphNodeData, GraphLinkData> | null>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const nodesMapRef = useRef<Map<string, GraphNodeData>>(new Map());

  // Category definitions for filter pills
  const CATEGORIES = [
    { key: 'all', label: 'كافة الفقاعات', color: '#0f766e' },
    { key: 'mashweer', label: 'تطبيقات مشاوير', color: '#0284c7' },
    { key: 'infra', label: 'عتاد وسيرفرات المقر', color: '#059669' },
    { key: 'telecom', label: 'خطوط الربط و WE VPN', color: '#2563eb' },
    { key: 'team', label: 'فريق العمل والتشغيل', color: '#4f46e5' },
    { key: 'ai', label: 'الذكاء الاصطناعي والأبحاث', color: '#9333ea' }
  ];

  // Flatten the Hierarchical Tree taking into account collapsed hubs & hidden categories
  const { currentNodes, currentLinks } = useMemo(() => {
    const nodes: GraphNodeData[] = [];
    const links: GraphLinkData[] = [];

    const traverse = (raw: RawNodeDef, isParentVisible: boolean) => {
      const isHub = raw.category === 'hub';
      const isCollapsed = isHub && collapsedHubIds.has(raw.id);
      const isCategoryHidden = hiddenCategories.has(raw.category);

      const existing = nodesMapRef.current.get(raw.id);
      const nodeData: GraphNodeData = {
        id: raw.id,
        name: raw.name,
        role: raw.role,
        category: raw.category,
        parentId: raw.parentId,
        level: raw.level,
        hasChildren: !!(raw.children && raw.children.length > 0),
        isCollapsed,
        color: raw.color,
        glowColor: raw.glowColor,
        radius: raw.radius,
        driveFolder: raw.driveFolder,
        metrics: raw.metrics,
        description: raw.description,
        status: raw.status,
        badge: raw.badge,
        tags: raw.tags,
        x: existing?.x,
        y: existing?.y,
        vx: existing?.vx,
        vy: existing?.vy
      };

      const isNodeVisible = isParentVisible && !isCategoryHidden;

      if (isNodeVisible) {
        nodes.push(nodeData);

        if (raw.parentId) {
          links.push({
            id: `link-${raw.parentId}-${raw.id}`,
            source: raw.parentId,
            target: raw.id,
            type: raw.level === 1 ? 'primary' : 'child',
            animated: true
          });
        }
      }

      if (raw.children && raw.children.length > 0) {
        const areChildrenVisible = isNodeVisible && !isCollapsed;
        raw.children.forEach(child => traverse(child, areChildrenVisible));
      }
    };

    traverse(MASTER_GRAPH_DATA, true);

    // Add extra cross-functional enterprise relationships
    if (showRelationships) {
      const visibleIds = new Set(nodes.map(n => n.id));
      CROSS_RELATIONSHIPS.forEach(rel => {
        if (visibleIds.has(rel.source) && visibleIds.has(rel.target)) {
          links.push({
            id: `cross-${rel.source}-${rel.target}`,
            source: rel.source,
            target: rel.target,
            type: 'cross',
            relationLabel: rel.label,
            animated: false
          });
        }
      });
    }

    const newMap = new Map<string, GraphNodeData>();
    nodes.forEach(n => newMap.set(n.id, n));
    nodesMapRef.current = newMap;

    return { currentNodes: nodes, currentLinks: links };
  }, [collapsedHubIds, hiddenCategories, showRelationships]);

  // Selected Node lookup
  const selectedNode = useMemo(() => {
    return (
      currentNodes.find(n => n.id === selectedNodeId) ||
      nodesMapRef.current.get(selectedNodeId) ||
      currentNodes[0]
    );
  }, [currentNodes, selectedNodeId]);

  // Determine connected neighbor IDs for relationship highlighting
  const activeFocusId = hoveredNodeId || selectedNodeId;
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const neighbors = new Set<string>([activeFocusId]);
    currentLinks.forEach(link => {
      const sId = typeof link.source === 'object' ? link.source.id : link.source;
      const tId = typeof link.target === 'object' ? link.target.id : link.target;
      if (sId === activeFocusId) neighbors.add(tId);
      if (tId === activeFocusId) neighbors.add(sId);
    });
    return neighbors;
  }, [activeFocusId, currentLinks]);

  // Connected relationship list for the Inspector Card
  const nodeRelationshipsList = useMemo(() => {
    if (!selectedNode) return [];
    return CROSS_RELATIONSHIPS.filter(
      r => r.source === selectedNode.id || r.target === selectedNode.id
    ).map(r => {
      const otherId = r.source === selectedNode.id ? r.target : r.source;
      const otherNode = nodesMapRef.current.get(otherId) || currentNodes.find(n => n.id === otherId);
      return {
        ...r,
        targetNode: otherNode
      };
    });
  }, [selectedNode, currentNodes]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        const h = Math.min(Math.max(window.innerHeight * 0.65, 520), 740);
        setDimensions({ width: clientWidth, height: h });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hub Collapse / Expand Toggles
  const toggleCollapse = useCallback((hubId: string) => {
    setCollapsedHubIds(prev => {
      const next = new Set(prev);
      if (next.has(hubId)) {
        next.delete(hubId);
      } else {
        next.add(hubId);
      }
      return next;
    });
  }, []);

  // Expand All Sub-topics
  const handleExpandAllSubtopics = () => {
    setCollapsedHubIds(new Set());
  };

  // Collapse (Cancel) All Sub-topics to return to pure Core & Hubs
  const handleCollapseAllSubtopics = () => {
    const allHubIds = ['hub-apps', 'hub-infra', 'hub-telecom', 'hub-team', 'hub-ai-research'];
    setCollapsedHubIds(new Set(allHubIds));
  };

  // Toggle Category Group Visibility
  const toggleCategoryVisibility = (catKey: string) => {
    if (catKey === 'all') {
      setHiddenCategories(new Set());
      return;
    }
    setHiddenCategories(prev => {
      const next = new Set(prev);
      if (next.has(catKey)) {
        next.delete(catKey);
      } else {
        next.add(catKey);
      }
      return next;
    });
  };

  // Zoom Helpers
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(350).call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(350).call(zoomBehaviorRef.current.scaleBy, 0.7);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(500).call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  // Main D3 Rendering Effect (Daylight Enterprise Theme with Soft Shadows)
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgEl);

    let gMain = svg.select<SVGGElement>('g.main-container');
    if (gMain.empty()) {
      gMain = svg.append('g').attr('class', 'main-container');
    }

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 3.5])
      .on('zoom', (event) => {
        setZoomTransform(event.transform);
        gMain.attr('transform', event.transform.toString());
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // SVG Defs: Soft Daylight Drop Shadows & Gradients
    let defs = svg.select<SVGDefsElement>('defs');
    if (defs.empty()) {
      defs = svg.append('defs');
      
      const filter = defs.append('filter')
        .attr('id', 'soft-daylight-shadow')
        .attr('x', '-30%')
        .attr('y', '-30%')
        .attr('width', '160%')
        .attr('height', '160%');
      filter.append('feDropShadow')
        .attr('dx', '0')
        .attr('dy', '3')
        .attr('stdDeviation', '4')
        .attr('flood-opacity', '0.14')
        .attr('flood-color', '#0f172a');

      // Grid Pattern
      const pattern = defs.append('pattern')
        .attr('id', 'engineering-grid')
        .attr('width', '32')
        .attr('height', '32')
        .attr('patternUnits', 'userSpaceOnUse');
      pattern.append('circle')
        .attr('cx', '2')
        .attr('cy', '2')
        .attr('r', '1')
        .attr('fill', '#cbd5e1');
    }

    // Force Simulation Setup
    const simulation = d3.forceSimulation<GraphNodeData, GraphLinkData>(currentNodes)
      .force(
        'link',
        d3.forceLink<GraphNodeData, GraphLinkData>(currentLinks)
          .id(d => d.id)
          .distance(d => {
            if (d.type === 'primary') return 145;
            if (d.type === 'cross') return 120;
            return 95;
          })
          .strength(d => (d.type === 'cross' ? 0.2 : 0.8))
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collide',
        d3.forceCollide<GraphNodeData>().radius(d => d.radius + 24).iterations(2)
      )
      .alphaDecay(0.028);

    simulationRef.current = simulation;

    // Anchor Root Node to center
    const rootNode = currentNodes.find(n => n.id === 'node-hq-root');
    if (rootNode) {
      rootNode.fx = width / 2;
      rootNode.fy = height / 2;
    }

    // Render Layers
    let linksGroup = gMain.select<SVGGElement>('g.links-layer');
    if (linksGroup.empty()) linksGroup = gMain.append('g').attr('class', 'links-layer');

    let nodesGroup = gMain.select<SVGGElement>('g.nodes-layer');
    if (nodesGroup.empty()) nodesGroup = gMain.append('g').attr('class', 'nodes-layer');

    // 1. DATA JOIN: Links
    const linkSelection = linksGroup
      .selectAll<SVGLineElement, GraphLinkData>('line.graph-link')
      .data(currentLinks, d => d.id)
      .join(
        enter => enter.append('line')
          .attr('class', 'graph-link')
          .attr('stroke', d => {
            if (d.type === 'primary') return 'rgba(15, 118, 110, 0.75)'; // Teal
            if (d.type === 'cross') return 'rgba(37, 99, 235, 0.6)'; // Blue
            return 'rgba(148, 163, 184, 0.65)'; // Slate
          })
          .attr('stroke-width', d => (d.type === 'primary' ? 2.8 : d.type === 'cross' ? 2.0 : 1.8))
          .attr('stroke-dasharray', d => (d.type === 'cross' ? '5,4' : 'none')),
        update => update
          .attr('stroke', d => {
            const sId = typeof d.source === 'object' ? d.source.id : d.source;
            const tId = typeof d.target === 'object' ? d.target.id : d.target;
            const isHighlighted = activeFocusId && (sId === activeFocusId || tId === activeFocusId);
            if (isHighlighted) {
              return '#0284c7'; // Active bright sky blue
            }
            if (d.type === 'primary') return 'rgba(15, 118, 110, 0.75)';
            if (d.type === 'cross') return 'rgba(37, 99, 235, 0.55)';
            return 'rgba(148, 163, 184, 0.65)';
          })
          .attr('stroke-width', d => {
            const sId = typeof d.source === 'object' ? d.source.id : d.source;
            const tId = typeof d.target === 'object' ? d.target.id : d.target;
            const isHighlighted = activeFocusId && (sId === activeFocusId || tId === activeFocusId);
            if (isHighlighted) return 3.5;
            return d.type === 'primary' ? 2.8 : d.type === 'cross' ? 2.0 : 1.8;
          })
          .attr('opacity', d => {
            if (!activeFocusId) return 1;
            const sId = typeof d.source === 'object' ? d.source.id : d.source;
            const tId = typeof d.target === 'object' ? d.target.id : d.target;
            const isConnected = sId === activeFocusId || tId === activeFocusId;
            return isConnected ? 1 : 0.2;
          }),
        exit => exit.remove()
      );

    // 2. DATA JOIN: Nodes (Daylight White Bubble with Crisp Glow)
    const nodeSelection = nodesGroup
      .selectAll<SVGGElement, GraphNodeData>('g.graph-node')
      .data(currentNodes, d => d.id)
      .join(
        enter => {
          const g = enter.append('g')
            .attr('class', 'graph-node')
            .style('cursor', 'pointer');

          // Outer Ripple Ring
          g.append('circle')
            .attr('class', 'ripple-ring')
            .attr('r', d => d.radius + 6)
            .attr('fill', 'none')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 1.6)
            .attr('opacity', 0.45)
            .attr('stroke-dasharray', d => (d.isCollapsed ? '3,3' : 'none'));

          // Main Circle Bubble
          g.append('circle')
            .attr('class', 'main-body')
            .attr('r', d => d.radius)
            .attr('fill', d => d.color)
            .attr('filter', 'url(#soft-daylight-shadow)')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2.8);

          // Center Icon / State Badge
          g.append('text')
            .attr('class', 'node-icon-badge')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('fill', '#ffffff')
            .attr('font-size', d => (d.level === 0 ? '15px' : d.level === 1 ? '13px' : '11px'))
            .attr('font-weight', 'bold')
            .text(d => {
              if (d.level === 0) return '★';
              if (d.category === 'hub') return d.isCollapsed ? '+' : '−';
              return '•';
            });

          // Text Label Background Pill (Clean White with subtle shadow)
          g.append('rect')
            .attr('class', 'label-bg')
            .attr('rx', 7)
            .attr('ry', 7)
            .attr('fill', '#ffffff')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 1.4)
            .attr('filter', 'url(#soft-daylight-shadow)');

          // Node Text Label
          g.append('text')
            .attr('class', 'label-text')
            .attr('text-anchor', 'middle')
            .attr('font-size', d => (d.level === 0 ? '12px' : '11px'))
            .attr('font-weight', 'bold')
            .attr('font-family', 'Cairo, sans-serif')
            .attr('fill', '#0f172a')
            .text(d => d.name);

          // Drag behavior
          const drag = d3.drag<SVGGElement, GraphNodeData>()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              if (d.id !== 'node-hq-root') {
                d.fx = null;
                d.fy = null;
              }
            });

          g.call(drag);

          // Interactivity
          g.on('mouseenter', (_event, d) => {
            setHoveredNodeId(d.id);
          });

          g.on('mouseleave', () => {
            setHoveredNodeId(null);
          });

          g.on('click', (event, d) => {
            event.stopPropagation();
            setSelectedNodeId(d.id);
            if (d.category === 'hub') {
              toggleCollapse(d.id);
            }
          });

          return g;
        },
        update => {
          const isDimmed = (d: GraphNodeData) => {
            if (!activeFocusId) return false;
            return !connectedNodeIds.has(d.id);
          };

          update
            .transition()
            .duration(200)
            .attr('opacity', d => (isDimmed(d) ? 0.3 : 1));

          update.select('circle.main-body')
            .attr('r', d => (d.id === selectedNodeId ? d.radius + 3.5 : d.radius))
            .attr('stroke', d => (d.id === selectedNodeId ? '#0284c7' : '#ffffff'))
            .attr('stroke-width', d => (d.id === selectedNodeId ? 3.8 : 2.8));

          update.select('circle.ripple-ring')
            .attr('stroke-dasharray', d => (d.isCollapsed ? '3,3' : 'none'))
            .attr('opacity', d => (d.isCollapsed ? 0.85 : 0.45));

          update.select('text.node-icon-badge')
            .text(d => {
              if (d.level === 0) return '★';
              if (d.category === 'hub') return d.isCollapsed ? '+' : '−';
              return '•';
            });

          update.select('text.label-text')
            .attr('font-weight', d => (d.id === selectedNodeId ? '900' : 'bold'))
            .attr('fill', d => (d.id === selectedNodeId ? '#0284c7' : '#0f172a'))
            .text(d => d.name);

          return update;
        },
        exit => exit.transition().duration(250).attr('opacity', 0).remove()
      );

    // Measure and position label backgrounds
    nodeSelection.each(function() {
      const g = d3.select(this);
      const textNode = g.select<SVGTextElement>('text.label-text').node();
      if (textNode) {
        try {
          const bbox = textNode.getBBox();
          if (bbox && bbox.width > 0) {
            g.select('rect.label-bg')
              .attr('x', bbox.x - 7)
              .attr('y', bbox.y - 3)
              .attr('width', bbox.width + 14)
              .attr('height', bbox.height + 6);
          }
        } catch {
          // Safe fallback
        }
      }
    });

    // Tick Handler
    simulation.on('tick', () => {
      currentNodes.forEach(node => {
        const r = node.radius + 24;
        node.x = Math.max(r, Math.min(width - r, node.x || width / 2));
        node.y = Math.max(r, Math.min(height - r, node.y || height / 2));
      });

      linkSelection
        .attr('x1', d => (d.source as GraphNodeData).x || 0)
        .attr('y1', d => (d.source as GraphNodeData).y || 0)
        .attr('x2', d => (d.target as GraphNodeData).x || 0)
        .attr('y2', d => (d.target as GraphNodeData).y || 0);

      nodeSelection.attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);

      nodeSelection.select('text.label-text')
        .attr('y', d => d.radius + 16);
      nodeSelection.select('rect.label-bg')
        .attr('y', d => d.radius + 5);
    });

    if (!isPlaying) {
      simulation.stop();
    } else {
      simulation.alpha(0.3).restart();
    }

    return () => {
      simulation.stop();
    };
  }, [currentNodes, currentLinks, dimensions, isPlaying, selectedNodeId, activeFocusId, connectedNodeIds, toggleCollapse]);

  return (
    <div className="space-y-4 pb-20 select-none animate-in fade-in duration-200">
      
      {/* Top Header Card - Daylight Enterprise Theme */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white text-slate-800 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold shadow-xs shrink-0 text-teal-700">
            <Network className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                MASHWEER IT TOPOLOGY & RELATIONSHIPS GRAPH
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200">
                مقر المعادي
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                عرض المصرية للاتصالات WE VPN
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              المخطط البياني التفاعلي الشامل للبنية التحتية، السيرفرات، شبكات الربط و WE VPN، وتطبيقات منظومة مشاوير مع تتبع العلاقات الحية.
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-auto relative z-10">
          
          {/* Expand/Collapse All Sub-topics */}
          <button
            onClick={collapsedHubIds.size > 0 ? handleExpandAllSubtopics : handleCollapseAllSubtopics}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
            title="توسيع أو طي كافة المواضيع التابعة"
          >
            {collapsedHubIds.size > 0 ? (
              <>
                <FolderPlus className="w-4 h-4 text-teal-600" />
                <span>إظهار المواضيع التابعة</span>
              </>
            ) : (
              <>
                <FolderMinus className="w-4 h-4 text-slate-500" />
                <span>إلغاء (طي) المواضيع التابعة</span>
              </>
            )}
          </button>

          {/* Toggle Cross Relationships Lines */}
          <button
            onClick={() => setShowRelationships(!showRelationships)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95 ${
              showRelationships
                ? 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
            title="إظهار أو إخفاء شبكة العلاقات المترابطة"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>{showRelationships ? 'إخفاء شبكة العلاقات' : 'إظهار شبكة العلاقات'}</span>
          </button>

          {/* Play/Pause Physics */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95 ${
              isPlaying 
                ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'إيقاف الحركة' : 'تشغيل الحركة'}</span>
          </button>

          {/* Reset View */}
          <button
            onClick={handleResetZoom}
            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
            title="إعادة ضبط حجم الشاشة"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>إعادة التمركز</span>
          </button>

        </div>
      </div>

      {/* Bubble Group Filter Pills (إظهار وإخفاء مجموعات الفقاعات) */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-bold shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-teal-600" />
          <span>التحكم في ظهور مجموعات الفقاعات:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(cat => {
            const isHidden = hiddenCategories.has(cat.key);
            const isAll = cat.key === 'all';
            return (
              <button
                key={cat.key}
                onClick={() => toggleCategoryVisibility(cat.key)}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-xs active:scale-95 ${
                  isAll 
                    ? hiddenCategories.size === 0 
                      ? 'bg-teal-700 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    : isHidden
                      ? 'bg-slate-100 text-slate-400 line-through border border-dashed border-slate-300'
                      : 'bg-white text-slate-800 border border-slate-200 hover:border-teal-400'
                }`}
              >
                {!isAll && (
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: isHidden ? '#94a3b8' : cat.color }}
                  />
                )}
                <span>{cat.label}</span>
                {!isAll && (
                  isHidden ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-slate-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Graph Stage - Daylight Crisp Background */}
      <div 
        ref={containerRef}
        className="relative rounded-3xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-slate-300/80 shadow-md overflow-hidden"
      >
        {/* Radar HUD Info Overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] text-slate-700 font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>NODES: {currentNodes.length}</span>
            <span className="text-slate-300">|</span>
            <span>LINKS: {currentLinks.length}</span>
            <span className="text-slate-300">|</span>
            <span>RELATIONS: {showRelationships ? 'ACTIVE' : 'MUTED'}</span>
            <span className="text-slate-300">|</span>
            <span>ZOOM: {(zoomTransform.k * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Floating Controls Overlay (Zoom In, Zoom Out, Reset) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition shadow-sm active:scale-95"
            title="تكبير"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition shadow-sm active:scale-95"
            title="تصغير"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="w-8 h-8 rounded-xl bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition shadow-sm active:scale-95"
            title="إعادة التمركز"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Instruction Note */}
        <div className="absolute bottom-12 right-3 z-10 pointer-events-none hidden sm:block">
          <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] text-slate-700 font-sans shadow-sm flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>اضغط على أي فقاعة لتتبع علاقاتها المترابطة، أو اضغط (+ / −) لتوسيع وطي المواضيع التابعة</span>
          </div>
        </div>

        {/* SVG Drawing Canvas with D3 */}
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto block select-none"
        >
          <rect width="100%" height="100%" fill="url(#engineering-grid)" opacity="0.6" />
        </svg>

        {/* Bottom Legend Bar - Daylight Soft Style */}
        <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
            <span className="flex items-center gap-1.5 text-teal-800 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> القيادة المركزية
            </span>
            <span className="flex items-center gap-1.5 text-sky-800">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> تطبيقات مشاوير (4)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> عتاد وشبكات المعادي (6)
            </span>
            <span className="flex items-center gap-1.5 text-blue-800 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> خطوط الربط و WE VPN (3)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-800">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> فريق العمل بالمقر (4)
            </span>
            <span className="flex items-center gap-1.5 text-purple-800">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> الذكاء الاصطناعي وكاجل (3)
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-teal-700 font-bold">
            <Zap className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>LIVE TOPOLOGY & WE VPN</span>
          </div>
        </div>
      </div>

      {/* Selected Node Details Card & Cross Relationships Inspector */}
      {selectedNode && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 animate-in slide-in-from-bottom-2">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-bold shadow-md shrink-0"
                style={{ backgroundColor: selectedNode.color }}
              >
                {selectedNode.category === 'telecom' ? (
                  <Radio className="w-6 h-6 stroke-[2.2px]" />
                ) : selectedNode.category === 'mashweer' ? (
                  <Activity className="w-6 h-6 stroke-[2.2px]" />
                ) : selectedNode.category === 'team' ? (
                  <Users className="w-6 h-6 stroke-[2.2px]" />
                ) : selectedNode.category === 'ai' ? (
                  <Sparkles className="w-6 h-6 stroke-[2.2px]" />
                ) : (
                  <Cpu className="w-6 h-6 stroke-[2.2px]" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedNode.name}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                    {selectedNode.role}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                    {selectedNode.status}
                  </span>
                  {selectedNode.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      {selectedNode.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>
            </div>

            {/* Quick Actions for Selected Node */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
              
              {/* Expand/Collapse Toggle if Hub */}
              {selectedNode.category === 'hub' && (
                <button
                  onClick={() => toggleCollapse(selectedNode.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
                >
                  {selectedNode.isCollapsed ? (
                    <>
                      <FolderPlus className="w-3.5 h-3.5 text-teal-400" />
                      <span>توسيع المواضيع التابعة ({selectedNode.name})</span>
                    </>
                  ) : (
                    <>
                      <FolderMinus className="w-3.5 h-3.5 text-slate-300" />
                      <span>طي المواضيع التابعة ({selectedNode.name})</span>
                    </>
                  )}
                </button>
              )}

              {onAskHypatia && (
                <button
                  onClick={() => onAskHypatia(`أريد استشارة تقنية وتنفيذية حول عقدة: ${selectedNode.name} (${selectedNode.role}) ومسارها ومشاريعها المترابطة بمقر المعادي وعرض WE VPN.`)}
                  className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition shadow-xs active:scale-95"
                  title="استشارة هيباتيا"
                >
                  <Bot className="w-4 h-4" />
                </button>
              )}

              {onOpenProjectSource && (
                <button
                  onClick={onOpenProjectSource}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition border border-slate-200 active:scale-95"
                  title="فتح مسار المجلد على Google Drive"
                >
                  <HardDrive className="w-4 h-4 text-teal-700" />
                </button>
              )}
            </div>
          </div>

          {/* Node Technical Specs Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
              <span className="text-slate-400 block text-[10px] mb-0.5">المسار في Google Drive:</span>
              <strong className="text-teal-800 break-all">{selectedNode.driveFolder}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
              <span className="text-slate-400 block text-[10px] mb-0.5">المواصفات الفنية والعتاد الهندسي:</span>
              <strong className="text-blue-800 break-all">{selectedNode.metrics}</strong>
            </div>
          </div>

          {/* Cross Relationships Web (المواضيع والعقد المترابطة مع هذه الفقاعة) */}
          {nodeRelationshipsList.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                <Workflow className="w-4 h-4 text-blue-600" />
                <span>المواضيع والعلاقات المترابطة مباشرة مع هذه العقدة ({nodeRelationshipsList.length}):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {nodeRelationshipsList.map(rel => {
                  const target = rel.targetNode;
                  if (!target) return null;
                  return (
                    <button
                      key={rel.label + target.id}
                      onClick={() => setSelectedNodeId(target.id)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 text-right transition flex flex-col gap-1 group active:scale-95"
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-800">
                        <span className="flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full shrink-0" 
                            style={{ backgroundColor: target.color }} 
                          />
                          <span className="group-hover:text-blue-700">{target.name}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
                      </div>
                      <span className="text-[10px] text-blue-700 font-semibold">{rel.label}</span>
                      <p className="text-[10px] text-slate-500 leading-tight">{rel.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Fast Navigation Quick Strip across 5 Hubs */}
      <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-bold">
          <Layers className="w-4 h-4 text-teal-600" />
          <span>التنقل السريع بين المجموعات المركزية الخمس:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedNodeId('hub-apps')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedNodeId === 'hub-apps' 
                ? 'bg-sky-100 text-sky-900 border border-sky-300' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            تطبيقات مشاوير (4)
          </button>
          
          <button
            onClick={() => setSelectedNodeId('hub-infra')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedNodeId === 'hub-infra' 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            بنية وشبكات المعادي (6)
          </button>

          <button
            onClick={() => setSelectedNodeId('hub-telecom')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedNodeId === 'hub-telecom' || selectedNodeId === 'node-we-vpn-offer'
                ? 'bg-blue-100 text-blue-900 border border-blue-300 font-black' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            خطوط الربط و WE VPN (3)
          </button>

          <button
            onClick={() => setSelectedNodeId('hub-team')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedNodeId === 'hub-team' 
                ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            فريق العمل بالمقر (4)
          </button>

          <button
            onClick={() => setSelectedNodeId('hub-ai-research')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedNodeId === 'hub-ai-research' 
                ? 'bg-purple-100 text-purple-900 border border-purple-300' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            الذكاء الاصطناعي وكاجل (3)
          </button>
        </div>
      </div>

    </div>
  );
};
