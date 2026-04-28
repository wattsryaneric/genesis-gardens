import React from 'react';
import PageHero from '../components/shared/PageHero.jsx';
import ServiceBlock from '../components/services/ServiceBlock.jsx';
import CTABanner from '../components/shared/CTABanner.jsx';

export default function Services() {
  return (
    <>
      <PageHero
        headline="We don't just offer services. We offer a feeling."
        intro="Every offering at Genesis comes from the same place — a genuine love of hosting people well. Whatever brings you here, you'll find a space that's been prepared for you with care, a team that's happy you came, and an experience that stays with you long after you've left."
      />

      <ServiceBlock
        title="Accommodation: Sleep somewhere that feels like it was made for you."
        description="Our grounds are spacious, green, and kept with care — whether you're pitching a tent for a weekend under the trees or staying in one of our rooms. We think of accommodation the way a good host does: everything should be clean, welcoming, and ready before you arrive."
        details="Secure parking, well-maintained facilities, and gardens that make it easy to just… exhale."
        perfectFor="Perfect for: weekend getaways, romantic stays, family trips, group escapes."
        ctaText="Book your stay — we'll be ready for you"
        image="/images/WhatsApp-Image-2023-01-08-at-12.52.33.jpg"
        imageAlt="Cozy accommodation at Genesis Gardens"
      />

      <div className="border-t border-border/30" />

      <ServiceBlock
        title="Venue: Your most important moments deserve someone who cares as much as you do."
        description="Weddings. Introductions. Birthdays. Graduations. Corporate retreats. Private dinners. Whatever the occasion, we treat it with the attention it deserves — not because it's a transaction, but because helping people celebrate well is something we genuinely love to do."
        details="Our gardens provide a natural, beautiful backdrop that does the heavy lifting. You bring the people. We'll take care of the rest. We can assist with: layout and setup, catering coordination, event flow, and on-the-day support."
        ctaText="Tell us about your event — let's plan it together"
        image="/images/WhatsApp-Image-2023-01-08-at-13.04.06.jpg"
        imageAlt="Elegant outdoor celebration at Genesis"
        reverse
      />

      <div className="border-t border-border/30" />

      <ServiceBlock
        title="Day Visits: A few hours away from everything is more powerful than you think."
        description="You don't need a whole weekend to feel the difference Genesis makes. Come for an afternoon. Bring your family, your friends, or just yourself. Lay out a blanket in the gardens, let the children run free, and remember what it feels like to be somewhere that isn't rushing you."
        details="Just 2km off Kampala Road — close enough to get to easily, far enough to actually unwind."
        ctaText="Plan your day visit"
        image="/images/WhatsApp-Image-2023-01-08-at-13.04.17.jpg"
        imageAlt="Peaceful day visit in the gardens"
      />

      <div className="border-t border-border/30" />

      <ServiceBlock
        title="Catering: Food made with the same love we put into everything else."
        description="A good meal is at the heart of any great gathering. Our in-house catering team prepares everything from full buffets and elegant sit-down meals to warm, smoky BBQ evenings — always with fresh ingredients and genuine effort."
        details="We also do romantic candlelit dinners for couples who want something a little more intimate. Because the right meal in the right setting is its own kind of magic. Available for events, group bookings, day visits, and private dining."
        ctaText="Ask us about catering for your visit"
        image="/images/WhatsApp-Image-2023-01-08-at-13.04.18.jpg"
        imageAlt="Vibrant catering spread at Genesis"
        reverse
      />

      <CTABanner
        heading="Not sure which service fits your plans? Just talk to us."
        description="We love helping people figure out what they need. No pressure, no sales pitch — just an honest conversation about what would make your visit perfect."
        showBookNow={false}
        showWhatsApp
        showEmail
        variant="dark"
      />
    </>
  );
}