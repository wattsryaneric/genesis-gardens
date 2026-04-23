import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sublabel: 'Fastest',
    description: "Drop us a message any time. We're responsive and happy to chat.",
    value: 'Chat on WhatsApp',
    href: 'https://wa.me/',
  },
  {
    icon: Phone,
    label: 'Phone',
    sublabel: 'Real voice',
    description: 'Prefer a real voice? Give us a call.',
    value: 'Call us',
    href: 'tel:',
  },
  {
    icon: Mail,
    label: 'Email',
    sublabel: 'Proposals & quotes',
    description: 'For event proposals, detailed enquiries, or catering quotes.',
    value: 'Send an email',
    href: 'mailto:',
  },
  {
    icon: MapPin,
    label: 'Find us',
    sublabel: 'Mukono-Seeta',
    description: 'Off Kampala Road, 2km from the Kampala-Katosi Road junction. Ample parking on site.',
    value: 'Get directions',
    href: 'https://maps.google.com',
  },
];

export default function ContactChannels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {channels.map((ch, i) => (
        <motion.a
          key={ch.label}
          href={ch.href}
          target={ch.href.startsWith('http') ? '_blank' : undefined}
          rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <ch.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading text-lg font-semibold text-foreground">{ch.label}</h3>
                <span className="font-body text-xs text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {ch.sublabel}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {ch.description}
              </p>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}