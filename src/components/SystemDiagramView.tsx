import React, { useState, useMemo } from 'react';
import { requestDriveAccessToken, clearDriveAccessToken } from '../lib/firebase';
import { 
  Network, 
  Layers, 
  Share2, 
  Download, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeftRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  Check, 
  X, 
  Search, 
  SlidersHorizontal,
  FolderDown,
  Info
} from 'lucide-react';

export interface SystemNode {
  id: string;
  label: string;
  role: string;
  category: 'leadership' | 'operations' | 'hardware_hq' | 'telecom' | 'cloud_hosting' | 'apps' | 'regulation' | 'vendor_dev';
  icon: string;
  status: string;
  statusColor: 'emerald' | 'amber' | 'blue' | 'purple' | 'rose';
  inputs?: string[];
  outputs?: string[];
  missingOrPending: string[];
  description: string;
}

export interface SynapseLink {
  from: string;
  to: string;
  label: string;
}

export const SYSTEM_NODES: SystemNode[] = [
  // 1. LEADERSHIP & MANAGEMENT
  {
    id: 'node-sameh',
    label: 'م/ سامح',
    role: 'مسؤول التكنولوجيا والتشغيل',
    category: 'leadership',
    icon: '👨‍💼',
    status: 'متابعة المشاريع والقرارات اليومية',
    statusColor: 'emerald',
    inputs: ['اجتماعات المطورين', 'تقارير الميدان', 'عروض WE وفوري', 'تنسيق م/ عماد'],
    outputs: ['قرارات العتاد والمشتريات', 'متابعة مهام التطوير', 'تجهيزات المقر', 'توجيه العمليات'],
    missingOrPending: [
      'جولة شراء أجهزة وسيرفر وسط البلد مع م/ عماد',
      'متابعة 4 ملفات مع المحامي أ/ محمد مصطفى',
      'حسم خيار كاميرات المراقبة (2 ميجا vs 5 ميجا) مع أبو خالد',
      'إبلاغ م/ عماد بطلب تثبيت وإعداد السوفت وير من WE'
    ],
    description: 'المتابعة المباشرة لكافة النواحي التقنية والتنفيذية وتجهيزات مقر المعادي.'
  },
  {
    id: 'node-eng-emad',
    label: 'م/ عماد الشرقاوي',
    role: 'استشاري تقني أول',
    category: 'leadership',
    icon: '👨‍💻',
    status: 'خطة تأسيس وتوصيل المقر (3 أشهر)',
    statusColor: 'emerald',
    inputs: ['إيميلات وعروض المصرية للاتصالات WE', 'تنسيق م/ سامح', 'المواصفات الفنية'],
    outputs: ['تدقيق سيرفرات واستضافة WE', 'خطة ربط المقر بالجهات الرسمية', 'الاستشارات الهندسية'],
    missingOrPending: [
      'معاينة مقر المعادي السبت 12:00 م',
      'شراء السيرفر و 4-5 أجهزة استيراد من وسط البلد',
      'مراجعة إيميل طلب تثبيت البرمجيات من المصرية للاتصالات'
    ],
    description: 'يقود مع م/ سامح خطة تأسيس المقر وتجهيزات السيرفرات والربط مع الجهات المعنية.'
  },
  {
    id: 'node-abu-khaled',
    label: 'أبو خالد',
    role: 'مالك ومستثمر الشركة',
    category: 'leadership',
    icon: '👑',
    status: 'القرارات الاستراتيجية والتمويل',
    statusColor: 'purple',
    inputs: ['تقارير أ/ هاني', 'ملاحظات م/ سامح', 'عروض الأسعار المعتمدة'],
    outputs: ['اعتمادات الميزانية', 'القرارات العليا', 'متابعة مطعم المشويات بالعجوزة'],
    missingOrPending: [
      'مكالمة صباح السبت 10:00 ص لمناقشة تقرير تطبيق الوكالة',
      'حسم اختيار كاميرات المراقبة (2 ميجا vs 5 ميجا)',
      'توقيع أوراق الـ DNS مع المحامي أ/ محمد مصطفى'
    ],
    description: 'المالك والمستثمر الرئيسي؛ يشرف على القرارات العامة وملف مطعم المشويات بالتنسيق مع أ/ هاني وم/ سامح.'
  },
  {
    id: 'node-lawyer-mohamed-mostafa',
    label: 'أ/ محمد مصطفى',
    role: 'المستشار القانوني للشركة',
    category: 'leadership',
    icon: '⚖️',
    status: 'متابعة 4 ملفات تأسيس وتوثيق',
    statusColor: 'amber',
    inputs: ['توكيلات وأوراق أبو خالد', 'طلبات م/ سامح التقنية', 'عقود الشركة'],
    outputs: ['خطوط الموبايل الرسمية', 'الخطوط الأرضية بالسنترال', 'توثيق التطبيقات بالسجل التجاري'],
    missingOrPending: [
      'شراء خطين موبايل رسميين للشركة',
      'التعاقد على الخطوط الأرضية لمقر المعادي',
      'استكمال حساب الـ DNS وأوراق أبو خالد',
      'توثيق التطبيقات بالشهر العقاري والسجل التجاري'
    ],
    description: 'المستشار القانوني المسؤول عن الإجراءات الحكومية، السجل التجاري، توثيق التطبيقات، والتعاقدات الرسمية.'
  },
  {
    id: 'node-hany-cfo',
    label: 'أ/ هاني',
    role: 'المدير المالي (CFO)',
    category: 'leadership',
    icon: '💼',
    status: 'إشراف مالي ومتابعة مطعم العجوزة',
    statusColor: 'blue',
    inputs: ['فواتير WE والإيميلات', 'تقارير فوري', 'عروض أسعار م/ علي للمطعم'],
    outputs: ['تسويات فوري', 'سداد الاشتراكات', 'متابعة سيستم وكاميرات مطعم العجوزة'],
    missingOrPending: [
      'إصدار تقرير تطبيق الوكالة بالتعاون مع م/ سامح وأبو خالد',
      'متابعة ومراجعة عروض أسعار مطعم المشويات بالعجوزة مع م/ علي',
      'مراجعة شروط عقد التاجر مع فوري'
    ],
    description: 'المسؤول المالي لشركة مشاوير، والمتابع لتفاصيل مشروع مطعم العجوزة المالي والميداني.'
  },

  // 2. OPERATIONS & MAADI HQ TEAM
  {
    id: 'node-amr-mowaffaq',
    label: 'أ/ موفق و أ/ عامر و أ/ عمرو',
    role: 'فريق العمليات والميدان',
    category: 'operations',
    icon: '🎖️',
    status: 'جاهزون للمعاينة والتشغيل',
    statusColor: 'emerald',
    inputs: ['توجيهات م/ سامح', 'تطبيقات الميدان', 'لوحة التحكم'],
    outputs: ['متابعة خدمة العملاء', 'إدارة حركة الكباتن', 'معاينة المقر'],
    missingOrPending: [
      'مقابلة السبت 11:30 ص عند مقر المعادي',
      'استلام الأجهزة والسيرفر الجديد وتجهيز أماكن العمل',
      'استلام وتفعيل الإيميلات الرسمية فور سداد الفاتورة'
    ],
    description: 'فريق العمليات الميدانية والتشغيل ومتابعة حركة الكباتن والخدمة.'
  },
  {
    id: 'node-support-team',
    label: 'فريق خدمة العملاء والكول سنتر (5 موظفين)',
    role: 'دعم الركاب وتوجيه الكباتن والشكاوى',
    category: 'operations',
    icon: '🎧',
    status: 'بانتظار استكمال الأجهزة غداً',
    statusColor: 'amber',
    inputs: ['اتصالات الركاب', 'بلاغات SOS', 'شكاوى الكباتن'],
    outputs: ['حل النزاعات والشكاوى', 'تقارير يومية لموفق وعمرو'],
    missingOrPending: [
      'شراء 5 أجهزة Dell OptiPlex المخصصة لهم غداً',
      'توزيع خطوط تليفونات IP وتوصيل كابلات CAT6 بالسقف'
    ],
    description: 'العصب الميداني لخدمة العملاء في صالة العمليات بمقر المعادي على مدار الـ 24 ساعة.'
  },
  {
    id: 'node-data-analyst',
    label: 'محلل البيانات وإعداد التقارير (1 موظف)',
    role: 'تحليل الخرائط الحرارية ومعدل الإلغاء',
    category: 'operations',
    icon: '📊',
    status: 'جهازه يعمل اليوم بالمقر',
    statusColor: 'blue',
    inputs: ['قاعدة بيانات PostgreSQL', 'سجلات رحلات 4B'],
    outputs: ['خرائط الطلب الحرارية', 'حوافز وأداء الكباتن', 'مؤشرات الإلغاء'],
    missingOrPending: [
      'استلام إيميل العمل الرسمي',
      'صلاحيات القراءة المباشرة (Read-Replica) من داتابيز 4B'
    ],
    description: 'تحويل أرقام وتوقيتات الرحلات إلى قرارات تشغيلية لزيادة أرباح المنظومة وتقليل الإلغاء.'
  },

  // 3. PHYSICAL HARDWARE & HQ INFRASTRUCTURE
  {
    id: 'node-maadi-hardware',
    label: 'عتاد مقر المعادي (8 أجهزة Dell + راك 140سم)',
    role: 'البنية الفيزيائية ومحطات العمل',
    category: 'hardware_hq',
    icon: '🖥️',
    status: '3 شغالين اليوم | 5 شراء غداً',
    statusColor: 'purple',
    inputs: ['ميزانية سامح', 'توريدات سوق العصر'],
    outputs: ['محطات عمل الموظفين الـ 8', 'سيرفر الراك المحلي'],
    missingOrPending: [
      'شراء 5 كيسات Dell OptiPlex غداً واستكمال شاشات العرض',
      'تثبيت سيرفر الباك أب المحلي داخل راك الـ 140 سم',
      'تحديد عدد كاميرات المقر لتوريدها مع المهندس علي'
    ],
    description: 'أجهزة ديسكتوب قوية بنظام Windows 11 Pro و NVMe متصلة سلكياً لضمان استقرار العمليات دون انقطاع.'
  },
  {
    id: 'node-cat6-network',
    label: 'كابلات CAT6 وسويتش PoE 24-Port',
    role: 'الشبكة السلكية بالسقف المعلق',
    category: 'hardware_hq',
    icon: '🔌',
    status: 'تمديد الكابلات قيد التنفيذ',
    statusColor: 'amber',
    inputs: ['روتر فايبر WE', 'سويتش الـ PoE المدار'],
    outputs: ['منافذ شبكة الـ 8 أجهزة', 'تليفونات السنترال IP', 'كاميرات المراقبة الموحدة'],
    missingOrPending: [
      'إنهاء تمديد وتأريج الكابلات داخل السقف المعلق للراك',
      'توصيل منافذ الكاميرات وتليفونات الـ IP'
    ],
    description: 'سرعة 1 جيجابت مستقرة في كل نقطة عمل دون أدنى تأخير بالصوت أو الخرائط أو البث.'
  },
  {
    id: 'node-local-backup-server',
    label: 'سيرفر الباك أب المحلي بالراك (Local Vault)',
    role: 'خزنة النسخ الاحتياطي التلقائي الفيزيائية',
    category: 'hardware_hq',
    icon: '🗄️',
    status: 'شراء وتجهيز غداً',
    statusColor: 'rose',
    inputs: ['داتابيز سيرفرات WE', 'سحابة كلاوديناري', 'مستودعات Git'],
    outputs: ['نسخ احتياطية فيزيائية مشفرة داخل المقر (NAS)'],
    missingOrPending: [
      'شراء جهاز السيرفر وتجهيز كود السحب الآلي اليومي في 3:00 ص'
    ],
    description: 'ضمان امتلاك الشركة لنسخة محلية فيزيائية من كل بايت وقاعدة بيانات دون الاعتماد الحصري على السحاب.'
  },

  // 4. TELECOMMUNICATIONS & EMAILS
  {
    id: 'node-official-emails',
    label: 'البريد الرسمي (6 إيميلات مشاوير)',
    role: 'الهوية المؤسسية للموظفين',
    category: 'telecom',
    icon: '✉️',
    status: 'تم الطلب - بانتظار الفاتورة',
    statusColor: 'amber',
    inputs: ['دومين 4b-app.com'],
    outputs: ['إيميلات سامح، عمرو، موفق، الدعم، والمحلل'],
    missingOrPending: [
      'وصول الفاتورة وسدادها إلكترونياً فوراً لتفعيل الحسابات'
    ],
    description: 'قنوات المراسلات الرسمية لتوثيق العقود والتخاطب مع الجهات الحكومية والشركاء.'
  },
  {
    id: 'node-broadnet-sms',
    label: 'بوابة الرسائل المحلية BroadNet (حساب mashawer)',
    role: 'إرسال كود الـ OTP المحلي داخل مصر',
    category: 'telecom',
    icon: '💬',
    status: 'نشط (25 رصيد تجريبي)',
    statusColor: 'emerald',
    inputs: ['خط فودافون المخصص'],
    outputs: ['رسائل OTP كباتن وركاب 4B الموثوقة'],
    missingOrPending: [
      'تسليم أرقام فودافون للمهندسة المسؤولة لتفعيل Sender ID المعتمد'
    ],
    description: 'مسار الرسائل القومي السريع لضمان وصول كود التحقق في 3 ثوانٍ والامتثال لضوابط الاتصالات.'
  },
  {
    id: 'node-twilio-sms',
    label: 'بوابة Twilio (خط هاتف جديد)',
    role: 'رسائل OTP لتطبيقي وكالة وداره',
    category: 'telecom',
    icon: '📲',
    status: 'الخط متاح - بانتظار التسجيل',
    statusColor: 'blue',
    inputs: ['خط الشريحة الجديد'],
    outputs: ['رسائل OTP وكالة وداره'],
    missingOrPending: [
      'التسجيل واستخراج Account SID و Auth Token للمطور'
    ],
    description: 'فصل بوابات الرسائل لضمان استقلالية تكاليف وحسابات كل تطبيق.'
  },

  // 5. CLOUD, HOSTING & REGULATION
  {
    id: 'node-telecom-we',
    label: 'المصرية للاتصالات (WE Cloud Datacenter)',
    role: 'الاستضافة السحابية وخط الربط القومي المشفر',
    category: 'cloud_hosting',
    icon: '🏢',
    status: 'تم استلام العرض المالي وجاري الفحص',
    statusColor: 'emerald',
    inputs: ['كراسة المواصفات الفنية', 'اعتماد 10 MB تدفق و 1 شهر باك أب'],
    outputs: ['3 سيرفرات (App, DB, Cache) + F5 WAF', 'خط ربط LTRA'],
    missingOrPending: [
      'مراجعة تكلفة السيرفرات الشهرية ورسوم ترخيص الـ F5 مع م/ عماد',
      'التحقق من إدراج خط الـ MPLS التبادلي والجدول الزمني لتشغيل السيرفرات'
    ],
    description: 'استضافة سيادية داخل مصر بمركز بيانات القرية الذكية مطابقة للاشتراطات الأمنية الحكومية وقانون النقل الذكي.'
  },
  {
    id: 'node-ltra-gov',
    label: 'جهاز تنظيم النقل البري (LTRA)',
    role: 'الجهة المنظمة للنقل الذكي وقانون 87/2018',
    category: 'regulation',
    icon: '🏛️',
    status: 'تم تقديم الخطاب الرسمي (كتاب 1422)',
    statusColor: 'blue',
    inputs: ['سيرفرات WE وخط الربط المشفر المباشر'],
    outputs: ['رخصة تشغيل مشاوير و 4B الرسمية على الطرق'],
    missingOrPending: [
      'ربط بروتوكول الأمان وتفتيش السيرفرات بعد استلام بيئة WE'
    ],
    description: 'الغطاء القانوني الكامل والترخيص القومي لحماية أسطول وكباتن مشاوير على الطرق.'
  },
  {
    id: 'node-fawry',
    label: 'بوابة فوري (Fawry Payments & Payouts)',
    role: 'تحصيل الكروت وصرف أرباح الكباتن',
    category: 'cloud_hosting',
    icon: '💳',
    status: 'إجراءات التعاقد والتكامل المالي',
    statusColor: 'blue',
    inputs: ['حساب بنك الشركة', 'تطبيق 4B'],
    outputs: ['تسويات الكباتن اللحظية وكارت ميزة'],
    missingOrPending: [
      'استلام الـ Merchant ID و Sandbox Keys لربطها بالكود'
    ],
    description: 'العمود الفقري للسيولة النقدية وسحب الكباتن لمستحقاتهم من أي ماكينة فوري.'
  },
  {
    id: 'node-cloudinary',
    label: 'سحابة Cloudinary للوسائط المشفرة',
    role: 'حفظ مستندات ورخص وبطاقات الكباتن',
    category: 'cloud_hosting',
    icon: '☁️',
    status: 'ضبط التوقيع المشفر HMAC',
    statusColor: 'emerald',
    inputs: ['تطبيق كابتن 4B ووكالة وداره'],
    outputs: ['روابط مشفرة محددة الصلاحية للداشبورد'],
    missingOrPending: [
      'إلزام المطور بالروابط الموقعة حصراً لحماية بيانات الكباتن'
    ],
    description: 'منع تسريب البطاقات الشخصية تطبيقاً لقانون حماية البيانات الشخصية رقم 151/2018.'
  },

  // 6. APPS & VENTURES
  {
    id: 'node-app-4b',
    label: 'تطبيق 4B للركاب والأسطول',
    role: 'المنصة الرئيسية للرحلات والمزايدة',
    category: 'apps',
    icon: '🚗',
    status: 'قيد التجربة الميدانية | فيجما 95%',
    statusColor: 'emerald',
    inputs: ['BroadNet OTP', 'سيرفر WE', 'فوري', 'عمرو وموفق'],
    outputs: ['رحلات حية للركاب والكباتن في مصر'],
    missingOrPending: [
      'فحص هيكل الداتابيز PostGIS مع المطور',
      'حسم شركة الدعاية والتسويق غداً',
      'استلام شهادة المنشأ المختومة لدومين 4b.com.eg'
    ],
    description: 'مشروع الإطلاق الفوري وحصان الرهان الأول لشركة مشاوير.'
  },
  {
    id: 'node-app-wikala',
    label: 'منصة وتطبيق وكالة (WiKaLa Agency)',
    role: 'لوجستيات الوكالات والمكاتب الإقليمية',
    category: 'apps',
    icon: '📦',
    status: 'داشبورد Vercel مدققة | APK مستلم | فيجما 80%',
    statusColor: 'emerald',
    inputs: ['Twilio OTP', 'MongoDB', 'Agora VoIP', 'لوحة https://wikala-admin-panel.vercel.app/login'],
    outputs: ['إدارة أساطيل المكاتب والعمولات'],
    missingOrPending: [
      'تجربة صلاحيات تسجيل الدخول على رابط Vercel المباشر',
      'أرشفة تقرير فحص الداشبورد مع توصيات سامح في النظام',
      'شهادة المنشأ لدومين wikala.com.eg'
    ],
    description: 'تطبيق إسناد الكباتن لمكاتب ووكالات النقل الإقليمية بنظام اقتسام الأرباح مع لوحة تحكم حية.'
  },
  {
    id: 'node-app-daro',
    label: 'تطبيق داره السوبر آب (Daro Super App)',
    role: 'سوبر آب الشحن السريع وبوالص الباركود',
    category: 'apps',
    icon: '🚚',
    status: 'قيد التطوير | فيجما 70%',
    statusColor: 'amber',
    inputs: ['Twilio OTP', 'بوالص الشحن الرقمية', 'المطور'],
    outputs: ['شحن الطرود والبضائع والتحصيل عند الاستلام'],
    missingOrPending: [
      'استكمال باقي شاشات الفيجما للخدمات المتعددة',
      'اختبار ماسح الباركود الرقمي للبوالص',
      'شهادة المنشأ لدومين daro.com.eg'
    ],
    description: 'سوبر آب متعدد الخدمات لنقل الطرود والبضائع بين المحافظات.'
  },
  {
    id: 'node-restaurant-pos',
    label: 'مطعم المشويات بالعجوزة (Agouza Grill & POS)',
    role: 'مشروع الضيافة وإدارة المطعم ونقاط البيع',
    category: 'apps',
    icon: '🍽️',
    status: 'تم استلام عروض الأسعار (السيستم والكاميرات)',
    statusColor: 'amber',
    inputs: ['عرض أسعار السيستم من م/ علي', 'عرض أسعار كاميرات المطعم', 'متابعة أستاذ هاني وأبو خالد'],
    outputs: ['تشغيل مطعم المشويات', 'توحيد كاميرات المقر مع المطعم عبر م/ علي'],
    missingOrPending: [
      'مراجعة العرض المالي لسيستم المطعم ودرج الكاشير وطابعات الفواتير مع أستاذ هاني',
      'اعتماد عرض تركيب كاميرات المطعم وتوريد كاميرات المعادي بنفس المواصفات'
    ],
    description: 'مشروع مطعم المشويات بالعجوزة؛ يتابعه حصرياً أستاذ هاني وأبو خالد، مع الاستفادة من توحيد مورد كاميرات المطعم لمقر المعادي عبر البشمهندس علي ("تبقى الدنيا كلها واحد").'
  },
  {
    id: 'node-eng-ali',
    label: 'بشمهندس علي (Eng. Ali - توريدات)',
    role: 'شريك عتاد المطاعم ونظام الكاميرات الموحد',
    category: 'vendor_dev',
    icon: '🛠️',
    status: 'تم تقديم عروض الأسعار',
    statusColor: 'blue',
    inputs: ['طلبات أستاذ هاني وأبو خالد للمطعم', 'مواصفات كاميرات المعادي من سامح'],
    outputs: ['سيستم المطعم والكاشير', 'كاميرات مطعم العجوزة', 'كاميرات مراقبة مقر المعادي'],
    missingOrPending: [
      'اعتماد عروض الأسعار المستلمة وبدء التوريد',
      'تحديد عدد ومواضع كاميرات مقر المعادي للتوريد والتركيب الموحد'
    ],
    description: 'شريك التوريدات المتخصص لأنظمة المطاعم والكاشير، والمورد المعتمد لكاميرات المراقبة الموحدة لمطعم العجوزة ومقر المعادي.'
  },

  // 7. DEVELOPER & MARKETING
  {
    id: 'node-dev-vendor',
    label: 'المطور البرمجي الخارجي (Vendor)',
    role: 'المسؤول عن تسليم الأكواد و 20 مهمة',
    category: 'vendor_dev',
    icon: '👨‍💻',
    status: '20 مهمة (3-4 غداً، 6 الأسبوع القادم)',
    statusColor: 'amber',
    inputs: ['ملاحظات سامح الفنية', 'مفاتيح الربط'],
    outputs: ['تطبيقات 4B ووكالة وداره ولوحات التحكم'],
    missingOrPending: [
      'تسليم ملف جدول المهام الـ 20 غداً',
      'تسليم مسودة هيكل الداتابيز Prisma/SQL للمراجعة',
      'تقديم شهادات المنشأ المختومة لدومينات com.eg'
    ],
    description: 'الجهة البرمجية المطورة التي نراجع ونفحص تسليماتها الفنية بدقة بالغة.'
  },
  {
    id: 'node-marketing-agency',
    label: 'شركة الدعاية والتسويق لـ 4B',
    role: 'صناعة الهوية والحملات الرقمية والريلز',
    category: 'operations',
    icon: '📢',
    status: 'حسم التعاقد غداً',
    statusColor: 'purple',
    inputs: ['هوية 4B', 'توجيهات سامح وعمرو وموفق'],
    outputs: ['ريلز إنستجرام وفيسبوك', 'حملات استقطاب الكباتن والركاب'],
    missingOrPending: [
      'حسم المفاضلة بين الوكالات الإعلانية غداً وتوقيع العقد'
    ],
    description: 'شريك الدعاية والإعلان المسؤول عن إطلاق الحملات التسويقية والريلز الفيروسية.'
  }
];

