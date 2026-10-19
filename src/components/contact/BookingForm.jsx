import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { createEnquiryMessage, enquiryWhatsAppUrl, localDateValue, purposes, validateEnquiry } from '@/lib/enquiry.mjs';

function Field({ field, label, error, children }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field} className="font-body text-sm text-foreground">{label}</Label>
      {children}
      {error && <p id={`${field}-error`} className="font-body text-sm text-destructive">{error}</p>}
    </div>
  );
}

function BookingEnquiryForm({ enquiry, purpose }) {
  const [form, setForm] = useState({
    name: '', phone: '', purpose, arrival: '', departure: '', guest_count: '',
    notes: enquiry ? `Interested in: ${enquiry}` : '',
  });
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const editingRef = useRef(false);
  const today = localDateValue();
  const inputClass = 'bg-background border-border/50 font-body rounded-xl h-12';

  useEffect(() => {
    if (prepared) headingRef.current?.focus();
    else if (editingRef.current) {
      formRef.current?.querySelector('#enquiry-name')?.focus();
      editingRef.current = false;
    }
  }, [prepared]);

  const fieldProps = (field) => ({
    id: `enquiry-${field}`,
    name: field,
    value: form[field],
    onChange: (event) => handleChange(field, event.target.value),
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `enquiry-${field}-error` : undefined,
  });

  const handleChange = (field, value) => {
    const next = { ...form, [field]: value };
    if (field === 'purpose' && value !== 'Accommodation') next.departure = '';
    setForm(next);
    setErrors(current => {
      const validation = validateEnquiry(next);
      return Object.fromEntries(Object.keys(current).filter(key => validation[key]).map(key => [key, validation[key]]));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateEnquiry(form);
    setErrors(validation);
    if (Object.keys(validation).length) {
      formRef.current?.querySelector(`#enquiry-${Object.keys(validation)[0]}`)?.focus();
      return;
    }
    const message = createEnquiryMessage(form);
    const url = enquiryWhatsAppUrl(message);
    // The visitor still needs to send the message in WhatsApp.
    setPrepared({ message, url });
    setCopyStatus('');
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setCopyStatus('WhatsApp could not be opened. Use the link below or copy your enquiry.');
    }
  };

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(prepared.message);
      setCopyStatus('Enquiry copied. Paste it into your WhatsApp conversation.');
    } catch {
      setCopyStatus('Copy is unavailable. Select and copy your message from the box below.');
    }
  };

  if (prepared) {
    return (
      <section className="bg-card rounded-2xl p-8 lg:p-10 border border-border/50" aria-labelledby="enquiry-ready">
        <h3 id="enquiry-ready" ref={headingRef} tabIndex={-1} className="font-heading text-2xl font-semibold text-foreground mb-3">
          Your enquiry is ready
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          Review your message in WhatsApp and tap Send. If WhatsApp didn’t open, use the link below or copy your message.
        </p>
        <p className="mt-3 font-body text-sm text-muted-foreground">
          Your booking is confirmed only when Genesis replies and agrees the details with you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={prepared.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-body text-sm text-accent-foreground">
            Open WhatsApp again <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <button type="button" onClick={copyEnquiry} className="rounded-full border border-border px-5 py-3 font-body text-sm">
            Copy enquiry
          </button>
          <button type="button" onClick={() => { editingRef.current = true; setPrepared(null); }} className="rounded-full border border-border px-5 py-3 font-body text-sm">
            Edit details
          </button>
        </div>
        <p role="status" className="mt-3 font-body text-sm text-muted-foreground">{copyStatus}</p>
        <Label htmlFor="enquiry-preview" className="block mt-5 mb-2">Your message</Label>
        <Textarea id="enquiry-preview" readOnly value={prepared.message} className="min-h-[220px] bg-background font-body text-sm" />
      </section>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-card rounded-2xl p-8 lg:p-10 border border-border/50">
      <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">Tell us about your visit</h3>
      <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed" id="enquiry-help">
        Choose your visit type and preferred dates. We’ll prepare a WhatsApp message so you can ask about availability and pricing.
        Dates are requests; your booking is confirmed only after Genesis replies.
      </p>
      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="enquiry-help" className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field field="enquiry-name" label="Your name (required)" error={errors.name}>
            <Input {...fieldProps('name')} required autoComplete="name" maxLength={120} placeholder="Full name" className={inputClass} />
          </Field>
          <Field field="enquiry-phone" label="WhatsApp / phone number (required)" error={errors.phone}>
            <Input {...fieldProps('phone')} required type="tel" autoComplete="tel" maxLength={30} placeholder="+256 777 979 994" className={inputClass} />
          </Field>
        </div>
        <Field field="enquiry-purpose" label="What brings you to Genesis? (required)" error={errors.purpose}>
          <Select name="purpose" required value={form.purpose} onValueChange={value => handleChange('purpose', value)}>
            <SelectTrigger id="enquiry-purpose" aria-invalid={Boolean(errors.purpose)}
              aria-describedby={errors.purpose ? 'enquiry-purpose-error' : undefined} className={inputClass}>
              <SelectValue placeholder="Select a visit type..." />
            </SelectTrigger>
            <SelectContent>
              {purposes.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field field="enquiry-arrival" label={form.purpose === 'Accommodation' ? 'Arrival date (optional)' : 'Visit date (optional)'} error={errors.arrival}>
            <Input {...fieldProps('arrival')} type="date" min={today} className={inputClass} />
          </Field>
          {form.purpose === 'Accommodation' && (
            <Field field="enquiry-departure" label="Departure date (optional)" error={errors.departure}>
              <Input {...fieldProps('departure')} type="date" min={form.arrival || today} className={inputClass} />
            </Field>
          )}
          <Field field="enquiry-guest_count" label="Number of guests (optional)" error={errors.guest_count}>
            <Input {...fieldProps('guest_count')} type="number" min="1" step="1" inputMode="numeric" placeholder="e.g. 2" className={inputClass} />
          </Field>
        </div>
        <Field field="enquiry-notes" label="Anything else we should know? (optional)" error={errors.notes}>
          <Textarea {...fieldProps('notes')} maxLength={2000} placeholder="Special requests, dietary needs, event details..."
            className="bg-background border-border/50 font-body rounded-xl min-h-[100px]" />
        </Field>
        {Object.keys(errors).length > 0 && <p role="alert" className="font-body text-sm text-destructive">Please correct the highlighted details before continuing.</p>}
        <button type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-colors">
          Continue to WhatsApp <MessageCircle className="w-4 h-4" aria-hidden="true" />
        </button>
        <p className="font-body text-xs leading-relaxed text-muted-foreground">
          Review the prepared message in WhatsApp and tap Send to submit your enquiry.
        </p>
      </form>
    </motion.div>
  );
}

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const purpose = searchParams.get('purpose') || '';
  return <BookingEnquiryForm key={searchParams.toString()} enquiry={searchParams.get('enquiry') || ''}
    purpose={purposes.includes(purpose) ? purpose : ''} />;
}
