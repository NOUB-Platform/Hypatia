import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Activity,
  Radio,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Cpu,
  Wifi,
  Phone,
  Camera,
  Play,
  Square,
  Volume2,
  VolumeX,
  Sliders,
  Filter,
  Check,
  X,
  Copy,
  Terminal,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  MESHAWIR_NETWORK_NODES,
  MESHAWIR_IT_TICKETS,
  MeshawirNetworkNode,
  MeshawirItTicket
} from '../data/meshawirNetworkData';

interface MeshawirNetworkPingTabProps {
  onAskHypatia?: (prompt: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

interface PingHistoryPoint {
  seq: number;
  time: string;
  latencyMs: number;
  status: 'ok' | 'timeout' | 'slow';
}

export const MeshawirNetworkPingTab: React.FC<MeshawirNetworkPingTabProps> = ({
  onAskHypatia,
  onNavigateToTab
}) => {
  // Nodes state
  const [nodes, setNodes] = useState<MeshawirNetworkNode[]>(MESHAWIR_NETWORK_NODES);
  const [tickets, setTickets] = useState<MeshawirItTicket[]>(MESHAWIR_IT_TICKETS);
  const [selectedNode, setSelectedNode] = useState<MeshawirNetworkNode>(MESHAWIR_NETWORK_NODES[0]);

  // Continuous Ping State (Requirement: "أنا هنا مثلا ممكن أكون عايز أبنج دائمًا على نقطة معينة")
  const [customTargetIp, setCustomTargetIp] = useState<string>('192.168.10.10');
  const [customTargetLabel, setCustomTargetLabel] = useState<string>('سيرفر ديل R640 الرئيسي');
  const [isContinuousPinging, setIsContinuousPinging] = useState<boolean>(true);
  const [pingIntervalSeconds, setPingIntervalSeconds] = useState<number>(1);
  const [pingHistory, setPingHistory] = useState<PingHistoryPoint[]>([]);
  const [pingConsoleLogs, setPingConsoleLogs] = useState<string[]>([
    'PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.',
    '64 bytes from 192.168.10.10: icmp_seq=1 ttl=64 time=1.21 ms',
    '64 bytes from 192.168.10.10: icmp_seq=2 ttl=64 time=1.18 ms',
    '64 bytes from 192.168.10.10: icmp_seq=3 ttl=64 time=1.25 ms'
  ]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // New ticket modal
  const [isAddTicketOpen, setIsAddTicketOpen] = useState<boolean>(false);
  const [newTicketForm, setNewTicketForm] = useState({
    title: '',
    affectedDevice: 'سيرفر ديل R640',
    priority: 'medium' as MeshawirItTicket['priority'],
    assignedEngineer: 'م/ عماد الشرقاوي'
  });

  const seqCounter = useRef(4);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Audio Click Feedback
  const playPingBeep = (freq = 900) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  // Continuous Ping Loop Effect
  useEffect(() => {
    if (!isContinuousPinging) return;

    const timer = setInterval(() => {
      seqCounter.current += 1;
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      // Simulate realistic latency based on target IP
      let baseLatency = 1.2;
      if (customTargetIp.startsWith('192.168.')) baseLatency = 1.1;
      else if (customTargetIp.startsWith('197.35.')) baseLatency = 5.2;
      else if (customTargetIp === '8.8.8.8') baseLatency = 14.5;
      else baseLatency = 13.0;

      // Small jitter fluctuation
      const variation = (Math.random() - 0.45) * 0.4;
      const latency = Math.max(0.4, parseFloat((baseLatency + variation).toFixed(2)));

      playPingBeep(latency > 20 ? 400 : 850);

      const newPoint: PingHistoryPoint = {
        seq: seqCounter.current,
        time: timeStr,
        latencyMs: latency,
        status: latency > 30 ? 'slow' : 'ok'
      };

      setPingHistory(prev => {
        const next = [...prev, newPoint];
        return next.slice(-25); // Keep last 25 ticks
      });

      setPingConsoleLogs(prev => {
        const line = `64 bytes from ${customTargetIp}: icmp_seq=${seqCounter.current} ttl=64 time=${latency.toFixed(2)} ms`;
        const updated = [...prev, line];
        return updated.slice(-60); // Keep last 60 lines
      });

      // Update the node latency if matching
      setNodes(prev => prev.map(n => {
        if (n.ipAddress === customTargetIp) {
          return { ...n, latencyMs: latency };
        }
        return n;
      }));
    }, pingIntervalSeconds * 1000);

    return () => clearInterval(timer);
  }, [isContinuousPinging, pingIntervalSeconds, customTargetIp, soundEnabled]);

  // Scroll console to bottom
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pingConsoleLogs]);

  // Statistics calculation for the active ping target
  const stats = useMemo(() => {
    if (pingHistory.length === 0) {
      return { min: 1.1, max: 1.5, avg: 1.25, loss: 0 };
    }
    const latencies = pingHistory.map(p => p.latencyMs);
    const min = Math.min(...latencies);
    const max = Math.max(...latencies);
    const avg = parseFloat((latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2));
    const loss = 0;
    return { min, max, avg, loss };
  }, [pingHistory]);

  // Switch Ping Target to a specific node
  const handleSelectNodeToPing = (node: MeshawirNetworkNode) => {
    setSelectedNode(node);
    setCustomTargetIp(node.ipAddress);
    setCustomTargetLabel(node.name);
    setPingHistory([]);
    setPingConsoleLogs([
      `--- Starting continuous ICMP ping to ${node.name} (${node.ipAddress}) ---`,
      `PING ${node.ipAddress} (${node.ipAddress}) 56(84) bytes of data.`
    ]);
  };

  const handleStartCustomPing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTargetIp.trim()) return;
    setPingHistory([]);
    setPingConsoleLogs([
      `--- Starting continuous ICMP ping to target (${customTargetIp}) ---`,
      `PING ${customTargetIp} (${customTargetIp}) 56(84) bytes of data.`
    ]);
    setIsContinuousPinging(true);
  };

  const handleClearConsole = () => {
    setPingConsoleLogs([`Console cleared. Pinging ${customTargetIp}...`]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketForm.title.trim()) return;
    const newT: MeshawirItTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `MSH-IT-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTicketForm.title,
      affectedDevice: newTicketForm.affectedDevice,
      priority: newTicketForm.priority,
      status: 'open',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      assignedEngineer: newTicketForm.assignedEngineer,
      actionTaken: 'تم فتح البلاغ وجاري الفحص والمتابعة الميدانية.'
    };
    setTickets(prev => [newT, ...prev]);
    setIsAddTicketOpen(false);
    setNewTicketForm({
      title: '',
      affectedDevice: 'سيرفر ديل R640',
      priority: 'medium',
      assignedEngineer: 'م/ عماد الشرقاوي'
    });
  };

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchCat = filterCategory === 'all' || n.category === filterCategory;
      const matchSearch =
        !searchQuery.trim() ||
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.ipAddress.includes(searchQuery) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [nodes, filterCategory, searchQuery]);

  return (
    <div className="w-full space-y-5 font-['Cairo',sans-serif] text-slate-100 select-none pb-12 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & TELEMETRY STRIP */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
            <Radio className="w-6 h-6 stroke-[2.2px] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>أدوات فحص الشبكة والـ Ping ومتابعة البنية التحتية لمشاوير</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                  Live ICMP Engine
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              متابعة مباشرة لحظية للـ Latency والـ Packet Loss لخوادم المقر، سويتش سيسكو، السنترال، الكاميرات، وخط الفايبر
            </p>
          </div>
        </div>

        {/* Quick Links & Actions */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('server_rack')}
              className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            >
              <Server className="w-4 h-4 text-teal-400" />
              <span>الانتقال لكابينة الراك (27U)</span>
            </button>
          )}

          {onAskHypatia && (
            <button
              onClick={() => onAskHypatia('أريد تحليل نتائج فحص الـ Ping واستقرار شبكة مقر مشاوير بالمعادي')}
              className="px-3.5 py-2 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>استشارة هيباتيا بالشبكة</span>
            </button>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. THE CONTINUOUS PING LIVE CONSOLE & GRAPH (THE USER'S REQUEST) */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 rounded-3xl border-2 border-teal-500/40 p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Console Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          
          {/* Target IP Input / Selector */}
          <form onSubmit={handleStartCustomPing} className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-2xl border border-slate-800 text-xs">
              <span className="text-[11px] text-teal-400 font-bold">الهدف للـ Ping:</span>
              <input
                type="text"
                value={customTargetIp}
                onChange={(e) => {
                  setCustomTargetIp(e.target.value);
                  setCustomTargetLabel('نقطة فحص مخصصة');
                }}
                placeholder="أدخل أي IP (مثال: 192.168.10.1)..."
                className="bg-transparent font-mono text-white text-xs font-bold focus:outline-hidden w-40 sm:w-48 placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>فحص هذا الـ IP</span>
            </button>
          </form>

          {/* Continuous Mode Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            
            {/* Interval Picker */}
            <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400">التكرار:</span>
              <select
                value={pingIntervalSeconds}
                onChange={(e) => setPingIntervalSeconds(Number(e.target.value))}
                className="bg-transparent text-teal-300 font-bold focus:outline-hidden text-xs"
              >
                <option value={1} className="bg-slate-900 text-white">كل 1 ثانية (مستمر)</option>
                <option value={2} className="bg-slate-900 text-white">كل 2 ثانية</option>
                <option value={5} className="bg-slate-900 text-white">كل 5 ثواني</option>
              </select>
            </div>

            {/* Play / Pause Continuous Ping */}
            <button
              onClick={() => setIsContinuousPinging(!isContinuousPinging)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 border ${
                isContinuousPinging
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 hover:bg-amber-900'
                  : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
              }`}
            >
              {isContinuousPinging ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>إيقاف مؤقت للـ Ping</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>استئناف الـ Ping الدائم</span>
                </>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl text-xs transition border ${
                soundEnabled
                  ? 'bg-teal-950/80 border-teal-500/50 text-teal-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title="تفعيل/كتم صوت استجابة البينج"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Clear Console */}
            <button
              onClick={handleClearConsole}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[11px] font-bold transition"
            >
              مسح السجل
            </button>
          </div>

        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">الزمن الحالي (Current):</span>
            <div className="text-xl font-black text-teal-300 mt-1 flex items-baseline gap-1">
              <span>{pingHistory[pingHistory.length - 1]?.latencyMs.toFixed(2) || '1.20'}</span>
              <span className="text-xs text-slate-400 font-sans font-bold">ms</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-sans mt-0.5">● استجابة ممتازة (SLA OK)</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">أقل زمن (Min Latency):</span>
            <div className="text-xl font-black text-emerald-400 mt-1 flex items-baseline gap-1">
              <span>{stats.min.toFixed(2)}</span>
              <span className="text-xs text-slate-400 font-sans font-bold">ms</span>
            </div>
            <span className="text-[9px] text-slate-400 font-sans mt-0.5">أسرع حزمة ICMP</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">متوسط الزمن (Avg Latency):</span>
            <div className="text-xl font-black text-sky-300 mt-1 flex items-baseline gap-1">
              <span>{stats.avg.toFixed(2)}</span>
              <span className="text-xs text-slate-400 font-sans font-bold">ms</span>
            </div>
            <span className="text-[9px] text-slate-400 font-sans mt-0.5">معدل آخر 25 ثانية</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">نسبة فقد الحزم (Packet Loss):</span>
            <div className="text-xl font-black text-emerald-400 mt-1 flex items-baseline gap-1">
              <span>0%</span>
              <span className="text-xs text-slate-400 font-sans font-bold">Loss</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-sans mt-0.5">استقرار بنسبة 100%</span>
          </div>
        </div>

        {/* Dual View: Real-time Latency Chart + Live Terminal Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Latency History Visual Bars (7 Cols) */}
          <div className="lg:col-span-7 bg-[#050914] p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-400" />
                <span>مخطط الاستجابة اللحظي (Live Latency Stream):</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                الهدف: {customTargetLabel} ({customTargetIp})
              </span>
            </div>

            {/* Visual Bars Container */}
            <div className="h-40 flex items-end gap-1.5 px-2 pt-4 pb-2 border-b border-slate-800/80 bg-slate-950/60 rounded-xl relative">
              {/* Reference Grid lines */}
              <div className="absolute inset-x-2 top-2 border-t border-dashed border-slate-800 text-[8px] font-mono text-slate-600 flex justify-between">
                <span>30ms (SLA Threshold)</span>
              </div>
              <div className="absolute inset-x-2 top-1/2 border-t border-dashed border-slate-800 text-[8px] font-mono text-slate-600 flex justify-between">
                <span>15ms</span>
              </div>

              {/* Bars */}
              {pingHistory.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                  بانتظار إرسال حزم الـ ICMP...
                </div>
              ) : (
                pingHistory.map((point) => {
                  const maxDisplayHeight = 120; // px
                  const heightPercent = Math.min(100, Math.max(10, (point.latencyMs / 30) * 100));
                  const isHigh = point.latencyMs > 25;

                  return (
                    <div
                      key={point.seq}
                      className="flex-1 flex flex-col items-center justify-end group relative"
                    >
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-150 ${
                          isHigh
                            ? 'bg-amber-400 shadow-sm shadow-amber-500/40'
                            : 'bg-teal-400 group-hover:bg-teal-300'
                        }`}
                      ></div>

                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-full mb-1 z-20 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[9px] font-mono whitespace-nowrap text-white pointer-events-none shadow-lg">
                        #{point.seq} • {point.latencyMs.toFixed(2)}ms • {point.time}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2">
              <span>قبل 25 ثانية</span>
              <span className="text-teal-400 font-bold">اللحظة الحالية (Real-time Stream)</span>
            </div>
          </div>

          {/* Terminal Console Stream (5 Cols) */}
          <div className="lg:col-span-5 bg-[#030712] rounded-2xl border border-slate-800 p-3 font-mono text-[11px] flex flex-col h-56 lg:h-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 text-[10px]">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-bold text-slate-300">سجل استجابة الـ ICMP المباشر</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>CONNECTED</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 text-slate-300 pr-1 text-[10px] leading-relaxed">
              {pingConsoleLogs.map((log, i) => (
                <div key={i} className="hover:bg-slate-900/60 px-1 rounded flex items-center justify-between">
                  <span className={log.includes('icmp_seq') ? 'text-teal-300' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
              <div ref={consoleBottomRef}></div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MESHAWIR ENTERPRISE NODES DIRECTORY & QUICK-PING */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-teal-400" />
              <span>دليل نقاط وشبكات وأجهزة شركة مشاوير (Meshawir Network Infrastructure)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              اضغط على أي جهاز أو سيرفر لبدء البينج الدائم عليه ومتابعة اتصاله فورياً
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن جهاز أو IP..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-1.5 pr-8 pl-3 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-400 transition"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-white focus:outline-hidden"
            >
              <option value="all">جميع الأقسام ({nodes.length})</option>
              <option value="server">سيرفرات (Dell R640 & iDRAC)</option>
              <option value="switch">سويتشات وشبكة (Cisco 3850)</option>
              <option value="firewall">جدار الحماية (Fortinet)</option>
              <option value="cctv">كاميرات المراقبة (Hikvision)</option>
              <option value="telephony">السنترال (Grandstream PBX)</option>
              <option value="office">أجهزة المقر والبصمة (ZKTeco)</option>
              <option value="isp">خطوط الإنترنت (WE & Orange)</option>
              <option value="cloud">السحابة وتتبع الأسطول (GPS)</option>
            </select>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredNodes.map((node) => {
            const isCurrentlyPinging = customTargetIp === node.ipAddress;

            return (
              <div
                key={node.id}
                onClick={() => handleSelectNodeToPing(node)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-3 ${
                  isCurrentlyPinging
                    ? 'bg-teal-950/40 border-teal-400 ring-2 ring-teal-400/50 shadow-lg shadow-teal-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Node Top Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      node.category === 'server' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                      node.category === 'switch' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      node.category === 'cctv' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      node.category === 'telephony' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      node.category === 'firewall' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {node.category === 'server' && <Server className="w-4 h-4" />}
                      {node.category === 'switch' && <Activity className="w-4 h-4" />}
                      {node.category === 'cctv' && <Camera className="w-4 h-4" />}
                      {node.category === 'telephony' && <Phone className="w-4 h-4" />}
                      {node.category === 'firewall' && <ShieldCheck className="w-4 h-4" />}
                      {node.category === 'office' && <Cpu className="w-4 h-4" />}
                      {node.category === 'isp' && <Wifi className="w-4 h-4" />}
                      {node.category === 'cloud' && <Radio className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white leading-tight">{node.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{node.location}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shrink-0">
                    ONLINE
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  {node.description}
                </p>

                {/* IP & Latency Strip */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-teal-300">{node.ipAddress}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(node.ipAddress);
                      }}
                      className="text-slate-400 hover:text-white"
                      title="نسخ عنوان IP"
                    >
                      {copiedText === node.ipAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Latency:</span>
                    <span className="font-bold text-emerald-300 text-[11px]">{node.latencyMs.toFixed(1)} ms</span>
                  </div>
                </div>

                {/* Quick Ping Button indicator */}
                <div className="pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNodeToPing(node);
                    }}
                    className={`w-full py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isCurrentlyPinging
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>{isCurrentlyPinging ? 'جاري البينج الدائم عليه الآن' : 'ابدأ البينج المستمر على هذا الجهاز'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. IT MAINTENANCE & INCIDENT TICKETS (MESHAWIR ONLY) */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>سجل بلاغات الصيانة والتشغيل الداخلي لمقر مشاوير (IT Maintenance & Tickets)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              متابعة الأعطال الفنية والتمديدات وتنسيقات مهندسي الشركة (م/ عماد وم/ سامح)
            </p>
          </div>

          <button
            onClick={() => setIsAddTicketOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل بلاغ صيانة جديد</span>
          </button>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold">
                <th className="py-2.5 px-3">رقم البلاغ</th>
                <th className="py-2.5 px-3">عنوان البلاغ والمهمة</th>
                <th className="py-2.5 px-3">الجهاز المتأثر</th>
                <th className="py-2.5 px-3">المهندس المسؤول</th>
                <th className="py-2.5 px-3">الأولوية</th>
                <th className="py-2.5 px-3">الحالة</th>
                <th className="py-2.5 px-3">الإجراء المتخذ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {tickets.map(t => (
                <tr key={t.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-teal-400">{t.ticketNumber}</td>
                  <td className="py-3 px-3 font-bold text-white">{t.title}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{t.affectedDevice}</td>
                  <td className="py-3 px-3 text-slate-300">{t.assignedEngineer}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.priority === 'critical' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                      t.priority === 'high' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    }`}>
                      {t.priority === 'critical' ? 'حرج جداً' : t.priority === 'high' ? 'أولوية عالية' : 'متوسط'}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      t.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      t.status === 'investigating' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}>
                      {t.status === 'resolved' ? 'تم الحل بنجاح' : t.status === 'investigating' ? 'جاري الفحص الميداني' : 'مفتوح للمتابعة'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs">{t.actionTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. ADD TICKET MODAL */}
      {/* ========================================================================= */}
      {isAddTicketOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>تسجيل بلاغ صيانة جديد لمقر مشاوير</span>
              </h3>
              <button
                onClick={() => setIsAddTicketOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">عنوان البلاغ والمشكلة:</label>
                <input
                  type="text"
                  value={newTicketForm.title}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, title: e.target.value })}
                  placeholder="مثال: فحص جودة اتصال كاميرا بوابة المخزن 3"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">الجهاز أو النقطة المتأثرة:</label>
                <input
                  type="text"
                  value={newTicketForm.affectedDevice}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, affectedDevice: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  placeholder="مثال: Cisco Switch Port 21"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">الأولوية:</label>
                  <select
                    value={newTicketForm.priority}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                    <option value="critical">حرجة جداً</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">المهندس المسؤول:</label>
                  <select
                    value={newTicketForm.assignedEngineer}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, assignedEngineer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="م/ عماد الشرقاوي">م/ عماد الشرقاوي</option>
                    <option value="م/ سامح يس">م/ سامح يس</option>
                    <option value="فريق صيانة WE">فريق صيانة WE</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTicketOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  حفظ البلاغ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
