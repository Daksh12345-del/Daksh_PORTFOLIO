# Arjun Mehta — Portfolio

A premium, animated personal portfolio built with **React 18**, **Tailwind CSS**, **Framer Motion**, and **Vite**.

## Stack
- React + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion (scroll reveals, page-load sequence, hover micro-interactions)
- Vanilla `<canvas>` for the hero particle network and the Skills network graph

## Getting started

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  components/
    Navbar.jsx        sticky glass nav, theme toggle, mobile menu
    Hero.jsx           hero + particle-network canvas background
    About.jsx
    Skills.jsx          interactive canvas skill network graph + chip lists
    Projects.jsx
    Experience.jsx      vertical timeline
    Services.jsx
    Testimonials.jsx    auto-rotating carousel
    Contact.jsx          form with simulated submit state
    Footer.jsx
    SectionHead.jsx      shared kicker/title/description block
    Icons.jsx            inline SVG icon set (no external icon package needed)
  hooks/
    useTheme.js          dark/light mode, toggles a `light` class on <html>
  App.jsx
  main.jsx
  index.css              CSS variables for theming + glassmorphism utility classes
```

## Making it yours

1. **Content** — every section pulls from small data arrays at the top of its component
   file (`PROJECTS` in `Projects.jsx`, `HISTORY` in `Experience.jsx`, `TESTIMONIALS` in
   `Testimonials.jsx`, `SKILL_DATA` in `Skills.jsx`, etc). Swap the placeholder copy for
   your own — no markup changes needed.
2. **Name / branding** — search for "Arjun" and "arjun.dev" across `src/` and `index.html`.
3. **Colors** — edit the CSS variables in `src/index.css` (`:root` for dark mode,
   `html.light` for light mode) or the token list in `tailwind.config.js`.
4. **Contact form** — `Contact.jsx` currently simulates a submit with `setTimeout`. Wire
   `handleSubmit` up to your email service of choice (Formspree, Resend, a serverless
   function, etc).
5. **Resume / real photo** — swap the "AM" initials block in `About.jsx` for an `<img>`,
   and add a resume download link next to the "Let's talk about your project" button.

## Deploying

This is a static Vite build, so it deploys to any static host:

- **Vercel / Netlify**: connect the repo, build command `npm run build`, output dir `dist`.
- **GitHub Pages**: run `npm run build`, push the `dist/` folder to a `gh-pages` branch.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (see bottom of `index.css`).
- All interactive elements are keyboard-reachable with visible focus states.
- Canvas animations pause their listeners on unmount; no memory leaks on route change.
- Lighthouse-friendly: no layout-shifting web fonts blocking render, gzip'd JS bundle is
  ~93 KB.
