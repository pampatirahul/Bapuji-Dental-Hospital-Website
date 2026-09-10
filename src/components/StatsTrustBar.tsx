import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Users, ThumbsUp, Star, AlertCircle, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';

function useCounter(endValue: number, duration: number, inView: boolean, decimals = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = endValue / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, endValue, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
}

export const StatsTrustBar: React.FC = () => {
  const { t, openAppointmentModal } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const years = useCounter(14, 1200, isInView, 0);
  const patients = useCounter(15000, 1600, isInView, 0);
  const successRate = useCounter(99.4, 1400, isInView, 1);
  const rating = useCounter(5.0, 1000, isInView, 1);

  const statItems = [
    {
      id: 'years',
      icon: Award,
      display: `${years}+`,
      label: t.stats.yearsExp,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
    },
    {
      id: 'patients',
      icon: Users,
      display: `${Number(patients).toLocaleString()}+`,
      label: t.stats.patientsTreated,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
    },
    {
      id: 'success',
      icon: ThumbsUp,
      display: `${successRate}%`,
      label: t.stats.successRate,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
    },
    {
      id: 'rating',
      icon: Star,
      display: `${rating} ★`,
      label: t.stats.googleRating,
      sublabel: t.stats.reviewsCount,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
  ];

  const symptoms = [
    {
      title: t.stats.symptom1Title,
      desc: t.stats.symptom1Desc,
    },
    {
      title: t.stats.symptom2Title,
      desc: t.stats.symptom2Desc,
    },
    {
      title: t.stats.symptom3Title,
      desc: t.stats.symptom3Desc,
    },
    {
      title: t.stats.symptom4Title,
      desc: t.stats.symptom4Desc,
    },
  ];

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-950 border-b border-sky-100/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Count-up Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
                  {stat.display}
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                    {stat.sublabel}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* When to Book / Gentle Urgency Card in Premium Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-sky-950 text-white shadow-xl shadow-sky-950/20 border border-sky-800/30 overflow-hidden text-left"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Header & Description */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 backdrop-blur-sm border border-sky-400/20">
                <HeartPulse className="w-3.5 h-3.5 text-sky-300" />
                <span>{t.stats.title}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white">
                {t.stats.whenToBookTitle}
              </h3>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-normal">
                {t.stats.whenToBookSubtitle}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => openAppointmentModal()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-slate-900 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>{t.stats.statsCta}</span>
                  <ArrowRight className="w-4 h-4 text-sky-600" />
                </button>
              </div>
            </div>

            {/* 4 Symptoms / Indicators Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {symptoms.map((symp, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-left space-y-1.5 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-sky-300 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {symp.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-sky-100/80 leading-relaxed">
                    {symp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
