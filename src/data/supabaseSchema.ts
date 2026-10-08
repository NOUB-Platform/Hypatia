// ==============================================================================
// Hypatia Architecture: Supabase Database Schema & Seed Engine
// Database: PostgreSQL with Supabase Row Level Security (RLS)
// Organization: Mashweer Digital Platforms & Maadi HQ Infrastructure
// ==============================================================================

export const SUPABASE_MASTER_SQL = `-- ==============================================================================
-- Mashweer Digital Platforms - Hypatia Architecture: Supabase Database Schema
-- Database: PostgreSQL with Supabase Row Level Security (RLS)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Projects Table (المشاريع والمستودعات)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'مشاوير',
    status TEXT NOT NULL DEFAULT 'نشط',
    description TEXT,
    repo_url TEXT,
    figma_url TEXT,
    live_url TEXT,
    apk_files JSONB DEFAULT '[]'::jsonb,
    drive_assets JSONB DEFAULT '[]'::jsonb,
    reference_chats JSONB DEFAULT '[]'::jsonb,
    context_hints JSONB DEFAULT '[]'::jsonb,
    db_info JSONB DEFAULT '{"engine": "PostgreSQL", "tables": []}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Service Providers & Cloud Vault (المزودين واستضافات السحابة)
CREATE TABLE IF NOT EXISTS public.service_providers (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'استضافة وخوادم',
    portal_url TEXT,
    username TEXT,
    status TEXT NOT NULL DEFAULT 'نشط',
    notes TEXT,
    cost_or_plan TEXT,
    official_badge TEXT,
    active_services JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Contracts & Deliverables (العقود والتسليمات والماليات)
CREATE TABLE IF NOT EXISTS public.contracts (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
    title TEXT NOT NULL,
    provider_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'قيد التنفيذ',
    total_value TEXT,
    currency TEXT DEFAULT 'EGP',
    payment_terms TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Domains & Mailboxes (النطاقات والبريد المؤسسي)
CREATE TABLE IF NOT EXISTS public.mashweer_emails (
    id TEXT PRIMARY KEY,
    user_id UUID,
    address TEXT NOT NULL UNIQUE,
    role_title TEXT NOT NULL,
    department TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'مجدول للتفعيل',
    quota TEXT DEFAULT '5 GB',
    assigned_to TEXT,
    webmail_url TEXT DEFAULT 'https://mashawer.com.eg:2096',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist
ALTER TABLE public.mashweer_emails ADD COLUMN IF NOT EXISTS quota TEXT DEFAULT '5 GB';
ALTER TABLE public.mashweer_emails ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE public.mashweer_emails ADD COLUMN IF NOT EXISTS webmail_url TEXT DEFAULT 'https://mashawer.com.eg:2096';
ALTER TABLE public.mashweer_emails ADD COLUMN IF NOT EXISTS notes TEXT;

-- 5. Project Tasks & Milestones (المهام التشغيلية ومتابعة المطورين)
CREATE TABLE IF NOT EXISTS public.project_tasks (
    id TEXT PRIMARY KEY,
    user_id UUID,
    project_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL DEFAULT 'متوسطة',
    status TEXT NOT NULL DEFAULT 'قيد التنفيذ',
    due_date TEXT,
    assigned_to TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.project_tasks ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE public.project_tasks ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.project_tasks ADD COLUMN IF NOT EXISTS description TEXT;

-- 6. System Inquiries & Decision Ledger (الأسئلة المعلقة وسجل القرارات)
CREATE TABLE IF NOT EXISTS public.system_inquiries (
    id TEXT PRIMARY KEY,
    user_id UUID,
    question TEXT NOT NULL,
    context TEXT,
    category TEXT NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'medium',
    input_type TEXT DEFAULT 'options',
    options JSONB DEFAULT '[]'::jsonb,
    answered BOOLEAN DEFAULT FALSE,
    answer TEXT,
    answered_at TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Hardware & Network Inventory (عتاد وسيرفرات مقر المعادي)
CREATE TABLE IF NOT EXISTS public.hardware_inventory (
    id TEXT PRIMARY KEY,
    user_id UUID,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specs TEXT,
    location TEXT DEFAULT 'مقر المعادي - غرفة السيرفرات',
    invoice_ref TEXT,
    vendor TEXT,
    status TEXT DEFAULT 'مورد ومعتمد بالراك',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Chat History (سجل محادثات هيباتيا الذكية)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    user_id UUID,
    project_id TEXT,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    action_chips JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. System Vault (الخزنة السرية للمفاتيح المشفرة)
CREATE TABLE IF NOT EXISTS public.system_vault (
    id TEXT PRIMARY KEY,
    user_id UUID,
    key_name TEXT NOT NULL,
    key_value TEXT NOT NULL,
    service_tag TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Enable Row Level Security (RLS) & Public Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mashweer_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hardware_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_vault ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Projects Access" ON public.projects;
CREATE POLICY "Projects Access" ON public.projects FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Providers Access" ON public.service_providers;
CREATE POLICY "Providers Access" ON public.service_providers FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Contracts Access" ON public.contracts;
CREATE POLICY "Contracts Access" ON public.contracts FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Mailboxes Access" ON public.mashweer_emails;
CREATE POLICY "Mailboxes Access" ON public.mashweer_emails FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Tasks Access" ON public.project_tasks;
CREATE POLICY "Tasks Access" ON public.project_tasks FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Inquiries Access" ON public.system_inquiries;
CREATE POLICY "Inquiries Access" ON public.system_inquiries FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Hardware Access" ON public.hardware_inventory;
CREATE POLICY "Hardware Access" ON public.hardware_inventory FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Chat Access" ON public.chat_messages;
CREATE POLICY "Chat Access" ON public.chat_messages FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Vault Access" ON public.system_vault;
CREATE POLICY "Vault Access" ON public.system_vault FOR ALL TO public USING (true) WITH CHECK (true);

-- Indexes for lightning queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_answered ON public.system_inquiries(answered);
CREATE INDEX IF NOT EXISTS idx_inquiries_cat ON public.system_inquiries(category);
`;

