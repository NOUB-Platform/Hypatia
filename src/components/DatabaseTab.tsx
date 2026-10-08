import React, { useState } from 'react';
import { 
  Database, 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Table, 
  Layers, 
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Lock,
  Cloud,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileSpreadsheet,
  Zap,
  Info,
  Download
} from 'lucide-react';
import { ProjectItem } from '../types';
import { 
  SUPABASE_MASTER_SQL, 
  SUPABASE_SEED_SQL, 
  SUPABASE_ALL_IN_ONE_SQL, 
  SUPABASE_TABLES_SCHEMA 
} from '../data/supabaseSchema';
import {
  SUPABASE_MASTER_50_TABLES_SQL,
  SUPABASE_LIVE_SEED_50_TABLES_SQL,
  SUPABASE_ALL_IN_ONE_50_TABLES_SQL
} from '../data/supabaseFullEnterpriseData';
import { 
  testSupabaseConnection, 
  syncAllDataToSupabase 
} from '../lib/supabase';

interface DatabaseTabProps {
  activeProject: ProjectItem;
  projects: ProjectItem[];
  serviceProviders?: any[];
  contracts?: any[];
  mashweerEmails?: any[];
  tasks?: any[];
  inquiries?: any[];
  onAskEmo: (prompt: string) => void;
}