export const SYNAPSES: SynapseLink[] = [
  { from: 'node-sameh', to: 'node-eng-emad', label: 'استشارة فنية وخطة تأسيس المقر 3 أشهر' },
  { from: 'node-eng-emad', to: 'node-telecom-we', label: 'فحص العرض المالي وسيرفرات WE' },
  { from: 'node-eng-emad', to: 'node-maadi-hardware', label: 'تأسيس وتوصيل المقر بالجهات' },
  { from: 'node-abu-khaled', to: 'node-hany-cfo', label: 'إدارة واستثمار مطعم المشويات بالعجوزة' },
  { from: 'node-hany-cfo', to: 'node-restaurant-pos', label: 'متابعة حصرية للسيستم والكاميرات' },
  { from: 'node-eng-ali', to: 'node-restaurant-pos', label: 'عروض أسعار وتوريد السيستم والكاشير والكاميرات' },
  { from: 'node-eng-ali', to: 'node-maadi-hardware', label: 'توريد كاميرات مراقبة مقر المعادي بنفس المواصفات' },
  { from: 'node-sameh', to: 'node-amr-mowaffaq', label: 'إشراف تشغيلي مباشر' },
  { from: 'node-sameh', to: 'node-hany-cfo', label: 'تنسيق مالي وإداري' },
  { from: 'node-sameh', to: 'node-dev-vendor', label: 'إدارة 20 مهمة برمجية وفحص الكود' },
  { from: 'node-sameh', to: 'node-telecom-we', label: 'متابعة السيرفرات والعرض المالي' },
  { from: 'node-amr-mowaffaq', to: 'node-support-team', label: 'إدارة 5 كول سنتر وخدمة عملاء' },
  { from: 'node-amr-mowaffaq', to: 'node-data-analyst', label: 'إدارة محلل البيانات والتقارير' },
  { from: 'node-amr-mowaffaq', to: 'node-app-4b', label: 'تشغيل غرفة عمليات 4B الميدانية' },
  { from: 'node-maadi-hardware', to: 'node-support-team', label: 'أجهزة ديل المخصصة للموظفين' },
  { from: 'node-maadi-hardware', to: 'node-cat6-network', label: 'اتصال سلكي Gigabit عبر السقف' },
  { from: 'node-cat6-network', to: 'node-local-backup-server', label: 'توصيل بالخزنة المحلية بالراك' },
  { from: 'node-local-backup-server', to: 'node-telecom-we', label: 'سحب باك أب ليلي آلي 3:00 ص' },
  { from: 'node-broadnet-sms', to: 'node-app-4b', label: 'إرسال OTP محلي باسم مشاوير' },
  { from: 'node-twilio-sms', to: 'node-app-wikala', label: 'إرسال OTP لتطبيق وكالة' },
  { from: 'node-twilio-sms', to: 'node-app-daro', label: 'إرسال OTP لتطبيق داره' },
  { from: 'node-telecom-we', to: 'node-ltra-gov', label: 'خط ربط أمني مشفر وفق القانون' },
  { from: 'node-telecom-we', to: 'node-app-4b', label: 'استضافة الباك إند والداتابيز' },
  { from: 'node-fawry', to: 'node-app-4b', label: 'مدفوعات الركاب وسحب أرباح الكباتن' },
  { from: 'node-cloudinary', to: 'node-app-4b', label: 'تخزين رخص وكروت الرقم القومي' },
  { from: 'node-dev-vendor', to: 'node-app-4b', label: 'تسليم الأكواد وشهادة المنشأ' },
  { from: 'node-dev-vendor', to: 'node-app-wikala', label: 'تسليم لوحة المكاتب والداشبورد' },
  { from: 'node-dev-vendor', to: 'node-app-daro', label: 'تسليم باقي الشاشات وماسح الباركود' }
];

