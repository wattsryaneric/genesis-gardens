import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Stay with us',
    description: "Whether you're pitching a tent under the stars or settling in for a few nights, you'll sleep somewhere that feels cared for — because it is.",
    image: '/images/WhatsApp-Image-2023-01-08-at-12.52.33.jpg',
    alt: 'Cozy glamping accommodation at Genesis Gardens',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Celebrate here',
    description: "Weddings, parties, graduations, corporate gatherings. Our gardens become yours. We handle the details with the same love we'd give our own.",
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.06.jpg',
    alt: 'Elegant outdoor event at Genesis Gardens',
    span: 'md:col-span-2',
  },
  {
    title: 'Come for the day',
    description: "You don't need to stay overnight to feel the difference. Come for a picnic, a family afternoon, or a quiet moment away from the city.",
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.17.jpg',
    alt: 'Peaceful picnic setting in the gardens',
    span: '',
  },
  {
    title: 'Eat well',
    description: "From full buffets and sit-down meals to open-fire BBQ evenings — food at Genesis is cooked with care and served with warmth.",
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.18.jpg',
    alt: 'Vibrant East African buffet at Genesis',
    span: '',
  },
];

export default function ServiceSnapshot() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl lg:text-4xl font-semibold text-foreground text-center mb-4"
        >
          However you want to spend your time here,
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-2xl lg:text-3xl font-light italic text-accent text-center mb-14"
        >
          we'll make it feel like home.
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${service.span}`}
            >
              <Link to="/services" className="block h-full">
                <div className={`relative ${i === 0 ? 'h-80 md:h-full min-h-[24rem]' : 'h-64 md:h-72'} overflow-hidden`}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-accent/80 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed max-w-md">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 font-body text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Discover the feeling <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}