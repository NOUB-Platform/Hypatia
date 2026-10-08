export interface SubscriptionItem {
  id: string;
  serviceName: string;
  category: 'hosting' | 'domain_email' | 'telecom' | 'api' | 'legal';
  provider: string;
  contactPerson: string;
  contactPhone: string;
  cost: string;
  billingCycle: 'سنوي' | 'شهري' | 'حسب الاستهلاك';
  nextRenewalDate: string;
  status: 'active' | 'pending_payment' | 'negotiation';
  notes: string;
  cfoNotified: boolean;
}

export const SYSTEM_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: 'sub-we-4b-server',
    serviceName: 'خادم 4B السحابي (Ubuntu 22 + DB + Redis + WAF)',
    category: 'hosting',
    provider: 'المصرية للاتصالات WE',
    contactPerson: 'م/ أحمد غريب',
    contactPhone: '01000000009',
    cost: 'حسب أمر الشراء (خادم 4B فقط)',
    billingCycle: 'شهري',
    nextRenewalDate: '2026-10-01',
    status: 'negotiation',
    notes: 'صلاحية العرض الحالي أسبوع واحد. تكلفة الربط بالجهات الحكومية منفصلة لاحقاً.',
    cfoNotified: true
  },
  {
    id: 'sub-mashawer-domain',
    serviceName: 'نطاق الشركة الرسمي (mashawer.com.eg)',
    category: 'domain_email',
    provider: 'المصرية لتكنولوجيا المعلومات EC',
    contactPerson: 'م/ محمد الحلو',
    contactPhone: '01000000011',
    cost: '1,200 ج.م',
    billingCycle: 'سنوي',
    nextRenewalDate: '2027-09-10',
    status: 'active',
    notes: 'الدومين محجوز ومسجل رسمياً، التجديد القادم بعد عام كامل (سبتمبر 2027).',
    cfoNotified: true
  },
  {
    id: 'sub-zoho-workplace',
    serviceName: 'حزمة إيميلات مشاوير الرسمية (6 إيميلات على زوهو)',
    category: 'domain_email',
    provider: 'المصرية لتكنولوجيا المعلومات EC / Zoho',
    contactPerson: 'م/ محمد الحلو',
    contactPhone: '01000000011',
    cost: '3,800 ج.م',
    billingCycle: 'سنوي',
    nextRenewalDate: '2027-09-10',
    status: 'active',
    notes: 'تشمل: admin, support, info, operations, sameh, hany. التجديد سنوي مع أ/ هاني.',
    cfoNotified: true
  },
  {
    id: 'sub-gmaps-api',
    serviceName: 'خرائط جوجل ومسارات السائقين (Google Maps Platform)',
    category: 'api',
    provider: 'Google Cloud Platform',
    contactPerson: 'م/ سامح',
    contactPhone: '01000000002',
    cost: '$200 شهرياً (مع رصيد $200 المجاني)',
    billingCycle: 'شهري',
    nextRenewalDate: '2026-10-01',
    status: 'active',
    notes: 'مربوطة بحساب الكارت الائتماني للشركة وتغذي تطبيق 4B ونظام تتبع الرحلات.',
    cfoNotified: true
  },
  {
    id: 'sub-fawry-gateway',
    serviceName: 'بوابة الدفع الإلكتروني وتحصيل الرحلات (Fawry Pay)',
    category: 'api',
    provider: 'شركة فوري لتكنولوجيا المدفوعات',
    contactPerson: 'فريق مبيعات فوري',
    contactPhone: '01000000015',
    cost: 'عمولة 2.2% + مصاريف تشغيل شهرية',
    billingCycle: 'شهري',
    nextRenewalDate: '2026-10-15',
    status: 'active',
    notes: 'بانتظار تفعيل بيئة الإنتاج المباشرة بعد تجربة Sandbox لصرف مستحقات الكباتن.',
    cfoNotified: true
  },
  {
    id: 'sub-broadnet-sms',
    serviceName: 'بوابة الرسائل النصية القصيرة OTP (BroadNet SMS)',
    category: 'api',
    provider: 'BroadNet Telecom',
    contactPerson: 'الدعم التجاري BroadNet',
    contactPhone: '01000000016',
    cost: 'باقة 50,000 رسالة OTP (17.5 قرش/رسالة)',
    billingCycle: 'حسب الاستهلاك',
    nextRenewalDate: '2026-11-01',
    status: 'active',
    notes: 'إرسال أكواد الدخول لكباتن وعملاء تطبيقات مشاوير ونوب ووكالة.',
    cfoNotified: true
  },
  {
    id: 'sub-landlines-telecom',
    serviceName: 'الخطوط الأرضية والإنترنت الفايبر لمقر المعادي',
    category: 'telecom',
    provider: 'المصرية للاتصالات WE (سنترال المعادي)',
    contactPerson: 'أ/ محمد مصطفى (المحامي)',
    contactPhone: '01000000004',
    cost: 'فاتورة ربع سنوية حسب سرعة الفايبر',
    billingCycle: 'سنوي',
    nextRenewalDate: '2026-12-01',
    status: 'negotiation',
    notes: 'الملف قيد المتابعة مع المحامي أ/ محمد مصطفى للتعاقد الرسمي بالسنترال.',
    cfoNotified: false
  }
];
