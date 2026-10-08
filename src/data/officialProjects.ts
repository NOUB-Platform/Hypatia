// ==============================================================================
// قائمة تطبيقات ومنصات شركة مشاوير للمنصات الرقمية الرسمية المعتمدة
// محصورة حصرياً في التطبيقات الـ 3 المعتمدة للشركة:
// 1. فور بي (4B) #001
// 2. وكالة (WeKaLa) #002
// 3. دارو (Daro) #003
// (تم فصل كافة المشاريع الشخصية المستقلة في ملف الأرشيف الخاص بم/ سامح ياسين)
// ==============================================================================

export interface ProjectCard {
  id: string;
  number: string; // #001, #002, #003
  name: string;
  nameEn: string;
  category: 'قيد التجربة' | 'موبايل' | 'ويب' | 'مكتمل' | 'خاص';
  badgeColor: string;
  circleBgColor: string;
  icon: string;
  apkStatus: string;
  dashboardStatus: string;
  figmaProgress: number;
  emailsCount: number;
  emailsList?: string[];
  openRequestsCount: number;
  openRequests?: string[];
  nextMeeting: string;
  meetingLink?: string;
  apkLink?: string;
  figmaLink?: string;
  dashboardLink?: string;
  githubLink?: string;
  driveLink?: string;
  notes: string;
  updatedAt?: string;
}

export const OFFICIAL_10_PROJECTS: ProjectCard[] = [
  {
    id: 'proj-4b',
    number: '#001',
    name: 'فور بي (4B App)',
    nameEn: '4B Passenger & Fleet',
    category: 'قيد التجربة',
    badgeColor: 'from-amber-400 via-orange-500 to-rose-600',
    circleBgColor: 'bg-gradient-to-tr from-amber-950/90 to-amber-900/60 text-amber-300 border-amber-500/40',
    icon: '🚗',
    apkStatus: 'استلمنا الـ APK التجريبي للتشغيل والتجربة الميدانية',
    dashboardStatus: 'استلمنا الداش بورد لاختبار العمليات وإدخال وتدقيق البيانات',
    figmaProgress: 95,
    emailsCount: 5,
    emailsList: [
      'admin@4b-app.com',
      'support@4b-app.com',
      'team@4b-app.com',
      'operations@4b-app.com',
      'ceo@4b-app.com'
    ],
    openRequestsCount: 2,
    openRequests: [
      'مراجعة إشعارات الدفع والخصومات التلقائية',
      'فحص سرعة استجابة الخرائط وتتبع الكابتن المباشر'
    ],
    nextMeeting: 'السبت القادم - 5:00 مساءً',
    meetingLink: 'https://meet.google.com/mashweer-4b-sync',
    apkLink: 'https://drive.google.com/drive/folders/MASHWEER_4B_BUILDS_APK',
    figmaLink: 'https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6/%D9%85%D8%B4%D8%A7%D9%88%D9%8A%D8%B1---backlog?node-id=221-63531',
    dashboardLink: 'https://dashboard.mashawer.com.eg',
    githubLink: 'https://github.com/mashweer/4b-passenger-app',
    driveLink: 'https://drive.google.com/drive/folders/1MASHWEER_VALUE_TECH_ASSETS',
    notes: 'التطبيق مستلم منه الـ APK والداش بورد ويجري اختبارهما معاً لمطابقة تدفق البيانات من التطبيق إلى لوحة العمليات.'
  },
  {
    id: 'proj-wekala',
    number: '#002',
    name: 'وكالة (WeKaLa)',
    nameEn: 'Wekala Fleet & Agency',
    category: 'موبايل',
    badgeColor: 'from-blue-500 via-indigo-500 to-cyan-400',
    circleBgColor: 'bg-gradient-to-tr from-blue-950/90 to-indigo-900/60 text-sky-300 border-sky-500/40',
    icon: '🏢',
    apkStatus: 'استلمنا أحدث نسخة APK منقحة للمراجعة والتدقيق الميداني',
    dashboardStatus: 'استلمنا الداش بورد وفحصها ودققها سامح بالكامل (متاح رابط الدخول)',
    figmaProgress: 80,
    emailsCount: 4,
    emailsList: [
      'contact@wekala.com',
      'info@wekala.com',
      'dev@wekala.com',
      'partner@wekala.com'
    ],
    openRequestsCount: 3,
    openRequests: [
      'اختبار صلاحيات تسجيل الدخول على https://wikala-admin-panel.vercel.app/login',
      'أرشفة تقرير التدقيق الفني الشامل وتوصيات سامح في المنظومة',
      'ربط خرائط فروع الوكلاء ومحطات التوزيع وتدقيق العمولات'
    ],
    nextMeeting: 'الأحد القادم - 6:30 مساءً',
    meetingLink: 'https://meet.google.com/wekala-review',
    apkLink: 'https://drive.google.com/drive/folders/MASHWEER_WEKALA_ASSETS',
    figmaLink: 'https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala?node-id=0-1',
    dashboardLink: 'https://wikala-admin-panel.vercel.app/login',
    githubLink: 'https://github.com/mashweer/wekala-fleet-management',
    driveLink: 'https://drive.google.com/drive/folders/MASHWEER_WEKALA_ASSETS',
    notes: 'تم استلام لوحة التحكم وتشغيلها على Vercel وإجراء فحص وتدقيق تقني شامل من سامح، وجارٍ استكمال اختبارات الـ APK.'
  },
  {
    id: 'proj-daro',
    number: '#003',
    name: 'دارو (Daro Cargo)',
    nameEn: 'Daro Cargo & Shipping',
    category: 'موبايل',
    badgeColor: 'from-emerald-400 via-teal-500 to-cyan-600',
    circleBgColor: 'bg-gradient-to-tr from-teal-950/90 to-emerald-900/60 text-emerald-300 border-emerald-500/40',
    icon: '📦',
    apkStatus: 'في انتظار رفع نسخة الـ APK الخاصة بقارئ الباركود ومحطات الشحن',
    dashboardStatus: 'لوحة توزيع محطات الشحن قيد التصميم الهندسي',
    figmaProgress: 70,
    emailsCount: 3,
    emailsList: [
      'cargo@mashawer.com.eg',
      'operations@daro.com',
      'support@daro.com'
    ],
    openRequestsCount: 3,
    openRequests: [
      'فحص سرعة قراءة الباركود للطرود عند استلام الشحنة',
      'تجهيز بوليصة الشحن الرقمية وإرسال رسالة SMS للعميل',
      'متابعة أسطول شاحنات النقل بين المدن'
    ],
    nextMeeting: 'الإثنين القادم - 4:30 عصراً',
    meetingLink: '',
    apkLink: '',
    figmaLink: 'https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro?node-id=0-1',
    dashboardLink: '',
    githubLink: 'https://github.com/mashweer/daro-cargo-system',
    driveLink: '',
    notes: 'مشروع الشحن اللوجستي بين المدن والمحافظات، يعتمد على محطات التوزيع ومسح باركود الشحنات.'
  }
];

