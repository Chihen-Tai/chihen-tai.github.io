# Personal Portfolio Website — Design Spec
**Date:** 2026-04-15  
**Author:** Allen Chihen-Tai  
**Deployment:** GitHub Pages → `chihen-tai.github.io` (new repo)  
**Tech Stack:** Pure static HTML + CSS + Vanilla JS (no framework)

---

## 1. Visual Direction

**Style:** Anime/otaku — Galaxy Magic Hero (B) + Bento Grid layout (D)  
**Background:** Deep navy-indigo `#0d1130` (not pure black — more cheerful/layered)  
**Palette:**
- Indigo blocks: `#5566dd` border
- Rose/pink blocks: `#ee44aa` border
- Sky/cyan blocks: `#2299ee` border
- Mint/green blocks: `#22dd99` border
- Amber/gold blocks: `#ffbb22` border
- Hero name gradient: `#ff88ee → #bb99ff → #88ddff`

---

## 2. Page Structure (top → bottom)

### ① Loading Screen
- EVA-style boot text: `ALLEN SYSTEM INITIALIZING...`
- Typed.js character-by-character reveal
- Fades out after ~2s, Hero section fades in

### ② Sticky Nav
- Logo: `✦ ALLEN` (pink glow)
- Links: About · Projects · Skills · Contact
- Glassmorphism background on scroll

### ③ Hero Section
- **Three.js** full-canvas star field — stars react to mouse movement
- **Three concentric rotating magic rings** (CSS animation)
- Hero name with gradient + drop-shadow glow
- Subtitle: `✦ QUANTUM · CHEMISTRY · CODE · ELDEN LORD ✦`
- Badges: ⚗️ Chemist · ⚡ Dev · 👑 Elden Lord · 🌌 Quantum · 🦈 Pull Shark

### ④ Left Sidebar — Anime Sticker Nav
- Fixed on scroll (left side of viewport)
- 5 circular sticker buttons (72px, white border, colored bg):
  - 🧙‍♀️ → About
  - 🤖 → Projects
  - ⚗️ → Skills
  - ⚔️ → Elden (achievements section)
  - ✉️ → Contact
- Hover: `scale(1.12) rotate(-4deg)` + purple glow
- Placeholder emoji now; user replaces with actual anime PNG sprites later

### ⑤ About — Bento Grid
- 3-column grid:
  - Large (span-2): Name + bio
  - Small: 👑 Elden Lord · 🦈 Pull Shark · GitHub Pro
- GSAP ScrollTrigger: slides up on enter viewport

### ⑥ Projects — Bento Grid
- Data source: GitHub API `https://api.github.com/users/Chihen-Tai/repos`
- Shows: repo name, description, language, star count
- Pinned repos highlighted: `chem.github.io`, `polymarket_bot_for_15_min_btc`
- Hover → expand with repo details + link
- Fallback: hardcoded data if API fails

### ⑦ Skills & Interests — Bento Grid
- 3-column equal grid: Code / Science / GitHub stats

### ⑧ Right Side — Decorative Stickers
- Fixed on scroll (right side)
- 5 rounded-square stickers: 🌙 🌊 ✨ 🍀 🌸
- Hover: `scale(1.1) rotate(3deg)`
- Placeholder emoji now; user replaces with anime PNG later

### ⑨ Footer
- Meteor shower CSS animation
- Links: GitHub · Discord

---

## 3. Animations & Effects

| Effect | Library | Detail |
|--------|---------|--------|
| Star field | Three.js | Mouse-reactive particles |
| Magic rings | CSS animation | 3 rings, different rotation speeds |
| Boot screen | Typed.js | Typewriter reveal |
| Scroll animations | GSAP ScrollTrigger | Bento blocks slide in |
| Sticker hover | CSS transition | scale + rotate |
| Meteor shower | CSS keyframes | Footer background |
| GitHub API | fetch() | Live repo data with fallback |

---

## 4. File Structure

```
chihen-tai.github.io/
├── index.html
├── css/
│   ├── tokens.css        # design tokens / CSS vars
│   ├── layout.css        # nav, hero, bento grid, footer
│   ├── animations.css    # magic rings, meteors, transitions
│   └── stickers.css      # sticker sidebar styles
├── js/
│   ├── stars.js          # Three.js star field
│   ├── github.js         # GitHub API fetch + render
│   ├── scroll.js         # GSAP ScrollTrigger setup
│   └── boot.js           # Loading screen + Typed.js
├── assets/
│   └── stickers/         # placeholder → replace with anime PNGs
└── .nojekyll
```

---

## 5. External Libraries (CDN)

- Three.js `r128`
- GSAP `3.x` + ScrollTrigger
- Typed.js `2.x`

---

## 6. GitHub Pages Deployment

- New repo: `Chihen-Tai/chihen-tai.github.io`
- Push `main` branch → auto-deploys to `https://chihen-tai.github.io`
- No build step required (pure static)

---

## 7. Sticker Replacement Guide

1. Find anime PNG with transparent background (check artist's repost permission)
2. Save as: `assets/stickers/about.png`, `projects.png`, `skills.png`, `elden.png`, `contact.png`
3. In `index.html`, replace emoji inside `.sticker` with `<img src="assets/stickers/about.png" alt="...">`

---

## 8. Out of Scope

- Backend / server-side logic
- Authentication
- Dark/light mode toggle
- i18n / multi-language
