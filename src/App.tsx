import React, { useState, useEffect } from 'react';
import { AdminSidebarLayout } from './components/AdminSidebarLayout';
import { HomeTab } from './components/HomeTab';
import { AgendaTab } from './components/AgendaTab';
import { SubscriptionsTab } from './components/SubscriptionsTab';
import { ContactsDirectoryModal } from './components/ContactsDirectoryModal';
import { CredentialsVaultModal } from './components/CredentialsVaultModal';
import { ContinuousQuestionsModal } from './components/ContinuousQuestionsModal';
import { NeuralNetworkGraphModal } from './components/NeuralNetworkGraphModal';
import { ChatTab } from './components/ChatTab';
import { ProjectsTab } from './components/ProjectsTab';
import { ContractsTab } from './components/ContractsTab';
import { QuotationsTab } from './components/QuotationsTab';
import { MashweerEmailsTab } from './components/MashweerEmailsTab';
import { ProvidersVaultTab } from './components/ProvidersVaultTab';
import { VoiceCommandModal } from './components/VoiceCommandModal';
import { TasksTab } from './components/TasksTab';
import { CodeTab } from './components/CodeTab';
import { DatabaseTab } from './components/DatabaseTab';
import { ToolsTab } from './components/ToolsTab';
import { SettingsTab } from './components/SettingsTab';
import { MoreMenuDrawer } from './components/MoreMenuDrawer';
import { ProjectSourceDriveModal } from './components/ProjectSourceDriveModal';
import { InteractiveLiveGraphTab } from './components/InteractiveLiveGraphTab';
import { HeadquartersFloorplanTab } from './components/HeadquartersFloorplanTab';
import { MasterArabicLedgerView } from './components/MasterArabicLedgerView';
import { FirewallTopologyModal } from './components/FirewallTopologyModal';
import { TeamSimulationModal } from './components/TeamSimulationModal';
import { MasterInteractiveRoadmapModal } from './components/MasterInteractiveRoadmapModal';
import { ArchitecturalWorkflowsModal } from './components/ArchitecturalWorkflowsModal';
import { ServerRackGraphicModal } from './components/ServerRackGraphicModal';
import { MeshawirNetworkPingTab } from './components/MeshawirNetworkPingTab';

