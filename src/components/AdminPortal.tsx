import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, AlertCircle, ArrowLeft, Upload, UserCheck } from 'lucide-react';
import { useApp } from '../context/ThemeLanguageContext';
import { BeforeAfterCase } from '../types';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const {
    t,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    beforeAfterCases,
    addBeforeAfterCase,
    updateBeforeAfterCase,
    deleteBeforeAfterCase,
    doctorPhoto,
    setDoctorPhoto,
  } = useApp();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // New Case Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [treatmentNameEn, setTreatmentNameEn] = useState('');
  const [treatmentNameTe, setTreatmentNameTe] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Doctor photo update
  const [tempDoctorPhoto, setTempDoctorPhoto] = useState(doctorPhoto);
  const [docPhotoSuccess, setDocPhotoSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'before' | 'after' | 'doctor'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (target === 'before') setBeforeImage(result);
        if (target === 'after') setAfterImage(result);
        if (target === 'doctor') {
          setTempDoctorPhoto(result);
          setDoctorPhoto(result);
          setDocPhotoSuccess(true);
          setTimeout(() => setDocPhotoSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treatmentNameEn.trim()) {
      setFormError('Please provide a treatment name.');
      return;
    }
    const finalBefore = beforeImage.trim();
    const finalAfter = afterImage.trim() || finalBefore;

    if (!finalBefore) {
      setFormError('Please provide at least one Before & After case image or URL.');
      return;
    }

    if (editingId) {
      updateBeforeAfterCase(editingId, {
        treatmentNameEn,
        treatmentNameTe: treatmentNameTe || treatmentNameEn,
        beforeImage: finalBefore,
        afterImage: finalAfter,
        image: finalBefore,
        captionEn,
        captionTe: captionEn,
      });
      setFormSuccess('Case study updated successfully.');
      setEditingId(null);
    } else {
      addBeforeAfterCase({
        treatmentNameEn,
        treatmentNameTe: treatmentNameTe || treatmentNameEn,
        beforeImage: finalBefore,
        afterImage: finalAfter,
        image: finalBefore,
        captionEn,
        captionTe: captionEn,
      });
      setFormSuccess('New Before & After case study added to the showcase.');
    }

    // Reset form
    setTreatmentNameEn('');
    setTreatmentNameTe('');
    setBeforeImage('');
    setAfterImage('');
    setCaptionEn('');
    setFormError('');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleStartEdit = (c: BeforeAfterCase) => {
    setEditingId(c.id);
    setTreatmentNameEn(c.treatmentNameEn);
    setTreatmentNameTe(c.treatmentNameTe || '');
    setBeforeImage(c.beforeImage);
    setAfterImage(c.afterImage);
    setCaptionEn(c.captionEn || '');
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTreatmentNameEn('');
    setTreatmentNameTe('');
    setBeforeImage('');
    setAfterImage('');
    setCaptionEn('');
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 my-8 text-left">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Back to website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.admin.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.admin.logoutBtn}</span>
            </button>
          )}
        </div>

        {/* Content: If not logged in, show restricted login form */}
        {!isAdminLoggedIn ? (
          <div className="py-10 max-w-sm mx-auto space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto shadow-sm border border-sky-100 dark:border-sky-900">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.admin.loginHeading}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter authorized credentials to manage Before & After clinical records.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{t.admin.loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.admin.usernameLabel}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="bapuji"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.admin.passwordLabel}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                {t.admin.loginBtn}
              </button>
            </form>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium cursor-pointer"
              >
                {t.admin.backToSite}
              </button>
            </div>
          </div>
        ) : (
          /* LOGGED IN ADMIN DASHBOARD */
          <div className="py-6 space-y-8">
            {/* Session notice */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Logged in as Administrator (bapuji)
                </span>
              </div>
              <span>{t.admin.sessionExpires}</span>
            </div>

            {/* Notification alert */}
            {formSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}
            {formError && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* 1. Add / Edit Before & After Pair Form */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-sky-600" />
                  <span>
                    {editingId
                      ? 'Edit Before & After Image Pair'
                      : t.admin.addCaseTitle}
                  </span>
                </h3>
                {editingId && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveCase} className="space-y-4">
                {/* Treatment Name (EN & TE) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.admin.treatmentNameLabel} (English) *
                    </label>
                    <input
                      type="text"
                      value={treatmentNameEn}
                      onChange={e => setTreatmentNameEn(e.target.value)}
                      placeholder={t.admin.treatmentNamePlaceholder}
                      className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Treatment Name (తెలుగు - Optional)
                    </label>
                    <input
                      type="text"
                      value={treatmentNameTe}
                      onChange={e => setTreatmentNameTe(e.target.value)}
                      placeholder={t.admin.treatmentNameTePlaceholder}
                      className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Before and After Image Uploads or URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Case Image (or Before Image) */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Before &amp; After Case Image (Single Poster or Before Photo) *
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-100">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleFileUpload(e, 'before')}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">or paste URL:</span>
                    </div>
                    <input
                      type="text"
                      value={beforeImage}
                      onChange={e => setBeforeImage(e.target.value)}
                      placeholder="/filename.png or URL"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                    {beforeImage && (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2 bg-slate-950">
                        <img
                          src={beforeImage}
                          alt="Case Preview"
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                          Image Preview
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Secondary After Image (Optional) */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Separate After Image (Optional - leave blank if single poster)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-100">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleFileUpload(e, 'after')}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">or paste URL:</span>
                    </div>
                    <input
                      type="text"
                      value={afterImage}
                      onChange={e => setAfterImage(e.target.value)}
                      placeholder="https://... or base64"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                    {afterImage && (
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2 bg-slate-950">
                        <img
                          src={afterImage}
                          alt="After Preview"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                          After Preview
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Caption / Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.admin.captionLabel}
                  </label>
                  <input
                    type="text"
                    value={captionEn}
                    onChange={e => setCaptionEn(e.target.value)}
                    placeholder="e.g., Completed in 8 months with painless alignment."
                    className="w-full px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  {editingId ? 'Save Changes' : t.admin.saveCaseBtn}
                </button>
              </form>
            </div>

            {/* 2. Doctor Photo Setting */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-sky-600" />
                <span>Dr. Balaram J. Profile Photo</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can upload a photo of Dr. Balaram J. directly from your computer or paste an image URL.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-100">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Doctor Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFileUpload(e, 'doctor')}
                  />
                </label>
                {docPhotoSuccess && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Doctor photo updated!
                  </span>
                )}
              </div>
            </div>

            {/* 3. Existing Cases List */}
            <div className="space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {t.admin.existingCasesTitle} ({beforeAfterCases.length})
              </h4>

              {beforeAfterCases.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                  {t.admin.noCasesYet}
                </div>
              ) : (
                <div className="space-y-3">
                  {beforeAfterCases.map((c, idx) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <img
                            src={c.beforeImage}
                            alt="Before thumbnail"
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-slate-700"
                          />
                          <img
                            src={c.afterImage}
                            alt="After thumbnail"
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white dark:border-slate-700"
                          />
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            #{idx + 1}: {c.treatmentNameEn}
                          </h5>
                          {c.captionEn && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {c.captionEn}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleStartEdit(c)}
                          className="p-2 px-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{t.admin.editCaseBtn}</span>
                        </button>
                        <button
                          onClick={() => deleteBeforeAfterCase(c.id)}
                          className="p-2 px-3 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t.admin.deleteCaseBtn}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back button */}
            <div className="pt-2 text-right">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-750"
              >
                {t.admin.backToSite}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
