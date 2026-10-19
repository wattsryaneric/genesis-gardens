import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    quote: "So tranquil and secluded. The place feels like a real home — I recommend it to anyone who wants something genuinely special.",
    author: 'George',
  },
  {
    quote: "Absolutely lovely. Very clean. You can feel the love in how it's maintained.",
    author: 'Guest feedback',
  },
  {
    quote: "Another weekend of unforgettable experience. This place keeps drawing us back.",
    author: 'Benjamin',
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-10 lg:mb-12">
          <p className="font-body text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-3">
            What our guests say
          </p>
          <h2 id="testimonials-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            A peaceful escape.
            <br />
            <span className="italic font-light">A welcome that stays with you.</span>
          </h2>
          <p className="mt-5 font-body text-base text-muted-foreground leading-relaxed">
            The quiet, the care, the feeling of being at home. Here’s how guests describe their time at Genesis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <motion.figure
              key={review.author}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-7 lg:p-8"
            >
              <span aria-hidden="true" className="font-heading text-5xl leading-none text-accent">“</span>
              <blockquote className="flex-1">
                <p className="font-heading text-xl italic text-foreground leading-relaxed">{review.quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-border/50 pt-4 font-body text-sm text-muted-foreground">
                {review.author}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
