import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BedDouble, ChevronDown, MapPin, MessageCircle, UsersRound } from 'lucide-react';

const quickFacts = [
  { icon: MapPin, label: 'Mukono–Seeta', detail: '2 km from the Kampala–Katosi Road junction' },
  { icon: BedDouble, label: 'Stay your way', detail: 'Rooms, camping, and day visits' },
  { icon: UsersRound, label: 'For every gathering', detail: 'Intimate stays to groups of 100' },
  { icon: MessageCircle, label: 'Quick enquiries', detail: 'Plan your visit on WhatsApp' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/WhatsApp-Image-2023-01-08-at-12.52.32.jpg"
          alt="Lush gardens at Genesis Gardens and Campsite during golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-wide"
        >
          Come as a guest.
          <br />
          <span className="italic font-light">Leave feeling like family.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 lg:mt-8 font-body text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          Genesis Gardens and Campsite is a place built from the heart — where lush gardens, warm hospitality, and a table always set for you come together, just minutes from Kampala.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Check availability
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/accommodation"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white font-body text-sm backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            Explore stays & events
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 text-left sm:grid-cols-4"
        >
          {quickFacts.map((fact) => (
            <div key={fact.label} className="border-l border-white/30 pl-3 sm:pl-4">
              <fact.icon className="mb-2 h-4 w-4 text-white/75" aria-hidden="true" />
              <p className="font-body text-xs font-medium text-white">{fact.label}</p>
              <p className="mt-0.5 font-body text-[11px] leading-snug text-white/70">{fact.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
