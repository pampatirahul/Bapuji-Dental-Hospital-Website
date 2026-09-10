import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Stethoscope, CheckCircle, Calendar, Sparkles, Building2, BookOpen } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

export const DoctorSection: React.FC = () => {
  const { t, language, openAppointmentModal, doctorPhoto } = useApp();

  const clinicalHighlights = [
    t.doctor.highlight1,
    t.doctor.highlight2,
    t.doctor.highlight3,
    t.doctor.highlight4,
  ];

  return (
    <section id="doctor" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-sky-100/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Badge & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.doctor.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.doctor.name}
          </h2>
          <p className="text-sm sm:text-base font-bold text-sky-600 dark:text-sky-400">
            {t.doctor.role}
          </p>
        </div>

        {/* Doctor Showcase Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Doctor Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm rounded-3xl p-3 sm:p-4 bg-white dark:bg-slate-900 border-2 border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-500/10">
              <div className="relative rounded-2xl overflow-hidden bg-sky-50 dark:bg-slate-800 aspect-[3/4]">
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
                      const fallback = document.getElementById('doctor-bio-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }
                  }}
                />

                {/* Graceful Fallback if image path pending */}
                <div
                  id="doctor-bio-fallback"
                  style={{ display: 'none' }}
                  className="w-full h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-sky-600 to-blue-700 text-white"
                >
                  <div className="w-20 h-20 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-3">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">Dr. Balaram J.</h4>
                  <p className="text-xs text-sky-100 font-medium">B.D.S., M.D.S.</p>
                  <p className="text-xs text-white/90 mt-2">Consultant Orthodontist & Implantologist</p>
                </div>

                {/* Sub-card overlay at bottom */}
                <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-md text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{t.doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{t.doctor.academicRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Doctor Bio & Practice Approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Academic & Clinician Credential Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60">
                <Award className="w-3.5 h-3.5 text-sky-600" />
                <span>14+ Years Clinical Mastery</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Assistant Professor & Educator</span>
              </span>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              <p>{t.doctor.bio1}</p>
              <p>{t.doctor.bio2}</p>
            </div>

            {/* Key Clinical Expertise List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{t.doctor.highlightsTitle}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clinicalHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-sky-50/40 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 flex items-start gap-2.5 text-left"
                  >
                    <CheckCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-normal">
                      {hl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                onClick={() => openAppointmentModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.doctor.consultationCta}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
