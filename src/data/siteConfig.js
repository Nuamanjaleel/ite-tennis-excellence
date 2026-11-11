// Complete the operator and contact details with the client before public launch.
export const SITE = {
  name: 'ITE Tennis Excellence',
  url: 'https://[FILL IN - production domain]',
  operatorName: '[FILL IN - legal name of the entity operating this website]',
  operatorAddress: '[FILL IN - registered postal address]',
  contactEmail: '[FILL IN - confirmed contact email]',
  privacyEmail: '[FILL IN - confirmed privacy contact email]',
  governingCity: 'Hyderabad',
  lastUpdated: '11 November 2026',
  demoMode: true,
  legalDraft: true,
};

// Event facts (from the official rule book)
export const EVENT = {
  start: '2026-11-21T00:00:00+05:30',
  venue: 'ProDynamiQ, Khanapur',
  knockoutsAt: '9:00 AM',
  ruleBook: '/ITE-Tennis-Excellence-Rule-Book.pdf',
};

// The 3 main sponsors shown on the sponsor page
export const SPONSORS = [
  { role: 'Title Sponsor', name: 'Redbull', image: '/redbull.png', cls: 'pin-a' },
  { role: 'Hydration', name: 'Gatorade', image: '/gatorade.png', cls: 'pin-b' },
  { role: 'Equipment', name: 'Wilson', image: '/wilson.png', cls: 'pin-c' },
];
