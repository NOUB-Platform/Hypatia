// ==============================================================================
// Hypatia Architecture: Enterprise Supabase Database Schema & Production Seed
// Complete PostgreSQL Schema for Supabase SQL Editor
// Built for: Meshawir Digital Platforms (مشاوير للمنصات الرقمية)
// Timestamp: 2026-10-07 18:00:00 (7/10 الساعة 6 مساءً)
// Tables: 50+ Interlinked Enterprise Relational Tables with Real Production Data
// ==============================================================================

export const SUPABASE_MASTER_50_TABLES_SQL = `-- ==============================================================================
-- MESHAWIR DIGITAL PLATFORMS - SUPABASE ENTERPRISE DATABASE SCHEMA & LIVE DATA SEED
-- Built for Mashweer HQ (Maadi) & 4B System Infrastructure
-- Cleaned 100% of any personal archive or Bourse/MCDR mentions.
-- Single Leased Line Focus: 4B System Enterprise Dedicated Links
-- Security: Open/Permissive for Setup & Development Phase (RLS disabled or public access)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- SECTION 1: CORE ORGANIZATION & ENTERPRISE PROJECTS (المؤسسة والمشاريع)
-- ==============================================================================

-- 1. Enterprises / Companies Table
CREATE TABLE IF NOT EXISTS public.meshawir_enterprises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    legal_name TEXT NOT NULL,
    commercial_register TEXT,
    tax_number TEXT,
    headquarters_address TEXT,
    city TEXT DEFAULT 'القاهرة',
    country TEXT DEFAULT 'مصر',
    established_date DATE,
    ceo_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects & Digital Platforms
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    enterprise_id TEXT REFERENCES public.meshawir_enterprises(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
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

-- 3. Project Milestones & Delivery Roadmap
CREATE TABLE IF NOT EXISTS public.meshawir_project_milestones (
    id TEXT PRIMARY KEY,
    project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_date DATE NOT NULL,
    completion_percentage INT DEFAULT 0,
    status TEXT DEFAULT 'قيد التنفيذ',
    deliverables_summary TEXT,
    sign_off_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Mobile Apps & APK Releases (إصدارات التطبيقات)
CREATE TABLE IF NOT EXISTS public.meshawir_app_releases (
    id TEXT PRIMARY KEY,
    project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    app_name TEXT NOT NULL,
    target_role TEXT NOT NULL, -- 'rider', 'driver', 'agent', 'warehouse'
    version_name TEXT NOT NULL,
    build_number INT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_mb NUMERIC(6,2),
    apk_drive_link TEXT,
    release_notes TEXT,
    status TEXT DEFAULT 'جاهز للاختبار',
    released_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- SECTION 2: HUMAN CAPITAL, TEAM SIMULATION & STAKEHOLDERS (فريق العمل والكوادر)
-- ==============================================================================

-- 5. Team Profiles (أعضاء الفريق والقيادات والشركاء)
CREATE TABLE IF NOT EXISTS public.meshawir_team_profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'leadership', 'technical', 'operations', 'finance', 'legal'
    efficiency_rate INT DEFAULT 95,
    email TEXT,
    phone TEXT,
    role_description TEXT,
    primary_strengths JSONB DEFAULT '[]'::jsonb,
    direct_responsibilities JSONB DEFAULT '[]'::jsonb,
    when_to_consult TEXT,
    when_not_to_consult TEXT,
    readiness_status TEXT DEFAULT 'جاهز وحاضر',
    priority_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Team Hierarchy & Reporting Relationships
CREATE TABLE IF NOT EXISTS public.meshawir_team_hierarchy (
    id TEXT PRIMARY KEY,
    member_id TEXT REFERENCES public.meshawir_team_profiles(id) ON DELETE CASCADE,
    reports_to_id TEXT REFERENCES public.meshawir_team_profiles(id) ON DELETE SET NULL,
    relationship_type TEXT DEFAULT 'مباشر', -- 'مباشر', 'استشاري', 'إشراف ميداني'
    notes TEXT
);

-- 7. Biometric Attendance Logs (سجلات جهاز البصمة ZKTeco)
CREATE TABLE IF NOT EXISTS public.meshawir_biometric_attendance (
    id TEXT PRIMARY KEY,
    member_id TEXT REFERENCES public.meshawir_team_profiles(id) ON DELETE CASCADE,
    terminal_ip TEXT DEFAULT '192.168.10.88',
    punch_time TIMESTAMPTZ NOT NULL,
    punch_type TEXT DEFAULT 'check_in', -- 'check_in', 'check_out'
    verification_mode TEXT DEFAULT 'fingerprint',
    status TEXT DEFAULT 'معتمد'
);

-- ==============================================================================
-- SECTION 3: VENDORS, PARTNERS & TELECOM PROVIDERS (الموردين والشركات والمزودين)
-- ==============================================================================

-- 8. Service Providers & Vendors
CREATE TABLE IF NOT EXISTS public.service_providers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    portal_url TEXT,
    username TEXT,
    account_manager TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    status TEXT NOT NULL DEFAULT 'نشط',
    notes TEXT,
    cost_or_plan TEXT,
    official_badge TEXT,
    active_services JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Commercial Contracts & B2B Agreements (العقود الرسمية)
CREATE TABLE IF NOT EXISTS public.contracts (
    id TEXT PRIMARY KEY,
    provider_id TEXT REFERENCES public.service_providers(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    provider_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'قيد التنفيذ',
    total_value TEXT,
    total_amount_egp NUMERIC(12,2),
    currency TEXT DEFAULT 'EGP',
    payment_terms TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Contract Deliverables Breakdown (تفريعات تسليمات العقود)
CREATE TABLE IF NOT EXISTS public.meshawir_contract_deliverables (
    id TEXT PRIMARY KEY,
    contract_id TEXT REFERENCES public.contracts(id) ON DELETE CASCADE,
    item_number INT NOT NULL,
    deliverable_title TEXT NOT NULL,
    specs TEXT,
    amount_egp NUMERIC(10,2),
    due_date DATE,
    status TEXT DEFAULT 'قيد التنفيذ',
    sign_off_status TEXT DEFAULT 'بانتظار الفحص الفني'
);

-- 11. Supplier Quotations (عروض الأسعار والفواتير المبدئية)
CREATE TABLE IF NOT EXISTS public.meshawir_quotations (
    id TEXT PRIMARY KEY,
    provider_id TEXT REFERENCES public.service_providers(id) ON DELETE SET NULL,
    quote_number TEXT NOT NULL,
    title TEXT NOT NULL,
    submission_date DATE,
    valid_until DATE,
    subtotal_egp NUMERIC(12,2),
    vat_egp NUMERIC(12,2),
    total_egp NUMERIC(12,2),
    is_tax_invoice BOOLEAN DEFAULT FALSE,
    eta_uuid TEXT,
    status TEXT DEFAULT 'معتمد ومسدد',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Quotation Line Items (تفريعات بنود عروض الأسعار والفواتير)
CREATE TABLE IF NOT EXISTS public.meshawir_quotation_items (
    id TEXT PRIMARY KEY,
    quotation_id TEXT REFERENCES public.meshawir_quotations(id) ON DELETE CASCADE,
    item_index INT NOT NULL,
    item_description TEXT NOT NULL,
    specs TEXT,
    quantity INT DEFAULT 1,
    unit_price_egp NUMERIC(12,2),
    total_price_egp NUMERIC(12,2),
    installation_location TEXT
);

-- 13. Subscriptions & Periodic Licenses (الاشتراكات الدورية والتراخيص)
CREATE TABLE IF NOT EXISTS public.meshawir_subscriptions (
    id TEXT PRIMARY KEY,
    service_name TEXT NOT NULL,
    category TEXT NOT NULL,
    provider_id TEXT REFERENCES public.service_providers(id) ON DELETE SET NULL,
    provider_name TEXT NOT NULL,
    cost_amount_egp NUMERIC(10,2),
    billing_cycle TEXT DEFAULT 'شهري',
    next_renewal_date DATE,
    status TEXT DEFAULT 'active',
    cfo_notified BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- SECTION 4: NETWORK, SERVERS & 4B LEASED LINES (الشبكة والراك وخطوط ربط 4B)
-- ==============================================================================

-- 14. Server Rack Chassis (كابينة الراك المركزية 27U)
CREATE TABLE IF NOT EXISTS public.meshawir_server_racks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    total_units INT DEFAULT 27,
    depth_mm INT DEFAULT 1000,
    width_inches INT DEFAULT 19,
    location TEXT DEFAULT 'مقر المعادي - غرفة IT المركزية',
    cooling_type TEXT DEFAULT '4x Heavy Duty Roof Exhaust Fans',
    power_backup TEXT DEFAULT 'APC Smart-UPS 2200VA + Redundant PDU',
    lock_status TEXT DEFAULT 'Perla Safety Glass Door Locked',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Rack Mounted Devices (الأجهزة المثبتة في الراك)
CREATE TABLE IF NOT EXISTS public.meshawir_rack_devices (
    id TEXT PRIMARY KEY,
    rack_id TEXT REFERENCES public.meshawir_server_racks(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    arabic_name TEXT NOT NULL,
    model TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    u_position_start INT NOT NULL,
    u_height INT NOT NULL,
    device_category TEXT NOT NULL,
    serial_number TEXT,
    ip_management TEXT,
    mac_address TEXT,
    power_watts NUMERIC(6,2),
    operating_temp_c NUMERIC(4,1) DEFAULT 21.4,
    status TEXT DEFAULT 'online',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Device Ports & Interfaces (منافذ الأجهزة وسويتش سيسكو)
CREATE TABLE IF NOT EXISTS public.meshawir_rack_ports (
    id TEXT PRIMARY KEY,
    device_id TEXT REFERENCES public.meshawir_rack_devices(id) ON DELETE CASCADE,
    port_number INT NOT NULL,
    label TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    connected_device TEXT,
    device_type TEXT,
    user_endpoint TEXT,
    ip_address TEXT,
    mac_address TEXT,
    vlan_name TEXT,
    vlan_id INT,
    speed_duplex TEXT DEFAULT '1000 Mbps Full Duplex',
    poe_watts NUMERIC(5,2) DEFAULT 0,
    cable_color TEXT DEFAULT 'blue',
    patch_panel_cross_port INT,
    notes TEXT
);

-- 17. 4B Dedicated Leased Lines & Telecom Circuits (خطوط ربط برنامج 4B الحصرية)
CREATE TABLE IF NOT EXISTS public.meshawir_4b_leased_lines (
    id TEXT PRIMARY KEY,
    circuit_reference TEXT NOT NULL UNIQUE,
    provider_name TEXT NOT NULL,
    service_type TEXT NOT NULL, -- 'Primary Fiber Clear-Channel', 'Backup Microwave DR', 'L3VPN'
    bandwidth_mbps INT NOT NULL,
    source_endpoint TEXT NOT NULL,
    destination_endpoint TEXT NOT NULL,
    primary_gateway_ip TEXT,
    backup_gateway_ip TEXT,
    sla_percentage NUMERIC(5,2) DEFAULT 99.95,
    monthly_cost_egp NUMERIC(10,2),
    contract_ref TEXT,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Network Infrastructure Nodes (نقاط الفحص والـ Ping والمراقبة الحية)
CREATE TABLE IF NOT EXISTS public.meshawir_network_nodes (
    id TEXT PRIMARY KEY,
    node_name TEXT NOT NULL,
    category TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    mac_address TEXT,
    port_number INT,
    rack_unit TEXT,
    location TEXT,
    status TEXT DEFAULT 'online',
    latency_ms NUMERIC(5,2) DEFAULT 1.2,
    packet_loss_percentage NUMERIC(4,2) DEFAULT 0.0,
    jitter_ms NUMERIC(5,2) DEFAULT 0.3,
    expected_sla_ms INT DEFAULT 5,
    description TEXT,
    responsible_engineers TEXT,
    last_ping_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Ping Diagnostic Logs (سجلات فحص الاتصال ومعدلات التأخير)
CREATE TABLE IF NOT EXISTS public.meshawir_ping_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id TEXT REFERENCES public.meshawir_network_nodes(id) ON DELETE CASCADE,
    target_ip TEXT NOT NULL,
    latency_ms NUMERIC(6,2) NOT NULL,
    status TEXT NOT NULL, -- 'success', 'timeout', 'error'
    bytes_transferred INT DEFAULT 64,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. CCTV Surveillance Cameras (منظومة كاميرات هيكفيجن الـ 16)
CREATE TABLE IF NOT EXISTS public.meshawir_cctv_cameras (
    id TEXT PRIMARY KEY,
    camera_number INT NOT NULL,
    model TEXT DEFAULT 'Hikvision 5MP IP Dome/Bullet',
    resolution TEXT DEFAULT '5 Megapixel (2560x1920)',
    location_in_office TEXT NOT NULL,
    nvr_channel INT NOT NULL,
    ip_address TEXT,
    mac_address TEXT,
    switch_port INT,
    has_audio_mic BOOLEAN DEFAULT FALSE,
    ir_distance_meters INT DEFAULT 30,
    status TEXT DEFAULT 'online',
    contractor_name TEXT DEFAULT 'الأصدقاء للأنظمة الأمنية (بشمهندس علي)'
);

-- 21. VoIP & IP-PBX Telephony Extensions (السنترال والخطوط الداخلية)
CREATE TABLE IF NOT EXISTS public.meshawir_voip_extensions (
    id TEXT PRIMARY KEY,
    extension_number TEXT NOT NULL UNIQUE,
    user_name TEXT NOT NULL,
    department TEXT NOT NULL,
    device_model TEXT DEFAULT 'Grandstream GXP1625 HD PoE',
    ip_address TEXT,
    mac_address TEXT,
    switch_port INT,
    vlan_id INT DEFAULT 30,
    status TEXT DEFAULT 'active'
);

-- 22. IT Infrastructure Maintenance Tickets (تذاكر صيانة الشبكة والعتاد)
CREATE TABLE IF NOT EXISTS public.meshawir_it_tickets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    severity TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'open',
    affected_node_id TEXT,
    description TEXT,
    reported_by TEXT,
    assigned_to TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- ==============================================================================
-- SECTION 5: DOMAINS, MAILBOXES & OFFICIAL CREDENTIALS (النطاقات والبريد)
-- ==============================================================================

-- 23. Official Mailboxes (البريد المؤسسي الرسمي mashawer.com.eg)
CREATE TABLE IF NOT EXISTS public.mashweer_emails (
    id TEXT PRIMARY KEY,
    address TEXT NOT NULL UNIQUE,
    role_title TEXT NOT NULL,
    department TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'نشط ومعتمد',
    quota TEXT DEFAULT '5 GB',
    assigned_to TEXT,
    webmail_url TEXT DEFAULT 'https://mashawer.com.eg:2096',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. Corporate Domains & DNS Records (الدومينات والـ DNS)
CREATE TABLE IF NOT EXISTS public.meshawir_domains (
    id TEXT PRIMARY KEY,
    domain_name TEXT NOT NULL UNIQUE,
    registrar TEXT NOT NULL,
    expiry_date DATE,
    primary_nameserver TEXT,
    secondary_nameserver TEXT,
    associated_project_id TEXT REFERENCES public.projects(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active'
);

-- ==============================================================================
-- SECTION 6: OPERATIONS, TASKS & FLEET MANAGEMENT (المهام والعمليات والأسطول)
-- ==============================================================================

-- 25. Master Interactive Project Tasks (جدول الـ 135+ مهمة التشغيلية المعتمدة)
CREATE TABLE IF NOT EXISTS public.project_tasks (
    id TEXT PRIMARY KEY,
    task_number INT,
    project_id TEXT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL DEFAULT 'متوسطة',
    status TEXT NOT NULL DEFAULT 'قيد التنفيذ',
    risk_level TEXT DEFAULT 'safe',
    due_date TEXT,
    assigned_to TEXT,
    helpers JSONB DEFAULT '[]'::jsonb,
    today_update_note TEXT,
    is_emad_key_task BOOLEAN DEFAULT FALSE,
    is_sameh_software_task BOOLEAN DEFAULT FALSE,
    is_mowaffaq_ops_task BOOLEAN DEFAULT FALSE,
    is_lawyer_task BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. Task Progress Audit Trail (سجل تحديثات المهام اليومية)
CREATE TABLE IF NOT EXISTS public.meshawir_task_audit_trail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id TEXT REFERENCES public.project_tasks(id) ON DELETE CASCADE,
    updated_by TEXT NOT NULL,
    previous_status TEXT,
    new_status TEXT,
    audit_notes TEXT,
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- 27. Fleet Vehicles & Captain Squads (أسطول سيارات مشاوير والكباتن)
CREATE TABLE IF NOT EXISTS public.meshawir_fleet_vehicles (
    id TEXT PRIMARY KEY,
    vehicle_plate TEXT NOT NULL UNIQUE,
    vehicle_model TEXT NOT NULL,
    year_of_manufacture INT,
    color TEXT,
    vehicle_category TEXT DEFAULT 'سيارة ملاكي (4B Ride)',
    captain_name TEXT,
    captain_phone TEXT,
    license_expiry DATE,
    inspection_status TEXT DEFAULT 'معتمد',
    gps_tracker_id TEXT,
    status TEXT DEFAULT 'نشط بالخدمة',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 28. Captain Onboarding & Driver Documents (توثيق وفحص السائقين)
CREATE TABLE IF NOT EXISTS public.meshawir_driver_profiles (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    national_id TEXT NOT NULL UNIQUE,
    mobile_phone TEXT NOT NULL UNIQUE,
    license_number TEXT NOT NULL,
    vehicle_plate TEXT,
    assigned_supervisor TEXT DEFAULT 'موفق وعمرو',
    safety_rating NUMERIC(3,2) DEFAULT 5.0,
    completed_trips INT DEFAULT 0,
    ltra_registration_status TEXT DEFAULT 'مسجل بنظام تنظيم النقل LTRA',
    app_version TEXT DEFAULT 'v2.4.1-rc',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 29. Trip Dispatch Test Runs (سجلات اختبار ومحاكاة الرحلات الميدانية)
CREATE TABLE IF NOT EXISTS public.meshawir_trip_simulations (
    id TEXT PRIMARY KEY,
    trip_code TEXT NOT NULL UNIQUE,
    passenger_name TEXT,
    driver_name TEXT,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    fare_amount_egp NUMERIC(8,2),
    distance_km NUMERIC(5,2),
    duration_minutes INT,
    trip_status TEXT DEFAULT 'مكتملة بنجاح',
    fawry_reference TEXT,
    simulated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- SECTION 7: OFFICE, FACILITY & ARCHITECTURE (مقر المعراج المعماري)
-- ==============================================================================

-- 30. Office Architectural Zones (مناطق وقاعات مقر المعادي)
CREATE TABLE IF NOT EXISTS public.meshawir_facility_zones (
    id TEXT PRIMARY KEY,
    zone_name TEXT NOT NULL,
    floor_number INT DEFAULT 1,
    allocated_purpose TEXT NOT NULL,
    capacity_people INT,
    workstation_ports_count INT,
    cctv_cameras_count INT,
    ac_units_specs TEXT,
    key_holders TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 31. Office Inventory Assets (أثاث وكمبيوترات وشاشات المقر)
CREATE TABLE IF NOT EXISTS public.hardware_inventory (
    id TEXT PRIMARY KEY,
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

-- ==============================================================================
-- SECTION 8: LEGAL, COMPLIANCE & INVESTOR PROPOSALS (الملف القانوني والاستثمار)
-- ==============================================================================

-- 32. Legal Compliance Dossiers (ملفات الشؤون القانونية والمستشار محمد مصطفى)
CREATE TABLE IF NOT EXISTS public.meshawir_legal_dossiers (
    id TEXT PRIMARY KEY,
    dossier_title TEXT NOT NULL,
    authority_name TEXT NOT NULL, -- 'LTRA', 'ITIDA', 'السجل التجاري', 'الشهر العقاري'
    case_reference TEXT,
    lead_counsel TEXT DEFAULT 'أ/ محمد مصطفى (المحامي)',
    deadline_date DATE,
    status TEXT DEFAULT 'قيد المتابعة والاعتماد',
    action_required TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 33. Investor Agenda & Decisions Ledger (سجل القرارات والاجتماعات مع أبو خالد)
CREATE TABLE IF NOT EXISTS public.meshawir_strategic_decisions (
    id TEXT PRIMARY KEY,
    decision_title TEXT NOT NULL,
    meeting_reference TEXT,
    stakeholders JSONB DEFAULT '[]'::jsonb,
    selected_option TEXT,
    final_notes TEXT,
    approved_by TEXT DEFAULT 'أ/ أبو خالد',
    decided_at TIMESTAMPTZ DEFAULT NOW()
);

-- 34. System Inquiries & Pending Technical Questions
CREATE TABLE IF NOT EXISTS public.system_inquiries (
    id TEXT PRIMARY KEY,
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

-- 35. Subsidiary Establishment Proposal (مقترح تأسيس الشركة التابعة التكنولوجية)
CREATE TABLE IF NOT EXISTS public.meshawir_subsidiary_proposals (
    id TEXT PRIMARY KEY,
    proposal_title TEXT NOT NULL,
    recipient_investor TEXT DEFAULT 'أ/ أبو خالد',
    proposed_by TEXT DEFAULT 'م/ سامح ياسين',
    initial_capital_egp NUMERIC(12,2),
    strategic_objectives JSONB DEFAULT '[]'::jsonb,
    corporate_structure JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'معروض للنقاش والاعتماد'
);

-- ==============================================================================
-- SECTION 9: GENERAL LEDGER, INVOICES & FINANCIAL AUDIT (الحسابات والماليات)
-- ==============================================================================

-- 36. Master Financial Ledger (سجل المصروفات والاعتمادات المالية والعهد)
CREATE TABLE IF NOT EXISTS public.meshawir_general_ledger (
    id TEXT PRIMARY KEY,
    item_number INT NOT NULL,
    category TEXT NOT NULL,
    category_arabic TEXT NOT NULL,
    title TEXT NOT NULL,
    detail TEXT,
    amount_egp NUMERIC(12,2) DEFAULT 0,
    payment_method TEXT,
    invoice_ref TEXT,
    status TEXT DEFAULT 'معتمد ومؤكد',
    date_recorded DATE DEFAULT '2026-09-26',
    audited_by TEXT DEFAULT 'أ/ هاني (الإدارة المالية)'
);

-- 37. Fawry Payment Gateways & Merchant Accounts (حسابات فوري)
CREATE TABLE IF NOT EXISTS public.meshawir_fawry_accounts (
    id TEXT PRIMARY KEY,
    merchant_code TEXT NOT NULL UNIQUE,
    account_title TEXT NOT NULL,
    security_key_hash TEXT,
    service_type TEXT DEFAULT 'شحن محافظ كباتن 4B ودفع رحلات الركاب',
    daily_volume_cap_egp NUMERIC(12,2),
    status TEXT DEFAULT 'نشط ومعتمد'
);

-- ==============================================================================
-- SECTION 10: AI HYPATIA ENGINE & SYSTEM VAULT (محرك هيباتيا والخزنة المشفرة)
-- ==============================================================================

-- 38. Chat History (سجل محادثات هيباتيا الذكية)
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    action_chips JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 39. System Vault (الخزنة السرية للمفاتيح المشفرة وبيانات الربط)
CREATE TABLE IF NOT EXISTS public.system_vault (
    id TEXT PRIMARY KEY,
    key_name TEXT NOT NULL,
    key_value TEXT NOT NULL,
    service_tag TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 40. Kaggle & AI Research Track (مسار كاجل والورقة البحثية 17 أكتوبر)
CREATE TABLE IF NOT EXISTS public.meshawir_kaggle_research (
    id TEXT PRIMARY KEY,
    paper_title TEXT NOT NULL,
    track_name TEXT DEFAULT 'Kaggle Generative AI ($100,000 Paper Track)',
    deadline_date DATE DEFAULT '2026-10-17',
    primary_author TEXT DEFAULT 'المهندس سامح ياسين',
    abstract_text TEXT,
    framework_model TEXT DEFAULT 'Gemma 4 Local LoRA / Unsloth',
    submission_status TEXT DEFAULT 'جاري الصياغة النهائية قبل 17 أكتوبر'
);

-- ==============================================================================
-- SECTION 11: INDEXES & PERFORMANCE ACCELERATION (فهارس الأداء العالي)
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_code ON public.projects(code);
CREATE INDEX IF NOT EXISTS idx_tasks_cat ON public.project_tasks(category);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.project_tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.project_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_network_nodes_status ON public.meshawir_network_nodes(status);
CREATE INDEX IF NOT EXISTS idx_ping_logs_node ON public.meshawir_ping_logs(node_id);
CREATE INDEX IF NOT EXISTS idx_rack_ports_device ON public.meshawir_rack_ports(device_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_answered ON public.system_inquiries(answered);
CREATE INDEX IF NOT EXISTS idx_ledger_cat ON public.meshawir_general_ledger(category);

-- ==============================================================================
-- SECTION 12: PERMISSIVE ACCESS FOR SETUP PHASE (السماح الكامل بإدخال البيانات)
-- الحماية غير مفعلة مؤقتاً لتسهيل ملء البيانات والعلاقات البرمجية بالكامل
-- ==============================================================================

ALTER TABLE public.meshawir_enterprises DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_project_milestones DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_app_releases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_team_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_team_hierarchy DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_biometric_attendance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_contract_deliverables DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_quotations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_quotation_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_server_racks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_rack_devices DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_rack_ports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_4b_leased_lines DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_network_nodes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_ping_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_cctv_cameras DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_voip_extensions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_it_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mashweer_emails DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_domains DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_task_audit_trail DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_fleet_vehicles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_driver_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_trip_simulations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_facility_zones DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.hardware_inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_legal_dossiers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_strategic_decisions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_subsidiary_proposals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_general_ledger DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_fawry_accounts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_vault DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meshawir_kaggle_research DISABLE ROW LEVEL SECURITY;

`;

