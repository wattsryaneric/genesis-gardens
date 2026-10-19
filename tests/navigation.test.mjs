import test from 'node:test';
import assert from 'node:assert/strict';
import { navigationBehavior } from '../src/lib/navigation.mjs';

const home = { pathname: '/', search: '', hash: '', key: 'home' };
const stay = { pathname: '/accommodation', search: '', hash: '', key: 'stay' };
const gallery = { pathname: '/gallery', search: '', hash: '', key: 'gallery' };

test('opening a different page resets scroll and moves focus into its content', () => {
  assert.deepEqual(navigationBehavior(home, stay, 'PUSH'), { scroll: 'top', focus: true });
  assert.deepEqual(navigationBehavior(stay, home, 'PUSH'), { scroll: 'top', focus: true });
});

test('a direct initial load does not steal keyboard focus', () => {
  assert.deepEqual(navigationBehavior(null, home, 'POP'), { scroll: 'keep', focus: false });
});

test('opening a gallery shortcut reaches its filters without resetting in-page filter clicks', () => {
  const catering = { ...gallery, hash: '#catering' };
  assert.deepEqual(navigationBehavior(home, catering, 'PUSH'), { scroll: 'anchor', focus: true });
  assert.deepEqual(navigationBehavior(null, catering, 'POP'), { scroll: 'anchor', focus: false });
  assert.deepEqual(navigationBehavior(gallery, catering, 'PUSH'), { scroll: 'keep', focus: false });
  assert.deepEqual(navigationBehavior(catering, gallery, 'PUSH'), { scroll: 'keep', focus: false });
});

test('Back and Forward restore saved positions rather than jumping to the top', () => {
  const position = { top: 1800, left: 0 };
  assert.deepEqual(navigationBehavior(stay, home, 'POP', position), { scroll: 'restore', position, focus: true });
  assert.deepEqual(navigationBehavior(gallery, { ...gallery, hash: '#events' }, 'POP', position), { scroll: 'restore', position, focus: false });
  assert.deepEqual(navigationBehavior(stay, home, 'POP'), { scroll: 'top', focus: true });
});

test('room-specific enquiry navigation starts at the contact page content', () => {
  const contact = { pathname: '/contact', search: '', hash: '', key: 'contact' };
  const roomEnquiry = { ...contact, search: '?enquiry=Twin%20Room&purpose=Accommodation' };
  assert.deepEqual(navigationBehavior(contact, roomEnquiry, 'PUSH'), { scroll: 'top', focus: true });
});

test('ordinary same-page anchors remain usable', () => {
  assert.deepEqual(navigationBehavior(stay, { ...stay, hash: '#camping' }, 'PUSH'), { scroll: 'anchor', focus: false });
});
