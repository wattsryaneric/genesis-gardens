import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { navLinks } from '@/lib/navigation.mjs';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-semibold mb-4">Genesis Gardens</h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              A sanctuary of gardens, good food, and genuine care — just off Kampala Road in Mukono-Seeta, Uganda.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Explore</h4>
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Reach Us</h4>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/256777979994" className="flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                0777979994
              </a>
              <a href="tel:+256781200048" className="flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                0781200048
              </a>
              <a href="mailto:reservations@genesiscampsite.ug" className="flex items-center gap-2 font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                reservations@genesiscampsite.ug
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading text-lg font-medium mb-4">Find Us</h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary-foreground/60" />
              <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                Off Kampala Road, 2km from the Kampala-Katosi Road junction, Mukono-Seeta, Uganda.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Genesis Gardens and Campsite. Made with love in Mukono-Seeta.
          </p>
          <p className="font-body text-xs text-primary-foreground/40">
            Come as a guest. Leave feeling like family.
          </p>
        </div>
      </div>
    </footer>
  );
}
