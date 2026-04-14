# ATWO Studios Website - Optimization & Design Plan

## Context
The ATWO Studios website is a Next.js 16 + React 19 site with heavy animations (Motion, Lenis smooth scroll, custom cursor, floating particles). It suffers from **~68MB of unoptimized images** and **continuous JS animations** that keep the main thread busy. These issues cause poor Core Web Vitals (LCP, CLS, INP) and slow page loads, especially on mobile. Additionally, minor design changes will be applied throughout the process.

---

## Phase 1: Image Optimization (Biggest Impact)

1. Convert all images in `public/images/` to WebP, resize to max 1920px width, target <300KB each
2. Fix mislabeled extensions (PNGs named as .jpg)
3. Update `next.config.mjs` — add `formats: ['image/avif', 'image/webp']` to images config
4. Add `loading="lazy"` to all below-fold `<Image>` components:
   - `src/components/sections/portfolio.tsx`
   - `src/components/sections/projects-showcase.tsx`
   - `src/components/sections/about.tsx`
   - `src/components/sections/services.tsx`
   - `src/components/sections/why-choose-us.tsx`
5. Add proper `sizes` prop to all `<Image>` components for responsive serving

### Image Inventory

| File | Current Size | Actual Format | Issue |
|------|-------------|---------------|-------|
| demo-prada.jpg | 22MB | PNG RGBA 4096x3300 | Massive, mislabeled |
| demo-rhode.jpg | 22MB | PNG RGBA 4096x3300 | Massive, mislabeled |
| demo-ornate-1.jpg | 7.2MB | PNG RGB 2304x1728 | Unoptimized |
| project-bg.jpg | 5.8MB | PNG RGBA 4096x1738 | Unoptimized |
| project-ornate.jpg | 2.1MB | PNG RGBA 1834x1011 | Large |
| project-prada.jpg | 2.1MB | PNG RGBA 1823x1013 | Large |
| demo-ornate-2.jpg | 2.0MB | PNG RGB 1280x1031 | Large |
| project-gully.jpg | 1.7MB | PNG RGBA 1808x1014 | Large |
| services-bg.jpg | 1.7MB | JPEG 3168x1344 | Large |
| why-choose-bg.jpg | 1.5MB | PNG RGBA 1830x1018 | Large |
| project-enola.jpg | 652KB | PNG RGBA 569x1020 | OK |
| about-model.jpg | 131KB | JPEG 870x1080 | Good |

---

## Phase 2: Code Splitting & Loading

1. Convert below-fold sections in `app/page.tsx` to `next/dynamic` imports:
   - About, Services, Portfolio, ProjectsShowcase, WhyChooseUs
2. Reduce preloader from hardcoded 3s to ~1.5s or tie to actual load state (`src/components/preloader.tsx`)

---

## Phase 3: Animation Performance

1. **Floating particles** (`src/components/layout/floating-particles.tsx`):
   - Reduce from 35 to ~15 particles
   - Switch to CSS animations or add `will-change: transform`
2. **Custom cursor** (`src/components/layout/custom-cursor.tsx`):
   - Disable on mobile/touch devices
   - Throttle mousemove updates
3. **Smooth scroll** (`src/components/layout/smooth-scroll.tsx`):
   - Evaluate if Lenis is necessary; consider native CSS `scroll-behavior: smooth`
4. **Grain overlay** (`app/globals.css`):
   - Add `will-change: transform`, reduce animation frequency
5. **Remove duplicate mousemove** listener in `app/page.tsx` (lines 30-37) if not needed by children

---

## Phase 4: Font & Resource Loading

1. Self-host Coolvetica WOFF2 files in `public/fonts/` instead of loading from `framerusercontent.com`
2. Update `@font-face` rules in `app/globals.css` to point to local files
3. Add `<link rel="preload">` for critical fonts in `app/layout.tsx`
4. Add `<link rel="preconnect" href="https://res.cloudinary.com">` for Cloudinary images

---

## Phase 5: Minor Design Changes

*(User will specify design changes — this phase runs in parallel or after optimization)*
1. Apply user-specified UI/design tweaks
2. Ensure design changes don't regress performance gains
3. Test visual consistency across breakpoints

---

## Phase 6: Meta Tags & SEO

1. Add Open Graph meta tags to `app/layout.tsx` metadata export
2. Add Twitter Card meta tags
3. Add `theme-color` meta tag
4. Add canonical URL

---

## Phase 7: Final Verification

1. Run `next build` — check bundle size output
2. Run Lighthouse audit (target: Performance > 90)
3. Verify LCP < 2.5s, CLS < 0.1, INP < 200ms
4. Test on mobile (throttled 3G in DevTools)
5. Confirm lazy loading works, no layout shift
6. Visual QA on all design changes

---

## Key Files Reference

| File | Role |
|------|------|
| `app/page.tsx` | Main page — code splitting, remove duplicate listener |
| `app/layout.tsx` | Fonts, meta tags, preconnect hints |
| `app/globals.css` | Font-face rules, grain animation, cursor styles |
| `next.config.mjs` | Image format config |
| `src/components/layout/floating-particles.tsx` | Particle animation optimization |
| `src/components/layout/smooth-scroll.tsx` | Lenis RAF loop |
| `src/components/layout/custom-cursor.tsx` | Cursor tracking |
| `src/components/preloader.tsx` | Preloader timing |
| `src/components/sections/*.tsx` | Image lazy loading + sizes |
| `public/images/*` | Image files to optimize |