export const SUPABASE_SEED_SQL = `-- ==============================================================================
-- Mashweer Digital Platforms - Hypatia Initial Seed Data
-- ==============================================================================

-- 1. Insert Projects (مشاريع مشاوير والبنية التحتية)
INSERT INTO public.projects (id, name, code, category, status, description, repo_url, figma_url, live_url, apk_files, drive_assets, db_info)
VALUES
(
    'proj-4b',
    'تطبيق وسائق مشاوير 4B (Mashweer 4B)',
    'MASHWEER-4B',
    'مشاوير',
    'في الإنتاج والتسليم',
    'تطبيق طلب الرحلات وتوصيل الأفراد والشحنات مع واجهات الركاب والسائقين وخادم المصرية للاتصالات WE.',
    'github.com/mashweer-platforms/mashweer-4b',
    'https://www.figma.com/design/mashweer-rider-driver-4b',
    'https://mashawer.com.eg',
    '[{"id":"apk-m-1","version":"v2.4.1-rc","buildNumber":24,"fileName":"Mashweer_Driver_4B.apk","fileSize":"42.5 MB","uploadedAt":"2026-09-08","status":"تم اعتماده"}]'::jsonb,
    '[{"id":"drive-mash-1","name":"مجلد عقود ومسارات مشاوير 4B","pathOrUrl":"https://drive.google.com/drive/folders/1MASHWEER_VALUE_TECH_ASSETS","type":"design"}]'::jsonb,
    '{"engine":"PostgreSQL / PostGIS","tables":["trips","drivers","riders","locations","fares"]}'::jsonb
),
(
    'proj-wekala',
    'تطبيق مزادات وسوق الوكالة (Wekala Auctions)',
    'WEKALA-AUCTION',
    'مشاوير',
    'مرحلة الاختبار QA',
    'منصة وتطبيق مزادات الوكالة للسلع النادرة والتجارة المباشرة مع المزايدة اللحظية.',
    'github.com/mashweer-platforms/wekala-auction-app',
    'https://www.figma.com/design/wekala-auction-screens',
    'https://wekala.com.eg',
    '[{"id":"apk-w-1","version":"v1.2.0","buildNumber":12,"fileName":"Wekala_Auctions_v1.2.apk","fileSize":"28.7 MB","uploadedAt":"2026-09-05","status":"جاهز للاختبار"}]'::jsonb,
    '[]'::jsonb,
    '{"engine":"PostgreSQL","tables":["auctions","bids","items","wallets"]}'::jsonb
),
(
    'proj-daro',
    'تطبيق ومستودعات شحن دارو (Daro Logistics)',
    'DARO-LOGISTICS',
    'مشاوير',
    'قيد التطوير',
    'منصة وتطبيق شحن الطرود والمستودعات والتوزيع الجغرافي السريع.',
    'github.com/mashweer-platforms/daro-logistics-app',
    'https://www.figma.com/design/daro-screens-valuetech',
    'https://daro.eg',
    '[]'::jsonb,
    '[]'::jsonb,
    '{"engine":"PostgreSQL","tables":["shipments","warehouses","manifests","drivers"]}'::jsonb
),
(
    'proj-maadi-hq',
    'البنية التحتية وغرفة سيرفرات المعادي (Maadi HQ)',
    'MAADI-HQ-IT',
    'بنية تحتية',
    'في الإنتاج',
    'غرفة السيرفرات الرئيسية بمقر المعادي: راك بيرلا 27U، سيرفر Dell R640، جهازي HP Z440 (Proxmox + OPNsense)، سويتش سيسكو 3850 PoE، و16 كاميرا هيكفيجن.',
    'github.com/mashweer-platforms/maadi-infrastructure',
    '',
    'https://mashawer.com.eg',
    '[]'::jsonb,
    '[{"id":"drive-hq-1","name":"مخططات شبكة المعادي وفواتير رد لاين وسيسكو","pathOrUrl":"https://drive.google.com/drive/folders/1MAADI_HQ_NETWORK_DOCS","type":"docs"}]'::jsonb,
    '{"engine":"Proxmox VE / OPNsense","tables":["vlans","firewall_rules","nvr_streams","dhcp_leases"]}'::jsonb
),
(
    'proj-4b-operations-noc',
    'غرفة عمليات ومراقبة برنامج 4B (4B Operations NOC)',
    '4B-OPS-NOC',
    'عمليات وتشغيل',
    'في الإنتاج',
    'غرفة العمليات المركزية لمتابعة خوادم برنامج 4B، خطوط الربط المباشرة مع المصرية للاتصالات WE وأجهزة التتبع LTRA.',
    'github.com/mashweer-platforms/4b-operations-noc',
    '',
    'https://ops.mashawer.com.eg',
    '[]'::jsonb,
    '[]'::jsonb,
    '{"engine":"PostgreSQL / PostGIS","tables":["trips_stream","active_drivers","audit_logs","latency_metrics"]}'::jsonb
),
(
    'proj-kaggle-ucp',
    'مسابقة كاجل وبروتوكول UCP (Kaggle & UCP-LLM)',
    'KAGGLE-UCP',
    'خاص',
    'قيد التطوير',
    'مسار الورقة البحثية وكود الوكيل الذاتي لجائزة كاجل ($100k) ونموذج Gemma 4 أوفلاين.',
    'github.com/mashweer-platforms/kaggle-gemma-ucp',
    '',
    'https://kaggle.com',
    '[]'::jsonb,
    '[]'::jsonb,
    '{"engine":"Python / Unsloth","tables":["benchmarks","eval_runs","context_tokens"]}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    description = EXCLUDED.description,
    updated_at = NOW();

-- 2. Insert Hardware Inventory (عتاد مقر المعادي)
INSERT INTO public.hardware_inventory (id, name, role, specs, location, invoice_ref, vendor, status)
VALUES
(
    'hw-z-server-1',
    'HP Z440 Workstation (سيرفر المعادي والتطبيقات والجدار الناري)',
    'Hypervisor / Application Server / OPNsense Firewall / NVR',
    'Intel Xeon E5-2697 v4 (18 Cores / 36 Threads) • 64GB DDR4 ECC Registered • 2x 1TB NVMe + 4TB Enterprise HDD',
    'مقر المعادي - غرفة السيرفرات (كابينة الراك 27U)',
    'أصول سامح ياسين المعتمدة',
    'HP Enterprise Workstations',
    'مورد ومعتمد بالراك (Proxmox VE 8.x)'
),
(
    'hw-z-workstation-2',
    'HP Z440 Workstation (محطة التطوير والتحكم والمراقبة)',
    'Development Workstation & Multi-Monitor Ops',
    'Intel Xeon E5-2697 v4 • 64GB DDR4 ECC • 3x Dell 22-inch Monitors with Integrated Webcams',
    'مقر المعادي - مكتب قيادة التكنولوجيا (غرفة 5)',
    'أصول سامح ياسين المعتمدة',
    'HP Enterprise Workstations',
    'جاهز للتشغيل والربط بـ 3 شاشات'
),
(
    'hw-cisco-3850',
    'سويتش سيسكو 48 بورت (Cisco Catalyst WS-C3850-48P-L)',
    'Core Layer 3 PoE+ Enterprise Switch',
    '48 Gigabit PoE+ Ports • 4x 10G SFP+ Uplinks • Cisco IOS-XE • 435W PoE Budget',
    'مقر المعادي - راك بيرلا 27U',
    'فاتورة توريد معتمدة',
    'Cisco Systems Enterprise',
    'مورد ومثبت بالراك'
),
(
    'hw-dell-r640',
    'سيرفر ديل (Dell PowerEdge R640 Platinum)',
    'Dual Xeon Enterprise Rack Server',
    '2x Intel Xeon Platinum 8160 (48 Cores / 96 Threads) • 64GB DDR4 ECC (قابل للزيادة لـ 128GB) • Redundant PSU',
    'مقر المعادي - راك بيرلا 27U',
    'فاتورة توريد الخوادم المعتمدة',
    'Dell Technologies',
    'مورد ومعتمد بالراك'
),
(
    'hw-perla-rack-27u',
    'كابينة راك بيرلا 27U أرضي (Perla Rack 27U)',
    'Server Room Central Enclosure',
    '27U Depth 1000mm • Heavy Duty Ventilated • PDU • Wheels & Leveling Feet',
    'مقر المعادي - غرفة السيرفرات',
    'فاتورة رد لاين البستان 6T3HM2FA86TEDZEBQHYPFWMK10 (18,550 ج.م)',
    'RedLine El Bostan',
    'مورد ومثبت بغرفة السيرفرات'
),
(
    'hw-cctv-hikvision-16',
    'منظومة كاميرات المراقبة (Hikvision 16 Cameras 5MP & NVR)',
    'Security Surveillance System',
    '16x Hikvision 5MP IP Cameras • 16-Channel 4K NVR • 4TB Surveillance HDD • PoE Cat6 Cabling',
    'مقر المعادي - السقف المعلق والمدخل والغرف',
    'عرض الأصدقاء (بشمهندس علي) بقيمة 55,050 ج.م',
    'الأصدقاء للتوريدات والشبكات',
    'معتمد للتنفيذ بالمقر ومطعم العجوزة'
)
ON CONFLICT (id) DO UPDATE SET
    specs = EXCLUDED.specs,
    status = EXCLUDED.status,
    updated_at = NOW();

-- 3. Insert Service Providers
INSERT INTO public.service_providers (id, name, category, portal_url, username, status, notes, cost_or_plan, official_badge, active_services)
VALUES
(
    'prov-we-telecom',
    'المصرية للاتصالات (WE Telecom Egypt)',
    'سيرفرات سحابية وخطوط ربط فايبر',
    'https://cloud.te.eg/portal',
    'mashweer_telecom_admin',
    'نشط ومعتمد (أمر شراء سيرفر 4B)',
    'خادم 4B فقط بمركز بيانات القرية الذكية + خط ربط فايبر مركزي 24Mbps لمقر المعادي.',
    '8,500 ج.م/شهرياً لخادم 4B',
    'المشغل الوطني المعتمد',
    '["سيرفر 4B (4 vCPU, 8GB RAM, PostGIS 16)","جدار حماية F5 WAF","ربط VPN آمن","خط فايبر 24Mbps"]'::jsonb
),
(
    'prov-redline',
    'شركة رد لاين لتجهيزات الشبكات (RedLine)',
    'توريد راكات وكبائن وأدوات شبكة',
    'https://redline-stores.com',
    'sameh_yassin',
    'تم التوريد وسداد الفاتورة',
    'فاتورة إلكترونية معتمدة (18,550 ج.م) لتوريد راك 27U عمق 1000 وأجهزة فحص الكابلات.',
    '18,550 ج.م مسددة بالكامل',
    'مورد معتمد للبستان',
    '["كابينة راك بيرلا 27U عمق 1000","جهاز I-Pook PK65H لتتبع الكابلات","أراجة شبكة Root 2*1"]'::jsonb
),
(
    'prov-friends-cctv',
    'شركة الأصدقاء للأنظمة الأمنية (بشمهندس علي)',
    'كاميرات وشبكات مراقبة',
    'مباشر / تليفوني',
    'eng_ali_friends',
    'معتمد للتركيب والتنفيذ',
    'منظومة كاميرات مقر المعادي (55,050 ج.م) ومطعم المشويات بالعجوزة لتوحيد أعمال الصيانة.',
    '55,050 ج.م معتمدة',
    'مقاول تنفيذ شبكات أمنية',
    '["16 كاميرا Hikvision 5MP","جهاز NVR هيكفيجن","هارد ديسك 4TB WD Purple","تمديدات السقف المعلق"]'::jsonb
),
(
    'prov-ec-egypt',
    'المصرية لتكنولوجيا المعلومات (EC Egypt)',
    'استضافة ودومينات وبريد رسمي',
    'https://cpanel.mashawer.com.eg:2083',
    'mashawer_admin',
    'نشط ومفعل',
    'نطاق mashawer.com.eg و 6 إيميلات مؤسسية لشركة مشاوير على خوادم آمنة.',
    'خطة استضافة سنوية + نطاق مؤسسي',
    'المزود المعتمد للنطاقات',
    '["حجز نطاق mashawer.com.eg","استضافة سحابية 50 GB","6 إيميلات مؤسسية"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- 4. Insert Mashweer Corporate Emails
INSERT INTO public.mashweer_emails (id, address, role_title, department, status, quota, assigned_to, webmail_url, notes)
VALUES
('mail-1', 'sameh.yassin@mashawer.com.eg', 'رئيس قطاع التكنولوجيا (CTO & Systems Lead)', 'الإدارة التقنية', 'نشط ومعتمد', '10 GB', 'م/ سامح ياسين', 'https://mashawer.com.eg:2096', 'الحساب الإداري الرئيسي لإدارة المنظومة وسيرفرات الـ IT'),
('mail-2', 'ceo@mashawer.com.eg', 'الرئيس التنفيذي والشريك الاستثماري', 'الإدارة العليا', 'نشط ومعتمد', '10 GB', 'أ/ أبو خالد', 'https://mashawer.com.eg:2096', 'إدارة القرارات الاستراتيجية وميزانيات التوسع'),
('mail-3', 'finance@mashawer.com.eg', 'الإدارة المالية والحسابات العامة', 'المالية والحسابات', 'نشط ومعتمد', '5 GB', 'أ/ هاني', 'https://mashawer.com.eg:2096', 'الفواتير، خطط التجديد السنوية، والاشتراكات'),
('mail-4', 'legal@mashawer.com.eg', 'المستشار القانوني وحوكمة العقود', 'الشؤون القانونية', 'نشط ومعتمد', '5 GB', 'أ/ محمد مصطفى', 'https://mashawer.com.eg:2096', 'عقود قيمة تك ومذكرات تأسيس الشركات وإيداعات ITIDA'),
('mail-5', 'operations@mashawer.com.eg', 'إدارة العمليات وتشغيل الكباتن', 'العمليات والتشغيل', 'نشط ومعتمد', '5 GB', 'م/ موفق', 'https://mashawer.com.eg:2096', 'تشغيل تطبيق 4B ومتابعة الرحلات والسائقين'),
('mail-6', 'support@mashawer.com.eg', 'الدعم الفني وخدمة العملاء', 'خدمة العملاء', 'نشط ومعتمد', '5 GB', 'فريق الدعم الفني', 'https://mashawer.com.eg:2096', 'استقبال شكاوى التطبيقات والركاب')
ON CONFLICT (id) DO UPDATE SET
    role_title = EXCLUDED.role_title,
    status = EXCLUDED.status,
    assigned_to = EXCLUDED.assigned_to,
    updated_at = NOW();
`;

