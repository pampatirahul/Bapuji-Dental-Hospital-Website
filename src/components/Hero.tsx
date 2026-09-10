import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone, Calendar, Clock, Star, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { t, language, openAppointmentModal, doctorPhoto } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 sm:py-16 lg:py-20 border-b border-sky-100/80 dark:border-slate-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
              <Award className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Hospital Name & Main Heading */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                {t.hospitalName}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
                {language === 'te' ? (
                  <>
                    మీ చిరునవ్వు మా బాధ్యత. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400">
                      అధునాతన దంత వైద్యం.
                    </span>
                  </>
                ) : (
                  <>
                    Caring for Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400">
                      Perfect Smile.
                    </span>
                  </>
                )}
              </h1>
            </div>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              {t.hero.subheading}
            </p>

            {/* Telugu Italic Accent */}
            <p className="text-sm sm:text-base font-medium text-sky-700/70 dark:text-sky-300/70 italic">
              మీ చిరునవ్వు మా బాధ్యత. అధునాతన దంత వైద్యం.
            </p>

            {/* 2-Column Hero Stat Cards in White & Light Blue */}
            <div className="grid grid-cols-2 gap-4 pt-1 max-w-md">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm shadow-sky-500/5">
                <div className="text-3xl font-black text-sky-600 dark:text-sky-400">14+</div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {t.stats.yearsExp}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm shadow-sky-500/5">
                <div className="text-3xl font-black text-sky-600 dark:text-sky-400">15k+</div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {t.stats.patientsTreated}
                </div>
              </div>
            </div>

            {/* Primary WhatsApp Button & Emergency Call */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* WhatsApp Booking CTA */}
              <button
                onClick={() => openAppointmentModal()}
                className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all text-sm sm:text-base cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Book on WhatsApp</span>
              </button>

              {/* Emergency Call Link */}
              <a
                href="tel:+919966364701"
                className="flex items-center justify-center gap-2 text-sm text-slate-700 dark:text-slate-200 font-semibold hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-3.5 px-5 rounded-2xl border border-sky-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              >
                <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Emergency: {CLINIC_DISPLAY_PHONE}</span>
              </a>
            </div>

            {/* Timings & Highlights Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="font-semibold">{t.hero.timings}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-semibold">{t.hero.statsSnippet}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Card - Premium White & Light Blue Doctor Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Doctor Showcase Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-500/5 text-left space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Doctor Portrait Image */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-sky-50 dark:bg-slate-800 border-2 border-sky-200 dark:border-slate-700 shadow-md">
                  <img
                    src={doctorPhoto}
                    alt="Dr. Balaram J. - Consultant Orthodontist and Implantologist"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('/image.png')) {
                        img.src = '/image.png';
                      } else {
                        img.style.display = 'none';
                        const fb = document.getElementById('hero-doc-fb');
                        if (fb) fb.style.display = 'flex';
                      }
                    }}
                  />
                  <div
                    id="hero-doc-fb"
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 to-blue-700 text-white p-2"
                  >
                    <ShieldCheck className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-bold">Dr. Balaram J.</span>
                  </div>
                </div>

                {/* Doctor Credentials Details */}
                <div className="space-y-1.5 flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60">
                    <CheckCircle2 className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                    <span>Chief Dental Surgeon</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
                    Dr. Balaram J. <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">M.D.S.</span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Consultant Orthodontist & Implantologist
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug pt-1">
                    Assistant Professor at Meghana Dental College. Dedicated to modern, evidence-based painless dentistry.
                  </p>
                </div>
              </div>

              {/* Badges Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sky-50 dark:border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-sky-400 block">Experience</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white">14+ Years Mastery</span>
                </div>
                <div className="p-2.5 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 text-center">
                  <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-sky-400 block">Speciality</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white">Braces & Implants</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-sky-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase mb-0.5">Hospital Timings</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">9:00 AM - 8:00 PM (All Days Open)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Google Rating</p>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="text-xs font-black">5.0</span>
                  <span className="flex text-xs">★★★★★</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
