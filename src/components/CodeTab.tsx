import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  GitPullRequest, 
  ShieldAlert, 
  Terminal, 
  ArrowRight,
  Zap,
  Play,
  ExternalLink,
  Layers,
  Github,
  GitBranch,
  Info,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';
import { ProjectItem } from '../types';

interface CodeTabProps {
  activeProject: ProjectItem;
  projects: ProjectItem[];
  onAskEmo: (prompt: string) => void;
}

export const CodeTab: React.FC<CodeTabProps> = ({
  activeProject,
  projects,
  onAskEmo,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upgrade' | 'repos' | 'figma'>('upgrade');
  const [selectedProjectId, setSelectedProjectId] = useState(activeProject.id);
  const [selectedLanguage, setSelectedLanguage] = useState('TypeScript / React');
  const [userCode, setUserCode] = useState(`// مثال كود لحساب قيمة الرحلة مع الـ Surge في مشاوير 4B
function calculateTripFare(baseFare: number, distanceKm: number, surgeMultiplier: number = 1.0, couponDiscount: number = 0): number {
  if (baseFare < 0 || distanceKm < 0) return 0;
  let total = baseFare + (distanceKm * 3.5);
  if (surgeMultiplier > 1.0) {
    total = total * surgeMultiplier;
  }
  if (couponDiscount > 0) {
    total = Math.max(0, total - couponDiscount);
  }
  return Math.round(total * 100) / 100;
}`);
  const [upgradeGoal, setUpgradeGoal] = useState('إضافة Types كاملة، حماية من الأرقام السالبة، ومعالجة أخطاء الـ NaN');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [upgradeResult, setUpgradeResult] = useState<{
    upgradedCode: string;
    changes: string[];
    tip: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopy = (text: string, id?: string) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2500);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
    showToast('تم النسخ إلى الحافظة بنجاح');
  };

  const goalPresets = [
    'تسريع الأداء وتفادي إعادة الرندر غير الضروري',
    'إضافة Types كاملة وحماية من القيم غير المعرفة (Null Safety)',
    'إصلاح مشكلة تسريب الذاكرة (Memory Leak) في الخلفية',
    'تحسين كتابة الدوال بمعايير Clean Code و SOLID',
  ];

  const handleUpgradeCode = async () => {
    if (!userCode.trim() || isUpgrading) return;
    setIsUpgrading(true);
    setUpgradeResult(null);

    const targetProj = projects.find((p) => p.id === selectedProjectId);

    try {
      const res = await fetch('/api/gemini/upgrade-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: userCode,
          goal: upgradeGoal,
          language: selectedLanguage,
          project: targetProj?.name || activeProject.name,
        }),
      });

      const data = await res.json();
      if (data.upgradedCode) {
        setUpgradeResult(data);
      } else {
        showToast('لم يتم إرجاع كود: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (err: any) {
      showToast('خطأ أثناء ترقية الكود: ' + err.message);
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="space-y-4 pb-20 select-none text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 p-3 bg-slate-900 text-white text-xs rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white px-2 font-bold">✕</button>
        </div>
      )}

      {/* Top Header Card - Light Daylight Enterprise Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Code2 className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                استوديو الكود وهندسة البرمجيات
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                مشاوير 4B • وكالة • دارو
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              أدوات ترقية وتدقيق الكود مع هيباتيا، متابعة شاشات Figma ومطابقتها، ومسارات تهيئة Git للمستودعات.
            </p>
          </div>
        </div>

        {/* Sub-Tabs Nav */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('upgrade')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeSubTab === 'upgrade'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ترقية وتعديل كود
          </button>
          <button
            onClick={() => setActiveSubTab('repos')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeSubTab === 'repos'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            حالة مستودعات Git
          </button>
          <button
            onClick={() => setActiveSubTab('figma')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
              activeSubTab === 'figma'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>شاشات فيجما (Figma)</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Code Upgrade Studio */}
      {activeSubTab === 'upgrade' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            {/* Project & Language selector bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">اختر التطبيق المعني:</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1.5 font-bold">لغة البرمجة / الإطار:</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                >
                  <option value="TypeScript / React">TypeScript / React</option>
                  <option value="React Native">React Native / Mobile</option>
                  <option value="Node.js / Express">Node.js / Express Backend</option>
                  <option value="SQL / PostgreSQL">SQL / PostgreSQL Functions</option>
                  <option value="Dart / Flutter">Dart / Flutter</option>
                  <option value="Python / FastAPI">Python / FastAPI</option>
                </select>
              </div>
            </div>

            {/* Code Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-slate-700 font-bold">الصق الكود البرمجي هنا:</label>
                <span className="text-[11px] text-slate-400 font-mono">UTF-8 • Syntax Checked</span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={9}
                className="w-full bg-slate-900 text-teal-300 font-mono text-xs p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 selection:bg-teal-700 selection:text-white leading-relaxed"
                placeholder="// الصق الدالة أو الكود المراد ترقيته وتدقيقه هنا..."
                dir="ltr"
              />
            </div>

            {/* Target Goal / Prompt */}
            <div>
              <label className="block text-xs text-slate-700 mb-1.5 font-bold">ما هو الهدف من الترقية؟</label>
              <input
                type="text"
                value={upgradeGoal}
                onChange={(e) => setUpgradeGoal(e.target.value)}
                placeholder="مثال: تحويل الكود لـ Async/Await مع إضافة Try/Catch ومعالجة حالات الخطأ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-400"
              />

              {/* Goal Presets */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {goalPresets.map((gp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUpgradeGoal(gp)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 transition"
                  >
                    + {gp}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={handleUpgradeCode}
                disabled={isUpgrading || !userCode.trim()}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-xs ${
                  isUpgrading || !userCode.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {isUpgrading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري ترقية وتدقيق الكود...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>تنفيذ الترقية بواسطة هيباتيا</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Upgrade Result Box */}
          {upgradeResult && (
            <div className="bg-white border border-teal-200 rounded-3xl p-5 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">الكود بعد الترقية والتطوير</h3>
                    <p className="text-[11px] text-slate-500">تم تنقيح الكود وتطبيق أفضل الممارسات البرمجية</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(upgradeResult.upgradedCode)}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                </button>
              </div>

              <div>
                <textarea
                  readOnly
                  value={upgradeResult.upgradedCode}
                  rows={10}
                  className="w-full bg-slate-900 text-teal-300 font-mono text-xs p-3.5 rounded-2xl border border-slate-800 focus:outline-none selection:bg-teal-700 selection:text-white leading-relaxed"
                  dir="ltr"
                />
              </div>

              {upgradeResult.changes && upgradeResult.changes.length > 0 && (
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800">أبرز التحسينات المطبقة:</span>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {upgradeResult.changes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Git Repositories Status */}
      {activeSubTab === 'repos' && (
        <div className="space-y-4">
          {/* Honest Transparent Git Status Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="text-sm font-black text-slate-900">
                  حالة مستودعات GitHub والتحكم بالإصدارات
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  لم يتم إنشاء أو ربط أي مستودع بعيد على GitHub حتى الآن. الأكواد والملفات محفوظة محلياً على السيرفر، وسيتم ربط المستودعات الرسمية فور قيام م/ سامح بإنشائها أو تزويدنا بروابط الـ Remote.
                </p>
              </div>
            </div>

            {/* Preparation Commands for when the user creates a repo */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold text-slate-800">أوامر تهيئة المستودع (جاهزة عند إنشاء Repo على حسابكم):</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-xl text-teal-300 font-mono text-xs border border-slate-800" dir="ltr">
                  <span>git init && git add . && git commit -m "Initial commit"</span>
                  <button
                    onClick={() => handleCopy('git init && git add . && git commit -m "Initial commit"', 'cmd-1')}
                    className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 shrink-0"
                  >
                    {copiedCmd === 'cmd-1' ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-xl text-teal-300 font-mono text-xs border border-slate-800" dir="ltr">
                  <span>git remote add origin &lt;YOUR_REPO_URL&gt; && git push -u origin main</span>
                  <button
                    onClick={() => handleCopy('git remote add origin <YOUR_REPO_URL> && git push -u origin main', 'cmd-2')}
                    className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 shrink-0"
                  >
                    {copiedCmd === 'cmd-2' ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>
              </div>
            </div>

            {/* Projects list and their repo status */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-800 block">قائمة التطبيقات المعتمدة وحالة كود كل مشروع:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{p.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                          {p.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-amber-700 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>محلي (بانتظار الرابط)</span>
                      </span>
                      <button
                        onClick={() =>
                          onAskEmo(
                            `أريد ملخصاً شاملاً لهيكل الكود والمكونات المطلوبة لتطبيق ${p.name} لتوثيقه قبل رفع المستودع.`
                          )
                        }
                        className="text-teal-700 hover:text-teal-900 font-bold"
                      >
                        فحص الكود
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Figma Design Audit & Links */}
      {activeSubTab === 'figma' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-black text-xs">
                    F
                  </div>
                  <span>ملفات وتصاميم فيجما الرسمية (UI/UX) لمنظومة مشاوير</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  روابط تصاميم فيجما المعتمدة لمشاريع: 4B للركاب، وكالة، ودارو مع إمكانية مراجعة الشاشات مع هيباتيا.
                </p>
              </div>

              <button
                onClick={() =>
                  onAskEmo(
                    'قم بعمل فحص معماري شامل ومقارنة بين شاشات وتصاميم فيجما المستلمة لمشاريع مشاوير (4B، وكالة، دارو) وبين بنود العقود، وحدد الشاشات الناقصة.'
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center gap-1.5 transition shrink-0 self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>فحص التصاميم مع هيباتيا</span>
              </button>
            </div>

            {/* Figma Projects Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 4B */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition space-y-3 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">مشاوير - Backlog (4B)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold">
                      Figma UI/UX
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    منظومة حجز الرحلات الذكية وتطبيق السائق والراكب مع شاشات الـ Backlog.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <a
                    href="https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6/%D9%85%D8%B4%D8%A7%D9%88%D9%8A%D8%B1---backlog?node-id=221-63531&t=uCzHJZbEM1gi1Zz8-0"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح تصميم فيجما</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy('https://www.figma.com/design/ulWwUzLnKThS2cfJWDetX6/%D9%85%D8%B4%D8%A7%D9%88%D9%8A%D8%B1---backlog?node-id=221-63531&t=uCzHJZbEM1gi1Zz8-0')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs flex items-center justify-center gap-1 transition border border-slate-200"
                    >
                      <Copy className="w-3 h-3" />
                      <span>نسخ الرابط</span>
                    </button>
                    <button
                      onClick={() =>
                        onAskEmo(
                          'حلل شاشات مشاوير فور بي في فيجما وراجع مدى التزامها باشتراطات وزارة النقل المصرية وتتبع الـ GPS في السيرفرات.'
                        )
                      }
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-teal-50 text-teal-800 text-xs flex items-center justify-center gap-1 transition border border-teal-200 font-bold"
                    >
                      <span>تدقيق الكود</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wikala */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition space-y-3 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">تطبيق وكالة (WeKaLa)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold">
                      Figma v1.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    بوابة الوكلاء والتجار، تتبع العمولات، إدارة السائقين والمناطق الجغرافية.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <a
                    href="https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala?node-id=0-1&t=rbE4CPeGiTAMMin2-1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح تصميم فيجما</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy('https://www.figma.com/design/oYxkmwZcGae674BRA5ZOen/Wikala?node-id=0-1&t=rbE4CPeGiTAMMin2-1')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs flex items-center justify-center gap-1 transition border border-slate-200"
                    >
                      <Copy className="w-3 h-3" />
                      <span>نسخ الرابط</span>
                    </button>
                    <button
                      onClick={() =>
                        onAskEmo(
                          'ما هي تدفقات الشاشات وبوابات الدفع والعمولات في فيجما تطبيق وكالة وكيف نربطها مع API؟'
                        )
                      }
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-teal-50 text-teal-800 text-xs flex items-center justify-center gap-1 transition border border-teal-200 font-bold"
                    >
                      <span>تدقيق الكود</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Daro */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 transition space-y-3 flex flex-col justify-between shadow-2xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">تطبيق دارو (Daro)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono font-bold">
                      Figma v1.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    منظومة الشحن اللوجستي، فحص بوالص الشحن، وإدارة مستودعات الاستلام.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <a
                    href="https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro?node-id=0-1&t=HFGqvAl4RPmlMliu-1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح تصميم فيجما</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy('https://www.figma.com/design/aR1aanpRzGL7aMoxROGgt5/Daro?node-id=0-1&t=HFGqvAl4RPmlMliu-1')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs flex items-center justify-center gap-1 transition border border-slate-200"
                    >
                      <Copy className="w-3 h-3" />
                      <span>نسخ الرابط</span>
                    </button>
                    <button
                      onClick={() =>
                        onAskEmo(
                          'ما هي المتطلبات البرمجية والشاشات الواجب توفرها في تطبيق دارو بناءً على ملف فيجما الرسمي؟'
                        )
                      }
                      className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-teal-50 text-teal-800 text-xs flex items-center justify-center gap-1 transition border border-teal-200 font-bold"
                    >
                      <span>تدقيق الكود</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
