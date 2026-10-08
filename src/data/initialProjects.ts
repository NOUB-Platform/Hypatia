import { ProjectItem, ProjectTask, ApiEndpointItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-4b',
    name: 'تطبيق فور بي (4B)',
    code: '4B',
    category: 'مشاوير',
    description: 'تطبيق الركاب وحجز الرحلات الفورية والمجدولة مع تتبع المسار وحساب الـ Surge Pricing.',
    status: 'مرحلة الاختبار QA',
    figmaUrl: 'https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6/%D9%85%D8%B4%D8%A7%D9%88%D9%8A%D8%B1---backlog?node-id=221-63531&t=uCzHJZbEM1gi1Zz8-0',
    repoUrl: 'github.com/mashweer/4b-passenger-app',
    notes: 'بانتظار اعتماد التحديث الأخير من الـ QA بخصوص تجربة الخرائط والدفع.',
    dbInfo: {
      type: 'PostgreSQL / Supabase',
      tables: ['trips', 'passengers', 'saved_addresses', 'ride_ratings', 'coupons'],
      notes: 'التركيز على سرعة استعلام رحلات الراكب السابقة والتخزين المؤقت للأماكن المفضلة.'
    },
    apkFiles: [
      {
        id: 'apk-4b-1',
        version: 'v1.4.2-beta',
        buildNumber: 142,
        fileName: '4B_Passenger_v1.4.2_release.apk',
        fileSize: '34.8 MB',
        uploadedAt: 'اليوم، 02:15 م',
        notes: 'إصلاح مشكلة حفظ العنوان المفضل وتحديث مكتبة الخرائط وتحسين سلاسة التمرير.',
        status: 'جاهز للاختبار'
      }
    ]
  },
  {
    id: 'proj-wekala',
    name: 'تطبيق وكالة (WeKaLa)',
    code: 'WEKALA',
    category: 'مشاوير',
    description: 'نظام إدارة الوكلاء، مكاتب التوصيل، إدارة أساطيل السيارات والكباتن، والعمولات اليومية لمنظومة مشاوير.',
    status: 'قيد التطوير',
    figmaUrl: 'https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala?node-id=0-1&t=rbE4CPeGiTAMMin2-1',
    repoUrl: 'github.com/mashweer/wekala-fleet-management',
    notes: 'يتم حالياً ربط واجهات تسجيل الوكلاء وتفعيل نظام توثيق المركبات والمستندات الرسمية، بانتظار استلام الكود من المطور.',
    driveAssets: [
      {
        id: 'drive-wekala-assets',
        name: 'أصول وشعارات تطبيق وكالة (WeKaLa)',
        pathOrUrl: 'https://drive.google.com/drive/folders/MASHWEER_WEKALA_ASSETS',
        type: 'logos',
        notes: 'اللوجوهات الرسمية لوكالة، الأيقونات الموجهة للوكلاء والشركاء.',
        updatedAt: '2026-09-08'
      }
    ],
    referenceChats: [],
    contextHints: [
      'اسم التطبيق الرسمي وكالة WeKaLa بالـ (ي) بالإنجليزية.',
      'العقد مع المطور الخارجي يتضمن تسليم سورس كود Flutter مع مستودع GitHub وملفات الـ Keystore.'
    ],
    dbInfo: {
      type: 'PostgreSQL / Supabase',
      tables: ['agencies', 'fleet_vehicles', 'agent_commissions', 'captain_assignments', 'documents'],
      notes: 'جدول العمولات يحتاج فهارس مركبة لتسريع تقارير التسوية الأسبوعية.'
    },
    apkFiles: []
  },
  {
    id: 'proj-daro',
    name: 'تطبيق دارو (Daro)',
    code: 'DARO',
    category: 'مشاوير',
    description: 'منصة الشحنات اللوجستية، نقل الطرود والبضائع بين المدن، وإدارة محطات التوزيع والتسليم.',
    status: 'قيد التطوير',
    figmaUrl: 'https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro?node-id=0-1&t=HFGqvAl4RPmlMliu-1',
    repoUrl: 'github.com/mashweer/daro-cargo-system',
    notes: 'التركيز على ميزة فحص الباركود (Barcode Scanner) في محطات الاستلام والتسليم.',
    dbInfo: {
      type: 'PostgreSQL / Supabase',
      tables: ['shipments', 'cargo_hubs', 'waybills', 'truck_dispatches', 'tracking_logs'],
      notes: 'سجلات التتبع tracking_logs تحتاج إلى تدوير دوري لتفادي تضخم الحجم.'
    },
    apkFiles: []
  },
  {
    id: 'proj-maadi-hq',
    name: 'البنية التحتية وغرفة سيرفرات المعادي (Maadi HQ)',
    code: 'MAADI-HQ',
    category: 'بنية تحتية',
    description: 'غرفة السيرفرات الرئيسية، راك 27U، سيرفر Dell R640، جهازي HP Z440 (Proxmox + OPNsense)، وسويتش سيسكو 3850 PoE.',
    status: 'جاهز للنشر',
    repoUrl: 'github.com/mashweer/maadi-infrastructure',
    notes: 'تم توريد وتركيب الراك وسويتش سيسكو، وتثبيت البروكس موكس وجدار الحماية.',
    dbInfo: {
      type: 'Proxmox VE / OPNsense',
      tables: ['vlans', 'firewall_rules', 'cctv_streams', 'dhcp_leases'],
      notes: 'تقسيم شبكات الـ VLANs لسويتش سيسكو 3850.'
    },
    apkFiles: []
  },
  {
    id: 'proj-trading-ops',
    name: 'غرفة عمليات ومراقبة برنامج 4B (4B Operations Room)',
    code: '4B-OPS-NOC',
    category: 'عمليات وتشغيل',
    description: 'غرفة العمليات المركزية لمتابعة خوادم برنامج 4B، خطوط الربط المباشرة مع المصرية للاتصالات WE وأجهزة التتبع LTRA.',
    status: 'في الإنتاج',
    repoUrl: 'github.com/mashweer/4b-operations-engine',
    notes: 'خطوط ربط الفايبر المباشرة لبرنامج 4B بمقر المعادي وتدفق العمليات والرحلات اللحظي.',
    dbInfo: {
      type: 'PostgreSQL / PostGIS',
      tables: ['trips_stream', 'active_drivers', 'audit_logs', 'latency_metrics'],
      notes: 'قواعد بيانات متخصصة في حركة الأسطول ومراقبة استقرار الخوادم.'
    },
    apkFiles: []
  },
  {
    id: 'proj-kaggle-ucp',
    name: 'مسابقة كاجل وبروتوكول UCP (Kaggle & UCP-LLM)',
    code: 'KAGGLE-UCP',
    category: 'أبحاث وذكاء',
    description: 'مسار الورقة البحثية The White Lion (17 أكتوبر) ونواة الوكيل البرمجي الذاتي لجائزة كاجل ($100,000) مع نموذج Gemma 4 أوفلاين.',
    status: 'قيد التطوير',
    repoUrl: 'github.com/mashweer/kaggle-gemma-ucp',
    notes: 'الموعد الحاسم لتسليم الورقة البحثية 17 أكتوبر 2026.',
    dbInfo: {
      type: 'Python / Unsloth / LoRA',
      tables: ['benchmarks', 'eval_runs', 'token_logs', 'agent_memory'],
      notes: 'تسجيل نتائج تقييم أداء الوكيل البرمجي دون اتصال بالإنترنت.'
    },
    apkFiles: []
  }
];

