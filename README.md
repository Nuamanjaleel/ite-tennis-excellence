# ITE — Tennis Excellence

A responsive React + Vite website for ITE Tennis Excellence and the inaugural Tennis Excellence Championship in Hyderabad.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Project notes

- Brand palette is sampled from the supplied ITE logo: navy `#002156`, lime `#E7E409`, orange `#FD6202`.
- Championship details and participant lists are maintained in `src/App.jsx` in the `categories` array.
- The countdown targets 21 November 2026. No start time is assumed.
- Rankings are illustrative preview data and are visibly labelled as such. Replace `sampleRankings` with verified ITE data before treating them as official.
- The results section intentionally shows an inaugural-edition empty state. Add winners after the event; do not publish invented winners.
- Complete operator and contact placeholders in `src/data/siteConfig.js` and have the legal pages reviewed before launch.
- Confirm that ITE has permission to use the supplied hero photograph at `public/juan.jpg`.
