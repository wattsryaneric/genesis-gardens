export const purposes = ['Accommodation', 'Event', 'Day Visit', 'Catering', 'Just exploring'];

export function localDateValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDateValue(date) === value;
}

export function validateEnquiry(form, today = localDateValue()) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your name.';
  const digits = form.phone.replace(/\D/g, '');
  if (!/^\+?[\d\s().-]+$/.test(form.phone.trim()) || !/^[1-9]\d{7,14}$/.test(digits.replace(/^0/, ''))) {
    errors.phone = 'Enter a valid phone number, such as 0777 979 994 or +256 777 979 994.';
  }
  if (!purposes.includes(form.purpose)) errors.purpose = 'Choose the purpose of your visit.';
  if (form.arrival && (!validDate(form.arrival) || form.arrival < today)) errors.arrival = 'Choose today or a future date.';
  if (form.departure && !form.arrival) errors.arrival = 'Choose an arrival date first.';
  if (form.departure && (!validDate(form.departure) || form.departure < today || (form.arrival && form.departure <= form.arrival))) {
    errors.departure = 'Departure must be after arrival.';
  }
  if (form.guest_count && (!/^\d+$/.test(form.guest_count) || !Number.isSafeInteger(Number(form.guest_count)) || Number(form.guest_count) < 1)) {
    errors.guest_count = 'Enter a whole number of guests, at least 1.';
  }
  return errors;
}

export function createEnquiryMessage(form) {
  return [
    'Booking enquiry — Genesis Gardens',
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Purpose: ${form.purpose}`,
    form.arrival && `${form.purpose === 'Accommodation' ? 'Arrival' : 'Visit date'}: ${form.arrival}`,
    form.purpose === 'Accommodation' && form.departure && `Departure: ${form.departure}`,
    form.guest_count && `Guests: ${form.guest_count}`,
    form.notes.trim() && `Notes: ${form.notes.trim()}`,
  ].filter(Boolean).join('\n');
}

export function enquiryWhatsAppUrl(message) {
  return `https://wa.me/256777979994?text=${encodeURIComponent(message)}`;
}
