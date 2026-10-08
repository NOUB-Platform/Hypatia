import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Briefcase, 
  Bot, 
  CheckCircle2, 
  Building2, 
  Scale, 
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { SYSTEM_CONTACTS, ContactPerson } from '../data/contactsData';

interface ContactsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskHypatia: (prompt: string) => void;
}

export const ContactsDirectoryModal: React.FC<ContactsDirectoryModalProps> = ({
  isOpen,
  onClose,
  onAskHypatia,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'الكل (12 جهة)' },
    { id: 'management', label: 'الإدارة والتمويل' },
    { id: 'technical', label: 'الاستشارات والتقنية' },
    { id: 'legal', label: 'الشؤون القانونية' },
    { id: 'vendor', label: 'الموردين والشركات' },
    { id: 'operations', label: 'فريق العمليات' },
  ];

  const filteredContacts = SYSTEM_CONTACTS.filter((c) => {
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 animate-in fade-in select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">دليل جهات الاتصال والمسؤولين</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-bold">
                  {SYSTEM_CONTACTS.length} مسؤول
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                أرقام الهواتف، الأدوار، ومتابعة الملفات والموضوعات المشتركة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-3 bg-white border-b border-slate-100 space-y-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الجهة، أو الموضوع المفتوح..."
              className="w-full px-3 py-2 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
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

        {/* Contacts Cards List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 bg-slate-50/50">
          {filteredContacts.map((contact) => {
            const isLawyer = contact.id === 'ct-lawyer-mohamed-mostafa';
            return (
              <div
                key={contact.id}
                className={`p-4 rounded-2xl border transition shadow-sm space-y-2.5 ${
                  isLawyer 
                    ? 'bg-amber-50/70 border-amber-200 ring-1 ring-amber-300' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${
                      isLawyer ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isLawyer ? <Scale className="w-5 h-5" /> : contact.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{contact.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {contact.entity}
                        </span>
                      </div>
                      <p className="text-[11px] text-teal-700 font-medium mt-0.5">
                        {contact.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                        title="اتصال هاتفي"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        onClose();
                        onAskHypatia(`أريد متابعة كافة الملفات والمهام المفتوحة مع ${contact.name} (${contact.role})`);
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      title="استشارة هيباتيا"
                    >
                      <Bot className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {contact.notes}
                </p>

                {/* Active Topics & Pending Items */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400">الموضوعات المفتوحة والمهام الحالية:</span>
                  <div className="space-y-1">
                    {contact.activeTopics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center text-[10px] text-slate-500">
          دليل جهات الاتصال الرسمي المعتمد لمنظومة مشاوير ومقر المعادي • 2026
        </div>

      </div>
    </div>
  );
};
