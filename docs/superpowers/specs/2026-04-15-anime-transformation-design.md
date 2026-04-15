# Portfolio — Anime Transformation Design Spec
**Date:** 2026-04-15  
**Author:** Allen (creative direction delegated to Claude)  
**Base:** `/Applications/codes/website` — existing static HTML + CSS + Vanilla JS portfolio

---

## 1. Visual Direction

**Style:** Genshin Impact × Wuthering Waves × Sword Art Online  
**Mood:** Dark holographic game UI — crystalline panels, gold celestial accents, resonance energy, floating holo-menus  
**NOT:** Generic magical girl pastels. This is the *isekai protagonist* aesthetic — you are the Traveler, the Resonator, the Swordsman.

### Palette

| Token | Value | Source |
|-------|-------|--------|
| `--bg-base` | `#060c1a` | Darker deep space navy |
| `--gold-accent` | `#ffdd88` | Genshin amber/gold |
| `--gold-border` | `rgba(255,200,60,0.35)` | Genshin card border |
| `--holo-blue` | `#88ccff` | SAO interface blue |
| `--holo-border` | `rgba(80,180,255,0.35)` | SAO panel glow |
| `--resonance` | `#c8aaff` | Wuthering Waves purple |
| `--resonance-border` | `rgba(160,100,255,0.4)` | WW resonance border |
| Hero gradient | `#ffdd88 → #fff8cc → #c8aaff → #88ccff` | Name gradient |

### Three Panel Types (replace current indigo/rose/mint/amber)

- **Gold panel** (Genshin) — `#1a1400` bg, gold border + glow — achievements, favorites, stats
- **Holo panel** (SAO) — `#030d1f` bg, blue border + glow — about, projects, now playing
- **Resonance panel** (WW) — `#110a28` bg, purple border + glow — skills, timeline

All panels get:
- `◈` glyph ornament in top-right corner
- Shimmer sweep animation on hover (gradient moves left→right across surface)
- SAO corner bracket reveal on hover (L-shapes, top-left + bottom-right)

---

## 2. Loading Screen — Transformation Sequence

Replace current EVA boot with a 3-phase sequence:

**Phase 1 (0–0.8s):** Black screen, gold radial particle burst from center  
**Phase 2 (0.8–2.2s):** Typed.js three lines:
  1. `LOADING TRAVELER DATA...` — SAO blue
  2. `RESONANCE SYNCHRONIZED` — WW purple  
  3. `WELCOME BACK, ALLEN ✦` — gold

**Phase 3 (2.2–2.7s):** Screen fades out, hero fades in

---

## 3. Hero Section

**Background layers (back → front):**
1. Deep space gradient (darker than current)
2. Three.js star field — 900 stars, 70% white / 20% gold-tinted / 10% blue-tinted
3. Three resonance rings: outer=gold slow, mid=blue counter-rotate, inner=resonance-purple fast
4. Genshin decorative topbar: 2px horizontal gradient line at top edge

**Hero name:** gradient gold→white→purple→blue, layered gold+purple drop-shadow glow  
**Subtitle:** `✦ TRAVELER · RESONATOR · SWORDSMAN · CHEMIST · ELDEN LORD ✦`  
**Badges:** ⚗️ Chemist · ⚡ Dev · 👑 Elden Lord · 🌌 Traveler · 🦈 Pull Shark · 🌊 Resonator  
**Badge style:** rectangular (`border-radius: 4px`), color-coded by panel type  
**SAO corner brackets:** 4 gold L-brackets absolute-positioned at hero corners

---

## 4. Navigation

- Logo: `◈ ALLEN`
- Links: `letter-spacing: 3px`, hover → gold
- Scrolled: SAO panel dark bg + `border-bottom: 1px solid rgba(80,180,255,0.3)` + backdrop blur

---

## 5. Section Panel Labels

SAO-style dividers between sections:
- Left: 3px vertical bar (blue→indigo gradient)
- Text: `// sectionname` in `#88ccff`, `letter-spacing: 4px`
- Right: horizontal line fading to transparent

---

## 6. Bento Sections

### Existing (restyled)
| Section | Panel types |
|---------|-------------|
| About | holo (span-2) + gold |
| Projects | holo cards (GitHub API) |
| Skills | resonance + holo + gold |
| Achievements | gold (Elden Lord) + resonance (Pull Shark) |

### NEW — 🎮 Favorites Collection
Gold-themed. Cards for: Elden Ring ⚔️, Wuthering Waves 🌊, Genshin Impact ✨, SAO 🗡️, + more (user editable).  
Each card: gold border, dark bg, emoji + name, hover lifts with gold glow.

### NEW — 📜 Resonance Log (Timeline)
Resonance-themed vertical timeline. Purple glowing spine + nodes. Milestones:
- Started coding → First open source PR → chem.github.io launched → NOW: Building in the open

### NEW — 🌸 Now Playing / Status
Holo SAO card. Emoji album art placeholder + track name + subtitle + blue progress bar.  
Manually editable in `index.html` — no API required.

---

## 7. Sidebars

**Left sticker nav:** Panel-colored backgrounds per section, panel-colored glow on hover. Active section sticker pulses.  
**Right deco:** Keep. Add slow `translateY` float oscillation per sticker (different phase each).

---

## 8. Global Effects

**Sparkle cursor trail** (`js/cursor.js` — new):  
On `mousemove`, spawn tiny `◈` / `✦` glyphs in gold/blue/purple that fade over 600ms. Max 20 active at once.

**Sakura/gold petals** (`js/petals.js` — new):  
8–12 divs drifting downward with horizontal sway. Color: `rgba(255,200,150,0.3)`. Subtle background decoration only.

---

## 9. Animation Summary

| Effect | File | Status |
|--------|------|--------|
| Transformation loading | `js/boot.js` | Modified |
| Star field (900, tinted) | `js/stars.js` | Modified |
| Resonance rings | `css/animations.css` | Modified |
| Shimmer hover sweep | `css/animations.css` | New |
| Bento scroll-in (GSAP) | `js/scroll.js` | Unchanged |
| Sparkle cursor trail | `js/cursor.js` | New |
| Sakura petals | `js/petals.js` | New |
| Sticker active pulse | `css/stickers.css` | Modified |
| Meteor shower (footer) | `css/animations.css` | Unchanged |

---

## 10. File Plan

**Modified:** `css/tokens.css`, `css/layout.css`, `css/animations.css`, `css/stickers.css`, `js/boot.js`, `js/stars.js`, `index.html`  
**New:** `js/cursor.js`, `js/petals.js`  
**Unchanged:** `js/github.js`, `js/scroll.js`, `.nojekyll`

---

## 11. Out of Scope

- Backend / server-side logic
- Dark/light mode toggle
- Music API (Now Playing is manually edited HTML)
- Actual anime PNG stickers (emoji placeholders remain)
