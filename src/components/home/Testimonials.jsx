import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    quote: "So tranquil and secluded. The place feels like a real home — I recommend it to anyone who wants something genuinely special.",
    author: "George",
  },
  {
    quote: "Absolutely lovely. Very clean. You can feel the love in how it's maintained.",
    author: "Guest feedback",
  },
  {
    quote: "Another weekend of unforgettable experience. This place keeps drawing us back.",
    author: "Benjamin",
  },
];

function ReviewCard({ quote, author }) {
  return (
    <div className="h-full rounded-2xl border border-border/50 bg-card p-7 lg:p-8">
      <p className="font-heading text-lg italic text-foreground leading-relaxed mb-6">
        "{quote}"
      </p>
      <p className="font-body text-sm text-muted-foreground">
        — {author}
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3"
        >
          What our guests say
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl lg:text-4xl font-semibold text-foreground"
        >
          Thoughtful words from our guests.
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={`${review.author}-${review.quote}`} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
