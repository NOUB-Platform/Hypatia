import React, { useState } from 'react';
import { 
  Mail, 
  Globe, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  Users, 
  Server,
  Zap,
  HelpCircle,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Laptop,
  AlertCircle
} from 'lucide-react';
import { MashweerEmployeeEmail } from '../types';

interface MashweerEmailsTabProps {
  emails: MashweerEmployeeEmail[];
  onAddEmail: (email: MashweerEmployeeEmail) => void;
  onDeleteEmail: (id: string) => void;
  onUpdateEmailStatus: (id: string, status: MashweerEmployeeEmail['status']) => void;
  onAskHypatia: (prompt: string) => void;
}

export const MashweerEmailsTab: React.FC<MashweerEmailsTabProps> = ({
  emails,
  onAddEmail,
  onDeleteEmail,
  onUpdateEmailStatus,
  onAskHypatia,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  
  // New Email Form State
  const [employeeName, setEmployeeName] = useState('');
  const [role, setRole] = useState('');
  const [emailUsername, setEmailUsername] = useState('');
  const [provider, setProvider] = useState<MashweerEmployeeEmail['provider']>('Zoho Lite (المصرية لتكنولوجيا المعلومات)');

  const domain = 'mashweer.com.eg';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAllEmails = () => {
    const activeEmails = emails.filter(e => !e.id.includes('hr') && !e.status.includes('ملغي'));
    const emailListText = activeEmails.map(e => `${e.emailAddress} (${e.employeeName})`).join('\n');
    navigator.clipboard.writeText(emailListText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const handleCreateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeName.trim() || !emailUsername.trim()) return;

    const fullEmail = emailUsername.includes('@')
      ? emailUsername.trim()
      : `${emailUsername.trim().toLowerCase()}@${domain}`;

    const newEmail: MashweerEmployeeEmail = {
      id: `email-${Date.now()}`,
      employeeName: employeeName.trim(),
      role: role.trim() || 'إدارة مشاوير',
      emailAddress: fullEmail,
      status: 'تم الاستلام والتفعيل بنجاح (مجاني 5 حسابات)',
      provider: provider,
      createdAt: new Date().toISOString().split('T')[0],
      deliveryDate: '2026-09-10',
      notes: `تم التجهيز للإعداد على مزود ${provider}`,
    };

    onAddEmail(newEmail);
    setEmployeeName('');
    setRole('');
    setEmailUsername('');
    setIsAddModalOpen(false);
  };

  const dnsRecords = [
    { type: 'MX', host: '@', value: 'mx.zoho.com', priority: 10, notes: 'سيرفر الاستقبال الأساسي لـ Zoho' },
    { type: 'MX', host: '@', value: 'mx2.zoho.com', priority: 20, notes: 'سيرفر الاستقبال الثانوي' },
    { type: 'MX', host: '@', value: 'mx3.zoho.com', priority: 50, notes: 'سيرفر الاستقبال الاحتياطي' },
    { type: 'TXT (SPF)', host: '@', value: 'v=spf1 include:zoho.com ~all', priority: '-', notes: 'حماية الإيميلات من السبام وتأكيد الهوية' },
  ];

  const activeEmailsCount = emails.filter(e => !e.status.includes('ملغي')).length;

  return (
    <div className="space-y-5 pb-20 animate-in fade-in duration-200">
      
      {/* 1. Header Card - Daylight Enterprise */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Globe className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">إدارة نطاق وإيميلات مشاوير الرسمية</h1>
              <span className="text-xs px-3 py-0.5 rounded-full font-mono font-bold bg-teal-50 text-teal-900 border border-teal-200">
                {domain}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>5 إيميلات نشطة ومفعلة بنجاح (زوهو المجانية)</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
              تم استلام وتفعيل <strong>5 إيميلات مؤسسية مجاناً</strong> على زوهو لايت عبر المصرية لتكنولوجيا المعلومات. واستُبعد إيميل HR بقرار م/ سامح ياسين للاكتفاء بالباقة المجانية وتفادي تكلفة اشتراك سادس.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={handleCopyAllEmails}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition border border-slate-200"
          >
            {allCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{allCopied ? 'تم نسخ الـ 5 إيميلات' : 'نسخ قائمة الإيميلات النشطة'}</span>
          </button>

          <button
            onClick={() =>
              onAskHypatia(
                `أنا استلمت الـ 5 إيميلات الرسمية على زوهو: admin, support, info, operation, finance وتم استبعاد hr للاكتفاء بالباقة المجانية. اشرحي لي إزاي هربطهم ببرنامج Microsoft Outlook في المقر وإزاي هنتأكد من الـ DNS مع المهندس محمد الحلو.`
              )
            }
            className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold text-xs flex items-center gap-2 transition border border-teal-200"
          >
            <Bot className="w-4 h-4 text-teal-700" />
            <span>استشارة هيباتيا لربط Outlook</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة إيميل</span>
          </button>
        </div>
      </div>

      {/* 2. Official Status & Policy Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-cyan-50/40 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">
                حالة البريد المؤسسي: 5 حسابات رسمية مفعلة ومكتملة 100%
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white text-emerald-800 border border-emerald-200">
                باقة زوهو المجانية (5 Accounts)
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mt-1">
              الإيميلات الخمسة المعتمدة: <strong className="text-teal-900 font-mono">admin, support, info, operation, finance</strong> @mashweer.com.eg. الإيميل السادس الخاص بـ <span className="line-through text-slate-400 font-mono">hr@mashweer.com.eg</span> تم إلغاؤه رسمياً لتفادي الرسوم الإضافية والاكتفاء بالحد المجاني.
            </p>
          </div>
        </div>

        <a
          href="https://clients.ec.com.eg"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition shadow-xs shrink-0"
        >
          <span>لوحة تحكم المصرية EC</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* 3. Employees Emails Directory */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-teal-700" />
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              دليل الإيميلات الرسمية لمنظومة مشاوير ({emails.length} حسابات موثقة):
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {activeEmailsCount} نشط مجاناً
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
              @{domain}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {emails.map((item) => {
            const isCancelled = item.id.includes('hr') || item.status.includes('ملغي');
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                  isCancelled 
                    ? 'bg-slate-50/70 border-dashed border-slate-300 opacity-75' 
                    : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 block">{item.employeeName}</span>
                      {isCancelled && (
                        <span className="text-[10px] px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                          مستبعد بقرار الإدارة
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{item.role}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      isCancelled
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {item.status}
                    </span>

                    {!isCancelled && (
                      <button
                        onClick={() => onDeleteEmail(item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition"
                        title="حذف الإيميل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                  isCancelled ? 'bg-slate-100 border-slate-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`font-mono text-xs font-bold truncate ${
                    isCancelled ? 'text-slate-500 line-through' : 'text-teal-900'
                  }`}>
                    {item.emailAddress}
                  </span>

                  {!isCancelled && (
                    <button
                      onClick={() => handleCopy(item.emailAddress, item.id)}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center gap-1 shrink-0 shadow-xs"
                      title="نسخ الإيميل"
                    >
                      {copiedKey === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                      <span>{copiedKey === item.id ? 'تم' : 'نسخ'}</span>
                    </button>
                  )}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.notes}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2.5">
                  <span>المزود: {item.provider}</span>
                  <span className="font-mono text-slate-600 font-medium">
                    {item.deliveryDate ? `التسليم: ${item.deliveryDate}` : item.createdAt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Technical Outlook & Exchange Integration Guide */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Laptop className="w-5 h-5 text-teal-700" />
          <h2 className="text-sm sm:text-base font-black text-slate-900">
            دليل تشغيل الإيميلات على Microsoft Outlook والشبكة الداخلية لمقر المعادي:
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px]">1</span>
              <span>لا حاجة لسيرفر Exchange داخلي</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              سيرفرات زوهو السحابية تتكفل بالتشغيل على مدار 24 ساعة بنسبة توفر 99.9%، مما يحميك من انقطاع الكهرباء أو الإنترنت داخل المقر ويضمن وصول الإيميلات دائماً.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px]">2</span>
              <span>التوافق التام مع Outlook</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              يمكن ربط كل إيميل ببرنامج Outlook في أجهزة الكمبيوتر داخل المقر بسهولة عبر بروتوكول IMAP (البورت 993) و SMTP (البورت 465/587).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px]">3</span>
              <span>تطبيقات الموبايل والويب</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              إلى جانب الأوتلوك، يتاح للموظفين تطبيق Zoho Mail الرسمي على أجهزة Android و iOS لمتابعة الإشعارات اللحظية من أي مكان.
            </p>
          </div>
        </div>
      </div>

      {/* 5. DNS Configuration Reference for EC */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-teal-700" />
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              سجلات الـ DNS المضبوطة مع المهندس محمد الحلو (المصرية لتكنولوجيا المعلومات):
            </h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            مربوطة ومفعلة
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                <th className="pb-2.5 font-bold">نوع السجل</th>
                <th className="pb-2.5 font-bold">المضيف Host</th>
                <th className="pb-2.5 font-bold">القيمة Value</th>
                <th className="pb-2.5 font-bold">الأولوية Priority</th>
                <th className="pb-2.5 font-bold">الغرض والملاحظة</th>
                <th className="pb-2.5 font-bold text-left">نسخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {dnsRecords.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-bold text-teal-800">{r.type}</td>
                  <td className="py-3 text-slate-600">{r.host}</td>
                  <td className="py-3 text-slate-900 font-bold">{r.value}</td>
                  <td className="py-3 text-slate-600">{r.priority}</td>
                  <td className="py-3 font-sans text-xs text-slate-600">{r.notes}</td>
                  <td className="py-3 text-left font-sans">
                    <button
                      onClick={() => handleCopy(r.value, `dns-${i}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold border border-slate-200"
                    >
                      {copiedKey === `dns-${i}` ? 'تم' : 'نسخ'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Email */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4 text-right" dir="rtl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">إضافة إيميل رسمي جديد</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmail} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">اسم الموظف أو الإدارة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: إدارة التسويق والعلاقات"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 text-right"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">المسمى الوظيفي / الدور</label>
                <input
                  type="text"
                  placeholder="مثال: Marketing & Growth Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 text-right"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">اسم المستخدم للإيميل (Username) *</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500">
                  <span className="px-3 text-teal-800 font-mono text-xs font-bold border-l border-slate-200">
                    @{domain}
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="marketing"
                    value={emailUsername}
                    onChange={(e) => setEmailUsername(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">مزود الخدمة</label>
                <select
                  value={provider}
                  onChange={(e: any) => setProvider(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 text-right"
                >
                  <option value="Zoho Lite (المصرية لتكنولوجيا المعلومات)">Zoho Lite (المصرية لتكنولوجيا المعلومات)</option>
                  <option value="Zoho Mail Free">Zoho Mail Free (مجاني)</option>
                  <option value="Google Workspace">Google Workspace</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-xs"
                >
                  حفظ الإيميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
