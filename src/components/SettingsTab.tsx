import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  Send, 
  CheckCircle2, 
  Key, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Smartphone,
  ExternalLink,
  MessageSquare,
  Github,
  GitBranch,
  Copy,
  Check,
  Database,
  RefreshCw,
  AlertCircle,
  Table,
  CheckCheck,
  Lock,
  Layers
} from 'lucide-react';
import { ProjectItem, TabType } from '../types';
import { getSupabaseConfig, testSupabaseConnection, resetSupabaseClient } from '../lib/supabase';

interface SettingsTabProps {
  projects: ProjectItem[];
  onNavigateToTab?: (tab: TabType) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ projects, onNavigateToTab }) => {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSettingWebhook, setIsSettingWebhook] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  // Supabase State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [dbPoolerUrl, setDbPoolerUrl] = useState('');
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseFeedback, setSupabaseFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const config = getSupabaseConfig();
    if (config.url) setSupabaseUrl(config.url);
    if (config.anonKey) setSupabaseAnonKey(config.anonKey);
    const savedPooler = localStorage.getItem('hypatia_supabase_pooler');
    if (savedPooler) setDbPoolerUrl(savedPooler);
  }, []);

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hypatia_supabase_url', supabaseUrl.trim());
    localStorage.setItem('hypatia_supabase_anon_key', supabaseAnonKey.trim());
    if (dbPoolerUrl.trim()) {
      localStorage.setItem('hypatia_supabase_pooler', dbPoolerUrl.trim());
    }
    resetSupabaseClient();
    setSupabaseFeedback({ success: true, message: 'تم حفظ إعدادات Supabase بنجاح في المتصفح وجاهزة لمزامنة الجداول!' });
  };

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseFeedback(null);
    try {
      const res = await testSupabaseConnection();
      setSupabaseFeedback({ success: res.success, message: res.message });
    } catch (err: any) {
      setSupabaseFeedback({ success: false, message: err.message || 'فشل الاتصال بـ Supabase' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  // Live test input
  const [testMessageText, setTestMessageText] = useState('هيباتيا، ما هي تفاصيل عرض خطوط الربط والـ VPN من المصرية للاتصالات WE لتطبيق فور بي 4B؟');
  const [testReply, setTestReply] = useState<string | null>(null);
  const [isTestingSimulation, setIsTestingSimulation] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hypatia_telegram_token', botToken);
    localStorage.setItem('hypatia_telegram_chat_id', chatId);
    setStatusMessage({ text: 'تم حفظ مفاتيح التيليجرام بنجاح في المتصفح.', type: 'success' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleActivateWebhook = async () => {
    if (!botToken.trim()) {
      setStatusMessage({ text: 'يرجى إدخال التوكن أولاً (Bot Token)', type: 'error' });
      return;
    }

    setIsSettingWebhook(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/telegram/set-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken: botToken.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: `تم تفعيل الـ Webhook بنجاح! اسم البوت: @${data.bot?.username}`, type: 'success' });
      } else {
        setStatusMessage({ text: data.error || 'تعذر تفعيل الـ Webhook', type: 'error' });
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'خطأ في الاتصال بالخادم', type: 'error' });
    } finally {
      setIsSettingWebhook(false);
    }
  };

  const handleSendTestTelegram = async () => {
    if (!botToken.trim() || !chatId.trim()) {
      setStatusMessage({ text: 'يلزم توفر Bot Token و Chat ID لإرسال الاختبار', type: 'error' });
      return;
    }

    setIsSendingTest(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/telegram/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: botToken.trim(),
          chatId: chatId.trim(),
          text: 'أهلاً بك يا باشمهندس سامح! هذا اختبار حي ومباشر من منصة هيباتيا للتحكم المركزي.',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: 'تم إرسال الرسالة التجريبية إلى حسابك على تيليجرام بنجاح!', type: 'success' });
      } else {
        setStatusMessage({ text: data.error || 'فشل إرسال الرسالة التجريبية', type: 'error' });
      }
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'خطأ أثناء الإرسال', type: 'error' });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSimulateWebhook = async () => {
    if (!testMessageText.trim()) return;
    setIsTestingSimulation(true);
    setTestReply(null);

    try {
      const res = await fetch('/api/telegram/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: testMessageText }),
      });
      const data = await res.json();
      setTestReply(data.reply || 'تم استلام الرسالة بدون رد.');
    } catch (err: any) {
      setTestReply('حدث خطأ أثناء المحاكاة: ' + err.message);
    } finally {
      setIsTestingSimulation(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 select-none animate-in fade-in duration-200">
      
      {/* Top Header Card - Daylight Enterprise Theme */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-xs shrink-0">
            <SlidersHorizontal className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                إعدادات السيرفر وقواعد البيانات والربط الخارجي
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200">
                Daylight Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              إدارة مفاتيح ربط سوبابيز (Supabase Cloud)، إعدادات التخزين السحابي، وبوت التيليجرام لإشعارات المقر الحية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('database')}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Database className="w-4 h-4 text-teal-700" />
              <span>استعراض الجداول وقواعد البيانات</span>
            </button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 border shadow-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ShieldCheck className="w-4 h-4 text-rose-600" />}
          <span className="font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* 1. Supabase Cloud Connection & Database Architecture Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  ربط سوبابيز السحابي وقواعد البيانات (Supabase PostgreSQL Cloud)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
                  PostgreSQL 16
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                قاعدة البيانات المركزية لتخزين ومزامنة منظومة مشاوير، مزودي الخدمات، العقود، المهام، وعروض المصرية للاتصالات WE.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition border border-slate-200 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>لوحة تحكم Supabase</span>
            </a>
          </div>
        </div>

        {/* Database Readiness Architecture Badges */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Table className="w-4 h-4 text-teal-600" />
              <span>الجداول المهيأة والمربوطة بالمنظومة (Database Tables Ready):</span>
            </span>
            <span className="text-[11px] font-mono text-teal-700">7 جداول رئيسية</span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> projects (التطبيقات والمنظومات)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> service_providers (مزودو الخدمات و WE)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> contracts (العقود والاشتراطات)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> mashweer_emails (إيميلات زوهو الـ 5)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> tasks (مهام التشغيل والمقر)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> quotations_vault (الفواتير وعروض WE)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1 shadow-xs">
              <CheckCheck className="w-3 h-3 text-teal-600" /> headquarters_floorplan (تجهيزات المقر)
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-800 font-bold block">
                Project URL (رابط مشروع سوبابيز):
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xxxxxxxxxxxxxx.supabase.co"
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-teal-500 focus:bg-white shadow-xs transition"
              />
              <span className="text-[11px] text-slate-500 block">
                انسخ الرابط من: Supabase &gt; Project Settings &gt; Data API &gt; URL
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-800 font-bold block">
                Anon / Public API Key (المفتاح العام):
              </label>
              <input
                type="password"
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-teal-500 focus:bg-white shadow-xs transition"
              />
              <span className="text-[11px] text-slate-500 block">
                انسخ المفتاح من: Supabase &gt; Project Settings &gt; Data API &gt; anon / public
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-800 font-bold block">
              Database Connection String / Pooler (رابط الاتصال المباشر بقاعدة البيانات - اختياري):
            </label>
            <input
              type="password"
              value={dbPoolerUrl}
              onChange={(e) => setDbPoolerUrl(e.target.value)}
              placeholder="postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres"
              dir="ltr"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-teal-500 focus:bg-white shadow-xs transition"
            />
            <span className="text-[11px] text-slate-500 block">
              يُستخدم في حالة الرغبة بربط خادم الـ Node.js مباشرة عبر الـ Pooler أو إجراء ترحيل الفهارس (Indexes).
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="submit"
              className="py-2 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-sm active:scale-95"
            >
              حفظ المفاتيح وبدء المزامنة
            </button>

            <button
              type="button"
              onClick={handleTestSupabase}
              disabled={isTestingSupabase}
              className="py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50 shadow-xs active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${isTestingSupabase ? 'animate-spin' : ''}`} />
              <span>فحص الاتصال المباشر بقاعدة البيانات</span>
            </button>
          </div>

          {supabaseFeedback && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in shadow-xs ${
                supabaseFeedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {supabaseFeedback.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-semibold">{supabaseFeedback.message}</span>
            </div>
          )}
        </form>
      </div>

      {/* 2. Telegram Bot Webhook & Ops Notifications Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              ربط بوت التيليجرام لإشعارات العمليات الفورية (@BotFather)
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              إرسال واستقبال التنبيهات اللحظية للسيرفرات وخطوط الربط مباشرة على هاتفك.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveKeys} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">توكن البوت (Telegram Bot Token):</label>
              <input
                type="text"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="مثال: 7123456789:AAFxz_SAMPLE_TOKEN..."
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white font-mono shadow-xs transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الـ Chat ID الخاص بك:</label>
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="مثال: 123456789 (من بوت @userinfobot)"
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white font-mono shadow-xs transition"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition border border-slate-200 active:scale-95"
            >
              حفظ المفاتيح
            </button>

            <button
              type="button"
              onClick={handleActivateWebhook}
              disabled={isSettingWebhook}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isSettingWebhook ? 'جاري التفعيل...' : 'تفعيل الـ Webhook مع التيليجرام'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendTestTelegram}
              disabled={isSendingTest}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSendingTest ? 'جاري الإرسال...' : 'إرسال رسالة تجريبية لهاتفك'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Simulator Card in Daylight Theme */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-3.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900">
            محاكي استفسارات العمليات وردود هيباتيا الذكية:
          </h3>
        </div>
        <p className="text-xs text-slate-500">
          يمكنك اختبار رد هيباتيا العملي حول خطوط الربط وعروض الأسعار وتجهيزات المقر مباشرة.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={testMessageText}
            onChange={(e) => setTestMessageText(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white shadow-xs transition"
          />
          <button
            onClick={handleSimulateWebhook}
            disabled={isTestingSimulation}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-xs shrink-0 active:scale-95"
          >
            {isTestingSimulation ? 'جاري المعالجة...' : 'إرسال واختبار'}
          </button>
        </div>

        {testReply && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap shadow-xs animate-in fade-in">
            <span className="font-bold text-teal-800 block mb-1">رد هيباتيا التنفيذي:</span>
            {testReply}
          </div>
        )}
      </div>

      {/* 4. GitHub Enterprise Repository Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shadow-xs">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  مستودع الكود المصدري الرسمي (GitHub Repository)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono font-bold">
                  Mashweer-Ecosystem
                </span>
              </div>
              <p className="text-xs text-slate-500">
                منظومة مشاوير للمنصات الرقمية ومقر المعادي • الفرع النشط: <span className="font-mono text-teal-700 font-bold">main</span>
              </p>
            </div>
          </div>

          <a
            href="https://github.com/Mashweer-Ecosystem/Mashweer-Digital-Platforms"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto shadow-xs active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>عرض على GitHub</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold text-[11px]">Git Remote URL:</span>
              <button
                onClick={() => handleCopy('https://github.com/Mashweer-Ecosystem/Mashweer-Digital-Platforms.git', 'git-url')}
                className="text-[10px] text-teal-700 hover:text-teal-900 flex items-center gap-1 font-sans font-bold"
              >
                {copiedKey === 'git-url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'git-url' ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
            <div className="font-mono text-teal-900 break-all select-all text-[11px]">
              https://github.com/Mashweer-Ecosystem/Mashweer-Digital-Platforms.git
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold text-[11px]">أمر الاستنساخ (Clone):</span>
              <button
                onClick={() => handleCopy('git clone https://github.com/Mashweer-Ecosystem/Mashweer-Digital-Platforms.git', 'git-clone')}
                className="text-[10px] text-teal-700 hover:text-teal-900 flex items-center gap-1 font-sans font-bold"
              >
                {copiedKey === 'git-clone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'git-clone' ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
            <div className="font-mono text-slate-800 break-all select-all text-[11px]">
              git clone https://github.com/Mashweer-Ecosystem/Mashweer-Digital-Platforms.git
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-[11px] text-teal-900 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            تم ربط المستودع محلياً بنجاح كـ <strong className="font-mono text-slate-900">origin</strong> مع تهيئة الفرع <strong className="font-mono text-slate-900">main</strong> وحفظ كافة ملفات البنية التحتية.
          </span>
        </div>
      </div>

      {/* Overview Stats Strip in Daylight Theme */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 text-xs text-slate-600 flex items-center justify-between shadow-xs">
        <span>عدد التطبيقات النشطة في منظومة مشاوير:</span>
        <span className="font-bold text-slate-900 font-mono text-sm">{projects.length} تطبيقات رسمية</span>
      </div>

    </div>
  );
};
