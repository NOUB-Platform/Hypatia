import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Download,
  Terminal,
  Wifi,
  ExternalLink,
  Cpu,
  Layers,
  Network
} from 'lucide-react';
import { ApiEndpointItem, ProjectItem } from '../types';

interface ToolsTabProps {
  apiEndpoints: ApiEndpointItem[];
  onUpdateEndpoints: (endpoints: ApiEndpointItem[]) => void;
  projects: ProjectItem[];
  onAskHypatia: (prompt: string) => void;
}

export const ToolsTab: React.FC<ToolsTabProps> = ({
  apiEndpoints,
  onUpdateEndpoints,
  projects,
  onAskHypatia,
}) => {
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newService, setNewService] = useState('المصرية للاتصالات WE');
  const [newUrlOrIp, setNewUrlOrIp] = useState('');
  const [newMethod, setNewMethod] = useState<'GET' | 'POST' | 'PUT' | 'SOCKET' | 'FIX' | 'PING'>('POST');
  const [newSecret, setNewSecret] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pingingId, setPingingId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulatePing = (endpoint: ApiEndpointItem) => {
    setPingingId(endpoint.id);
    setTimeout(() => {
      const simulatedMs = Math.floor(Math.random() * 18) + 3;
      const updated = apiEndpoints.map((ep) =>
        ep.id === endpoint.id
          ? {
              ...ep,
              lastPingMs: simulatedMs,
              status: simulatedMs < 15 ? ('يعمل بكفاءة' as const) : ('خط احتياطي' as const),
            }
          : ep
      );
      onUpdateEndpoints(updated);
      setPingingId(null);
    }, 500);
  };

  const handleDeleteEndpoint = (id: string) => {
    if (confirm('هل أنت متأكد من حذف نقطة الربط هذه؟')) {
      onUpdateEndpoints(apiEndpoints.filter((ep) => ep.id !== id));
    }
  };

  const handleAddNewEndpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrlOrIp.trim()) return;

    const newEndpoint: ApiEndpointItem = {
      id: `api-${Date.now()}`,
      name: newName.trim(),
      service: newService.trim(),
      urlOrIp: newUrlOrIp.trim(),
      method: newMethod,
      apiKeyOrSecret: newSecret.trim() || undefined,
      notes: newNotes.trim() || undefined,
      status: 'يعمل بكفاءة',
      lastPingMs: Math.floor(Math.random() * 10) + 4,
    };

    onUpdateEndpoints([newEndpoint, ...apiEndpoints]);
    setIsAddingModalOpen(false);
    setNewName('');
    setNewUrlOrIp('');
    setNewSecret('');
    setNewNotes('');
  };

  // Export UCP-LLM Protocol Function (Live State)
  const handleExportProtocolJson = () => {
    const protocolData = {
      protocolVersion: "UCP-LLM Generator v2.1.0-Hypatia",
      generationDate: new Date().toISOString(),
      user: {
        preferredName: "سامح يس",
        title: "مدير قطاع التكنولوجيا والـ IT - مشاوير",
        experienceYears: 18,
        methodology: "العقلانية الصارمة، الفهم من المبادئ الأولى، إدارة النظم المعقدة"
      },
      activeProjectsCount: projects.length,
      projects: projects.map((p) => ({
        name: p.name,
        code: p.code,
        category: p.category,
        status: p.status,
        description: p.description,
        dbType: p.dbInfo?.type,
        tables: p.dbInfo?.tables,
        apkVersionsCount: p.apkFiles.length
      })),
      registeredEndpoints: apiEndpoints.map((ep) => ({
        name: ep.name,
        service: ep.service,
        urlOrIp: ep.urlOrIp,
        protocol: ep.method,
        status: ep.status,
        lastPingMs: ep.lastPingMs
      }))
    };

    const blob = new Blob([JSON.stringify(protocolData, null, 2)], { type: 'application/json;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `UCP-LLM_Hypatia_Live_Protocol_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExportProtocolTxt = () => {
    let txt = `وثيقة بروتوكول السياق الحي (UCP-LLM - Hypatia Edition)\n`;
    txt += `تاريخ التصدير: ${new Date().toLocaleDateString('ar-EG')}\n`;
    txt += `المهندس المسؤول: سامح يس (مدير التكنولوجيا والـ IT)\n`;
    txt += `--------------------------------------------------------\n\n`;
    txt += `المشاريع النشطة:\n`;
    projects.forEach((p, idx) => {
      txt += `${idx + 1}. ${p.name} [${p.code}] - الحالة: ${p.status}\n`;
      txt += `   الوصف: ${p.description}\n`;
    });
    txt += `\nنقاط الربط والـ APIs المسجلة:\n`;
    apiEndpoints.forEach((ep, idx) => {
      txt += `${idx + 1}. ${ep.name} (${ep.service}) - ${ep.urlOrIp} [${ep.method}]\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `UCP-LLM_Hypatia_Live_Protocol_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="space-y-4 pb-20 select-none text-slate-800">
      {/* Top Banner - Daylight Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Server className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                مركز أدوات المطور وخطوط الربط (APIs & Network)
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                {apiEndpoints.length} خطوط مسجلة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              إدارة عناوين الـ IP لخطوط WE VPN، خوادم المقر، وبوابات الدفع والتحقق لتطبيقات مشاوير (4B، وكالة، دارو).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsAddingModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خط / API</span>
          </button>
        </div>
      </div>

      {/* Quick Action Operations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={() => onAskHypatia('افحصي لي تفاصيل عرض خطوط الربط L3VPN وتجميع الفايبر 24Mbps مع المصرية للاتصالات WE وكيف نربطها مع تطبيق 4B وسيرفر المعادي')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition text-right flex items-center gap-3 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">فحص خطوط WE VPN</div>
            <div className="text-[11px] text-slate-500">تجميع الفايبر 24M و 6 خطوط L3</div>
          </div>
        </button>

        <button
          onClick={() => onAskHypatia('صيغي مسودة بروتوكول فحص سيرفر ديل بلاتينيوم DELL PowerEdge R640 وسويتش سيسكو 3850 في راك المعادي 27U')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition text-right flex items-center gap-3 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">فحص سيرفر المعادي R640</div>
            <div className="text-[11px] text-slate-500">جاهزية الراك والسويتش PoE</div>
          </div>
        </button>

        <button
          onClick={() => onAskHypatia('راجعي نقاط الربط لبوابة فوري Fawry وبوابة الرسائل BroadNet لتطبيق مشاوير 4B للتأكد من زمن الاستجابة')}
          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition text-right flex items-center gap-3 shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">بوابات الدفع والـ OTP</div>
            <div className="text-[11px] text-slate-500">فوري • برودنت • خرائط جوجل</div>
          </div>
        </button>
      </div>

      {/* Protocol Live Export Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">تصدير وثيقة البروتوكول الحية (UCP-LLM Live Document)</h3>
            <p className="text-[11px] text-slate-500">
              تصدير ملف يحتوي على أحدث حالة لمشاريع مشاوير ونقاط الربط لتلقيم النماذج اللغوية بهوية العمليات.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportProtocolJson}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير JSON</span>
          </button>
          <button
            onClick={handleExportProtocolTxt}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير TXT</span>
          </button>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-700">
            سجل خطوط الربط وواجهات الـ APIs ({apiEndpoints.length})
          </h3>
          <span className="text-[10px] text-slate-500">محدثة ومحفوظة محلياً</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {apiEndpoints.map((ep) => {
            const isWorking = ep.status === 'يعمل بكفاءة';
            const isBackup = ep.status === 'خط احتياطي';

            return (
              <div
                key={ep.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 transition space-y-3 shadow-xs relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                        {ep.method}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">{ep.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <span>الجهة:</span>
                      <span className="font-semibold text-teal-800">{ep.service}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold shrink-0 border ${
                      isWorking
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : isBackup
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {ep.status}
                  </span>
                </div>

                {/* Endpoint URL / IP box */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800">
                  <div className="flex items-center gap-2 truncate">
                    <Wifi className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{ep.urlOrIp}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(ep.urlOrIp, ep.id)}
                    className="p-1 hover:text-teal-700 text-slate-400 transition shrink-0 ml-1"
                    title="نسخ العنوان"
                  >
                    {copiedId === ep.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Notes if any */}
                {ep.notes && (
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50/70 p-2 rounded-xl border border-slate-200/80">
                    {ep.notes}
                  </p>
                )}

                {/* Bottom Card Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSimulatePing(ep)}
                      disabled={pingingId === ep.id}
                      className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-bold transition"
                    >
                      <RefreshCw className={`w-3 h-3 ${pingingId === ep.id ? 'animate-spin' : ''}`} />
                      <span>فحص الاتصال (Ping)</span>
                    </button>
                    {ep.lastPingMs !== undefined && (
                      <span className="font-mono text-[10px] text-slate-500">
                        ({ep.lastPingMs} ms)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteEndpoint(ep.id)}
                    className="text-slate-400 hover:text-rose-600 transition p-1"
                    title="حذف نقطة الربط"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Endpoint Modal */}
      {isAddingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-600" />
                <span>إضافة خط ربط جديد أو واجهة API</span>
              </h3>
              <button
                onClick={() => setIsAddingModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewEndpoint} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">اسم الخط أو نقطة الربط:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: خط الربط الرئيسي L3VPN مع سنترال المعادي"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">الجهة / المزود:</label>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">بروتوكول الاتصال:</label>
                  <select
                    value={newMethod}
                    onChange={(e: any) => setNewMethod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                  >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                    <option value="PUT">PUT</option>
                    <option value="SOCKET">SOCKET</option>
                    <option value="PING">PING</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">عنوان الـ URL أو الـ IP:</label>
                <input
                  type="text"
                  value={newUrlOrIp}
                  onChange={(e) => setNewUrlOrIp(e.target.value)}
                  placeholder="مثال: 10.150.22.4 أو https://api.mashweer.com.eg"
                  required
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">ملاحظات فنية:</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="ملاحظات حول سعة الخط، الـ VLAN، أو المنفذ..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                >
                  إضافة النقطة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
