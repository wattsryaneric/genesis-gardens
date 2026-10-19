import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { categories, categoryFromHash } from '@/lib/gallery.mjs';
import PageHero from '../components/shared/PageHero';
import CTABanner from '../components/shared/CTABanner';

const photos = [
  {
    src: '/images/WhatsApp-Image-2023-01-08-at-12.52.32.jpg',
    caption: 'The gardens at golden hour',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp-Image-2023-01-08-at-12.52.33.jpg',
    caption: 'Accommodation — cosy and cared for',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp-Image-2023-01-08-at-13.04.06.jpg',
    caption: 'Elegant outdoor events',
    category: 'Events',
  },
  {
    src: '/images/WhatsApp-Image-2023-01-08-at-13.04.17.jpg',
    caption: 'A peaceful afternoon in the gardens',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp-Image-2023-01-08-at-13.04.18.jpg',
    caption: 'East African flavours, served with warmth',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp-Image-2023-03-28-at-17.02.51.jpg',
    caption: 'The Garden Room',
    category: 'Accommodation',
  },
  {
    src: '/images/logo.jpg',
    caption: 'Genesis Gardens logo',
    category: 'Gardens',
  },
  {
    src: '/images/logo_small.png',
    caption: 'Our brand mark',
    category: 'Gardens',
  },
  {
    src: '/images/owner.jpeg',
    caption: 'Meet the owner',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.50 (1).jpeg',
    caption: 'Spring blooms in full glory',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.50.jpeg',
    caption: 'Terrace dining setup',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (1).jpeg',
    caption: 'Garden pathway at dawn',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (2).jpeg',
    caption: 'Cozy cabin interior',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (3).jpeg',
    caption: 'Campfire under the stars',
    category: 'Camping',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (4).jpeg',
    caption: 'Lawn ceremony setup',
    category: 'Events',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (5).jpeg',
    caption: 'Fresh harvest from our kitchen garden',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51 (6).jpeg',
    caption: 'Poolside relaxation',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.51.jpeg',
    caption: 'Welcome lounge area',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (1).jpeg',
    caption: 'Rose garden archway',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (2).jpeg',
    caption: 'Deluxe suite bedroom',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (3).jpeg',
    caption: 'Outdoor banquet setup',
    category: 'Events',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (4).jpeg',
    caption: 'BBQ grilling station',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (5).jpeg',
    caption: 'Tent camping at the grounds',
    category: 'Camping',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (6).jpeg',
    caption: 'Veranda with garden view',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (7).jpeg',
    caption: 'Plated dinner service',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (8).jpeg',
    caption: 'Wildflower meadow',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (9).jpeg',
    caption: 'Glamping tents',
    category: 'Camping',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (10).jpeg',
    caption: 'Cocktail hour by the pool',
    category: 'Events',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (11).jpeg',
    caption: 'Kitchen prep area',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53 (12).jpeg',
    caption: 'Ornamental water feature',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.32.53.jpeg',
    caption: 'Main building exterior',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (1).jpeg',
    caption: 'Garden trellis walkway',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (2).jpeg',
    caption: 'Master suite balcony',
    category: 'Accommodation',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (3).jpeg',
    caption: 'Wedding ceremony arch',
    category: 'Events',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (4).jpeg',
    caption: 'Farm-to-table ingredients',
    category: 'Catering',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (5).jpeg',
    caption: 'Rustic camping site',
    category: 'Camping',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29 (6).jpeg',
    caption: 'Sunset garden view',
    category: 'Gardens',
  },
  {
    src: '/images/WhatsApp Image 2026-04-25 at 15.49.29.jpeg',
    caption: 'Reception hall interior',
    category: 'Events',
  },
];

export default function Gallery() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(() => categoryFromHash(location.hash));
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openerRef = useRef(null);

  useEffect(() => {
    setActiveCategory(categoryFromHash(location.hash));
    setLightboxIndex(null);
  }, [location.hash]);

  useEffect(() => {
    const onHashChange = () => {
      setActiveCategory(categoryFromHash(window.location.hash));
      setLightboxIndex(null);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const openLightbox = (index, opener) => {
    openerRef.current = opener;
    setLightboxIndex(index);
  };

  const prev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  };

  return (
    <>
      <PageHero
        headline="A glimpse of what's waiting for you."
        intro="Words can only say so much. Here's a look at the spaces, gardens, and moments that make Genesis what it is."
      />

      {/* Filter tabs */}
      <section className="pb-10" id="gallery-filters">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                  navigate({ pathname: location.pathname, search: location.search, hash: cat === 'All' ? '' : `#${cat.toLowerCase()}` });
                }}
                aria-pressed={activeCategory === cat}
                id={cat === 'Catering' ? 'catering' : undefined}
                className={`px-5 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-secondary text-muted-foreground hover:bg-border/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.button
                  type="button"
                  key={photo.src + photo.caption}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onClick={(e) => openLightbox(i, e.currentTarget)}
                  aria-label={`Open image: ${photo.caption}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-400 rounded-2xl flex items-end">
                    <p className="font-body text-sm text-white px-5 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption}
                    </p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Dialog open={lightboxIndex !== null} onOpenChange={open => { if (!open) setLightboxIndex(null); }}>
        <DialogContent
          className="max-w-[calc(100%-2rem)] sm:max-w-5xl max-h-[92dvh] overflow-y-auto border-white/20 bg-black p-4 pt-12 text-white [&>button]:text-white [&>button]:focus:ring-white"
          onKeyDown={handleKeyDown}
          onCloseAutoFocus={event => {
            event.preventDefault();
            openerRef.current?.focus();
          }}
        >
          <DialogTitle className="sr-only">Genesis Gardens image viewer</DialogTitle>
          <DialogDescription className="sr-only">Use the previous and next buttons or arrow keys to browse photos. Press Escape to close.</DialogDescription>
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <>
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].caption}
                className="mx-auto max-h-[65dvh] max-w-full object-contain rounded-lg"
              />
              <div className="flex items-center justify-between gap-3">
                <button type="button" onClick={prev} aria-label="Previous image"
                  className="shrink-0 rounded-full p-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="text-center font-body text-sm" aria-live="polite" aria-atomic="true">
                  <p>{filtered[lightboxIndex].caption}</p>
                  <p className="mt-1 text-white/60">{lightboxIndex + 1} of {filtered.length}</p>
                </div>
                <button type="button" onClick={next} aria-label="Next image"
                  className="shrink-0 rounded-full p-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CTABanner
        heading="Seen enough to know you want to visit?"
        description="Reach out and we'll make it happen — whether it's a weekend escape, an event, or just a day out."
        variant="dark"
        bookLabel="Book a visit"
        showWhatsApp
        showEmail={false}
      />
    </>
  );
}
