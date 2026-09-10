import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';
import { defaultBeforeAfterCases } from '../data/cases';
import { BeforeAfterCase, Language, Theme } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: typeof translations.en;
  isAppointmentModalOpen: boolean;
  openAppointmentModal: (preselectedTreatment?: string) => void;
  closeAppointmentModal: () => void;
  selectedTreatmentForModal: string;
  // Admin & Before/After state
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  beforeAfterCases: BeforeAfterCase[];
  addBeforeAfterCase: (newCase: Omit<BeforeAfterCase, 'id' | 'dateAdded'>) => void;
  updateBeforeAfterCase: (id: string, updated: Partial<BeforeAfterCase>) => void;
  deleteBeforeAfterCase: (id: string) => void;
  doctorPhoto: string;
  setDoctorPhoto: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CASES_STORAGE_KEY = 'bapuji_clinical_real_cases_v8';
const ADMIN_SESSION_KEY = 'bapuji_admin_session';
const DOCTOR_PHOTO_KEY = 'bapuji_doctor_photo';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bapuji_lang');
    return saved === 'te' ? 'te' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bapuji_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  // 2. Theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('bapuji_theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    // system preference fallback
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    if (isDark) {
      root.classList.add('dark');
      document.body?.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body?.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('bapuji_theme', theme);
  }, [theme]);

  const setTheme = (th: Theme) => setThemeState(th);
  const toggleTheme = () => setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));

  // 3. Appointment Modal
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedTreatmentForModal, setSelectedTreatmentForModal] = useState('');

  const openAppointmentModal = (preselectedTreatment?: string) => {
    if (preselectedTreatment) {
      setSelectedTreatmentForModal(preselectedTreatment);
    }
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  // 4. Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (session) {
        const { expiry } = JSON.parse(session);
        if (Date.now() < expiry) {
          return true;
        }
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === 'bapuji' && pass.trim() === '9966364701') {
      const fourHoursFromNow = Date.now() + 4 * 60 * 60 * 1000;
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ expiry: fourHoursFromNow }));
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminLoggedIn(false);
  };

  // 5. Before & After Cases - initialized strictly with real clinical patient transformation cases
  const [beforeAfterCases, setBeforeAfterCases] = useState<BeforeAfterCase[]>(() => {
    try {
      // Clear legacy storage keys if present
      localStorage.removeItem('bapuji_clinical_real_cases_v7');
      localStorage.removeItem('bapuji_clinical_real_cases_v6');
      localStorage.removeItem('bapuji_clinical_real_cases_v5');
      localStorage.removeItem('bapuji_before_after_cases');
      localStorage.removeItem('bapuji_dental_cases');

      const saved = localStorage.getItem(CASES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === defaultBeforeAfterCases.length) {
          const hasOldImages = parsed.some(
            (c: any) =>
              (typeof c.image === 'string' && (c.image.includes('e38048f1') || c.image.includes('unsplash'))) ||
              (typeof c.beforeImage === 'string' && (c.beforeImage.includes('e38048f1') || c.beforeImage.includes('unsplash')))
          );
          if (!hasOldImages) {
            return parsed;
          }
        }
      }
    } catch {
      // fallback
    }
    return defaultBeforeAfterCases;
  });

  // 6. Doctor Photo (Allows fallback to /doctor.png, /image.png, or custom uploaded photo)
  const [doctorPhoto, setDoctorPhotoState] = useState<string>(() => {
    const saved = localStorage.getItem(DOCTOR_PHOTO_KEY);
    return saved || '/doctor.png';
  });

  const setDoctorPhoto = (url: string) => {
    setDoctorPhotoState(url);
    localStorage.setItem(DOCTOR_PHOTO_KEY, url);
  };

  const saveCasesToStorage = (cases: BeforeAfterCase[]) => {
    setBeforeAfterCases(cases);
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
  };

  const addBeforeAfterCase = (newCaseData: Omit<BeforeAfterCase, 'id' | 'dateAdded'>) => {
    const newCase: BeforeAfterCase = {
      ...newCaseData,
      id: 'case-' + Date.now(),
      dateAdded: new Date().toISOString(),
    };
    const updated = [newCase, ...beforeAfterCases];
    saveCasesToStorage(updated);
  };

  const updateBeforeAfterCase = (id: string, updatedFields: Partial<BeforeAfterCase>) => {
    const updated = beforeAfterCases.map(c => (c.id === id ? { ...c, ...updatedFields } : c));
    saveCasesToStorage(updated);
  };

  const deleteBeforeAfterCase = (id: string) => {
    const updated = beforeAfterCases.filter(c => c.id !== id);
    saveCasesToStorage(updated);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        isAppointmentModalOpen,
        openAppointmentModal,
        closeAppointmentModal,
        selectedTreatmentForModal,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        beforeAfterCases,
        addBeforeAfterCase,
        updateBeforeAfterCase,
        deleteBeforeAfterCase,
        doctorPhoto,
        setDoctorPhoto,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
