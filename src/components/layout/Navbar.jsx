import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/navigation.mjs';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMobileOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setMobileOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
      desktop.removeEventListener('change', onResize);
    };
  }, [mobileOpen]);

  const onNavigate = (event, path) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setMobileOpen(false);
    if (location.pathname === path && !location.search && !location.hash) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20 [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-primary">
        <Link to="/" onClick={event => onNavigate(event, '/')} className="flex items-center space-x-2">
          <img src="/images/logo_small.png" alt="Genesis Gardens Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={event => onNavigate(event, link.path)}
              className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-accent font-medium'
                  : 'text-primary/70 hover:text-primary'
              }`}
              aria-current={location.pathname === link.path ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={event => onNavigate(event, '/contact')}
            className="font-body text-sm px-5 py-2 rounded-full bg-accent/10 backdrop-blur-sm text-accent border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Ask about availability
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMobileOpen(open => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden p-2 text-primary rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto bg-background border-t border-border"
          >
            <nav aria-label="Mobile" className="px-6 py-6 flex flex-col gap-4 [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-primary">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={event => onNavigate(event, link.path)}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
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
                onClick={event => onNavigate(event, '/contact')}
                className="font-body text-sm text-center px-5 py-3 rounded-full bg-accent text-accent-foreground mt-2"
              >
                Ask about availability
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
