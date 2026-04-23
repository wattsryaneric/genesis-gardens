import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowRight, Check } from 'lucide-react';

const purposes = [
  'Accommodation',
  'Event',
  'Day Visit',
  'Catering',
  'Just exploring',
];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    purpose: '',
    preferred_date: '',
    guest_count: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (/** @type {string} */ field, /** @type {string} */ value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (/** @type {{ preventDefault: () => void; }} */ e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission - in production, replace with actual API endpoint
    try {
      // Log the enquiry to console for now
      console.log('Booking enquiry submitted:', form);

      // Option 1: Send to a webhook or API endpoint
      // await fetch('/api/booking-enquiry', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form)
      // });

      // Option 2: Use mailto link
      // window.location.href = `mailto:info@genesisgardens.com?subject=New Booking Enquiry&body=${encodeURIComponent(JSON.stringify(form, null, 2))}`;

      // For demo purposes, just wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitting(false);
      alert('Something went wrong. Please try again or contact us directly via WhatsApp.');
    }
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
          Enquiry sent!
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          We usually respond within a few hours. If you need us sooner, WhatsApp is the quickest way to reach us. Either way — we can't wait to welcome you.
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
          disabled={submitting || !form.name || !form.phone || !form.purpose}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
          ) : (
            <>
              Send my enquiry — we'll be in touch soon
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
