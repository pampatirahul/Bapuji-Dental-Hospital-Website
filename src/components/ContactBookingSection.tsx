import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, MessageSquare, Calendar, User, Stethoscope, AlertCircle, CheckCircle2, PhoneCall, ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { servicesData } from '../data/services';
import { buildWhatsAppBookingUrl, validatePhone, CLINIC_DISPLAY_PHONE } from '../utils/whatsapp';
import { AppointmentFormData } from '../types';

export const ContactBookingSection: React.FC = () => {
  const { t, language } = useApp();
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

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

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
      newErrors.phone =
        language === 'te'
          ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ (6-9 తో ప్రారంభమయ్యేది) నమోదు చేయండి.'
          : 'Please enter a valid 10-digit Indian mobile number.';
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

    setTimeout(() => {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
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

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-blue-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/60">
            <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Content Layout: Left Info & Map, Right On-Page Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          {/* Hospital Info & Embedded Google Maps */}
          <div className="lg:col-span-6 space-y-6">
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-sky-100 dark:border-slate-700/80 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  {t.contact.addressTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.contact.addressValue}
                </p>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-sky-100 dark:border-slate-700/80 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  {t.contact.hoursTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.contact.hoursValue}
                </p>
              </div>

              {/* Direct Phone */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-sky-100 dark:border-slate-700/80 shadow-sm space-y-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                        {t.contact.phoneTitle}
                      </h4>
                      <p className="text-sm font-extrabold text-sky-700 dark:text-sky-400">
                        {CLINIC_DISPLAY_PHONE}
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+919966364701"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 shadow-sm transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.nav.callNow}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-sky-100 dark:border-slate-700 shadow-sm">
              <iframe
                title="Bapuji Super Speciality Dental Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.7444388016165!2d78.09914587378516!3d18.675460664427398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcddb2fcf034cdf%3A0x3f029eb96534e5b0!2sBapuji%20Super%20Speciality%20Dental%20Hospital!5e0!3m2!1sen!2sin!4v1788689424509!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full"
              />
            </div>
          </div>

          {/* On-Page Appointment Booking Form */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 shadow-md">
            <div className="mb-5">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Direct WhatsApp Scheduling
              </span>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">
                {t.contact.bookOnlineTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.modal.subtitle}
              </p>
            </div>

            {isRedirecting ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full border-4 border-sky-500/20 border-t-sky-600 animate-spin" />
                <h4 className="text-lg font-bold text-slate-800 dark:text-white">
                  {t.modal.redirecting}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                  {t.modal.redirectNote}
                </p>
              </div>
            ) : (
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
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
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
                    <span className="inline-flex items-center px-3.5 rounded-l-full border border-r-0 border-slate-200 dark:border-slate-700 bg-sky-50/70 dark:bg-slate-750 text-xs font-semibold text-sky-800 dark:text-sky-300">
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
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-r-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
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
                      className="w-full pl-10 pr-8 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
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
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="contact-date-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                        id="contact-date-input"
                        ref={dateInputRef}
                        type="date"
                        min={todayDate}
                        value={formData.preferredDate}
                        onClick={handleOpenDatePicker}
                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-11 pr-3.5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
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

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.contact.formTimeSlot} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={e => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full pl-10 pr-8 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
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

                {/* Notes */}
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
                      className="w-full pl-10 pr-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
