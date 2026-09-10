import React from 'react';
import { Phone, MessageCircle, Clock, MapPin, Sparkles, Lock, ArrowUp } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { t, language, openAppointmentModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {t.hospitalName}
                </h3>
                <p className="text-xs text-sky-400 font-semibold">
                  Dr. Balaram J. (B.D.S., M.D.S.)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={() => openAppointmentModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Booking</span>
              </button>
              <a
                href="tel:+919966364701"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{CLINIC_DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-sky-400 transition-colors">
                  {t.nav.doctor}
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-sky-400 transition-colors">
                  {t.nav.results}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-sky-400 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sky-400 transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-400 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Emergency */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              {t.contact.hoursTitle}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{t.contact.hoursValue}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-1">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{t.contact.addressValue}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/80 text-xs text-slate-400 mt-2">
              <span className="font-semibold text-rose-400">Emergency Care: </span>
              <span>{t.footer.emergencyNotice}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Access */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.copyright}</p>

          <div className="flex items-center gap-4">
            {/* Discreet Admin Login Trigger */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-sky-400 transition-colors py-1 px-2 rounded-full hover:bg-slate-800 font-medium cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{t.footer.adminLink}</span>
            </button>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
