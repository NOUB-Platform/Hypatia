import { QuotationItem } from '../types';

export const INITIAL_QUOTATIONS: QuotationItem[] = [
  // 1. QTS - DELL PowerEdge R640 Platinum & HP Z440 Workstations
  {
    id: 'quote-qts-server-z440-invoice',
    title: 'فاتورة السيرفر البلاتينيوم DELL R640 ومحطتي عمل HP Z440 (فاتورة إلكترونية معتمدة ETA)',
    type: 'شراء عتاد وسيرفرات فعلية (On-Premise Infrastructure & Workstations)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    taxInvoiceEtaId: '7ZYZDKGHRVSDN70R4SP81F3M10',
    internalId: '1169',
    taxRegistrationNumber: '662709268',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/QTS_DELL_R640_Z440_1169.pdf',
    provider: {
      name: 'سيرفر للخدمات التكنولوجيه كيو تى اس (QTS Servers)',
      accountManager: 'إدارة المبيعات والتوريدات - شركة كيو تي اس',
      role: 'مورد معتمد للخوادم ومحطات العمل والمعدات السيرفرية',
      representative: '19 عبد السلام عارف شقة 63 الدور السادس - قسم عابدين، القاهرة (س.ت: 662709268#)',
      accountStatus: 'فاتورة إلكترونية ضريبية صحيحة عبر بوابة الهيئة المصرية للضرائب (ETA)'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مدينة المعراج بجوار كارفور زهراء المعادي، قسم المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology & Systems Lead)',
        'أستاذ هاني (الشؤون الإدارية والمالية)'
      ],
      project: 'تجهيز غرفة الـ IT الرئيسية وسيرفر البنية التحتية المحلي ومحطات التطوير'
    },
    status: 'فاتورة ضريبية رسمية ETA • مسددة بالكامل',
    submissionDate: '2026-09-26',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 84470.00,
    vatAmount: 11825.80,
    totalAmount: 96295.80,
    totalAmountFormatted: '96,295.80 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (11,825.80 ج.م)',
      billingCycle: 'شراء وتوريد فوري معتمد',
      compliance: 'فاتورة إلكترونية رسمية مسجلة برقم إلكتروني: 7ZYZDKGHRVSDN70R4SP81F3M10 (رقم داخلي: 1169)'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'سيرفر ركوة إنتاجي ديل بلاتينيوم (DELL PowerEdge R640 8-Bay 2.5")',
        specifications: 'معالجان Intel Xeon Platinum 8160 (إجمالي 48 Cores / 96 Threads)، رامات 64GB DDR4 ECC Reg، وحدتي تخزين سريعة 2x 256GB SSD، وثلاث وحدات تخزين سيرفرية فائقة الاعتمادية 3x 1.2TB SAS 10K Enterprise REALS',
        quantity: 1,
        unit: 'سيرفر ركوة (Rack Server)',
        unitPrice: 54000.00,
        totalPrice: 54000.00,
        installedIn: 'داخل راك الـ 27U بغرفة الـ IT بمقر المعادي'
      },
      {
        itemNumber: 2,
        description: 'محطتي عمل احترافية فئة إنتاجية HP Workstation Z440',
        specifications: 'معالج مهني Intel Xeon E5-2697 v4 (18 Cores / 36 Threads، كاش 45MB)، رامات 16GB DDR4، تخزين مزدوج فائقة السرعة SSD 256GB + مساحة 500GB HDD، وكارت شاشة VGA 1GB',
        quantity: 2,
        unit: 'محطة عمل (Workstation)',
        unitPrice: 15235.00,
        totalPrice: 30470.00,
        coverage: 'غرفة الـ IT الخاصة بم/ سامح ياسين للتطوير، التدريب المحلي، وبناء النماذج'
      }
    ],
    technicalCoordination: {
      rackIntegration: 'تركيب سيرفر DELL R640 في راك الـ 27U وتغذيته عبر الـ PDU وباتش بانل الـ 48 بورت',
      ramUpgradePlan: 'السيرفر مزود بـ 64GB DDR4 وسيتم ترقيته خلال فترة قريبة بـ 64GB إضافية ليصل إلى 128GB DDR4',
      workstationRole: 'جهازي HP Z440 مخصصين كبيئة عمل قوية (Local Dev & Testing Nodes) في غرفة الـ IT لم/ سامح',
      taxInvoiceHash: 'الرقم الإلكتروني: 7ZYZDKGHRVSDN70R4SP81F3M10 • المسجل الضريبي: 662709268 • إجمالي المبيعات 84,470 ج.م + ضريبة 11,825.80 ج.م'
    },
    auditNotes: [
      'فاتورة إلكترونية ضريبية معتمدة من الهيئة المصرية للضرائب (ETA) صادرة بتاريخ 26/09/2026 الساعة 05:17 م.',
      'السيرفر Dell R640 Platinum 8160 هو أول سيرفر محلي حقيقي يمتلكه المشروع بمواصفات ممتازة لتحمل الأعباء والـ Virtualization.',
      'إجمالي المبلغ المسدد شاملاً ضريبة القيمة المضافة: 96,295.80 جنيه مصري.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/.'
    ]
  },

  // 2. TECHNO STORES - DELL PCs, HP Monitors & Keyboards
  {
    id: 'quote-techno-stores-pcs-monitors',
    title: 'فاتورة أجهزة كمبيوتر DELL Core i5 وشاشات HP 22" وكيبوردات (تكنو ستورز الدقي)',
    type: 'أجهزة مكتبية وشاشات موظفين (Workstations, Monitors & Peripherals)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    taxInvoiceEtaId: '2YMG3N8EF4WVMEB3V67G7PTK10',
    internalId: '1660751017094',
    taxRegistrationNumber: '200256653',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/TechnoStores_DELL_PCs_Monitors_166075.pdf',
    provider: {
      name: 'وائل سمير وهبه جرجس - تكنو ستورز (Techno Stores)',
      accountManager: 'إدارة المبيعات - تكنو ستورز',
      role: 'مورد معتمد لأجهزة وحواسيب وشاشات المقرات',
      representative: '3 ش سليمان جوهر، قسم الدقي، الجيزة (س.ت: 200256653#)',
      accountStatus: 'فاتورة إلكترونية ضريبية معتمدة عبر بوابة الهيئة المصرية للضرائب (ETA) - الحالة: صحيح'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مدينة المعراج بجوار كارفور زهراء المعادي، قسم البساتين، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology & Systems Lead)',
        'أحمد عبيد (مهندس IT ومساعد فني)'
      ],
      project: 'تجهيز مكاتب العمليات والإدارة بمقر المعادي'
    },
    status: 'فاتورة ضريبية رسمية ETA • مسددة بالكامل',
    submissionDate: '2026-06-09',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 35001.00,
    vatAmount: 4900.14,
    totalAmount: 39901.14,
    totalAmountFormatted: '39,901.14 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (4,900.14 ج.م)',
      billingCycle: 'شراء وتوريد فوري مسدد',
      compliance: 'فاتورة إلكترونية رسمية مسجلة برقم إلكتروني: 2YMG3N8EF4WVMEB3V67G7PTK10 (رقم داخلي: 1660751017094)'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'أجهزة كمبيوتر ديل الجيل العاشر (DELL Core i5 - 10th Gen)',
        specifications: 'معالج Intel Core i5 الجيل العاشر، رامات 8GB DDR4، تخزين فائق السرعة 128GB SSD للنظام + 500GB HDD للبيانات، كود صنف: EG-200256653-1002',
        quantity: 3,
        unit: 'جهاز كمبيوتر كيسة',
        unitPrice: 9700.00,
        totalPrice: 29100.00,
        coverage: 'مكاتب الإدارة ومتابعة العمليات بمقر المعادي'
      },
      {
        itemNumber: 2,
        description: 'شاشات عرض احترافية إتش بي 22 بوصة مع كاميرا (HP 22 WITH CAM)',
        specifications: 'شاشة قياس 22 بوصة دقة Full HD مزودة بكاميرا ويب مدمجة وميكروفون مناسبة للاجتماعات المرئية ومتابعة الشاشات',
        quantity: 3,
        unit: 'شاشة كمبيوتر',
        unitPrice: 1722.00,
        totalPrice: 5166.00,
        coverage: 'شاشات المكاتب الرئيسية للموظفين والإدارة'
      },
      {
        itemNumber: 3,
        description: 'كابلات ومحولات توصيل يو إس بي (P.TEC P13 USB N)',
        specifications: 'محولات وكابلات توصيل بيانات وشبكة USB فئة P13 لربط الملحقات والشاشات',
        quantity: 3,
        unit: 'قطعة',
        unitPrice: 75.00,
        totalPrice: 225.00,
        coverage: 'ملحقات الربط للأجهزة'
      },
      {
        itemNumber: 4,
        description: 'لوحات مفاتيح أصلية ديل (DELL ORG KEYBOARD)',
        specifications: 'كيبورد ديل أصلي متين مخصص للعمل المكتبي الشاق والكتابة السريعة',
        quantity: 3,
        unit: 'لوحة مفاتيح',
        unitPrice: 170.00,
        totalPrice: 510.00,
        coverage: 'أطقم إدخال أجهزة الكمبيوتر المكتبية'
      }
    ],
    technicalCoordination: {
      deploymentPlan: 'توزيع الأجهزة الثلاثة على مكاتب التشغيل بالمقر وربطها بالشبكة السلكية عبر الباتش بانل 48 بورت',
      osAndConfig: 'تثبيت أنظمة ويندوز وبرامج الاتصال المشفر وربط الإيميلات الرسمية على زوهو'
    },
    auditNotes: [
      'فاتورة إلكترونية ضريبية معتمدة من مصلحة الضرائب المصرية صادرة بتاريخ 09/06/2026 الساعة 03:59 م.',
      'توثق شراء 3 أجهزة كمبيوتر DELL Core i5 حديثة مع 3 شاشات HP 22 بوصة مزودة بكاميرات للاجتماعات.',
      'إجمالي المبلغ المسدد شاملاً الضريبة: 39,901.14 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/.'
    ]
  },

  // 3. RED LINE - Perla 27U Rack & Network Tools
  {
    id: 'quote-redline-rack27u-tools',
    title: 'فاتورة راك البيرلا 27U وعدة وأجهزة اختبار الشبكة (رد لاين - البستان)',
    type: 'شراء كبائن شبكة وأدوات التركيب والفحص (Network Cabinet & Toolkit)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    taxInvoiceEtaId: '6T3HM2FA86TEDZEBQHYPFWMK10',
    internalId: '15947',
    taxRegistrationNumber: '266893546',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/Redline_Perla_Rack_27U_Tools_15947.pdf',
    provider: {
      name: 'عمر محمد العدوي محمد - رد لاين (Red Line Computer Supplies)',
      accountManager: 'إدارة المبيعات - مركز البستان التجاري',
      role: 'مورد معتمد لكبائن الشبكات ومستلزمات التركيب والكوابل والعدد المتخصصة',
      representative: '18 ش يوسف الجندي، مركز البستان - الدور الأول، قسم عابدين، القاهرة (س.ت: 266893546#)',
      accountStatus: 'فاتورة إلكترونية ضريبية معتمدة عبر بوابة مصلحة الضرائب المصرية (ETA) - الحالة: صحيح'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مدينة المعراج بجوار كارفور زهراء المعادي، قسم البساتين، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology & Systems Lead)',
        'أستاذ هاني (الشؤون الإدارية والمالية)'
      ],
      project: 'تأسيس غرفة السيرفرات الرئيسية (Server Room) وعدة الفحص وتأريج كوابل المقر'
    },
    status: 'فاتورة ضريبية رسمية ETA • مسددة بالكامل',
    submissionDate: '2026-03-29',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 16271.93,
    vatAmount: 2278.07,
    totalAmount: 18550.00,
    totalAmountFormatted: '18,550.00 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (2,278.07 ج.م)',
      billingCycle: 'شراء وتوريد فوري مسدد',
      compliance: 'فاتورة إلكترونية رسمية مسجلة برقم إلكتروني: 6T3HM2FA86TEDZEBQHYPFWMK10 (رقم داخلي: 15947)'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'كبينة سيرفرات وركوة احترافية بيرلا (Perla Rack 27U 600*1000)',
        specifications: 'راك خوادم أرضي قياس 27U بارتفاع حوالي 140 سم، عرض 600 مم، وعمق 1000 مم (1 متر كامل) مصمم خصيصاً لاستيعاب السيرفرات العميقة مثل DELL PowerEdge R640، مزود بأبواب مهواة وأقفال أمان',
        quantity: 1,
        unit: 'كبينة راك أرضي 27U',
        unitPrice: 14473.68,
        totalPrice: 14473.68,
        installedIn: 'غرفة السيرفرات بمقر المعادي'
      },
      {
        itemNumber: 2,
        description: 'جهاز تتبع واختبار كابلات الشبكة الذكي (I-Pook PK65H Multi-purpose Wire Tracker)',
        specifications: 'جهاز احترافي لفحص التوصيلات وتتبع مسارات أسلاك الشبكة في الحوائط والأسقف وتحديد البورت المناظر في الباتش بانل وفحص انقطاع أو تلامس الأسلاك',
        quantity: 1,
        unit: 'جهاز فحص واختبار (Wire Tracker)',
        unitPrice: 921.05,
        totalPrice: 921.05,
        coverage: 'عدة مهندس الـ IT لمتابعة تمديدات وتوصيلات شبكة المقر'
      },
      {
        itemNumber: 3,
        description: 'كونكتورات شبكة فائقة السرعة RJ45 CAT6 OPEN ROOT',
        specifications: 'رؤوس توصيل شبكة Cat6 فئة Open Root تتيح مرور الأزواج بالكامل للتأكد من الترتيب القياسي T568B قبل الكبس لتفادي أخطاء السرعة',
        quantity: 1,
        unit: 'علبة كونكتورات RJ45 Cat6',
        unitPrice: 307.02,
        totalPrice: 307.02,
        coverage: 'نقاط شبكة أجهزة الموظفين والكاميرات والسيرفرات'
      },
      {
        itemNumber: 4,
        description: 'أراجة شبكة مهنية كبس وتقشير 2 في 1 (ROOT CRIMPING NETWORK TOOLS OPEN 2*1)',
        specifications: 'أداة كبس وتقشير وقص احترافية تدعم كونكتورات الـ Pass-Through Open Root لإنهاء الكوابل بدقة 100%',
        quantity: 1,
        unit: 'أراجة شبكة 2*1',
        unitPrice: 570.18,
        totalPrice: 570.18,
        coverage: 'أعمال التركيب وتثبيت نقاط الشبكة في غرف ومكاتب المقر'
      }
    ],
    technicalCoordination: {
      rackIntegration: 'الراك الـ 27U بعمق 1000 مم هو الحاضن الأساسي لسيرفر DELL R640، سويتش سيسكو 3850 PoE، باتش بانل 48 بورت، وجهاز NVR الكاميرات.',
      toolsUtility: 'جهاز I-Pook PK65H والأراجة هما الأدوات الفعلية المعتمدة لتدقيق وتتبع شبكة المقر بأيدي م/ سامح وحاتم فني الشبكات.'
    },
    auditNotes: [
      'فاتورة إلكترونية ضريبية معتمدة من مصلحة الضرائب المصرية صادرة بتاريخ 29/03/2026 الساعة 11:43 ص.',
      'تثبت شراء راك Perla 27U واحد فقط بعمق 1000 مم، وهو الكافي والمطابق هندسياً لغرفة السيرفرات بالمعادي.',
      'إجمالي المبلغ المسدد شاملاً الضريبة: 18,550.00 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/.'
    ]
  },

  // 4. QTS - Cisco 3850 48-Port PoE Switch (TODAY 28-09-2026)
  {
    id: 'quote-qts-cisco-3850-switch',
    title: 'فاتورة سويتش سيسكو Cisco Catalyst 3850 48-Port PoE (فاتورة إلكترونية معتمدة ETA)',
    type: 'شبكات وسويتشات إدارة الطاقة (Enterprise Managed PoE Switch)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    taxInvoiceEtaId: 'K1G9T4WV39B521M0EYV8EM3M10',
    internalId: '1172',
    taxRegistrationNumber: '662709268',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/QTS_Cisco_3850_PoE_Switch_1172.pdf',
    provider: {
      name: 'سيرفر للخدمات التكنولوجيه كيو تى اس (QTS Servers)',
      accountManager: 'إدارة مبيعات الشبكات والسيرفرات - كيو تي اس',
      role: 'مورد معتمد لمعدات سيسكو وسيرفرات الداتا سنتر',
      representative: '19 عبد السلام عارف شقة 63 الدور السادس عابدين، القاهرة (س.ت: 662709268#)',
      accountStatus: 'فاتورة إلكترونية ضريبية معتمدة عبر بوابة الهيئة المصرية للضرائب (ETA) - الحالة: صحيح'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مدينة المعراج بجوار كارفور زهراء المعادي، قسم البساتين، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology & Systems Lead)',
        'أستاذ هاني (الشؤون الإدارية والمالية)'
      ],
      project: 'العمود الفقري لشبكة مقر المعادي وتغذية نقاط المكاتب والكاميرات عبر PoE'
    },
    status: 'فاتورة ضريبية رسمية ETA • مسددة بالكامل (اليوم 28 سبتمبر)',
    submissionDate: '2026-09-28',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 10500.00,
    vatAmount: 1470.00,
    totalAmount: 11970.00,
    totalAmountFormatted: '11,970.00 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (1,470.00 ج.م)',
      billingCycle: 'شراء وتوريد فوري مسدد بالكامل',
      compliance: 'فاتورة إلكترونية رسمية مسجلة برقم إلكتروني: K1G9T4WV39B521M0EYV8EM3M10 (رقم داخلي: 1172)'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'سويتش سيسكو فئة مؤسسية Cisco Catalyst 3850 48-Port PoE',
        specifications: 'سويتش مدار Layer 3 يدعم 48 منفذ Gigabit إيثرنت PoE+ لتغذية الكاميرات ونقاط الوصول، موديول أبلينك 4x 1G، مزود طاقة مزدوج 715W Dual Power Supply، مع كابلات الباور الأصلية 715X2 + CABLE POWERX2 (كود صنف: EG-662709268-CISCO-555)',
        quantity: 1,
        unit: 'سويتش شبكات راك (Rack Switch)',
        unitPrice: 10500.00,
        totalPrice: 10500.00,
        installedIn: 'داخل راك بيرلا 27U بغرفة الـ IT بمقر المعادي'
      }
    ],
    technicalCoordination: {
      rackPosition: 'يتم تركيبه أسفل الباتش بانل 48 بورت مباشرة بالراك 27U للربط عبر باتش كوردات قصيرة 0.5م',
      powerSetup: 'توصيل الباور سبلاي المزدوج 715W بمصدرين مختلفين لتفادي انقطاع التيار',
      vlanConfig: 'تكوين VLANs مستقلة: شبكة الإدارة، شبكة الكاميرات، شبكة الضيوف، وشبكة السيرفرات'
    },
    auditNotes: [
      'فاتورة إلكترونية ضريبية معتمدة من مصلحة الضرائب المصرية صادرة بتاريخ اليوم 28/09/2026 الساعة 07:40 م.',
      'السويتش Cisco 3850 يمثل النواة الشبكية للمقر بالكامل بقدرة PoE توفر طاقة لكافة الكاميرات ونقاط الـ Wi-Fi.',
      'إجمالي المبلغ المسدد شاملاً الضريبة: 11,970.00 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/.'
    ]
  },

  // 5. MENSHAWY - CASUAL RECEIPT (PENDING TAX INVOICE TOMORROW)
  {
    id: 'quote-menshawy-bostan-casual-receipt',
    title: 'إيصال شراء هاردات سيرفر HP وكابلات المقر (فاتورة عارضة - في انتظار الضريبية غداً)',
    type: 'قطع غيار هاردات وكابلات شاشات وسيرفرات (Server Disks & Cables)',
    isTaxInvoice: false,
    isPendingTaxInvoice: true,
    receiptNumber: 'Sales Order #001096',
    internalId: '001096',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Pending_Tax_Invoices/Menshawy_Bostan_Casual_Receipt_001096.pdf',
    provider: {
      name: 'المنشاوي للكمبيوتر والإلكترونيات (El-Menshawy)',
      accountManager: 'م/ المنشاوي (M. El-Menshawy)',
      role: 'مورد ملحقات سيرفرات وقطع غيار هاردات وكوابل',
      representative: 'البستان مول، الدور الثالث - محل X5، التحرير، القاهرة (هاتف: 010023299... / 01069424213)',
      accountStatus: 'إيصال مبيعات يدوي مؤقت #001096 - بانتظار استلام الفاتورة الإلكترونية الضريبية غداً'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مدينة المعراج، المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology & Systems Lead)'
      ],
      project: 'ترقية وسائط تخزين السيرفر وتمديد كابلات الشاشات والباور للمقر'
    },
    status: '⚠️ فاتورة عارضة مؤقتة • مسددة نقداً (في انتظار الفاتورة الضريبية غداً)',
    submissionDate: '2026-09-28',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 8510.00,
    vatAmount: 0.00,
    totalAmount: 8510.00,
    totalAmountFormatted: '8,510.00 ج.م',
    financialTerms: {
      vatRate: 'قيد انتظار إصدار الفاتورة الضريبية الرسمية غداً (المبلغ المسدد حالياً نقدي 8,510 ج.م)',
      billingCycle: 'سداد نقدي فوري بموجب أمر بيع Sales Order #001096',
      compliance: 'متابعة مع البائع لاستلام الفاتورة الإلكترونية الضريبية المعتمدة (ETA) غداً وفق تأكيد م/ سامح'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'أقراص صلبة سيرفر فئة مؤسسية (HP SAS 1.2TB Enterprise Disks)',
        specifications: 'هاردات سيرفر HP سعة 1.2 تيرابايت سرعة 10K دورة/دقيقة SAS لتوسعة مصفوفة السيرفرات',
        quantity: 2,
        unit: 'هارد ديسك سيرفر',
        unitPrice: 1150.00,
        totalPrice: 2300.00,
        installedIn: 'سيرفرات غرفة الـ IT بالمعادي'
      },
      {
        itemNumber: 2,
        description: 'أقراص صلبة سعة عالية (HP 2TB High-Capacity Hard Drives)',
        specifications: 'هاردات سعة 2 تيرابايت مخصصة للنسخ الاحتياطي وتخزين ملفات وسائط المشاريع',
        quantity: 2,
        unit: 'هارد ديسك',
        unitPrice: 2000.00,
        totalPrice: 4000.00,
        installedIn: 'أجهزة التخزين والباك أب بالمقر'
      },
      {
        itemNumber: 3,
        description: 'كابلات باركود وباور مخصصة للسيرفر (Server Power & Barcode Cables)',
        specifications: 'كابلات توصيل متوافقة ومحمية لتغذية السيرفر وأجهزة قارئ الباركود',
        quantity: 2,
        unit: 'كابل',
        unitPrice: 200.00,
        totalPrice: 400.00,
        coverage: 'غرفة الـ IT ومحطات العمل'
      },
      {
        itemNumber: 4,
        description: 'كابلات شاشات عالية الدقة HDMI (HD Cables)',
        specifications: 'كابلات توصيل شاشات HDMI عالية النقاء لنقل الصورة للشاشات الكبرى',
        quantity: 2,
        unit: 'كابل شاشة HD',
        unitPrice: 75.00,
        totalPrice: 150.00,
        coverage: 'شاشات صالة العمليات'
      },
      {
        itemNumber: 5,
        description: 'كابلات شاشات تناظرية قياسية (VGA Cables)',
        specifications: 'كابلات شاشات VGA أصلية لتوصيل أجهزة الكمبيوتر بالشاشات الثانوية',
        quantity: 2,
        unit: 'كابل شاشة VGA',
        unitPrice: 60.00,
        totalPrice: 120.00,
        coverage: 'محطات المكاتب'
      },
      {
        itemNumber: 6,
        description: 'كابلات باور ثقيلة معتمدة (Heavy Duty Power Cables)',
        specifications: 'كابلات كهرباء ثقيلة بمواصفات أمان عالية للأجهزة والوحدات الكهربائية',
        quantity: 4,
        unit: 'كابل باور',
        unitPrice: 60.00,
        totalPrice: 240.00,
        coverage: 'محطات المكاتب والسيرفرات'
      }
    ],
    technicalCoordination: {
      inventoryAction: 'فحص واختبار الهاردات ومطابقتها مع سيرفرات المقر فور التثبيت',
      pendingTaxInvoiceTracker: 'تم وضع علامة تنبيه ومتابعة واضحة لاستبدال هذا الإيصال بالفاتورة الضريبية الإلكترونية فور استلامها غداً'
    },
    auditNotes: [
      'فاتورة عارضة مشتراة اليوم بتاريخ 28/09/2026 بقيمة 8,510 جنيه مصري بموجب إيصال بيع ورقي رقم 001096.',
      'أكد م/ سامح أنه سيستلم الفاتورة الضريبية الرسمية غداً وسيتم رفعها وإرفاقها على جوجل درايف.',
      'تم تسجيل كافة الأصناف بدقة مع أسعار الوحدات لضمان المطابقة الكاملة مع الفاتورة الضريبية القادمة.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Pending_Tax_Invoices/.'
    ]
  },

  // 6. VODAFONE - 4G Home Router, SIM & Internet Bundle
  {
    id: 'quote-vodafone-maadi-4g-router',
    title: 'إيصال راوتر فودافون 4G هوائي وشريحة وباقة إنترنت المقر (فرع صقر قريش المعادي)',
    type: 'اتصالات وإنترنت هوائي احتياطي وسريع للمقر (4G Wireless Router & Telecom)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    receiptNumber: 'Sales Receipt #748994',
    internalId: '748994',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Telecom_Vodafone/Vodafone_4G_Router_Maadi_748994.pdf',
    provider: {
      name: 'فودافون مصر - شركة مصر فون للتجارة (Misrfone Trading - Vodafone Agent)',
      accountManager: 'إدارة مبيعات فرع صقر قريش المعادي',
      role: 'وكيل تجاري رسمي لشركة فودافون مصر لخدمات الاتصالات والراوترات',
      representative: 'Maadi Sakr Korish Express Store - Cairo',
      accountStatus: 'إيصال مبيعات ضريبي رسمي مسجل برقم 748994'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (الهاتف: 01026713562)',
      site: 'مقر المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology)'
      ],
      project: 'خط إنترنت فوري واحتياطي لغرفة العمليات بالمقر (Failover Connection)'
    },
    status: 'إيصال مبيعات ضريبي رسمي • مسدد بالكامل',
    submissionDate: '2026-09-28',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 2954.31,
    vatAmount: 372.15,
    totalAmount: 3326.46,
    totalAmountFormatted: '3,326.46 ج.م',
    financialTerms: {
      vatRate: 'شامل ضريبة القيمة المضافة 14% (307.02 ج.م) + ضريبة الخدمات + رسم تنمية الموارد (61.56 ج.م) + دمغة العقد (3.57 ج.م)',
      billingCycle: 'سداد فوري لشراء الراوتر والاشتراك الأولي للباقة',
      compliance: 'إيصال مبيعات رسمي ضريبي عبر نظام فودافون مصر بنقطة بيع معتمدة'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'راوتر فودافون 4G هوائي فائق السرعة (Home Router Prepaid 4G Bundle)',
        specifications: 'جهاز راوتر منزلي موديل H153-381 برقم تسلسلي S/N: 867970086497209 يدعم سرعات 4G LTE وشبكة Wi-Fi مزدوجة لربط كافة أجهزة المقر لاسلكياً',
        quantity: 1,
        unit: 'جهاز راوتر 4G',
        unitPrice: 2500.00,
        totalPrice: 2500.00,
        installedIn: 'غرفة الإدارة والعمليات بمقر المعادي'
      },
      {
        itemNumber: 2,
        description: 'شريحة بيانات فودافون مسبقة الدفع (SIM 32K Prepaid Cash)',
        specifications: 'شريحة مخصصة لنقل البيانات عالية السرعة برقم تسلسلي S/N: 8920022032224885192 مع رسوم تنمية ودمغات عقد',
        quantity: 1,
        unit: 'شريحة داتا',
        unitPrice: 83.60,
        totalPrice: 83.60,
        installedIn: 'داخل راوتر فودافون H153-381'
      },
      {
        itemNumber: 3,
        description: 'باقة إنترنت هوائي منزلي سعة كبيرة (AT Home Generic 520LE)',
        specifications: 'باقة إنترنت هوائي مخصصة للعمل المكتبي المستمر لتصفح واختبار التطبيقات وسحب النسخ الاحتياطية',
        quantity: 1,
        unit: 'باقة إنترنت شهرية',
        unitPrice: 742.86,
        totalPrice: 742.86,
        coverage: 'شبكة المقر اللاسلكية'
      }
    ],
    technicalCoordination: {
      failoverUtility: 'يعمل الراوتر كخط إنترنت احتياطي فوري (Failover Backup WAN) بجانب خط الفايبر الأرضي لضمان عدم انقطاع الاتصال بالسيرفرات'
    },
    auditNotes: [
      'إيصال مبيعات ضريبي رسمي من وكيل فودافون مصر بصقر قريش المعادي بتاريخ اليوم 28/09/2026.',
      'يوفر حلاً فورياً وعالي السرعة للإنترنت داخل المقر قبل اكتمال تمديدات السنترال الأرضي.',
      'إجمالي المبلغ المسدد شامل الضريبة ورسوم التنمية والدمغات: 3,326.46 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Telecom_Vodafone/.'
    ]
  },

  // 7. RANEEN - Office Furniture, Chairs & Ladder
  {
    id: 'quote-raneen-furniture-hq',
    title: 'فاتورة أثاث وتجهيزات المقر وسلالم الصيانة (طيبة رنين للتجارة - الفسطاط)',
    type: 'أثاث مكتبي ومستلزمات صيانة المقر (Office Furniture & Maintenance)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    taxInvoiceEtaId: '34GAMWHCFDFNTGX5QWDGJ8PK10',
    internalId: '40-0217871',
    taxRegistrationNumber: '726086258',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/Raneen_Furniture_Ladder_Invoice_40-0217871.pdf',
    provider: {
      name: 'شركة طيبة رنين للتجارة والصناعة (فرع الفسطاط 40)',
      accountManager: 'إدارة المبيعات - فرع الفسطاط',
      role: 'مورد معتمد للأثاث والمفروشات والمستلزمات والأجهزة',
      representative: 'ش ترعة الحلو - الهرم - الجيزة / فرع الفسطاط القاهرة (س.ت: 3503 | س.ض: 726086258#)',
      accountStatus: 'فاتورة ضريبية رسمية أصلية + فاتورة إلكترونية معتمدة عبر بوابة الهيئة المصرية للضرائب (ETA)'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (س.ت: 757315518#)',
      site: 'مقر المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology)'
      ],
      project: 'تجهيزات الجلوس وصيانة الأسقف وتمديدات الكابلات بمقر المعادي'
    },
    status: 'فاتورة ضريبية رسمية ETA • مسددة بالكامل (أصل ورقي وإلكتروني)',
    submissionDate: '2026-03-26',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 2588.60,
    vatAmount: 362.40,
    totalAmount: 2951.00,
    totalAmountFormatted: '2,951.00 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (362.40 ج.م) بعد تطبيق خصم تجاري 121.93 ج.م',
      billingCycle: 'سداد فوري معتمد',
      compliance: 'فاتورة ضريبية معتمدة برقم إلكتروني: 34GAMWHCFDFNTGX5QWDGJ8PK10 ورقم أصل ورقي: 40-0217871'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'سلم معدني صلب 6 درجات عريض (Heavy Duty 6-Step Metal Ladder)',
        specifications: 'سلم معدني متين 6 درجات مخصص لأعمال تمديد الكابلات في السقف المعلق وتركيب وصيانة كاميرات المراقبة بالمعادي',
        quantity: 1,
        unit: 'سلم صيانة',
        unitPrice: 1183.33,
        totalPrice: 1183.33,
        coverage: 'عدة وأدوات صيانة المقر'
      },
      {
        itemNumber: 2,
        description: 'كراسي بلاستيك راتان فاخرة بجراب (Rattan Plastic Armchairs)',
        specifications: 'كراسي مريحة مقاومة متينة بنقشة الراتان لاستراحة واستقبال الموظفين والزوار',
        quantity: 4,
        unit: 'كرسي راتان',
        unitPrice: 269.30,
        totalPrice: 1077.19,
        coverage: 'استراحة المقر ومنطقة الانتظار'
      },
      {
        itemNumber: 3,
        description: 'ترابيزة بلاستيك متينة ألوان بيتش (Beach Multipurpose Table)',
        specifications: 'طاولة بلاستيكية قوية متعددة الاستخدامات لتجهيزات الضيافة والصيانة',
        quantity: 1,
        unit: 'طاولة',
        unitPrice: 328.07,
        totalPrice: 328.07,
        coverage: 'استراحة المقر'
      }
    ],
    technicalCoordination: {
      siteUtility: 'السلم المعدني الـ 6 درجات هو الأداة الأساسية التي يستخدمها فني الشبكات حاتم والمهندس أحمد عبيد في تمديد كوابل Cat6 في السقف المعلق وتركيب كاميرات الأصدقاء'
    },
    auditNotes: [
      'فاتورة ضريبية أصلية رقم 40-0217871 صادرة بتاريخ 26/03/2026 وموثقة إلكترونياً على منظومة ETA بتاريخ 15/04/2026.',
      'تم إرسالها بنسختين متطابقتين (النسخة الورقية الأصلية والنسخة الإلكترونية المعتمدة).',
      'إجمالي المبلغ المسدد شامل الضريبة: 2,951.00 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Tax_ETA/.'
    ]
  },

  // 8. EC - Hosting Subscription Host1
  {
    id: 'quote-ec-hosting-mashawer',
    title: 'فاتورة استضافة موقع مشاوير السنوية Host1 (المصرية لتكنولوجيا المعلومات EC)',
    type: 'استضافة ويب ونطاقات سحابية (Web Hosting Subscription)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    internalId: 'Invoice #1331',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Domains_Hosting/EC_Host1_mashawer_1331.pdf',
    provider: {
      name: 'المصرية لتكنولوجيا المعلومات والاتصالات (EC / eyg.com.eg)',
      accountManager: 'المهندس محمد الحلو (Eng. Mohamed El-Helw)',
      role: 'مدير حسابات الاستضافة والنطاقات والخدمات السحابية',
      representative: 'شركة مساهمة مصرية - القاهرة',
      accountStatus: 'فاتورة مسددة إلكترونياً بنجاح (Paid Reference: TX-43672852285)'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية',
      site: 'المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology)'
      ],
      project: 'البوابة التعريفية ومنصة مشاوير mashawer.com.eg'
    },
    status: 'فاتورة اشتراك مسددة إلكترونياً بالكامل',
    submissionDate: '2026-08-11',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 2200.00,
    vatAmount: 308.00,
    totalAmount: 2508.00,
    totalAmountFormatted: '2,508.00 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (308.00 ج.م)',
      billingCycle: 'اشتراك سنوي (من 11/08/2026 حتى 10/08/2027)',
      compliance: 'إيصال دفع إلكتروني رسمي عبر بوابة سداد المصرية EC'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'خطة استضافة سنوية متقدمة Host1 - mashawer.com.eg',
        specifications: 'سعة استضافة مخصصة، دعم شهادات الأمان SSL التلقائية، قواعد بيانات MySQL، ودعم نطاق com.eg لموقع مشاوير',
        quantity: 1,
        unit: 'اشتراك سنوي',
        unitPrice: 2200.00,
        totalPrice: 2200.00,
        coverage: 'بوابة مشاوير الرسمية'
      }
    ],
    technicalCoordination: {
      dnsRouting: 'ربط السيرفر مع سجلات A-Record و CNAME الخاصة بدومين mashawer.com.eg وتوجيه إيميلات زوهو الستة'
    },
    auditNotes: [
      'فاتورة رسمية رقم 1331 صادرة بتاريخ 11/08/2026 ومسددة إلكترونياً بالكامل.',
      'تغطي استضافة الموقع لمدة عام كامل حتى 10 أغسطس 2027.',
      'إجمالي المبلغ المسدد شامل الضريبة: 2,508.00 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Domains_Hosting/.'
    ]
  },

  // 9. EC - Domain Registration mashawer.com.eg
  {
    id: 'quote-ec-domain-mashawer',
    title: 'فاتورة حجز وتسجيل دومين mashawer.com.eg (المصرية لتكنولوجيا المعلومات EC)',
    type: 'حجز نطاقات رسمية وهوية الشركة (Domain Name Registration)',
    isTaxInvoice: true,
    isPendingTaxInvoice: false,
    internalId: 'Invoice #1325',
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Domains_Hosting/EC_Domain_mashawer_com_eg_1325.pdf',
    provider: {
      name: 'المصرية لتكنولوجيا المعلومات والاتصالات (EC / eyg.com.eg)',
      accountManager: 'المهندس محمد الحلو (Eng. Mohamed El-Helw)',
      role: 'المسجل المعتمد لنطاقات المستوى الأعلى الوطنية المصرية .eg',
      representative: 'شركة مساهمة مصرية - القاهرة',
      accountStatus: 'فاتورة مسددة إلكترونياً بنجاح (Paid Reference: TX-43672852275)'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية',
      site: 'المعادي، القاهرة',
      authorizedPersons: [
        'سامح يس (Head of Technology)'
      ],
      project: 'النطاق التجاري والحكومي المعتمد لمشاوير'
    },
    status: 'فاتورة اشتراك مسددة إلكترونياً بالكامل',
    submissionDate: '2026-08-09',
    currency: 'EGP (جنيه مصري)',
    subtotalAmount: 1100.00,
    vatAmount: 154.00,
    totalAmount: 1254.00,
    totalAmountFormatted: '1,254.00 ج.م',
    financialTerms: {
      vatRate: '14% ضريبة القيمة المضافة (154.00 ج.م)',
      billingCycle: 'اشتراك سنوي (من 09/08/2026 حتى 08/08/2027)',
      compliance: 'إيصال دفع إلكتروني رسمي عبر بوابة سداد المصرية EC'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'حجز وتسجيل نطاق COM.EG - mashawer.com.eg',
        specifications: 'حجز النطاق الوطني المصري الموثق بالسجل التجاري والبطاقة الضريبية وحماية حقوق العلامة التجارية لمشاوير',
        quantity: 1,
        unit: 'تسجيل سنوي',
        unitPrice: 1100.00,
        totalPrice: 1100.00,
        coverage: 'الهوية الرقمية للشركة'
      }
    ],
    technicalCoordination: {
      legalRegistry: 'النطاق تم توثيقه بالأوراق الرسمية للشركة لضمان ملكيته الحصرية ومنع أي طرف خارجي من استغلال الاسم'
    },
    auditNotes: [
      'فاتورة رسمية رقم 1325 صادرة بتاريخ 09/08/2026 ومسددة إلكترونياً بالكامل.',
      'تغطي ملكية النطاق mashawer.com.eg لمدة عام كامل حتى 08 أغسطس 2027.',
      'إجمالي المبلغ المسدد شامل الضريبة: 1,254.00 ج.م.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/Invoices_Domains_Hosting/.'
    ]
  },

  // 10. FRIENDS COMPANY - Approved CCTV Installation PO
  {
    id: 'quote-friends-cctv-maadi',
    title: 'عرض أسعار وتوريد منظومة كاميرات المراقبة وشبكة المقر (شركة الأصدقاء - م/ علي)',
    type: 'تجهيزات أمنية وشبكات داخلية (CCTV & Surveillance Infrastructure)',
    isTaxInvoice: false,
    isPendingTaxInvoice: false,
    driveFolder: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/CCTV_Friends_Company_Maadi_PO.pdf',
    provider: {
      name: 'شركة الأصدقاء للتوريدات والتركيبات (Friends Company)',
      representative: 'المهندس علي (Eng. Ali)',
      role: 'المقاول والمورد المعتمد للمعدات وتجهيزات المقرات',
      vendorAdvantage: 'نفس المورد المعتمد لمنظومة مطعم المشويات بالعجوزة (توحيد قطع الغيار وعقود الصيانة والمسؤولية الفنية)'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (Mashawer)',
      site: 'المقر الرئيسي لعمليات شركة مشاوير - المعادي، القاهرة',
      supervisors: [
        'سامح يس (Head of Tech)',
        'المهندس عماد الشرقاوي (Senior Technical Consultant)'
      ]
    },
    status: 'عرض وتوريد معتمد للتنفيذ الفوري',
    submissionDate: '2026-09-24',
    currency: 'EGP (جنيه مصري)',
    totalAmount: 55050.00,
    totalAmountFormatted: '55,050.00 ج.م',
    lineItems: [
      {
        itemNumber: 1,
        description: 'كاميرات مراقبة داخلية 2 ميجابكسل (2MP Indoor IP Dome/Bullet Cameras)',
        specifications: 'دقة 1080p عالية النقاء، زاوية رؤية واسعة 2.8mm، رؤية ليلية بالأشعة تحت الحمراء IR Smart',
        quantity: 12,
        unit: 'كاميرا',
        coverage: 'صالات العمليات، غرف المكاتب الإدارية، الممرات الداخلية، والأبواب'
      },
      {
        itemNumber: 2,
        description: 'كاميرات مراقبة داخلية ألوان ليلية مع تسجيل صوت 2 ميجابكسل (2MP Color Night Vision + Built-in Mic)',
        specifications: 'تصوير ملون 24 ساعة (Full-Color) مع ميكروفون مدمج فائق الحساسية لتسجيل الصوت',
        quantity: 2,
        unit: 'كاميرا',
        coverage: 'مكتب الإدارة الرئيسي ومنطقة الاستقبال وباب الدخول الرئيسي'
      },
      {
        itemNumber: 3,
        description: 'جهاز تسجيل شبكي 16 قناة (16-Channel NVR Network Video Recorder)',
        specifications: 'يدعم دقة 4K Ultra HD، مخارج HDMI / VGA، ربط سحابي عبر تطبيق الموبايل، تشفير H.265+',
        quantity: 1,
        unit: 'جهاز',
        installedIn: 'داخل راك بيرلا 27U بغرفة الـ IT'
      },
      {
        itemNumber: 4,
        description: 'سويتشات شبكة 8 بورت بتقنية PoE (Two 8-Port Gigabit PoE Network Switches)',
        specifications: 'تغذية الكاميرات بالكهرباء والبيانات معاً عبر كابل الإيثرنت (Power over Ethernet) بقوة 120W لكل سويتش',
        quantity: 2,
        unit: 'سويتش',
        installedIn: 'داخل حاوية الراك 27U'
      },
      {
        itemNumber: 5,
        description: 'قرص صلب مخصص لأنظمة المراقبة سعة 4 تيرابايت (WD Purple 4TB Surveillance Hard Drive)',
        specifications: 'Western Digital فئة Purple مخصص للتشغيل الشاق المستمر 24/7 لمدة شهر تسجيل متواصل دون إسقاط فريمات',
        quantity: 1,
        unit: 'قرص صلب',
        installedIn: 'داخل جهاز الـ NVR الـ 16 قناة'
      },
      {
        itemNumber: 6,
        description: 'أعمال المصنعيات والتمديدات والأسلاك والبرمجة والتسليم (Labor, Cabling & Setup)',
        specifications: 'تمديد كابلات CAT6 معتمدة عبر السقف المعلق، تثبيت وضبط زوايا الكاميرات الـ 14، إنهاء وتوصيل الراك، وبرمجة تطبيق الموبايل والشاشات',
        quantity: 1,
        unit: 'مقطوعية شاملة التجهيز والاختبار والتسليم النهائي'
      }
    ],
    technicalCoordination: {
      rackIntegration: 'تثبيت الـ NVR والسويتشين داخل راك الـ 27U الموجود بالمقر',
      cablingPath: 'مسار الأسلاك يمر عبر السقف المعلق المحمي لضمان مظهر احترافي'
    },
    auditNotes: [
      'السعر الإجمالي الرسمي للعرض هو 55,050 ج.م شامل كافة الأجهزة والملحقات والمصنعيات.',
      'الاعتماد يضمن توحيد الصيانة وفنيي التركيب مع فرع مطعم المشويات بالعجوزة وفق توجيهات الإدارة لتوحيد المسؤولية الفنية.',
      'مكان الحفظ المعتمد في Google Drive: Hypatia_Source/04_CENTRAL_QUOTATIONS/.'
    ]
  },

  // 11. WE TELECOM - L3VPN & Fiber Connectivity PO (360,000 EGP / YRC)
  {
    id: 'quote-we-l3vpn-po',
    title: 'أمر شراء وعرض أسعار خطوط الربط المجمعة والـ L3VPN بالفايبر (المصرية للاتصالات WE)',
    type: 'خطوط ربط وشبكات ألياف ضوئية L3VPN (Carrier Fiber & L3VPN Aggregation)',
    isTaxInvoice: false,
    isPendingTaxInvoice: false,
    driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/WE_L3VPN_Fiber_Connectivity_PO.pdf',
    provider: {
      name: 'الشركة المصرية للاتصالات (WE - Telecom Egypt)',
      accountManager: 'المهندس أحمد غريب (Eng. Ahmed Gharib)',
      role: 'WE Account Manager - إدارة مبيعات كبار العملاء والربط الشبكي',
      accountStatus: 'Account # NEW • تم اعتماد العرض وإصدار أمر الشراء PO'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (Company Name: Mashawir)',
      authorizedPersons: [
        'سامح يس (Head of Technology & System Architect)',
        'المهندس عماد الشرقاوي (Senior Technical Consultant)'
      ],
      project: 'خطوط الربط القومي المباشر بين مقر المعادي وسيرفرات داتا سنتر WE وفروع المحافظات'
    },
    status: 'أمر شراء معتمد رسمياً (Accepted PO)',
    submissionDate: '2026-09-29',
    validityPeriod: 'سنة تعاقدية كاملة (1 Year Contract Duration)',
    currency: 'EGP (جنيه مصري)',
    totalAmount: 360000.00,
    totalAmountFormatted: '360,000.00 ج.م / سنوياً',
    financialTerms: {
      vatRate: 'VAT and DF Excluded (غير شامل ضريبة القيمة المضافة ورسم التنمية)',
      billingCycle: 'سنوي متكرر (YRC) - السداد ربع سنوي مقدماً بعد التركيب (Quarterly in advance: 90,000 ج.م)',
      compliance: 'فترة التوريد والتركيب: 4 إلى 6 أسابيع من استلام المستندات المطلوبة'
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'VPN HQ – DC: خط الربط التجميعي الرئيسي 24Mbps L3VPN عبر الفايبر',
        specifications: '24Mbps L3VPN (Aggregation Link) connectivity over Fiber (VMs at WEData DC SV PVC from CAF Cloud) as PVC from order#6078927',
        quantity: 1,
        unit: 'خط تجميعي فايبر فائق السرعة',
        totalPrice: 0.00,
        coverage: 'مقر المعادي الرئيسي إلى داتا سنتر WE بالقرية الذكية (Included مجاناً ضمن باقة الـ PVC)'
      },
      {
        itemNumber: 2,
        description: 'Sec. 1: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps as PVC from OID#6796982',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 1'
      },
      {
        itemNumber: 3,
        description: 'Sec. 2: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps as PVC from OID#6796979',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 2'
      },
      {
        itemNumber: 4,
        description: 'Sec. 3: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps as PVC from OID#6796985',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 3'
      },
      {
        itemNumber: 5,
        description: 'Sec. 4: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps PVC from OID#6796988',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 4'
      },
      {
        itemNumber: 6,
        description: 'Sec. 5: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps as PVC from OID#6796991',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 5'
      },
      {
        itemNumber: 7,
        description: 'Sec. 6: خط ربط فرعي L3VPN بسرعة 4Mbps تحميل ورفع',
        specifications: 'L3VPN Main connectivity, download and upload 4Mbps as PVC from OID#6796994',
        quantity: 1,
        unit: 'خط ربط L3VPN',
        unitPrice: 60000.00,
        totalPrice: 60000.00,
        coverage: 'القطاع / الفرع 6'
      }
    ],
    technicalCoordination: {
      aggregationLink: '24Mbps L3VPN فايبر يربط المقر بالداتا سنتر مع 6 قنوات PVC مخصصة',
      slaCommitment: 'اتفاقية مستوى الخدمة من المصرية للاتصالات مع مراقبة مدار الساعة NOC'
    },
    auditNotes: [
      'أمر شراء رسمي معتمد (Purchase Order) صادر من المصرية للاتصالات WE وموجه لشركة مشاوير (Mashawir).',
      'مسؤول الحساب المعتمد: المهندس أحمد غريب (Ahmed Gharib).',
      'إجمالي التكلفة السنوية YRC: 360,000.00 ج.م تُسدد ربع سنوياً مقدماً بعد التركيب (90,000 ج.م كل 3 أشهر).',
      'مدة التنفيذ: من 4 إلى 6 أسابيع بعد تسليم المستندات التعاقدية المطلوبة.',
      'مكان الحفظ المعتمد في Google Drive: Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/WE_L3VPN_Fiber_Connectivity_PO.pdf.'
    ]
  },

  // 12. WE TELECOM - 4B Cloud Server, WAF & Backup PO (807,496 EGP / YRC)
  {
    id: 'quote-we-cloud-po',
    title: 'أمر شراء وعرض أسعار خوادم الاستضافة السحابية لـ 4B وجدار الحماية F5 WAF والنسخ الاحتياطي (المصرية للاتصالات WE)',
    type: 'استضافة سحابية سيادية وخوادم افتراضية وحماية وأمان (Cloud IaaS, VMs, WAF & Backup)',
    isTaxInvoice: false,
    isPendingTaxInvoice: false,
    driveFolder: 'Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/WE_4B_Cloud_IaaS_WAF_Backup_PO.pdf',
    provider: {
      name: 'الشركة المصرية للاتصالات (WE - Telecom Egypt)',
      accountManager: 'المهندس أحمد غريب (Eng. Ahmed Gharib)',
      role: 'WE Account Manager - قطاع الاستضافة السحابية وحلول المؤسسات',
      accountStatus: 'Account # New • تم اعتماد المواصفات وإصدار أمر الشراء الرسمي'
    },
    client: {
      entity: 'شركة مشاوير للمنصات الرقمية (Company Name: Mashawir)',
      authorizedPersons: [
        'سامح يس (Head of Technology & System Architect)',
        'المهندس عماد الشرقاوي (Senior Technical Consultant)'
      ],
      project: 'البيئة السحابية والسيادية الإنتاجية لمنظومة وتطبيق نقل الركاب فور بي 4B'
    },
    status: 'أمر شراء معتمد رسمياً (Accepted PO)',
    submissionDate: '2026-09-29',
    validityPeriod: 'سنة تعاقدية كاملة (1 Year Contract Duration) • الصلاحية الأولية أسبوع',
    currency: 'EGP (جنيه مصري)',
    totalAmount: 807496.00,
    totalAmountFormatted: '807,496.00 ج.م / سنوياً',
    financialTerms: {
      vatRate: 'VAT and DF Excluded (غير شامل ضريبة القيمة المضافة ورسم التنمية)',
      billingCycle: 'سنوي متكرر (YRC) - السداد ربع سنوي مقدماً بعد التركيب (Quarterly in advance: 201,874 ج.م)',
      compliance: 'مطابق للاشتراطات الفنية والأمنية لجهاز تنظيم النقل البري LTRA'
    },
    technicalSpecifications: {
      dataCenterLocation: 'مركز بيانات المصرية للاتصالات (WE Data Center SV Tier III)',
      virtualMachines: [
        {
          name: '4B-App-Server',
          role: 'خادم التطبيقات والـ API ومعالجة طلبات الركاب والكباتن',
          qty: 1,
          vCpu: 4,
          ramGb: 8,
          storageGb: 40,
          storageType: 'Local High-Speed SSD',
          os: 'Linux Ubuntu Enterprise',
          software: 'Node.js 22 LTS, NestJS API Clusters, Anti-Virus Lic (1)'
        },
        {
          name: '4B-DB-Server',
          role: 'خادم قاعدة البيانات الرئيسي للرحلات والمستخدمين والخرائط',
          qty: 1,
          vCpu: 4,
          ramGb: 8,
          storageGb: 200,
          storageType: 'Local High-Speed SSD Enterprise',
          os: 'Linux Ubuntu Enterprise',
          software: 'PostgreSQL 16 Enterprise مع PostGIS 3.4, Anti-Virus Lic (1)'
        },
        {
          name: '4B-Cache-Server',
          role: 'خادم الكاش اللحظي وإدارة الجلسات والطوابير والمواقع الحية',
          qty: 1,
          vCpu: 2,
          ramGb: 2,
          storageGb: 50,
          storageType: 'Local High-Speed SSD Enterprise',
          os: 'Linux Ubuntu Enterprise',
          software: 'Redis 7 In-Memory Caching, Anti-Virus Lic (1)'
        }
      ],
      loadBalancerAndWaf: {
        model: 'Web Application Firewall (WAF Enterprise)',
        throughput: '20Mbps Main Internet service BW as a PVC from order#6078933',
        virtualServerName: '4B-Production-WAF',
        inboundPorts: [443, 80],
        healthCheck: 'HTTPS Deep Packet Inspection & Anti-DDoS',
        sslOffloading: true,
        cookiePersistence: true,
        backendNodes: ['4B-App-Server', '4B-DB-Server', '4B-Cache-Server']
      },
      connectivityAndVpn: {
        networkType: '20Mbps Internet BW Dedicated PVC + L3VPN',
        bandwidth: '20Mbps Dedicated Bandwidth',
        sslVpnAccounts: 7,
        firewallRules: 'مغلقة بالكامل عدا المنافذ 80 و 443 ووصول الـ SSL VPN للمهندسين المعتمدين'
      },
      backupPolicy: {
        policy: 'Daily Incremental | Weekly Full | 3 Months Retention',
        totalAllocatedBackupStorage: '250 GB مخصصة للباك أب',
        retentionDays: 90
      }
    },
    lineItems: [
      {
        itemNumber: 1,
        description: 'خادم التطبيقات (4B-App-Server) - 4 Cores / 8 GB RAM / 40 GB Storage / Anti-Virus',
        specifications: 'سيرفر افتراضي VM بمواصفات عالية مخصص لتشغيل خدمات وتطبيقات 4B',
        quantity: 1,
        unit: 'VM Server',
        unitPrice: 93208.00,
        totalPrice: 93208.00,
        coverage: 'تشغيل الـ Backend والـ API'
      },
      {
        itemNumber: 2,
        description: 'خادم قاعدة البيانات (4B-DB-Server) - 4 Cores / 8 GB RAM / 200 GB Storage / Anti-Virus',
        specifications: 'سيرفر افتراضي VM بمساحة تخزين محلية 200GB لتخزين قواعد بيانات PostgreSQL و PostGIS',
        quantity: 1,
        unit: 'VM Server',
        unitPrice: 93208.00,
        totalPrice: 93208.00,
        coverage: 'قواعد بيانات المنظومة الحية'
      },
      {
        itemNumber: 3,
        description: 'خادم الكاش (4B-Cache-Server) - 2 Cores / 2 GB RAM / 50 GB Storage / Anti-Virus',
        specifications: 'سيرفر افتراضي VM مخصص لتشغيل مخزن الذاكرة السريعة Redis',
        quantity: 1,
        unit: 'VM Server',
        unitPrice: 46604.00,
        totalPrice: 46604.00,
        coverage: 'طوابير وسرعة الاستجابة اللحظية'
      },
      {
        itemNumber: 4,
        description: 'خدمة تدفق الإنترنت المباشر 20Mbps Main Internet BW من order#6078933',
        specifications: '20Mbps Main Internet service BW as a PVC from order#6078933',
        quantity: 1,
        unit: 'خدمة إنترنت Dedicated',
        unitPrice: 136000.00,
        totalPrice: 136000.00,
        coverage: 'ربط السيرفرات بالإنترنت العام'
      },
      {
        itemNumber: 5,
        description: 'جدار حماية تطبيقات الويب المتقدم (1 WAF Enterprise Appliance)',
        specifications: 'حماية المنظومة من هجمات DDoS واختراق واجهات الـ API وحماية بيانات المستخدمين',
        quantity: 1,
        unit: 'جدار حماية WAF',
        unitPrice: 220000.00,
        totalPrice: 220000.00,
        coverage: 'الحماية السيادية للبيئة السحابية'
      },
      {
        itemNumber: 6,
        description: 'حسابات النفاذ الآمن المشفر SSL VPN لمهندسي الشركة (7 حسابات)',
        specifications: '7 Accounts SSL VPN مخصصة للإدارة التقنية والمهندسين للتحكم الآمن في السيرفرات',
        quantity: 7,
        unit: 'حساب SSL VPN',
        unitPrice: 8958.00,
        totalPrice: 62706.00,
        coverage: 'م/ سامح، م/ عماد، م/ أحمد عبيد وفريق التشغيل'
      },
      {
        itemNumber: 7,
        description: 'النسخ الاحتياطي لخادم الكاش VM Backup (4B-Cache-Server)',
        specifications: 'Daily Incremental | Weekly Full | 3 Months Retention لضمان استرجاع بيئة الكاش',
        quantity: 1,
        unit: 'خدمة باك أب',
        unitPrice: 25538.00,
        totalPrice: 25538.00,
        coverage: 'استعادة خادم الكاش'
      },
      {
        itemNumber: 8,
        description: 'النسخ الاحتياطي لخادم قاعدة البيانات DB Backup (4B-DB-Server)',
        specifications: 'Daily Incremental | Weekly Full | 3 Months Retention لقاعدة بيانات 4B',
        quantity: 1,
        unit: 'خدمة باك أب',
        unitPrice: 130232.00,
        totalPrice: 130232.00,
        coverage: 'حفظ وتأمين بيانات الرحلات والمستخدمين'
      }
    ],
    auditNotes: [
      'أمر شراء رسمي معتمد (Purchase Order) صادر من المصرية للاتصالات WE لشركة مشاوير (Mashawir).',
      'مسؤول الحساب: المهندس أحمد غريب (Ahmed Gharib).',
      'إجمالي التكلفة السنوية YRC: 807,496.00 ج.م تُسدد ربع سنوياً مقدماً بعد التركيب (201,874 ج.م كل 3 أشهر).',
      'إجمالي أوامر الشراء لشركة WE معاً (L3VPN + Cloud): 360,000 + 807,496 = 1,167,496 ج.م سنوياً.',
      'مكان الحفظ المعتمد في Google Drive: Mashweer_Digital_Platforms/04_CENTRAL_QUOTATIONS/WE_4B_Cloud_IaaS_WAF_Backup_PO.pdf.'
    ]
  }
];

