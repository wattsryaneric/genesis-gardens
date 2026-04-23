import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    quote: "So tranquil and secluded. The place feels like a real home — I recommend it to anyone who wants something genuinely special.",
    author: "George",
  },
  {
    quote: "Absolutely lovely. Very clean. You can feel the love in how it's maintained.",
    author: "Verified guest",
  },
  {
    quote: "Another weekend of unforgettable experience. This place keeps drawing us back.",
    author: "Benjamin",
  },
];

// Duplicate for seamless loop
const allReviews = [...reviews, ...reviews];

function ReviewCard({ quote, author }) {
  return (
    <div className="flex-shrink-0 w-80 sm:w-96 bg-card rounded-2xl p-8 border border-border/50 shadow-sm">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-highlight text-highlight" />
        ))}
      </div>
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
          Don't take our word for it.
        </motion.h2>
      </div>

      {/* Horizontal scroll marquee */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee">
          {allReviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}