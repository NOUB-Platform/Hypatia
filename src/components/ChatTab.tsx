import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Trash2, 
  Sparkles,
  ExternalLink,
  Layers,
  ArrowDown,
  Bot
} from 'lucide-react';
import { ChatMessage, ProjectItem } from '../types';

interface ChatTabProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onClearChat: () => void;
  activeProject: ProjectItem;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onClearChat,
  activeProject,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showModelDetails, setShowModelDetails] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const quickActionChips = [
    `ما هي خطة استلام وفحص تطبيقات مشاوير (فور بي 4B، وكالة WeKaLa، دارو)؟`,
    `كيف تم حجز 5 إيميلات رسمية لـ @mashweer.com.eg مجاناً بدون أي اشتراك إضافي؟`,
    `اشرحي لي تفاصيل عرض خطوط الربط L3VPN من المصرية للاتصالات WE لمقر المعادي`,
    `أين توجد ملفات اللوجوهات والأصول لـ ${activeProject.name} على Google Drive؟`,
    `صيغي كود SQL لفحص حركة الرحلات ومحفظة الكباتن في قاعدة بيانات فور بي`,
    `افحصي تجهيزات الراك 27U وسيرفر ديل بلاتينيوم DELL R640 بالمعادي`,
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleVoiceInput = () => {
    if (isRecording) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('المتصفح لا يدعم التسجيل الصوتي المباشر. يمكنك استخدام لوحة المفاتيح.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      recognition.onerror = (event: any) => {
        setIsRecording(false);
        if (event?.error === 'not-allowed') {
          showToast('يرجى السماح بصلاحية الميكروفون من إعدادات المتصفح.');
        } else if (event?.error !== 'no-speech') {
          showToast('تعذر التقاط الصوت، يمكنك الكتابة في المربع مباشرة.');
        }
      };
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsRecording(false);
      showToast('تعذر تشغيل الميكروفون.');
    }
  };

  const speakText = (id: string, text: string) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const cleanedText = text
        .replace(/[*#`_~]/g, '')
        .replace(/https?:\/\/\S+/g, 'رابط');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.05;

      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      window.speechSynthesis.speak(utterance);
    } else {
      showToast('المتصفح لا يدعم قراءة النصوص بالصوت.');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const msg = inputText.trim();
    setInputText('');
    await onSendMessage(msg);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs relative select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 bg-slate-900 text-white text-xs rounded-2xl shadow-xl flex items-center justify-between animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white px-2 font-bold">✕</button>
        </div>
      )}

      {/* Chat Sub-Header */}
      <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-slate-900">هيباتيا (Hypatia AI)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[11px] text-teal-800 font-medium flex items-center gap-1">
              <span className="text-slate-400">النطاق:</span>
              <span className="font-bold underline">{activeProject.name}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* AI Model Badge */}
          <button
            onClick={() => setShowModelDetails(!showModelDetails)}
            className="px-2.5 py-1 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-mono font-bold flex items-center gap-1 hover:bg-teal-100 transition"
          >
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Gemini 3.8 Flash</span>
          </button>

          {activeProject.figmaUrl && (
            <a
              href={activeProject.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[10px] font-bold flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3 h-3" />
              <span>فيجما</span>
            </a>
          )}

          <button
            onClick={onClearChat}
            title="مسح المحادثة"
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Model Transparency Info Modal */}
      {showModelDetails && (
        <div className="p-4 bg-teal-50/70 border-b border-teal-100 text-xs text-teal-950 animate-in slide-in-from-top-2 duration-150 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>آلية المعالجة وحقن السياق الهندسي في هيباتيا:</span>
            </span>
            <button
              onClick={() => setShowModelDetails(false)}
              className="text-xs text-teal-700 hover:text-teal-900 px-1 font-bold"
            >
              إغلاق ✕
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-teal-900">
            يتم تحليل استفسارك وحقن سياق منظومة مشاوير، تفاصيل خطوط WE VPN، وعقود قيمة تك ومقر المعادي لحظياً لتوفير إجابات تقنية دقيقة 100% بدون أي تخمينات.
          </p>
        </div>
      )}

      {/* Quick Action Prompts Bar */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => setShowQuickPrompts(!showQuickPrompts)}
          className="text-xs text-teal-800 font-bold flex items-center gap-1.5 hover:text-teal-900 transition py-0.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>{showQuickPrompts ? 'إخفاء الأسئلة المقترحة ▲' : '💡 استفسارات وأوامر تشغيل سريعة ▼'}</span>
        </button>
        <span className="text-[10px] text-slate-400 font-mono">
          {quickActionChips.length} أسئلة مقترحة
        </span>
      </div>

      {showQuickPrompts && (
        <div className="p-3 bg-slate-50/80 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in shrink-0">
          {quickActionChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                onSendMessage(chip);
                setShowQuickPrompts(false);
              }}
              className="p-2.5 text-right rounded-xl bg-white border border-slate-200 hover:border-teal-300 text-xs text-slate-700 hover:text-teal-900 transition shadow-2xs flex items-start gap-2"
            >
              <span className="text-teal-600 font-bold shrink-0 mt-0.5">•</span>
              <span className="leading-snug">{chip}</span>
            </button>
          ))}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                <span className="font-bold text-slate-600">{isUser ? 'أنت' : 'هيباتيا'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-teal-600 text-white font-medium rounded-br-none shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                }`}
              >
                {/* Message Content */}
                <div className="whitespace-pre-wrap font-sans selection:bg-teal-100">
                  {msg.content}
                </div>

                {/* Audio & Copy Controls for Hypatia replies */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-slate-500">
                    <button
                      onClick={() => speakText(msg.id, msg.content)}
                      className={`p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition flex items-center gap-1 text-[11px] ${
                        speakingId === msg.id ? 'text-teal-700 font-bold' : ''
                      }`}
                      title="استماع صوتي للرد"
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                          <span>إيقاف الصوت</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>قراءة بالصوت</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition flex items-center gap-1 text-[11px]"
                      title="نسخ النص"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-teal-700 font-bold">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex flex-col items-start animate-in fade-in">
            <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
              <span className="font-bold text-teal-700">هيباتيا</span>
              <span>•</span>
              <span className="text-teal-700">جاري المعالجة والتحليل...</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-teal-700 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="text-xs text-slate-600 font-medium mr-1">هيباتيا تحلل المعطيات...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Footer */}
      <div className="p-3.5 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse shadow-md'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-teal-300'
            }`}
            title={isRecording ? 'إيقاف التسجيل الصوتي' : 'تحدث بالصوت'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-teal-600" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isRecording
                ? 'جاري الاستماع لصوتك الآن... تحدث'
                : `اكتب سؤالك أو أمرك لـ ${activeProject.name}...`
            }
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition font-sans"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold rounded-xl transition shadow-xs active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