export function SystemDiagramView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNodeId, setActiveNodeId] = useState<string>('node-sameh');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'neural' | 'stream'>('neural');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ 
    type: 'success' | 'error' | 'idle' | 'warning'; 
    text: string; 
    is403?: boolean;
    downloadZipUrl?: string;
  }>({
    type: 'idle',
    text: ''
  });
  const [folderLink, setFolderLink] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'الكل (الشبكة كاملة)', icon: '🧠' },
    { id: 'leadership', label: 'القيادة والاستشارة', icon: '👨‍💼' },
    { id: 'operations', label: 'فريق العمليات والمقر', icon: '🎧' },
    { id: 'hardware_hq', label: 'العتاد وشبكة السقف', icon: '🖥️' },
    { id: 'cloud_hosting', label: 'استضافة WE والربط', icon: '🏢' },
    { id: 'apps', label: 'التطبيقات والمطعم', icon: '📱' },
    { id: 'telecom', label: 'الاتصالات و OTP', icon: '💬' },
    { id: 'vendor_dev', label: 'المطورين والتوريد', icon: '👨‍💻' },
    { id: 'regulation', label: 'الجهات والترخيص LTRA', icon: '🏛️' },
  ];

  // Filter nodes based on category and search
  const filteredNodes = useMemo(() => {
    return SYSTEM_NODES.filter((node) => {
      const matchCat = selectedCategory === 'all' || node.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeNode = useMemo(() => {
    return SYSTEM_NODES.find(n => n.id === activeNodeId) || SYSTEM_NODES[0];
  }, [activeNodeId]);

  // Synapses connected to active node
  const activeSynapses = useMemo(() => {
    return {
      outgoing: SYNAPSES.filter(s => s.from === activeNodeId),
      incoming: SYNAPSES.filter(s => s.to === activeNodeId),
    };
  }, [activeNodeId]);

  // Handle open node in inspector modal
  const handleOpenNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setIsModalOpen(true);
  };

  // The ONE Unified Master Sync Handler with 403 fallback handling
  const handleMasterDriveSync = async (forcePrompt: boolean = false) => {
    setIsSyncingDrive(true);
    setSyncStatusMsg({ type: 'idle', text: 'جاري تسجيل الدخول بحساب Google والحصول على صلاحية Drive...' });

    try {
      let token = !forcePrompt ? sessionStorage.getItem("noub_drive_token") : null;
      if (!token) {
        token = await requestDriveAccessToken(forcePrompt);
      }

      if (!token) {
        setSyncStatusMsg({
          type: 'error',
          text: 'لم يتم منح صلاحية الوصول إلى Google Drive. يرجى السماح بالصلاحية لإتمام المزامنة.'
        });
        setIsSyncingDrive(false);
        return;
      }

      setSyncStatusMsg({
        type: 'idle',
        text: 'جاري فحص مجلد NOUB ورفع التحديثات على Google Drive...'
      });

      const res = await fetch('/api/drive/create-noub-single', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'NOUB' })
      });

      const data = await res.json();

      if (data.is403) {
        clearDriveAccessToken();
        setSyncStatusMsg({
          type: 'warning',
          is403: true,
          downloadZipUrl: data.downloadZipUrl || '/api/system/download-noub-zip',
          text: data.error || 'تم رصد تقييد في صلاحية Google Drive (403). يرجى الضغط على "منح الصلاحية وتسجيل الدخول" لتنشيط الصلاحية الجديدة أو تحميل الحزمة الكاملة (ZIP).'
        });
      } else if (res.ok && data.success) {
        const link = data.folderLink || (data.folder?.id ? `https://drive.google.com/drive/folders/${data.folder.id}` : null);
        if (link) setFolderLink(link);
        setSyncStatusMsg({
          type: 'success',
          text: '✓ تم تحديث مجلد NOUB وجميع ملفات المنظومة بنجاح على Google Drive بدون أي تكرار!'
        });
      } else {
        if (res.status === 401) {
          clearDriveAccessToken();
        }
        setSyncStatusMsg({
          type: 'error',
          text: data.error || 'تعذرت المزامنة، يرجى إعادة الضغط لتسجيل الدخول مجدداً'
        });
      }
    } catch (e: any) {
      console.error('Drive Sync error:', e);
      const is403 = e?.message?.includes('403');
      if (is403) {
        clearDriveAccessToken();
      }
      setSyncStatusMsg({
        type: is403 ? 'warning' : 'error',
        is403: is403,
        downloadZipUrl: '/api/system/download-noub-zip',
        text: is403 
          ? 'تنبيه (Error 403): صلاحية Drive تحتاج إلى إعادة موافقة أو واجهة API قيد التفعيل. اضغط "منح الصلاحية وتسجيل الدخول" مجدداً أو حمّل أرشيف ZIP كاملاً.'
          : ('خطأ: ' + (e?.message || 'يرجى المحاولة مرة أخرى'))
      });
    } finally {
      setIsSyncingDrive(false);
    }
  };

  const handleCopyNodeSummary = () => {
    const text = `العقدة العصبية: ${activeNode.label} (${activeNode.role})
الحالة: ${activeNode.status}
المدخلات: ${activeNode.inputs?.join(' • ')}
المخرجات: ${activeNode.outputs?.join(' • ')}
النواقص والمهام:
${activeNode.missingOrPending.map(m => `- ${m}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 pb-16 bg-[#070913] text-slate-100 min-h-screen">
      {/* ========================================================================= */}
      {/* MOBILE-FIRST HEADER & CONTROL TERMINAL */}
      {/* ========================================================================= */}
      <div className="p-3 sm:p-4 border-b border-slate-800/80 bg-[#0c1020]/95 sticky top-0 z-30 backdrop-blur-lg">
        {/* App Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 text-lg">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-white tracking-tight">
                  الشبكة العصبية التقنية للمنظومة
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                  {SYSTEM_NODES.length} عقدة نشطة
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                مسارات التدفق الحي: A يغذي B • B يخدم C • الربط العصبي للمقر والجهات
              </p>
            </div>
          </div>

          {/* Sync & Mode Switcher Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-900/90 border border-slate-800 p-0.5 rounded-xl text-xs font-bold">
              <button
                onClick={() => setViewMode('neural')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'neural'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🧠</span>
                <span className="hidden xs:inline">الشبكة العصبية</span>
              </button>
              <button
                onClick={() => setViewMode('stream')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'stream'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>📱</span>
                <span className="hidden xs:inline">مسارات البطاقات</span>
              </button>
            </div>

            {/* Master Google Drive Sync Button */}
            <button
              onClick={() => handleMasterDriveSync(false)}
              disabled={isSyncingDrive}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
              title="مزامنة وتحديث كافة ملفات المنظومة على Google Drive"
            >
              {isSyncingDrive ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span className="text-[11px]">جاري المزامنة...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span className="text-[11px] font-bold">مزامنة Google Drive</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DRIVE SYNC / 403 NOTIFICATION DIALOG */}
        {/* ========================================================================= */}
        {syncStatusMsg.text && (
          <div className={`mt-3 p-3 rounded-2xl text-xs font-medium border shadow-lg transition-all animate-fadeIn ${
            syncStatusMsg.is403
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              : syncStatusMsg.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : syncStatusMsg.type === 'error'
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              : 'bg-blue-950/40 border-blue-500/50 text-blue-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">
                  {syncStatusMsg.is403 ? '⚠️' : syncStatusMsg.type === 'success' ? '✅' : 'ℹ️'}
                </span>
                <div>
                  <p className="font-bold text-[12px] leading-relaxed">
                    {syncStatusMsg.text}
                  </p>
                  {syncStatusMsg.is403 && (
                    <p className="text-[11px] text-amber-300/80 mt-1">
                      تم حفظ كافة البيانات والملفات الـ 14 المحدثة بالكامل محلياً. يمكنك تنزيل الأرشيف كاملاً بضغطة زر لرفعه على درايف أو استخدام زر إعادة تسجيل الدخول.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0 justify-end">
                {/* Re-auth button if 403 */}
                {syncStatusMsg.is403 && (
                  <button
                    onClick={() => handleMasterDriveSync(true)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  >
                    <span>🔑</span>
                    <span>منح صلاحية Drive وتسجيل الدخول</span>
                  </button>
                )}

                {/* 1-Click ZIP Download Button */}
                <a
                  href="/api/system/download-noub-zip"
                  download="NOUB_MASTER_SYSTEM_ARCHIVE.zip"
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
                >
                  <FolderDown className="w-3.5 h-3.5" />
                  <span>تحميل الأرشيف الكامل (ZIP)</span>
                </a>

                {/* Open Drive Folder link if available */}
                {folderLink && (
                  <a
                    href={folderLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-700"
                  >
                    <span>📂</span>
                    <span>فتح مجلد NOUB ↗</span>
                  </a>
                )}

                {/* Dismiss */}
                <button 
                  onClick={() => setSyncStatusMsg({ type: 'idle', text: '' })}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  title="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar & Filter Chips (Mobile Responsive) */}
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في العقد العصبية (سامح، عماد، أبو خالد، WE، المعادي، المطعم...)"
              className="w-full pl-3 pr-9 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Quick Filter Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl whitespace-nowrap text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: NEURAL NETWORK VISUAL GRAPH (العقد والنبضات العصبية) */}
      {/* ========================================================================= */}
      {viewMode === 'neural' && (
        <div className="p-3 sm:p-5 max-w-7xl mx-auto w-full">
          {/* Neural Network Instructions Banner */}
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-slate-900/90 via-emerald-950/20 to-slate-900/90 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-pulse">⚡</span>
              <p className="text-xs text-slate-300">
                <strong className="text-emerald-400">انقر على أي عقدة عصبية:</strong> ستفتح لك شاشة البوب-آب التفاعلية لإظهار الإشارات الواردة والصادرة والمهام العالقة، مع إمكانية القفز الفوري لأي عقدة متصلة بها.
              </p>
            </div>
            <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
              Synaptic Engine v2.5
            </span>
          </div>

          {/* Neural Clusters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredNodes.map((node) => {
              const isSelected = activeNodeId === node.id;
              const outgoingCount = SYNAPSES.filter(s => s.from === node.id).length;
              const incomingCount = SYNAPSES.filter(s => s.to === node.id).length;

              return (
                <div
                  key={node.id}
                  onClick={() => handleOpenNode(node.id)}
                  className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden active:scale-98 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#11192e] to-[#0a0f1d] border-emerald-400/90 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                      : 'bg-[#0d1222]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#11172a]'
                  }`}
                >
                  {/* Glowing Synapse Accents */}
                  <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${
                    node.category === 'leadership' ? 'from-amber-400 to-emerald-400' :
                    node.category === 'cloud_hosting' ? 'from-blue-500 to-cyan-400' :
                    node.category === 'hardware_hq' ? 'from-purple-500 to-rose-400' :
                    node.category === 'apps' ? 'from-emerald-400 to-teal-400' :
                    'from-slate-600 to-slate-400'
                  }`} />

                  {/* Node Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xl shadow group-hover:scale-105 transition">
                          {node.icon}
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition">
                            {node.label}
                          </h3>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{node.role}</p>
                        </div>
                      </div>

                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        node.statusColor === 'emerald'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : node.statusColor === 'amber'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : node.statusColor === 'purple'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {node.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Synapse Connection Flow Badges */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>{outgoingCount} صادر</span>
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                        <ArrowDownLeft className="w-3 h-3" />
                        <span>{incomingCount} وارد</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium group-hover:text-emerald-400 flex items-center gap-1 transition">
                      <span>فحص العقدة</span>
                      <span>←</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: MOBILE STREAM CARDS (عرض المسارات المتدفقة للموبايل) */}
      {/* ========================================================================= */}
      {viewMode === 'stream' && (
        <div className="p-3 sm:p-5 max-w-4xl mx-auto w-full space-y-3">
          {filteredNodes.map((node) => {
            const isSelected = activeNodeId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => handleOpenNode(node.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{node.icon}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">{node.label}</h4>
                      <p className="text-[11px] text-slate-400">{node.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {node.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {node.description}
                </p>

                {/* Pending Actions Alert */}
                {node.missingOrPending && node.missingOrPending.length > 0 && (
                  <div className="mt-2.5 p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{node.missingOrPending[0]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SYNAPTIC POP-UP INSPECTOR MODAL (شاشة بوب-آب العقدة العصبية الذكية) */}
      {/* ========================================================================= */}
      {isModalOpen && activeNode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full sm:max-w-xl max-h-[85vh] sm:max-h-[90vh] bg-[#0c1020] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            
            {/* Modal Top Handle / Header */}
            <div className="p-4 border-b border-slate-800 bg-[#0e1428] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeNode.icon}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <span>{activeNode.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      عقدة عصبية
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">{activeNode.role}</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              {/* Description */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <h4 className="text-[11px] font-bold text-slate-400 mb-1">الدور في المنظومة:</h4>
                <p className="text-slate-200 leading-relaxed">{activeNode.description}</p>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">الحالة الراهنة:</span>
                  <span className="font-bold text-emerald-400">{activeNode.status}</span>
                </div>
              </div>

              {/* ⚡ Outgoing (المهام والمسؤوليات الموجهة) */}
              <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5 mb-2">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>المسؤوليات والمهام المطلوبة (الموجهة):</span>
                </h4>
                {activeSynapses.outgoing.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeSynapses.outgoing.map((s, idx) => {
                      const target = SYSTEM_NODES.find(n => n.id === s.to);
                      return (
                        <div 
                          key={idx}
                          onClick={() => setActiveNodeId(s.to)}
                          className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition"
                        >
                          <span className="text-slate-300 font-medium">← {s.label}</span>
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <span>{target?.icon || '🔹'}</span>
                            <span>{target?.label || s.to}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400 text-[11px]">
                    {activeNode.outputs?.join(' • ') || 'محطة استقرار نهائية'}
                  </p>
                )}
              </div>

              {/* 📥 Incoming (المدخلات والمتطلبات) */}
              <div className="p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5 mb-2">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>المتطلبات ومصادر العمل (المدخلات):</span>
                </h4>
                {activeSynapses.incoming.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeSynapses.incoming.map((s, idx) => {
                      const source = SYSTEM_NODES.find(n => n.id === s.from);
                      return (
                        <div 
                          key={idx}
                          onClick={() => setActiveNodeId(s.from)}
                          className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between cursor-pointer transition"
                        >
                          <span className="text-slate-300 font-medium">→ {s.label}</span>
                          <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                            <span>{source?.icon || '🔹'}</span>
                            <span>{source?.label || s.from}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-400 text-[11px]">
                    {activeNode.inputs?.join(' • ') || 'نواة إطلاق وتوجيه'}
                  </p>
                )}
              </div>

              {/* ⚠️ Missing / Actionable Items (النواقص والمهام العالقة) */}
              <div className="p-3 rounded-2xl bg-amber-950/25 border border-amber-500/30">
                <h4 className="text-xs font-black text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>النواقص والمهام العالقة لهذه العقدة:</span>
                </h4>
                <ul className="space-y-1.5">
                  {activeNode.missingOrPending.map((item, idx) => (
                    <li key={idx} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-amber-200/90 flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3.5 border-t border-slate-800 bg-[#0e1428] flex items-center justify-between gap-2">
              <button
                onClick={handleCopyNodeSummary}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'تم النسخ!' : 'نسخ المسار'}</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                تم والرجوع للشبكة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
