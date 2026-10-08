import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Send, 
  Plus, 
  ExternalLink,
  HelpCircle,
  Share2
} from 'lucide-react';

export interface CredentialEntry {
  id: string;
  service: string;
  category: 'hosting' | 'email' | 'domain' | 'database' | 'portal';
  username: string;
  secret: string;
  url: string;
  contactPerson: string;
  notes: string;
  handoverSafe: boolean; // Safe to share in case of 2-3 days absence
}

const INITIAL_CREDENTIALS: CredentialEntry[] = [
  {
    id: 'cred-1',
    service: 'لوحة تحكم استضافة المصرية للاتصالات WE (سيرفر 4B)',
    category: 'hosting',
    username: 'mashawer_admin',
    secret: 'WE@4B_Cloud#2026',
    url: 'https://cloud.te.eg/portal',
    contactPerson: 'م/ أحمد غريب',
    notes: 'حساب إدارة السيرفر السحابي، الوصول مقصور على مهندس سامح ومهندس عماد.',
    handoverSafe: false
  },
  {
    id: 'cred-2',
    service: 'إيميلات الشركة الرسمية (Zoho Workplace)',
    category: 'email',
    username: 'admin@mashawer.com.eg',
    secret: 'Zoho@Mashawer*2026',
    url: 'https://mail.zoho.com',
    contactPerson: 'م/ محمد الحلو (EC)',
    notes: 'لوحة إدارة الإيميلات الـ 6، يمكن تفويض استلام الرسائل لعمرو أو موفق في حال الغياب.',
    handoverSafe: true
  },
  {
    id: 'cred-3',
    service: 'جهاز تسجيل الكاميرات NVR المعادي (شركة الأصدقاء)',
    category: 'portal',
    username: 'admin',
    secret: 'Friends#NVR55K',
    url: '192.168.1.200 (شبكة المقر الداخلية)',
    contactPerson: 'م/ علي (شركة الأصدقاء)',
    notes: 'منظومة 14 كاميرا، يمكن مشاركة شاشة المشاهدة مع موفق عند الحاجة.',
    handoverSafe: true
  },
  {
    id: 'cred-4',
    service: 'قاعدة بيانات سوبابيز المركزية (Supabase)',
    category: 'database',
    username: 'noub.platform@gmail.com',
    secret: 'Supa@NOUB_2026',
    url: 'https://supabase.com/dashboard',
    contactPerson: 'م/ سامح',
    notes: 'تحتوي جداول التطبيقات والنسخ الاحتياطية الدائمة.',
    handoverSafe: false
  },
  {
    id: 'cred-5',
    service: 'منصة الدفع الإلكتروني فوري (Fawry Merchant)',
    category: 'portal',
    username: 'mashawer_fawry_ops',
    secret: 'Fawry$Pay@2026',
    url: 'https://fawry.com/portal',
    contactPerson: 'فريق دعم فوري / أ/ هاني',
    notes: 'حساب استعلام التحصيلات والرحلات لصرف مستحقات الكباتن.',
    handoverSafe: true
  }
];

interface CredentialsVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialsVaultModal: React.FC<CredentialsVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [credentials, setCredentials] = useState<CredentialEntry[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_credentials_vault');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CREDENTIALS;
  });

  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showHandoverBrief, setShowHandoverBrief] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'handover_only'>('all');

  if (!isOpen) return null;

  const toggleVisibility = (id: string) => {
    setVisibleIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const displayedCredentials = filterMode === 'handover_only' 
    ? credentials.filter(c => c.handoverSafe)
    : credentials;

  const generateHandoverText = () => {
    const safeList = credentials.filter(c => c.handoverSafe);
    return `📋 *مذكرة تسليم وتفويض المهام المؤقتة (غياب 2-3 أيام)*
تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}
المسؤول: م/ سامح

الأنظمة المفوض متابعتها:
${safeList.map((c, i) => `${i + 1}. *${c.service}*
- الرابط: ${c.url}
- اسم المستخدم: ${c.username}
- المسؤول الفني للمتابعة: ${c.contactPerson}
- ملاحظات: ${c.notes}`).join('\n\n')}

⚠️ ملحوظة: في الحالات الطارئة يتم الرجوع مباشرة للمهندس عماد الشرقاوي أو الأستاذ هاني.`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 animate-in fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-sm">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">خزينة الحسابات وتفويض المهام</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-bold">
                  محمي محلياً
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                تنظيم بيانات الدخول وإعداد مذكرة استلام للزملاء في حال الغياب المؤقت.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-white gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              كافة الحسابات ({credentials.length})
            </button>
            <button
              onClick={() => setFilterMode('handover_only')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                filterMode === 'handover_only'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <span>مذكرة التفويض للمكتب</span>
              <span className="text-[10px] bg-emerald-800/20 px-1.5 rounded-full font-mono">
                {credentials.filter(c => c.handoverSafe).length}
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowHandoverBrief(!showHandoverBrief)}
            className="px-2.5 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{showHandoverBrief ? 'إخفاء المذكرة' : 'توليد مذكرة غياب'}</span>
          </button>
        </div>

        {/* Handover Brief Preview Box */}
        {showHandoverBrief && (
          <div className="p-3 bg-amber-50/70 border-b border-amber-200 text-slate-800 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                مذكرة تفويض العمل الجاهزة للإرسال على واتساب:
              </span>
              <button
                onClick={() => copyToClipboard('handover-text', generateHandoverText())}
                className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 text-[10px] font-bold flex items-center gap-1"
              >
                {copiedId === 'handover-text' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>نسخ المذكرة كاملة</span>
              </button>
            </div>
            <pre className="text-[10px] font-sans whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-amber-200 max-h-36 overflow-y-auto leading-relaxed text-slate-700">
              {generateHandoverText()}
            </pre>
          </div>
        )}

        {/* Credentials List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
          {displayedCredentials.map((cred) => {
            const isVisible = !!visibleIds[cred.id];
            return (
              <div
                key={cred.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{cred.service}</h4>
                      {cred.handoverSafe && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          مفوض للمكتب
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{cred.url}</span>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    المسؤول: {cred.contactPerson}
                  </span>
                </div>

                {/* Username & Secret Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">المستخدم:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-slate-800 font-bold">{cred.username}</span>
                      <button
                        onClick={() => copyToClipboard(`user-${cred.id}`, cred.username)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                      >
                        {copiedId === `user-${cred.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">كلمة المرور:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-800 font-bold">
                        {isVisible ? cred.secret : '••••••••••••'}
                      </span>
                      <button
                        onClick={() => toggleVisibility(cred.id)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                      >
                        {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(`sec-${cred.id}`, cred.secret)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                      >
                        {copiedId === `sec-${cred.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  💡 <span className="font-bold">ملاحظات التشغيل:</span> {cred.notes}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500">
          🔒 البيانات مخزنة في متصفحك بأمان تام وتُحدّث في النسخ الاحتياطية لجوجل درايف.
        </div>

      </div>
    </div>
  );
};
