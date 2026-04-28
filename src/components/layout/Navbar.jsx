import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Accommodation', path: '/accommodation' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo_small.png" alt="Genesis Gardens Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-accent font-medium'
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="font-body text-sm px-5 py-2 rounded-full bg-accent/10 backdrop-blur-sm text-accent border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Book a visit
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-primary"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-body text-base py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-accent font-medium'
                      : 'text-primary/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="font-body text-sm text-center px-5 py-3 rounded-full bg-accent text-accent-foreground mt-2"
              >
                Book a visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}