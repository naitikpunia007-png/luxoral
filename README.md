# LUXORA — Cinematic Real Estate Demo

A responsive React + TypeScript real-estate concept with:
- Interactive Three.js globe and clickable location markers
- GSAP scroll reveals and subtle motion
- Responsive property collection, FAQ, and enquiry form
- WhatsApp handoff for enquiries (no backend required)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build for deployment

```bash
npm run build
```

Vite output is generated in `dist/`. On Netlify, use:
- Build command: `npm run build`
- Publish directory: `dist`

## Customize before selling
1. Replace LUXORA branding and all concept copy with the client's approved brand details.
2. Replace sample property names, images, locations, prices and amenities with verified details.
3. Set a real business WhatsApp number. In `src/App.tsx`, update the `wa.me` links to `https://wa.me/91XXXXXXXXXX?text=...` (country code, no `+` or spaces).
4. Connect a secure backend/CRM if the client wants enquiries stored privately. This demo opens WhatsApp and does not store submissions on a server.
5. Replace remote Unsplash images with licensed/client-owned property images for production.
6. Confirm that project names, pricing, availability, and claims are accurate before launch.

## Notes
- The property data is illustrative. Do not present demo projects or prices as real listings.
- Three.js canvas performance depends on device/browser. Keep the globe simplified on mobile if needed.
- The globe markers are simplified 3D labels; this is a working starter, not a geographic GIS or a real-time property feed.