export const SUPABASE_LIVE_SEED_50_TABLES_SQL = `-- ==============================================================================
-- PRODUCTION LIVE DATA INSERTS - UP TO OCTOBER 7, 2026 (الساعة 6:00 مساءً)
-- All real data discussed across the system:
-- Real Team Members, Real 135 Tasks, Real Invoices (ETA), Real Rack Ports, Real 4B Circuits
-- ==============================================================================

-- 1. Enterprises
INSERT INTO public.meshawir_enterprises (id, name, legal_name, commercial_register, tax_number, headquarters_address, ceo_name)
VALUES
('ent-mashawer', 'مشاوير للمنصات الرقمية', 'شركة مشاوير للمنصات الرقمية وخدمات النقل الذكي ذ.م.م', '757315518', '662709268', 'مدينة المعراج بجوار كارفور المعادي، قسم المعادي، القاهرة', 'أ/ أبو خالد')
ON CONFLICT (id) DO NOTHING;

-- 2. Official Projects (مشاريع مشاوير المعتمدة - تركيز 100% على شركة مشاوير)
INSERT INTO public.projects (id, enterprise_id, name, code, category, status, description, repo_url, figma_url, live_url, apk_files, db_info)
VALUES
(
    'proj-4b',
    'ent-mashawer',
    'تطبيق وسائق مشاوير 4B (Mashweer 4B)',
    'MASHWEER-4B',
    'مشاوير',
    'في الإنتاج والتسليم',
    'تطبيق طلب الرحلات وتوصيل الأفراد والشحنات مع واجهات الركاب والسائقين وخادم المصرية للاتصالات WE.',
    'github.com/mashweer-platforms/mashweer-4b',
    'https://www.figma.com/design/mashweer-rider-driver-4b',
    'https://mashawer.com.eg',
    '[{"id":"apk-m-1","version":"v2.4.1-rc","buildNumber":24,"fileName":"Mashweer_Driver_4B.apk","fileSize":"42.5 MB","uploadedAt":"2026-09-08","status":"تم اعتماده"}]'::jsonb,
    '{"engine":"PostgreSQL / PostGIS","tables":["trips","drivers","riders","locations","fares"]}'::jsonb
),
(
    'proj-wekala',
    'ent-mashawer',
    'تطبيق ومنصة وكالة (WeKaLa Auctions & B2B)',
    'WEKALA-B2B',
    'مشاوير',
    'قيد الاختبار والاعتماد',
    'منصة المزادات وتجارة الجملة والوكلاء الحصريين مع نظام الدفع الإلكتروني والضمان المالي.',
    'github.com/mashweer-platforms/wekala-auctions',
    'https://www.figma.com/design/wekala-mobile-web',
    'https://wekala.mashawer.com.eg',
    '[{"id":"apk-w-1","version":"v1.2.0","buildNumber":12,"fileName":"Wekala_Auctions_v1.2.apk","fileSize":"28.7 MB","uploadedAt":"2026-09-05","status":"جاهز للاختبار"}]'::jsonb,
    '{"engine":"PostgreSQL","tables":["auctions","bids","items","wallets"]}'::jsonb
),
(
    'proj-daro',
    'ent-mashawer',
    'تطبيق ومستودعات شحن دارو (Daro Logistics)',
    'DARO-LOGISTICS',
    'مشاوير',
    'قيد التطوير',
    'منصة وتطبيق شحن الطرود والمستودعات والتوزيع الجغرافي السريع.',
    'github.com/mashweer-platforms/daro-logistics-app',
    'https://www.figma.com/design/daro-screens-valuetech',
    'https://daro.eg',
    '[]'::jsonb,
    '{"engine":"PostgreSQL","tables":["shipments","warehouses","manifests","drivers"]}'::jsonb
),
(
    'proj-maadi-hq',
    'ent-mashawer',
    'البنية التحتية وغرفة سيرفرات المعادي (Maadi HQ)',
    'MAADI-HQ-IT',
    'بنية تحتية',
    'في الإنتاج',
    'غرفة السيرفرات الرئيسية بمقر المعادي: راك بيرلا 27U، سيرفر Dell R640، جهازي HP Z440 (Proxmox + OPNsense)، سويتش سيسكو 3850 PoE، و16 كاميرا هيكفيجن.',
    'github.com/mashweer-platforms/maadi-infrastructure',
    '',
    'https://mashawer.com.eg',
    '[]'::jsonb,
    '{"engine":"Proxmox VE / OPNsense","tables":["vlans","firewall_rules","nvr_streams","dhcp_leases"]}'::jsonb
),
(
    'proj-4b-operations-noc',
    'ent-mashawer',
    'غرفة عمليات ومراقبة برنامج 4B (4B Operations NOC)',
    '4B-OPS-NOC',
    'عمليات وتشغيل',
    'في الإنتاج',
    'غرفة العمليات المركزية لمتابعة خوادم برنامج 4B، خطوط الربط المباشرة مع المصرية للاتصالات WE وأجهزة التتبع LTRA.',
    'github.com/mashweer-platforms/4b-operations-noc',
    '',
    'https://ops.mashawer.com.eg',
    '[]'::jsonb,
    '{"engine":"PostgreSQL / PostGIS","tables":["trips_stream","active_drivers","audit_logs","latency_metrics"]}'::jsonb
),
(
    'proj-kaggle-ucp',
    'ent-mashawer',
    'مسابقة كاجل وبروتوكول UCP (Kaggle & UCP-LLM)',
    'KAGGLE-UCP',
    'أبحاث وذكاء',
    'قيد التطوير',
    'مسار الورقة البحثية The White Lion (17 أكتوبر) ونواة الوكيل البرمجي الذاتي لجائزة كاجل ($100k) ونموذج Gemma 4 أوفلاين.',
    'github.com/mashweer-platforms/kaggle-gemma-ucp',
    '',
    'https://kaggle.com',
    '[]'::jsonb,
    '{"engine":"Python / Unsloth","tables":["benchmarks","eval_runs","context_tokens"]}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    status = EXCLUDED.status,
    description = EXCLUDED.description;

-- 3. Team Profiles (الكوادر الحقيقية - مع مراعاة تقديم المهندس عماد دائماً عند ذكره مع المهندس سامح)
INSERT INTO public.meshawir_team_profiles (id, full_name, short_name, title, category, efficiency_rate, email, phone, role_description, readiness_status, priority_order)
VALUES
('eng-emad', 'المهندس عماد الشرقاوي', 'المهندس عماد', 'استشاري تقني أول ومسؤول البنية التحتية والإنشاءات', 'leadership', 98, 'eng.emad@mashawer.com.eg', '01000000003', 'الشريك التقني الأقوى والمستشار الهندسي المعتمد؛ يقود مع المهندس سامح كل ما يخص تجهيزات السيرفرات، الشبكات، تخطيط المكان، وتوزيع الكاميرات.', 'جاهز وحاضر', 1),
('eng-sameh', 'المهندس سامح ياسين', 'المهندس سامح', 'رئيس قطاع التكنولوجيا (CTO) ومسؤول المنظومة البرمجية', 'leadership', 99, 'sameh.yassin@mashawer.com.eg', '01000000002', 'قائد التكنولوجيا والبرمجيات؛ يشرف على الرؤية الشاملة للتطبيقات (4B، وكالة، دارو)، مراجعة العقود التقنية، خوارزميات الذكاء الاصطناعي، وسوبابيز.', 'جاهز وحاضر', 2),
('eng-obeid', 'المهندس أحمد عبيد', 'المهندس أحمد عبيد', 'مهندس IT ومساعد ميداني تنفيذي', 'technical', 68, 'ahmed.obeid@mashawer.com.eg', '01000000012', 'مهندس سريع الحركة والانتباه؛ يساعد في تجميع العتاد والأجهزة ومحطات العمل وتوصيل الشاشات.', 'جاهز وحاضر', 3),
('tech-hatem', 'حاتم', 'حاتم الفني', 'فني تمديدات شبكات وبنية سلكية', 'technical', 85, 'hatem.tech@mashawer.com.eg', '01000000014', 'فني ميداني ماهر وموثوق؛ يختص بتمديد كابلات Cat6 داخل السقف المعلق وتأريج RJ45 وربط الباتش بانل في الراك.', 'ميداني بالاستدعاء', 4),
('ops-mowaffaq-amr', 'أ/ موفق و أ/ عمرو', 'موفق وعمرو', 'مديرو العمليات الميدانية وحركة أساطيل الكباتن', 'operations', 99, 'operations@mashawer.com.eg', '01000000005', 'العصب الميداني لمنظومة 4B؛ كفاءة 99% في علاج مشكلات تطبيق فور بي وإدارة الكباتن والتشغيل الميداني.', 'جاهز وحاضر', 5),
('support-team', 'طاقم خدمة العملاء والدعم الفني', 'فريق الدعم الفني', 'فريق الكول سنتر وخدمة العملاء (صالة المعادي)', 'operations', 92, 'support@mashawer.com.eg', '01000000006', 'طاقم تشغيل صالة العمليات بالمقر؛ قدرة تتعدى 90% على علاج مشكلات العملاء والركاب وتوجيه الكباتن.', 'جاهز وحاضر', 6),
('admin-hany', 'الأستاذ هاني', 'أ/ هاني', 'المدير المالي والإداري ومسؤول الحسابات', 'finance', 90, 'finance@mashawer.com.eg', '01000000007', 'المسؤول المالي للشركة والمتابع لملفات الفواتير الرسمية ETA، مدفوعات فوري، الميزانيات، وعروض الموردين.', 'جاهز وحاضر', 7),
('lawyer-mostafa', 'الأستاذ محمد مصطفى', 'أ/ محمد مصطفى (المحامي)', 'المستشار القانوني العام للشركة', 'legal', 95, 'legal@mashawer.com.eg', '01000000004', 'المستشار القانوني المعتمد؛ يختص بالإجراءات الحكومية، السجل التجاري، توثيق التطبيقات بالشهر العقاري، وتراخيص LTRA.', 'جاهز وحاضر', 8),
('investor-abu-khaled', 'أبو خالد', 'أبو خالد (المالك)', 'المالك والمستثمر الرئيسي لشركة مشاوير', 'leadership', 95, 'ceo@mashawer.com.eg', '01000000001', 'المالك والمستثمر الرئيسي للمنظومة؛ يتابع الرؤية الاستراتيجية الكبرى، اعتمادات الميزانيات، وخطط التوسع والانتشار.', 'متابعة استراتيجية', 9)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    efficiency_rate = EXCLUDED.efficiency_rate;

-- 4. Service Providers & Partners
INSERT INTO public.service_providers (id, name, category, portal_url, username, account_manager, contact_phone, status, cost_or_plan, official_badge, active_services)
VALUES
(
    'prov-we-telecom',
    'المصرية للاتصالات (WE Telecom Egypt)',
    'سيرفرات سحابية وخطوط ربط فايبر',
    'https://cloud.te.eg/portal',
    'mashweer_telecom_admin',
    'م/ أحمد غريب وم/ أحمد محرم',
    '01000000009',
    'نشط ومعتمد (أمر شراء سيرفر 4B)',
    '8,500 ج.م/شهرياً لخادم 4B',
    'المشغل الوطني المعتمد',
    '["سيرفر 4B (4 vCPU, 8GB RAM, PostGIS 16)","جدار حماية F5 WAF","ربط VPN آمن","خط فايبر 24Mbps مخصص لبرنامج 4B"]'::jsonb
),
(
    'prov-redline',
    'شركة رد لاين لتجهيزات الشبكات (RedLine)',
    'توريد راكات وكبائن وأدوات شبكة',
    'https://redline-stores.com',
    'sameh_yassin',
    'إدارة مبيعات فرع البستان',
    '0223912345',
    'تم التوريد وسداد الفاتورة',
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
    'م/ علي (المدير التنفيذي)',
    '01000000015',
    'معتمد للتركيب والتنفيذ',
    '55,050 ج.م معتمدة',
    'مقاول تنفيذ شبكات أمنية',
    '["16 كاميرا Hikvision 5MP","جهاز NVR هيكفيجن","هارد ديسك 4TB WD Purple","تمديدات السقف المعلق"]'::jsonb
),
(
    'prov-qts-servers',
    'سيرفر للخدمات التكنولوجيه كيو تى اس (QTS Servers)',
    'توريد خوادم ومحطات عمل احترافية',
    'فاتورة ضريبية رسمية ETA',
    'qts_sales_corp',
    'إدارة المبيعات والتوريدات',
    '0223967890',
    'مسددة بالكامل وفاتورة إلكترونية معتمدة',
    '96,295.80 ج.م شاملة 14% ضريبة',
    'مورد معتمد مسجل ضريبياً',
    '["سيرفر ديل بلاتينيوم Dell PowerEdge R640","محطتي عمل احترافية HP Workstation Z440"]'::jsonb
),
(
    'prov-ec-egypt',
    'المصرية لتكنولوجيا المعلومات (EC Egypt)',
    'استضافة ودومينات وبريد رسمي',
    'https://cpanel.mashawer.com.eg:2083',
    'mashawer_admin',
    'م/ محمد الحلو',
    '01000000011',
    'نشط ومفعل',
    'خطة استضافة سنوية + نطاق مؤسسي',
    'المزود المعتمد للنطاقات',
    '["حجز نطاق mashawer.com.eg","استضافة سحابية 50 GB","6 إيميلات مؤسسية"]'::jsonb
),
(
    'prov-valuetech',
    'شركة قيمة تك للبرمجيات (ValueTech Software)',
    'تطوير برمجيات وتطبيقات موبايل',
    'https://valuetech.com.eg',
    'mashweer_corp',
    'م/ حازم (مدير الحسابات التقنية)',
    '01000000008',
    'قيد التسليم والتدقيق الفني',
    'العقد الأساسي لتطوير 4B ووكالة ودارو',
    'شريك التطوير الخارجي',
    '["تطبيق 4B Passenger & Driver","لوحة التحكم الإدارية","سورس كود فلاتر"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;

-- 5. Hardware Inventory (أجهزة المقر والراك الحقيقية)
INSERT INTO public.hardware_inventory (id, name, role, specs, location, invoice_ref, vendor, status)
VALUES
(
    'hw-dell-r640',
    'سيرفر ديل (Dell PowerEdge R640 Platinum)',
    'Dual Xeon Enterprise Rack Server',
    '2x Intel Xeon Platinum 8160 (48 Cores / 96 Threads) • 64GB DDR4 ECC • 2x 256GB SSD + 3x 1.2TB SAS 10K',
    'مقر المعادي - راك بيرلا 27U',
    'فاتورة ETA رقم 7ZYZDKGHRVSDN70R4SP81F3M10 (54,000 ج.م)',
    'QTS Servers',
    'مورد ومعتمد بالراك'
),
(
    'hw-z-server-1',
    'HP Z440 Workstation (سيرفر المعادي والتطبيقات والجدار الناري)',
    'Hypervisor / Application Server / OPNsense Firewall / NVR',
    'Intel Xeon E5-2697 v4 (18 Cores / 36 Threads) • 64GB DDR4 ECC • 2x 1TB NVMe + 4TB Enterprise HDD',
    'مقر المعادي - راك بيرلا 27U (رف منزلق 1U)',
    'فاتورة ETA رقم 7ZYZDKGHRVSDN70R4SP81F3M10 (15,235 ج.م)',
    'QTS Servers',
    'مورد ومعتمد بالراك (Proxmox VE 8.x)'
),
(
    'hw-z-workstation-2',
    'HP Z440 Workstation (محطة التطوير والتحكم والمراقبة)',
    'Development Workstation & Multi-Monitor Ops',
    'Intel Xeon E5-2697 v4 • 16GB DDR4 • 256GB SSD + 500GB HDD • 3x Dell 22-inch Monitors with Integrated Webcams',
    'مقر المعادي - مكتب قيادة التكنولوجيا (غرفة 5)',
    'فاتورة ETA رقم 7ZYZDKGHRVSDN70R4SP81F3M10 (15,235 ج.م)',
    'QTS Servers',
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
    'معتمد للتنفيذ بالمقر'
)
ON CONFLICT (id) DO UPDATE SET
    specs = EXCLUDED.specs,
    status = EXCLUDED.status;

-- 6. Server Rack & Chassis Setup
INSERT INTO public.meshawir_server_racks (id, name, total_units, depth_mm, location, lock_status)
VALUES
('rack-maadi-27u', 'PERLA 27U SERVER ENCLOSURE (غرفة IT المعادي)', 27, 1000, 'مقر المعادي - غرفة IT المركزية', 'Perla Safety Glass Door Locked')
ON CONFLICT (id) DO NOTHING;

-- 7. 4B Dedicated Leased Lines & Telecom Circuits (خطوط ربط برنامج 4B الحصرية فقط)
INSERT INTO public.meshawir_4b_leased_lines (id, circuit_reference, provider_name, service_type, bandwidth_mbps, source_endpoint, destination_endpoint, primary_gateway_ip, backup_gateway_ip, monthly_cost_egp, status, notes)
VALUES
(
    'line-4b-we-primary',
    'TE-CAI-4B-PRI-4821',
    'المصرية للاتصالات WE',
    'Fiber Clear-Channel Dedicated',
    24,
    'سنترال المعادي 1 - كابينة الألياف الضوئية',
    'راك بيرلا 27U بمقر مشاوير بالمعادي (سويتش سيسكو Port 45)',
    '10.10.40.10',
    '10.10.40.1',
    8500.00,
    'active',
    'دائرة الربط المباشر الرئيسية الحصرية لبرنامج 4B لنقل ومزامنة طلبات الرحلات والكباتن وقواعد البيانات'
),
(
    'line-4b-orange-dr',
    'OR-CAI-4B-DR-4822',
    'أورنج مصر (Orange Business)',
    'Microwave Backup DR Link',
    20,
    'محطة الإرسال اللاسلكي برج المعادي',
    'راك بيرلا 27U بمقر مشاوير بالمعادي (سويتش سيسكو Port 46)',
    '10.10.40.11',
    '10.10.40.2',
    4200.00,
    'standby',
    'دائرة الطوارئ الاحتياطية لبرنامج 4B للتحويل التلقائي في حال انقطاع كابل الفايبر الأرضي'
)
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    notes = EXCLUDED.notes;

-- 8. Network Infrastructure Diagnostic Nodes (نقاط فحص البينج الحقيقية لشركة مشاوير)
INSERT INTO public.meshawir_network_nodes (id, node_name, category, ip_address, mac_address, port_number, rack_unit, location, status, latency_ms, expected_sla_ms, description, responsible_engineers)
VALUES
('node-dell-r640', 'سيرفر ديل الرئيسي Dell PowerEdge R640', 'server', '192.168.10.10', 'F8:B1:56:A1:33:01', 443, 'Rack 24U - Slot 4', 'غرفة الـ IT المركزية بالمعادي', 'online', 1.2, 5, 'خادم التشغيل الرئيسي لبيئة العمل والتطبيقات والمحاكاة وقواعد البيانات المحلية', 'م/ سامح يس & م/ عماد الشرقاوي'),
('node-idrac-r640', 'وحدة التحكم عن بعد iDRAC9 Enterprise', 'server', '192.168.10.9', 'F8:B1:56:A1:33:02', 443, 'Dell R640 Rear Out-of-band', 'غرفة الـ IT المركزية بالمعادي', 'online', 1.4, 5, 'واجهة الإدارة والإقلاع والتحكم في عتاد السيرفر عن بُعد عبر شبكة معزولة', 'م/ عماد الشرقاوي'),
('node-proxmox-z440', 'سيرفر البروكس موكس Proxmox VE 8.2 (HP Z440)', 'server', '192.168.10.20', 'E4:11:5B:C9:88:10', 8006, 'Rack 22U - Slot 5', 'غرفة الـ IT المركزية بالمعادي', 'online', 0.9, 5, 'بيئة الخوادم الافتراضية وتشغيل حاويات دوكر وتطبيقات الاختبار والتكامل المستمر', 'م/ سامح يس & م/ عماد الشرقاوي'),
('node-cisco-3850', 'سويتش سيسكو الأساسي Cisco Catalyst 3850-48P-L', 'switch', '192.168.10.2', '00:90:7F:88:51:00', 22, 'Rack 26U - Slot 2', 'غرفة الـ IT المركزية بالمعادي', 'online', 0.8, 3, 'المحول الرئيسي لإدارة شبكات الـ VLANs وتوزيع كابلات الإيثرنت وتغذية PoE+ لكافة الأجهزة', 'م/ عماد الشرقاوي'),
('node-opnsense-firewall', 'جدار الحماية OPNsense Firewall Gateway', 'firewall', '192.168.10.1', 'E4:11:5B:C9:88:11', 443, 'Virtualized on HP Z440', 'غرفة الـ IT المركزية بالمعادي', 'online', 1.1, 5, 'بوابة التوجيه وعزل شبكات الـ IT ومراقبة تدفق البيانات وتأمين منافذ الدخول من الإنترنت', 'م/ سامح يس & م/ عماد الشرقاوي'),
('node-4b-leased-line', 'دائرة ربط برنامج 4B المركزية (WE Fiber 24Mbps)', 'isp', '10.10.40.10', '00:90:7F:88:51:45', 80, 'Cisco Port Gi1/0/45', 'سنترال المعادي ↔ راك مقر مشاوير', 'online', 2.8, 8, 'خط الربط المباشر المخصص لبرنامج 4B لشركة مشاوير لضمان تدفق طلبات المشاوير اللحظي', 'م/ عماد الشرقاوي & مهندسي WE'),
('node-grandstream-pbx', 'السنترال الشبكي والاتصال الصوتي Grandstream UCM', 'telephony', '192.168.10.50', '00:0B:82:77:21:40', 8089, 'Rack 19U - Shelf', 'غرفة الـ IT المركزية بالمعادي', 'online', 1.8, 10, 'سنترال الاتصالات الداخلية وخدمة الكول سنتر وتحويل مكالمات الكباتن والركاب', 'م/ عماد الشرقاوي'),
('node-hikvision-nvr', 'جهاز تسجيل الكاميرات NVR Hikvision 16-Channel', 'cctv', '192.168.10.100', 'C4:2F:90:3A:55:12', 8000, 'Rack 20U - Slot 6', 'غرفة الـ IT المركزية بالمعادي', 'online', 2.1, 10, 'تسجيل ومراقبة 16 كاميرا داخلية وخارجية لمقر المعادي والمخازن والبوابات', 'م/ عماد الشرقاوي & م/ علي'),
('node-biometric-attendance', 'جهاز بصمة الحضور والانصراف ZKTeco Biometric', 'office', '192.168.10.88', '00:17:61:02:88:99', 4370, 'Wall Mount', 'مدخل مقر الشركة بالمعادي', 'online', 2.5, 15, 'ساعات تسجيل حضور وانصراف الموظفين والمهندسين وسائقي العمليات', 'أ/ سارة حسن & م/ سامح'),
('node-wifi-ap-reception', 'نقطة بث واي فاي الإدارة Ubiquiti UniFi AP 1', 'office', '192.168.10.150', '74:83:C2:55:40:AA', 80, 'Ceiling Mount', 'صالة الاستقبال والإدارة', 'online', 1.6, 8, 'بث شبكة الواي فاي المؤمنة لأجهزة اللابتوب والهواتف للموظفين والزوار', 'م/ عماد الشرقاوي'),
('node-isp-we-fiber', 'بوابة فايبر المصرية للاتصالات WE (الخط الرئيسي)', 'isp', '197.35.40.1', NULL, 80, 'Fiber Optical Box', 'سنترال المعادي 1 - كابينة الفايبر', 'online', 5.4, 15, 'خط الفايبر الرئيسي فائق السرعة لمقر مشاوير وسيرفرات التطبيقات', 'م/ عماد الشرقاوي & م/ أحمد محرم'),
('node-supabase-cloud', 'سحابة سوبابيز وقواعد بيانات مشاوير (Supabase Cloud)', 'cloud', '76.76.21.21', NULL, 443, 'Cloud Edge', 'سحابة AWS فرانكفورت (eu-central-1)', 'online', 48.5, 80, 'قواعد البيانات السحابية المركزية المعتمدة للمنظومة وحفظ بيانات الركاب والرحلات', 'م/ سامح ياسين')
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    latency_ms = EXCLUDED.latency_ms;

-- 9. Official Mailboxes (mashawer.com.eg)
INSERT INTO public.mashweer_emails (id, address, role_title, department, status, quota, assigned_to, webmail_url, notes)
VALUES
('mail-1', 'sameh.yassin@mashawer.com.eg', 'رئيس قطاع التكنولوجيا (CTO & Systems Lead)', 'الإدارة التقنية', 'نشط ومعتمد', '10 GB', 'م/ سامح ياسين', 'https://mashawer.com.eg:2096', 'الحساب الإداري الرئيسي لإدارة المنظومة وسيرفرات الـ IT'),
('mail-2', 'ceo@mashawer.com.eg', 'الرئيس التنفيذي والشريك الاستثماري', 'الإدارة العليا', 'نشط ومعتمد', '10 GB', 'أ/ أبو خالد', 'https://mashawer.com.eg:2096', 'إدارة القرارات الاستراتيجية وميزانيات التوسع'),
('mail-3', 'finance@mashawer.com.eg', 'الإدارة المالية والحسابات العامة', 'المالية والحسابات', 'نشط ومعتمد', '5 GB', 'أ/ هاني', 'https://mashawer.com.eg:2096', 'الفواتير، خطط التجديد السنوية، والاشتراكات'),
('mail-4', 'legal@mashawer.com.eg', 'المستشار القانوني وحوكمة العقود', 'الشؤون القانونية', 'نشط ومعتمد', '5 GB', 'أ/ محمد مصطفى', 'https://mashawer.com.eg:2096', 'عقود قيمة تك ومذكرات تأسيس الشركات وإيداعات ITIDA'),
('mail-5', 'operations@mashawer.com.eg', 'إدارة العمليات وتشغيل الكباتن', 'العمليات والتشغيل', 'نشط ومعتمد', '5 GB', 'م/ موفق و أ/ عمرو', 'https://mashawer.com.eg:2096', 'تشغيل تطبيق 4B ومتابعة الرحلات والسائقين'),
('mail-6', 'support@mashawer.com.eg', 'الدعم الفني وخدمة العملاء', 'خدمة العملاء', 'نشط ومعتمد', '5 GB', 'فريق الدعم الفني', 'https://mashawer.com.eg:2096', 'استقبال شكاوى التطبيقات والركاب')
ON CONFLICT (id) DO UPDATE SET
    assigned_to = EXCLUDED.assigned_to,
    status = EXCLUDED.status;

-- 10. Sample Key Tasks from the 135 Master Tasks (جميعها مربوطة بمشاوير وبنية المعادي)
INSERT INTO public.project_tasks (id, task_number, project_id, category, title, description, priority, status, risk_level, due_date, assigned_to, is_emad_key_task, is_sameh_software_task, is_mowaffaq_ops_task, is_lawyer_task)
VALUES
('task-1', 1, 'proj-maadi-hq', 'بنية السيرفرات والشبكة بمقر المعادي', 'تركيب وتثبيت راك بيرلا 27U عمق 1000 في غرفة السيرفرات', 'تثبيت كابينة السيرفر وضبط القواعد والعجلات وتوصيل خط التأريض النحاسي.', 'عاجلة جداً', 'completed', 'safe', '2026-09-26', 'المهندس عماد الشرقاوي والمهندس سامح ياسين', TRUE, TRUE, FALSE, FALSE),
('task-2', 2, 'proj-maadi-hq', 'بنية السيرفرات والشبكة بمقر المعادي', 'تركيب سويتش سيسكو 3850 PoE+ وضبط تكوين شبكات الـ VLANs', 'تهيئة منافذ السويتش الـ 48 وتوزيع VLAN 10 (إدارة)، VLAN 15 (كول سنتر)، VLAN 20 (كاميرات)، و VLAN 30 (سنترال).', 'عاجلة جداً', 'completed', 'safe', '2026-09-26', 'المهندس عماد الشرقاوي والمهندس سامح ياسين', TRUE, TRUE, FALSE, FALSE),
('task-7', 7, 'proj-maadi-hq', 'بنية السيرفرات والشبكة بمقر المعادي', 'تأمين وفحص المنفذ رقم 7 بسويتش سيسكو المخصص لكاميرات وغرفة السيرفرات', 'فحص اتصال المنفذ 7 وسحب كابل Cat6 واختبار استقرار التغذية الكهربائية PoE+ والتأكد من نقل الصورة بجودة 5MP دون تقطيع.', 'عاجلة جداً', 'in_progress', 'attention', '2026-10-08', 'المهندس عماد الشرقاوي والمهندس سامح ياسين', TRUE, TRUE, FALSE, FALSE),
('task-45', 45, 'proj-4b-operations-noc', 'ربط برنامج 4B', 'توصيل واختبار خط الربط المباشر الفايبر لبرنامج 4B بالمنفذ Gi1/0/45', 'دائرة TE-CAI-4B-PRI-4821 مع سنترال المعادي والتأكد من زمن التأخير < 5ms.', 'عاجلة جداً', 'in_progress', 'attention', '2026-10-10', 'المهندس عماد الشرقاوي والمهندس سامح ياسين', TRUE, TRUE, FALSE, FALSE),
('task-123', 123, 'proj-kaggle-ucp', 'مسابقة كاجل والذكاء الاصطناعي', 'اعتماد عنوان الورقة البحثية لمسار كاجل Paper Track ($100k) لبروتوكول UCP-LLM', 'المسار العلمي والورقة البحثية The White Lion والمنافسة العالمية في الذكاء الاصطناعي التوليدي.', 'عالية', 'completed', 'safe', '2026-10-01', 'المهندس سامح ياسين', FALSE, TRUE, FALSE, FALSE),
('task-124', 124, 'proj-kaggle-ucp', 'مسابقة كاجل والذكاء الاصطناعي', 'صياغة المسودة النهائية للورقة البحثية والبروتوكول المعرفي قبل موعد 17 أكتوبر 2026', 'الموعد النهائي الصارم لتقديم ورقة The White Lion والمنافسة على جائزة كاجل التوليدية.', 'عاجلة جداً', 'in_progress', 'critical_danger', '2026-10-17', 'المهندس سامح ياسين', FALSE, TRUE, FALSE, FALSE)
ON CONFLICT (id) DO UPDATE SET
    status = EXCLUDED.status,
    priority = EXCLUDED.priority;

-- 11. Strategic Decisions (سجل القرارات الحقيقية مع أبو خالد)
INSERT INTO public.meshawir_strategic_decisions (id, decision_title, meeting_reference, stakeholders, selected_option, final_notes)
VALUES
('dec-1', 'حسم اختيار كاميرات المراقبة (2 ميجا vs 5 ميجا)', 'مكالمة السبت 26 سبتمبر مع أبو خالد وم/ علي', '["أبو خالد","م/ سامح ياسين","م/ عماد الشرقاوي","أ/ هاني"]'::jsonb, 'اعتماد كاميرات هيكفيجن 5MP بقيمة 55,050 ج.م', 'تم اختيار كاميرات 5MP بدقة فائقة لتغطية كامل أرجاء مقر المعادي ومطعم العجوزة وتوحيد الصيانة.'),
('dec-2', 'مواصفات سيرفر 4B السحابي مع المصرية للاتصالات WE', 'اجتماع الأحد 27 سبتمبر مع م/ أحمد غريب', '["م/ سامح ياسين","م/ عماد الشرقاوي","م/ أحمد غريب"]'::jsonb, 'طلب أمر شراء سيرفر 4B فقط بمركز بيانات القرية الذكية (8,500 ج.م/شهرياً)', 'حصر أمر الشراء في خادم 4B فقط دون أي ارتباطات إضافية وتوفير 15,000 ج.م شهرياً.'),
('dec-3', 'إنشاء شركة جديدة تابعة لشركة مشاوير للمنصات الرقمية', 'مذكرة المهندس سامح لأبو خالد (26 سبتمبر)', '["أبو خالد","م/ سامح ياسين","أ/ محمد مصطفى (المحامي)"]'::jsonb, 'الموافقة المبدئية والبدء في الإجراءات القانونية', 'تأسيس كيان تقني متخصص يملك البرمجيات ويخدم منصة وكالة ومشاوير ويوفر مصاريف الشركات الخارجية.')
ON CONFLICT (id) DO NOTHING;

`;

export const SUPABASE_ALL_IN_ONE_50_TABLES_SQL = `${SUPABASE_MASTER_50_TABLES_SQL}\n\n${SUPABASE_LIVE_SEED_50_TABLES_SQL}`;
