// Master Google Drive Structure & Seed Manifest for Mashweer Digital Platforms
// Root Folder: 'Mashweer_Digital_Platforms'
// Ecosystem: Mashweer Corporate + 4B + WeKaLa + Daro + Hardware & Server Room + Kaggle Research

export interface DriveFileItem {
  id: string;
  name: string;
  recommendedFileName: string;
  extension: 'pdf' | 'md' | 'json' | 'apk' | 'docx' | 'xlsx' | 'sql' | 'env' | 'png' | 'html';
  importance: 'حرج للغاية' | 'رئيسي' | 'مساند' | 'أرشيفي';
  folderType: 'القرارات' | 'العقود' | 'العروض' | 'الملفات الفنية' | 'المذكرات' | 'سجل شامل';
  description: string;
  status: 'جاهز للإيداع' | 'تم الرفع' | 'بانتظار المستند من المورد' | 'قيد الإعداد';
}

export interface DriveFolderNode {
  id: string;
  folderName: string;
  displayName: string;
  projectRef?: string;
  category: 'مشروعات ومنظومات' | 'القرارات المركزية' | 'العقود المركزية' | 'العروض والمشتريات' | 'أبحاث كاجل والبروتوكول' | 'السجل الشامل';
  path: string;
  subType: 'قرارات' | 'عقود' | 'عروض' | 'فني وكود' | 'مذكرات' | 'شامل';
  description: string;
  suggestedFiles: DriveFileItem[];
}

export const HYPATIA_SOURCE_ROOT = 'Mashweer_Digital_Platforms';

