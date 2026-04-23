import React from 'react';
import { motion } from 'framer-motion';
import SectionDivider from './SectionDivider';

export default function PageHero({ headline, intro }) {
  return (
    <section className="pt-32 lg:pt-40 pb-16 lg:pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <SectionDivider />
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight"
        >
          {headline}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 font-body text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}