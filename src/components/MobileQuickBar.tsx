import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';

export const MobileQuickBar: React.FC = () => {
  const { t, openAppointmentModal } = useApp();

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-100 dark:border-slate-800 p-2.5 px-4 shadow-[0_-4px_25px_rgba(14,165,233,0.12)] flex items-center gap-2.5">
      {/* Quick Call Button */}
      <a
        href="tel:+919966364701"
        className="flex-1 py-3 px-3 rounded-full border border-sky-100 dark:border-slate-700 bg-sky-50/60 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
      >
        <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400" />
        <span>Call Now</span>
      </a>

      {/* Book Appointment on WhatsApp Button */}
      <button
        onClick={() => openAppointmentModal()}
        className="flex-[2] py-3 px-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Book on WhatsApp</span>
      </button>
    </div>
  );
};