export const GOOGLE_DRIVE_PROJECT_SEED_TREE: DriveFolderNode[] = [
  // ==========================================
  // 1. MASHWEER CORPORATE & SUBSIDIARY
  // ==========================================
  {
    id: 'folder-mashweer-corp-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/01_العقود_Contracts',
    displayName: 'مشاوير • العقود والاتفاقيات',
    projectRef: 'proj-mashweer-corp',
    category: 'مشروعات ومنظومات',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/01_العقود_Contracts/',
    description: 'عقود شركة مشاوير للمنصات الرقمية، عقود الاستضافة، واتفاقيات حماية الملكية الفكرية.',
    suggestedFiles: [
      {
        id: 'f-mcorp-c-1',
        name: 'السجل التجاري والبطاقة الضريبية وتراخيص مشاوير',
        recommendedFileName: 'Mashweer_Commercial_Registry_and_Tax_Card.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'مستندات التأسيس الرسمية لشركة مشاوير للمنصات الرقمية.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-mcorp-c-2',
        name: 'عقد استضافة وحجز دومين Mashweer.net مع Hostinger',
        recommendedFileName: 'Hostinger_Mashweer_Net_Domain_Agreement.pdf',
        extension: 'pdf',
        importance: 'رئيسي',
        folderType: 'العقود',
        description: 'عقد حجز الدومين والخوادم السحابية للمنصة.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-mashweer-corp-decisions',
    folderName: '01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/02_القرارات_Decisions',
    displayName: 'مشاوير • القرارات الإدارية والتنظيمية',
    projectRef: 'proj-mashweer-corp',
    category: 'مشروعات ومنظومات',
    subType: 'قرارات',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/02_القرارات_Decisions/',
    description: 'قرارات الهيكل التنظيمي، توزيع المهام، ومحاضر اجتماعات الإدارة التنفيذية.',
    suggestedFiles: [
      {
        id: 'f-mcorp-d-1',
        name: 'قرار تفويض وتسليم الأعمال الفنية والتقنية عند الغياب',
        recommendedFileName: 'Technical_Work_Delegation_and_Handover_Order.docx',
        extension: 'docx',
        importance: 'حرج للغاية',
        folderType: 'القرارات',
        description: 'مذكرة تنظيم الصلاحيات وإجراءات الطوارئ للزملاء في غياب مدير التكنولوجيا.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-mashweer-corp-memos',
    folderName: '01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/03_المذكرات_Memos',
    displayName: 'مشاوير • المذكرات والمقترحات الرسمية',
    projectRef: 'proj-mashweer-corp',
    category: 'مشروعات ومنظومات',
    subType: 'مذكرات',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/03_المذكرات_Memos/',
    description: 'المذكرات المرفوعة لمجلس الإدارة والشريك المستثمر أ/ أبو خالد.',
    suggestedFiles: [
      {
        id: 'f-mcorp-m-1',
        name: 'المذكرة التنفيذية الكاملة لإنشاء الشركة التابعة (الأهداف العشرة)',
        recommendedFileName: 'Executive_Proposal_Mashweer_Subsidiary_Company.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'المذكرات',
        description: 'المقترح الاستثماري الموجه لأبو خالد لإنشاء الذراع التكنولوجي بالمعادي.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-mcorp-m-2',
        name: 'رسالة الواتساب السريعة لأبو خالد',
        recommendedFileName: 'AbuKhaled_WhatsApp_Pitch_Summary.txt',
        extension: 'md',
        importance: 'رئيسي',
        folderType: 'المذكرات',
        description: 'الملخص المركز لمناقشته في جلسة السبت 10:00 صباحاً.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-mashweer-corp-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/04_الملفات_الفنية_Technical',
    displayName: 'مشاوير • الملفات الفنية والدومينات',
    projectRef: 'proj-mashweer-corp',
    category: 'مشروعات ومنظومات',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/01_MASHWEER_CORPORATE/04_الملفات_الفنية_Technical/',
    description: 'سجلات الـ DNS، إيميلات موظفي مشاوير العشرة، والمنافذ الأمنية.',
    suggestedFiles: [
      {
        id: 'f-mcorp-t-1',
        name: 'قائمة إيميلات موظفي مشاوير العشرة الرسمية',
        recommendedFileName: 'Mashweer_Staff_Official_Emails_Directory.xlsx',
        extension: 'xlsx',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'بيانات أ/ عادل فاروق، أ/ هاني، م/ سامح وباقي مسؤولي الإدارات.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-mcorp-t-2',
        name: 'سجلات DNS و MX و SPF لدومين Mashweer.net',
        recommendedFileName: 'Mashweer_Net_DNS_Hostinger_Records.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'الملفات الفنية',
        description: 'سجلات توجيه البريد والموقع وتوثيق السيرفرات.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 2. 4B PASSENGER APP
  // ==========================================
  {
    id: 'folder-4b-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/01_العقود_Contracts',
    displayName: '4B • عقود التطوير وتسليم السورس كود',
    projectRef: 'proj-4b',
    category: 'مشروعات ومنظومات',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/01_العقود_Contracts/',
    description: 'عقود تطوير تطبيق 4B مع شركة قيمة تك، ملحقات تسليم الأكواد والشروط الجزائية.',
    suggestedFiles: [
      {
        id: 'f-4b-c-1',
        name: 'عقد تطوير تطبيق الركاب 4B مع شركة قيمة تك',
        recommendedFileName: 'QemaTech_4B_Passenger_App_Agreement.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'العقد الأصلي، مراحل الدفعات، وبنود تسليم سورس كود التطبيق ومفاتيح الرفع.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-4b-c-2',
        name: 'الخطة الزمنية الرسمية من شركة قيمة تك لتسليم وتعديلات مشروع 4B (Change Implementation Time Plan)',
        recommendedFileName: 'QemaTech_4B_Change_Implementation_Time_Plan_7Weeks.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'خطة التسليم الرسمية من شركة قيمة تك: 7 أسابيع متتالية (August 2026 / V1.0) موزعة على 5 مراحل تسليم (M1: التشغيل الأساسي، M2: التجاري والتسعير، M3: النواة المالية، M4: التقارير والحوكمة، M5: UAT والإنتاج).',
        status: 'تم الرفع'
      }
    ]
  },
  {
    id: 'folder-4b-decisions',
    folderName: '01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/02_القرارات_Decisions',
    displayName: '4B • قرارات ميزانية وسيرفر الإطلاق',
    projectRef: 'proj-4b',
    category: 'مشروعات ومنظومات',
    subType: 'قرارات',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/02_القرارات_Decisions/',
    description: 'قرارات اعتماد ميزانية خادم 4B مع المصرية للاتصالات وخطة التدشين.',
    suggestedFiles: [
      {
        id: 'f-4b-d-1',
        name: 'قرار اعتماد استئجار سيرفر WE المخصص لتطبيق 4B',
        recommendedFileName: 'Approval_WE_Dedicated_Server_4B_8500EGP.docx',
        extension: 'docx',
        importance: 'حرج للغاية',
        folderType: 'القرارات',
        description: 'قرار الاعتماد المالي بقيمة 8,500 ج.م شهرياً لمناقشته مع أ/ هاني وأبو خالد.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-4b-quotations',
    folderName: '01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/03_العروض_Quotations',
    displayName: '4B • عروض أسعار السيرفرات والاستضافة',
    projectRef: 'proj-4b',
    category: 'مشروعات ومنظومات',
    subType: 'عروض',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/03_العروض_Quotations/',
    description: 'عرض سعر الشركة المصرية للاتصالات WE Telecom لخادم تطبيق 4B المخصص.',
    suggestedFiles: [
      {
        id: 'f-4b-q-1',
        name: 'عرض سعر WE الرسمي لخادم 4B المخصص (8,500 ج.م/شهر)',
        recommendedFileName: 'WE_Telecom_Dedicated_Server_Quotation_4B.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'المواصفات: عتاد مخصص، راك، خط إنترنت مخصص وسرعة استجابة منخفضة.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-4b-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/04_الملفات_الفنية_Technical',
    displayName: '4B • ملفات APK وفيجما وسيرفر أوبونتو',
    projectRef: 'proj-4b',
    category: 'مشروعات ومنظومات',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/02_4B_PASSENGER_APP/04_الملفات_الفنية_Technical/',
    description: 'ملفات APK التجريبية، روابط تصاميم فيجما، ومخططات خادم Ubuntu Server.',
    suggestedFiles: [
      {
        id: 'f-4b-t-1',
        name: 'حزمة الـ APK المعتمدة لتطبيق الركاب (Release Build)',
        recommendedFileName: '4B_Passenger_App_v1.4.2_release.apk',
        extension: 'apk',
        importance: 'حرج للغاية',
        folderType: 'الملفات الفنية',
        description: 'نسخة الفحص والاختبار بحجم 34.8 MB.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-4b-t-2',
        name: 'فهرس وروابط شاشات فيجما (Figma Screens Catalog)',
        recommendedFileName: '4B_Figma_Screens_Catalog_and_Links.md',
        extension: 'md',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'شاشات الحجز، اختيار الفئة، الدفع، وتتبع سيارات الكباتن.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-4b-t-3',
        name: 'مواصفات وإعدادات بيئة تشغيل سيرفر WE Ubuntu Server',
        recommendedFileName: '4B_WE_Server_Ubuntu_Deployment_Specs.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'الملفات الفنية',
        description: 'PostgreSQL + PostGIS، Redis، Nginx، وربط شهادات SSL.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 3. WEKALA FLEET & AGENCIES
  // ==========================================
  {
    id: 'folder-wekala-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/01_العقود_Contracts',
    displayName: 'وكالة • عقود المكاتب واستلام السورس كود',
    projectRef: 'proj-wekala',
    category: 'مشروعات ومنظومات',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/01_العقود_Contracts/',
    description: 'عقود نموذج استلام سورس كود وكالة فلاتر وملفات التوقيع الرقمي Keystore.',
    suggestedFiles: [
      {
        id: 'f-wekala-c-1',
        name: 'عقد استلام سورس كود وكالة Flutter وملفات Keystore',
        recommendedFileName: 'WeKaLa_Contract_Deliverables_Checklist.docx',
        extension: 'docx',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'محضر استلام الكود البرمجي كامل، مفاتيح التوقيع الرقمي، ومستندات تسجيل الوكلاء.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-wekala-decisions',
    folderName: '01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/02_القرارات_Decisions',
    displayName: 'وكالة • قرارات عمولات الوكلاء ونسب الإعلانات',
    projectRef: 'proj-wekala',
    category: 'مشروعات ومنظومات',
    subType: 'قرارات',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/02_القرارات_Decisions/',
    description: 'قرارات تنظيم نسب الوكلاء في المحافظات ونسب إعلانات الشركة التابعة.',
    suggestedFiles: [
      {
        id: 'f-wekala-d-1',
        name: 'لائحة عمولات وكلاء منصة وكالة ونسب الإعلانات المقترحة',
        recommendedFileName: 'WeKaLa_Agency_Commission_Structure_2026.docx',
        extension: 'docx',
        importance: 'رئيسي',
        folderType: 'القرارات',
        description: 'تنظيم العلاقة المالية بين وكالة ومشاوير والشركة التابعة الإعلانية.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-wekala-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/03_الملفات_الفنية_Technical',
    displayName: 'وكالة • سورس كود فلاتر والهوية والشعارات',
    projectRef: 'proj-wekala',
    category: 'مشروعات ومنظومات',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/03_WEKALA_FLEET_AGENCIES/03_الملفات_الفنية_Technical/',
    description: 'أصول تطبيق وكالة، الشعارات المفتوحة، وحزم Flutter.',
    suggestedFiles: [
      {
        id: 'f-wekala-t-1',
        name: 'حزمة شعارات وأصول الهوية البصرية لوكالة (Vector Pack)',
        recommendedFileName: 'WeKaLa_Vector_Logos_and_Assets_Pack.zip',
        extension: 'png',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'شعارات SVG و PNG عالية الدقة بألوان المنظومة المعتمدة.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 4. DARO LOGISTICS & CARGO
  // ==========================================
  {
    id: 'folder-daro-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/04_DARO_CARGO_LOGISTICS/01_العقود_Contracts',
    displayName: 'دارو • عقود محطات الشحن والطرود',
    projectRef: 'proj-daro',
    category: 'مشروعات ومنظومات',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/04_DARO_CARGO_LOGISTICS/01_العقود_Contracts/',
    description: 'عقود محطات الشحن ووكلاء النقل والتأمين على البضائع.',
    suggestedFiles: [
      {
        id: 'f-daro-c-1',
        name: 'اتفاقية تشغيل محطات تجميع الطرود وشحن البضائع',
        recommendedFileName: 'Daro_Cargo_Hubs_Operating_Agreement.pdf',
        extension: 'pdf',
        importance: 'رئيسي',
        folderType: 'العقود',
        description: 'شروط الشحن، أوزان الطرود، والتأمين على الشحنات المنقولة.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-daro-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/04_DARO_CARGO_LOGISTICS/02_الملفات_الفنية_Technical',
    displayName: 'دارو • منظومة مسح الباركود وتتبع البوالص',
    projectRef: 'proj-daro',
    category: 'مشروعات ومنظومات',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/04_DARO_CARGO_LOGISTICS/02_الملفات_الفنية_Technical/',
    description: 'مخططات قراءة الباركود وواجهات تتبع مسار الشحنات بين المحافظات.',
    suggestedFiles: [
      {
        id: 'f-daro-t-1',
        name: 'مواصفات تتبع الباركود وماسح محطات التوزيع',
        recommendedFileName: 'Daro_Barcode_Scanner_and_Hub_Architecture.md',
        extension: 'md',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'بوالص الشحن الإلكترونية ونقاط التوزيع والتسليم.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 5. MASHWEER CAPTAIN DRIVER
  // ==========================================
  {
    id: 'folder-driver-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/05_MASHWEER_CAPTAIN_DRIVER/01_العقود_Contracts',
    displayName: 'كابتن مشاوير • عقود السائقين والتأمين',
    projectRef: 'proj-mashweer-driver',
    category: 'مشروعات ومنظومات',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/05_MASHWEER_CAPTAIN_DRIVER/01_العقود_Contracts/',
    description: 'شروط انضمام السائقين، الفحص الجنائي، وتأمين الرحلات.',
    suggestedFiles: [
      {
        id: 'f-driver-c-1',
        name: 'عقد انضمام كابتن مشاوير وشروط الاستخدام المعتمدة',
        recommendedFileName: 'Mashweer_Captain_Terms_of_Service_Agreement.pdf',
        extension: 'pdf',
        importance: 'رئيسي',
        folderType: 'العقود',
        description: 'شروط استخدام تطبيق الكابتن، قواعد السلوك، والتسوية المالية.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-driver-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/05_MASHWEER_CAPTAIN_DRIVER/02_الملفات_الفنية_Technical',
    displayName: 'كابتن مشاوير • مواصفات التتبع و WebSockets',
    projectRef: 'proj-mashweer-driver',
    category: 'مشروعات ومنظومات',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/05_MASHWEER_CAPTAIN_DRIVER/02_الملفات_الفنية_Technical/',
    description: 'بث إحداثيات السائق اللحظية عبر WebSockets وتكامل خرائط الطرق.',
    suggestedFiles: [
      {
        id: 'f-driver-t-1',
        name: 'مواصفات تتبع GPS و WebSockets في تطبيق السائق',
        recommendedFileName: 'Captain_Driver_App_Integration_Spec.md',
        extension: 'md',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'آلية استقبال الرحلات والتكامل مع خادم 4B المخصص.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 6. KAGGLE & UCP-LLM RESEARCH (THE WHITE LION)
  // ==========================================
  {
    id: 'folder-kaggle-contracts',
    folderName: '01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/01_العقود_والشروط_Contracts',
    displayName: 'كاجل والبحث • شروط المسابقة ودعوة Ryan Holbrook',
    projectRef: 'proj-kaggle-gemma-agent',
    category: 'أبحاث كاجل والبروتوكول',
    subType: 'عقود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/01_العقود_والشروط_Contracts/',
    description: 'شروط مسابقة كاجل الرسمية بجوائز 100,000 دولار وموعد 25 نوفمبر 2026.',
    suggestedFiles: [
      {
        id: 'f-kgl-c-1',
        name: 'إيميل وشروط دعوة مسابقة كاجل الرسمية (Ryan Holbrook)',
        recommendedFileName: 'Kaggle_Developer_Agent_Invitation_RyanHolbrook.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'دعوة كاجل لتدريب Gemma 4 أوفلاين على Consumer Hardware وجوائز $100k.',
        status: 'جاهز للإيداع'
      }
    ]
  },
  {
    id: 'folder-kaggle-decisions',
    folderName: '01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/02_القرارات_والأهداف_Decisions',
    displayName: 'كاجل والبحث • خطة مسار الورقة البحثية (Paper Track)',
    projectRef: 'proj-kaggle-gemma-agent',
    category: 'أبحاث كاجل والبروتوكول',
    subType: 'قرارات',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/02_القرارات_والأهداف_Decisions/',
    description: 'خطة استهداف مسار الأوراق البحثية Paper Track ومسار الوكيل الذاتي.',
    suggestedFiles: [
      {
        id: 'f-kgl-d-1',
        name: 'مسودة الورقة البحثية لمسار Paper Track في كاجل',
        recommendedFileName: 'UCP_LLM_Autonomous_Agent_Paper_Track_Draft.docx',
        extension: 'docx',
        importance: 'حرج للغاية',
        folderType: 'القرارات',
        description: 'Cognitive Alignment in Autonomous Software Engineering Agents باستخدام Gemma 4 و UCP-LLM.',
        status: 'قيد الإعداد'
      }
    ]
  },
  {
    id: 'folder-kaggle-technical',
    folderName: '01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/03_الملفات_الفنية_Technical',
    displayName: 'كاجل والبحث • أصول بروتوكول UCP-LLM ومكتبات بايثون',
    projectRef: 'proj-kaggle-gemma-agent',
    category: 'أبحاث كاجل والبروتوكول',
    subType: 'فني وكود',
    path: 'Hypatia_Source/01_PROJECTS_ECOSYSTEM/11_KAGGLE_AND_UCP_LLM_RESEARCH/03_الملفات_الفنية_Technical/',
    description: 'الورقة البحثية الإنجليزية، أداة Eve Edition HTML v1.1.0، كود بايثون وخوارزميات التشفير.',
    suggestedFiles: [
      {
        id: 'f-kgl-t-1',
        name: 'الورقة البحثية الكاملة UCP-LLM (English Version)',
        recommendedFileName: 'UCP_LLM_Research_Paper_English_v1.0.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'الملفات الفنية',
        description: 'البحث الأصلي: User Context Protocol for Large Language Models to Achieve Advanced Cognitive Alignment.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-kgl-t-2',
        name: 'أداة مولد البروتوكول التفاعلية (Eve Edition HTML v1.1.0)',
        recommendedFileName: 'UCP_LLM_Generator_Eve_Edition_v1.1.0.html',
        extension: 'html',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'الأداة التفاعلية لتصدير ملفات JSON و TXT مع المساعد إيف.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-kgl-t-3',
        name: 'مكتبة بايثون وواجهة التشفير السحرية ucp_llm_manager.py',
        recommendedFileName: 'ucp_llm_python_bundle.zip',
        extension: 'md',
        importance: 'رئيسي',
        folderType: 'الملفات الفنية',
        description: 'أكواد ucp_llm.py و ucp_llm_manager.py وخوارزميات Collatz و Magic Square.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-kgl-t-4',
        name: 'قالب البروتوكول العام المعمم (Generic Template v2.0)',
        recommendedFileName: 'UCP_LLM_Generic_Template_v2.0.md',
        extension: 'md',
        importance: 'مساند',
        folderType: 'الملفات الفنية',
        description: 'قالب الـ 25 قسماً لضبط هويات التفكير والسياق العميق للنماذج.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 12. CENTRAL LEGAL CONTRACTS
  // ==========================================
  {
    id: 'folder-central-contracts',
    folderName: '02_CENTRAL_CONTRACTS',
    displayName: 'العقود المركزية والملف القانوني الشامل',
    category: 'العقود المركزية',
    subType: 'عقود',
    path: 'Hypatia_Source/02_CENTRAL_CONTRACTS/',
    description: 'المستودع المركزي لكافة العقود المبرمة، ملف المستشار القانوني أ/ محمد مصطفى، وتوثيق الشهر العقاري.',
    suggestedFiles: [
      {
        id: 'f-cent-c-1',
        name: 'ملف متابعة المستشار القانوني أ/ محمد مصطفى (4 ملفات مفتوحة)',
        recommendedFileName: 'Lawyer_Mohamed_Mostafa_Saturday_Session_Dossier.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'خطوط المحمول، عقد السنترال الأرضي، حساب DNS، وتوثيق التطبيقات بالسجل التجاري.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-c-2',
        name: 'عقود تطوير البرمجيات وحفظ الملكية الفكرية مع قيمة تك',
        recommendedFileName: 'Master_Software_Development_and_IP_Agreements.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العقود',
        description: 'العقود الكاملة وشروط التسليم النهائي للأكواد.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 13. CENTRAL DECISIONS & MEMOS
  // ==========================================
  {
    id: 'folder-central-decisions',
    folderName: '03_CENTRAL_DECISIONS',
    displayName: 'القرارات الإدارية والتنفيذية المركزية',
    category: 'القرارات المركزية',
    subType: 'قرارات',
    path: 'Hypatia_Source/03_CENTRAL_DECISIONS/',
    description: 'سجل القرارات المعتمدة: مذكرات التفويض، مواعيد السبت 26 سبتمبر، ومحاضر الاجتماعات.',
    suggestedFiles: [
      {
        id: 'f-cent-d-1',
        name: 'سجل قرارات ومواعيد السبت التنفيذية (26 سبتمبر 2026)',
        recommendedFileName: 'Saturday_Executive_Decisions_and_Schedule_26Sep.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'القرارات',
        description: 'مكالمة أبو خالد، اجتماع م/ علي الأصدقاء، جلسة المحامي، ومراجعة أ/ هاني.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-d-2',
        name: 'مذكرة تفويض العمل وتسليم المهام التقنية',
        recommendedFileName: 'Technical_Handover_and_Delegation_Protocol.docx',
        extension: 'docx',
        importance: 'حرج للغاية',
        folderType: 'القرارات',
        description: 'بروتوكول تفويض الصلاحيات الفنية واستمرارية العمل.',
        status: 'جاهز للإيداع'
      }
    ]
  },

  // ==========================================
  // 14. CENTRAL QUOTATIONS & SERVERS
  // ==========================================
  {
    id: 'folder-central-quotations',
    folderName: '04_CENTRAL_QUOTATIONS',
    displayName: 'عروض الأسعار وأوامر الشراء المركزية',
    category: 'العروض والمشتريات',
    subType: 'عروض',
    path: 'Hypatia_Source/04_CENTRAL_QUOTATIONS/',
    description: 'المستودع المركزي لعروض الأسعار: خادم 4B مع WE، كاميرات المعادي والعجوزة، وجداول الاشتراكات.',
    suggestedFiles: [
      {
        id: 'f-cent-q-1-vpn',
        name: 'أمر شراء خطوط الربط المجمعة والـ L3VPN بالفايبر (المصرية للاتصالات WE بقيمة 360,000 ج.م)',
        recommendedFileName: 'WE_L3VPN_Fiber_Connectivity_PO_360000EGP.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'أمر الشراء الرسمي المعتمد لخط التجميع الفايبر 24Mbps و 6 خطوط L3VPN فرعية بسرعة 4Mbps مع المهندس أحمد غريب.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-q-1-cloud',
        name: 'أمر شراء خوادم الاستضافة السحابية لـ 4B والـ WAF والباك أب (المصرية للاتصالات WE بقيمة 807,496 ج.م)',
        recommendedFileName: 'WE_4B_Cloud_IaaS_WAF_and_Backup_PO_807496EGP.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'أمر الشراء الرسمي المعتمد لـ 3 خوادم افتراضية (App, DB, Cache) و 20Mbps إنترنت وجدار حماية WAF و 7 حسابات SSL VPN ونسخ احتياطي يومي وأسبوعي.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-q-2',
        name: 'أمر توريد كاميرات المعادي من شركة الأصدقاء (55,050 ج.م)',
        recommendedFileName: 'AlAsdeqaa_Maadi_CCTV_PO_55050EGP.pdf',
        extension: 'pdf',
        importance: 'رئيسي',
        folderType: 'العروض',
        description: 'توريد وتركيب 16 كاميرا مراقبة مع جهاز NVR.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-q-3',
        name: 'جدول الاشتراكات والتجديدات الشهرية والسنوية مع أ/ هاني',
        recommendedFileName: 'Subscriptions_and_Renewals_Master_Ledger_2026.xlsx',
        extension: 'xlsx',
        importance: 'رئيسي',
        folderType: 'العروض',
        description: 'تكاليف ومواعيد تجديد الدومينات والسيرفرات وحسابات البريد.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-cent-q-4',
        name: 'الفاتورة الضريبية الإلكترونية لشراء سيرفر DELL R640 ومحطتي HP Z440 (شركة كيو تي اس)',
        recommendedFileName: 'QTS_Tax_Invoice_DELL_R640_Platinum_and_HP_Z440_96295EGP.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'الفاتورة الضريبية الإلكترونية المعتمدة من ETA بقيمة 96,295.80 ج.م شاملة ضريبة القيمة المضافة لشراء أول سيرفر ركوة حقيقي Dell R640 بلاتينيوم وجهازي عمل HP Z440 لمقر المعادي وغرفة الـ IT.',
        status: 'تم الرفع'
      },
      {
        id: 'f-cent-q-5',
        name: 'الفاتورة الضريبية الإلكترونية لشراء راك بيرلا 27U وعدة فحص الشبكة (رد لاين - البستان)',
        recommendedFileName: 'RedLine_Tax_Invoice_Perla_Rack_27U_and_Testing_Tools_18550EGP.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'الفاتورة الضريبية الإلكترونية المعتمدة من ETA بقيمة 18,550.00 ج.م شاملة ضريبة القيمة المضافة لشراء راك بيرلا 27U عمق 1000 مم وجهاز تتبع واختبار الكابلات I-Pook PK65H وأراجة Root 2*1 لغرفة السيرفرات.',
        status: 'تم الرفع'
      },
      {
        id: 'f-cent-q-6',
        name: 'المخطط المعماري الهندسي المعتمد لمقر المعراج بالمعادي (25.91م × 20.94م)',
        recommendedFileName: 'Mashweer_Maadi_HQ_Architectural_Floorplan_26x21m_Original.pdf',
        extension: 'pdf',
        importance: 'حرج للغاية',
        folderType: 'العروض',
        description: 'الرسم المعماري الأصلي لمقر المعادي موضحاً مكاتب 1 حتى 7 والقاعة الكبرى وغرفة السيرفرات ودورات المياه وتوزيع الكاميرات الـ 16 ونقاط الشبكة.',
        status: 'تم الرفع'
      }
    ]
  },

  // ==========================================
  // 15. MASTER KNOWLEDGE VAULT
  // ==========================================
  {
    id: 'folder-master-log-vault',
    folderName: '05_MASTER_KNOWLEDGE_VAULT',
    displayName: 'السجل التاريخي الشامل وخارطة المعرفة',
    category: 'السجل الشامل',
    subType: 'شامل',
    path: 'Hypatia_Source/05_MASTER_KNOWLEDGE_VAULT/',
    description: 'السجل الشامل المحدث باستمرار لكل كلمة ومناقشة وقرار ومواصفات معمارية.',
    suggestedFiles: [
      {
        id: 'f-mst-1',
        name: 'السجل التاريخي الشامل لمنظومات مشاوير ونوب والأبحاث 2026',
        recommendedFileName: 'MASTER_PROJECT_SOURCE_LOG_2026.md',
        extension: 'md',
        importance: 'حرج للغاية',
        folderType: 'سجل شامل',
        description: 'الملف الجامع المحدث لكل المراسلات، الأجندة، مسابقة كاجل، وأوراق UCP-LLM.',
        status: 'جاهز للإيداع'
      },
      {
        id: 'f-mst-2',
        name: 'خارطة التبعيات المعمارية والأنظمة التقنية الموحدة',
        recommendedFileName: 'System_Architecture_Dependencies_Map.json',
        extension: 'json',
        importance: 'رئيسي',
        folderType: 'سجل شامل',
        description: 'ملف JSON يربط المشاريع الـ 11 بالخوادم، بوابات الدفع، وقواعد البيانات ومستودعات الأكواد.',
        status: 'جاهز للإيداع'
      }
    ]
  }
];

// Master Markdown Log Text that compiles everything discussed
export const MASTER_PROJECT_LOG_CONTENT = `# السجل الشامل للأصول والمشاريع والمعرفة (MASTER HYPATIA SOURCE LOG 2026)
**المجلد الرئيسي المعتمد على Google Drive:** \`Hypatia_Source\`  
**المهندس المشرف:** م/ سامح ياسين - مدير التكنولوجيا  
**المساعد الذكي:** هيباتيا (Hypatia Platform Engine)  
**تاريخ آخر تحديث:** 26 سبتمبر 2026  

---

## 1. الهيكلية السحابية المعتمدة (Hypatia_Source)
تم تنظيم مستودع الأصول والمزامنة المركزية على Google Drive تحت المجلد الرئيسي:
\`Hypatia_Source/\`
* **01_PROJECTS_ECOSYSTEM/**: تفريعات المشاريع الـ 11 وتفرعات فرعية لكل مشروع:
  - \`01_العقود_Contracts/\`
  - \`02_القرارات_Decisions/\`
  - \`03_العروض_Quotations/\`
  - \`04_المذكرات_Memos/\`
  - \`05_الملفات_الفنية_Technical/\`
* **02_CENTRAL_CONTRACTS/**: العقود والاتفاقيات القانونية المركزية.
* **03_CENTRAL_DECISIONS/**: القرارات الإدارية والتنفيذية ومحاضر الاجتماعات.
* **04_CENTRAL_QUOTATIONS/**: عروض الأسعار وأوامر التوريد والاشتراكات.
* **05_MASTER_KNOWLEDGE_VAULT/**: السجل الشامل وخارطة التبعيات البرمجية.

---

## 2. مسابقة كاجل الدولية ومشروع البحث الشخصي رقم 11 (Kaggle & UCP-LLM)
* **اسم المشروع:** مسابقة كاجل والبروتوكول الذكي (Kaggle Gemma 4 Developer Agent & Protocol) - كود: \`KAGGLE-GEMMA\`.
* **الجهة الراعية:** Kaggle (عبر Ryan Holbrook - Kaggle Data Scientist).
* **طبيعة المشروع:** مشروع شخصي وبحثي مستقل لـ م/ سامح ياسين، مستقل تماماً عن الكيانات التجارية.
* **إجمالي الجوائز:** 100,000 دولار أمريكي ($100,000).
* **الموعد النهائي لتسليم الحل والأوراق البحثية:** 25 نوفمبر 2026 (November 25, 2026).
* **المحاور الفنية للمنافسة:**
  1. تدريب بعدي (Post-training) لنموذج **Gemma 4** باستخدام الـ Fine-tuning والتعلم التعزيزي (Reinforcement Learning).
  2. تشغيل الوكيل محلياً **Offline على عتاد المستهلكين (Consumer Hardware)** بدون الحاجة لـ Massive Cloud APIs.
  3. تمكين الوكيل من فحص وتصفح مستودعات الأكواد (Repository Navigation) وصياغة الحلول البرمجية والاختبارات ذاتياً.
  4. **دمج بروتوكول UCP-LLM الخاص بـ م/ سامح:** توظيف الورقة البحثية وأداة توليد البروتوكول (Eve Edition v1.1.0) ومكتبات بايثون وخوارزميات التشفير (Magic Square & Collatz) لبناء توافق معرفي وإرشادي للوكيل لمنع التشتت والهلوسة.
  5. ربط المعمارية مع مواصفات **Model Context Protocol (MCP)** الحديثة.

---

## 3. مقترح تأسيس الشركة التابعة لشركة مشاوير (أبو خالد)
* **الموضوع:** إنشاء شركة جديدة تابعة لشركة مشاوير للمنصات الرقمية كذراع تكنولوجي ورقمي وإبداعي.
* **الأهداف العشرة المعتمدة:**
  1. تجميع الأعمال التكنولوجية والرقمية تحت سقف واحد.
  2. تجهيز ومتابعة ملفات التطبيقات والأسماء والعلامات.
  3. تنظيم وإدارة الأصول الرقمية (الدومينات، البريد، الحسابات).
  4. توفير التصميمات والهوية البصرية والـ UI/UX والمحتوى الإعلاني.
  5. خدمة مشروعات وتطبيقات مشاوير بصورة مستمرة.
  6. تقديم الخدمات الإعلانية والتصميمية لعملاء ومعلني منصة "وكالة" مقابل عائد.
  7. التوسع المستقبلي في خدمة عملاء ومشروعات خارج المجموعة كمصدر دخل إضافي.
  8. تنظيم العلاقة القانونية بحيث تظل مشاوير هي المالك الرئيسي للتطبيقات.
  9. تحويل جزء من مصاريف الموردين الخارجيين إلى استثمار يبني أصولاً وفريقاً وقيمة سوقية.
  10. المرونة في التوسع التدريجي مع نمو الأعمال.
* **الهيكل المقترح المبدئي:** 4 أساسيين + 2 مساعدين، ومقر مؤقت بالمعادي قرب شركة مشاوير.

---

## 4. التطبيقات والمشاريع الـ 11 المعتمدة بالمنظومة
1. **نوب سبورتس (NOUB Sports - NOUB-SPORTS):** منظومة الأنشطة الرياضية والفروسية والسباحة وحسابات ELO.
2. **نوب الأساسي (NOUB Main - NOUB-MAIN):** المنصة الشاملة لإدارة العضويات وقواعد بيانات Supabase.
3. **غرفة عمليات ومراقبة برنامج 4B (4B Operations NOC):** مراقبة خطوط الربط المباشرة مع المصرية للاتصالات WE وسيرفر 4B وأجهزة التتبع.
4. **لعبة نوب (NOUB Game - NOUB-GAME):** ألغاز الـ 62 مقبرة في وادي الملوك ونظام الجوائز والكنوز.
5. **تطبيق فور بي (4B Passenger - 4B):** تطبيق الركاب وحجز الرحلات، خادم WE، وحزمة APK v1.4.2.
6. **تطبيق وكالة (WeKaLa - WEKALA):** إدارة الوكلاء، الأساطيل، والعمولات وسورس كود فلاتر.
7. **تطبيق دارو (Daro Logistics - DARO):** شحنات البضائع والطرود، محطات الشحن، وماسح الباركود.
8. **بوابة الدفع والفوترة (PayCore - PAY):** محرك المحافظ والربط المالي وشهادات الأمان.
9. **كابتن مشاوير (Mashweer Driver - DRIVER):** تطبيق السائقين واستقبال الرحلات وتتبع الـ GPS.
10. **مطعم المشويات بالعجوزة (Restaurant POS - REST-POS):** إدارة الكاشير و 14 كاميرا مراقبة مع شركة الأصدقاء وأ/ هاني.
11. **مسابقة كاجل والبروتوكول الذكي (Kaggle Gemma 4 & Protocol - KAGGLE-GEMMA):** المشروع البحثي للوكيل البرمجي المستقل.

---

## 5. المشتريات وعروض الأسعار المعتمدة
* **عرض خادم 4B مع المصرية للاتصالات WE:** خادم Dedicated Ubuntu Server (8,500 ج.م/شهرياً) لتشغيل PostGIS و Redis و Nginx.
* **عرض كاميرات المعادي (شركة الأصدقاء - م/ علي):** 16 كاميرا مراقبة + جهاز NVR بتكلفة إجمالية 55,050 ج.م (خيار الـ 5MP بضمان شامل).
* **سجل الاشتراكات والتجديدات:** متابعة تجديدات الدومينات والسيرفرات مع أ/ هاني عبد الفتاح.

---

## 6. الأجندة التنفيذية والملف القانوني (السبت 26 سبتمبر)
* 10:00 ص: مكالمة أ/ أبو خالد ومناقشة مذكرة الشركة التابعة.
* 11:30 ص: اجتماع م/ علي (شركة الأصدقاء) لتأكيد خيار كاميرات المعادي ومطعم العجوزة.
* 01:00 م: جلسة المستشار القانوني أ/ محمد مصطفى (عقد قيمة تك، ميزانية 4B، وشهادات الشهر العقاري).
* 03:00 م: تقرير الاشتراكات واعتماد سيرفر 4B مع أستاذ هاني عبد الفتاح.
`;
