# Ashok Medical & General Stores

Website for the pharmacy, built with React + TypeScript + Tailwind CSS. Customers reach the shop
by **Call** or **WhatsApp**.

```
Ashok Medical/
├── index.html
├── package.json, vite.config.ts, tsconfig.json
├── public/                  logo, icons, images/ (CC0 photos, see images/CREDITS.md),
│                            _redirects + .htaccess (hosting rewrites)
└── src/
    ├── main.tsx, App.tsx    entry + pages
    ├── components/
    │   ├── layout/          Header, MobileMenu, Footer, Layout
    │   ├── home/            Hero, TrustBar, Services ("Why buy from us"), QuickActions, VisitStore
    │   └── common/          Logo, SectionHeader, States
    ├── pages/               Home, Info (About/Contact/FAQ/Terms/Privacy), NotFound
    ├── data/                site.ts (phone, WhatsApp, timings, address), info.ts (page text)
    └── styles/index.css     Tailwind + colours
```

## Run the website

Requires Node.js 20+. From the `Ashok Medical` folder:

```bash
npm run setup     # first time: installs everything and builds the website
npm start         # serves the built site at http://localhost:5000
```

Or double-click `start-website.bat`. After changing anything in `src/` or `public/`, run `npm run build`
and restart.

`npm run dev` starts a live-reload version at http://localhost:5173 while editing.

## Hosting

The website is plain static files after `npm run build` (the `dist` folder), so it can
be hosted on any static host — just upload the contents of `dist`. Page addresses like
`/info/about` must fall back to `index.html`: `_redirects` (Netlify / Cloudflare Pages) and
`.htaccess` (Apache / cPanel) are already included for this. Other hosts need an equivalent rewrite.

## Things to customise before going live

| What | Where |
|---|---|
| Phone, WhatsApp, timings, email, address, social links | `src/data/site.ts` |
| About / Contact / FAQ / Terms / Privacy text (placeholder — get it reviewed) | `src/data/info.ts` |
| Photos | `public/images/` (stock CC0 photos — replace with real shop photos) |
| Colours | `src/styles/index.css` (`@theme` block) |
