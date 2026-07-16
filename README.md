# Japanese Kana Practice

A small browser-based worksheet generator for practicing Japanese romaji, hiragana, and katakana.

## Features

- Choose romaji, hiragana, or katakana.
- Include one or more gojūon character rows.
- Generate 1–30 randomized printable pages.
- Print 180 equal-sized practice cells per US Letter page.
- Works entirely in the browser with no build tools or server-side code.

The standalone `n` / `ん` / `ン` character is grouped with the W row.

## Files

- `index.html` — page structure and controls
- `style.css` — responsive screen layout and print formatting
- `script.js` — character data and worksheet generation

## Run locally

Open `index.html` in a web browser.

For local development, you can also run a simple web server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Commit the files.
4. Open the repository's **Settings**.
5. Select **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the `main` branch and the `/ (root)` folder, then save.

GitHub will display the public website address after deployment finishes.

## Original project

Originally developed on CodePen:

https://codepen.io/bgigas/full/KzPojx
