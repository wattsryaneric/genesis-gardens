import test from 'node:test';
import assert from 'node:assert/strict';
import { createEnquiryMessage, enquiryWhatsAppUrl, localDateValue, validateEnquiry } from '../src/lib/enquiry.mjs';
import { categoryFromHash } from '../src/lib/gallery.mjs';

const today = '2026-10-18';
const valid = {
  name: 'Test Guest', phone: '+256 777 979 994', purpose: 'Accommodation',
  arrival: '2026-10-20', departure: '2026-10-22', guest_count: '2', notes: 'Interested in: The Twin Room',
};

test('gallery links resolve lowercase, mixed case, missing and malformed categories', () => {
  for (const hash of ['#catering', '#Catering', '#CATERING', '#%63atering']) assert.equal(categoryFromHash(hash), 'Catering');
  assert.equal(categoryFromHash('#camping'), 'Camping');
  for (const hash of ['', '#unknown', '#%E0%A4%A']) assert.equal(categoryFromHash(hash), 'All');
});

test('valid stays and enquiries without optional details are accepted', () => {
  assert.deepEqual(validateEnquiry(valid, today), {});
  assert.deepEqual(validateEnquiry({ ...valid, arrival: '', departure: '', guest_count: '' }, today), {});
  assert.deepEqual(validateEnquiry({ ...valid, phone: '0777 979 994' }, today), {});
  assert.equal(localDateValue(new Date(2026, 9, 18, 23, 59)), today);
});

test('blank names, unknown purposes and invalid phone numbers are rejected', () => {
  assert.ok(validateEnquiry({ ...valid, name: '   ' }, today).name);
  assert.ok(validateEnquiry({ ...valid, purpose: 'unknown' }, today).purpose);
  for (const phone of ['hello', '123', '+256letters777979994', '000000000', '++256777979994']) {
    assert.ok(validateEnquiry({ ...valid, phone }, today).phone, phone);
  }
});

test('past or impossible dates and departure before or on arrival are rejected', () => {
  assert.ok(validateEnquiry({ ...valid, arrival: '2026-10-17' }, today).arrival);
  assert.ok(validateEnquiry({ ...valid, arrival: '2027-02-30' }, today).arrival);
  assert.ok(validateEnquiry({ ...valid, departure: '2026-10-20' }, today).departure);
  assert.ok(validateEnquiry({ ...valid, departure: '2026-10-19' }, today).departure);
  assert.ok(validateEnquiry({ ...valid, arrival: '' }, today).arrival);
});

test('guests must be a positive whole number', () => {
  for (const guest_count of ['0', '-1', '2.5', 'hello', '1e3', '99999999999999999']) {
    assert.ok(validateEnquiry({ ...valid, guest_count }, today).guest_count, guest_count);
  }
});

test('WhatsApp handoff preserves the chosen room, dates, guests and special characters', () => {
  const message = createEnquiryMessage({ ...valid, notes: 'Twin Room & meals?\nDiet: no nuts + tea' });
  const url = new URL(enquiryWhatsAppUrl(message));
  assert.equal(url.pathname, '/256777979994');
  assert.equal(url.searchParams.get('text'), message);
  assert.match(message, /Arrival: 2026-10-20/);
  assert.match(message, /Departure: 2026-10-22/);
  assert.match(message, /Guests: 2/);
  assert.match(message, /Twin Room & meals\?/);
  const dayVisit = createEnquiryMessage({ ...valid, purpose: 'Day Visit', departure: '' });
  assert.match(dayVisit, /Visit date: 2026-10-20/);
  assert.doesNotMatch(dayVisit, /Departure/);
});
