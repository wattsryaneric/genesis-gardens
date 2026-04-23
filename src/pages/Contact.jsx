import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/shared/PageHero.jsx';
import ContactChannels from '../components/contact/ContactChannels.jsx';
import BookingForm from '../components/contact/BookingForm.jsx';

export default function Contact() {
  return (
    <>
      <PageHero
        headline="We're already looking forward to hearing from you."
        intro="At Genesis, the welcome starts before you arrive. Whether you have a question, a big event to plan, or you just want to see if there's space for you this weekend — reach out. We're real people who love what we do, and we'll get back to you with care."
      />

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Channels + Map */}
            <div>
              <ContactChannels />

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 rounded-2xl overflow-hidden border border-border/50 h-56 lg:h-64"
              >
                <iframe
                  title="Genesis Gardens Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7!2d32.77!3d0.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMukono-Seeta!5e0!3m2!1sen!2sug!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>

            {/* Right: Booking form */}
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Closing line */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-heading text-lg italic text-muted-foreground leading-relaxed">
            We usually respond within a few hours. If you need us sooner, WhatsApp is the quickest way to reach us. Either way — we can't wait to welcome you.
          </p>
        </div>
      </section>
    </>
  );
}