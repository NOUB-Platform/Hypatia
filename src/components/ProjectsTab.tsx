import React, { useState } from 'react';
import { 
  Smartphone, 
  Plus, 
  ExternalLink, 
  FileCode2, 
  Layers, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Download,
  Bot,
  RotateCcw
} from 'lucide-react';
import { ProjectItem, ApkItem } from '../types';

interface ProjectsTabProps {
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onSelectActiveProject: (project: ProjectItem) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onAddNewProject: (project: ProjectItem) => void;
  onResetOfficialProjects?: () => void;
  onAskEmo?: (prompt: string) => void;
  onNavigateToChatWithPrompt?: (prompt: string, project?: ProjectItem) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  activeProject,
  onSelectActiveProject,
  onUpdateProject,
  onAddNewProject,
  onResetOfficialProjects,
  onAskEmo,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingFigmaProject, setEditingFigmaProject] = useState<ProjectItem | null>(null);
  const [newFigmaUrl, setNewFigmaUrl] = useState('');
  
  const [addingApkProject, setAddingApkProject] = useState<ProjectItem | null>(null);
  const [newApkVersion, setNewApkVersion] = useState('');
  const [newApkBuild, setNewApkBuild] = useState('');
  const [newApkFileName, setNewApkFileName] = useState('');
  const [newApkFileSize, setNewApkFileSize] = useState('');
  const [newApkNotes, setNewApkNotes] = useState('');

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjCode, setNewProjCode] = useState('');
  const [newProjCat, setNewProjCat] = useState('مشاوير');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjFigma, setNewProjFigma] = useState('');

  // Strict anti-leak filter: Purge any remnants of Noub / Sports
  const cleanProjects = projects.filter((p) => 
    p.id && 
    !p.id.includes('noub') && 
    !p.id.includes('sports') && 
    p.category !== 'نوب NOUB' && 
    !p.name?.includes('نوب') &&
    !p.name?.toLowerCase().includes('pub')
  );

  const filteredProjects = cleanProjects.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const handleSaveFigma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFigmaProject) return;
    const updated: ProjectItem = {
      ...editingFigmaProject,
      figmaUrl: newFigmaUrl.trim(),
    };
    onUpdateProject(updated);
    setEditingFigmaProject(null);
  };

  const handleSaveApk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingApkProject || !newApkVersion) return;

    const newApk: ApkItem = {
      id: `apk-${Date.now()}`,
      version: newApkVersion.trim(),
      buildNumber: Number(newApkBuild) || 1,
      fileName: newApkFileName.trim() || `${addingApkProject.code}_${newApkVersion}.apk`,
      fileSize: newApkFileSize.trim() || '35 MB',
      uploadedAt: 'اليوم',
      notes: newApkNotes.trim() || 'تم استلام النسخة للفحص',
      status: 'جاهز للاختبار',
    };

    const updated: ProjectItem = {
      ...addingApkProject,
      apkFiles: [newApk, ...addingApkProject.apkFiles],
    };

    onUpdateProject(updated);
    setAddingApkProject(null);
    setNewApkVersion('');
    setNewApkBuild('');
    setNewApkFileName('');
    setNewApkFileSize('');
    setNewApkNotes('');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: newProjName.trim(),
      code: newProjCode.trim().toUpperCase() || 'APP',
      category: newProjCat,
      description: newProjDesc.trim() || 'تطبيق جديد قيد المتابعة والتطوير',
      status: 'قيد التطوير',
      figmaUrl: newProjFigma.trim() || undefined,
      apkFiles: [],
      notes: 'تم إنشاء المشروع حديثاً.',
    };

    onAddNewProject(newProject);
    setIsAddProjectModalOpen(false);
    setNewProjName('');
    setNewProjCode('');
    setNewProjDesc('');
    setNewProjFigma('');
  };

  return (
    <div className="space-y-4 pb-20 select-none text-slate-800">
      {/* Top Bar: Title & Filter */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <Smartphone className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                تطبيقات ومنصات المنظومة ({projects.length})
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                مشاوير 4B • وكالة • دارو
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              متابعة حالة كل تطبيق، روابط تصاميم Figma، ملفات الـ APK التجريبية، والاستشارات التقنية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onResetOfficialProjects && (
            <button
              onClick={onResetOfficialProjects}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-slate-200 shadow-2xs"
              title="تفريغ الكاش وتحديث المنظومة بمشاريع مشاوير الرسمية فقط"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
              <span>تحديث المشاريع الرسمية</span>
            </button>
          )}

          <button
            onClick={() => setIsAddProjectModalOpen(true)}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة تطبيق جديد</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((p) => {
          const isActive = p.id === activeProject.id;

          return (
            <div
              key={p.id}
              className={`rounded-3xl p-5 transition-all border shadow-xs bg-white ${
                isActive
                  ? 'border-teal-500 ring-2 ring-teal-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-slate-900">{p.name}</h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {p.code}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                      منظومة مشاوير
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectActiveProject(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isActive ? 'التطبيق النشط' : 'تحديد كنطاق عمل'}
                </button>
              </div>

              {/* Status & Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-bold">{p.status}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {p.apkFiles.length} ملفات APK مسجلة
                </div>
              </div>

              {/* Figma Link Section */}
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block">رابط فيجما (Figma):</span>
                    {p.figmaUrl ? (
                      <a
                        href={p.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-700 hover:text-purple-900 font-bold hover:underline truncate block"
                      >
                        {p.figmaUrl}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">لم يتم إدخال رابط بعد</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEditingFigmaProject(p);
                    setNewFigmaUrl(p.figmaUrl || '');
                  }}
                  className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs shrink-0"
                  title="تعديل رابط فيجما"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* APK Files Section */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-teal-700" />
                    <span>ملفات الـ APK المسجلة:</span>
                  </span>
                  <button
                    onClick={() => setAddingApkProject(p)}
                    className="text-[11px] text-teal-700 hover:text-teal-900 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" />
                    <span>تسجيل APK وصلك</span>
                  </button>
                </div>

                {p.apkFiles.length === 0 ? (
                  <div className="text-center py-2.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-[11px] text-slate-400">
                    لا يوجد ملفات APK مسجلة بعد لهذا التطبيق
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {p.apkFiles.slice(0, 2).map((apk) => (
                      <div
                        key={apk.id}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span className="font-mono text-teal-800">{apk.version}</span>
                            <span className="text-[10px] text-slate-500 font-mono">({apk.fileSize})</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                              {apk.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{apk.notes}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">{apk.uploadedAt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer AI Consultation Action */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    onAskEmo(
                      `أريد ملخصاً شاملاً لحالة تطبيق ${p.name} (${p.code}) وأولويات الفحص المطلوبة مع المطور الخارجي وقاعدة البيانات.`
                    )
                  }
                  className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>استشارة هيباتيا بخصوص {p.name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Figma Modal */}
      {editingFigmaProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                تعديل رابط فيجما لـ {editingFigmaProject.name}
              </h3>
              <button
                onClick={() => setEditingFigmaProject(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFigma} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">رابط Figma المعتمد:</label>
                <input
                  type="url"
                  value={newFigmaUrl}
                  onChange={(e) => setNewFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/design/..."
                  required
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingFigmaProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                >
                  حفظ الرابط
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add APK Modal */}
      {addingApkProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                تسجيل إصدار APK جديد لـ {addingApkProject.name}
              </h3>
              <button
                onClick={() => setAddingApkProject(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveApk} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">رقم الإصدار (Version):</label>
                  <input
                    type="text"
                    value={newApkVersion}
                    onChange={(e) => setNewApkVersion(e.target.value)}
                    placeholder="v1.0.2-beta"
                    required
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">رقم البناء (Build Number):</label>
                  <input
                    type="number"
                    value={newApkBuild}
                    onChange={(e) => setNewApkBuild(e.target.value)}
                    placeholder="102"
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">ملاحظات الإصدار والتغييرات:</label>
                <textarea
                  value={newApkNotes}
                  onChange={(e) => setNewApkNotes(e.target.value)}
                  placeholder="ما الذي تم تغييره أو إصلاحه في هذه النسخة..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddingApkProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                >
                  تسجيل الـ APK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 max-w-md w-full space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">إضافة تطبيق جديد للمنظومة</h3>
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">اسم التطبيق:</label>
                <input
                  type="text"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  placeholder="مثال: تطبيق كابتن مشاوير"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">الكود التعريفي (Code):</label>
                  <input
                    type="text"
                    value={newProjCode}
                    onChange={(e) => setNewProjCode(e.target.value)}
                    placeholder="CAPTAIN"
                    required
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 mb-1 font-bold">التصنيف:</label>
                  <input
                    type="text"
                    value={newProjCat}
                    onChange={(e) => setNewProjCat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 mb-1 font-bold">الوصف ودور التطبيق:</label>
                <textarea
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="وصف مهام التطبيق ونطاق العمل..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs"
                >
                  إنشاء التطبيق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
