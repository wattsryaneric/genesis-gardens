import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Users, Tent, Droplets, Shield, Star, ArrowRight, SquareUser } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import CTABanner from '../components/shared/CTABanner';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const rooms = [
  {
    id: 1,
    name: 'The Garden Room',
    tagline: 'A quiet retreat for two.',
    description: 'Our most peaceful room — a private double overlooking the gardens. Natural light, clean linens, and the sound of birdsong in the morning. Perfect for couples or solo travelers who want to genuinely unwind.',
    image: '/images/WhatsApp-Image-2023-01-08-at-12.52.32.jpg',
    sleeps: '1–2 guests',
    beds: '1 Queen bed',
    amenities: ['En-suite bathroom', 'Garden view', 'Clean linens provided', 'Secure parking'],
  },
  {
    id: 2,
    name: 'The Twin Room',
    tagline: 'Two beds. Twice the comfort.',
    description: 'A bright and spacious room with two single beds — ideal for friends traveling together, colleagues on a work trip, or siblings who want their own space without being apart.',
    image: '/images/WhatsApp-Image-2023-01-08-at-12.52.33.jpg',
    sleeps: '2 guests',
    beds: '2 Single beds',
    amenities: ['Shared bathroom access', 'Garden-facing windows', 'Clean linens provided', 'Secure parking'],
  },
  {
    id: 3,
    name: 'The Family Room',
    tagline: 'Enough room for everyone.',
    description: 'Our largest room — designed for families or small groups. A double bed plus a single, warm natural decor, and space to spread out. Because a good rest is something everyone in the family deserves.',
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.06.jpg',
    sleeps: 'Up to 3 guests',
    beds: '1 Double + 1 Single',
    amenities: ['En-suite bathroom', 'Garden access', 'Clean linens provided', 'Secure parking'],
  },
];

const campingVenues = [
  {
    id: 1,
    name: 'Calabash Tree',
    description: 'Our most iconic venue — set beneath the shade of a beautiful old calabash tree. The branches create a natural canopy, perfect for smaller groups who want a cosy, sheltered spot with character.',
    image: '/images/WhatsApp-Image-2023-03-28-at-17.02.51.jpg',
    icon: '🌳',
  },
  {
    id: 2,
    name: 'Cana',
    description: 'A well-positioned open-air venue with easy access to facilities. Clean, spacious, and ideal for groups who want a straightforward, comfortable base from which to enjoy everything Genesis has to offer.',
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.17.jpg',
    icon: '🏕️',
  },
  {
    id: 3,
    name: 'Ikaze',
    description: 'Named for the breeze that rolls through this corner of the property. Ikaze is for those who want to feel truly connected to nature — open skies, green surroundings, and the kind of quiet that restores you.',
    image: '/images/WhatsApp-Image-2023-01-08-at-13.04.18.jpg',
    icon: '🌬️',
  },
];

const campingFacilities = [
  { icon: Droplets, label: 'Fully functional toilets & bathrooms' },
  { icon: Shield, label: 'Secure, fully fenced perimeter' },
  { icon: Tent, label: 'Tents available for hire' },
  { icon: Users, label: 'Sites suitable for all group sizes' },
];

