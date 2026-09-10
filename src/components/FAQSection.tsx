import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { faqData } from '../data/faq';

export const FAQSection: React.FC = () => {
  const { t, language } = useApp();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-950 border-b border-sky-100/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 text-left">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const question = language === 'te' ? item.questionTe : item.questionEn;
            const answer = language === 'te' ? item.answerTe : item.answerEn;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left font-bold text-slate-800 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base leading-snug">{question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600 bg-sky-50 dark:bg-sky-950/60' : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-sky-50 dark:border-slate-800/80">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
