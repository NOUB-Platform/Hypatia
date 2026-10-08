import { SystemInquiry } from '../types';

export const INITIAL_SYSTEM_INQUIRIES: SystemInquiry[] = [
  // ==========================================
  // 1. Z-WORKSTATION & ON-PREMISE SERVERS (NEW & TOP PRIORITY)
  // ==========================================
  {
    id: 'inq-z-workstation-proxmox-setup',
    question: 'هل نعتمد تثبيت Proxmox VE 8.x كنظام تشغيل أساسي (Hypervisor) على جهاز HP Z440 (16-18 Cores) لتشغيل OPNsense ومنظومة الكاميرات والتطبيقات الداخلية؟',
    context: 'جهاز الـ Z يمتلك معالج Xeon قوي وذاكرة ECC. تثبيت Proxmox سيوفر تقسيم المعالج لـ 4 بيئات معزولة (OPNsense Firewall VM, NVR/Shinobi VM, Internal APIs Docker LXC, Staging Environment) ويوفر مئات آلاف الجنيهات في تراخيص ميكروسوفت سيرفر لكل كور.',
    category: 'telecom_servers',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'اعتماد Proxmox VE 8.x مفتوح المصدر فوراً لتقسيم الكور بدون تراخيص',
      'تثبيت Ubuntu Server 24.04 LTS مع Docker & Portainer مباشرة',
      'البدء بنظام OPNsense كـ Bare-metal أولاً ثم الترقية لاحقاً'
    ],
    answered: true,
    answer: 'نعم، معتمد بالكامل وموافق عليه. جهاز الـ Z يعتبر سيرفر حقيقي وسيتم استغلال كامل طاقته ونواته مع السوفت وير المجاني ومفتوح المصدر (Proxmox + OPNsense) لتشغيل الكاميرات والأنظمة الداخلية ومستودع التطبيقات.',
    answeredAt: '2026-09-30',
    suggestedPrompt: 'تجهيز خطة توزيع أنوية معالج الـ Z والرامات على حاويات Proxmox'
  },
  {
    id: 'inq-z-workstation-second-unit-role',
    question: 'كيف سنستغل جهاز الـ HP Z الثاني المتاح في المقر مع الشاشات الثلاث الـ 22 بوصة بكاميرا؟',
    context: 'لديك جهازان Z؛ الأول تم تخصيصه كسيرفر رئيسي ومستودع تطبيقات وجدار ناري. الجهاز الثاني متاح للاستخدام التشغيلي والتقني المتقدم.',
    category: 'telecom_servers',
    urgency: 'high',
    inputType: 'options',
    options: [
      'محطة التطوير البرمجي المركزية ومراقبة الشبكة مع الشاشات الـ 3',
      'بيئة تدريب نماذج الذكاء الاصطناعي وبحوث كاجل Gemma 4 أوفلاين',
      'سيرفر احتياطي متطابق Hot-Standby للتعافي من الكوارث Failover'
    ],
    answered: false,
    suggestedPrompt: 'إعداد سيناريو تشغيل محطة العمل Z الثانية مع الشاشات الثلاث'
  },
  {
    id: 'inq-dell-r640-hypervisor',
    question: 'ما هو نظام التشغيل والـ Virtualization المقترح لسيرفر Dell R640 Platinum (Proxmox VE أم Ubuntu Server 24.04 bare-metal أم ESXi)؟',
    context: 'السيرفر يمتلك معالجين Xeon Platinum 8160 (إجمالي 48 Cores / 96 Threads) و 64GB RAM قابلة للزيادة لـ 128GB، وسيتواجد داخل كابينة الراك 27U.',
    category: 'telecom_servers',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'Proxmox VE Enterprise مفتوح المصدر يدعم KVM و LXC Containers بدون قيود ترخيص',
      'Ubuntu Server 24.04 LTS مباشر مع كونسول Portainer لإدارة حاويات Docker',
      'VMware ESXi Enterprise مع توزيع خوادم معزولة'
    ],
    answered: false,
    suggestedPrompt: 'تجهيز معمارية توزيع الحاويات والـ VMs على سيرفر Dell R640 Platinum'
  },
  {
    id: 'inq-redline-rack-delivered',
    question: 'بخصوص راك البيرلا 27U وأجهزة اختبار الشبكة (فاتورة رد لاين - البستان بقيمة 18,550 ج.م): هل تم استلام عتاد التست (I-Pook Tracker) والأراجة في غرفة السيرفرات بالفعل؟',
    context: 'الفاتورة الإلكترونية المعتمدة برقم 6T3HM2FA86TEDZEBQHYPFWMK10 تؤكد شراء راك 27U واحد فقط عمق 1000 مم مع جهاز فحص الكابلات I-Pook PK65H وأراجة Root 2*1.',
    category: 'telecom_servers',
    urgency: 'medium',
    inputType: 'yes_no',
    answered: true,
    answer: 'نعم، تم الشراء والتوريد الفعلي ومطابق تماماً للفاتورة الضريبية الرسمية لرد لاين (18,550 ج.م).',
    answeredAt: '2026-09-29',
    suggestedPrompt: 'أرشفة فاتورة كابينة السيرفرات وأدوات التركيب في شجرة Hypatia_Source'
  },

  // ==========================================
  // 2. SUPABASE & GITHUB LIVE CLOUD MIGRATION
  // ==========================================
  {
    id: 'inq-supabase-github-live-sync',
    question: 'هل تم نسخ كود الـ Master Schema SQL وتشغيله في مشروع سوبابيز الجديد المرتبط بحساب GitHub الخاص بك؟',
    context: 'ربط سوبابيز مع حساب GitHub يتيح نشر التطبيق برابط خارجي دائم ومشاركة لوحة التحكم الحية مع فريق العمل والمستثمرين، مع مزامنة الجداول تلقائياً.',
    category: 'mashweer_apps',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'نعم، تم إنشاء المشروع وسأقوم بلصق الـ URL والـ Anon Key الآن للمزامنة الحية',
      'جاري إنشاء المشروع وربطه بـ GitHub وسأدخل المفاتيح في الخطوة التالية',
      'أحتاج مراجعة كود الـ SQL والتأكد من جداول مشاوير وسيرفرات المعادي أولاً'
    ],
    answered: false,
    suggestedPrompt: 'فحص اتصال مشروع سوبابيز الجديد ومزامنة الجداول تلقائياً'
  },
  {
    id: 'inq-supabase-auto-backup-policy',
    question: 'هل نعتمد سياسة النسخ الاحتياطي التلقائي (Daily Automated Backups) لقاعدة بيانات سوبابيز مع تنزيل نسخة محلية أسبوعياً على جهاز الـ Z؟',
    context: 'النسخ المحلي على هاردات جهاز الـ Z في المعادي يضمن سيادة البيانات واستعادتها حتى في حال انقطاع الإنترنت أو مشاكل السحابة.',
    category: 'mashweer_apps',
    urgency: 'high',
    inputType: 'options',
    options: [
      'نعم، تفعيل النسخ اليومي السحابي وسحب Backup محلي أسبوعي على الـ Z',
      'الاعتماد على النسخ السحابي اليومي المدمج في سوبابيز فقط',
      'نسخ يدوي عند حدوث تحديثات جوهرية في المنظومة'
    ],
    answered: false,
    suggestedPrompt: 'إعداد سكربت سحب النسخ الاحتياطية من سوبابيز إلى جهاز الـ Z محلياً'
  },

  // ==========================================
  // 3. 4B PASSENGER APP & WE TELECOM SERVER
  // ==========================================
  {
    id: 'inq-telecom-po-sign',
    question: 'هل نعتمد أمر شراء سيرفر 4B فقط مع المصرية للاتصالات WE رسمياً ونبدأ توقيع التعاقد قبل انتهاء صلاحية الأسبوع؟',
    context: 'عرض ومواصفات خوادم 4B فقط (Ubuntu 22.04, 4 vCPU, 8GB RAM, PostGIS 16, Redis 7, F5 WAF) محدد بقيمة 8,500 ج.م/شهرياً.',
    category: 'telecom_servers',
    urgency: 'critical',
    inputType: 'yes_no',
    answered: true,
    answer: 'نعم، تم اعتماد عرض سيرفر 4B فقط وسيتم تنفيذه وتوقيع أمر الشراء مع م. أحمد غريب، وتكلفة الربط بالجهات الخارجية ستُحسب بشكل منفصل لاحقاً.',
    answeredAt: '2026-09-24',
    suggestedPrompt: 'صياغة خطاب رسمي للمهندس أحمد غريب في المصرية للاتصالات باعتماد أمر شراء خادم 4B'
  },
  {
    id: 'inq-4b-apk-testing-phase',
    question: 'هل نبدأ اختبار حزمة 4B APK v1.4.2 على هواتف السائقين التجريبية داخلياً أم ننتظر استقرار خادم WE؟',
    context: 'ملف الـ APK بحجم 34.8 MB جاهز للفحص الداخلي، وربطه بقواعد بيانات تجريبية متاح الآن.',
    category: 'mashweer_apps',
    urgency: 'high',
    inputType: 'options',
    options: [
      'بدء الاختبار الداخلي على أجهزة الفريق فوراً لتسجيل الملاحظات',
      'الانتظار حتى انتهاء تثبيت خادم WE لتجربة الـ End-to-End المباشرة',
      'تجربة واجهات الـ UI وفحص تدفق الرحلات (UI Bug Bash) فقط حالياً'
    ],
    answered: false,
    suggestedPrompt: 'إعداد جدول فحص واختبارات حزمة 4B APK v1.4.2'
  },
  {
    id: 'inq-4b-payment-gateway-binding',
    question: 'ما هي بوابة الدفع البنكية المعتمدة لتطبيق 4B (باي موب Paymob، فوري Fawry، أم البنك الأهلي NBE مباشرة)؟',
    context: 'مطلوبة لضبط مفاتيح الـ Production Webhooks وتأمين رصيد المحافظ في خادم 4B.',
    category: 'mashweer_apps',
    urgency: 'high',
    inputType: 'options',
    options: [
      'باي موب Paymob لسرعة الربط ودعم البطاقات والمحافظ الإلكترونية',
      'فوري Fawry لدعم الدفع النقدي عبر منافذ التجار بالجمهورية',
      'بوابة دفع بنكية مباشرة مع البنك الأهلي NBE أو بنك مصر'
    ],
    answered: false,
    suggestedPrompt: 'مقارنة فنية ومالية بين بوابات الدفع الإلكتروني لتطبيق 4B'
  },

  // ==========================================
  // 4. WEKALA, DARO & MASHWEER DRIVER
  // ==========================================
  {
    id: 'inq-wekala-keystore-custody',
    question: 'هل تم استلام ملفات الـ Keystore الأصلية وكلمات المرور الخاصة بتطبيق وكالة من المطور السابق؟',
    context: 'ملفات الـ Keystore ضرورية لتوقيع التحديثات على Google Play دون فقدان التطبيق أو تغيير المعرف.',
    category: 'mashweer_apps',
    urgency: 'critical',
    inputType: 'yes_no',
    options: [
      'تم الاستلام ومحفوظة بالخزنة الرقمية',
      'مطلوب إدراجها ضمن محضر الاستلام مع المحامي أ/ محمد مصطفى',
      'لا تزال لدى المطور وجاري التنسيق لاستلامها'
    ],
    answered: false,
    suggestedPrompt: 'صياغة محضر استلام مفاتيح التوقيع الرقمي Keystore وسورس فلاتر'
  },
  {
    id: 'inq-daro-scanner-hardware',
    question: 'ما هو نوع أجهزة مسح الباركود المقترحة لمحطات شحن دارو (أجهزة Handheld مخصصة أم هواتف ذكية بكاميرا)؟',
    context: 'لاختيار برمجيات قراءة الباركود المناسبة (ZBar / ML Kit) وتحديد ميزانية التوريد.',
    category: 'mashweer_apps',
    urgency: 'medium',
    inputType: 'options',
    options: [
      'أجهزة كشف باركود ليزر Handheld مخصصة للصدمات في المستودعات',
      'تطبيق هاتف بكاميرا ذكية تدعم Google ML Kit Barcode للسرعة والتوفير',
      'أجهزة مدمجة مع طابعات البوالص الحرارية المتنقلة'
    ],
    answered: false,
    suggestedPrompt: 'مواصفات تطبيق ماسح بوالص شحن دارو لمحطات التجميع'
  },
  {
    id: 'inq-driver-tracking-interval',
    question: 'ما هو معدل بث إحداثيات GPS المطلوب في تطبيق الكابتن (كل 3 ثوانٍ أم 5 ثوانٍ) لموازنة استهلاك البطارية والسيرفر؟',
    context: 'يؤثر مباشرة على استهلاك الباندويث ومعالجة خادم WE وقواعد PostGIS.',
    category: 'mashweer_apps',
    urgency: 'medium',
    inputType: 'options',
    options: [
      'كل 3 ثوانٍ (دقة فائقة في الخريطة ومسارات الانعطاف)',
      'كل 5 ثوانٍ (توازن مثالي بين الدقة والبطارية والخادم)',
      'ديناميكي: كل ثانيتين عند الحركة السريعة وكل 10 ثوانٍ عند التوقف'
    ],
    answered: false,
    suggestedPrompt: 'هندسة خوارزمية تتبع سيارات الكباتن الموفرة للباندويث'
  },

  // ==========================================
  // 5. HARDWARE, MAADI CCTV & NETWORK
  // ==========================================
  {
    id: 'friends-cctv-approval',
    question: 'هل نعطي الضوء الأخضر للمهندس علي (شركة الأصدقاء) لتوريد وتركيب منظومة كاميرات المعادي بقيمة 55,050 ج.م؟',
    context: 'العرض يشمل 16 كاميرا Hikvision 5MP، جهاز NVR، سويتشات PoE، وهارد 4TB، مع تمديدات السقف المعلق في راك 140 سم.',
    category: 'maadi_cctv',
    urgency: 'critical',
    inputType: 'yes_no',
    answered: true,
    answer: 'نعم، معتمد بالكامل وسيتم تنفيذه بالمقر وتثبيته في راك الـ 140 سم، ونفس المورد (بشمهندس علي) سيتولى مطعم المشويات بالعجوزة لتوحيد الصيانة.',
    answeredAt: '2026-09-24',
    suggestedPrompt: 'تأكيد جدول تركيب كاميرات المعادي مع بشمهندس علي وتنسيق السقف المعلق'
  },
  {
    id: 'inq-maadi-rack-power',
    question: 'هل تم التأكد من وجود مصدر تيار كهربائي مستقل (UPS) داخل راك الـ 27U بمقر المعادي لحماية السويتشات وسيرفر الـ Z والـ NVR؟',
    context: 'انقطاع التيار المفاجئ قد يسبب تلف الهارد ديسك وتوقف التسجيل وتوقف راوتر فايبر الاتصالات.',
    category: 'maadi_cctv',
    urgency: 'high',
    inputType: 'yes_no',
    options: [
      'جهاز UPS 1500VA موجود ومورد ضمن الراك',
      'يحتاج للتوريد والتركيب قبل التشغيل الفعلي للأجهزة',
      'الاعتماد على خط كهرباء مستقر من العداد التجاري أولاً'
    ],
    answered: false,
    suggestedPrompt: 'طلب إضافة جهاز UPS 1500VA لراك مقر المعادي'
  },
  {
    id: 'inq-cisco-3850-vlans',
    question: 'هل نعتمد تقسيم شبكة سويتش سيسكو 3850 PoE لـ 4 شبكات وهمية (VLANs معزولة: كاميرات، موظفين، سيرفرات، ضيوف)؟',
    context: 'السويتش هو Layer 3 يمتلك 48 بورت PoE+، وعزل الكاميرات في VLAN مستقل يحمي الباندويث ويمنع تداخل بث الفيديو مع حركة بيانات العمليات.',
    category: 'maadi_cctv',
    urgency: 'high',
    inputType: 'options',
    options: [
      'نعم، تقسيم 4 VLANs معزولة (CCTV, Staff, Servers, Guest)',
      'تقسيم ثنائي فقط (شبكة داخلية للمقر + شبكة الكاميرات)',
      'ترك التوزيع الافتراضي Flat Network لحين اكتمال تسكين المقر'
    ],
    answered: false,
    suggestedPrompt: 'إعداد ملف تكوين VLANs لسويتش Cisco Catalyst 3850 PoE'
  },
  {
    id: 'inq-maadi-rooms-assignment',
    question: 'في المخطط المعماري لمقر المعادي، هل تعتمد التوزيع التالي للغرف 1 حتى 7؟ (مكتب 1: الإدارة العليا أبو خالد، 2: الحسابات أ/ هاني، 3: القانونية أ/ محمد مصطفى، 4: العمليات والكباتن م/ موفق، القاعة المفتوحة: أسطول الموظفين، 5: قيادة التكنولوجيا م/ سامح، 6: الباك إند م/ عمرو، 7: الجودة والـ QA م/ علي)',
    context: 'المخطط يمتلك أبعاداً دقيقة (25.91م × 20.94م) مع غرفة سيرفرات مخصصة بباب مصفح في الركن السفلي المقابل لمدخل المقر.',
    category: 'maadi_cctv',
    urgency: 'high',
    inputType: 'options',
    options: [
      'نعم، توزيع ممتاز ومنطقي معمارياً وهندسياً للعمليات وإدارة المقر',
      'تعديل موضع مكتب العمليات ليكون بالقرب من القاعة المفتوحة للموظفين',
      'مناقشة تخصيص المكاتب في اجتماع السبت الصباحي مع الإدارة'
    ],
    answered: false,
    suggestedPrompt: 'تأكيد تسكين وتوزيع المكاتب وغرف العمل في مقر المعادي'
  },

  // ==========================================
  // 6. LEGAL AFFAIRS & LAWYER MOHAMED MOSTAFA
  // ==========================================
  {
    id: 'inq-lawyer-qematech-claim',
    question: 'في جلسة السبت 01:00 م مع أ/ محمد مصطفى، هل نطلب توجيه إنذار رسمي لشركة قيمة تك بخصوص تسليم السورس كود أم نسعى لتسوية ودية؟',
    context: 'تطبيقات مشاوير (4B، وكالة، دارو) تحتاج لاعتماد السورس كود الكامل وشهادات الإيداع بالسجل التجاري والشهر العقاري.',
    category: 'legal_official',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'تسوية ودية وتحديد موعد نهائي لاستلام الكود والمفاتيح بمحضر فني رسمي',
      'توجيه إنذار على يد محضر بإلزامهم بتسليم السورس كود وتفعيل الشروط الجزائية',
      'مراجعة العقد أولاً مع أ/ محمد مصطفى وتحديد الثغرات القانونية والمهل'
    ],
    answered: false,
    suggestedPrompt: 'مذكرة مراجعة عقد قيمة تك والبنود الجزائية مع المحامي'
  },
  {
    id: 'inq-ip-registration-status',
    question: 'هل تم استخراج شهادات إيداع الملكية الفكرية لتطبيقات 4B ووكالة ودارو بهيئة تنمية صناعة تكنولوجيا المعلومات (ITIDA)؟',
    context: 'شهادات ITIDA والشهر العقاري ضرورية لحماية المنظومة ومنع التعدي وتسهيل تسجيلها كأصول رسمية للشركة.',
    category: 'legal_official',
    urgency: 'high',
    inputType: 'yes_no',
    options: [
      'جاري استخراجها مع المستشار القانوني أ/ محمد مصطفى',
      'مستخرجة ومودعة بالفعل بالسجل التجاري',
      'مؤجلة لحين استلام النسخ النهائية للسورس كود'
    ],
    answered: false,
    suggestedPrompt: 'إجراءات استخراج شهادات إيداع السورس كود في ITIDA والشهر العقاري'
  },
  {
    id: 'inq-qematech-7week-plan-approval',
    question: 'في الخطة الزمنية لتسليم مشروع 4B من شركة قيمة تك (7 أسابيع - Change Implementation Time Plan)، هل نوافق على مدة الـ 7 أسابيع أم نلزمهم بجدول زمني مضغوط؟',
    context: 'الخطة مقسمة لـ 5 مراحل (M1 التشغيل الأساسي، M2 التجاري والتسعير، M3 النواة المالية، M4 التقارير والحوكمة، M5 UAT والإطلاق). والأسبوع السابع مخصص لـ Production Deployment.',
    category: 'mashweer_apps',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'اعتماد الخطة مع ربط الدفعات المالية الصارمة بنهاية كل مرحلة (Milestone Delivery)',
      'المطالبة بدمج مرحلتي التشغيل الأساسي والتجاري لتقليص المدة إلى 5 أسابيع',
      'مناقشة بنود الخطة في جلسة السبت 01:00 م مع المستشار القانوني أ/ محمد مصطفى أولاً'
    ],
    answered: false,
    suggestedPrompt: 'تحليل الخطة الزمنية لشركة قيمة تك وصياغة شروط الاعتماد والربط المالي'
  },

  // ==========================================
  // 7. SUBSIDIARY COMPANY PROPOSAL (ABU KHALED)
  // ==========================================
  {
    id: 'inq-abukhaled-call-time',
    question: 'في مكالمة السبت 10:00 صباحاً مع أ/ أبو خالد، هل نبدأ بمناقشة مذكرة الأهداف العشرة أولاً أم نركز على ميزانية مقر المعادي وخادم 4B؟',
    context: 'أبو خالد شريك استثماري، والمقترح يهدف لتحويل مصاريف المطورين الخارجيين إلى أصول وبناء فريق داخلي (4 أساسيين + 2 مساعدين).',
    category: 'subsidiary_company',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'البدء بمذكرة الأهداف العشرة والجدوى الاستثمارية للشركة التابعة',
      'البدء باعتماد سيرفر WE وكاميرات المعادي ومطعم العجوزة أولاً',
      'طرح ملف متكامل يربط بين حل مشاكل التطبيقات وتأسيس الكيان التكنولوجي الجديد'
    ],
    answered: false,
    suggestedPrompt: 'تجهيز نقاط الحوار الرئيسية لمكالمة أ/ أبو خالد الساعة 10:00 ص'
  },
  {
    id: 'inq-subsidiary-name',
    question: 'ما هو الاسم التجاري المقترح للشركة التابعة الجديدة لشركة مشاوير للمنصات الرقمية؟',
    context: 'الاسم سيتم استخدامه في السجل التجاري والعلامات التجارية لخدمة تطبيقات مشاوير والمنظومات التكنولوجية والعملاء الخارجيين.',
    category: 'subsidiary_company',
    urgency: 'high',
    inputType: 'text',
    options: [
      'مشاوير للحلول التقنية والذكاء الاصطناعي (Mashweer Tech)',
      'منصة هيباتيا للأنظمة والبرمجيات المتقدمة (Hypatia Systems)',
      'اسم مبتكر يجمع بين النقل والخدمات السحابية واللوجستية'
    ],
    answered: false,
    suggestedPrompt: 'اقتراح باقة أسماء تجارية للشركة التابعة التكنولوجية والرقمية'
  },
  {
    id: 'inq-subsidiary-equity',
    question: 'ما هي النسبة المقترحة للشراكة وتوزيع الحصص في الشركة التابعة بين مجموعة مشاوير وم/ سامح ياسين؟',
    context: 'لتضمينها بوضوح في عقد التأسيس ومذكرة التفاهم المزمع عرضها على المستشار القانوني أ/ محمد مصطفى.',
    category: 'subsidiary_company',
    urgency: 'critical',
    inputType: 'text',
    options: [
      'نسبة متوازنة كشريك مؤسس ومدير تقني وتنفيذي للمنظومة',
      'حصة تشغيلية مع خيارات أسهم مرتبطة بتحقيق مؤشرات الأداء (KPIs)',
      'عرض النسبة في جلسة النقاش بعد استعراض دراسة الجدوى وتوفير النفقات'
    ],
    answered: false,
    suggestedPrompt: 'صياغة بند الحصص والملكية الفكرية في مسودة تأسيس الشركة التابعة'
  },

  // ==========================================
  // 8. KAGGLE & UCP-LLM COMPETITION ($100K)
  // ==========================================
  {
    id: 'inq-kgl-paper-title',
    question: 'هل نعتمد عنوان الورقة البحثية لمسار Paper Track ($100,000) باسم "Cognitive Alignment in Autonomous Software Engineering Agents"؟',
    context: 'الورقة ستركز على دمج بروتوكول UCP-LLM مع معمارية MCP (Model Context Protocol) لمنع تشتت وهلوسة الوكلاء أثناء تصفح مستودعات الأكواد الكبيرة.',
    category: 'kaggle_ucp',
    urgency: 'high',
    inputType: 'yes_no',
    answered: true,
    answer: 'نعم، العنوان معتمد والتركيز سيكون على معالجة الذاكرة المعرفية وضوابط النزاهة الهندسية للوكيل البرمجي.',
    answeredAt: '2026-09-25',
    suggestedPrompt: 'صياغة ملخص الـ Abstract وهيكل الورقة البحثية لمسار كاجل'
  },
  {
    id: 'inq-kgl-model-version',
    question: 'في مسابقة كاجل لوكيل Gemma 4 الذاتي ($100k)، هل سنعتمد نموذج Gemma 4 (2B/7B/9B) وتدريبه عبر Unsloth/LoRA محلياً أم نستخدم إطار تدريب مخصص؟',
    context: 'المسابقة تشترط عمل الوكيل أوفلاين على عتاد المستهلكين (Consumer Hardware). نحتاج تحديد حجم النموذج المستهدف ومكتبة الـ Fine-Tuning للبدء في تجهيز السكربتات.',
    category: 'kaggle_ucp',
    urgency: 'critical',
    inputType: 'options',
    options: [
      'Gemma 4 (2B/9B) مع Unsloth / LoRA لتقليل استهلاك VRAM والعمل أوفلاين',
      'تدريب كامل بـ PyTorch و HuggingFace مع التعلم التعزيزي RL',
      'بناء طبقة وسيطة تعتمد حصرياً على UCP-LLM مع مكتبة ucp_llm.py'
    ],
    answered: false,
    suggestedPrompt: 'تجهيز سكربت تدريب Gemma 4 أوفلاين باستخدام بروتوكول UCP-LLM'
  },
  {
    id: 'inq-kgl-eve-generator-integration',
    question: 'هل ندرج مولد البروتوكول التفاعلي (Eve Edition v1.1.0) كأداة CLI مستقلة ومفتوحة المصدر ملحقة بالحل المقدم لكاجل؟',
    context: 'تضمين Eve Generator سيعطي لجنة تحكيم كاجل برهاناً عملياً على إمكانية ضبط سياق المهندس بملف ucp.json دون كتابة كود معقد.',
    category: 'kaggle_ucp',
    urgency: 'high',
    inputType: 'yes_no',
    options: [
      'نعم، إدراجها كأداة CLI بايثون تفاعلية',
      'إبقاؤها كأداة ويب HTML خفيفة مرافقة للمستودع',
      'دمجها مباشرة في قلب نواة UCP Agent'
    ],
    answered: false,
    suggestedPrompt: 'تحويل أداة Eve HTML إلى سكربت بايثون تفاعلي CLI لمسابقة كاجل'
  },

  // ==========================================
  // 9. 4B SYSTEM & WE INFRASTRUCTURE OPERATIONS
  // ==========================================
  {
    id: 'inq-4b-dr-failover-test',
    question: 'متى تم آخر اختبار محاكاة لانقطاع خط الفايبر الرئيسي لبرنامج 4B والتحويل التلقائي للخط الاحتياطي DR؟',
    context: 'خط 10.10.40.10 يحتاج للتحويل التلقائي إلى 10.10.40.11 خلال أقل من ثانيتين لمنع توقف طلبات رحلات تطبيق 4B.',
    category: 'telecom_servers',
    urgency: 'high',
    inputType: 'options',
    options: [
      'تم الاختبار مؤخراً ويعمل الـ Failover بنجاح',
      'يحتاج لجدولة اختبار محاكاة مع مسؤولي شبكة WE يوم السبت',
      'التحويل يتم يدوياً حالياً ويحتاج لأتمتة Failover Routing'
    ],
    answered: false,
    suggestedPrompt: 'بروتوكول اختبار محاكاة انقطاع خط فايبر برنامج 4B مع المصرية للاتصالات'
  },
  {
    id: 'inq-4b-server-latency',
    question: 'هل معدل تأخير الاستجابة (Latency) لخادم 4B ومزامنة التطبيق يقل عن 5ms في مقر المعادي؟',
    context: 'ضروري لضمان سرعة إرسال طلبات المشاوير لكباتن 4B واستقبال إحداثيات GPS باللحظة الصفرية.',
    category: 'telecom_servers',
    urgency: 'medium',
    inputType: 'yes_no',
    options: [
      'نعم، اللاتنسي ممتاز وأقل من 3ms عبر خط الفايبر المباشر',
      'يصل لـ 10ms أحياناً ويحتاج لتحسين إعدادات الـ MTU والـ Switch Buffers',
      'مطلوب فحص دوري مع مهندسي الدعم الفني لشركة WE'
    ],
    answered: false,
    suggestedPrompt: 'فحص معدل تأخير بث بيانات السوق اللحظية وتجهيز أدوات القياس'
  },

  // ==========================================
  // 10. SUBSCRIPTIONS & RENEWALS WITH HANI
  // ==========================================
  {
    id: 'inq-domain-renewals-calendar',
    question: 'في اجتماع السبت 03:00 م مع أ/ هاني، هل نعتمد تجديد دومينات mashweer.net و mashawer.com.eg لمدة سنتين مقدماً؟',
    context: 'تجديد الدومينات لعدة سنوات يحميها من انتهاء الصلاحية العرضي ويعزز موثوقية الـ DNS وسجلات البريد.',
    category: 'subscriptions_budget',
    urgency: 'high',
    inputType: 'yes_no',
    options: [
      'نعم، اعتماد التجديد لـ سنتين مقدماً عبر الحساب التجاري',
      'تجديد سنوي مع تفعيل خاصية الـ Auto-Renewal',
      'مراجعة قائمة الدومينات كاملة أولاً'
    ],
    answered: false,
    suggestedPrompt: 'إعداد جدول التجديدات السنوية للدومينات والسيرفرات مع أ/ هاني'
  },
  {
    id: 'inq-credit-card-billing-safety',
    question: 'هل تم تخصيص بطاقة دفع تجارية محددة السقف لسداد اشتراكات السيرفرات والدومينات بدلاً من البطاقات الشخصية؟',
    context: 'لتنظيم السجلات المحاسبية ومنع توقف أي خادم بسبب انتهاء بطاقة أو سقف سحب.',
    category: 'subscriptions_budget',
    urgency: 'medium',
    inputType: 'yes_no',
    options: [
      'تم تخصيص فيزا تجارية برصيد مخصص للاشتراكات التقنية',
      'جاري التنسيق مع الإدارة المالية أ/ هاني لإصدار بطاقة ائتمانية للمقر',
      'السداد يتم فواتير بنكية مباشرة'
    ],
    answered: false,
    suggestedPrompt: 'تنظيم آلية سداد الاشتراكات الشهرية وتأمين خوادم الشركة'
  }
];
