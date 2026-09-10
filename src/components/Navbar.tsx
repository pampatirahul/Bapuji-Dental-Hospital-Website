import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Globe, Phone, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, theme, toggleTheme, t, openAppointmentModal } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#doctor', label: t.nav.doctor },
    { href: '#results', label: t.nav.results },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-blue-100 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:from-sky-600 group-hover:to-blue-700 transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-white tracking-tight leading-none">
                {language === 'te' ? 'బాపూజీ సూపర్ స్పెషాలిటీ' : 'BAPUJI'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mt-0.5">
                {language === 'te' ? 'డెంటల్ హాస్పిటల్ • నిజామాబాద్' : 'Super Speciality Dental'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Controls (Lang, Theme, Book CTA) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Natural Tones Pill Language Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200/70 dark:border-slate-700">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                aria-label="Select English language"
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-sky-700 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => language !== 'te' && toggleLanguage()}
                aria-label="Select Telugu language"
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'te'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-sky-700 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark and light theme"
              className="p-2 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Book Appointment CTA Button */}
            <button
              onClick={() => openAppointmentModal()}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookAppointment}</span>
            </button>
          </div>

          {/* Mobile Right Controls (Mobile-first essentials) */}
          <div className="flex sm:hidden items-center gap-1.5">
            {/* Fast Language Toggle on Mobile */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400 border border-slate-200 dark:border-slate-700"
            >
              {language === 'en' ? 'తెలుగు' : 'EN'}
            </button>

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Quick Call Icon on Mobile Header */}
            <a
              href="tel:+919966364701"
              aria-label="Call Hospital"
              className="p-1.5 rounded-full text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile menu"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-b border-blue-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3"
          >
            <div className="space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAppointmentModal();
                }}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookAppointment}</span>
              </button>

              <a
                href="tel:+919966364701"
                className="w-full py-2.5 px-4 rounded-full border border-sky-200 dark:border-slate-700 bg-sky-50/50 dark:bg-slate-800/80 text-sky-900 dark:text-sky-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{t.nav.callNow}: {CLINIC_DISPLAY_PHONE}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
