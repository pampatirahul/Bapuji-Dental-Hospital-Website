import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { BeforeAfterCase } from '../types';

export const BeforeAfterShowcase: React.FC = () => {
  const { t, language, beforeAfterCases, openAppointmentModal } = useApp();

  // Mode states: Normal Auto-Scroll vs Static Viewing Mode
  const [isStaticMode, setIsStaticMode] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);

  // Gesture navigation states (touch swipe & mouse drag)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const casesCount = beforeAfterCases.length;
  const currentCase: BeforeAfterCase | null =
    casesCount > 0 ? beforeAfterCases[activeCaseIndex % casesCount] : null;

  // Keyboard navigation when in static mode
  useEffect(() => {
    if (!isStaticMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevCase();
      } else if (e.key === 'ArrowRight') {
        handleNextCase();
      } else if (e.key === 'Escape') {
        exitStaticMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStaticMode, casesCount]);

  const handlePrevCase = () => {
    if (casesCount === 0) return;
    setActiveCaseIndex(prev => (prev === 0 ? casesCount - 1 : prev - 1));
  };

  const handleNextCase = () => {
    if (casesCount === 0) return;
    setActiveCaseIndex(prev => (prev === casesCount - 1 ? 0 : prev + 1));
  };

  // Switch from Auto-Scroll to Static Viewing Mode immediately
  const openStaticMode = (index: number) => {
    setActiveCaseIndex(index % Math.max(casesCount, 1));
    setIsStaticMode(true);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Exit Static Viewing Mode and resume automatic scrolling
  const exitStaticMode = () => {
    setIsStaticMode(false);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextCase();
      } else {
        handlePrevCase();
      }
    }
    setTouchStartX(null);
  };

  // Desktop Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = dragStartX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextCase();
      } else {
        handlePrevCase();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setDragStartX(null);
      setIsDragging(false);
    }
  };

  // If no cases exist
  if (casesCount === 0) {
    return (
      <section
        id="results"
        ref={sectionRef}
        className="py-16 sm:py-20 bg-slate-50/60 dark:bg-slate-950 border-b border-sky-100/80 dark:border-slate-800"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{t.beforeAfter.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {t.beforeAfter.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              {t.beforeAfter.subtitle}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-xl shadow-sky-500/5 max-w-lg mx-auto text-center space-y-4">
            <Layers className="w-10 h-10 text-sky-400 dark:text-sky-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'te' ? 'రోగి ఫలితాల గ్యాలరీ' : 'Patient Results Gallery'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.beforeAfter.emptyNotice}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => openAppointmentModal()}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.beforeAfter.bookPersonalized}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate array for seamless, infinite looping without sudden jumps
  const infiniteCards = [...beforeAfterCases, ...beforeAfterCases];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/30 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 border-b border-sky-100/80 dark:border-slate-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-sm shadow-sky-500/5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.beforeAfter.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.beforeAfter.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.beforeAfter.subtitle}
          </p>

          {/* Mode Indicator & Interactive Guide */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
            {!isStaticMode ? (
              <div
                onClick={() => openStaticMode(activeCaseIndex)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-sky-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm cursor-pointer hover:border-sky-400 transition"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="font-medium text-[11px] sm:text-xs">
                  {language === 'te'
                    ? 'ఆటో-స్క్రోలింగ్ గ్యాలరీ • నిశ్చలంగా చూడటానికి ఏదైనా ఇమేజ్ క్లిక్ చేయండి'
                    : 'Auto-Scrolling Gallery • Click any image to stop & enter static view'}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-200 shadow-sm">
                <Pause className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="font-semibold text-[11px] sm:text-xs">
                  {language === 'te'
                    ? 'స్టాటిక్ మోడ్ • ఆటో-స్క్రోల్ ఆపబడింది'
                    : 'Static Mode • Automatic scrolling stopped'}
                </span>
                <button
                  onClick={exitStaticMode}
                  className="ml-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] active:scale-95 transition cursor-pointer shadow-xs"
                >
                  <Play className="w-2.5 h-2.5" />
                  <span>{t.beforeAfter.resumeAutoScroll || 'Resume Auto-Scroll'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Display: Auto-Scrolling Marquee OR Static Viewing Mode */}
        <AnimatePresence mode="wait">
          {!isStaticMode ? (
            /* ========================================================================= */
            /* MODE 1: NORMAL WEBSITE MODE — SMOOTH RIGHT-TO-LEFT AUTO-SCROLL CAROUSEL   */
            /* ========================================================================= */
            <motion.div
              key="auto-scroll-gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Soft Edge Gradient Masks for Seamless Flow */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

              {/* Scrolling Track Container */}
              <div className="overflow-hidden py-4 -my-4 select-none">
                <div
                  className={`animate-marquee-continuous flex items-stretch gap-6 sm:gap-8 ${
                    isHovered ? 'animate-marquee-paused' : ''
                  }`}
                  style={{
                    animationPlayState: isHovered ? 'paused' : 'running',
                  }}
                >
                  {infiniteCards.map((caseItem, idx) => {
                    const originalIndex = idx % casesCount;
                    const caseImage = caseItem.image || caseItem.beforeImage || caseItem.afterImage;

                    return (
                      <div
                        key={`marquee-card-${caseItem.id}-${idx}`}
                        onClick={() => openStaticMode(originalIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openStaticMode(originalIndex);
                          }
                        }}
                        className="group relative w-[320px] sm:w-[420px] md:w-[460px] lg:w-[500px] shrink-0 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100/90 dark:border-slate-800 shadow-md hover:shadow-xl shadow-sky-500/5 dark:shadow-black/20 hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
                      >
                        {/* Complete Single PNG Container - 3:2 Aspect Ratio Preserved Intact Without Cropping */}
                        <div className="relative w-full aspect-[3/2] bg-slate-950 flex items-center justify-center overflow-hidden">
                          <img
                            src={caseImage}
                            alt={`Complete patient Before and After result - ${caseItem.treatmentNameEn}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain block select-none"
                          />

                          {/* Hover Prompt Overlay */}
                          <div className="absolute inset-0 bg-sky-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <span className="px-4 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white font-bold text-xs shadow-lg flex items-center gap-2">
                              <Pause className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                              <span>
                                {language === 'te'
                                  ? 'క్లిక్ చేసి స్టాటిక్‌గా వీక్షించండి'
                                  : 'Click to Inspect Patient Result'}
                              </span>
                            </span>
                          </div>

                          {/* Top Tag */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm">
                              Patient #{originalIndex + 1}
                            </span>
                          </div>

                          {caseItem.duration && (
                            <div className="absolute top-2.5 right-2.5">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-600/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-sm">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{caseItem.duration}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Caption Footer */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white dark:bg-slate-900">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 tracking-wide uppercase">
                              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                              <span>Dr. Balram J MDS</span>
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                              Bapuji Dental Hospital
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                            {language === 'te' && caseItem.treatmentNameTe
                              ? caseItem.treatmentNameTe
                              : caseItem.treatmentNameEn}
                          </h3>

                          <div className="pt-2 border-t border-sky-50 dark:border-slate-800/80 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                              {language === 'te' ? 'జగ్త్యాల్ బ్రాంచ్' : 'Opp. RTC Complex, Jagtial'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold">
                              <span>{language === 'te' ? 'వీక్షించండి' : 'View Full Image'}</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions Prompt */}
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'te'
                    ? 'గ్యాలరీ స్వయంచాలకంగా కుడి నుండి ఎడమకు స్క్రోల్ అవుతుంది. నిశ్చలంగా చూడటానికి ఏదైనా ఇమేజ్ క్లిక్ చేయండి.'
                    : 'Gallery automatically scrolls from right to left. Hover to pause, or click any image to switch to stationary viewing.'}
                </p>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* MODE 2: STATIC VIEWING MODE — COMPLETELY STATIONARY PATIENT PNG DISPLAY   */
            /* ========================================================================= */
            <motion.div
              key="static-gallery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-800 shadow-2xl shadow-sky-500/10 p-4 sm:p-7 space-y-6 text-left"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Static Viewing Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>
                        Patient {activeCaseIndex + 1} of {casesCount}
                      </span>
                    </span>

                    {currentCase?.duration && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <Clock className="w-3 h-3" />
                        <span>{currentCase.duration}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                    {language === 'te' && currentCase?.treatmentNameTe
                      ? currentCase.treatmentNameTe
                      : currentCase?.treatmentNameEn}
                  </h3>
                </div>

                {/* Top Control Bar */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={handlePrevCase}
                      className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 cursor-pointer transition"
                      aria-label="Previous patient result"
                      title="Previous (Left Arrow key)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-bold px-2.5">
                      {activeCaseIndex + 1} / {casesCount}
                    </span>
                    <button
                      onClick={handleNextCase}
                      className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 cursor-pointer transition"
                      aria-label="Next patient result"
                      title="Next (Right Arrow key)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Resume Auto-Scroll Button */}
                  <button
                    onClick={exitStaticMode}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                    title="Close static view & resume auto-scroll (Escape key)"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{t.beforeAfter.resumeAutoScroll || 'Resume Auto-Scroll'}</span>
                  </button>

                  {/* Close Icon Button */}
                  <button
                    onClick={exitStaticMode}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                    aria-label="Close static view"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Complete PNG Single Image Display - Intact 3:2 Aspect Ratio, No Cropping, No Zoom */}
              <div
                className="relative select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-sky-100 dark:border-slate-800 shadow-xl">
                  <img
                    src={currentCase?.image || currentCase?.beforeImage || currentCase?.afterImage}
                    alt={`Complete patient Before and After result - ${currentCase?.treatmentNameEn}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain block select-none pointer-events-none"
                  />
                </div>

                {/* Floating Left Navigation Arrow */}
                <button
                  onClick={handlePrevCase}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
                  aria-label="Previous patient image"
                  title="Previous (Left Arrow key)"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>

                {/* Floating Right Navigation Arrow */}
                <button
                  onClick={handleNextCase}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95 transition cursor-pointer"
                  aria-label="Next patient image"
                  title="Next (Right Arrow key)"
                >
                  <ChevronRight className="w-6 h-6 text-slate-800 dark:text-slate-100" />
                </button>
              </div>

              {/* Case Details & Action Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>{t.beforeAfter.doctorLabel || 'Dr. Balram J MDS (Bapuji Dental Hospital)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'te' && currentCase?.captionTe
                      ? currentCase.captionTe
                      : currentCase?.captionEn ||
                        'Verified patient transformation completed at Bapuji Super Speciality Dental Hospital & Implant Centre.'}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2.5">
                  <button
                    onClick={() => openAppointmentModal(currentCase?.treatmentNameEn)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 active:scale-95 transition cursor-pointer"
                  >
                    <span>{t.beforeAfter.consultThisTreatment || 'Book Consultation for this Treatment'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* All Real Patient Results Selector Strip */}
              <div className="pt-2 border-t border-sky-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">
                    {language === 'te'
                      ? `అన్ని రోగి ఫలితాలు (${casesCount} ఫోటోలు):`
                      : `Select Real Patient Result (${casesCount} Cases):`}
                  </span>
                  <span className="text-[11px]">
                    {language === 'te' ? 'బాణాలు లేదా స్వైప్ ఉపయోగించండి' : 'Use arrows, drag, or swipe to navigate'}
                  </span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {beforeAfterCases.map((c, i) => (
                    <button
                      key={`thumb-${c.id}`}
                      onClick={() => setActiveCaseIndex(i)}
                      className={`relative shrink-0 w-28 sm:w-32 aspect-[3/2] rounded-xl overflow-hidden border-2 transition cursor-pointer bg-slate-950 ${
                        activeCaseIndex === i
                          ? 'border-sky-500 shadow-md ring-2 ring-sky-300 dark:ring-sky-700 scale-105'
                          : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Jump to patient result ${i + 1}`}
                    >
                      <img
                        src={c.image || c.beforeImage || c.afterImage}
                        alt={`Thumbnail patient ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/85 text-white text-[9px] font-bold">
                        #{i + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
