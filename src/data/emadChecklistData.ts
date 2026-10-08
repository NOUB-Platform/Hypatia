export interface EmadChecklistItem {
  id: string;
  number: number;
  category: string;
  title: string;
  status: 'تم' | 'لم يتم' | 'جاري التنفيذ';
  responsibleParty: string;
}

export const EMAD_CHECKLIST_105: EmadChecklistItem[] = [
  // ==========================================
  // 1. عتاد وغرفة سيرفرات مقر المعادي (Hardware & Servers)
  // ==========================================
  { id: 'chk-001', number: 1, category: 'عتاد وغرفة السيرفرات', title: 'شراء واعتماد سيرفر ديل بلاتينيوم Dell PowerEdge R640', status: 'تم', responsibleParty: 'م/ سامح ياسين + شركة QTS' },
  { id: 'chk-002', number: 2, category: 'عتاد وغرفة السيرفرات', title: 'شراء وتوريد جهازي HP Workstation Z440 (معالج Xeon 18-Core)', status: 'تم', responsibleParty: 'م/ سامح ياسين + شركة QTS' },
  { id: 'chk-003', number: 3, category: 'عتاد وغرفة السيرفرات', title: 'شراء واعتماد سويتش سيسكو 48 بورت Cisco Catalyst 3850 PoE+', status: 'تم', responsibleParty: 'م/ سامح ياسين + م/ عماد الشرقاوي' },
  { id: 'chk-004', number: 4, category: 'عتاد وغرفة السيرفرات', title: 'توريد كابينة راك بيرلا 27U أرضي عمق 1000 مم للغرفة المستقلة', status: 'تم', responsibleParty: 'رد لاين البستان + م/ سامح' },
  { id: 'chk-005', number: 5, category: 'عتاد وغرفة السيرفرات', title: 'توريد جهاز فحص وتتبع الكابلات I-Pook PK65H وأراجة Root 2*1', status: 'تم', responsibleParty: 'رد لاين البستان' },
  { id: 'chk-006', number: 6, category: 'عتاد وغرفة السيرفرات', title: 'شراء وتوريد هاردات سيرفر HP (سعة 1.2TB و 2TB SAS)', status: 'تم', responsibleParty: 'المنشاوي البستان' },
  { id: 'chk-007', number: 7, category: 'عتاد وغرفة السيرفرات', title: 'شراء وتوريد 3 أجهزة كمبيوتر DELL Core i5 الجيل العاشر', status: 'تم', responsibleParty: 'تكنو ستورز الدقي' },
  { id: 'chk-008', number: 8, category: 'عتاد وغرفة السيرفرات', title: 'شراء وتوريد 3 شاشات HP 22 بوصة بكاميرا مدمجة', status: 'تم', responsibleParty: 'تكنو ستورز الدقي' },
  { id: 'chk-009', number: 9, category: 'عتاد وغرفة السيرفرات', title: 'تثبيت الباور سبلاي المزدوج 715W لسويتش سيسكو 3850', status: 'تم', responsibleParty: 'م/ عماد الشرقاوي + م/ أحمد عبيد' },
  { id: 'chk-010', number: 10, category: 'عتاد وغرفة السيرفرات', title: 'توريد وحدة PDU سيرفرية 8 منافذ لتنظيم كهرباء الراك', status: 'تم', responsibleParty: 'رد لاين' },
  { id: 'chk-011', number: 11, category: 'عتاد وغرفة السيرفرات', title: 'شراء جهاز مزود طاقة غير منقطع UPS 1500VA لغرفة السيرفرات', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + أ/ هاني' },
  { id: 'chk-012', number: 12, category: 'عتاد وغرفة السيرفرات', title: 'تركيب الباتش بانل 24 بورت وترتيب أسلاك الراك المنظم', status: 'جاري التنفيذ', responsibleParty: 'م/ عماد الشرقاوي + حاتم الفني' },
  { id: 'chk-013', number: 13, category: 'عتاد وغرفة السيرفرات', title: 'توسيع ذاكرة سيرفر Dell R640 من 64GB إلى 128GB ECC', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-014', number: 14, category: 'عتاد وغرفة السيرفرات', title: 'تركيب شاشات المراقبة الـ 3 على جهاز الـ Z الثاني بمكتب الـ IT', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 2. البرمجيات والـ Virtualization وجدار الحماية (Software & OS)
  // ==========================================
  { id: 'chk-015', number: 15, category: 'الأنظمة والبرمجيات', title: 'اعتماد تثبيت نظام Proxmox VE 8.x كنظام تشغيل أساسي لجهاز الـ Z', status: 'تم', responsibleParty: 'م/ سامح ياسين + م/ عماد' },
  { id: 'chk-016', number: 16, category: 'الأنظمة والبرمجيات', title: 'تنزيل وتهيئة جدار الحماية المفتوح OPNsense كـ Virtual Machine', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-017', number: 17, category: 'الأنظمة والبرمجيات', title: 'تهيئة نظام تسجيل كاميرات المراقبة الداخلي NVR على الـ Z', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-018', number: 18, category: 'الأنظمة والبرمجيات', title: 'بناء بيئة حاويات Docker & Portainer لاستضافة التطبيقات الداخلية', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-019', number: 19, category: 'الأنظمة والبرمجيات', title: 'دراسة جدوى تراخيص ميكروسوفت سيرفر لكل كور مقابل البرمجيات الحرة', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-020', number: 20, category: 'الأنظمة والبرمجيات', title: 'تثبيت نظام Ubuntu Server 24.04 LTS على سيرفر Dell R640', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + م/ عماد' },
  { id: 'chk-021', number: 21, category: 'الأنظمة والبرمجيات', title: 'ضبط خادم PostGIS 16 و Redis 7 لقواعد البيانات الجغرافية', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-022', number: 22, category: 'الأنظمة والبرمجيات', title: 'إعداد سكربت النسخ الاحتياطي التلقائي اليومي (Automated Backup)', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 3. شبكة سيسكو والتقسيم وتمديدات المقر (Network & Cabling)
  // ==========================================
  { id: 'chk-023', number: 23, category: 'الشبكات وتمديدات المقر', title: 'اختبار تشغيل بورتات PoE الـ 48 بسويتش سيسكو 3850', status: 'تم', responsibleParty: 'م/ عماد الشرقاوي + م/ أحمد عبيد' },
  { id: 'chk-024', number: 24, category: 'الشبكات وتمديدات المقر', title: 'تقسيم شبكات الـ VLANs المعزولة (كاميرات، موظفين، سيرفرات، ضيوف)', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين + م/ عماد' },
  { id: 'chk-025', number: 25, category: 'الشبكات وتمديدات المقر', title: 'سحب كابلات Cat6 داخل السقف المعلق لمكاتب المقر', status: 'جاري التنفيذ', responsibleParty: 'حاتم الفني + م/ علي' },
  { id: 'chk-026', number: 26, category: 'الشبكات وتمديدات المقر', title: 'تأريج وربط نقاط الإنترنت الـ 17 بالقاعة الكبرى للموظفين', status: 'لم يتم', responsibleParty: 'حاتم الفني' },
  { id: 'chk-027', number: 27, category: 'الشبكات وتمديدات المقر', title: 'تركيب مخرج شبكة مزدوج بغرفة السيرفرات ومكتب الإدارة', status: 'جاري التنفيذ', responsibleParty: 'حاتم الفني' },
  { id: 'chk-028', number: 28, category: 'الشبكات وتمديدات المقر', title: 'شراء سلم معدني 6 درجات مخصص لصيانة الكابلات بالأسقف (طيبة رنين)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-029', number: 29, category: 'الشبكات وتمديدات المقر', title: 'اختبار مسارات الكابلات وتأكيد سلامتها بجهاز I-Pook Tracker', status: 'جاري التنفيذ', responsibleParty: 'حاتم الفني + م/ عماد' },
  { id: 'chk-030', number: 30, category: 'الشبكات وتمديدات المقر', title: 'توريد وتركيب راوتر فودافون 4G هوائي وشريحة باقة المقر المؤقتة', status: 'تم', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 4. تعاقدات المصرية للاتصالات WE وخطوط الفايبر (WE Telecom & Cloud)
  // ==========================================
  { id: 'chk-031', number: 31, category: 'المصرية للاتصالات WE', title: 'طلب واعتماد عرض خادم 4B السحابي بمركز بيانات القرية الذكية', status: 'تم', responsibleParty: 'م/ سامح ياسين + م/ أحمد غريب' },
  { id: 'chk-032', number: 32, category: 'المصرية للاتصالات WE', title: 'توقيع أمر الشراء النهائي لخادم 4B بقيمة 8,500 ج.م/شهرياً', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين + أ/ أبو خالد' },
  { id: 'chk-033', number: 33, category: 'المصرية للاتصالات WE', title: 'اعتماد تفعيل جدار الحماية F5 WAF للخادم السحابي', status: 'تم', responsibleParty: 'المصرية للاتصالات WE' },
  { id: 'chk-034', number: 34, category: 'المصرية للاتصالات WE', title: 'دراسة خط التجميع الفايبر المركزي 24Mbps لمقر المعادي', status: 'تم', responsibleParty: 'م/ سامح ياسين + م/ عماد' },
  { id: 'chk-035', number: 35, category: 'المصرية للاتصالات WE', title: 'توقيع تعاقد خط الفايبر المركزي 24Mbps بقيمة 360 ألف ج.م', status: 'لم يتم', responsibleParty: 'أ/ أبو خالد + م/ سامح' },
  { id: 'chk-036', number: 36, category: 'المصرية للاتصالات WE', title: 'تجهيز خطوط L3VPN الفرعية لـ 6 محافظات بسرعة 4Mbps', status: 'لم يتم', responsibleParty: 'المصرية للاتصالات WE' },
  { id: 'chk-037', number: 37, category: 'المصرية للاتصالات WE', title: 'فصل وتأجيل تكلفة الربط مع الجهات الخارجية لحساب مستقل', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-038', number: 38, category: 'المصرية للاتصالات WE', title: 'التنسيق التقني مع م/ أحمد محرم لتجهيز بيئة الـ Production', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 5. منظومة كاميرات المراقبة والأمن (CCTV & Security)
  // ==========================================
  { id: 'chk-039', number: 39, category: 'كاميرات المراقبة والأمن', title: 'اعتماد عرض توريد منظومة كاميرات المعادي (شركة الأصدقاء - 55,050 ج.م)', status: 'تم', responsibleParty: 'م/ سامح ياسين + بشمهندس علي' },
  { id: 'chk-040', number: 40, category: 'كاميرات المراقبة والأمن', title: 'توريد 16 كاميرا مراقبة Hikvision بدقة 5 ميجابكسل', status: 'تم', responsibleParty: 'بشمهندس علي (الأصدقاء)' },
  { id: 'chk-041', number: 41, category: 'كاميرات المراقبة والأمن', title: 'توريد جهاز تسجيل شبكي NVR 16 قناة 4K وهارد 4TB Purple', status: 'تم', responsibleParty: 'بشمهندس علي' },
  { id: 'chk-042', number: 42, category: 'كاميرات المراقبة والأمن', title: 'تركيب الـ 4 كاميرات الصوتية (المدخل، السيرفرات، الإدارة، العمليات)', status: 'جاري التنفيذ', responsibleParty: 'بشمهندس علي + حاتم الفني' },
  { id: 'chk-043', number: 43, category: 'كاميرات المراقبة والأمن', title: 'تركيب الـ 12 كاميرا دوم وبوليت بالقاعة والممرات وبوابات الخروج', status: 'جاري التنفيذ', responsibleParty: 'بشمهندس علي' },
  { id: 'chk-044', number: 44, category: 'كاميرات المراقبة والأمن', title: 'ربط الكاميرات بسويتش سيسكو 3850 PoE وتخصيص VLAN مستقل', status: 'لم يتم', responsibleParty: 'م/ عماد الشرقاوي + م/ سامح' },
  { id: 'chk-045', number: 45, category: 'كاميرات المراقبة والأمن', title: 'اعتماد نفس مورد الكاميرات (م/ علي) لمطعم المشويات بالعجوزة', status: 'تم', responsibleParty: 'م/ سامح ياسين + أ/ هاني' },
  { id: 'chk-046', number: 46, category: 'كاميرات المراقبة والأمن', title: 'معاينة تمديدات كاميرات مطعم المشويات بالعجوزة على أرض الواقع', status: 'لم يتم', responsibleParty: 'بشمهندس علي + م/ سامح' },

  // ==========================================
  // 6. تطبيق مشاوير فور بي (4B Passenger & Driver App)
  // ==========================================
  { id: 'chk-047', number: 47, category: 'تطبيق مشاوير 4B', title: 'استلام حزمة التطبيق التجريبية 4B APK v1.4.2 بحجم 34.8 MB', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-048', number: 48, category: 'تطبيق مشاوير 4B', title: 'استلام وفحص شاشات تصاميم Figma الرسمية لـ 4B', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-049', number: 49, category: 'تطبيق مشاوير 4B', title: 'فحص واجهات الـ UI وتدفق طلب الرحلات داخلياً (UI Bug Bash)', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين + م/ علي QA' },
  { id: 'chk-050', number: 50, category: 'تطبيق مشاوير 4B', title: 'اعتماد بوابة الدفع الإلكتروني (Paymob / Fawry)', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + أ/ أبو خالد' },
  { id: 'chk-051', number: 51, category: 'تطبيق مشاوير 4B', title: 'تحديد معدل بث إحداثيات GPS للكباتن (3 ثوانٍ أم 5 ثوانٍ أم ديناميكي)', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + م/ عماد' },
  { id: 'chk-052', number: 52, category: 'تطبيق مشاوير 4B', title: 'مراجعة خوارزمية التسعير الديناميكي (Surge Pricing) والمسافات', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-053', number: 53, category: 'تطبيق مشاوير 4B', title: 'اختبار حزمة الـ APK على هواتف كباتن تجريبية ميدانياً', status: 'لم يتم', responsibleParty: 'م/ موفق (العمليات)' },
  { id: 'chk-054', number: 54, category: 'تطبيق مشاوير 4B', title: 'ربط واجهة التطبيق بخادم PostGIS بقاعدة بيانات مشاوير', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 7. تطبيق وكالة ومستودعات دارو (Wekala & Daro Apps)
  // ==========================================
  { id: 'chk-055', number: 55, category: 'تطبيقات وكالة ودارو', title: 'استلام حزمة APK التجريبية لتطبيق وكالة WeKaLa v1.2', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-056', number: 56, category: 'تطبيقات وكالة ودارو', title: 'فحص وتدقيق لوحة تحكم وكالة (Wekala Admin Panel)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-057', number: 57, category: 'تطبيقات وكالة ودارو', title: 'استلام سورس كود Flutter الأصلي ومستودع GitHub لتطبيق وكالة', status: 'لم يتم', responsibleParty: 'المطور السابق + م/ سامح' },
  { id: 'chk-058', number: 58, category: 'تطبيقات وكالة ودارو', title: 'استلام وتأمين مفاتيح التوقيع الرقمي Keystore الخاصة بتطبيق وكالة', status: 'لم يتم', responsibleParty: 'المطور السابق + المحامي' },
  { id: 'chk-059', number: 59, category: 'تطبيقات وكالة ودارو', title: 'مراجعة شاشات فيجما الخاصة بتطبيق دارو للشحن اللوجستي', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-060', number: 60, category: 'تطبيقات وكالة ودارو', title: 'تحديد نوع أجهزة مسح الباركود لمحطات دارو (Handheld أم هواتف)', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + أ/ هاني' },
  { id: 'chk-061', number: 61, category: 'تطبيقات وكالة ودارو', title: 'اختبار تكامل مكتبة قراءة الباركود Google ML Kit مع تطبيق دارو', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-062', number: 62, category: 'تطبيقات وكالة ودارو', title: 'توثيق سجلات عمولات الوكلاء ومحطات التوزيع في سوبابيز', status: 'تم', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 8. تسليمات وخطة شركة قيمة تك (ValueTech 7-Week Plan)
  // ==========================================
  { id: 'chk-063', number: 63, category: 'متابعة قيمة تك', title: 'استلام وثيقة خطة الـ 7 أسابيع الرسمية من قيمة تك (5 محطات)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-064', number: 64, category: 'متابعة قيمة تك', title: 'تحليل بنود تسليم المرحلة الأولى M1 (التشغيل الأساسي)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-065', number: 65, category: 'متابعة قيمة تك', title: 'ربط صرف الدفعات المالية بمحاضر الاستلام الفني الصارمة', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح + أ/ هاني + المحامي' },
  { id: 'chk-066', number: 66, category: 'متابعة قيمة تك', title: 'المطالبة بدمج مرحلتي التشغيل الأساسي والتجاري لضغط المدة إلى 5 أسابيع', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + قيمة تك' },
  { id: 'chk-067', number: 67, category: 'متابعة قيمة تك', title: 'استلام السورس كود الكامل لكل مرحلة ومطابقته برمجياً', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-068', number: 68, category: 'متابعة قيمة تك', title: 'مراجعة صلاحيات لوحة تحكم إدارة الرحلات والأسطول', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 9. الملف القانوني والتراخيص مع أ/ محمد مصطفى (Legal & Compliance)
  // ==========================================
  { id: 'chk-069', number: 69, category: 'الملف القانوني والتراخيص', title: 'عقد جلسة العمل القانونية مع المستشار أ/ محمد مصطفى', status: 'تم', responsibleParty: 'م/ سامح ياسين + أ/ محمد مصطفى' },
  { id: 'chk-070', number: 70, category: 'الملف القانوني والتراخيص', title: 'مراجعة الثغرات القانونية في عقود شركة قيمة تك', status: 'تم', responsibleParty: 'أ/ محمد مصطفى' },
  { id: 'chk-071', number: 71, category: 'الملف القانوني والتراخيص', title: 'صياغة محضر تسليم فني رسمي للسورس كود والمفاتيح مع قيمة تك', status: 'جاري التنفيذ', responsibleParty: 'أ/ محمد مصطفى + م/ سامح' },
  { id: 'chk-072', number: 72, category: 'الملف القانوني والتراخيص', title: 'استخراج شهادات إيداع الملكية الفكرية بهيئة ITIDA لتطبيقات مشاوير', status: 'لم يتم', responsibleParty: 'أ/ محمد مصطفى' },
  { id: 'chk-073', number: 73, category: 'الملف القانوني والتراخيص', title: 'توثيق البرمجيات بالسجل التجاري والشهر العقاري كأصول للشركة', status: 'لم يتم', responsibleParty: 'أ/ محمد مصطفى + أ/ أبو خالد' },
  { id: 'chk-074', number: 74, category: 'الملف القانوني والتراخيص', title: 'إعداد ملف شروط ترخيص النقل الذكي لدى وزارة النقل LTRA', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح + أ/ محمد مصطفى' },

  // ==========================================
  // 10. الإدارة العليا وتأسيس الشركة مع أ/ أبو خالد (Leadership & Partnership)
  // ==========================================
  { id: 'chk-075', number: 75, category: 'الإدارة العليا والشراكة', title: 'إعداد مذكرة الأهداف العشرة لتأسيس الشركة التكنولوجية التابعة', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-076', number: 76, category: 'الإدارة العليا والشراكة', title: 'عقد اجتماع مناقشة استراتيجية التوسع مع أ/ أبو خالد', status: 'تم', responsibleParty: 'م/ سامح ياسين + أ/ أبو خالد' },
  { id: 'chk-077', number: 77, category: 'الإدارة العليا والشراكة', title: 'تحديد الاسم التجاري المقترح للشركة التكنولوجية الجديدة', status: 'لم يتم', responsibleParty: 'م/ سامح + أ/ أبو خالد' },
  { id: 'chk-078', number: 78, category: 'الإدارة العليا والشراكة', title: 'حسم نسب الشراكة وتوزيع الحصص ومسودة عقد التأسيس', status: 'لم يتم', responsibleParty: 'أ/ أبو خالد + م/ سامح' },
  { id: 'chk-079', number: 79, category: 'الإدارة العليا والشراكة', title: 'اعتماد خطة بناء الفريق الداخلي (4 مطورين أساسيين + 2 مساعدين)', status: 'لم يتم', responsibleParty: 'م/ سامح + أ/ أبو خالد' },
  { id: 'chk-080', number: 80, category: 'الإدارة العليا والشراكة', title: 'اعتماد الميزانية الإجمالية لتجهيزات سيرفرات المقر وتطبيق 4B', status: 'تم', responsibleParty: 'أ/ أبو خالد' },

  // ==========================================
  // 11. المالية والمحاسبة والاشتراكات مع أ/ هاني (Finance & Accounting)
  // ==========================================
  { id: 'chk-081', number: 81, category: 'المالية والفواتير', title: 'مطابقة الفاتورة الضريبية الرسمية لشركة QTS بالضرائب المصرية ETA (96,295 ج.م)', status: 'تم', responsibleParty: 'أ/ هاني + م/ سامح' },
  { id: 'chk-082', number: 82, category: 'المالية والفواتير', title: 'مطابقة الفاتورة الضريبية لشركة رد لاين بالضرائب ETA (18,550 ج.م)', status: 'تم', responsibleParty: 'أ/ هاني + م/ سامح' },
  { id: 'chk-083', number: 83, category: 'المالية والفواتير', title: 'مطابقة فاتورة تكنو ستورز الدقي بالضرائب ETA (39,901 ج.م)', status: 'تم', responsibleParty: 'أ/ هاني' },
  { id: 'chk-084', number: 84, category: 'المالية والفواتير', title: 'مطابقة فاتورة سيسكو 3850 مع شركة QTS بالضرائب ETA (11,970 ج.م)', status: 'تم', responsibleParty: 'أ/ هاني' },
  { id: 'chk-085', number: 85, category: 'المالية والفواتير', title: 'متابعة استلام الفاتورة الضريبية الرسمية من المنشاوي (بديلة الإيصال المؤقت 8,510 ج.م)', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح + أ/ هاني' },
  { id: 'chk-086', number: 86, category: 'المالية والفواتير', title: 'تخصيص بطاقة فيزا تجارية رسمية لسداد اشتراكات السيرفرات السحابية', status: 'لم يتم', responsibleParty: 'أ/ هاني' },
  { id: 'chk-087', number: 87, category: 'المالية والفواتير', title: 'تجديد دومين mashawer.com.eg و دومين mashweer.net لعدة سنوات', status: 'لم يتم', responsibleParty: 'أ/ هاني + م/ سامح' },

  // ==========================================
  // 12. البريد المؤسسي والنطاقات (Corporate Emails & Domains)
  // ==========================================
  { id: 'chk-088', number: 88, category: 'البريد والنطاقات', title: 'حجز وتوثيق النطاق الوطني الرسمي mashawer.com.eg', status: 'تم', responsibleParty: 'المصرية EC + م/ سامح' },
  { id: 'chk-089', number: 89, category: 'البريد والنطاقات', title: 'تفعيل الـ 6 إيميلات المؤسسية الرسمية على الدومين الوطني', status: 'تم', responsibleParty: 'المصرية EC + م/ سامح' },
  { id: 'chk-090', number: 90, category: 'البريد والنطاقات', title: 'تخصيص حصص البريد (10GB للإدارة و 5GB للأقسام)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-091', number: 91, category: 'البريد والنطاقات', title: 'ربط سجلات الـ DNS والـ MX Records وتأمين الـ SPF / DKIM', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-092', number: 92, category: 'البريد والنطاقات', title: 'تسليم بيانات الدخول للبريد الإلكتروني للمسؤولين (أبو خالد، هاني، مصطفى، موفق)', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 13. مقر المعراج المعماري وتجهيز المكاتب (HQ Floorplan & Rooms)
  // ==========================================
  { id: 'chk-093', number: 93, category: 'مقر المعراج بالمعادي', title: 'اعتماد الرسم الهندسي المعماري الدقيق للمقر (25.91م × 20.94م)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-094', number: 94, category: 'مقر المعراج بالمعادي', title: 'تسكين المكاتب 1 حتى 7 والقاعة الكبرى طبقاً للاحتياجات', status: 'تم', responsibleParty: 'م/ سامح + أ/ أبو خالد' },
  { id: 'chk-095', number: 95, category: 'مقر المعراج بالمعادي', title: 'تجهيز الباب المصفح وقفل الأمان لغرفة السيرفرات المستقلة', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-096', number: 96, category: 'مقر المعراج بالمعادي', title: 'شراء أثاث المقر وكراسي العمل والترابيزات (طيبة رنين)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-097', number: 97, category: 'مقر المعراج بالمعادي', title: 'تركيب تكييف مخصص مستمر العمل لغرفة السيرفرات 24/7', status: 'لم يتم', responsibleParty: 'أ/ هاني + م/ سامح' },

  // ==========================================
  // 14. سوبابيز والربط السحابي ومستودعات GitHub (Cloud, Supabase & GitHub)
  // ==========================================
  { id: 'chk-098', number: 98, category: 'سوبابيز وجيت هاب', title: 'إنشاء مشروع سوبابيز الجديد المخصص لمنظومة مشاوير', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-099', number: 99, category: 'سوبابيز وجيت هاب', title: 'ربط حساب سوبابيز بحساب GitHub للنشر التلقائي', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-100', number: 100, category: 'سوبابيز وجيت هاب', title: 'تشغيل كود Master Schema SQL وإنشاء الجداول الـ 9 وسياسات RLS', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-101', number: 101, category: 'سوبابيز وجيت هاب', title: 'مزامنة بيانات المشاريع والسيرفرات والإيميلات والقرارات مع سوبابيز', status: 'تم', responsibleParty: 'م/ سامح ياسين' },

  // ==========================================
  // 15. مسابقة كاجل والورقة البحثية وغرفة عمليات 4B (Kaggle & 4B Ops)
  // ==========================================
  { id: 'chk-102', number: 102, category: 'كاجل والذكاء', title: 'اعتماد عنوان الورقة البحثية لمسار كاجل Paper Track ($100k)', status: 'تم', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-103', number: 103, category: 'كاجل والذكاء', title: 'صياغة مسودة الورقة البحثية والبروتوكول المعرفي قبل 17 أكتوبر', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين' },
  { id: 'chk-104', number: 104, category: 'ربط برنامج 4B', title: 'فحص خط الفايبر المباشر لبرنامج 4B والتأكد من زمن التأخير < 5ms', status: 'جاري التنفيذ', responsibleParty: 'م/ سامح ياسين + م/ عماد الشرقاوي' },
  { id: 'chk-105', number: 105, category: 'ربط برنامج 4B', title: 'اختبار محاكاة انقطاع خط 4B والتحويل التلقائي للمسار الاحتياطي DR', status: 'لم يتم', responsibleParty: 'م/ سامح ياسين + مهندسي WE' },
];
