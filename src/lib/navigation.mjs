export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Stay & Camp', path: '/accommodation' },
  { label: 'Events & Dining', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Keep in-page filters in place, but give each newly opened page a clear start.
export function navigationBehavior(previous, current, type, savedPosition) {
  const pageChanged = Boolean(previous) && (previous.pathname !== current.pathname || previous.search !== current.search);
  if (type === 'POP' && savedPosition) return { scroll: 'restore', position: savedPosition, focus: pageChanged };
  if (!previous) return { scroll: current.hash ? 'anchor' : 'keep', focus: false };
  if (pageChanged) return { scroll: current.hash ? 'anchor' : 'top', focus: true };
  if (previous.hash !== current.hash && current.hash && current.pathname !== '/gallery') return { scroll: 'anchor', focus: false };
  return { scroll: 'keep', focus: false };
}
