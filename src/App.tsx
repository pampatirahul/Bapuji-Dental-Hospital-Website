import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/ThemeLanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsTrustBar } from './components/StatsTrustBar';
import { ServicesSection } from './components/ServicesSection';
import { DoctorSection } from './components/DoctorSection';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactBookingSection } from './components/ContactBookingSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { AdminPortal } from './components/AdminPortal';

const MainContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
        setIsAdminOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-600 selection:text-white pb-16 sm:pb-0 transition-colors duration-200">
      {/* Sticky Header with Logo, Nav, Language Toggle & Theme Switcher */}
      <Navbar />

      {/* Main Page Landmark */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Stats and Trust Bar (Count-up animation & When to book urgency) */}
        <StatsTrustBar />

        {/* 3. Services / Treatments Grid */}
        <ServicesSection />

        {/* 4. About Doctor (Dr. Balaram J.) */}
        <DoctorSection />

        {/* 5. Before & After Showcase Box (Single showcase component) */}
        <BeforeAfterShowcase />

        {/* 6. Patient Reviews & Testimonials */}
        <TestimonialsSection />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />

        {/* 8. Contact, Location & Google Maps */}
        <ContactBookingSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Appointment Booking Modal */}
      <AppointmentModal />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar />

      {/* Restricted Admin Portal Modal */}
      {isAdminOpen && <AdminPortal onClose={handleCloseAdmin} />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
