import React from 'react';
import { 
  Server, Cpu, ShieldCheck, Camera, Layers, HardDrive, 
  ExternalLink, FileText, CheckCircle2, Bot, 
  Receipt, ArrowUpRight, Zap, Radio
} from 'lucide-react';

export interface DeviceDetailItem {
  id: string;
  name: string;
  category: 'server' | 'network' | 'cctv' | 'workstation' | 'telecom' | 'firewall';
  shortBadge: string;
  subtitle: string;
  hint: string;
  driveFolder: string;
  invoiceInfo?: string;
  specs: string[];
  status: string;
  statusType?: 'completed' | 'ongoing' | 'critical_deadline';
  location: string;
}

interface DeviceDetailModalProps {
  device: DeviceDetailItem | null;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
  onOpenProjectSource?: () => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  onClose,
  onAskHypatia,
  onOpenProjectSource
}) => {
  if (!device) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-right text-slate-800">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner">
              {device.category === 'server' ? (
                <Server className="w-5 h-5 stroke-[2.2px]" />
              ) : device.category === 'cctv' ? (
                <Camera className="w-5 h-5 stroke-[2.2px]" />
              ) : device.category === 'firewall' ? (
                <ShieldCheck className="w-5 h-5 stroke-[2.2px]" />
              ) : device.category === 'telecom' ? (
                <Radio className="w-5 h-5 stroke-[2.2px]" />
              ) : device.category === 'workstation' ? (
                <Cpu className="w-5 h-5 stroke-[2.2px]" />
              ) : (
                <Layers className="w-5 h-5 stroke-[2.2px]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  {device.name}
                </h3>
              </div>
              <span className="text-[11px] text-teal-300 font-mono block">
                {device.subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Hypatia Icon-Only Button with Tooltip */}
            {onAskHypatia && (
              <button
                onClick={() => onAskHypatia(`أريد استشارة ومواصفات تفصيلية حول: ${device.name} (${device.subtitle}) وموقعه بـ ${device.location}`)}
                className="w-8 h-8 rounded-xl bg-teal-500/30 hover:bg-teal-500/50 text-teal-200 flex items-center justify-center transition active:scale-95"
                title="استشارة هيباتيا"
              >
                <Bot className="w-4 h-4" />
              </button>
            )}

            {/* Quick Google Drive Icon-Only Button with Tooltip */}
            {onOpenProjectSource && (
              <button
                onClick={onOpenProjectSource}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95"
                title="فتح مسار المجلد على Google Drive"
              >
                <HardDrive className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95 ml-1"
              title="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body (الحاجة من جوه الحاجة) */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Executive Hint Banner */}
          <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-teal-950 space-y-1">
            <span className="text-[10px] font-bold text-teal-700 block">الوظيفة والاعتماد المؤسسي:</span>
            <p className="text-xs leading-relaxed font-medium">
              {device.hint}
            </p>
          </div>

          {/* Drive Path & Invoice Chips */}
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 block font-sans">المسار المعتمد في Google Drive:</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-teal-800 font-bold break-all">{device.driveFolder}</span>
                {onOpenProjectSource && (
                  <button 
                    onClick={onOpenProjectSource}
                    className="p-1 rounded-lg hover:bg-slate-200 text-teal-700 transition shrink-0"
                    title="فتح المجلد في Google Drive"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {device.invoiceInfo && (
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-700 block">الفاتورة الضريبية الرسمية وأمر الشراء:</span>
                    <span className="font-bold text-xs">{device.invoiceInfo}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono font-bold">
                  ETA Verified
                </span>
              </div>
            )}
          </div>

          {/* Technical Specs List */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-600" />
              <span>المواصفات الفنية التفصيلية:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {device.specs.map((spec, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                  <span className="leading-snug">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Status Meta */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">الموقع بالمقر:</span>
              <span className="font-bold text-slate-800">{device.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">الحالة:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{device.status}</span>
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-xs active:scale-95"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
