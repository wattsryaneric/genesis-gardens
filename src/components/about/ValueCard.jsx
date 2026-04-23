import React from 'react';
import { motion } from 'framer-motion';

export default function ValueCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-card rounded-2xl p-8 lg:p-10 border border-border/50"
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <h3 className="font-heading text-xl lg:text-2xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}