import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Check, MessageCircle } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '256777979994';

const purposes = [
  'Accommodation',
  'Event',
  'Day Visit',
  'Catering',
  'Just exploring',
];

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const enquiry = searchParams.get('enquiry') || '';
  const prefilledPurpose = purposes.includes(searchParams.get('purpose')) ? searchParams.get('purpose') : '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    purpose: prefilledPurpose,
    preferred_date: '',
    guest_count: '',
    notes: enquiry ? `Interested in: ${enquiry}` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (/** @type {string} */ field, /** @type {string} */ value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();

    const lines = [
      'New booking enquiry — Genesis Gardens',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Purpose: ${form.purpose}`,
      form.preferred_date && `Preferred date: ${form.preferred_date}`,
      form.guest_count && `Guests: ${form.guest_count}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-10 lg:p-14 border border-border/50 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-7 h-7 text-accent" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
          Almost there!
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          We've opened WhatsApp with your enquiry details filled in — just hit send over there and we'll get back to you within a few hours. Didn't open? You can also reach us directly on WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-8 lg:p-10 border border-border/50"
    >
      <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
        Tell us about your visit
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
        Fill in a few details and we'll come back to you with availability, options, and a tailored quote. No obligation — just a conversation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="font-body text-sm text-foreground">Your name</Label>
            <Input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-background border-border/50 font-body rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm text-foreground">WhatsApp / phone number</Label>
            <Input
              required
              placeholder="+256..."
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-background border-border/50 font-body rounded-xl h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-body text-sm text-foreground">What brings you to Genesis?</Label>
          <Select
            required
            value={form.purpose}
            onValueChange={(val) => handleChange('purpose', val)}
          >
            <SelectTrigger className="bg-background border-border/50 font-body rounded-xl h-12">
              <SelectValue placeholder="Select one..." />
            </SelectTrigger>
            <SelectContent>
              {purposes.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="font-body text-sm text-foreground">Preferred date or range</Label>
            <Input
              placeholder="e.g. March 15-17"
              value={form.preferred_date}
              onChange={(e) => handleChange('preferred_date', e.target.value)}
              className="bg-background border-border/50 font-body rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm text-foreground">Number of guests (approx.)</Label>
            <Input
              placeholder="e.g. 20"
              value={form.guest_count}
              onChange={(e) => handleChange('guest_count', e.target.value)}
              className="bg-background border-border/50 font-body rounded-xl h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-body text-sm text-foreground">Anything else we should know? (optional)</Label>
          <Textarea
            placeholder="Special requests, dietary needs, event details..."
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="bg-background border-border/50 font-body rounded-xl min-h-[100px]"
          />
        </div>

        <button
          type="submit"
          disabled={!form.name || !form.phone || !form.purpose}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to WhatsApp
          <MessageCircle className="w-4 h-4" />
        </button>
        <p className="font-body text-xs leading-relaxed text-muted-foreground">
          We’ll prepare your message in WhatsApp. Review it there and tap send to submit your enquiry.
        </p>
      </form>
    </motion.div>
  );
}