export const INITIAL_API_ENDPOINTS: ApiEndpointItem[] = [
  {
    id: 'api-mashweer-supabase',
    name: 'سحابة وقاعدة بيانات مشاوير (Supabase Mashweer Cloud)',
    service: 'Supabase Cloud',
    urlOrIp: 'https://mashweer-db.supabase.co',
    method: 'POST',
    apiKeyOrSecret: 'sb-mashweer-prod-hidden',
    status: 'يعمل بكفاءة',
    lastPingMs: 18,
    notes: 'قاعدة البيانات المركزية لتطبيقات مشاوير (4B، وكالة، دارو) والمصادقة وإدارة المستخدمين.'
  },
  {
    id: 'api-we-datacenter',
    name: 'خادم الإنتاج والربط الحكومي - المصرية للاتصالات WE',
    service: 'WE Telecom Egypt Data Center',
    urlOrIp: 'https://api.goride.eg/v1',
    method: 'POST',
    status: 'يعمل بكفاءة',
    lastPingMs: 6,
    notes: 'خادم استضافة تطبيق نقل الركاب 4B داخل داتا سنتر القرية الذكية التزاماً بالترخيص الحكومي.'
  },
  {
    id: 'api-fawry-gateway',
    name: 'بوابة الدفع وصرف المستحقات - فوري (Fawry Pay)',
    service: 'Fawry Enterprise',
    urlOrIp: 'https://api.fawry.com/payments',
    method: 'POST',
    apiKeyOrSecret: 'FAWRY_MERCHANT_KEY_MASHWEER',
    status: 'يعمل بكفاءة',
    lastPingMs: 14,
    notes: 'تحصيل مدفوعات الرحلات إلكترونياً وصرف محافظ ومستحقات الكباتن والوكلاء.'
  },
  {
    id: 'api-broadnet-sms',
    name: 'بوابة رسائل التحقق OTP - برودنت (BroadNet A2P SMS)',
    service: 'BroadNet ME',
    urlOrIp: 'https://api.broadnetme.com/v1/sms/send',
    method: 'POST',
    apiKeyOrSecret: 'bn-otp-api-key-active',
    status: 'يعمل بكفاءة',
    lastPingMs: 11,
    notes: 'إرسال رموز التحقق OTP للركاب والكباتن والعملاء تحت المعرف المعتمد GoRide / Mashawer.'
  },
  {
    id: 'api-google-maps',
    name: 'واجهة الخرائط والتوجيه - منصة خرائط جوجل (Google Maps API)',
    service: 'Google Cloud Platform',
    urlOrIp: 'https://maps.googleapis.com/maps/api/directions/json',
    method: 'GET',
    apiKeyOrSecret: 'GOOGLE_MAPS_SERVER_KEY_RESTRICTED',
    status: 'يعمل بكفاءة',
    lastPingMs: 22,
    notes: 'حساب المسافات، تتبع الرحلات اللحظي، وتوجيه مسارات شاحنات دارو وكباتن 4B.'
  },
  {
    id: 'api-cloudinary-cdn',
    name: 'مخزن الوسائط ووثائق التحقق - كلاوديناري (Cloudinary)',
    service: 'Cloudinary Media CDN',
    urlOrIp: 'https://api.cloudinary.com/v1_1/mashweer-cloud',
    method: 'POST',
    apiKeyOrSecret: 'CLOUDINARY_API_SIGNATURE_SHA256',
    status: 'يعمل بكفاءة',
    lastPingMs: 25,
    notes: 'مستودع تخزين صور بطاقات الكباتن، رخص القيادة، ووثائق وكلاء منصة وكالة والشحنات.'
  }
];

