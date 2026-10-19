import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { categoryFromHash } from '@/lib/gallery.mjs';
import { navigationBehavior } from '@/lib/navigation.mjs';

export default function NavigationEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousRef = useRef(null);
  const positionsRef = useRef(new Map());

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = original; };
  }, []);

  useLayoutEffect(() => {
    const behavior = navigationBehavior(previousRef.current, location, navigationType, positionsRef.current.get(location.key));
    previousRef.current = location;
    if (behavior.focus) {
      const target = document.querySelector('#main-content h1') || document.getElementById('main-content');
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
    }

    let frame;
    if (behavior.scroll === 'restore') {
      window.scrollTo({ ...behavior.position, behavior: 'instant' });
    } else if (behavior.scroll === 'top') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else if (behavior.scroll === 'anchor') {
      // Run after the destination and gallery category have rendered.
      frame = window.requestAnimationFrame(() => {
        let id;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
        const isGalleryCategory = location.pathname === '/gallery' && categoryFromHash(location.hash) !== 'All';
        const target = document.getElementById(isGalleryCategory ? 'gallery-filters' : id);
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    }

    const savePosition = () => positionsRef.current.set(location.key, { top: window.scrollY, left: window.scrollX });
    savePosition();
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', savePosition);
    };
  }, [location, navigationType]);

  return null;
}