export const SUPABASE_CLEAN_REBUILD_SQL = `-- ==============================================================================
-- سكيما قاعدة بيانات مشاوير للمنصات الرقمية (4B, WeKaLa, Daro)
-- ==============================================================================

-- 1. جدول مستخدمي وكباتن المنظومة
CREATE TABLE IF NOT EXISTS public.mashweer_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role VARCHAR(30) DEFAULT 'passenger', -- passenger, captain, agent, admin
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. جدول رحلات تطبيق فور بي (4B Trips)
CREATE TABLE IF NOT EXISTS public.trips_4b (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id UUID REFERENCES public.mashweer_users(id),
  captain_id UUID REFERENCES public.mashweer_users(id),
  pickup_lat DOUBLE PRECISION NOT NULL,
  pickup_lng DOUBLE PRECISION NOT NULL,
  dropoff_lat DOUBLE PRECISION NOT NULL,
  dropoff_lng DOUBLE PRECISION NOT NULL,
  fare_amount NUMERIC(10,2) NOT NULL,
  surge_multiplier NUMERIC(3,2) DEFAULT 1.0,
  status VARCHAR(30) DEFAULT 'requested',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. جدول وكلاء ومكاتب تطبيق وكالة (WeKaLa)
CREATE TABLE IF NOT EXISTS public.agencies_wekala (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name VARCHAR(150) NOT NULL,
  governorate VARCHAR(50) NOT NULL,
  agent_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  commission_rate NUMERIC(4,2) DEFAULT 0.15,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. جدول شحنات تطبيق دارو (Daro Cargo)
CREATE TABLE IF NOT EXISTS public.cargo_daro (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  barcode VARCHAR(100) NOT NULL,
  origin_city VARCHAR(50) NOT NULL,
  destination_city VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'hub_received',
  created_at TIMESTAMPTZ DEFAULT now()
);
`;