export const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 'task-4b-1',
    projectId: 'proj-4b',
    title: 'فحص تجربة الدفع والتسعير الديناميكي في شاشات فيجما لتطبيق فور بي',
    description: 'التأكد من مطابقة شاشات الفيجما الجديدة مع مكونات واجهة React Native قبل استلام الكود من قيمة تك.',
    priority: 'عاجل',
    status: 'جاري العمل',
    createdAt: 'اليوم، 10:00 ص',
    dueDate: '2026-10-05'
  },
  {
    id: 'task-wekala-1',
    projectId: 'proj-wekala',
    title: 'مراجعة شاشات تسجيل الوكلاء وتوثيق المركبات في تطبيق وكالة (WeKaLa)',
    description: 'التأكد من اكتمال دورة إضافة الوكلاء وتعيين الكباتن واحتساب العمولات الأسبوعية.',
    priority: 'عاجل',
    status: 'جاري العمل',
    createdAt: 'اليوم، 11:30 ص',
    dueDate: '2026-10-08'
  },
  {
    id: 'task-daro-1',
    projectId: 'proj-daro',
    title: 'اختبار ماسح الباركود (Barcode Scanner) في محطات الطرود لتطبيق دارو',
    description: 'فحص سرعة استجابة الكاميرا لمسح بوالص الشحن والتحقق من تفريغ الشحنات بين المحافظات.',
    priority: 'متوسط',
    status: 'جاري العمل',
    createdAt: 'أمس',
    dueDate: '2026-10-10'
  },
  {
    id: 'task-server-room',
    projectId: 'proj-4b',
    title: 'تثبيت سويتش سيسكو 3850 PoE وسيرفر Dell R640 في راك المعادي 27U',
    description: 'متابعة تنظيم كوابل Cat6 والباتش بانل وتوصيل الباور سبلاي المزدوج 715W مع م/ أحمد عبيد وم/ عماد الشرقاوي.',
    priority: 'عاجل',
    status: 'جاري العمل',
    createdAt: 'اليوم، 09:00 ص',
    dueDate: '2026-10-02'
  },
  {
    id: 'task-we-hosting',
    projectId: 'proj-4b',
    title: 'استكمال متطلبات الاستضافة مع م/ أحمد محرم وم/ أحمد غريب بشركة WE',
    description: 'تأكيد جاهزية نظام Ubuntu 22.04 و PostgreSQL 16 + PostGIS 3.4 في داتا سنتر القرية الذكية.',
    priority: 'عاجل',
    status: 'جاري العمل',
    createdAt: 'اليوم',
    dueDate: '2026-10-06'
  }
];

// Initial Contract Deliverables for Mashweer Apps (4B, WeKaLa, Daro)
export const INITIAL_CONTRACT_DELIVERABLES: any[] = [
  {
    id: 'contract-4b',
    appName: 'فور بي (4B) - مشاوير',
    appCode: '4B',
    developerName: 'شركة قيمة تك (Qeema Tech)',
    contractStatus: 'مرحلة فحص الكود والتسليم',
    targetDeliveryDate: '2026-10-15 (خطة الـ 7 أسابيع - August 2026 / V1.0)',
    sourceCodeRepo: 'github.com/mashweer/4b-passenger-app',
    agreedPrice: 'شامل الدفعات التعاقدية (5 محطات تسليم M1 إلى M5)',
    paidAmount: 'دفعة المقدم + مرحلة الـ UI والتشغيل',
    remainingAmount: 'دفعات النواة المالية والحوكمة والتسليم النهائي UAT',
    notes: 'تطبيق الركاب الأساسي لمنظومة مشاوير. الخطة الزمنية الرسمية المستلمة من قيمة تك تمتد لـ 7 أسابيع مقسمة إلى 5 محطات رئيسية: التشغيل الأساسي، التسعير، النواة المالية، التقارير والحوكمة، واختبارات UAT والإطلاق الإنتاجي.',
    checklist: [
      { id: 'c4b-m1', item: 'المرحلة 1 (W1-W2): التشغيل الأساسي وإدارة الكباتن والركاب وربط الخريطة وتتبع الرحلات', completed: true, required: true, category: 'code' },
      { id: 'c4b-m2', item: 'المرحلة 2 (W3): التسعير الديناميكي، باقات الكباتن، أكواد الخصم، والمناطق الجغرافية', completed: false, required: true, category: 'code' },
      { id: 'c4b-m3', item: 'المرحلة 3 (W4-W5): النواة المالية، كشف حساب المحفظة، تسوية العمولات، وأعمار الديون والضرائب VAT', completed: false, required: true, category: 'db' },
      { id: 'c4b-m4', item: 'المرحلة 4 (W6): التقارير والحوكمة وفصل الصالحيات Segregation of Duties والربط البنكي', completed: false, required: true, category: 'docs' },
      { id: 'c4b-m5', item: 'المرحلة 5 (W7): اختبارات التكامل الشاملة UAT، معالجة الملاحظات، وإصدار الإنتاج النهائي', completed: false, required: true, category: 'apk' },
      { id: 'c4b-1', item: 'تسليم السورس كود كاملاً على GitHub في المنظمة الرسمية', completed: true, required: true, category: 'code' },
      { id: 'c4b-2', item: 'تسليم ملفات الـ Keystore الرسمية وتوقيع الـ Release APK/AAB', completed: false, required: true, category: 'keystore' },
      { id: 'c4b-3', item: 'مطابقة شاشات التطبيق مع تصاميم Figma المعتمدة', completed: true, required: true, category: 'figma' },
      { id: 'c4b-4', item: 'توفير سكربت جداول Supabase / PostgreSQL والـ Migrations لسيرفر WE و Dell R640', completed: false, required: true, category: 'db' },
      { id: 'c4b-5', item: 'توثيق الـ Readme ودليل بناء التطبيق محلياً (Build Guide)', completed: false, required: true, category: 'docs' },
    ]
  },
  {
    id: 'contract-wekala',
    appName: 'وكالة (WeKaLa) - مشاوير',
    appCode: 'WEKALA',
    developerName: 'المطور الخارجي (فريق تطبيقات النقل)',
    contractStatus: 'جاري العمل',
    targetDeliveryDate: '2026-09-25',
    sourceCodeRepo: 'github.com/mashweer/wekala-fleet-management',
    agreedPrice: 'متفق عليه بالعقد',
    paidAmount: 'دفعة التعاقد الأولى',
    remainingAmount: 'متبقي دفعة الـ Alpha ودفعة التسليم',
    notes: 'تطبيق الوكلاء والشركاء وإدارة مكاتب التوصيل. التأكد من اسم التطبيق بالـ (ي) WeKaLa.',
    checklist: [
      { id: 'cw-1', item: 'تسليم كود تطبيق الوكلاء على مستودع GitHub', completed: false, required: true, category: 'code' },
      { id: 'cw-2', item: 'إصدار أول نسخة تجريبية APK للاختبار الداخلي (Alpha)', completed: false, required: true, category: 'apk' },
      { id: 'cw-3', item: 'ربط نظام توثيق المركبات والمستندات بـ Supabase Storage', completed: false, required: true, category: 'db' },
      { id: 'cw-4', item: 'تسليم مفاتيح وشهادات التوقيع الرقمية للـ Play Store', completed: false, required: true, category: 'keystore' },
    ]
  },
  {
    id: 'contract-daro',
    appName: 'دارو (Daro) - مشاوير',
    appCode: 'DARO',
    developerName: 'المطور الخارجي (فريق تطبيقات النقل)',
    contractStatus: 'جاري العمل',
    targetDeliveryDate: '2026-10-02',
    sourceCodeRepo: 'github.com/mashweer/daro-cargo-system',
    agreedPrice: 'متفق عليه بالعقد',
    paidAmount: 'دفعة البداية',
    remainingAmount: 'متبقي دفعة المعاينة والتسليم النهائي',
    notes: 'تطبيق الشحنات والطرود واللوجستيات بين المدن ومحطات التوزيع.',
    checklist: [
      { id: 'cd-1', item: 'تطوير كود قارئ الباركود (Barcode Scanner) لشحنات الطرود', completed: false, required: true, category: 'code' },
      { id: 'cd-2', item: 'ربط جداول محطات التوزيع ومسارات الشاحنات', completed: false, required: true, category: 'db' },
      { id: 'cd-3', item: 'تسليم نسخة تجريبية APK للمشرفين الميدانيين', completed: false, required: true, category: 'apk' },
      { id: 'cd-4', item: 'تسليم الكود المصدري ووثائق تشغيل الـ Backend', completed: false, required: true, category: 'docs' },
    ]
  }
];