export const SUPABASE_ALL_IN_ONE_SQL = `${SUPABASE_MASTER_SQL}\n\n${SUPABASE_SEED_SQL}`;

export const SUPABASE_TABLES_SCHEMA = [
  {
    tableName: 'projects',
    arabicName: 'المشاريع والتطبيقات',
    rlsEnabled: true,
    description: 'حفظ وإدارة مشاريع مشاوير (4B، وكالة، دارو، مقر المعادي، التداول، وكاجل) مع روابط المستودعات وفيجما والـ APKs.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'المعرف الفريد للمشروع' },
      { name: 'name', type: 'TEXT', purpose: 'الاسم الرسمي للمشروع' },
      { name: 'category', type: 'TEXT', purpose: 'تصنيف المشروع (مشاوير، بنية تحتية، خاص)' },
      { name: 'status', type: 'TEXT', purpose: 'الحالة الحالية والتنفيذ' },
      { name: 'apk_files', type: 'JSONB', purpose: 'حزم التطبيقات المرفوعة' },
      { name: 'drive_assets', type: 'JSONB', purpose: 'مجلدات جوجل درايف المعتمدة' },
      { name: 'db_info', type: 'JSONB', purpose: 'محرك وقواعد البيانات المستهدفة' }
    ]
  },
  {
    tableName: 'hardware_inventory',
    arabicName: 'عتاد وسيرفرات مقر المعادي',
    rlsEnabled: true,
    description: 'حصر ومتابعة الأجهزة الفيزيائية: سيرفر Dell R640، جهازي HP Z440، سويتش سيسكو 3850 PoE، راك بيرلا 27U، وكاميرات هيكفيجن.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف الجهاز أو العتاد' },
      { name: 'name', type: 'TEXT', purpose: 'اسم الموديل والتوصيف' },
      { name: 'role', type: 'TEXT', purpose: 'الدور التشغيلي (Firewall, NVR, Hypervisor)' },
      { name: 'specs', type: 'TEXT', purpose: 'المواصفات العتادية (Xeon Cores, RAM, Storage)' },
      { name: 'location', type: 'TEXT', purpose: 'الموقع في المقر (غرفة السيرفرات - راك 27U)' },
      { name: 'invoice_ref', type: 'TEXT', purpose: 'رقم وقيمة الفاتورة المعتمدة' },
      { name: 'status', type: 'TEXT', purpose: 'حالة التشغيل والتركيب' }
    ]
  },
  {
    tableName: 'system_inquiries',
    arabicName: 'الأسئلة المعلقة وسجل القرارات',
    rlsEnabled: true,
    description: 'المستودع السحابي لجميع الاستفسارات والقرارات المتخذة، تدعم التحديد المتعدد (تشيك بوكس) وحفظ التوجيهات فورياً.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف الاستفسار' },
      { name: 'question', type: 'TEXT', purpose: 'نص السؤال أو القرار' },
      { name: 'category', type: 'TEXT', purpose: 'القسم المستهدف' },
      { name: 'urgency', type: 'TEXT', purpose: 'درجة الأهمية (critical, high, medium)' },
      { name: 'options', type: 'JSONB', purpose: 'خيارات التحديد المتاحة' },
      { name: 'answered', type: 'BOOLEAN', purpose: 'هل تم الحسم والاعتماد؟' },
      { name: 'answer', type: 'TEXT', purpose: 'القرار أو التوجيه المعتمد المسجل' },
      { name: 'answered_at', type: 'TEXT', purpose: 'تاريخ اعتماد القرار' }
    ]
  },
  {
    tableName: 'service_providers',
    arabicName: 'المزودين واستضافات السحابة',
    rlsEnabled: true,
    description: 'سجل الشركات المتعاقد معها (المصرية للاتصالات WE، رد لاين، الأصدقاء للكاميرات، وقيمة تك).',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف المزود' },
      { name: 'name', type: 'TEXT', purpose: 'اسم الشركة أو المزود' },
      { name: 'category', type: 'TEXT', purpose: 'نوع الخدمة المقدمة' },
      { name: 'status', type: 'TEXT', purpose: 'حالة التعاقد والاعتماد' },
      { name: 'cost_or_plan', type: 'TEXT', purpose: 'التكلفة أو خطة الاشتراك' },
      { name: 'active_services', type: 'JSONB', purpose: 'قائمة الخدمات الفعالة' }
    ]
  },
  {
    tableName: 'contracts',
    arabicName: 'العقود والتسليمات',
    rlsEnabled: true,
    description: 'عقود التطوير البرمجي والتوريدات مع نسب الإنجاز والمبالغ المدفوعة والمتبقية.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف العقد' },
      { name: 'title', type: 'TEXT', purpose: 'عنوان وموضوع التعاقد' },
      { name: 'provider_name', type: 'TEXT', purpose: 'اسم المقاول أو المطور' },
      { name: 'total_value', type: 'TEXT', purpose: 'القيمة المالية الإجمالية' },
      { name: 'status', type: 'TEXT', purpose: 'حالة التسليم والدفعات' },
      { name: 'deliverables', type: 'JSONB', purpose: 'مراحل ومخرجات التسليم' }
    ]
  },
  {
    tableName: 'mashweer_emails',
    arabicName: 'البريد المؤسسي والنطاقات',
    rlsEnabled: true,
    description: 'الحسابات البريدية الرسمية المعتمدة لنطاق mashawer.com.eg مع الحصص والمسميات الوظيفية.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف الحساب' },
      { name: 'address', type: 'TEXT', purpose: 'عنوان البريد الإلكتروني' },
      { name: 'role_title', type: 'TEXT', purpose: 'المسمى الوظيفي للمستخدم' },
      { name: 'department', type: 'TEXT', purpose: 'القسم التابع له' },
      { name: 'quota', type: 'TEXT', purpose: 'سعة صندوق البريد' },
      { name: 'assigned_to', type: 'TEXT', purpose: 'اسم المسؤول المكلف' }
    ]
  },
  {
    tableName: 'project_tasks',
    arabicName: 'المهام ومتابعة التسليمات',
    rlsEnabled: true,
    description: 'جدول المهام التشغيلية اليومية والأولويات ومواعيد التسليم حتى 17 أكتوبر.',
    fields: [
      { name: 'id', type: 'TEXT (PK)', purpose: 'معرف المهمة' },
      { name: 'title', type: 'TEXT', purpose: 'عنوان المهمة' },
      { name: 'priority', type: 'TEXT', purpose: 'الأولوية (عاجل، متوسط)' },
      { name: 'status', type: 'TEXT', purpose: 'حالة الإنجاز' },
      { name: 'due_date', type: 'TEXT', purpose: 'الموعد النهائي للتسليم' },
      { name: 'assigned_to', type: 'TEXT', purpose: 'المسؤول عن التنفيذ' }
    ]
  }
];
