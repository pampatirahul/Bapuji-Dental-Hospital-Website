import { AppointmentFormData } from '../types';

export const CLINIC_PHONE_NUMBER = '919966364701';
export const CLINIC_DISPLAY_PHONE = '+91 9966364701';
export const CLINIC_RAW_PHONE = '9966364701';

export function buildWhatsAppBookingUrl(data: AppointmentFormData): string {
  const lines = [
    "Hi, I'd like to book an appointment.",
    `Name: ${data.fullName.trim()}`,
    `Mobile: ${data.phone.trim()}`,
    `Treatment: ${data.treatment.trim()}`,
    `Preferred Date: ${data.preferredDate}`,
    `Preferred Time: ${data.preferredTimeSlot}`,
  ];

  if (data.notes && data.notes.trim()) {
    lines.push(`Notes: ${data.notes.trim()}`);
  }

  const message = lines.join('\n');
  return `https://wa.me/${CLINIC_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function validatePhone(phone: string): boolean {
  // Strip non-digits
  const cleaned = phone.replace(/\D/g, '');
  // Valid Indian mobile numbers are 10 digits, usually starting with 6, 7, 8, or 9
  return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
}