// Initial Employee Emails for mashweer.com.eg - Zoho Lite Plan from المصرية لتكنولوجيا المعلومات
export const INITIAL_MASHWEER_EMAILS: any[] = [
  {
    id: 'email-admin',
    employeeName: 'الإدارة العامة والتحكم بالمنظومة',
    role: 'Administration & System Master',
    emailAddress: 'admin@mashweer.com.eg',
    status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: '2026-09-10',
    notes: 'الإيميل الرئيسي المعتمد للإدارة العامة والتحكم بالأنظمة والخوادم.'
  },
  {
    id: 'email-support',
    employeeName: 'الدعم الفني وخدمة العملاء',
    role: 'Technical Support & Helpdesk Lead',
    emailAddress: 'support@mashweer.com.eg',
    status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: '2026-09-10',
    notes: 'استقبال بلاغات ودعم كباتن وركاب 4B ومستخدمي وتجار منصة وكالة ودارو.'
  },
  {
    id: 'email-info',
    employeeName: 'المعلومات والاستفسارات العامة',
    role: 'General Information & Inquiries',
    emailAddress: 'info@mashweer.com.eg',
    status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: '2026-09-10',
    notes: 'الإيميل العام الموجه للجمهور والشركاء التجاريين والموقع الإلكتروني التعريفي.'
  },
  {
    id: 'email-operation',
    employeeName: 'إدارة العمليات والتشغيل الميداني',
    role: 'Head of Operations & Fleet',
    emailAddress: 'operation@mashweer.com.eg',
    status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: '2026-09-10',
    notes: 'تشغيل الرحلات الميدانية، متابعة حركة الكباتن في المحافظات، ومسارات شحنات دارو.'
  },
  {
    id: 'email-finance',
    employeeName: 'الإدارة المالية والحسابات',
    role: 'Finance & Accounts Manager',
    emailAddress: 'finance@mashweer.com.eg',
    status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: '2026-09-10',
    notes: 'متابعة بوابات الدفع (فوري / Paymob)، الفواتير الرسمية، ومستحقات وعمولات الكباتن.'
  },
  {
    id: 'email-hr',
    employeeName: 'الموارد البشرية والتوظيف',
    role: 'Human Resources & Talent Lead',
    emailAddress: 'hr@mashweer.com.eg',
    status: 'ملغي ومستبعد (للاكتفاء بـ 5 إيميلات مجانية)',
    provider: 'Zoho Lite (المصرية لتكنولوجيا المعلومات)',
    createdAt: '2026-09-09',
    deliveryDate: 'ملغي بناءً على توجيه م/ سامح',
    notes: 'تم إلغاء واستبعاد هذا الإيميل بقرار م/ سامح ياسين للاكتفاء بالـ 5 إيميلات المجانية من زوهو وتفادي دفع رسوم إضافية لحساب سادس.'
  }
];