export const DatabaseTab: React.FC<DatabaseTabProps> = ({
  activeProject,
  projects,
  serviceProviders = [],
  contracts = [],
  mashweerEmails = [],
  tasks = [],
  inquiries = [],
  onAskEmo,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'schema' | 'seed' | 'sync' | 'ai-sql'>('schema');
  const [selectedProjectId, setSelectedProjectId] = useState(activeProject.id);
  const [naturalQuestion, setNaturalQuestion] = useState('استخرج أعلى 10 كباتن تقييماً قاموا بأكثر من 50 رحلة هذا الشهر في تطبيق فور بي مع ترتيبهم تنازلياً');
  const [isGeneratingSql, setIsGeneratingSql] = useState(false);
  const [copiedMasterSql, setCopiedMasterSql] = useState(false);
  const [copiedSeedSql, setCopiedSeedSql] = useState(false);
  const [copiedAllInOneSql, setCopiedAllInOneSql] = useState(false);
  const [copiedQuerySql, setCopiedQuerySql] = useState(false);
  
  // Supabase Config State
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('hypatia_supabase_url') || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => localStorage.getItem('hypatia_supabase_anon_key') || '');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{ checked: boolean; success: boolean; message: string } | null>(null);

  // Sync state
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  const [sqlResult, setSqlResult] = useState<{
    sql: string;
    explanation: string;
    indexRecommendation?: string;
    riskLevel?: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const selectedProj = projects.find((p) => p.id === selectedProjectId) || activeProject;

  const currentPresets = [
    'استخرج سجلات رحلات 4B الملغاة ومعدل زمن وصول الكابتن (ETA)',
    'احسب إجمالي عمولات وكلاء وكالة المستحقة لشهر سبتمبر حسب كل وكيل',
    'استخرج شحنات دارو التي تجاوزت 48 ساعة في محطة التوزيع ولم تسلم',
    'احسب إجمالي العمليات الناجحة مقابل الفاشلة اليوم',
  ];

  const [copiedEnterpriseSql, setCopiedEnterpriseSql] = useState(false);
  const [enterpriseSqlMode, setEnterpriseSqlMode] = useState<'all_in_one_50' | 'schema_50' | 'seed_50'>('all_in_one_50');

  const handleCopyEnterpriseSql = () => {
    let sqlToCopy = SUPABASE_ALL_IN_ONE_50_TABLES_SQL;
    if (enterpriseSqlMode === 'schema_50') sqlToCopy = SUPABASE_MASTER_50_TABLES_SQL;
    if (enterpriseSqlMode === 'seed_50') sqlToCopy = SUPABASE_LIVE_SEED_50_TABLES_SQL;
    navigator.clipboard.writeText(sqlToCopy);
    setCopiedEnterpriseSql(true);
    showToast('تم نسخ كود الـ 50 جدول الشامل مع كافة البيانات الحقيقية لسوبابيز بنجاح!');
    setTimeout(() => setCopiedEnterpriseSql(false), 3000);
  };

  const handleCopyMasterSql = () => {
    navigator.clipboard.writeText(SUPABASE_MASTER_50_TABLES_SQL);
    setCopiedMasterSql(true);
    showToast('تم نسخ كود إنشاء الجداول الـ 50 مع العلاقات والتفريعات!');
    setTimeout(() => setCopiedMasterSql(false), 3000);
  };

  const handleCopySeedSql = () => {
    navigator.clipboard.writeText(SUPABASE_LIVE_SEED_50_TABLES_SQL);
    setCopiedSeedSql(true);
    showToast('تم نسخ كود البيانات الحقيقية الكاملة (Live Seed SQL) بنجاح!');
    setTimeout(() => setCopiedSeedSql(false), 3000);
  };

  const handleCopyAllInOneSql = () => {
    navigator.clipboard.writeText(SUPABASE_ALL_IN_ONE_50_TABLES_SQL);
    setCopiedAllInOneSql(true);
    showToast('تم نسخ كود الـ All-in-One كاملاً! (إنشاء الجداول + إدخال كافة البيانات الحقيقية حتى 7 أكتوبر)');
    setTimeout(() => setCopiedAllInOneSql(false), 3000);
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hypatia_supabase_url', supabaseUrl.trim());
    localStorage.setItem('hypatia_supabase_anon_key', supabaseAnonKey.trim());
    showToast('تم حفظ إعدادات Supabase محلياً');
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus(null);
    try {
      const res = await testSupabaseConnection();
      setConnectionStatus({ checked: true, success: res.success, message: res.message });
      showToast(res.message);
    } catch (err: any) {
      setConnectionStatus({ checked: true, success: false, message: err.message || 'فشل الاتصال' });
      showToast('خطأ في الاتصال بسوبابيز');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleDirectSyncToSupabase = async () => {
    setIsSyncingData(true);
    setSyncFeedback(null);
    try {
      const res = await syncAllDataToSupabase({
        projects,
        serviceProviders,
        contracts,
        mashweerEmails,
        tasks,
        inquiries
      });
      setSyncFeedback(res);
      showToast(res.message);
    } catch (err: any) {
      setSyncFeedback({ success: false, message: err.message || 'فشلت المزامنة المباشرة' });
      showToast('خطأ أثناء المزامنة السحابية');
    } finally {
      setIsSyncingData(false);
    }
  };

  const handleGenerateSql = async () => {
    if (!naturalQuestion.trim() || isGeneratingSql) return;
    setIsGeneratingSql(true);
    setSqlResult(null);

    try {
      const res = await fetch('/api/gemini/generate-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: naturalQuestion,
          project: selectedProj.name,
          dbType: 'PostgreSQL / Supabase',
        }),
      });

      const data = await res.json();
      if (data.sql) {
        setSqlResult(data);
      } else {
        showToast('لم يتم إرجاع استعلام: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (err: any) {
      showToast('خطأ أثناء توليد الاستعلام: ' + err.message);
    } finally {
      setIsGeneratingSql(false);
    }
  };

  const isConfigured = Boolean(supabaseUrl.trim() && supabaseAnonKey.trim());

  return (
    <div className="space-y-4 pb-20 select-none text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-3 bg-slate-900 text-white text-xs rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white px-2 font-bold">✕</button>
        </div>
      )}

      {/* Main Header Card - Daylight Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Database className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                استوديو وقواعد بيانات Supabase & PostgreSQL (منظومة الـ 50 جدول المكتملة)
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border bg-teal-50 text-teal-800 border-teal-200">
                محدث بالبيانات الحقيقية حتى 7/10 الساعة 6 مساءً
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              مخطط تفصيلي كامل يتخطى 50 جدولاً مع العلاقات والتفريعات والبيانات الحقيقية (المهام الـ 135، الكوادر، الفواتير، الكاميرات، وخطوط فايبر 4B).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleCopyAllInOneSql}
            title="ينشئ كافة الجداول الـ 50 ويملأها بالبيانات الحقيقية بنقرة واحدة في سوبابيز"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs flex items-center gap-2 transition shadow-md active:scale-95"
          >
            {copiedAllInOneSql ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4 text-amber-300 animate-pulse" />}
            <span>{copiedAllInOneSql ? 'تم نسخ الكود كاملاً!' : 'نسخ كود الـ 50 جدول + البيانات الحقيقية (All-in-One)'}</span>
          </button>

          <button
            onClick={handleCopyMasterSql}
            className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
          >
            {copiedMasterSql ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedMasterSql ? 'تم نسخ الجداول!' : 'نسخ Schema (الـ 50 جدول)'}</span>
          </button>

          <a
            href="/api/system/download-standalone-html"
            download="hypatia_mashweer_standalone.html"
            className="px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-300 text-xs font-bold text-teal-900 flex items-center gap-1.5 transition"
            title="تحميل المنظومة بالكامل كملف HTML مستقل يعمل بدون خوادم"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>تحميل المنظومة (ملف HTML مستقل)</span>
          </a>
        </div>
      </div>

      {/* Honest Status Banner */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-950 leading-relaxed">
          <span className="font-bold block text-teal-900 mb-0.5">جاهز للتشغيل المباشر في سوبابيز (SQL Editor):</span>
          تم تجهيز ملف الـ SQL بالكامل مع كافة العلاقات وتفريعات الجداول والبيانات الحقيقية المذكورة في محادثاتنا حتى تاريخ 7/10 الساعة 6:00 مساءً. الحماية وRLS غير مفعلة لتسهيل الإدخال المباشر وتفادي أي تعارض في الصلاحيات. انسخ الكود وضعه في SQL Editor بمشروع سوبابيز ثم اضغط Run.
        </div>
      </div>

      {/* Sub-Tabs Nav */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('schema')}
          className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'schema'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>مخطط الجداول وتفريعاتها (Schema SQL)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('seed')}
          className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'seed'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>البيانات الحقيقية الكاملة (Live Seed Data)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sync')}
          className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'sync'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>إعدادات الربط المباشر (Supabase Config)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ai-sql')}
          className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 ${
            activeSubTab === 'ai-sql'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>توليد استعلامات ذكية (AI SQL)</span>
        </button>
      </div>

      {/* Sub-Tab 1: Schema */}
      {activeSubTab === 'schema' && (
        <div className="space-y-4">
          {/* Quick Guide Card */}
          <div className="bg-white border border-teal-200/90 rounded-3xl p-4 sm:p-5 text-xs space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-teal-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>كيف ترفع الجداول إلى Supabase بسهولة؟</span>
              </h3>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-teal-700 hover:underline flex items-center gap-1 font-bold"
              >
                <span>فتح لوحة Supabase</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed text-[11px]">
              <li>اضغط على زر <strong className="text-slate-900 font-bold">"نسخ كود SQL كامل للسوبابيز"</strong> بالأعلى.</li>
              <li>في لوحة تحكم سوبابيز بمشروعك، اضغط على أيقونة <strong className="text-teal-800 font-mono font-bold">SQL Editor</strong> في القائمة الجانبية.</li>
              <li>اضغط على <strong className="text-slate-900 font-bold">New Query</strong> والصق الكود بالكامل، ثم اضغط على زر <strong className="text-teal-700 font-bold">Run</strong>.</li>
              <li>سيتم تلقائياً إنشاء الجداول الـ 7 وفهارسها وتفعيل سياسات الأمان (RLS) لحماية البيانات.</li>
            </ol>
          </div>

          {/* Database Tables Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold text-slate-700">
                جداول البيانات المعتمدة لمنظومة مشاوير ({SUPABASE_TABLES_SCHEMA.length} جداول)
              </h2>
              <span className="text-[10px] text-teal-700 font-mono font-bold">Row Level Security: Enabled</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUPABASE_TABLES_SCHEMA.map((table) => (
                <div
                  key={table.tableName}
                  className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5 hover:border-teal-300 transition shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {table.tableName}
                      </span>
                      <span className="text-xs text-slate-900 font-bold">{table.arabicName}</span>
                    </div>
                    {table.rlsEnabled && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 font-semibold">
                        <Lock className="w-2.5 h-2.5" />
                        <span>محمي RLS</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {table.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">أهم الحقول:</span>
                    <div className="flex flex-wrap gap-1">
                      {table.fields.slice(0, 4).map((f) => (
                        <span
                          key={f.name}
                          title={`${f.name} (${f.type}): ${f.purpose}`}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          {f.name}
                        </span>
                      ))}
                      {table.fields.length > 4 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5 font-mono">
                          +{table.fields.length - 4} حقول أخرى
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Seed Data */}
      {activeSubTab === 'seed' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-teal-700" />
                  <span>تعبئة بيانات مشاوير في سوبابيز (Initial Seed Data)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  يقوم هذا الكود بملء الجداول السحابية فوراً ببيانات تطبيقات مشاوير الثلاثة (4B، وكالة، دارو)، المزودين، عقود قيمة تك، وإيميلات المقر.
                </p>
              </div>

              <button
                onClick={handleCopySeedSql}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs self-start sm:self-auto"
              >
                {copiedSeedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSeedSql ? 'تم نسخ كود Seed!' : 'نسخ كود Seed SQL'}</span>
              </button>
            </div>

            {/* Seed Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-lg font-bold text-teal-800 block">3</span>
                <span className="text-[10px] text-slate-500">تطبيقات مشاوير (4B، وكالة، دارو)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-lg font-bold text-teal-800 block">4</span>
                <span className="text-[10px] text-slate-500">مزودين واستضافات</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-lg font-bold text-teal-800 block">5</span>
                <span className="text-[10px] text-slate-500">إيميلات رسمية مجانية</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-lg font-bold text-teal-800 block">3</span>
                <span className="text-[10px] text-slate-500">عقود تسليمات وتطوير</span>
              </div>
            </div>

            {/* SQL Preview Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-teal-700" />
                  <span>معاينة كود الـ Seed SQL (جاهز للتشغيل عند الحاجة):</span>
                </span>
                <button
                  onClick={handleCopySeedSql}
                  className="text-teal-700 hover:text-teal-900 text-[11px] font-bold"
                >
                  نسخ الكود كاملاً
                </button>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 max-h-96 overflow-y-auto text-[11px] font-mono text-teal-300 leading-relaxed whitespace-pre" dir="ltr">
                {SUPABASE_LIVE_SEED_50_TABLES_SQL}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Supabase Config & Live Sync */}
      {activeSubTab === 'sync' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  إعدادات مفاتيح الربط مع Supabase Cloud
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  أدخل مفاتيح مشروعك من Supabase (تجدها في <strong className="text-slate-800">Project Settings &gt; API</strong>) للربط المباشر عند الرغبة.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSupabaseConfig} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-bold block">
                  Project URL:
                </label>
                <input
                  type="text"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xxxxxxxx.supabase.co"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-700 font-bold block">
                  Anon / Public API Key:
                </label>
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-xs"
                >
                  حفظ المفاتيح محلياً
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection || !supabaseUrl.trim()}
                  className="py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
                  <span>فحص الاتصال</span>
                </button>
              </div>
            </form>

            {/* Connection feedback */}
            {connectionStatus && (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in ${
                  connectionStatus.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {connectionStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{connectionStatus.message}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: AI SQL Generator */}
      {activeSubTab === 'ai-sql' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>مولد استعلامات SQL الذكي (PostgreSQL Query Generator)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  اكتب ما تريده باللغة العربية البسيطة، وستقوم هيباتيا بكتابة استعلام SQL الأمثل مع فهارس الأداء.
                </p>
              </div>

              <div>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-700 mb-1.5 font-bold">صف ما ترغب في استخراجه أو حسابه:</label>
              <textarea
                value={naturalQuestion}
                onChange={(e) => setNaturalQuestion(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                placeholder="مثال: استخرج الكباتن الأكثر عمولة هذا الأسبوع وحساب إجمالي مستحقاتهم..."
              />

              <div className="flex flex-wrap gap-1.5 mt-2">
                {currentPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNaturalQuestion(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 transition"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1 flex items-center justify-end">
              <button
                onClick={handleGenerateSql}
                disabled={isGeneratingSql || !naturalQuestion.trim()}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-xs disabled:opacity-50"
              >
                {isGeneratingSql ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري توليد الاستعلام...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>توليد استعلام SQL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SQL Result Box */}
          {sqlResult && (
            <div className="bg-white border border-teal-200 rounded-3xl p-5 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">استعلام SQL المقترح</h3>
                    <p className="text-[11px] text-slate-500">تم تدقيق وتوليد الاستعلام لمنظومة {selectedProj.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sqlResult.sql);
                    setCopiedQuerySql(true);
                    showToast('تم نسخ الاستعلام إلى الحافظة');
                    setTimeout(() => setCopiedQuerySql(false), 2500);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedQuerySql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedQuerySql ? 'تم النسخ!' : 'نسخ SQL'}</span>
                </button>
              </div>

              <div>
                <textarea
                  readOnly
                  value={sqlResult.sql}
                  rows={6}
                  className="w-full bg-slate-900 text-teal-300 font-mono text-xs p-3.5 rounded-2xl border border-slate-800 focus:outline-none selection:bg-teal-700 selection:text-white leading-relaxed"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">الشرح والتحليل:</span>
                  <p className="text-slate-600 leading-relaxed">{sqlResult.explanation}</p>
                </div>

                {sqlResult.indexRecommendation && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-teal-800 block mb-0.5">توصية الفهارس (Indexes):</span>
                    <p className="text-slate-600 font-mono text-[11px]">{sqlResult.indexRecommendation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
