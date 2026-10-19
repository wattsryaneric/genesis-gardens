import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../shared/WhatsAppButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-lg bg-primary px-5 py-3 font-body text-sm text-primary-foreground focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ behavior: 'instant', block: 'start' });
        }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
