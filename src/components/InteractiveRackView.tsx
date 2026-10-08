import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import {
  Server,
  Network,
  Cpu,
  ShieldCheck,
  Camera,
  Phone,
  Printer,
  Monitor,
  Wifi,
  HardDrive,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Maximize2,
  Filter,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Zap,
  Thermometer,
  Flame,
  Activity,
  ArrowRight,
  Copy,
  Check,
  Search,
  Plus,
  Edit3,
  Cable,
  Volume2,
  VolumeX,
  Lightbulb,
  CornerDownLeft
} from 'lucide-react';
import {
  MASTER_RACK_DEVICES,
  RackHardwareDevice,
  RackPort,
  findPortInRack
} from '../data/rackHardwareData';

interface InteractiveRackViewProps {
  onAskHypatia?: (prompt: string) => void;
  isFullPage?: boolean;
}

export const InteractiveRackView: React.FC<InteractiveRackViewProps> = ({
  onAskHypatia,
  isFullPage = false
}) => {
  // State for Extensible Rack Devices (Data-Driven Architecture)
  const [devicesList, setDevicesList] = useState<RackHardwareDevice[]>(() => {
    const saved = localStorage.getItem('mashweer_rack_devices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MASTER_RACK_DEVICES;
      }
    }
    return MASTER_RACK_DEVICES;
  });

  // Navigation, Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState<number>(1.0); // 0.6x to 2.4x
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Perspective View Angle: '2d_flat' | 'perspective_3d'
  const [viewAngle, setViewAngle] = useState<'2d_flat' | 'perspective_3d'>('2d_flat');
  const [isGlassDoorClosed, setIsGlassDoorClosed] = useState(false);
  const [ledsBlinking, setLedsBlinking] = useState(true);
  const [rackLightOn, setRackLightOn] = useState(true);
  const [showPatchCables, setShowPatchCables] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [vlanFilter, setVlanFilter] = useState<number | 'all'>('all');

  // Selection & Focus States
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('cisco-switch-48');
  const [selectedPort, setSelectedPort] = useState<{ deviceId: string; port: RackPort } | null>(() => {
    // Default to Port 7 on Cisco Switch as specifically highlighted in prompt!
    const cisco = MASTER_RACK_DEVICES.find(d => d.id === 'cisco-switch-48');
    const port7 = cisco?.ports.find(p => p.portNumber === 7);
    return port7 ? { deviceId: 'cisco-switch-48', port: port7 } : null;
  });

  const [hoveredPort, setHoveredPort] = useState<{ deviceId: string; port: RackPort } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Modals for Editing & Extensibility (Requirement #8: Data-Driven architecture)
  const [isEditPortModalOpen, setIsEditPortModalOpen] = useState(false);
  const [editingPortForm, setEditingPortForm] = useState<Partial<RackPort>>({});
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [newDeviceForm, setNewDeviceForm] = useState({
    name: '',
    arabicName: '',
    model: '',
    manufacturer: '',
    category: 'switch' as RackHardwareDevice['category'],
    uHeight: 1,
    uPositionStart: 17,
    portCount: 24,
    powerWatts: 150,
    tempCelsius: 22.5
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Active Selected Device
  const activeDevice = useMemo(() => {
    return devicesList.find(d => d.id === selectedDeviceId) || devicesList[1] || devicesList[0];
  }, [devicesList, selectedDeviceId]);

  // Audio Click Feedback (Web Audio API Synthesizer - optional & self-contained)
  const playClickSound = useCallback((frequency = 800, type: OscillatorType = 'sine', duration = 0.04) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext muted/unsupported
    }
  }, [soundEnabled]);

  // Drag / Pan Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.port-interactive-target')) return;
    if ((e.target as HTMLElement).closest('.btn-interactive-control')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom (Controlled with Ctrl/Meta key or clamped fine-step to prevent screen runaway)
  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom when user holds Ctrl/Meta or explicitly interacts with trackpad/wheel without jarring jumps
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.05 : -0.05;
      setZoomLevel(prev => Math.min(1.8, Math.max(0.7, parseFloat((prev + zoomDelta).toFixed(2)))));
    } else {
      // Gentle dampening for standard wheel: only 0.03 step and within safe bounded range
      e.preventDefault();
      const zoomDelta = e.deltaY < 0 ? 0.03 : -0.03;
      setZoomLevel(prev => Math.min(1.6, Math.max(0.75, parseFloat((prev + zoomDelta).toFixed(2)))));
    }
  };

  // Reset View to default
  const handleResetView = () => {
    playClickSound(520);
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
    setSelectedDeviceId('cisco-switch-48');
  };

  // Focus directly onto a specific device
  const handleFocusDevice = (deviceId: string) => {
    playClickSound(640);
    setSelectedDeviceId(deviceId);
    setZoomLevel(1.25);
    const devIndex = devicesList.findIndex(d => d.id === deviceId);
    const targetY = -devIndex * 42;
    setPanOffset({ x: 0, y: targetY });
  };

  // Select a specific port
  const handleSelectPort = (deviceId: string, port: RackPort) => {
    playClickSound(1020, 'triangle');
    setSelectedDeviceId(deviceId);
    setSelectedPort({ deviceId, port });
  };

  // Jump between cross-connected ports (e.g. Cisco Switch Port 7 <-> Patch Panel 1 Port 7)
  const handleJumpToCrossConnection = (targetDeviceId: string, targetPortNumber: number) => {
    const targetDev = devicesList.find(d => d.id === targetDeviceId);
    if (!targetDev) return;
    const targetPort = targetDev.ports.find(p => p.portNumber === targetPortNumber);
    if (targetPort) {
      playClickSound(1200, 'square');
      setSelectedDeviceId(targetDeviceId);
      setSelectedPort({ deviceId: targetDeviceId, port: targetPort });
      const devIndex = devicesList.findIndex(d => d.id === targetDeviceId);
      setPanOffset({ x: 0, y: -devIndex * 42 });
    }
  };

  const copyToClipboard = (text: string) => {
    playClickSound(750);
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Check if a port matches active search query
  const isPortMatchingSearch = useCallback((port: RackPort) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      port.portNumber.toString() === q ||
      port.label.toLowerCase().includes(q) ||
      port.connectedDevice.toLowerCase().includes(q) ||
      port.userEndpoint.toLowerCase().includes(q) ||
      (port.ipAddress && port.ipAddress.toLowerCase().includes(q)) ||
      (port.macAddress && port.macAddress.toLowerCase().includes(q)) ||
      port.vlan.toLowerCase().includes(q) ||
      port.deviceType.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle saving an edited port (Data-Driven requirement)
  const handleSavePortEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPort) return;
    setDevicesList(prevDevices => {
      const updated = prevDevices.map(dev => {
        if (dev.id === selectedPort.deviceId) {
          const updatedPorts = dev.ports.map(p => {
            if (p.portNumber === selectedPort.port.portNumber) {
              return { ...p, ...editingPortForm } as RackPort;
            }
            return p;
          });
          return { ...dev, ports: updatedPorts };
        }
        return dev;
      });
      localStorage.setItem('mashweer_rack_devices', JSON.stringify(updated));
      return updated;
    });

    setSelectedPort(prev => prev ? {
      ...prev,
      port: { ...prev.port, ...editingPortForm } as RackPort
    } : null);

    setIsEditPortModalOpen(false);
  };

  // Handle adding a new rack device (Data-Driven requirement)
  const handleAddNewDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceForm.name.trim()) return;

    const newPorts: RackPort[] = Array.from({ length: newDeviceForm.portCount }).map((_, idx) => ({
      portNumber: idx + 1,
      label: `P${idx + 1}`,
      status: 'active',
      connectedDevice: `جهاز متصل بالمنفذ #${idx + 1}`,
      deviceType: 'workstation',
      userEndpoint: 'شبكة المقر',
      vlan: 'VLAN 10 - Staff',
      vlanId: 10,
      speed: '1000 Mbps Full Duplex',
      poeWatts: 0
    }));

    const newDev: RackHardwareDevice = {
      id: `custom-dev-${Date.now()}`,
      name: newDeviceForm.name,
      arabicName: newDeviceForm.arabicName || newDeviceForm.name,
      model: newDeviceForm.model || 'Enterprise Rackmount',
      manufacturer: newDeviceForm.manufacturer || 'Perla Systems',
      category: newDeviceForm.category,
      uPositionStart: newDeviceForm.uPositionStart,
      uHeight: newDeviceForm.uHeight,
      frontColor: '#0f172a',
      specs: ['وحدة مضافة حديثاً عبر محرر الراك التفاعلي', 'دعم منافذ Gigabit متكاملة'],
      powerWatts: newDeviceForm.powerWatts,
      tempCelsius: newDeviceForm.tempCelsius,
      status: 'online',
      invoiceInfo: 'مضاف للنظام',
      responsible: 'المهندس عماد الشرقاوي',
      ports: newPorts
    };

    setDevicesList(prev => {
      const updated = [...prev, newDev];
      localStorage.setItem('mashweer_rack_devices', JSON.stringify(updated));
      return updated;
    });

    setSelectedDeviceId(newDev.id);
    setIsAddDeviceModalOpen(false);
  };

  // Reset devices to official factory config
  const handleResetToDefaultConfig = () => {
    if (confirm('هل تريد استعادة الترتيب والمواصفات الرسمية الأصلية للراك؟')) {
      localStorage.removeItem('mashweer_rack_devices');
      setDevicesList(MASTER_RACK_DEVICES);
      setSelectedDeviceId('cisco-switch-48');
      const cisco = MASTER_RACK_DEVICES.find(d => d.id === 'cisco-switch-48');
      const p7 = cisco?.ports.find(p => p.portNumber === 7);
      if (p7) setSelectedPort({ deviceId: 'cisco-switch-48', port: p7 });
    }
  };

  // Device Type Icon helper
  const renderDeviceTypeIcon = (type: RackPort['deviceType'], className: string = "w-4 h-4") => {
    switch (type) {
      case 'printer':
        return <Printer className={className} />;
      case 'workstation':
        return <Monitor className={className} />;
      case 'camera':
        return <Camera className={className} />;
      case 'voip_phone':
        return <Phone className={className} />;
      case 'server':
        return <Server className={className} />;
      case 'switch':
        return <Network className={className} />;
      case 'firewall':
        return <ShieldCheck className={className} />;
      case 'access_point':
        return <Wifi className={className} />;
      case 'uplink':
        return <Activity className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // VLAN Colors map
  const getVlanColorBadge = (vlanId: number) => {
    switch (vlanId) {
      case 10:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 15:
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 20:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 30:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 50:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 90:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 99:
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  // Total active ports count calculation
  const totalActivePorts = useMemo(() => {
    return devicesList.reduce((acc, dev) => {
      return acc + dev.ports.filter(p => p.status === 'active').length;
    }, 0);
  }, [devicesList]);

  return (
    <div className="w-full flex flex-col font-['Cairo',sans-serif] text-slate-100 select-none animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. TOP CONTROL & TELEMETRY TOOLBAR */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-xl mb-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Device & Rack Identification */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
            <Server className="w-5 h-5 stroke-[2.2px]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>كابينة الراك المركزية بالمعادي (Perla 27U Enterprise Rack)</span>
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold">
                {devicesList.length} أجهزة • {totalActivePorts} منفذ نشط
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              جرافيك تفاعلي ثلاثي الأبعاد • فحص الـ 48 بورت لسيسكو والباتش بانل والكاميرات والسنترال
            </p>
          </div>
        </div>

        {/* Center & Right: Interactive Controls */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end">
          
          {/* Angle Mode Switcher (2D Flat vs. 2.5D Isometric Perspective) */}
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => {
                playClickSound(500);
                setViewAngle('2d_flat');
              }}
              className={`px-2.5 py-1 rounded-xl font-bold transition text-[11px] btn-interactive-control ${
                viewAngle === '2d_flat'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="الواجهة الأمامية المسطحة (مثالية لفحص الـ Ports)"
            >
              واجهة أمامية 2D
            </button>
            <button
              onClick={() => {
                playClickSound(650);
                setViewAngle('perspective_3d');
              }}
              className={`px-2.5 py-1 rounded-xl font-bold transition text-[11px] btn-interactive-control ${
                viewAngle === 'perspective_3d'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="منظور مجسم 2.5D ثلاثي الأبعاد مع عمق الكابينة"
            >
              منظور مجسم 2.5D
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center gap-1.5">
            <button
              onClick={() => {
                playClickSound(450);
                setZoomLevel(prev => Math.max(0.6, parseFloat((prev - 0.2).toFixed(2))));
              }}
              className="w-7 h-7 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition btn-interactive-control"
              title="تصغير Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-teal-300 w-11 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => {
                playClickSound(750);
                setZoomLevel(prev => Math.min(2.4, parseFloat((prev + 0.2).toFixed(2))));
              }}
              className="w-7 h-7 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition btn-interactive-control"
              title="تكبير Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="px-2 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-[10px] font-bold transition ml-1 btn-interactive-control"
              title="إعادة ضبط الرؤية"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة ضبط</span>
            </button>
          </div>

          {/* Show Patch Cables Toggle */}
          <button
            onClick={() => {
              playClickSound(showPatchCables ? 400 : 700);
              setShowPatchCables(!showPatchCables);
            }}
            className={`px-2.5 py-1.5 rounded-2xl text-[11px] font-bold transition flex items-center gap-1 border btn-interactive-control ${
              showPatchCables
                ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="إظهار أو إخفاء كابلات التوصيل (Patch Cords)"
          >
            <Cable className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">الكابلات</span>
          </button>

          {/* Glass Door Toggle */}
          <button
            onClick={() => {
              playClickSound(isGlassDoorClosed ? 800 : 400);
              setIsGlassDoorClosed(!isGlassDoorClosed);
            }}
            className={`px-2.5 py-1.5 rounded-2xl text-[11px] font-bold transition flex items-center gap-1 border btn-interactive-control ${
              isGlassDoorClosed
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="فتح أو إغلاق الباب الزجاجي المصفح"
          >
            {isGlassDoorClosed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isGlassDoorClosed ? 'الباب مغلق' : 'الباب مفتوح'}</span>
          </button>

          {/* Interior Overhead Light Toggle */}
          <button
            onClick={() => {
              playClickSound(rackLightOn ? 350 : 850);
              setRackLightOn(!rackLightOn);
            }}
            className={`p-1.5 rounded-2xl text-[11px] font-bold transition border btn-interactive-control ${
              rackLightOn
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="تشغيل إضاءة الكابينة الداخلية"
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* LED Blinking Toggle */}
          <button
            onClick={() => {
              playClickSound(600);
              setLedsBlinking(!ledsBlinking);
            }}
            className={`p-1.5 rounded-2xl text-[11px] font-bold transition border btn-interactive-control ${
              ledsBlinking
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="تفعيل وميض إشارات الـ LEDs"
          >
            <Radio className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-2xl text-[11px] font-bold transition border btn-interactive-control ${
              soundEnabled
                ? 'bg-teal-950/80 border-teal-500/50 text-teal-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="تفعيل المؤثرات الصوتية للأجهزة"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Add Device Button (Data-driven extensibility) */}
          <button
            onClick={() => setIsAddDeviceModalOpen(true)}
            className="px-2.5 py-1.5 rounded-2xl text-[11px] font-bold transition flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-white shadow-xs btn-interactive-control"
            title="إضافة وحدة جديدة إلى الراك"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إضافة جهاز</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & VLAN FILTERING STRIP */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 p-2.5 sm:p-3 rounded-2xl border border-slate-800 shadow-md mb-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search Input for instant Port / Device Highlighting */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منفذ (مثال: 7 أو printer أو كاميرا أو 192.168)..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-1.5 pr-9 pl-3 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* VLAN Quick Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-[11px] text-slate-400 font-bold shrink-0 ml-1">تصفية الـ VLAN:</span>
          {[
            { id: 'all', label: 'الكل (All VLANs)' },
            { id: 10, label: 'VLAN 10 (الإدارة)' },
            { id: 15, label: 'VLAN 15 (كول سنتر)' },
            { id: 20, label: 'VLAN 20 (الكاميرات)' },
            { id: 30, label: 'VLAN 30 (السنترال)' },
            { id: 50, label: 'VLAN 50 (سيرفرات)' },
            { id: 99, label: 'VLAN 99 (iDRAC)' }
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setVlanFilter(v.id as any)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition shrink-0 border ${
                vlanFilter === v.id
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE: LEFT DETAILS & RIGHT INTERACTIVE VIEWPORT */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* ===================================================================== */}
        {/* RIGHT: THE INTERACTIVE GRAPHICAL RACK CANVAS (8 COLS) */}
        {/* ===================================================================== */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          
          {/* Quick Device Jump / Filter Pills (Ordered strictly top to bottom) */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold text-[11px] shrink-0">الترتيب المعتمد (من أعلى لأسفل):</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {devicesList.map((dev, idx) => (
                <button
                  key={dev.id}
                  onClick={() => handleFocusDevice(dev.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition shrink-0 border ${
                    selectedDeviceId === dev.id
                      ? 'bg-teal-600 text-white border-teal-500 shadow-sm ring-1 ring-teal-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{idx + 1}. {dev.category === 'spacer' ? 'مسافة فارغة' : dev.name.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Rack Viewport Frame */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className={`relative w-full h-[700px] bg-gradient-to-b from-[#04060c] via-[#080d19] to-[#04060c] rounded-3xl border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center cursor-grab ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{ touchAction: 'none' }}
          >
            {/* Visual Guide Overlay (Pan & Zoom Instructions) */}
            <div className="absolute top-3 right-3 z-30 pointer-events-none bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>اسحب للتحريك في أي اتجاه • Scroll للـ Zoom • اضغط على أي Port لفتحه</span>
            </div>

            {/* Overhead Interior Light Bar Simulation */}
            {rackLightOn && (
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-cyan-400/15 via-cyan-500/5 to-transparent pointer-events-none z-10"></div>
            )}

            {/* Glass Door Visual Filter (When Closed) */}
            {isGlassDoorClosed && (
              <div className="absolute inset-0 z-25 pointer-events-none bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/15 backdrop-blur-[0.5px] border-4 border-cyan-400/30 rounded-3xl flex items-center justify-between px-6">
                <div className="w-2.5 h-full bg-cyan-400/20"></div>
                <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-2xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>الباب الزجاجي المصفح مقفل (Perla Glass Locked)</span>
                </div>
                <div className="w-2.5 h-full bg-cyan-400/20"></div>
              </div>
            )}

            {/* THE TRANSFORMED RACK ELEVATION CHASSIS */}
            <div
              className={`transition-transform duration-75 origin-center ${
                viewAngle === 'perspective_3d' ? 'transform-style-3d' : ''
              }`}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel}) ${
                  viewAngle === 'perspective_3d'
                    ? 'rotateY(-12deg) rotateX(4deg) perspective(1100px)'
                    : ''
                }`,
                transformOrigin: 'center center'
              }}
            >
              {/* THE 19-INCH SERVER RACK OUTER ENCLOSURE (Heavy Duty Metallic Chassis) */}
              <div className="w-[660px] bg-[#0c121e] rounded-3xl p-4 sm:p-5 border-4 border-[#1e293b] shadow-2xl relative shadow-teal-950/60">
                
                {/* Rack Roof & Exhaust Fan Module */}
                <div className="bg-[#111827] rounded-2xl p-2.5 mb-3 border border-slate-700/80 flex items-center justify-between font-mono text-[9px] text-slate-400 shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="font-bold text-slate-200">PERLA 27U SERVER ENCLOSURE (غرفة IT المعادي)</span>
                  </div>
                  
                  {/* 4 Spinning Exhaust Fans Simulation */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[8px]">4× ROOF FANS:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map(f => (
                        <div key={f} className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                          <Flame className="w-2.5 h-2.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>DEPTH: 1000mm</span>
                    <span className="text-emerald-400 font-bold">21.4°C NOMINAL</span>
                  </div>
                </div>

                {/* THE 19-INCH EQUIPMENT MOUNTING BAY WITH LEFT & RIGHT RAILS */}
                <div className="relative bg-[#070b14] rounded-2xl p-2 border-2 border-slate-800 shadow-inner flex items-stretch gap-1">
                  
                  {/* LEFT VERTICAL 19" MOUNTING RAIL (U-Markings 27U down to 18U) */}
                  <div className="w-9 bg-[#0b101c] rounded-xl border border-slate-700/80 p-1 flex flex-col justify-between items-center text-[8px] font-mono text-slate-500 shrink-0">
                    {['27U', '26U', '25U', '24U', '23U', '22U', '21U', '20U', '19U', '18U'].map((u, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-1">
                        <span className="text-[7px] font-bold text-teal-400/80">{u}</span>
                        <div className="w-1.5 h-1.5 rounded-2xs bg-slate-800 border border-slate-600 mt-0.5" title={`Cage Nut Hole ${u}`}></div>
                      </div>
                    ))}
                  </div>

                  {/* EQUIPMENT STACK (Strict Ordered Devices) */}
                  <div className="flex-1 space-y-2 relative">
                    
                    {/* OPTIONAL SVG PATCH CABLES OVERLAY */}
                    {showPatchCables && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
                        {/* Sample Dynamic Cat6 Patch Cables (Patch Panel 1 -> Cisco Switch) */}
                        <path
                          d="M 120 40 Q 110 65, 120 90"
                          fill="none"
                          stroke={selectedPort?.port.portNumber === 7 ? "#c084fc" : "#0284c7"}
                          strokeWidth={selectedPort?.port.portNumber === 7 ? "2.5" : "1.5"}
                          strokeOpacity={selectedPort?.port.portNumber === 7 ? "0.9" : "0.5"}
                          strokeDasharray={selectedPort?.port.portNumber === 7 ? "4 2" : "none"}
                        />
                        <path
                          d="M 140 40 Q 150 65, 145 90"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                        />
                        <path
                          d="M 240 40 Q 230 65, 235 90"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                        />
                        {/* Patch Panel 2 -> Cisco Switch */}
                        <path
                          d="M 180 145 Q 170 120, 175 100"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                        />
                        <path
                          d="M 280 145 Q 290 120, 285 100"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                        />
                      </svg>
                    )}

                    {devicesList.map((device, devIdx) => {
                      const isSelected = selectedDeviceId === device.id;

                      // -------------------------------------------------------------
                      // 1. PATCH PANEL 1 (24 Ports) - علوي
                      // -------------------------------------------------------------
                      if (device.id === 'patch-panel-1') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-lg shadow-teal-500/20 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#161f30]'
                            }`}
                          >
                            {/* Faceplate Header */}
                            <div className="bg-[#111927] px-3 py-1 border-b border-slate-700 flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <div className="flex items-center gap-2">
                                <span className="text-teal-400 font-bold">1U</span>
                                <span className="font-bold text-white">PATCH PANEL 24 PORT (علوي - مكاتب وصالة المقر)</span>
                              </div>
                              <span className="text-slate-500">CAT6 24-PORT 1000BASE-T</span>
                            </div>

                            {/* 24 RJ45 Ports Matrix (4 Blocks of 6 Ports) */}
                            <div className="p-2 bg-[#1a2333] grid grid-cols-4 gap-2">
                              {[0, 1, 2, 3].map(blockIdx => (
                                <div key={blockIdx} className="bg-[#111827] p-1 rounded-lg border border-slate-700/80 flex items-center justify-between gap-1">
                                  {device.ports.slice(blockIdx * 6, (blockIdx + 1) * 6).map(port => {
                                    const isPortActive = port.status === 'active';
                                    const isPortSelected = selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber;
                                    const isPortHovered = hoveredPort?.deviceId === device.id && hoveredPort?.port.portNumber === port.portNumber;
                                    const isSearchMatch = isPortMatchingSearch(port);

                                    return (
                                      <div
                                        key={port.portNumber}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectPort(device.id, port);
                                        }}
                                        onMouseEnter={() => setHoveredPort({ deviceId: device.id, port })}
                                        onMouseLeave={() => setHoveredPort(null)}
                                        className={`port-interactive-target relative flex flex-col items-center justify-center p-1 rounded transition-all cursor-pointer ${
                                          isPortSelected
                                            ? 'bg-teal-500/30 ring-2 ring-teal-400 scale-110 z-10 shadow-md'
                                            : isSearchMatch
                                            ? 'bg-amber-500/40 ring-2 ring-amber-400 scale-110 z-10'
                                            : isPortHovered
                                            ? 'bg-slate-700 scale-105'
                                            : 'hover:bg-slate-800'
                                        }`}
                                        title={`Port ${port.portNumber}: ${port.connectedDevice}`}
                                      >
                                        <span className="text-[7px] font-mono font-bold text-slate-400 mb-0.5">
                                          {port.portNumber}
                                        </span>

                                        <div className={`w-3.5 h-4 rounded-2xs border flex items-center justify-center relative ${
                                          port.portNumber === 7
                                            ? 'bg-purple-950/80 border-purple-400'
                                            : isPortActive
                                            ? 'bg-[#0f172a] border-teal-400/80 shadow-xs shadow-teal-500/20'
                                            : 'bg-slate-900 border-slate-700'
                                        }`}>
                                          <div className="w-2 h-2.5 flex flex-col justify-between py-0.5">
                                            <div className={`w-full h-0.5 rounded-2xs ${isPortActive ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
                                            <div className={`w-full h-0.5 rounded-2xs ${isPortActive ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
                                          </div>
                                        </div>

                                        <div className={`w-1 h-1 rounded-full mt-0.5 ${
                                          isPortActive
                                            ? port.portNumber === 7 ? 'bg-purple-400 animate-ping' : 'bg-emerald-400'
                                            : 'bg-slate-700'
                                        }`}></div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 2. CISCO SWITCH 48 PORT (Cisco Catalyst WS-C3850-48P)
                      // -------------------------------------------------------------
                      if (device.id === 'cisco-switch-48') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl shadow-teal-500/25 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#0d2820]'
                            }`}
                          >
                            {/* Faceplate Header: Cisco Logo & Diagnostics */}
                            <div className="bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#022c22] px-3 py-1.5 border-b border-emerald-600/50 flex items-center justify-between text-white font-mono text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-300 font-bold">1U</span>
                                <span className="font-black tracking-wide text-xs">CISCO CATALYST 3850-48P</span>
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 font-bold">
                                  48× PoE+ (Dual 715W PSU)
                                </span>
                              </div>

                              {/* Cisco System Status LEDs */}
                              <div className="flex items-center gap-2 text-[8px]">
                                {['SYST', 'RPS', 'STAT', 'PoE'].map((led, i) => (
                                  <div key={i} className="flex items-center gap-0.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${ledsBlinking ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                                    <span className="text-emerald-200 font-bold">{led}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 48 Ports Arrangement: 2 Rows of 24 Ports (Stacked Top/Bottom 1-48) */}
                            <div className="p-2 bg-[#091a14] flex items-center justify-between gap-3">
                              
                              {/* The 48 Ports Grid */}
                              <div className="flex-1 grid grid-cols-24 gap-0.5 bg-[#030d0a] p-1.5 rounded-lg border border-emerald-800/40">
                                {/* Top Row: Odd Ports 1, 3, 5, 7, ... 47 */}
                                {Array.from({ length: 24 }).map((_, colIdx) => {
                                  const portNum = colIdx * 2 + 1;
                                  const port = device.ports.find(p => p.portNumber === portNum)!;
                                  const isPortActive = port?.status === 'active';
                                  const isPortSelected = selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === portNum;
                                  const isPortHovered = hoveredPort?.deviceId === device.id && hoveredPort?.port.portNumber === portNum;
                                  const isMatchingVlan = vlanFilter === 'all' || port?.vlanId === vlanFilter;
                                  const isSearchMatch = isPortMatchingSearch(port);

                                  return (
                                    <div
                                      key={portNum}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectPort(device.id, port);
                                      }}
                                      onMouseEnter={() => setHoveredPort({ deviceId: device.id, port })}
                                      onMouseLeave={() => setHoveredPort(null)}
                                      className={`port-interactive-target flex flex-col items-center justify-center p-0.5 rounded transition-all cursor-pointer ${
                                        isPortSelected
                                          ? 'bg-teal-400/50 ring-2 ring-teal-300 scale-125 z-10 shadow-md'
                                          : isSearchMatch
                                          ? 'bg-amber-400/50 ring-2 ring-amber-300 scale-125 z-10 animate-bounce'
                                          : isPortHovered
                                          ? 'bg-emerald-800/80 scale-110'
                                          : !isMatchingVlan
                                          ? 'opacity-25'
                                          : 'hover:bg-emerald-950'
                                      }`}
                                      title={`Cisco Port ${portNum}: ${port?.connectedDevice}`}
                                    >
                                      {/* Activity LED */}
                                      <div className={`w-1 h-1 rounded-full mb-0.5 ${
                                        isPortActive
                                          ? portNum === 7 ? 'bg-amber-300 animate-ping' : 'bg-emerald-400'
                                          : 'bg-slate-700'
                                      }`}></div>

                                      {/* RJ45 Port Jack */}
                                      <div className={`w-3.5 h-3.5 rounded-2xs border flex items-center justify-center ${
                                        portNum === 7
                                          ? 'bg-purple-950 border-purple-400 shadow-sm shadow-purple-500/40'
                                          : isPortActive
                                          ? 'bg-slate-950 border-emerald-500/70'
                                          : 'bg-slate-900 border-slate-700'
                                      }`}>
                                        <span className="text-[6px] font-mono text-emerald-200 font-bold">{portNum}</span>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Bottom Row: Even Ports 2, 4, 6, 8, ... 48 */}
                                {Array.from({ length: 24 }).map((_, colIdx) => {
                                  const portNum = (colIdx + 1) * 2;
                                  const port = device.ports.find(p => p.portNumber === portNum)!;
                                  const isPortActive = port?.status === 'active';
                                  const isPortSelected = selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === portNum;
                                  const isPortHovered = hoveredPort?.deviceId === device.id && hoveredPort?.port.portNumber === portNum;
                                  const isMatchingVlan = vlanFilter === 'all' || port?.vlanId === vlanFilter;
                                  const isSearchMatch = isPortMatchingSearch(port);

                                  return (
                                    <div
                                      key={portNum}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectPort(device.id, port);
                                      }}
                                      onMouseEnter={() => setHoveredPort({ deviceId: device.id, port })}
                                      onMouseLeave={() => setHoveredPort(null)}
                                      className={`port-interactive-target flex flex-col items-center justify-center p-0.5 rounded transition-all cursor-pointer ${
                                        isPortSelected
                                          ? 'bg-teal-400/50 ring-2 ring-teal-300 scale-125 z-10 shadow-md'
                                          : isSearchMatch
                                          ? 'bg-amber-400/50 ring-2 ring-amber-300 scale-125 z-10 animate-bounce'
                                          : isPortHovered
                                          ? 'bg-emerald-800/80 scale-110'
                                          : !isMatchingVlan
                                          ? 'opacity-25'
                                          : 'hover:bg-emerald-950'
                                      }`}
                                      title={`Cisco Port ${portNum}: ${port?.connectedDevice}`}
                                    >
                                      {/* RJ45 Port Jack */}
                                      <div className={`w-3.5 h-3.5 rounded-2xs border flex items-center justify-center ${
                                        isPortActive
                                          ? 'bg-slate-950 border-emerald-500/70'
                                          : 'bg-slate-900 border-slate-700'
                                      }`}>
                                        <span className="text-[6px] font-mono text-emerald-200 font-bold">{portNum}</span>
                                      </div>

                                      {/* Activity LED */}
                                      <div className={`w-1 h-1 rounded-full mt-0.5 ${
                                        isPortActive ? 'bg-emerald-400' : 'bg-slate-700'
                                      }`}></div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* 4x 10G SFP+ Uplink Slots */}
                              <div className="bg-[#030d0a] p-1 rounded-lg border border-emerald-800/40 flex flex-col items-center justify-between gap-1">
                                <span className="text-[7px] font-mono text-emerald-300 font-bold">10G SFP+</span>
                                <div className="grid grid-cols-2 gap-1">
                                  {[1, 2, 3, 4].map(sfp => (
                                    <div key={sfp} className="w-3.5 h-4 bg-slate-900 rounded-2xs border border-teal-500/50 flex flex-col items-center justify-center">
                                      <div className="w-1 h-1 rounded-full bg-teal-400 animate-pulse"></div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 3. PATCH PANEL 2 (24 Ports) - سفلي
                      // -------------------------------------------------------------
                      if (device.id === 'patch-panel-2') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-lg shadow-teal-500/20 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#161f30]'
                            }`}
                          >
                            <div className="bg-[#111927] px-3 py-1 border-b border-slate-700 flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <div className="flex items-center gap-2">
                                <span className="text-teal-400 font-bold">1U</span>
                                <span className="font-bold text-white">PATCH PANEL 24 PORT (سفلي - الكاميرات والسيرفرات)</span>
                              </div>
                              <span className="text-slate-500">CAT6 CCTV & SERVERS</span>
                            </div>

                            <div className="p-2 bg-[#1a2333] grid grid-cols-4 gap-2">
                              {[0, 1, 2, 3].map(blockIdx => (
                                <div key={blockIdx} className="bg-[#111827] p-1 rounded-lg border border-slate-700/80 flex items-center justify-between gap-1">
                                  {device.ports.slice(blockIdx * 6, (blockIdx + 1) * 6).map(port => {
                                    const isPortActive = port.status === 'active';
                                    const isPortSelected = selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber;
                                    const isSearchMatch = isPortMatchingSearch(port);

                                    return (
                                      <div
                                        key={port.portNumber}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSelectPort(device.id, port);
                                        }}
                                        className={`port-interactive-target relative flex flex-col items-center justify-center p-1 rounded transition-all cursor-pointer ${
                                          isPortSelected
                                            ? 'bg-teal-500/30 ring-2 ring-teal-400 scale-110 z-10 shadow-md'
                                            : isSearchMatch
                                            ? 'bg-amber-500/40 ring-2 ring-amber-400 scale-110 z-10'
                                            : 'hover:bg-slate-800'
                                        }`}
                                      >
                                        <span className="text-[7px] font-mono font-bold text-slate-400 mb-0.5">
                                          {port.portNumber}
                                        </span>
                                        <div className={`w-3.5 h-4 rounded-2xs border flex items-center justify-center ${
                                          isPortActive ? 'bg-[#0f172a] border-teal-400/80' : 'bg-slate-900 border-slate-700'
                                        }`}>
                                          <div className="w-2 h-2.5 flex flex-col justify-between py-0.5">
                                            <div className={`w-full h-0.5 rounded-2xs ${isPortActive ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 4. DELL POWEREDGE R640 SERVER (1U Enterprise)
                      // -------------------------------------------------------------
                      if (device.id === 'dell-r640') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl shadow-teal-500/25 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#08182b]'
                            }`}
                          >
                            {/* Dell Signature Bezel & Badge */}
                            <div className="bg-gradient-to-r from-[#0c233c] via-[#075985] to-[#082f49] px-3 py-1.5 border-b border-sky-500/40 flex items-center justify-between text-white font-mono text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="text-sky-300 font-bold">1U</span>
                                <div className="w-4 h-4 rounded bg-sky-500 text-slate-950 font-black flex items-center justify-center text-[9px]">
                                  D
                                </div>
                                <span className="font-black text-xs text-white">DELL PowerEdge R640 Platinum</span>
                                <span className="text-[8px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-200 border border-sky-400/40 font-bold">
                                  48 Cores Xeon • 64GB ECC
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-[9px]">
                                <span className="text-sky-200 font-bold">iDRAC9 ENTERPRISE (192.168.10.9)</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                              </div>
                            </div>

                            {/* 8 Hot-Swap SAS/NVMe Drive Bays + Control Buttons */}
                            <div className="p-2.5 bg-[#06111f] flex items-center justify-between gap-3">
                              
                              {/* 8 Drive Caddies */}
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 8 }).map((_, dIdx) => (
                                  <div key={dIdx} className="w-8 h-8 rounded bg-[#0b1726] border border-sky-900/60 p-1 flex flex-col justify-between items-center shadow-inner">
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-[6px] font-mono text-slate-400">D{dIdx}</span>
                                      <div className={`w-1 h-1 rounded-full ${ledsBlinking ? 'bg-sky-400 animate-pulse' : 'bg-sky-500'}`}></div>
                                    </div>
                                    <div className="w-5 h-1 bg-slate-700 rounded-2xs"></div>
                                  </div>
                                ))}
                              </div>

                              {/* iDRAC & Diagnostic Front Ports */}
                              <div className="flex items-center gap-2 bg-[#091524] px-2 py-1 rounded border border-sky-800/40">
                                {device.ports.map(port => (
                                  <button
                                    key={port.portNumber}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectPort(device.id, port);
                                    }}
                                    className={`port-interactive-target px-2 py-0.5 rounded text-[8px] font-mono font-bold transition ${
                                      selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber
                                        ? 'bg-teal-500 text-slate-950'
                                        : 'bg-sky-950 text-sky-200 hover:bg-sky-900'
                                    }`}
                                  >
                                    {port.label}
                                  </button>
                                ))}
                              </div>

                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 5. CLEAR EMPTY SPACE / مسافة فارغة واضحة (3U)
                      // -------------------------------------------------------------
                      if (device.id === 'rack-spacer-empty') {
                        return (
                          <div
                            key={device.id}
                            className="h-20 rounded-xl border-2 border-dashed border-slate-700/60 bg-[#070b14] flex flex-col items-center justify-center text-center p-3 relative shadow-inner"
                          >
                            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                              <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                              <span className="font-bold text-slate-300">مسافة فارغة واضحة (Clear Empty Space • 3U Airflow Separation)</span>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1 font-sans">
                              فصل حراري وهوائي بين سيرفرات الإنتاج Dell R640 وأجهزة الكاميرات والسنترال
                            </span>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 6. 16-CHANNEL NVR (الكاميرات)
                      // -------------------------------------------------------------
                      if (device.id === 'nvr-16-ch') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl shadow-teal-500/25 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#1e293b]'
                            }`}
                          >
                            <div className="bg-[#0f172a] px-3 py-1.5 border-b border-slate-700 flex items-center justify-between text-white font-mono text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-400 font-bold">1U</span>
                                <span className="font-bold text-xs">HIKVISION 16-CHANNEL 4K NVR (CAMERAS)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-amber-300 font-bold">16× POE CAMERAS ACTIVE</span>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                              </div>
                            </div>

                            {/* 16 Camera Channels Status Indicators */}
                            <div className="p-2 bg-[#141d2d] flex items-center justify-between gap-2">
                              <div className="grid grid-cols-16 gap-1 w-full bg-[#0b121e] p-1.5 rounded-lg border border-slate-700/60">
                                {device.ports.map(port => {
                                  const isPortSelected = selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber;
                                  const isSearchMatch = isPortMatchingSearch(port);
                                  return (
                                    <div
                                      key={port.portNumber}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectPort(device.id, port);
                                      }}
                                      className={`port-interactive-target flex flex-col items-center justify-center p-1 rounded transition-all cursor-pointer ${
                                        isPortSelected
                                          ? 'bg-teal-500/30 ring-2 ring-teal-300 scale-110 z-10 shadow-md'
                                          : isSearchMatch
                                          ? 'bg-amber-500/40 ring-2 ring-amber-400 scale-110 z-10'
                                          : 'hover:bg-slate-800'
                                      }`}
                                      title={port.connectedDevice}
                                    >
                                      <span className="text-[7px] font-mono text-slate-400 font-bold">CH{port.portNumber}</span>
                                      <div className="w-3.5 h-3 rounded-2xs bg-slate-900 border border-amber-500/60 flex items-center justify-center">
                                        <div className={`w-1 h-1 rounded-full ${ledsBlinking ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 7. GRANDSTREAM IP PBX / CENTRAL
                      // -------------------------------------------------------------
                      if (device.id === 'grandstream-pbx') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl shadow-teal-500/25 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#172554]'
                            }`}
                          >
                            <div className="bg-[#1e3a8a] px-3 py-1.5 border-b border-blue-500/40 flex items-center justify-between text-white font-mono text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="text-blue-300 font-bold">1U</span>
                                <span className="font-bold text-xs">GRANDSTREAM UCM IP PBX (السنترال)</span>
                              </div>
                              <span className="text-blue-200 font-bold">SIP SERVER • 4× FXO • 2× FXS</span>
                            </div>

                            <div className="p-2 bg-[#0f1b3d] flex items-center justify-between gap-3">
                              {/* Blue Backlit LCD Screen Simulation */}
                              <div className="bg-[#0284c7] text-slate-950 font-mono font-black px-2.5 py-1 rounded text-[10px] border border-cyan-300 shadow-sm flex items-center gap-2">
                                <span>IP: 192.168.30.1</span>
                                <span>•</span>
                                <span>EXT: 24 ACTIVE</span>
                              </div>

                              {/* Ports Array */}
                              <div className="flex items-center gap-1.5">
                                {device.ports.map(port => (
                                  <button
                                    key={port.portNumber}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectPort(device.id, port);
                                    }}
                                    className={`port-interactive-target px-2 py-1 rounded text-[8px] font-mono font-bold transition flex items-center gap-1 ${
                                      selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber
                                        ? 'bg-teal-400 text-slate-950'
                                        : 'bg-blue-950 text-blue-200 hover:bg-blue-900 border border-blue-700/60'
                                    }`}
                                  >
                                    <span>{port.label}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // -------------------------------------------------------------
                      // 8. ENTERPRISE FIREWALL (Netgate / OPNsense)
                      // -------------------------------------------------------------
                      if (device.id === 'firewall-core') {
                        return (
                          <div
                            key={device.id}
                            onClick={() => setSelectedDeviceId(device.id)}
                            className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                              isSelected
                                ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl shadow-teal-500/25 scale-[1.01]'
                                : 'border-slate-700 hover:border-slate-500 bg-[#450a0a]'
                            }`}
                          >
                            <div className="bg-[#7f1d1d] px-3 py-1.5 border-b border-red-600/40 flex items-center justify-between text-white font-mono text-[10px]">
                              <div className="flex items-center gap-2">
                                <span className="text-red-300 font-bold">1U</span>
                                <span className="font-bold text-xs">ENTERPRISE FIREWALL GATEWAY (OPNsense / Netgate)</span>
                              </div>
                              <span className="text-red-200 font-bold">IDS/IPS SURICATA ACTIVE • 24 Mbps L3VPN</span>
                            </div>

                            <div className="p-2 bg-[#2d0a0a] flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 text-[9px] font-mono text-red-200">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>THROUGHPUT: 24.2 Mbps (L3VPN ENCRYPTED)</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {device.ports.map(port => (
                                  <button
                                    key={port.portNumber}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectPort(device.id, port);
                                    }}
                                    className={`port-interactive-target px-2 py-1 rounded text-[8px] font-mono font-bold transition flex items-center gap-1 ${
                                      selectedPort?.deviceId === device.id && selectedPort?.port.portNumber === port.portNumber
                                        ? 'bg-teal-400 text-slate-950'
                                        : 'bg-red-950 text-red-200 hover:bg-red-900 border border-red-700/60'
                                    }`}
                                  >
                                    <span>{port.label}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Generic Custom Device rendering (Added dynamically via Add Device modal)
                      return (
                        <div
                          key={device.id}
                          onClick={() => setSelectedDeviceId(device.id)}
                          className={`group rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden p-2.5 bg-slate-900 ${
                            isSelected
                              ? 'ring-2 ring-teal-400 border-teal-400 shadow-xl'
                              : 'border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                            <span>{device.name} ({device.model})</span>
                            <span className="text-[10px] text-teal-400">{device.uHeight}U</span>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap">
                            {device.ports.map(port => (
                              <button
                                key={port.portNumber}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectPort(device.id, port);
                                }}
                                className="port-interactive-target px-2 py-1 rounded text-[8px] bg-slate-800 hover:bg-slate-700 text-slate-200"
                              >
                                {port.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* RIGHT VERTICAL 19" MOUNTING RAIL */}
                  <div className="w-9 bg-[#0b101c] rounded-xl border border-slate-700/80 p-1 flex flex-col justify-between items-center text-[8px] font-mono text-slate-500 shrink-0">
                    {['27U', '26U', '25U', '24U', '23U', '22U', '21U', '20U', '19U', '18U'].map((u, i) => (
                      <div key={i} className="flex flex-col items-center justify-center py-1">
                        <div className="w-1.5 h-1.5 rounded-2xs bg-slate-800 border border-slate-600 mb-0.5" title={`Cage Nut Hole ${u}`}></div>
                        <span className="text-[7px] font-bold text-teal-400/80">{u}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Rack Base & Heavy Duty Grounding Bar */}
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>EARTH GROUNDING BUSBAR: CONNECTED & CERTIFIED</span>
                  </span>
                  <span className="text-teal-400 font-bold">PERLA 27U SERVER ENCLOSURE</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ===================================================================== */}
        {/* LEFT: DEEP-DIVE PORT & DEVICE INSPECTOR (4 COLS) */}
        {/* ===================================================================== */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* 1. PORT INSPECTOR CARD (CRITICAL FEATURE FOR PORT 7 AND ALL PORTS) */}
          {selectedPort ? (
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border-2 border-teal-500/50 shadow-2xl space-y-3.5 text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header: Port Title & Status */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/40 flex items-center justify-center">
                    {renderDeviceTypeIcon(selectedPort.port.deviceType, "w-5 h-5")}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>المنفذ {selectedPort.port.label} (Port {selectedPort.port.portNumber})</span>
                    </h3>
                    <span className="text-[10px] font-mono text-teal-400 block mt-0.5">
                      الجهاز الحاضن: {devicesList.find(d => d.id === selectedPort.deviceId)?.model}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingPortForm(selectedPort.port);
                      setIsEditPortModalOpen(true);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="تعديل بيانات المنفذ (Data-Driven Configuration)"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    selectedPort.port.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {selectedPort.port.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Connected Device & Endpoint Info */}
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold block">الجهاز المتصل (Connected Device):</span>
                <div className="text-xs font-black text-white flex items-center gap-2">
                  <span className="text-teal-300">{selectedPort.port.connectedDevice}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">
                  {selectedPort.port.userEndpoint}
                </div>
              </div>

              {/* Data-Driven Grid: IP, MAC, VLAN, Speed */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {selectedPort.port.ipAddress && (
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                    <span className="text-[9px] text-slate-400 block">IP Address:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-300 text-[11px]">{selectedPort.port.ipAddress}</span>
                      <button
                        onClick={() => copyToClipboard(selectedPort.port.ipAddress!)}
                        className="text-slate-400 hover:text-white"
                        title="نسخ عنوان IP"
                      >
                        {copiedText === selectedPort.port.ipAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                )}

                {selectedPort.port.macAddress && (
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                    <span className="text-[9px] text-slate-400 block">MAC Address:</span>
                    <span className="font-bold text-slate-200 text-[10px] truncate block">{selectedPort.port.macAddress}</span>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5 col-span-2">
                  <span className="text-[9px] text-slate-400 block">الشبكة الافتراضية (VLAN):</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border inline-block ${getVlanColorBadge(selectedPort.port.vlanId)}`}>
                    {selectedPort.port.vlan}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <span className="text-[9px] text-slate-400 block">السرعة والتردد:</span>
                  <span className="font-bold text-emerald-300 text-[10px] truncate block">{selectedPort.port.speed}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <span className="text-[9px] text-slate-400 block">طاقة PoE المستهلكة:</span>
                  <span className="font-bold text-amber-300 text-[11px]">{selectedPort.port.poeWatts || 0} Watts</span>
                </div>
              </div>

              {/* Physical Connection Trace (Patch Panel Mapping) */}
              {selectedPort.port.patchPanelMapping && (
                <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2">
                  <span className="text-[10px] text-teal-300 font-bold flex items-center gap-1">
                    <Network className="w-3.5 h-3.5" />
                    <span>تتبع التوصيل الفيزيائي (Physical Cable Route):</span>
                  </span>
                  <p className="text-[11px] text-slate-200 leading-relaxed font-mono">
                    {selectedPort.port.patchPanelMapping.panelId === 'patch-panel-1' ? 'الباتش بانل 1' : 'الباتش بانل 2'} [Port {selectedPort.port.patchPanelMapping.portNumber}] ──Cat6──&gt; {selectedPort.port.patchPanelMapping.roomDrop}
                  </p>

                  {/* Interactive Jump Button (Switch <-> Patch Panel) */}
                  {selectedPort.deviceId === 'cisco-switch-48' ? (
                    <button
                      onClick={() => handleJumpToCrossConnection(selectedPort.port.patchPanelMapping!.panelId, selectedPort.port.patchPanelMapping!.portNumber)}
                      className="w-full py-1.5 px-3 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 border border-teal-400/40 text-[10px] font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                      <span>انتقل إلى منفذ الباتش بانل المناظر (Port {selectedPort.port.patchPanelMapping.portNumber})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJumpToCrossConnection('cisco-switch-48', selectedPort.port.portNumber)}
                      className="w-full py-1.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-400/40 text-[10px] font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                      <span>انتقل إلى منفذ سويتش سيسكو المقابل (Gi1/0/{selectedPort.port.portNumber})</span>
                    </button>
                  )}
                </div>
              )}

              {/* Ask Hypatia About This Port */}
              {onAskHypatia && (
                <button
                  onClick={() => onAskHypatia(`أريد فحص إعدادات المنفذ Port ${selectedPort.port.portNumber} (${selectedPort.port.connectedDevice}) في راك المعادي`)}
                  className="w-full py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>استشارة هيباتيا بخصوص المنفذ {selectedPort.port.portNumber}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2 text-slate-400">
              <Info className="w-8 h-8 text-teal-400 mx-auto" />
              <p className="text-xs font-bold text-white">اضغط على أي منفذ (Port) لعرض كافة بياناته</p>
              <p className="text-[11px] text-slate-400">
                يمكنك الضغط على Port 7 بسويتش سيسكو أو الباتش بانل أو أي منفذ آخر لفحص الجهاز المتصل وعنوان الـ IP والـ VLAN.
              </p>
            </div>
          )}

          {/* 2. ACTIVE DEVICE SPECIFICATION CARD */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3.5 text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div>
                <span className="text-[10px] font-mono text-teal-400 font-bold">
                  الوحدة: {activeDevice.uHeight}U • {activeDevice.category.toUpperCase()}
                </span>
                <h4 className="text-sm font-black text-white mt-0.5">
                  {activeDevice.arabicName}
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {activeDevice.status.toUpperCase()}
              </span>
            </div>

            {/* Model & Manufacturer */}
            <div className="space-y-1 text-xs">
              <div className="text-[11px] text-slate-400">الموديل الحقيقي:</div>
              <div className="font-mono text-teal-300 font-bold text-xs">{activeDevice.model}</div>
              <div className="text-[10px] text-slate-400">الشركة المصنعة: {activeDevice.manufacturer}</div>
            </div>

            {/* Specs Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-bold block">المواصفات الفنية:</span>
              {activeDevice.specs.map((spec, sIdx) => (
                <div key={sIdx} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Invoices & Purchase Reference */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">التوريد والمسؤول الهندسي:</span>
              <p className="text-white font-bold">{activeDevice.responsible}</p>
              <p className="text-slate-400 font-mono text-[10px]">{activeDevice.invoiceInfo}</p>
            </div>

            {/* Reset to Factory Specs Button */}
            <button
              onClick={handleResetToDefaultConfig}
              className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10px] font-mono transition"
            >
              استعادة المواصفات الرسمية الأصلية للراك
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL: EDIT PORT DETAILS (Data-Driven Interactivity) */}
      {/* ========================================================================= */}
      {isEditPortModalOpen && selectedPort && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-400" />
                <span>تعديل إعدادات المنفذ {selectedPort.port.label}</span>
              </h3>
              <button
                onClick={() => setIsEditPortModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePortEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">اسم الجهاز المتصل:</label>
                <input
                  type="text"
                  value={editingPortForm.connectedDevice || ''}
                  onChange={(e) => setEditingPortForm({ ...editingPortForm, connectedDevice: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">المستخدم / نقطة التواجد (Endpoint):</label>
                <input
                  type="text"
                  value={editingPortForm.userEndpoint || ''}
                  onChange={(e) => setEditingPortForm({ ...editingPortForm, userEndpoint: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">عنوان IP:</label>
                  <input
                    type="text"
                    value={editingPortForm.ipAddress || ''}
                    onChange={(e) => setEditingPortForm({ ...editingPortForm, ipAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    placeholder="192.168.10.x"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">عنوان MAC:</label>
                  <input
                    type="text"
                    value={editingPortForm.macAddress || ''}
                    onChange={(e) => setEditingPortForm({ ...editingPortForm, macAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    placeholder="AA:BB:CC:DD:EE:FF"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">نوع الجهاز (Device Type):</label>
                  <select
                    value={editingPortForm.deviceType || 'workstation'}
                    onChange={(e) => setEditingPortForm({ ...editingPortForm, deviceType: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value="printer">طابعة (Printer)</option>
                    <option value="workstation">محطة عمل (Workstation / PC)</option>
                    <option value="camera">كاميرا مراقبة (Camera)</option>
                    <option value="voip_phone">هاتف مكتبي (VoIP Phone)</option>
                    <option value="server">سيرفر (Server)</option>
                    <option value="switch">سويتش (Switch)</option>
                    <option value="access_point">أكسس بوينت (Access Point)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">الشبكة الافتراضية (VLAN):</label>
                  <select
                    value={editingPortForm.vlanId || 10}
                    onChange={(e) => {
                      const vId = Number(e.target.value);
                      const label = vId === 10 ? 'VLAN 10 - Staff & Admin' : vId === 15 ? 'VLAN 15 - Call Center' : vId === 20 ? 'VLAN 20 - CCTV' : vId === 30 ? 'VLAN 30 - VoIP' : 'VLAN 50 - Servers';
                      setEditingPortForm({ ...editingPortForm, vlanId: vId, vlan: label });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value={10}>VLAN 10 (الإدارة والموظفين)</option>
                    <option value={15}>VLAN 15 (الكول سنتر)</option>
                    <option value={20}>VLAN 20 (الكاميرات)</option>
                    <option value={30}>VLAN 30 (الاتصالات VoIP)</option>
                    <option value={50}>VLAN 50 (السيرفرات)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">السرعة والتردد (Speed):</label>
                <input
                  type="text"
                  value={editingPortForm.speed || '1000 Mbps Full Duplex'}
                  onChange={(e) => setEditingPortForm({ ...editingPortForm, speed: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditPortModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: ADD NEW RACK DEVICE (Requirement #8: Extensibility) */}
      {/* ========================================================================= */}
      {isAddDeviceModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 space-y-4 shadow-2xl text-right">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>إضافة جهاز جديد إلى كابينة الراك (Data-Driven Add)</span>
              </h3>
              <button
                onClick={() => setIsAddDeviceModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewDevice} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">اسم الجهاز:</label>
                <input
                  type="text"
                  value={newDeviceForm.name}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  placeholder="مثال: سويتش التوسعة 24 بورت"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-bold mb-1">الموديل الحقيقي (Model):</label>
                <input
                  type="text"
                  value={newDeviceForm.model}
                  onChange={(e) => setNewDeviceForm({ ...newDeviceForm, model: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                  placeholder="مثال: Cisco Catalyst 2960X-24TS"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">فئة الجهاز:</label>
                  <select
                    value={newDeviceForm.category}
                    onChange={(e) => setNewDeviceForm({ ...newDeviceForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value="switch">سويتش (Switch)</option>
                    <option value="server">سيرفر (Server)</option>
                    <option value="patch_panel">باتش بانل (Patch Panel)</option>
                    <option value="firewall">جدار ناري (Firewall)</option>
                    <option value="nvr">مسجل كاميرات (NVR)</option>
                    <option value="pbx">سنترال (PBX)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">ارتفاع الوحدة (Rack Unit U):</label>
                  <select
                    value={newDeviceForm.uHeight}
                    onChange={(e) => setNewDeviceForm({ ...newDeviceForm, uHeight: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                  >
                    <option value={1}>1U</option>
                    <option value={2}>2U</option>
                    <option value={3}>3U</option>
                    <option value={4}>4U</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">عدد المنافذ (Port Count):</label>
                  <input
                    type="number"
                    value={newDeviceForm.portCount}
                    onChange={(e) => setNewDeviceForm({ ...newDeviceForm, portCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    min={1}
                    max={48}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-bold mb-1">استهلاك الطاقة (Watts):</label>
                  <input
                    type="number"
                    value={newDeviceForm.powerWatts}
                    onChange={(e) => setNewDeviceForm({ ...newDeviceForm, powerWatts: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDeviceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  إضافة الجهاز إلى الراك
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
