# Gallery by Yusra

A small, static portfolio for Arabic calligraphy, quilling, ink art, painting, and creative workshops. It uses plain HTML, CSS, and JavaScript, so there is no database, package manager, or build step.

## Run locally

Run `python3 -m http.server` from the repository root and visit `http://localhost:8000`. A local server is needed because the page loads JavaScript modules.

## Add artwork or workshop details

1. Add artwork images under `assets/artwork/` and workshop images under `assets/workshops/`.
2. Add entries to the `artworks` array in `js/site-content.js`. Each entry has a category (`calligraphy`, `quilling`, `ink-art`, or `painting`), image path, descriptive alt text, and a short `title`. Optional `price` (in euros), `medium`, and `size` fields add sales details. Set `status` to `"available"` or `"sold"` only when confirmed; otherwise the card asks visitors to enquire about availability. Available items link to Instagram inquiries; sold items use a distinct dark card style and invite visitors to order a similar custom piece. Set `featured: true` on four works to curate the initial mixed-category selection in “Everything”; category filters remain in their content order. The gallery shows three works per page with Previous/Show more pagination. Artwork images open in an accessible enlarged preview.
3. Add or edit workshop offerings in the `workshops` array in the same file. Each offering has a unique `slug`, title, image path, descriptive alt text, a short description, and a `gallery` array. Gallery entries use `{ image, alt }` and appear on the workshop detail page, which opens when a visitor selects an offering. Set the optional `galleryTitle` to label an event gallery.
4. Set `contact.email` and/or `contact.instagramUrl` there to show contact buttons.
5. Commit and push your changes to `main`.

Use optimized image files to keep the portfolio quick to load. Keep image paths relative to the repository root.
The supplied transparent logo is `assets/gallery-by-yusra-logo.png` and is used in the header, footer, and browser tab. The homepage uses `assets/yusra-art-stall.mp4` with `assets/yusra-art-stall.jpg` as its poster and reduced-motion fallback.

## Social sharing preview

The page uses Open Graph and Twitter Card metadata in `index.html` to show `assets/social-preview.jpg` when the site is shared. Keep this image at 1200 × 630 pixels and update its absolute URL in the metadata if the domain changes.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` deploys the site whenever changes are pushed to `main`.

1. Push this repository to GitHub and make sure its default branch is `main`.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Push a change (or manually run the **Deploy portfolio to GitHub Pages** workflow from the **Actions** tab).
4. When the workflow succeeds, open the Pages URL shown in **Settings → Pages**.

The same static files can be served from a GitHub Pages project URL or a custom domain later.
