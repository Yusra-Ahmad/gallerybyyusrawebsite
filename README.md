# Gallery by Yusra

A small, static portfolio for calligraphy, painting, and acrylic painting workshops. It uses plain HTML, CSS, and JavaScript, so there is no database, package manager, or build step.

## Run locally

Run `python3 -m http.server` from the repository root and visit `http://localhost:8000`. A local server is needed because the page loads JavaScript modules.

## Add artwork or workshop details

1. Add image files under `assets/artwork/`.
2. Add entries to the `artworks` array in `js/site-content.js`. Each entry has a title, category (`calligraphy`, `quilling`, `ink-art`, or `painting`), image path, descriptive alt text, and a short description.
3. Add or edit workshop offerings in the `workshops` array in the same file.
4. Set `contact.email` and/or `contact.instagramUrl` there to show contact buttons.
5. Commit and push your changes to `main`.

Use optimized image files to keep the portfolio quick to load. Keep image paths relative to the repository root.
The supplied transparent logo is `assets/gallery-by-yusra-logo.png` and is used in the header, footer, and browser tab.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` deploys the site whenever changes are pushed to `main`.

1. Push this repository to GitHub and make sure its default branch is `main`.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Push a change (or manually run the **Deploy portfolio to GitHub Pages** workflow from the **Actions** tab).
4. When the workflow succeeds, open the Pages URL shown in **Settings → Pages**.

The same static files can be served from a GitHub Pages project URL or a custom domain later.
