import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';

interface CTABannerProps {
  heading: string;
  description?: string;
  showBookNow?: boolean;
  showWhatsApp?: boolean;
  showEmail?: boolean;
  bookLabel?: string;
  variant?: "default" | "dark";
}

export default function CTABanner({
  heading,
  description,
  showBookNow = true,
  showWhatsApp = true,
  showEmail = true,
  bookLabel = "Book now",
  variant = "default"
}: CTABannerProps) {
  const bgClass = variant === "dark"
    ? "bg-primary text-primary-foreground"
    : "bg-secondary";

  const btnClass = variant === "dark"
    ? "bg-accent text-accent-foreground hover:bg-accent/90"
    : "bg-accent text-accent-foreground hover:bg-accent/90";

  const outlineClass = variant === "dark"
    ? "border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
    : "border-accent/30 text-accent hover:bg-accent/5";

   return (
     <section className={`${bgClass}`}>
       <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="font-heading text-3xl lg:text-4xl font-semibold mb-4"
         >
           {heading}
         </motion.h2>
         {description && (
           <motion.p
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className={`font-body text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 ${
               variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground"
             }`}
           >
             {description}
           </motion.p>
         )}
         <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4"
         >
           {showBookNow && (
             <Link
               to="/contact"
               className={`inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-body text-sm font-medium transition-all duration-300 ${btnClass}`}
             >
               {bookLabel}
               <ArrowRight className="w-4 h-4" />
             </Link>
           )}
           {showWhatsApp && (
             <a
               href="https://wa.me/256777979994"
               target="_blank"
               rel="noopener noreferrer"
               className={`inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-body text-sm border transition-all duration-300 ${outlineClass}`}
             >
               <MessageCircle className="w-4 h-4" />
               WhatsApp us
             </a>
           )}
           {showEmail && (
            <a
              href="mailto:reservations@genesiscampsite.ug"
               className={`inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-body text-sm border transition-all duration-300 ${outlineClass}`}
             >
               <Mail className="w-4 h-4" />
               Send an email
            </a>
           )}
        </motion.div>
      </div>
    </section>
  );
}
