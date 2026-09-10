import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, ShieldCheck, ChevronLeft, ChevronRight, MapPin, Quote } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { testimonialsData } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-sky-100/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
              <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{t.testimonials.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-slate-800 dark:text-white">5.0 / 5.0</span>
              <span className="text-slate-500 dark:text-slate-400 ml-1.5 font-medium">
                • {t.testimonials.reviewsBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((item, idx) => {
              const reviewText = language === 'te' ? item.reviewTe : item.reviewEn;
              const treatment = language === 'te' ? item.treatmentTe : item.treatmentEn;
              const highlight = language === 'te' ? item.highlightTe : item.highlightEn;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-850 border border-sky-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 dark:hover:border-sky-700 transition-all text-left"
                >
                  <div className="space-y-3">
                    {/* Stars & Highlight */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-200/60">
                        <ShieldCheck className="w-3 h-3 text-sky-600" />
                        <span>Verified Patient</span>
                      </span>
                    </div>

                    {/* Highlight Badge */}
                    <div className="text-xs font-bold text-sky-700 dark:text-sky-300">
                      "{highlight}"
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {reviewText}
                    </p>
                  </div>

                  {/* Patient Info Footer */}
                  <div className="pt-4 mt-4 border-t border-sky-50 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-white">
                        {item.patientName}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 max-w-[130px] text-right truncate">
                      {treatment}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
