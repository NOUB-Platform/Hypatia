import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Server, 
  Camera, 
  HardDrive, 
  Cpu, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  Printer, 
  Building2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Layers, 
  Bot,
  Wifi,
  Receipt,
  Search,
  FolderOpen,
  ArrowUpRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { QuotationItem } from '../types';
import { INITIAL_QUOTATIONS } from '../data/initialQuotations';

interface QuotationsTabProps {
  onAskHypatia: (prompt: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const QuotationsTab: React.FC<QuotationsTabProps> = ({
  onAskHypatia,
  onNavigateToTab
}) => {
  const [quotations] = useState<QuotationItem[]>(INITIAL_QUOTATIONS);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotations[0]?.id || 'quote-qts-server-z440-invoice');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'details' | 'summary' | 'print'>('details');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tax_eta' | 'pending_tax' | 'subscriptions' | 'approved_po'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeQuote = quotations.find((q) => q.id === selectedQuoteId) || quotations[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Financial Calculations
  const metrics = useMemo(() => {
    let totalPaidInvoices = 0;
    let totalVerifiedTaxEta = 0;
    let totalPendingCasual = 0;
    let totalApprovedPOs = 0;

    quotations.forEach(q => {
      const amount = q.totalAmount || 0;
      if (q.isTaxInvoice && !q.isPendingTaxInvoice) {
        totalPaidInvoices += amount;
        totalVerifiedTaxEta += amount;
      } else if (q.isPendingTaxInvoice) {
        totalPaidInvoices += amount;
        totalPendingCasual += amount;
      } else if (q.id.includes('cctv') || q.id.includes('friends')) {
        totalApprovedPOs += amount;
      }
    });

    return {
      totalPaidInvoices,
      totalVerifiedTaxEta,
      totalPendingCasual,
      totalApprovedPOs,
      grandTotal: totalPaidInvoices + totalApprovedPOs
    };
  }, [quotations]);

  // Filtered Quotations
  const filteredQuotations = useMemo(() => {
    return quotations.filter(q => {
      // Category filter
      if (categoryFilter === 'tax_eta' && (!q.isTaxInvoice || q.isPendingTaxInvoice)) return false;
      if (categoryFilter === 'pending_tax' && !q.isPendingTaxInvoice) return false;
      if (categoryFilter === 'subscriptions' && !q.id.includes('ec-') && !q.id.includes('vodafone')) return false;
      if (categoryFilter === 'approved_po' && (q.isTaxInvoice || q.isPendingTaxInvoice)) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchVendor = q.provider.name.toLowerCase().includes(query);
        const matchEta = q.taxInvoiceEtaId?.toLowerCase().includes(query);
        const matchInternal = q.internalId?.toLowerCase().includes(query);
        const matchDrive = q.driveFolder?.toLowerCase().includes(query);
        return matchTitle || matchVendor || matchEta || matchInternal || matchDrive;
      }

      return true;
    });
  }, [quotations, categoryFilter, searchQuery]);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200 select-none">
      
