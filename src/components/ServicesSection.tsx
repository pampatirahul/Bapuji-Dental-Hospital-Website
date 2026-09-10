import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ShieldCheck, Sparkles, Activity, Smile, Sun, Heart, Crosshair, Crown, Zap, Award } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { servicesData } from '../data/services';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  ShieldCheck,
  Activity,
  Smile,
  Sparkles,
  Sun,
  Heart,
  Crosshair,
  Crown,
  Zap,
  Award,
};

export const ServicesSection: React.FC = () => {
  const { t, language, openAppointmentModal } = useApp();

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50/60 dark:bg-slate-950 border-b border-sky-100/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t.services.subtitle}
          </p>
        </div>

        {/* 10 Services Grid in Premium White & Light Blue rounded-3xl cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;
            const serviceName = language === 'te' ? service.nameTe : service.nameEn;
            const serviceDesc = language === 'te' ? service.descTe : service.descEn;
            const badge = language === 'te' ? service.badgeTe : service.badgeEn;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (index % 3) * 0.1 }}
                className="group flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300 overflow-hidden text-left"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-sky-50 dark:bg-slate-800">
                  <img
                    src={service.imagePlaceholder}
                    alt={serviceName}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-slate-700 shadow-sm">
                      {badge}
                    </div>
                  )}

                  {/* Icon badge in Light Blue Gradient */}
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/30">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {serviceName}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {serviceDesc}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-sky-50 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => openAppointmentModal(service.nameEn)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.services.exploreMore}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      Dr. Balaram J.
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
