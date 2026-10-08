import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Layers, 
  Sparkles,
  Calendar,
  Filter,
  Check
} from 'lucide-react';
import { ProjectTask, ProjectItem } from '../types';

interface TasksTabProps {
  tasks: ProjectTask[];
  projects: ProjectItem[];
  activeProject: ProjectItem;
  onAddTask: (task: ProjectTask) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onAskEmo: (prompt: string) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  projects,
  activeProject,
  onAddTask,
  onToggleTaskStatus,
  onDeleteTask,
  onAskEmo,
}) => {
  const [filter, setFilter] = useState<'all' | 'active_project' | 'urgent' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProjectId, setTaskProjectId] = useState(activeProject.id);
  const [taskPriority, setTaskPriority] = useState<'عاجل' | 'متوسط' | 'منخفض'>('عاجل');
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: ProjectTask = {
      id: `task-${Date.now()}`,
      projectId: taskProjectId,
      title: taskTitle.trim(),
      description: taskDescription.trim() || undefined,
      priority: taskPriority,
      status: 'قيد الانتظار',
      createdAt: 'اليوم',
      dueDate: taskDueDate.trim() || 'قريباً',
    };

    onAddTask(newTask);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setIsAddingTask(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active_project') return t.projectId === activeProject.id;
    if (filter === 'urgent') return t.priority === 'عاجل' && t.status !== 'مكتمل';
    if (filter === 'completed') return t.status === 'مكتمل';
    return true;
  });

  const getProjectName = (projId: string) => {
    const p = projects.find((x) => x.id === projId);
    return p ? p.name : 'تطبيق غير محدد';
  };

  return (
    <div className="space-y-4 pb-16 max-w-4xl mx-auto select-none text-slate-800">
      {/* Top Header Card - Daylight Style */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-xs">
            <CheckSquare className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                إدارة ومتابعة المهام التنفيذية ({tasks.length})
              </h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                {tasks.filter(t => t.status === 'مكتمل').length} مكتمل
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              توزيع ومتابعة المهام البرمجية والهندسية لتطبيقات مشاوير (4B، وكالة، دارو) وتجهيزات المقر.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAddingTask ? 'إغلاق النموذج' : 'إضافة مهمة جديدة'}</span>
        </button>
      </div>

      {/* Add Task Collapsible Form */}
      {isAddingTask && (
        <form
          onSubmit={handleCreateTask}
          className="bg-white border border-teal-200 rounded-3xl p-5 space-y-3.5 animate-in fade-in shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="text-xs font-bold text-teal-900">نموذج إضافة مهمة جديدة:</span>
            <span className="text-[11px] text-slate-400">ستسجل فوراً في قائمة المتابعة</span>
          </div>

          <div>
            <label className="block text-xs text-slate-700 mb-1 font-bold">عنوان المهمة:</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="مثال: فحص شاشات الدفع في تطبيق فور بي والتأكد من دعم Apple Pay"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs text-slate-700 mb-1 font-bold">التطبيق التابع له:</label>
              <select
                value={taskProjectId}
                onChange={(e) => setTaskProjectId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-700 mb-1 font-bold">الأولوية:</label>
              <select
                value={taskPriority}
                onChange={(e: any) => setTaskPriority(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="عاجل">🔴 عاجل</option>
                <option value="متوسط">🟡 متوسط</option>
                <option value="منخفض">🟢 منخفض</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-700 mb-1 font-bold">الموعد المستهدف:</label>
              <input
                type="text"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                placeholder="مثلاً: اليوم 6 مساءً أو 2026-10-05"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-700 mb-1 font-bold">تفاصيل إضافية أو ملاحظات:</label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="ملاحظات تفصيلية للمهمة..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:text-slate-900"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              حفظ المهمة
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs & AI Helper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs shrink-0 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filter === 'all'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الكل ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('active_project')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filter === 'active_project'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {activeProject.name}
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filter === 'urgent'
                ? 'bg-white text-rose-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            العاجلة فقط
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filter === 'completed'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المكتملة
          </button>
        </div>

        <button
          onClick={() =>
            onAskEmo(
              `حلل لي قائمة مهام مشاوير الحالية واقترح خطة تنفيذ لأول 3 مهام حرجة يجب الانتهاء منها اليوم.`
            )
          }
          className="px-3.5 py-2 rounded-2xl bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs font-bold text-teal-800 flex items-center gap-1.5 transition shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>ترتيب الأولويات مع هيباتيا</span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">لا توجد مهام مطابقة للفلتر المحدد</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'مكتمل';
            const isUrgent = task.priority === 'عاجل';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl bg-white border transition shadow-xs flex items-start justify-between gap-3 ${
                  isDone 
                    ? 'border-slate-200 opacity-70 bg-slate-50/50' 
                    : isUrgent 
                    ? 'border-amber-200 hover:border-amber-300' 
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    onClick={() => onToggleTaskStatus(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 ${
                      isDone
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-slate-300 hover:border-teal-500 bg-white'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </button>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                        {getProjectName(task.projectId)}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        task.priority === 'عاجل'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : task.priority === 'متوسط'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    {task.description && (
                      <p className={`text-[11px] leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-0.5">
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-teal-800 font-bold">
                          <Calendar className="w-3 h-3 text-teal-600" />
                          <span>المستهدف: {task.dueDate}</span>
                        </span>
                      )}
                      <span>أُضيفت: {task.createdAt}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-slate-300 hover:text-rose-600 transition p-1 shrink-0"
                  title="حذف المهمة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
