// Complete the operator and contact details with the client before public launch.
// Content (event, categories, rankings, sponsors) now lives in src/content/*.json — edit via /admin.
import contactData from '../content/contact.json';

export const SITE = {
  name: 'ITE Tennis Excellence',
  url: 'https://[FILL IN - production domain]',
  operatorName: '[FILL IN - legal name of the entity operating this website]',
  operatorAddress: '[FILL IN - registered postal address]',
  contactEmail: contactData.email || '[FILL IN - confirmed contact email]',
  privacyEmail: contactData.email || '[FILL IN - confirmed privacy contact email]',
  governingCity: 'Hyderabad',
  lastUpdated: '11 November 2026',
  demoMode: true,
  legalDraft: true,
};