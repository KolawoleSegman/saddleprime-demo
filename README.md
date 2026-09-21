# SaddlePrime Y13 Smartwatch Landing Page Demo

Professional one-page product landing page built with HTML5, CSS3, and Vanilla JavaScript.

## Project Structure

```
saddleprime-demo/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── y13-watch.png      ← replace with real product image
    ├── strap-gold.png
    ├── strap-black.png
    └── earbud.png
```

## How to Run Locally

1. Open the folder in any code editor.
2. Open `index.html` directly in a browser (double-click or right-click → Open with).
3. Or serve with a simple static server:

```bash
# Python
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

No build step, no dependencies, no backend required.

## Product Image Rotator

The hero has a **rotating product gallery** (3 views by default).

- Auto-rotates every 4 seconds
- Previous / Next buttons + dot indicators
- Pauses on hover and keyboard focus
- Arrow keys work when the rotator is focused

### Adding your 2–3 real watch photos

1. Put images in `assets/`, for example:
   - `assets/y13-watch-1.png` (front)
   - `assets/y13-watch-2.png` (angled)
   - `assets/y13-watch-3.png` (side)

2. In `index.html`, inside each `.rotator-slide`:
   - Remove or hide the CSS placeholder `<div class="product-placeholder ...">`
   - Uncomment (or add) the real image:

```html
<img src="assets/y13-watch-1.png" alt="SaddlePrime Y13 Smartwatch front view" class="product-img">
```

3. If you only have **2 images**, delete the third `.rotator-slide` and the third `.rotator-dot`.

Straps and earbud sections still use simple placeholders; swap those the same way when you have those assets.

## Features

- Sticky navigation + mobile hamburger menu
- Smooth scrolling
- Hero with entrance animations + **rotating product views**
- Trust bar, features, package, why-choose, pricing CTA
- Interactive FAQ accordion (one open at a time)
- Order modal with client-side validation
- Demo success message (no real order is placed)
- Fully responsive (320px → 1440px+)
- Keyboard accessible, focus states, semantic HTML

## Notes for Interview Review

- All interactions work without a backend.
- Form is demo-only: validation + success UI only.
- No fake testimonials, reviews, or unsupported specs.
- Clean, maintainable code with CSS variables and clear structure.
"# saddleprime-demo" 
