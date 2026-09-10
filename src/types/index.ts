export type Language = 'en' | 'te';
export type Theme = 'light' | 'dark';

export interface TreatmentItem {
  id: string;
  nameEn: string;
  nameTe: string;
  descEn: string;
  descTe: string;
  iconName: string;
  imagePlaceholder: string;
  badgeEn?: string;
  badgeTe?: string;
}

export interface BeforeAfterCase {
  id: string;
  treatmentNameEn: string;
  treatmentNameTe: string;
  image?: string;
  beforeImage: string;
  afterImage: string;
  captionEn?: string;
  captionTe?: string;
  duration?: string;
  dateAdded: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  location: string;
  treatmentEn: string;
  treatmentTe: string;
  rating: number;
  reviewEn: string;
  reviewTe: string;
  verified: boolean;
  highlightEn: string;
  highlightTe: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionTe: string;
  answerEn: string;
  answerTe: string;
  category: 'general' | 'procedure' | 'payment';
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
}