import { 
  TabType, 
  ChatMessage, 
  ProjectItem, 
  ProjectTask, 
  ApiEndpointItem, 
  ContractDeliverable, 
  MashweerEmployeeEmail,
  ServiceProviderItem,
  SystemInquiry 
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_TASKS, 
  INITIAL_API_ENDPOINTS, 
  INITIAL_CONTRACT_DELIVERABLES, 
  INITIAL_MASHWEER_EMAILS,
  INITIAL_SERVICE_PROVIDERS 
} from './data/initialProjects';
import { INITIAL_SYSTEM_INQUIRIES } from './data/initialInquiries';
import { fetchAllDataFromSupabase } from './lib/supabase';
import { requestDriveAccessToken } from './lib/firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [ecosystemMode, setEcosystemMode] = useState<'mashweer' | 'sameh'>('mashweer');
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isNeuralModalOpen, setIsNeuralModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isProjectSourceModalOpen, setIsProjectSourceModalOpen] = useState(false);
  const [isFirewallModalOpen, setIsFirewallModalOpen] = useState(false);
  const [isTeamSimulationModalOpen, setIsTeamSimulationModalOpen] = useState(false);
  const [isMasterRoadmapModalOpen, setIsMasterRoadmapModalOpen] = useState(false);
  const [isWorkflowsModalOpen, setIsWorkflowsModalOpen] = useState(false);
  const [isServerRackModalOpen, setIsServerRackModalOpen] = useState(false);
  const [masterRoadmapFilterPerson, setMasterRoadmapFilterPerson] = useState<string>('all');
  const [isDriveSyncing, setIsDriveSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Inquiries State with LocalStorage persistence & auto-merge of new questions
  const [inquiries, setInquiries] = useState<SystemInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_system_inquiries');
      if (saved) {
        const parsed: SystemInquiry[] = JSON.parse(saved);
        // Exclude any obsolete noub platform inquiries from previous state
        const cleaned = parsed.filter(item => item.category !== 'noub_platform' && !item.id.includes('noub'));
        const savedMap = new Map(cleaned.map(item => [item.id, item]));
        return INITIAL_SYSTEM_INQUIRIES.map(item => savedMap.get(item.id) || item);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SYSTEM_INQUIRIES;
  });

  // Projects State with LocalStorage persistence
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_projects_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Exclude all obsolete noub/sports projects completely
        const cleaned = parsed.filter((p: any) => 
          p.id && 
          !p.id.includes('noub') && 
          !p.id.includes('sports') && 
          p.category !== 'نوب NOUB' && 
          !p.name?.includes('نوب') &&
          !p.name?.toLowerCase().includes('pub')
        );
        const existingIds = new Set(cleaned.map((p: any) => p.id));
        const newFromInit = INITIAL_PROJECTS.filter((ip) => !existingIds.has(ip.id));
        
        // Merge initial projects driveAssets and referenceChats if missing, and sync real Figma links
        const updatedExisting = cleaned.map((p: ProjectItem) => {
          const init = INITIAL_PROJECTS.find((ip) => ip.id === p.id);
          return {
            ...p,
            figmaUrl: (!p.figmaUrl || p.figmaUrl.includes('sample-')) ? (init?.figmaUrl || p.figmaUrl) : p.figmaUrl,
            driveAssets: p.driveAssets || init?.driveAssets || [],
            referenceChats: p.referenceChats || init?.referenceChats || [],
            contextHints: p.contextHints || init?.contextHints || [],
          };
        });

        const merged = [...updatedExisting, ...newFromInit];
        localStorage.setItem('hypatia_projects_data', JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('hypatia_active_project_id');
      if (saved && !saved.includes('noub') && !saved.includes('sports') && !saved.toLowerCase().includes('pub')) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    try {
      localStorage.setItem('hypatia_active_project_id', 'proj-4b');
    } catch (e) {}
    return 'proj-4b';
  });

  // Tasks State with LocalStorage persistence
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_tasks_data');
      if (saved) {
        const parsed: ProjectTask[] = JSON.parse(saved);
        const existingTaskIds = new Set(parsed.map((t) => t.id));
        const newTasks = INITIAL_TASKS.filter((it) => !existingTaskIds.has(it.id));
        return [...parsed, ...newTasks];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  // Contracts & Deliverables State
  const [contracts, setContracts] = useState<ContractDeliverable[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_contracts_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CONTRACT_DELIVERABLES;
  });

  // Mashweer Employee Emails State
  const [mashweerEmails, setMashweerEmails] = useState<MashweerEmployeeEmail[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_mashweer_emails');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MASHWEER_EMAILS;
  });

  // API Endpoints State with LocalStorage persistence
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpointItem[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_api_endpoints');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_API_ENDPOINTS;
  });

  // Service Providers & Vault State with LocalStorage persistence
  const [serviceProviders, setServiceProviders] = useState<ServiceProviderItem[]>(() => {
    try {
      const saved = localStorage.getItem('hypatia_service_providers');
      if (saved) {
        const parsed: ServiceProviderItem[] = JSON.parse(saved);
        return parsed.map((sp) => {
          const init = INITIAL_SERVICE_PROVIDERS.find((isp) => isp.id === sp.id);
          return {
            ...sp,
            activeServices: sp.activeServices && sp.activeServices.length > 0 ? sp.activeServices : (init?.activeServices || []),
            costOrPlan: init?.costOrPlan || sp.costOrPlan,
            officialBadge: init?.officialBadge || sp.officialBadge,
          };
        });
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SERVICE_PROVIDERS;
  });

  const fallbackProject: ProjectItem = INITIAL_PROJECTS[0] || {
    id: 'proj-4b',
    name: 'تطبيق مشاوير فور بي (4B Passenger App)',
    code: 'MASHWEER-4B',
    category: 'مشاوير MASHWEER',
    status: 'قيد التطوير',
    description: 'تطبيق الركاب والرحلات الذكية لمنظومة مشاوير الرقمية، متصل بسحابة WE بداتا سنتر القرية الذكية.',
    apkFiles: [],
    driveAssets: [],
    referenceChats: [],
    contextHints: [],
    dbInfo: { type: 'PostgreSQL / PostGIS', tables: [], notes: '' }
  };
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || fallbackProject;

  // Auto-clean any legacy remnants of Noub/Sports from user's browser localStorage on boot
  useEffect(() => {
    try {
      const active = localStorage.getItem('hypatia_active_project_id');
      if (!active || active.includes('noub') || active.includes('sports') || active.toLowerCase().includes('pub')) {
        localStorage.setItem('hypatia_active_project_id', 'proj-4b');
        setActiveProjectId('proj-4b');
      }

      const pSaved = localStorage.getItem('hypatia_projects_data');
      if (pSaved) {
        const parsed = JSON.parse(pSaved);
        if (Array.isArray(parsed)) {
          const hasNoub = parsed.some((p: any) => 
            p.id?.includes('noub') || 
            p.id?.includes('sports') || 
            p.name?.includes('نوب') || 
            p.category === 'نوب NOUB' ||
            p.name?.toLowerCase().includes('pub')
          );
          if (hasNoub) {
            const sanitized = parsed.filter((p: any) => 
              !p.id?.includes('noub') && 
              !p.id?.includes('sports') && 
              !p.name?.includes('نوب') && 
              p.category !== 'نوب NOUB' &&
              !p.name?.toLowerCase().includes('pub')
            );
            const finalList = sanitized.length > 0 ? sanitized : INITIAL_PROJECTS;
            localStorage.setItem('hypatia_projects_data', JSON.stringify(finalList));
            setProjects(finalList);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hypatia_service_providers', JSON.stringify(serviceProviders));
    } catch (e) {
      console.error(e);
    }
  }, [serviceProviders]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hypatia_projects_data', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_contracts_data', JSON.stringify(contracts));
    } catch (e) {
      console.error(e);
    }
  }, [contracts]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_mashweer_emails', JSON.stringify(mashweerEmails));
    } catch (e) {
      console.error(e);
    }
  }, [mashweerEmails]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_active_project_id', activeProjectId);
    } catch (e) {
      console.error(e);
    }
  }, [activeProjectId]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_tasks_data', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_api_endpoints', JSON.stringify(apiEndpoints));
    } catch (e) {
      console.error(e);
    }
  }, [apiEndpoints]);

  useEffect(() => {
    try {
      localStorage.setItem('hypatia_system_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  const handleAnswerInquiry = (inquiryId: string, answerText: string) => {
    setInquiries((prev) =>
      prev.map((q) =>
        q.id === inquiryId
          ? {
              ...q,
              answered: true,
              answer: answerText,
              answeredAt: new Date().toISOString().split('T')[0],
            }
          : q
      )
    );
  };

  const handleReopenInquiry = (inquiryId: string) => {
    setInquiries((prev) =>
      prev.map((q) =>
        q.id === inquiryId
          ? {
              ...q,
              answered: false,
            }
          : q
      )
    );
  };

  const handleAddNewInquiry = (newInquiry: SystemInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleResetOfficialProjects = () => {
    setProjects(INITIAL_PROJECTS);
    setActiveProjectId('proj-4b');
    localStorage.setItem('hypatia_projects_data', JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem('hypatia_active_project_id', 'proj-4b');
    setSyncFeedback('تمت إعادة ضبط المشاريع ومطابقتها حصرياً مع منظومة مشاوير المعتمدة (4B، وكالة، دارو، المعادي، التداول، كاجل)!');
  };

  const handleDownloadZip = () => {
    window.location.href = '/api/system/download-noub-zip';
  };

  const handleTriggerDriveSync = async () => {
    setIsDriveSyncing(true);
    setSyncFeedback('جاري بدء تحديث ومزامنة مجلد Mashweer_Digital_Platforms على Google Drive...');
    try {
      let token = await requestDriveAccessToken();
      const res = await fetch('/api/drive/sync-mashweer-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token || '' }),
      });
      const data = await res.json();
      if (data.success) {
        setSyncFeedback(`تمت المزامنة بنجاح! تم إنشاء وتحديث مجلد Mashweer_Digital_Platforms على Google Drive`);
      } else {
        setSyncFeedback(data.message || 'تمت المحاولة ولكن يلزم تأكيد إذن الحساب');
      }
    } catch (err: any) {
      setSyncFeedback('تعذر إكمال المزامنة السحابية: ' + (err?.message || 'خطأ'));
    } finally {
      setIsDriveSyncing(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  // Automatic Cloud Sync: Hydrate local state from Supabase ONLY if remote data has records
  useEffect(() => {
    let isMounted = true;
    fetchAllDataFromSupabase().then((data) => {
      if (!isMounted || !data) return;
      if (Array.isArray(data.projects) && data.projects.length > 0) {
        setProjects(data.projects);
      }
      if (Array.isArray(data.providers) && data.providers.length > 0) {
        setServiceProviders(data.providers);
      }
      if (Array.isArray(data.contracts) && data.contracts.length > 0) {
        setContracts(data.contracts);
      }
      if (Array.isArray(data.emails) && data.emails.length > 0) {
        setMashweerEmails(data.emails);
      }
      if (Array.isArray(data.tasks) && data.tasks.length > 0) {
        setTasks(data.tasks);
      }
    }).catch((err) => {
      console.warn('Silent fallback to local data on Supabase sync failure:', err);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'hypatia',
      content: `أهلاً بك يا باشمهندس سامح. أنا "هيباتيا" (Hypatia) - مساعدك التقني والبرمجي الشخصي لإدارة منظومة مشاوير للمنصات الرقمية ومقر المعادي.

أنا جاهزة ومستعدة للتنفيذ الفوري معك في:
• كتابة وتعديل وترقية الأكواد وتطوير الدوال (TypeScript / Node.js / React / Python / Flutter)
• صياغة استعلامات قواعد البيانات المتقدمة لـ Supabase و PostgreSQL مع فهارس PostGIS
• إدارة خطوط الربط وعرض المصرية للاتصالات WE (خط الربط 24Mbps L3VPN عبر الفايبر وخوادم 4B السحابية)
• متابعة تجهيزات داتا سنتر مقر المعادي (سيرفر DELL R640، راك بيرلا 27U، سويتشات Cisco 3850 PoE، محطات Z440)
• متابعة وتطوير تطبيقات المنظومة (فور بي 4B، وكالة WeKaLa، دارو Daro، وكابتن مشاوير)

المشروع النشط حالياً: **${activeProject.name}**. ما الذي تود أن نبدأ بكتابته أو فحصه الآن؟`,
      timestamp: 'الآن',
    },
  ]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Send message to Gemini API via server.ts
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoadingChat(true);

    try {
      // Find relevant project tasks to attach to context
      const projectTasks = tasks.filter((t) => t.projectId === activeProject.id);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          activeProject: {
            ...activeProject,
            currentTasksCount: projectTasks.length,
            pendingTasks: projectTasks.map((t) => t.title),
          },
          context: {
            registeredEndpoints: apiEndpoints.map((ep) => ({
              name: ep.name,
              service: ep.service,
              ip: ep.urlOrIp,
              status: ep.status,
            })),
          },
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'hypatia',
        content: data.reply || 'تم استلام طلبك ومعالجته.',
        timestamp: data.timestamp || new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error(err);
      const errorReply: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'hypatia',
        content: 'حدث خطأ أثناء الاتصال: ' + (err.message || 'خطأ غير معروف'),
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleAskHypatiaFromAnywhere = (prompt: string, project?: ProjectItem) => {
    if (project) {
      setActiveProjectId(project.id);
    }
    setCurrentTab('chat');
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'hypatia',
        content: `تم مسح المحادثة. أنا جاهزة لأي مهمة برمجية أو استفسار لنظام ${activeProject.name}.`,
        timestamp: 'الآن',
      },
    ]);
  };

  // Project Management Actions
  const handleUpdateProject = (updated: ProjectItem) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddNewProject = (newProject: ProjectItem) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
  };

  // Task Management Actions
  const handleAddTask = (newTask: ProjectTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: t.status === 'مكتمل' ? 'قيد الانتظار' : 'مكتمل',
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Contracts Actions
  const handleUpdateContract = (updated: ContractDeliverable) => {
    setContracts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Mashweer Employee Emails Actions
  const handleAddEmail = (newEmail: MashweerEmployeeEmail) => {
    setMashweerEmails((prev) => [newEmail, ...prev]);
  };

  const handleDeleteEmail = (id: string) => {
    setMashweerEmails((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateEmailStatus = (id: string, status: MashweerEmployeeEmail['status']) => {
    setMashweerEmails((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  // Service Providers Actions
  const handleAddProvider = (newProvider: ServiceProviderItem) => {
    setServiceProviders((prev) => [newProvider, ...prev]);
  };

  const handleUpdateProvider = (updated: ServiceProviderItem) => {
    setServiceProviders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProvider = (id: string) => {
    setServiceProviders((prev) => prev.filter((p) => p.id !== id));
  };

  // Voice Command Action Processor
  const handleVoiceAction = (actionType: string, payload: any) => {
    if (actionType === 'navigate_tab') {
      setCurrentTab(payload.tab);
    } else if (actionType === 'compare_figma') {
      setCurrentTab('code');
      handleAskHypatiaFromAnywhere(payload.prompt || 'مقارنة شاشات فيجما بكود المشروع واستخراج الفروقات بدقة', activeProject);
    } else if (actionType === 'review_meeting') {
      handleAskHypatiaFromAnywhere(payload.prompt || 'مراجعة الميتينج واستخراج التعديلات المطلوبة', activeProject);
    } else if (actionType === 'create_task') {
      if (payload.target === 'provider' && payload.providerId) {
        setServiceProviders((prev) =>
          prev.map((p) => {
            if (p.id === payload.providerId) {
              const newTask = {
                id: `task-${Date.now()}`,
                title: payload.title,
                dueDate: '2026-09-10',
                priority: 'عاجل' as const,
                status: 'معلقة' as const,
                assignedContact: payload.contact,
              };
              return { ...p, tasks: [newTask, ...p.tasks] };
            }
            return p;
          })
        );
        setCurrentTab('providers');
      } else {
        const newTask: ProjectTask = {
          id: `task-${Date.now()}`,
          projectId: activeProject.id,
          title: payload.title,
          status: 'قيد الانتظار',
          priority: 'عاجل',
          createdAt: new Date().toISOString().split('T')[0],
        };
        handleAddTask(newTask);
        setCurrentTab('tasks');
      }
    } else if (actionType === 'ask_hypatia') {
      handleAskHypatiaFromAnywhere(payload.prompt, activeProject);
    }
  };

  const pendingTasksCount = tasks.filter((t) => t.status !== 'مكتمل').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Cairo',sans-serif] selection:bg-teal-500 selection:text-white antialiased">
      {/* Enterprise Desktop Admin Layout with Collapsible Sidebar */}
      <AdminSidebarLayout
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'inquiries') {
            setIsQuestionsModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        activeProject={activeProject}
        projects={projects}
        onSelectProject={(p) => setActiveProjectId(p.id)}
        onOpenVoiceCommand={() => setIsVoiceModalOpen(true)}
        onOpenContacts={() => setIsContactsModalOpen(true)}
        onOpenCredentials={() => setIsCredentialsModalOpen(true)}
        onOpenProjectSource={() => setIsProjectSourceModalOpen(true)}
        onOpenInquiries={() => setIsQuestionsModalOpen(true)}
        onOpenMasterRoadmap={() => {
          setMasterRoadmapFilterPerson('all');
          setIsMasterRoadmapModalOpen(true);
        }}
        onOpenTeamSimulation={() => setIsTeamSimulationModalOpen(true)}
        onOpenWorkflows={() => setIsWorkflowsModalOpen(true)}
        onOpenServerRack={() => setIsServerRackModalOpen(true)}
        pendingInquiriesCount={inquiries.filter((q) => !q.answered).length}
      >
        {/* Sync Status Banner */}
        {syncFeedback && (
          <div className="mb-4 bg-teal-50 text-teal-900 text-xs px-4 py-2.5 rounded-2xl border border-teal-200 flex items-center justify-between animate-in slide-in-from-top-2">
            <span className="font-bold">{syncFeedback}</span>
            <button 
              onClick={() => setSyncFeedback(null)}
              className="text-teal-700 hover:text-teal-900 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dynamic Tab Viewports */}
        <div className="space-y-4">
          {currentTab === 'home' && (
            <HomeTab
              activeProject={activeProject}
              pendingInquiriesCount={inquiries.filter((q) => !q.answered).length}
              totalInquiriesCount={inquiries.length}
              onOpenInquiries={() => setIsQuestionsModalOpen(true)}
              onNavigateToTab={setCurrentTab}
              onAskHypatia={handleAskHypatiaFromAnywhere}
              onOpenContacts={() => setIsContactsModalOpen(true)}
              onOpenCredentials={() => setIsCredentialsModalOpen(true)}
              onOpenProjectSource={() => setIsProjectSourceModalOpen(true)}
              onOpenFirewallModal={() => setIsFirewallModalOpen(true)}
              onOpenMasterRoadmap={(filter) => {
                setMasterRoadmapFilterPerson(filter || 'all');
                setIsMasterRoadmapModalOpen(true);
              }}
              onOpenTeamSimulation={() => setIsTeamSimulationModalOpen(true)}
              onOpenWorkflows={() => setIsWorkflowsModalOpen(true)}
              onOpenServerRack={() => setIsServerRackModalOpen(true)}
            />
          )}

          {currentTab === 'agenda' && (
            <AgendaTab
              onAskHypatia={handleAskHypatiaFromAnywhere}
              onOpenContacts={() => setIsContactsModalOpen(true)}
            />
          )}

          {currentTab === 'subscriptions' && (
            <SubscriptionsTab
              onAskHypatia={handleAskHypatiaFromAnywhere}
            />
          )}

          {currentTab === 'chat' && (
            <ChatTab
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoadingChat}
              onClearChat={handleClearChat}
              activeProject={activeProject}
            />
          )}

          {currentTab === 'providers' && (
            <ProvidersVaultTab
              providers={serviceProviders}
              onAddProvider={handleAddProvider}
              onUpdateProvider={handleUpdateProvider}
              onDeleteProvider={handleDeleteProvider}
              onOpenVoiceCommand={() => setIsVoiceModalOpen(true)}
              onAskHypatia={handleAskHypatiaFromAnywhere}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              activeProject={activeProject}
              onSelectActiveProject={(p) => setActiveProjectId(p.id)}
              onUpdateProject={handleUpdateProject}
              onAddNewProject={handleAddNewProject}
              onResetOfficialProjects={handleResetOfficialProjects}
              onNavigateToChatWithPrompt={handleAskHypatiaFromAnywhere}
            />
          )}

          {currentTab === 'contracts' && (
            <ContractsTab
              contracts={contracts}
              onUpdateContract={handleUpdateContract}
              onAskHypatia={handleAskHypatiaFromAnywhere}
              projects={projects}
              onNavigateToTab={setCurrentTab}
            />
          )}

          {currentTab === 'quotations' && (
            <QuotationsTab
              onAskHypatia={handleAskHypatiaFromAnywhere}
              onNavigateToTab={setCurrentTab}
            />
          )}

          {currentTab === 'mashweer_emails' && (
            <MashweerEmailsTab
              emails={mashweerEmails}
              onAddEmail={handleAddEmail}
              onDeleteEmail={handleDeleteEmail}
              onUpdateEmailStatus={handleUpdateEmailStatus}
              onAskHypatia={handleAskHypatiaFromAnywhere}
            />
          )}

          {currentTab === 'tasks' && (
            <TasksTab
              tasks={tasks}
              projects={projects}
              activeProject={activeProject}
              onAddTask={handleAddTask}
              onToggleTaskStatus={handleToggleTaskStatus}
              onDeleteTask={handleDeleteTask}
              onAskEmo={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
            />
          )}

          {currentTab === 'code' && (
            <CodeTab
              activeProject={activeProject}
              projects={projects}
              onAskEmo={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
            />
          )}

          {currentTab === 'database' && (
            <DatabaseTab
              activeProject={activeProject}
              projects={projects}
              serviceProviders={serviceProviders}
              contracts={contracts}
              mashweerEmails={mashweerEmails}
              tasks={tasks}
              inquiries={inquiries}
              onAskEmo={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
            />
          )}

          {currentTab === 'tools' && (
            <ToolsTab
              apiEndpoints={apiEndpoints}
              onUpdateEndpoints={setApiEndpoints}
              projects={projects}
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
            />
          )}

          {currentTab === 'settings' && <SettingsTab projects={projects} onNavigateToTab={setCurrentTab} />}

          {currentTab === 'neural_graph' && (
            <InteractiveLiveGraphTab
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
              onOpenProjectSource={() => setIsProjectSourceModalOpen(true)}
            />
          )}

          {currentTab === 'hq_floorplan' && (
            <HeadquartersFloorplanTab
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
              onNavigateToTab={setCurrentTab}
            />
          )}

          {currentTab === 'master_ledger' && (
            <MasterArabicLedgerView
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
              onNavigateToTab={setCurrentTab}
            />
          )}

          {currentTab === 'server_rack' && (
            <ServerRackGraphicModal
              isOpen={true}
              onClose={() => setCurrentTab('home')}
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
              isFullPage={true}
            />
          )}

          {currentTab === 'meshawir_network' && (
            <MeshawirNetworkPingTab
              onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
              onNavigateToTab={(tab) => setCurrentTab(tab as TabType)}
            />
          )}
        </div>
      </AdminSidebarLayout>

      {/* More / Hamburger Menu Drawer */}
      <MoreMenuDrawer
        isOpen={isMoreDrawerOpen}
        onClose={() => setIsMoreDrawerOpen(false)}
        onSelectTab={(tab) => {
          if (tab === 'inquiries') {
            setIsQuestionsModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        currentTab={currentTab}
        activeProject={activeProject}
        pendingInquiriesCount={inquiries.filter((q) => !q.answered).length}
        onAskHypatia={handleAskHypatiaFromAnywhere}
        onOpenContacts={() => setIsContactsModalOpen(true)}
        onOpenCredentials={() => setIsCredentialsModalOpen(true)}
        onOpenProjectSource={() => setIsProjectSourceModalOpen(true)}
        onTriggerDriveSync={handleTriggerDriveSync}
        onDownloadZip={handleDownloadZip}
        isDriveSyncing={isDriveSyncing}
      />

      {/* Google Drive Master Seed & Project Source Explorer Modal */}
      <ProjectSourceDriveModal
        isOpen={isProjectSourceModalOpen}
        onClose={() => setIsProjectSourceModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Contacts Directory Modal */}
      <ContactsDirectoryModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Credentials Safe & Handover Modal */}
      <CredentialsVaultModal
        isOpen={isCredentialsModalOpen}
        onClose={() => setIsCredentialsModalOpen(false)}
      />

      {/* Continuous Questions Modal */}
      <ContinuousQuestionsModal
        isOpen={isQuestionsModalOpen || currentTab === 'inquiries'}
        onClose={() => {
          setIsQuestionsModalOpen(false);
          if (currentTab === 'inquiries') setCurrentTab('home');
        }}
        inquiries={inquiries}
        onAnswerInquiry={handleAnswerInquiry}
        onReopenInquiry={handleReopenInquiry}
        onAddNewInquiry={handleAddNewInquiry}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Futuristic Sci-Fi Matrix Neural Graph Modal */}
      <NeuralNetworkGraphModal
        isOpen={isNeuralModalOpen}
        onClose={() => {
          setIsNeuralModalOpen(false);
        }}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Voice Command Modal for Hypatia */}
      <VoiceCommandModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        projects={projects}
        activeProject={activeProject}
        providers={serviceProviders}
        onAddTask={handleAddTask}
        onAddProviderTask={(providerId, taskTitle, contact) => {
          setServiceProviders((prev) =>
            prev.map((p) => {
              if (p.id === providerId) {
                const newTask = {
                  id: `task-${Date.now()}`,
                  title: taskTitle,
                  dueDate: '2026-09-10',
                  priority: 'عاجل' as const,
                  status: 'معلقة' as const,
                  assignedContact: contact,
                };
                return { ...p, tasks: [newTask, ...p.tasks] };
              }
              return p;
            })
          );
          setCurrentTab('providers');
        }}
        onSelectProject={(id) => setActiveProjectId(id)}
        onSelectTab={setCurrentTab}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Network Architecture & OPNsense Firewall Consultation Modal */}
      <FirewallTopologyModal
        isOpen={isFirewallModalOpen}
        onClose={() => setIsFirewallModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Master Interactive Roadmap Modal (135 Tasks - Caps Game Grid) */}
      <MasterInteractiveRoadmapModal
        isOpen={isMasterRoadmapModalOpen}
        onClose={() => setIsMasterRoadmapModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
        defaultPersonFilter={masterRoadmapFilterPerson}
      />

      {/* Team Simulation & Decision Capabilities Modal */}
      <TeamSimulationModal
        isOpen={isTeamSimulationModalOpen}
        onClose={() => setIsTeamSimulationModalOpen(false)}
        onFilterTasksByPerson={(personName) => {
          if (personName.includes('عماد')) setMasterRoadmapFilterPerson('emad');
          else if (personName.includes('سامح')) setMasterRoadmapFilterPerson('sameh');
          else if (personName.includes('موفق') || personName.includes('عمرو')) setMasterRoadmapFilterPerson('mowaffaq');
          else if (personName.includes('مصطفى') || personName.includes('المحامي')) setMasterRoadmapFilterPerson('lawyer');
          else setMasterRoadmapFilterPerson('all');

          setIsTeamSimulationModalOpen(false);
          setIsMasterRoadmapModalOpen(true);
        }}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Architectural Workflows & Flowcharts Modal */}
      <ArchitecturalWorkflowsModal
        isOpen={isWorkflowsModalOpen}
        onClose={() => setIsWorkflowsModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />

      {/* Server Rack 27U Interactive Graphic Modal ("الراك ومحتوياته") */}
      <ServerRackGraphicModal
        isOpen={isServerRackModalOpen}
        onClose={() => setIsServerRackModalOpen(false)}
        onAskHypatia={(prompt) => handleAskHypatiaFromAnywhere(prompt, activeProject)}
      />
    </div>
  );
}
