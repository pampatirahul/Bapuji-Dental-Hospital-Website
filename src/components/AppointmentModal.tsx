import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Phone, User, Stethoscope, MessageSquare, AlertCircle, CheckCircle2, PhoneCall, ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { servicesData } from '../data/services';
import { buildWhatsAppBookingUrl, validatePhone, CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';
import { AppointmentFormData } from '../types';

export const AppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, closeAppointmentModal, selectedTreatmentForModal, language, t } = useApp();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    treatment: '',
    preferredDate: '',
    preferredTimeSlot: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleOpenDatePicker = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const input = dateInputRef.current;
    if (!input) return;
    try {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      } else {
        input.focus();
      }
    } catch {
      input.focus();
    }
  };

  // Sync selected treatment from context if opened with a preselected one
  useEffect(() => {
    if (selectedTreatmentForModal) {
      setFormData(prev => ({ ...prev, treatment: selectedTreatmentForModal }));
    }
  }, [selectedTreatmentForModal]);

  // Set default minimum date to today and compute tomorrow
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  const timeSlots = [
    { value: 'Morning (09:30 AM – 01:00 PM)', labelEn: 'Morning: 09:30 AM – 01:00 PM', labelTe: 'ఉదయం: 09:30 – 01:00' },
    { value: 'Afternoon (02:00 PM – 05:00 PM)', labelEn: 'Afternoon: 02:00 PM – 05:00 PM', labelTe: 'మధ్యాహ్నం: 02:00 – 05:00' },
    { value: 'Evening (05:00 PM – 08:00 PM)', labelEn: 'Evening: 05:00 PM – 08:00 PM', labelTe: 'సాయంత్రం: 05:00 – 08:00' },
  ];

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.contact.validationName;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.contact.validationPhone;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = language === 'te' 
        ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ (6-9 తో ప్రారంభమయ్యేది) నమోదు చేయండి.' 
        : 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).';
    }

    if (!formData.treatment) {
      newErrors.treatment = t.contact.validationTreatment;
    }

    if (!formData.preferredDate) {
      newErrors.date = t.contact.validationDate;
    }

    if (!formData.preferredTimeSlot) {
      newErrors.time = t.contact.validationTime;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsRedirecting(true);

    const redirectUrl = buildWhatsAppBookingUrl(formData);

    // Brief smooth confirmation state before redirecting
    setTimeout(() => {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
      closeAppointmentModal();
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        treatment: '',
        preferredDate: '',
        preferredTimeSlot: '',
        notes: '',
      });
      setErrors({});
    }, 1200);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAppointmentModal();
    };
    if (isAppointmentModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAppointmentModalOpen]);

  return (
    <AnimatePresence>
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAppointmentModal}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 z-10 my-auto text-left"
          >
            {/* Close Button */}
            <button
              onClick={closeAppointmentModal}
              aria-label={t.modal.close}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 mb-2">
                <Stethoscope className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Dr. Balaram J. • Nizamabad</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                {t.modal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.modal.subtitle}
              </p>
            </div>

            {/* Redirecting Overlay */}
            {isRedirecting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 px-4 flex flex-col items-center text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-sky-500/20 border-t-sky-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                  {t.modal.redirecting}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">
                  {t.modal.redirectNote}
                </p>
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.contact.formFullName} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t.contact.formFullNamePlaceholder}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-full border bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-rose-400 focus:ring-rose-400/20'
                          : 'border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.contact.formPhone} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-full border border-r-0 border-slate-200 dark:border-slate-700 bg-sky-50/70 dark:bg-slate-800 text-xs font-semibold text-sky-800 dark:text-sky-300">
                      +91
                    </span>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: val });
                        }}
                        placeholder={t.contact.formPhonePlaceholder}
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-r-full border bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-400/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
                        }`}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Treatment Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.contact.formTreatment} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.treatment}
                      onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                      className={`w-full pl-10 pr-8 py-2.5 rounded-full border bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm appearance-none focus:outline-none focus:ring-2 transition-all ${
                        errors.treatment
                          ? 'border-rose-400 focus:ring-rose-400/20'
                          : 'border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
                      }`}
                    >
                      <option value="">{t.contact.formTreatmentSelect}</option>
                      {servicesData.map(s => (
                        <option key={s.id} value={s.nameEn}>
                          {language === 'te' ? `${s.nameTe} (${s.nameEn})` : s.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.treatment && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.treatment}
                    </p>
                  )}
                </div>

                {/* Date & Time Slot Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Preferred Date */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="modal-date-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t.contact.formDate} <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                        {language === 'te' ? 'తేదీ ఎంచుకోండి' : 'Tap to pick'}
                      </span>
                    </div>
                    <div
                      onClick={handleOpenDatePicker}
                      className="relative cursor-pointer group"
                    >
                      <button
                        type="button"
                        onClick={handleOpenDatePicker}
                        title="Click to select appointment date"
                        aria-label="Open Calendar Date Picker"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-slate-700 transition-colors z-10 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <input
                        id="modal-date-input"
                        ref={dateInputRef}
                        type="date"
                        min={todayDate}
                        value={formData.preferredDate}
                        onClick={handleOpenDatePicker}
                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                        className={`w-full pl-11 pr-3.5 py-2.5 rounded-full border bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                          errors.date
                            ? 'border-rose-400 focus:ring-rose-400/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
                        }`}
                      />
                    </div>
                    {/* Quick Date Pills */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, preferredDate: todayDate }));
                        }}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                          formData.preferredDate === todayDate
                            ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-sky-50 hover:border-sky-200'
                        }`}
                      >
                        {language === 'te' ? 'ఈ రోజు' : 'Today'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, preferredDate: tomorrowDate }));
                        }}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                          formData.preferredDate === tomorrowDate
                            ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-sky-50 hover:border-sky-200'
                        }`}
                      >
                        {language === 'te' ? 'రేపు' : 'Tomorrow'}
                      </button>
                    </div>
                    {errors.date && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.contact.formTimeSlot} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={e => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className={`w-full pl-10 pr-7 py-2.5 rounded-full border bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm appearance-none focus:outline-none focus:ring-2 transition-all ${
                          errors.time
                            ? 'border-rose-400 focus:ring-rose-400/20'
                            : 'border-slate-200 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500/20'
                        }`}
                      >
                        <option value="">{t.contact.formTimeSlotPlaceholder}</option>
                        {timeSlots.map(slot => (
                          <option key={slot.value} value={slot.value}>
                            {language === 'te' ? slot.labelTe : slot.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.time && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Optional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.contact.formNotes}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={t.contact.formNotesPlaceholder}
                      className="w-full pl-10 pr-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.submitBtn}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span>{t.contact.directCallPrompt}</span>
                    <a
                      href="tel:+919966364701"
                      className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{CLINIC_DISPLAY_PHONE}</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
