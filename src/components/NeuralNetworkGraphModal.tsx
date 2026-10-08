import React, { useState, useMemo } from 'react';
import { 
  X, 
  Network, 
  Sparkles, 
  ShieldCheck, 
  Server, 
  Camera, 
  Cpu, 
  Smartphone, 
  Building2, 
  Bot, 
  Activity, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Maximize2, 
  Compass, 
  Zap,
  Info
} from 'lucide-react';
import { SYSTEM_NODES, SystemNode } from './SystemDiagramView';

interface NeuralNetworkGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia: (prompt: string) => void;
}

export const NeuralNetworkGraphModal: React.FC<NeuralNetworkGraphModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-sameh');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const nodes = SYSTEM_NODES;

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      const matchCat = activeCategory === 'all' || n.category === activeCategory;
      const matchSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [nodes, activeCategory, searchQuery]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'الكل (المصفوفة)' },
    { id: 'leadership', label: 'القيادة والاستراتيجية' },
    { id: 'cloud_hosting', label: 'سيرفرات WE السحابية' },
    { id: 'hardware_hq', label: 'تجهيزات ومقر المعادي' },
    { id: 'apps', label: 'تطبيقات مشاوير' },
    { id: 'regulation', label: 'الجهات والربط الحكومي' },
    { id: 'operations', label: 'العمليات والميدان' },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-0 sm:p-4 select-none animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Cyber/Matrix Container */}
      <div className="relative z-10 bg-gradient-to-b from-[#070d19] via-[#0b1329] to-[#040812] border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Futuristic Top Bar */}
        <div className="p-3 sm:p-4 border-b border-cyan-500/20 flex items-center justify-between gap-3 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Network className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-wider flex items-center gap-1.5 font-mono">
                  <span>HYPATIA MATRIX NEURAL ENGINE</span>
                </h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 font-mono border border-cyan-800">
                  2026-2030 ARCH
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                المخطط العصبي التفاعلي المباشر لربط القرارات، السيرفرات، الكاميرات، والجهات.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Matrix Category Filter Chips */}
        <div className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-800/80 bg-slate-950/40">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition ${
                activeCategory === c.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Visual Cyber Neural Radar Canvas */}
        <div className="relative p-3 bg-[#030712] border-b border-slate-800/80 overflow-hidden flex flex-col items-center justify-center min-h-[190px] max-h-[220px]">
          
          {/* Cyber Grid Lines Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
          <div className="absolute w-40 h-40 rounded-full border border-cyan-500/10 pointer-events-none animate-pulse"></div>
          <div className="absolute w-72 h-72 rounded-full border border-cyan-500/5 pointer-events-none"></div>

          {/* Floating Nodes Radar Simulation */}
          <div className="relative z-10 w-full flex items-center justify-center py-2">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
              {filteredNodes.slice(0, 8).map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`group px-3 py-1.5 rounded-2xl transition-all flex items-center gap-2 text-right border ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950 to-teal-950 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105 ring-1 ring-cyan-400'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <span className="text-sm">{node.icon}</span>
                    <div className="truncate text-right">
                      <span className="block text-[11px] font-bold truncate max-w-[120px]">
                        {node.label}
                      </span>
                      <span className="block text-[8px] text-slate-400 font-mono truncate max-w-[100px]">
                        {node.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <span className="text-[9px] text-cyan-400/80 font-mono tracking-widest mt-1">
            • TOUCH ANY CYBER NODE TO DRILL DOWN •
          </span>
        </div>

        {/* Node Deep Inspection Panel */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-950/60">
          
          {/* Active Node Detail Card */}
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-600/70 flex items-center justify-center text-2xl shadow-lg">
                  {activeNode.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <span>{activeNode.label}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                      {activeNode.category}
                    </span>
                  </h4>
                  <p className="text-xs text-cyan-400 font-medium mt-0.5">
                    {activeNode.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onAskHypatia(`أريد تحليلاً تقنياً مفصلاً لدور ${activeNode.label} في منظومة مشاوير والمهام المعلقة الخاصة به.`);
                }}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition flex items-center gap-1 shrink-0"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>استشارة</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeNode.description}
            </p>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-teal-400 font-bold block">⬅ المتطلبات ومصادر العمل:</span>
                <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                  {(activeNode.inputs || ['تقارير الميدان', 'تنسيق م/ سامح']).map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold block">➡ المسؤوليات والمهام المطلوبة:</span>
                <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                  {(activeNode.outputs || ['تنفيذ المهام', 'متابعة العمليات']).map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pending Tasks / Missing items */}
            {activeNode.missingOrPending && activeNode.missingOrPending.length > 0 && (
              <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-1.5">
                <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  المهام العاجلة والبنود المعلقة قيد التنفيذ:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {activeNode.missingOrPending.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 text-center text-[10px] text-slate-400 flex items-center justify-between px-4">
          <span className="font-mono text-cyan-400">STATUS: NEURAL CORE ONLINE</span>
          <span>سامح • م. عماد • مشاوير 2026</span>
        </div>

      </div>

    </div>
  );
};
