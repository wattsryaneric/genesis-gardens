import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/256777979994"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}