const pricingTiers = [
  {
    label: 'Small groups',
    detail: 'Up to 9 people',
    price: '20,000',
    unit: 'UGX / person',
    color: 'bg-secondary border-border/50',
  },
  {
    label: 'Medium groups',
    detail: '10 – 99 people',
    price: '15,000',
    unit: 'UGX / person',
    color: 'bg-accent/10 border-accent/30',
    featured: true,
  },
  {
    label: 'Large groups',
    detail: '100+ people',
    price: '10,000',
    unit: 'UGX / person',
    color: 'bg-secondary border-border/50',
  },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function RoomCard({ room, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-500"
    >
      <div className="relative overflow-hidden h-60 sm:h-72">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-7 lg:p-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground mb-1">{room.name}</h3>
        <p className="font-heading text-base italic text-accent mb-4">{room.tagline}</p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{room.description}</p>

        {/* Quick info */}
        <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-border/40">
          <div className="flex items-center gap-1.5 font-body text-sm text-foreground/70">
            <Users className="w-4 h-4 text-accent" />
            {room.sleeps}
          </div>
          <div className="flex items-center gap-1.5 font-body text-sm text-foreground/70">
            <Bed className="w-4 h-4 text-accent" />
            {room.beds}
          </div>
        </div>

        {/* Amenities */}
        <ul className="space-y-2 mb-6">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {a}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-body text-sm text-accent font-medium hover:gap-3 transition-all duration-300"
        >
          Book this room <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

function CampingSiteCard({ site, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-500"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <span className="text-2xl">{site.icon}</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-heading text-xl font-semibold text-foreground mb-2">{site.name}</h4>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{site.description}</p>
      </div>
    </motion.div>
  );
}

function PricingCard({ tier, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border p-7 text-center ${tier.color} ${tier.featured ? 'ring-2 ring-accent/40 shadow-md' : ''}`}
    >
      {tier.featured && (
        <p className="font-body text-xs text-accent font-medium uppercase tracking-widest mb-3">Most popular</p>
      )}
      <p className="font-heading text-lg font-semibold text-foreground mb-1">{tier.label}</p>
      <p className="font-body text-sm text-muted-foreground mb-4">{tier.detail}</p>
      <p className="font-heading text-4xl font-semibold text-foreground">{tier.price}</p>
      <p className="font-body text-sm text-muted-foreground mt-1">{tier.unit}</p>
    </motion.div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Accommodation() {
  return (
    <>
      <PageHero
        headline="Sleep somewhere that feels like it was made for you."
        intro="Three thoughtfully kept rooms. Three named camping sites. One meeting space. All in a secure, green, and genuinely welcoming property just off Kampala Road."
      />

      {/* ── ROOMS ──────────────────────────────────────────── */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3"
          >
            Rooms
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-12"
          >
            Three rooms. Each one waiting for you.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPING ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3"
          >
            Camping
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4"
          >
            Camping venues — spend a night under the stars.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mb-12"
          >
            Choose your venue and pitch your camp. Tents are available to hire on-site, and you'll have access to fully functional toilets and bathrooms throughout your stay. The whole property sits within a secure fenced perimeter — so you can relax completely.
          </motion.p>

          {/* Camping venues */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {campingVenues.map((site, i) => (
              <CampingSiteCard key={site.id} site={site} index={i} />
            ))}
          </div>

          {/* Facilities strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {campingFacilities.map((f, i) => (
              <div key={f.label} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50">
                <f.icon className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-foreground leading-snug">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CAMPING PRICING ────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-semibold text-foreground text-center mb-4"
          >
            Camping rates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-base text-muted-foreground text-center mb-12 max-w-xl mx-auto"
          >
            Priced per person. The bigger your group, the better the rate — because sharing this place with more people is always a good thing.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pricingTiers.map((tier, i) => (
              <PricingCard key={tier.label} tier={tier} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-body text-sm text-muted-foreground text-center mt-8"
          >
            Tent hire available on request. Contact us to confirm availability and rates.
          </motion.p>
        </div>
      </section>

      {/* ── MEETING ROOM ───────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/images/WhatsApp-Image-2023-01-08-at-13.04.17.jpg"
                  alt="Meeting room at Genesis Gardens"
                  className="w-full h-72 sm:h-80 lg:h-[26rem] object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="font-body text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Meeting & conference
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight">
                A meeting room worth the drive.
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Away from the noise of the city, our meeting room is an ideal setting for workshops, team retreats, training sessions, AGMs, and conferences. Fresh air, green surroundings, and a space that genuinely helps people think clearly.
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card rounded-2xl p-5 border border-border/50 text-center">
                  <SquareUser className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="font-heading text-2xl font-semibold text-foreground">100</p>
                  <p className="font-body text-sm text-muted-foreground">Capacity (people)</p>
                </div>
                <div className="bg-card rounded-2xl p-5 border border-border/50 text-center">
                  <Star className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="font-heading text-2xl font-semibold text-foreground">700,000</p>
                  <p className="font-body text-sm text-muted-foreground">UGX per booking</p>
                </div>
              </div>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                Combine your meeting with on-site catering, accommodation for overnight delegates, and access to the full grounds — making Genesis a complete away-day destination.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-accent/90 transition-all duration-300"
              >
                Enquire about the meeting room
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Not sure which option suits you best?"
        description="Just reach out. We'll help you figure out the perfect setup for your group, budget, and dates — no pressure, just good conversation."
        variant="dark"
        bookLabel="Contact us"
        showWhatsApp
        showEmail={false}
      />
    </>
  );
}