## Sparsh Batra — Terminal Portfolio (CMD style)

A fast, dependency‑free, terminal-inspired portfolio. Type commands like `help`, `projects`, `experience`, and `resume` to explore.

### Live Demo

- Coming soon — add your Vercel link here

<img width="1920" height="969" alt="image" src="https://github.com/user-attachments/assets/9f63a7a1-9ed9-41a6-83c5-0e486820cf42" />


### Features

- Zero frameworks: plain HTML + CSS + vanilla JS for instant load
- Keyboard-first UX: autocomplete (Tab), history (↑/↓), global typing focus
- Sticky bottom prompt, auto-scroll output like a real terminal
- Theming: `theme light`, `theme matrix`, or `theme dark` (default)
- Easy content edits via `content.js`

### Commands

- `help` — list all commands
- `banner` — show ASCII header (auto-generates if not provided)
- `about`, `skills`, `experience`, `projects`, `achievements`
- `contact` — quick links (email, GitHub, LinkedIn, website)
- `open <site|github|linkedin|resume>` — open links in a new tab
- `resume` — opens your resume
- `clear` / `cls` — reset screen with banner
- `theme <dark|light|matrix>` — switch theme
- `ls`, `history`, `echo`, `date`, `uptime`, `whoami`

### Edit content

- All content lives in `content.js`. Update:
  - `meta` (name, handle, links, `resume` URL)
  - `projects`, `experience`, `skills`, `achievements`
  - `ascii` (optional). Leave empty to auto-generate from your name

### Screenshots

Add your screenshots in `assets/screenshots/` and they will render below.

![Desktop](assets/screenshots/desktop.png)
![Mobile](assets/screenshots/mobile.png)

### Local run

Open `index.html` directly in a browser or serve statically. No build step.

### Deploy (Vercel)

1. Create a new Vercel project targeting this directory
2. Select "Other" framework → just static files
3. Deploy. Paste the URL back into the Live Demo section above

### License

MIT

## Terminal Portfolio — Sparsh Batra

A minimal, dependency-free, command line style portfolio. Edit `content.js` to update details. The site is a single-page app with fast, zero-build hosting on any static host (Vercel, GitHub Pages, Netlify, Cloudflare Pages).

### Dev

- Open `index.html` in a browser, or serve statically.
- No build step. No frameworks. Just HTML/CSS/JS.

### Edit content

- Update meta, skills, projects, experience, achievements in `content.js`.
- Replace `meta.resume` with an actual PDF path in `assets/` and add the file.
- ASCII banner is in `content.ascii`.

### Commands

- help, banner, about, projects, experience, skills, achievements, contact
- open <site|github|linkedin|resume>
- resume, whoami, ls, clear, history, theme <name>, echo <text>, uptime, date

### Performance

- Zero dependencies, tiny CSS/JS, no fonts loaded. Instant TTI.

### Deploy

- Drag the folder to any static host. For Vercel, select this directory and deploy.