      {/* Top Header Card - Light Daylight Enterprise Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Receipt className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                سجل الفواتير الضريبية وأوامر الشراء لمقر المعادي
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold">
                {quotations.length} فواتير وعقود
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              حصر شامل وتدقيق مالي لكافة الفواتير الإلكترونية (ETA)، الفواتير العارضة، واشتراكات المقر وأوامر التوريد المعتمدة
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
          <button
            onClick={() => setViewMode('details')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'details'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>تفاصيل الفاتورة</span>
          </button>

          <button
            onClick={() => setViewMode('summary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'summary'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>جدول الحصر والمقارنة</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="طباعة السجل المالي"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Financial Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Total Paid Invoices */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-teal-800 mb-1">
            <span>إجمالي الفواتير المسددة (الفعلي)</span>
            <span className="p-1 rounded-lg bg-teal-100 text-teal-700 font-mono text-[10px]">9 فواتير</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-teal-950 font-mono tracking-tight">
            {metrics.totalPaidInvoices.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold font-sans">ج.م</span>
          </div>
          <p className="text-[11px] text-teal-700 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>شاملة الضرائب والرسوم المسددة حتى اليوم</span>
          </p>
        </div>

        {/* Card 2: Verified ETA Tax Invoices */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span>فواتير إلكترونية ضريبية (ETA)</span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              معتمدة 100%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
            {metrics.totalVerifiedTaxEta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold font-sans">ج.م</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            8 فواتير موثقة برقم إلكتروني ومسجلة ضريبياً
          </p>
        </div>

        {/* Card 3: Pending Casual Invoice */}
        <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
            <span>فواتير عارضة (بانتظار الضريبية)</span>
            <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold animate-pulse">
              متابعة غداً
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-950 font-mono tracking-tight">
            {metrics.totalPendingCasual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold font-sans">ج.م</span>
          </div>
          <p className="text-[11px] text-amber-800 mt-1">
            محل المنشاوي بالبستان #001096 (استلام الضريبية بكرة)
          </p>
        </div>

        {/* Card 4: Approved PO / Work Orders */}
        <div className="p-4 rounded-3xl bg-indigo-50/70 border border-indigo-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
            <span>أوامر توريد معتمدة تحت التنفيذ</span>
            <span className="px-1.5 py-0.2 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">
              معتمدة
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-950 font-mono tracking-tight">
            {metrics.totalApprovedPOs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-bold font-sans">ج.م</span>
          </div>
          <p className="text-[11px] text-indigo-700 mt-1">
            كاميرات الأصدقاء (55,050 ج) + سيرفر WE (8,500 ج/ش)
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              categoryFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل ({quotations.length})
          </button>
          
          <button
            onClick={() => setCategoryFilter('tax_eta')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${
              categoryFilter === 'tax_eta'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>فواتير ضريبية ETA (8)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('pending_tax')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${
              categoryFilter === 'pending_tax'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>⚠️ فواتير عارضة معلقة (1)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('subscriptions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              categoryFilter === 'subscriptions'
                ? 'bg-teal-700 text-white'
                : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/80'
            }`}
          >
            اشتراكات وهواتف (3)
          </button>

          <button
            onClick={() => setCategoryFilter('approved_po')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              categoryFilter === 'approved_po'
                ? 'bg-indigo-700 text-white'
                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200/80'
            }`}
          >
            عروض وتوريدات (2)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الفاتورة، المورد، البند..."
            className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Invoice Cards Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filteredQuotations.map((q) => {
          const isSelected = q.id === selectedQuoteId;
          const isPending = q.isPendingTaxInvoice;
          const isTax = q.isTaxInvoice && !isPending;

          return (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuoteId(q.id);
                setViewMode('details');
              }}
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2.5 shadow-xs relative overflow-hidden ${
                isSelected
                  ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isPending 
                      ? 'bg-amber-100 text-amber-800' 
                      : isTax 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {isPending ? <AlertTriangle className="w-4 h-4" /> : isTax ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {q.provider.name.split(' (')[0]}
                    </h3>
                    <p className="text-[10px] text-slate-500 truncate">
                      {q.type.split(' (')[0]}
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold shrink-0 ${
                  isPending
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : isTax
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {isPending ? 'عارضة معلقة' : isTax ? 'ضريبية ETA' : 'أمر شراء'}
                </span>
              </div>

              {/* Price and Date Row */}
              <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-black text-slate-900">
                    {q.totalAmountFormatted || 'سيرفر WE'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {q.submissionDate}
                </div>
              </div>

              {/* Status Note */}
              <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                <span className="truncate">{q.status}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Details View */}
      {viewMode === 'details' && activeQuote && (
        <div className="space-y-4">
          
          {/* Active Invoice Inspector Card */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            
            {/* Header / Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {activeQuote.isTaxInvoice && !activeQuote.isPendingTaxInvoice && (
                    <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      فاتورة إلكترونية ضريبية معتمدة (ETA)
                    </span>
                  )}

                  {activeQuote.isPendingTaxInvoice && (
                    <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-bold flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      فاتورة عارضة مؤقتة (في انتظار الضريبية غداً)
                    </span>
                  )}

                  <span className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold">
                    {activeQuote.type}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    ID: {activeQuote.id}
                  </span>
                </div>

                <h2 className="text-base sm:text-xl font-black text-slate-900">
                  {activeQuote.title}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  onClick={() => onAskHypatia(`أريد تدقيق واستشارة حول فاتورة: ${activeQuote.title} من المورد: ${activeQuote.provider.name} وقيمتها ${activeQuote.totalAmountFormatted}`)}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>استشارة هيباتيا</span>
                </button>
              </div>
            </div>

            {/* Pending Tax Alert Banner if Casual */}
            {activeQuote.isPendingTaxInvoice && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-amber-900 text-sm">
                    تنبيه ومتابعة: فاتورة عارضة مؤقتة اشتراها م/ سامح اليوم
                  </div>
                  <p className="leading-relaxed">
                    تم الشراء اليوم نقداً بموجب إيصال أمر بيع يدوي (Sales Order #001096) بمبلغ 8,510 جنيه، وتم الاتفاق مع البائع (محل المنشاوي بالبستان) على استلام الفاتورة الإلكترونية الضريبية المعتمدة غداً. فور استلامها سيتم رفعها في مجلد الفواتير الضريبية وتحديث السجل.
                  </p>
                </div>
              </div>
            )}

            {/* Google Drive Location Box */}
            {activeQuote.driveFolder && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="text-slate-500 font-bold">مكان الحفظ المعتمد في Google Drive:</span>
                  <code className="text-teal-900 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {activeQuote.driveFolder}
                  </code>
                </div>

                <button
                  onClick={() => handleCopy(activeQuote.driveFolder || '', `drive-${activeQuote.id}`)}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold transition flex items-center gap-1 self-start sm:self-auto"
                >
                  {copiedKey === `drive-${activeQuote.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>نسخ المسار</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Vendor & Client Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Vendor Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5 text-teal-700">
                    <Building2 className="w-4 h-4" />
                    بيانات الجهة البائعة / المورد
                  </span>
                  {activeQuote.taxRegistrationNumber && (
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                      س.ض: {activeQuote.taxRegistrationNumber}
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-slate-900">{activeQuote.provider.name}</div>
                <div className="text-xs text-slate-600 space-y-1">
                  {activeQuote.provider.representative && (
                    <div>العنوان والتفاصيل: <span className="font-bold text-slate-800">{activeQuote.provider.representative}</span></div>
                  )}
                  {activeQuote.provider.accountManager && (
                    <div>مسؤول التواصل: <span className="font-bold text-slate-800">{activeQuote.provider.accountManager}</span></div>
                  )}
                  {activeQuote.taxInvoiceEtaId && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-800 flex items-center justify-between mt-2">
                      <span className="text-slate-400">الرقم الإلكتروني (ETA UUID):</span>
                      <strong className="text-teal-900 select-all">{activeQuote.taxInvoiceEtaId}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5 text-indigo-700">
                    <Building2 className="w-4 h-4" />
                    بيانات المشتري / شركة مشاوير
                  </span>
                  <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    س.ت: 757315518#
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">{activeQuote.client.entity}</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>الموقع: <span className="font-bold text-slate-800">{activeQuote.client.site || 'مقر المعادي، القاهرة'}</span></div>
                  {activeQuote.client.authorizedPersons && (
                    <div>المسؤولين: <span className="font-bold text-slate-800">{activeQuote.client.authorizedPersons.join(' • ')}</span></div>
                  )}
                  {activeQuote.client.project && (
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 mt-2">
                      المشروع: <strong>{activeQuote.client.project}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            {activeQuote.lineItems && activeQuote.lineItems.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-teal-600" />
                  الأصناف والبنود المسجلة بالفاتورة ({activeQuote.lineItems.length} بنود)
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 font-bold">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">الصنف والبيان</th>
                        <th className="p-3">المواصفات الفنية</th>
                        <th className="p-3 text-center">الكمية</th>
                        {activeQuote.lineItems.some(i => i.unitPrice) && (
                          <th className="p-3 text-center">سعر الوحدة</th>
                        )}
                        {activeQuote.lineItems.some(i => i.totalPrice) && (
                          <th className="p-3 text-center">الإجمالي</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeQuote.lineItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition">
                          <td className="p-3 font-mono text-slate-400 font-bold">{item.itemNumber}</td>
                          <td className="p-3 font-bold text-slate-900">{item.description}</td>
                          <td className="p-3 text-slate-600 text-[11px] max-w-md">{item.specifications}</td>
                          <td className="p-3 text-center font-mono font-bold text-slate-800">
                            {item.quantity} {item.unit}
                          </td>
                          {activeQuote.lineItems?.some(i => i.unitPrice) && (
                            <td className="p-3 text-center font-mono font-bold text-slate-700">
                              {item.unitPrice ? `${item.unitPrice.toLocaleString('en-US')} ج` : '—'}
                            </td>
                          )}
                          {activeQuote.lineItems?.some(i => i.totalPrice) && (
                            <td className="p-3 text-center font-mono font-black text-teal-900">
                              {item.totalPrice ? `${item.totalPrice.toLocaleString('en-US')} ج` : '—'}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Financial Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 text-xs text-slate-600">
                {activeQuote.subtotalAmount && (
                  <div>المبلغ قبل الضريبة: <strong className="font-mono text-slate-900">{activeQuote.subtotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م</strong></div>
                )}
                {activeQuote.vatAmount !== undefined && activeQuote.vatAmount > 0 && (
                  <div>ضريبة القيمة المضافة 14%: <strong className="font-mono text-emerald-800">{activeQuote.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م</strong></div>
                )}
                {activeQuote.financialTerms?.compliance && (
                  <div className="text-[11px] text-slate-500 font-mono">{activeQuote.financialTerms.compliance}</div>
                )}
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-r border-slate-200 pt-2 sm:pt-0 sm:pr-4">
                <span className="text-xs text-slate-500 font-bold block">إجمالي قيمة الفاتورة المسددة:</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                  {activeQuote.totalAmountFormatted || 'سيرفر سحابي WE'}
                </span>
              </div>
            </div>

            {/* Audit Notes */}
            {activeQuote.auditNotes && activeQuote.auditNotes.length > 0 && (
              <div className="p-3 rounded-2xl bg-teal-50/50 border border-teal-200/80 space-y-1.5 text-xs">
                <span className="font-bold text-teal-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  ملاحظات التدقيق والتحقق المؤسسي:
                </span>
                <ul className="list-disc list-inside space-y-1 text-teal-800 text-[11px] pr-2 leading-relaxed">
                  {activeQuote.auditNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Summary View (Full Comparison Table) */}
      {viewMode === 'summary' && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900">
                جدول الحصر المالي الشامل لكافة الفواتير وأوامر الشراء
              </h2>
              <p className="text-xs text-slate-500">
                مقارنة المبالغ قبل الضريبة، ضريبة القيمة المضافة 14%، الإجمالي، وتاريخ الإصدار وحالة كل فاتورة
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">الفاتورة / المورد</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">النوع والحالة</th>
                  <th className="p-3 text-center">قبل الضريبة</th>
                  <th className="p-3 text-center">الضريبة 14%</th>
                  <th className="p-3 text-center">الإجمالي المسدد</th>
                  <th className="p-3 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotations.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3 font-mono text-slate-400 font-bold">{idx + 1}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{q.title.split(' (')[0]}</div>
                      <div className="text-[10px] text-slate-500">{q.provider.name}</div>
                    </td>
                    <td className="p-3 font-mono text-slate-600">{q.submissionDate}</td>
                    <td className="p-3">
                      {q.isPendingTaxInvoice ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                          عارضة معلقة (استلام بكرة)
                        </span>
                      ) : q.isTaxInvoice ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                          ضريبية معتمدة ETA
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold">
                          أمر توريد معتمد
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center font-mono text-slate-700">
                      {q.subtotalAmount ? `${q.subtotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج` : '—'}
                    </td>
                    <td className="p-3 text-center font-mono text-emerald-800">
                      {q.vatAmount ? `${q.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج` : '—'}
                    </td>
                    <td className="p-3 text-center font-mono font-black text-slate-900">
                      {q.totalAmountFormatted || 'سيرفر WE'}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedQuoteId(q.id);
                          setViewMode('details');
                        }}
                        className="px-2 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition"
                      >
                        عرض
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 border-t-2 border-slate-300 text-slate-900 font-bold">
                <tr>
                  <td colSpan={6} className="p-3 text-left font-bold">
                    إجمالي الفواتير المسددة المعتمدة لمقر المعادي:
                  </td>
                  <td className="p-3 text-center font-mono font-black text-base text-teal-950">
                    {metrics.totalPaidInvoices.toLocaleString('en-US', { minimumFractionDigits: 2 })} ج.م
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
