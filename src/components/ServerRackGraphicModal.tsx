import React from 'react';
import { X, Server, Sparkles, Maximize2 } from 'lucide-react';
import { InteractiveRackView } from './InteractiveRackView';

interface ServerRackGraphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia?: (prompt: string) => void;
  isFullPage?: boolean;
}

export const ServerRackGraphicModal: React.FC<ServerRackGraphicModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia,
  isFullPage = false
}) => {
  if (!isOpen) return null;

  const content = (
    <div className={`bg-slate-950 rounded-3xl w-full ${isFullPage ? 'min-h-[85vh]' : 'max-w-7xl max-h-[96vh]'} flex flex-col shadow-2xl border border-slate-800 overflow-hidden text-right select-none font-['Cairo',sans-serif] text-slate-100`}>
      
      {/* TOP MODAL HEADER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
            <Server className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
                <span>الراك (كابينة السيرفرات والشبكة المركزية بالمعادي)</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                  Depth: 1000mm • Perla Enclosure
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              الجرافيك التفاعلي ثلاثي الأبعاد • الترتيب الحقيقي: الباتش بانل 1 ← سويتش سيسكو 48 ← الباتش بانل 2 ← سيرفر ديل R640 ← مسافة فارغة ← NVR الكاميرات ← سنترال جراند ستريم ← جدار الحماية
            </p>
          </div>
        </div>

        {/* Close / Return Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className={`rounded-2xl transition shrink-0 active:scale-95 flex items-center gap-1.5 font-bold text-xs ${
              isFullPage 
                ? 'px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                : 'w-10 h-10 bg-white/10 hover:bg-white/20 text-white justify-center'
            }`}
            title="إغلاق شاشة الراك"
          >
            {isFullPage ? (
              <>
                <span>العودة للرئيسية</span>
                <X className="w-4 h-4" />
              </>
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* MODAL BODY: INTERACTIVE RACK VIEW ENGINE */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950">
        <InteractiveRackView 
          onAskHypatia={onAskHypatia}
          isFullPage={isFullPage}
        />
      </div>

      {/* FOOTER BAR */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 text-xs font-mono shrink-0">
        <div className="flex items-center gap-3 text-slate-400">
          <span>PERLA 27U SERVER ENCLOSURE (غرفة IT المعراج بالمعادي)</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">STATUS: ALL 7 LAYERS OPERATIONAL</span>
        </div>

        <button
          onClick={onClose}
          className="px-5 py-1.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition shadow-sm active:scale-95"
        >
          {isFullPage ? 'العودة للوحة الرئيسية' : 'إغلاق شاشة الراك'}
        </button>
      </div>

    </div>
  );

  if (isFullPage) {
    return (
      <div className="w-full pb-8 animate-in fade-in duration-200">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {content}
    </div>
  );
};
