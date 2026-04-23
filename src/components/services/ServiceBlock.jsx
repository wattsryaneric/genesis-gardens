import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceBlock({
  title,
  description,
  details,
  perfectFor,
  ctaText,
  image,
  imageAlt,
  reverse = false,
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className={`max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        reverse ? 'lg:direction-rtl' : ''
      }`}>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`${reverse ? 'lg:order-2' : ''}`}
        >
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-72 sm:h-80 lg:h-[28rem] object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`${reverse ? 'lg:order-1' : ''}`}
        >
          <h3 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-6 leading-tight">
            {title}
          </h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>
          {details && (
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              {details}
            </p>
          )}
          {perfectFor && (
            <p className="font-body text-sm text-accent font-medium mb-8">
              {perfectFor}
            </p>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-body text-sm text-accent font-medium hover:gap-3 transition-all duration-300"
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}