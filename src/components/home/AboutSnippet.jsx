import React from 'react';
import { motion } from 'framer-motion';
import SectionDivider from '../shared/SectionDivider';

export default function AboutSnippet() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <SectionDivider />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 font-heading text-xl sm:text-2xl lg:text-3xl text-foreground leading-relaxed font-light italic"
        >
          Vanessa Ngango opened her home to the world because she believed everyone deserves a place that feels like somewhere they belong. What started as a passion for welcoming people became Genesis — a sanctuary of gardens, good food, and genuine care, just off Kampala Road in Mukono-Seeta.
        </motion.p>
      </div>
    </section>
  );
}