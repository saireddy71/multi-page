# good-morning-site (multi-page)

This is a small multi-page static site built from the original single-file version. It includes:
- index.html (home)
- about.html (our story)
- gallery.html (images & lightbox)
- assets/css/style.css
- assets/js/main.js
- simple manifest and image svgs

How to run locally:
```bash
# after cloning
# using python
python -m http.server 8000
# visit http://localhost:8000/index.html

# or using node (serve)
npx serve .
```

Suggested next steps:
- Replace example SVGs with bespoke illustrations or optimized raster images (webp).
- Add an automated build step (minify CSS/JS) and GitHub Pages deployment (docs/ or gh-pages).
- If you want server-side guestbook or persistent messages, add a small backend (e.g., Netlify Functions).
