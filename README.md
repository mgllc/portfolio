# Portfolio Site

Static, no-build-step developer portfolio deployed to GitHub Pages.

## Structure

- `index.html` / `styles.css` / `script.js` — the page itself
- `data/projects.json` — edit this to add/update featured projects, no HTML changes needed
- `.github/workflows/deploy.yml` — auto-deploys to GitHub Pages on every push to `main`
- `.github/workflows/codeql.yml`, `dependency-review.yml`, `secret-scan.yml` — DevSecOps baseline (see root `devsecops-template/README.md` for what each does)

## Local preview

No build step — just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

1. Push this repo to GitHub.
2. In **Settings → Pages**, set Source to "GitHub Actions".
3. Push to `main` — the `deploy.yml` workflow publishes automatically.

## Before going live

Replace every `{{PLACEHOLDER}}` in `index.html` and `data/projects.json`
with your real info, and enable pre-commit locally:

```bash
pip install pre-commit
pre-commit install
```
