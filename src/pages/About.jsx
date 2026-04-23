import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Leaf } from 'lucide-react';
import PageHero from '../components/shared/PageHero.jsx';
import ValueCard from '../components/about/ValueCard.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';

const values = [
  {
    icon: Heart,
    title: 'Hospitality from the heart',
    description: "We don't host people because it's a job. We do it because it brings us joy. That difference shows in everything — how the grounds are kept, how your calls are answered, how your event is handled.",
  },
  {
    icon: Home,
    title: 'A home away from home',
    description: "Whether you're here for a day or a weekend, alone or with a hundred guests, we want you to feel comfortable, looked after, and free to be yourself. That is the standard we hold ourselves to.",
  },
  {
    icon: Leaf,
    title: 'Rooted in nature',
    description: "Our gardens are not just a backdrop — they are the soul of this place. We care for them the way you care for something you love, and we invite you to enjoy them the same way.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        headline="This place was built with love. That hasn't changed."
        intro="Discover the story behind Genesis Gardens and Campsite — a place built on the simple, powerful idea that genuine hospitality can change the way people feel."
      />

      {/* Origin story */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://media.base44.com/images/public/69e8e722d554d6ea43e92eb8/be774f2c2_generated_ee5b54f4.png"
                alt="Welcoming entrance to Genesis Gardens"
                className="w-full h-72 sm:h-80 lg:h-[32rem] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              Genesis Gardens and Campsite began the way the best things do — not with a business plan, but with a person who simply loved welcoming others.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              Vanessa Ngango has always had a gift for hospitality. The kind that makes people feel seen, comfortable, and at home the moment they walk through the door. So she did what felt natural: she opened her home, transformed her gardens, and created a space where anyone who came would feel like they truly belonged.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              What started as one woman's passion has grown into Mukono-Seeta's most beloved outdoor destination — but the spirit behind it has never changed. Every event we host, every meal we serve, every guest we welcome is a reflection of that original intention: to make people feel genuinely, warmly, at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-semibold text-foreground text-center mb-4"
          >
            We are in the business of
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-2xl lg:text-3xl font-light italic text-accent text-center mb-14"
          >
            making people feel good.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="We'd love to welcome you."
        description="Come see the gardens. Meet the team. Feel the difference that genuine hospitality makes. We think you'll want to come back."
        bookLabel="Book a site visit"
        showWhatsApp={false}
        showEmail={false}
      />
    </>
  );
}