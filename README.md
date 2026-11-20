# jordan.hancock — portfolio

My personal portfolio site: an aurora intro screen, the Agentz case study, my contract work at Seaboard Marine, and the side projects I'm building.

## Stack

- React 18 + TypeScript
- Vite 5
- React Router 6
- Plain CSS with custom properties (no UI library)

## Run it locally

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`.

## Editing content

Almost all copy lives in [`src/content.ts`](src/content.ts): contact links, projects, experience and the Agentz case study.

## Deploying

`vercel.json` rewrites every route to `index.html`, so client-side routes like `/work/agentz` work on Vercel.
