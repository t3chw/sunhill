# Sunhill Public School

Website for **Shahid Priya Sharma Memorial Sunhill Public School**, Maranchi (Patna) — a BSEB day school, Nursery to Class X.

> अमृतं तु विद्या — Knowledge is the only nectar

## Structure

Plain static site. No build step — React + Babel run in the browser.

- `index.html` — main site (v2, with cinematic sunrise intro)
- `v1.html` — earlier variant without the intro
- `styles.css` — design tokens + layout
- `*.jsx` — section components (loaded via Babel standalone)
- `photos/` — campus, classroom, event, and logo imagery

## Local preview

Any static server works. For example:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Pushes to `main` deploy automatically on Vercel (static, no build command needed).
