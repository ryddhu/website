# Rules for every AI session in this repository

Facts of this repository for the [delivery process](delivery-process.md). Where this file and the delivery process differ, the stricter rule applies.

- **This is a PUBLIC repository** and the live company website. Nothing private may ever be committed: no secrets, keys, tokens, `.env` files, real personal data (phones, home addresses, ID numbers), internal plans, or employer or client names. Check every diff before pushing.
- **Customer guard:** changing the live website (merging to `main` publishes it, via GitHub Pages and `CNAME`) needs Karthick's OK each time. Preview and check first.
- Stack: static site, plain HTML, CSS (`styles.css`) and one small script (`site.js`). No build step, no package file, no tests. Pages: `index.html`, `nubbito/` (product page, `privacy/`, `terms/`). Custom domain in `CNAME` (keep LF line endings, see `.gitattributes`).
- Check a change by opening `index.html` in a browser, or `python3 -m http.server` in the folder. Do not add tracking, analytics or third-party scripts without the owner's OK.
- The privacy policy and terms are legal text: change them only with the owner's OK.
- Use only fake or sample data in examples and screenshots.
- One branch and pull request per task; never push to `main`; never force-push; no repository-setting changes.
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. PR bodies end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
