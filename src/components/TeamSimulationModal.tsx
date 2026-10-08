import React, { useState, useMemo } from 'react';
import { 
  X, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowLeft, 
  HelpCircle,
  Briefcase,
  Award,
  Zap,
  PhoneCall,
  UserCheck,
  ChevronLeft
} from 'lucide-react';
import { TEAM_SIMULATION_PROFILES, TeamMemberProfile, getRecommendedPersonForProblem } from '../data/teamSimulationData';

interface TeamSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterTasksByPerson?: (personName: string) => void;
  onAskHypatia?: (prompt: string) => void;
}

export const TeamSimulationModal: React.FC<TeamSimulationModalProps> = ({
  isOpen,
  onClose,
  onFilterTasksByPerson,
  onAskHypatia
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMemberProfile | null>(null);
  
  // Interactive Simulation Problem Solver
  const [problemQuery, setProblemQuery] = useState('');
  const [recommendationResult, setRecommendationResult] = useState<{
    primaryContact: TeamMemberProfile;
    supportingContact?: TeamMemberProfile;
    explanation: string;
  } | null>(null);

  const sampleProblemPrompts = [
    'مشكلة في تطبيق فور بي أو حركة الكباتن والرحلات',
    'تجهيز سيرفر ديل R640 أو كابينة الراك 27U وتوصيلات السويتش',
    'تدقيق كود فلاتر لتطبيق وكالة أو سكيما سوبابيز',
    'مطابقة فاتورة ضريبية ETA لشركة توريد أجهزة المقر',
    'توثيق التطبيقات بالسجل التجاري ومتابعة أوراق ترخيص النقل الذكي',
    'سحب كابلات السقف المعلق وتأريج نقاط الشبكة الـ 17'
  ];

  const handleTestProblem = (query: string) => {
    setProblemQuery(query);
    const rec = getRecommendedPersonForProblem(query);
    setRecommendationResult(rec);
  };

  const filteredMembers = useMemo(() => {
    return TEAM_SIMULATION_PROFILES.filter(m => {
      const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchSearch = 
        m.name.includes(searchQuery) ||
        m.roleDescription.includes(searchQuery) ||
        m.primaryStrengths.some(s => s.includes(searchQuery)) ||
        m.whenToConsult.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right select-none font-['Cairo',sans-serif]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex items-center justify-between gap-4 shrink-0 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-white">
                  محاكاة فريق العمل وأصحاب القرار (Team Profiles & Simulation)
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30">
                  {TEAM_SIMULATION_PROFILES.length} شخصيات ومحاور
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                ميزان تقدير الكفاءات والقدرات: من نعتمد عليه، من يساعد في ماذا، ومن لا يمتلك المعلومة الكافية لعدم إضاعة الوقت.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 active:scale-95"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">

          {/* 1. INTERACTIVE PROBLEM SOLVER WIDGET (محرك توجيه وحل المشاكل الذكي) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-teal-200 shadow-sm space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    محرك التوجيه وحل المشكلات: من الشخص المناسب لحل المشكلة فوراً؟
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    اكتب أي مشكلة تواجهك أو اختر من السيناريوهات السريعة لتعرف من هو الشخص المسؤول بنسبة كفاءته.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Scenario Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400">سيناريوهات سريعة:</span>
              {sampleProblemPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTestProblem(prompt)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 text-xs font-bold transition border border-slate-200 hover:border-teal-300"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={problemQuery}
                onChange={(e) => {
                  setProblemQuery(e.target.value);
                  if (e.target.value.trim().length > 2) {
                    handleTestProblem(e.target.value);
                  }
                }}
                placeholder="اكتب المشكلة التي تواجهك (مثال: عطل في سويتش سيسكو، مشاكل كباتن بالمعادي، عقد قيمة تك...)"
                className="flex-1 p-2.5 rounded-2xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
              <button
                onClick={() => handleTestProblem(problemQuery)}
                className="px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>تحليل وتوجيه</span>
              </button>
            </div>

            {/* Recommendation Result Card */}
            {recommendationResult && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-white border border-teal-300 animate-in slide-in-from-top-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{recommendationResult.primaryContact.avatar}</span>
                    <div>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                        الشخص المسؤول والمؤهل أولاً
                      </span>
                      <h4 className="text-sm font-black text-slate-900">
                        {recommendationResult.primaryContact.name} ({recommendationResult.primaryContact.title})
                      </h4>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-300">
                      كفاءة {recommendationResult.primaryContact.efficiencyRate}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white/80 p-2.5 rounded-xl border border-teal-100">
                  💡 {recommendationResult.explanation}
                </p>

                {recommendationResult.supportingContact && (
                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-slate-800">فريق الدعم والمعاونة معه:</span>
                    <span className="font-mono text-teal-800 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {recommendationResult.supportingContact.name} ({recommendationResult.supportingContact.efficiencyRate}%)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. FILTERS & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم، الدور، أو المهارات..."
                className="w-full sm:w-64 p-1.5 text-xs border-none focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-end text-xs">
              <span className="text-slate-400 font-bold ml-1">التصنيف:</span>
              {[
                { id: 'all', label: 'الكل' },
                { id: 'leadership', label: 'القيادة والاستشارات' },
                { id: 'operations', label: 'العمليات والكباتن' },
                { id: 'technical_crew', label: 'الفنيون والتنفيذيون' },
                { id: 'legal', label: 'القانون والتراخيص' },
                { id: 'finance', label: 'الماليات والحسابات' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. SIMULATION CARDS GRID (كروت الأشخاص الفخمة) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMembers.map((member) => {
              const isEmad = member.id === 'eng-emad';
              const isSameh = member.id === 'eng-sameh';

              return (
                <div
                  key={member.id}
                  className={`rounded-3xl bg-white border p-5 transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-md ${
                    isEmad 
                      ? 'border-emerald-300 ring-2 ring-emerald-500/10 bg-gradient-to-b from-emerald-50/20 to-white' 
                      : isSameh 
                      ? 'border-blue-300 ring-2 ring-blue-500/10 bg-gradient-to-b from-blue-50/20 to-white'
                      : 'border-slate-200 hover:border-teal-400'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-2xl flex items-center justify-center border border-slate-200 shrink-0 shadow-2xs">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-black text-slate-900">
                              {member.name}
                            </h3>
                            {member.contactNote && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-sans">
                                {member.contactNote}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-teal-800 block mt-0.5">
                            {member.title}
                          </span>
                        </div>
                      </div>

                      {/* Efficiency Metric Badge */}
                      <div className="text-left shrink-0">
                        <div className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                          كفاءة {member.efficiencyRate}%
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                          {member.readinessStatus}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar of Efficiency */}
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          member.efficiencyRate >= 95
                            ? 'bg-emerald-600'
                            : member.efficiencyRate >= 85
                            ? 'bg-teal-600'
                            : member.efficiencyRate >= 70
                            ? 'bg-blue-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${member.efficiencyRate}%` }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {member.roleDescription}
                    </p>

                    {/* Strengths & Capabilities */}
                    <div className="space-y-1.5 text-xs">
                      <span className="font-bold text-slate-800 block text-[11px]">أبرز مجالات القوة والكفاءة:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.primaryStrengths.map((str, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-medium px-2 py-1 rounded-xl bg-teal-50 text-teal-900 border border-teal-100"
                          >
                            ✓ {str}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decision Guidelines: When to Consult vs When NOT to consult */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                        <span className="text-[10px] font-black text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>متى نلجأ له ونعتمد عليه؟</span>
                        </span>
                        <p className="text-[11px] text-emerald-950 leading-relaxed">
                          {member.whenToConsult}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1">
                        <span className="text-[10px] font-black text-rose-900 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>ما الذي لا نسأله فيه / ليس اختصاصه؟</span>
                        </span>
                        <p className="text-[11px] text-rose-950 leading-relaxed">
                          {member.whenNOTToConsult}
                        </p>
                      </div>
                    </div>

                    {/* Assistants and Team */}
                    {member.assistants.length > 0 && (
                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700">المساعدون والمعاونون له:</span>
                        <span className="font-medium text-slate-900">
                          {member.assistants.join(' • ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {onFilterTasksByPerson && (
                      <button
                        onClick={() => {
                          onFilterTasksByPerson(member.shortName);
                          onClose();
                        }}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl transition"
                      >
                        <span>عرض مهام {member.shortName} في قائمة الـ 135 مهمة</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {onAskHypatia && (
                      <button
                        onClick={() => {
                          onAskHypatia(`أريد استشارة ومحاكاة رأي ${member.name} بخصوص موضوع في منظومة مشاوير`);
                          onClose();
                        }}
                        className="text-[11px] text-slate-500 hover:text-slate-800 font-bold transition flex items-center gap-1"
                      >
                        <span>استشارة هيباتيا</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4 shrink-0 text-xs">
          <div className="text-slate-500 font-bold">
            💡 نصيحة المنظومة: استشارة الشخص المناسب في مجاله توفر 90% من الوقت وتضمن دقة القرارات الميدانية والهندسية.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition shadow-sm active:scale-95"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
