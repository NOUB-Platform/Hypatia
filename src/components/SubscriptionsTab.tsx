import React, { useState } from 'react';
import { 
  Receipt, 
  Calendar, 
  Phone, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Send, 
  Bot, 
  Sparkles,
  Share2
} from 'lucide-react';
import { SYSTEM_SUBSCRIPTIONS, SubscriptionItem } from '../data/subscriptionsData';

interface SubscriptionsTabProps {
  onAskHypatia: (prompt: string) => void;
}

export const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({
  onAskHypatia,
}) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(SYSTEM_SUBSCRIPTIONS);
  const [notifiedIds, setNotifiedIds] = useState<Record<string, boolean>>({});

  const handleNotifyCfo = (sub: SubscriptionItem) => {
    setNotifiedIds(prev => ({ ...prev, [sub.id]: true }));
    onAskHypatia(`أريد إعداد إشعار رسمي للمدير المالي أ/ هاني بخصوص تجديد اشتراك: ${sub.serviceName} بقيمة ${sub.cost} مع المسؤول ${sub.contactPerson} (${sub.contactPhone}).`);
  };

  return (
    <div className="space-y-3.5 pb-24 animate-in fade-in select-none text-slate-800">
      
      {/* Top Brief Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-50 via-white to-blue-50 border border-teal-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">سجل الاشتراكات والتجديدات الدورية</h2>
              <span className="text-[11px] text-slate-500">متابعة التكاليف، أرقام مسؤولي التجديد، والتقارير المالية للمدير المالي أ/ هاني</span>
            </div>
          </div>

          <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 font-bold font-mono">
            {subscriptions.length} خدمات
          </span>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-2.5">
        {subscriptions.map((sub) => {
          const isNotified = notifiedIds[sub.id] || sub.cfoNotified;
          return (
            <div
              key={sub.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{sub.serviceName}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {sub.billingCycle}
                    </span>
                  </div>
                  <span className="text-[11px] text-teal-700 font-medium block mt-0.5">
                    المزود: {sub.provider}
                  </span>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono block">
                    {sub.cost}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    التجديد: {sub.nextRenewalDate}
                  </span>
                </div>
              </div>

              {/* Responsible Person & Phone Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600 font-medium">مسؤول التجديد:</span>
                  <span className="font-bold text-slate-900">{sub.contactPerson}</span>
                  <a
                    href={`tel:${sub.contactPhone}`}
                    className="text-teal-700 font-mono hover:underline flex items-center gap-1 mr-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{sub.contactPhone}</span>
                  </a>
                </div>

                <button
                  onClick={() => handleNotifyCfo(sub)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                    isNotified
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm'
                  }`}
                >
                  {isNotified ? <CheckCircle2 className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                  <span>{isNotified ? 'تم إخطار أ/ هاني' : 'إخطار أ/ هاني في الشات'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                💡 <span className="font-bold">ملاحظات:</span> {sub.notes}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