// Initial Real Service Providers & Credentials Vault
export const INITIAL_SERVICE_PROVIDERS: any[] = [
  {
    id: 'provider-ec-egypt',
    name: 'المصرية لتكنولوجيا المعلومات (EC / eyg.com.eg)',
    category: 'دومينات وإيميلات',
    website: 'https://clients.ec.com.eg',
    officialBadge: 'مزود معتمد رسمي (خدمات نشطة Active)',
    subscriptionDate: '2026-08-09',
    renewalDate: '2027-08-09',
    costOrPlan: 'COM.EG (1100 ج.م) + استضافة Host1 مع SSL (2200 ج.م) = 3300 ج.م سنوياً + إيميلات زوهو',
    activeServices: [
      {
        id: 'svc-ec-com-eg',
        name: 'COM.EG',
        domainOrResource: 'mashawer.com.eg',
        price: '1100.00 جنيه مصري',
        billingCycle: 'Annually (سنوي)',
        nextDueDate: 'Monday, August 9th, 2027',
        status: 'Active',
        hasSsl: false
      },
      {
        id: 'svc-ec-host1',
        name: 'Host1',
        domainOrResource: 'mashawer.com.eg',
        price: '2200.00 جنيه مصري',
        billingCycle: 'Annually (سنوي)',
        nextDueDate: 'Wednesday, August 11th, 2027',
        status: 'Active',
        hasSsl: true
      }
    ],
    contactPersons: [
      {
        name: 'المهندس محمد الحلو',
        role: 'مسؤول الحساب والدعم الفني - المصرية لتكنولوجيا المعلومات',
        phone: '01551553434',
        email: 'info@ec.com.eg',
        notes: 'متابع لحجز الدومينات وتفعيل باقة الـ 6 إيميلات على زوهو وضبط الـ DNS.'
      }
    ],
    credentials: [
      {
        id: 'cred-ec-domain-spelling',
        keyName: 'النطاق المعتمد في الفواتير (Domain Spelling)',
        keyValue: 'mashawer.com.eg',
        type: 'account_id',
        notes: 'تنبيه تدقيق هيباتيا: الدومين المسجل والمحجوز في فاتورة المصرية لتكنولوجيا المعلومات يُكتب mashawer.com.eg بحرف الـ a.',
        isSensitive: false
      },
      {
        id: 'cred-ec-host1-ssl',
        keyName: 'بيانات استضافة Host1 المحجوزة',
        keyValue: 'Host1 Plan - 2200.00 EGP/yr (Active مع شهادة SSL)',
        type: 'env_var',
        notes: 'استضافة الويب الرئيسية لموقع مشاوير التعريفي ولوحات التحكم الإدارية (تجديد 11/8/2027).',
        isSensitive: false
      },
      {
        id: 'cred-ec-1',
        keyName: 'رابط لوحة الكلاينت (Client Area)',
        keyValue: 'https://clients.ec.com.eg/clientarea.php',
        type: 'url',
        notes: 'لوحة التحكم المركزية بالدومينات والفواتير والخدمات المحجوزة.',
        isSensitive: false
      },
      {
        id: 'cred-ec-2',
        keyName: 'سجلات DNS لـ Zoho Mail (MX)',
        keyValue: 'mx.zoho.com (10), mx2.zoho.com (20), mx3.zoho.com (50)',
        type: 'account_id',
        notes: 'سجلات استقبال البريد المعتمدة لربط النطاقات بسيرفرات زوهو.',
        isSensitive: false
      },
      {
        id: 'cred-ec-3',
        keyName: 'سجل حماية البريد SPF',
        keyValue: 'v=spf1 include:zoho.com ~all',
        type: 'account_id',
        notes: 'منع وصول الإيميلات للـ Spam وتأكيد هوية النطاق لدى خوادم الاستقبال.',
        isSensitive: false
      }
    ],
    tasks: [
      {
        id: 'pt-ec-1',
        title: 'استلام وتفعيل الـ 5 إيميلات المجانية بنجاح على زوهو واستبعاد إيميل HR للاكتفاء بالباقة المجانية',
        dueDate: '2026-09-10',
        status: 'مكتملة',
        priority: 'عاجل',
        assignedContact: 'المهندس محمد الحلو وم/ سامح ياسين',
        notes: 'تم تفعيل 5 إيميلات رسمية مجانية بنجاح: admin, support, info, operation, finance. وتم استبعاد وإلغاء إيميل hr@mashweer.com.eg بقرار م/ سامح للاكتفاء بالحد المجاني (5 حسابات) وتفادي التكاليف الإضافية.'
      },
      {
        id: 'pt-ec-2',
        title: 'تأكيد تفعيل بروتوكول IMAP/SMTP لربط الإيميلات ببرنامج Microsoft Outlook داخل المقر',
        dueDate: '2026-09-11',
        status: 'معلقة',
        priority: 'متوسط',
        assignedContact: 'المهندس محمد الحلو'
      },
      {
        id: 'pt-ec-3',
        title: 'تنبيه موعد التجديد السنوي للدومين COM.EG (9 أغسطس 2027)',
        dueDate: '2027-08-09',
        status: 'معلقة',
        priority: 'عادي'
      },
      {
        id: 'pt-ec-4',
        title: 'تنبيه موعد التجديد السنوي للاستضافة Host1 (11 أغسطس 2027)',
        dueDate: '2027-08-11',
        status: 'معلقة',
        priority: 'عادي'
      }
    ],
    linkedApps: ['مشاوير Mashawer', '4B', 'Wikala', 'Daro'],
    notes: 'المزود المعتمد لجميع النطاقات الرسمية وحسابات البريد المؤسسي على زوهو واستضافة Host1.'
  },
  {
    id: 'provider-we-telecom',
    name: 'المصرية للاتصالات (WE - Telecom Egypt)',
    category: 'استضافة وسيرفرات WE',
    website: 'https://te.eg',
    officialBadge: 'استضافة حكومية إلزامية لـ 4B',
    subscriptionDate: '2026-08-15',
    renewalDate: '2027-08-15',
    costOrPlan: 'عقد استضافة IaaS داتا سنتر القرية الذكية / السويس',
    contactPersons: [
      {
        name: 'المهندس أحمد محرم',
        role: 'المصرية للاتصالات - إدارة مبيعات قطاع الأعمال والاستضافة',
        notes: 'متابع ملف التعاقد الحكومي والمواصفات السيرفرية لمشروع 4B.'
      },
      {
        name: 'المهندس أحمد غريب',
        role: 'المصرية للاتصالات - مهندس النظم والشبكات وتجهيز السيرفرات',
        notes: 'المسؤول التقني عن تهيئة بيئة Ubuntu 22.04 و PostgreSQL 16 + PostGIS.'
      },
      {
        name: 'المستشار القانوني / المحامي',
        role: 'محامي الشركة - المتابعة القانونية والتنظيمية مع الوزارة',
        notes: 'متابعة الامتثال لقانون النقل الذكي المصري والترخيص الحكومي لتطبيق 4B.'
      }
    ],
    credentials: [
      {
        id: 'cred-we-1',
        keyName: 'مواصفات السيرفر المعتمدة المطلوب تقديمها (Specs)',
        keyValue: 'Ubuntu 22.04 LTS, Node.js 22 LTS, 4 vCPU / 8 GB RAM / 100 GB SSD',
        type: 'env_var',
        notes: 'المواصفات المشروطة لتشغيل API و Worker وبانل الأدمن.',
        isSensitive: false
      },
      {
        id: 'cred-we-2',
        keyName: 'قاعدة البيانات المطلوبة',
        keyValue: 'PostgreSQL 16 + PostGIS 3.4 Extension + Redis 7 (noeviction)',
        type: 'env_var',
        notes: 'مطلوب إلزامي لتتبع الخرائط وحساب مسارات الرحلات والـ Queues.',
        isSensitive: false
      },
      {
        id: 'cred-we-3',
        keyName: 'منافذ الفايروول المسموحة (Firewall Rules)',
        keyValue: 'Public Inbound: 80, 443 / Private only: 3000, 3001, 5432, 6379',
        type: 'env_var',
        notes: 'حماية أمنية مشددة تمنع كشف قواعد البيانات والـ API داخلياً.',
        isSensitive: false
      }
    ],
    tasks: [
      {
        id: 'pt-we-1',
        title: 'تسليم وثيقة GoRide Server Requirements للمهندس أحمد محرم والمهندس أحمد غريب',
        dueDate: '2026-09-12',
        status: 'جاري المتابعة',
        priority: 'عاجل',
        assignedContact: 'م. أحمد محرم وم. أحمد غريب'
      },
      {
        id: 'pt-we-2',
        title: 'تأكيد تفعيل إضافة PostGIS 3.4 على PostgreSQL 16 داخل داتا سنتر WE',
        dueDate: '2026-09-15',
        status: 'معلقة',
        priority: 'عاجل',
        assignedContact: 'م. أحمد غريب'
      },
      {
        id: 'pt-we-3',
        title: 'مراجعة شروط الترخيص ومذكرة التوافق مع وزارة النقل بالتعاون مع المحامي',
        dueDate: '2026-09-20',
        status: 'جاري المتابعة',
        priority: 'عاجل',
        assignedContact: 'المحامي'
      }
    ],
    linkedApps: ['4B (GoRide)'],
    notes: 'استضافة تطبيق نقل الركاب 4B داخل خوادم WE التزاماً بالقانون المصري لرقابة وزارة النقل.'
  },
  {
    id: 'provider-broadnet',
    name: 'شركة برودنت (BroadNet - broadnetme.com)',
    category: 'رسائل و OTP',
    website: 'https://broadnetme.com',
    officialBadge: 'بوابة الـ SMS ورموز التحقق',
    subscriptionDate: '2026-08-20',
    renewalDate: '2027-08-20',
    costOrPlan: 'حساب A2P SMS للرسائل القصيرة المعتمدة في مصر',
    contactPersons: [
      {
        name: 'فريق مبيعات ودعم برودنت',
        role: 'Technical Account Manager - BroadNet',
        notes: 'متابعة اعتماد الـ Sender ID وتمرير رسائل كود التحقق OTP.'
      }
    ],
    credentials: [
      {
        id: 'cred-bn-1',
        keyName: 'رابط لوحة التحكم',
        keyValue: 'https://broadnetme.com/portal/login',
        type: 'url',
        notes: 'متابعة الرصيد والتقارير وحالة تسليم الرسائل.',
        isSensitive: false
      },
      {
        id: 'cred-bn-2',
        keyName: 'Sender ID المعتمد',
        keyValue: 'GoRide / Mashawer',
        type: 'account_id',
        notes: 'اسم المرسل الأبجدي الظاهر على هواتف العملاء في مصر.',
        isSensitive: false
      },
      {
        id: 'cred-bn-3',
        keyName: 'API Endpoint & Key',
        keyValue: 'https://api.broadnetme.com/v1/sms/send',
        type: 'api_key',
        notes: 'الرابط البرمجي لإرسال الرسائل من الـ Backend.',
        isSensitive: true
      }
    ],
    tasks: [
      {
        id: 'pt-bn-1',
        title: 'تأكيد موافقة مشغلي المحمول (فودافون، أورنج، وي، إي آند) على الـ Sender ID',
        dueDate: '2026-09-14',
        status: 'جاري المتابعة',
        priority: 'عاجل'
      },
      {
        id: 'pt-bn-2',
        title: 'تجربة إرسال رسالة OTP تجريبية إلى أرقام هواتف متعددة وقياس سرعة الوصول',
        dueDate: '2026-09-16',
        status: 'معلقة',
        priority: 'متوسط'
      }
    ],
    linkedApps: ['4B', 'Wikala', 'Daro'],
    notes: 'مزود إرسال الرسائل النصية ورموز الدخول السريعة في مصر والشرق الأوسط.'
  },
  {
    id: 'provider-qeema-tech',
    name: 'شركة قيمة تك (Qeema Tech - شريك التطوير البرمجي)',
    category: 'تطوير برمجيات قيمة تك',
    website: 'https://qeematech.com',
    officialBadge: 'المطور البرمجي الرسمي لـ 4 تطبيقات',
    costOrPlan: 'عقد تطوير وصيانة المنظومة الرقمية والتطبيقات',
    contactPersons: [
      {
        name: 'إدارة المشاريع الهندسية - قيمة تك',
        role: 'Lead Project Manager & Technical Delivery',
        notes: 'متابعة تسليمات الكود، فحص الأخطاء البرمجية، ورفع نسخ الـ APK.'
      }
    ],
    credentials: [
      {
        id: 'cred-qm-figma-mashawer',
        keyName: 'رابط فيجما المعتمد - مشاوير / فور بي (Mashawer - Backlog)',
        keyValue: 'https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6/%D9%85%D8%B4%D8%A7%D9%88%D9%8A%D8%B1---backlog?node-id=221-63531&t=uCzHJZbEM1gi1Zz8-0',
        type: 'url',
        notes: 'ملف التصاميم والـ Backlog المعتمد لشاشات الركاب والرحلات (node-id: 221-63531).',
        isSensitive: false
      },
      {
        id: 'cred-qm-figma-wikala',
        keyName: 'رابط فيجما المعتمد - تطبيق وكالة (Wikala)',
        keyValue: 'https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala?node-id=0-1&t=rbE4CPeGiTAMMin2-1',
        type: 'url',
        notes: 'ملف التصاميم الرسمية لواجهات الوكلاء والشركاء وإدارة الأسطول على فيجما.',
        isSensitive: false
      },
      {
        id: 'cred-qm-figma-daro',
        keyName: 'رابط فيجما المعتمد - تطبيق دارو (Daro)',
        keyValue: 'https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro?node-id=0-1&t=HFGqvAl4RPmlMliu-1',
        type: 'url',
        notes: 'ملف التصاميم الرسمية لواجهات الشحن واللوجستيات والمحطات على فيجما.',
        isSensitive: false
      },
      {
        id: 'cred-qm-1',
        keyName: 'تطبيق فور بي (4B) - المستودع ومواصفات السيرفر',
        keyValue: 'github.com/mashweer/goride-backend (NestJS 10 + Next.js 16)',
        type: 'url',
        notes: 'تطبيق نقل الركاب والطرود التابع لرقابة الوزارة والمصرية للاتصالات.',
        isSensitive: false
      },
      {
        id: 'cred-qm-2',
        keyName: 'تطبيق وكالة (Wikala) - المستودع والمعمارية',
        keyValue: 'github.com/mashweer/wikala-platform (Node.js + MongoDB + Redis)',
        type: 'url',
        notes: 'السوق المفتوح للمزادات والمقايضة والوساطة التجارية.',
        isSensitive: false
      },
      {
        id: 'cred-qm-3',
        keyName: 'تطبيق دارو (Daro) - المستودع',
        keyValue: 'github.com/mashweer/daro-cargo-system (Logistics & Intercity Freight)',
        type: 'url',
        notes: 'منصة إدارة الشحنات والطرود واللوجستيات بين المدن المصرية.',
        isSensitive: false
      },
      {
        id: 'cred-qm-4',
        keyName: 'التطبيق الرابع (قيد التخطيط والاحتمالية)',
        keyValue: 'مشروع مستقبلي قادم تحت مظلة مشاوير وقيمة تك',
        type: 'account_id',
        notes: 'مخصص للمرحلة التوسعية القادمة.',
        isSensitive: false
      }
    ],
    tasks: [
      {
        id: 'pt-qm-1',
        title: 'مراجعة ومقارنة تصاميم فيجما الحديثة مع الكود المسلم لتطبيق 4B ووكالة',
        dueDate: '2026-09-13',
        status: 'جاري المتابعة',
        priority: 'عاجل',
        notes: 'يمكن فحصها مباشرة عبر أمر هيباتيا الصوتي.'
      },
      {
        id: 'pt-qm-2',
        title: 'استلام وفحص محضر الاجتماع الأخير للتأكد من تسليم البنود المتفق عليها مع المطورين',
        dueDate: '2026-09-14',
        status: 'معلقة',
        priority: 'عاجل'
      },
      {
        id: 'pt-qm-3',
        title: 'تأكيد تسليم متطلبات النشر والاستضافة الخاصة بخوادم WE',
        dueDate: '2026-09-16',
        status: 'معلقة',
        priority: 'عاجل'
      }
    ],
    linkedApps: ['4B', 'Wikala', 'Daro', 'التطبيق الرابع الاحتمالي'],
    notes: 'الجهة المطورة للمشاريع الأربعة، مع توثيق كافة المتطلبات البرمجية والعقود.'
  },
  {
    id: 'provider-cloudinary',
    name: 'كلاوديناري (Cloudinary Media & Storage)',
    category: 'خرائط وميديا',
    website: 'https://cloudinary.com',
    officialBadge: 'مخزن الوسائط ووثائق التحقق',
    costOrPlan: 'خطة مدفوعة لتخزين وتوصيل الصور والملفات',
    contactPersons: [
      {
        name: 'حساب مشاوير المؤسسي - Cloudinary',
        role: 'Account Owner',
        email: 'admin@mashweer.com.eg'
      }
    ],
    credentials: [
      {
        id: 'cred-cld-1',
        keyName: 'Cloud Name',
        keyValue: 'mashweer-cloud',
        type: 'env_var',
        notes: 'معرّف مساحة التخزين الخاصة بالمنظومة.',
        isSensitive: false
      },
      {
        id: 'cred-cld-2',
        keyName: 'خوارزمية التوقيع (Signature Algorithm)',
        keyValue: 'SHA-256 (إلزامي ليتوافق مع كود الباك إند)',
        type: 'env_var',
        notes: 'يجب ضبطها من إعدادات الحساب لتفادي فشل رفع الملفات.',
        isSensitive: false
      },
      {
        id: 'cred-cld-3',
        keyName: 'CLOUDINARY_API_KEY / SECRET',
        keyValue: 'CLOUDINARY_API_KEY=••••••••••••• / SECRET=•••••••••••••',
        type: 'secret',
        notes: 'مفاتيح التوقيع السري في السيرفر فقط دون كشفها في المتصفح.',
        isSensitive: true
      }
    ],
    tasks: [
      {
        id: 'pt-cld-1',
        title: 'التأكد من تفعيل Authenticated Private Delivery للوثائق الرسمية ورخص القيادة',
        status: 'معلقة',
        priority: 'متوسط'
      }
    ],
    linkedApps: ['4B', 'Wikala', 'Daro'],
    notes: 'المستودع السحابي الحصري لجميع الصور والوثائق وتقارير Excel في النظام.'
  },
  {
    id: 'provider-fawry',
    name: 'شركة فوري للمدفوعات الإلكترونية (Fawry)',
    category: 'بوابات دفع',
    website: 'https://fawry.com',
    officialBadge: 'بوابة الدفع وصرف مستحقات الكباتن',
    costOrPlan: 'عقد تاجر (Merchant Agreement) للدفع والصرف',
    contactPersons: [
      {
        name: 'إدارة الحسابات التجارية - فوري',
        role: 'Merchant Onboarding Manager'
      }
    ],
    credentials: [
      {
        id: 'cred-fw-1',
        keyName: 'Fawry Merchant Code',
        keyValue: 'FAWRY_MERCHANT_CODE_MASHWEER',
        type: 'account_id',
        isSensitive: false
      },
      {
        id: 'cred-fw-2',
        keyName: 'رابط استلام إشعارات الدفع (Webhook)',
        keyValue: 'https://admin.goride.eg/api/v1/webhooks/fawry',
        type: 'url',
        notes: 'رابط عام مشفر بـ HTTPS ويجب عدم تعديل الـ JSON Body الخام.',
        isSensitive: false
      }
    ],
    tasks: [
      {
        id: 'pt-fw-1',
        title: 'استلام مفاتيح بيئة الاختبار Sandbox لتجربة تحصيل الرحلات وصرف مستحقات الكباتن',
        dueDate: '2026-09-18',
        status: 'جاري المتابعة',
        priority: 'عاجل'
      }
    ],
    linkedApps: ['4B'],
    notes: 'بوابة الدفع الرسمية المعتمدة لرحلات نقل الركاب والطرود وصرف مستحقات السائقين.'
  },
  {
    id: 'provider-google-maps',
    name: 'منصة خرائط جوجل (Google Maps Platform)',
    category: 'خرائط وميديا',
    website: 'https://console.cloud.google.com',
    officialBadge: 'خرائط وتوجيه وحساب مسافات',
    costOrPlan: 'حساب فوترة GCP موحد مع رصيد شهري متجدد',
    contactPersons: [
      {
        name: 'حساب GCP المؤسسي',
        role: 'Google Cloud Administrator',
        email: 'admin@mashweer.com.eg'
      }
    ],
    credentials: [
      {
        id: 'cred-gm-1',
        keyName: 'Server Key (مفتاح السيرفر مقيد بـ IP)',
        keyValue: 'GOOGLE_MAPS_API_KEY (سيرفر 4B وسيرفر وكالة)',
        type: 'api_key',
        notes: 'يُستخدم لحساب المسافات وتقدير الأجرة في السيرفر فقط.',
        isSensitive: true
      },
      {
        id: 'cred-gm-2',
        keyName: 'Web Key (مفتاح الويب مقيد بالدومين)',
        keyValue: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (admin.goride.eg / wikala.app)',
        type: 'api_key',
        notes: 'يُستخدم لعرض الخرائط واختيار العناوين في المتصفح.',
        isSensitive: false
      }
    ],
    tasks: [
      {
        id: 'pt-gm-1',
        title: 'وضع حدود الميزانية (Budget Alert & Quota Caps) لمنع التكاليف غير المحسوبة',
        status: 'معلقة',
        priority: 'عاجل'
      }
    ],
    linkedApps: ['4B', 'Wikala', 'Daro'],
    notes: 'المزود المعتمد لجميع وظائف الخرائط وحساب الكيلومترات في التطبيقات.'
  }
];



