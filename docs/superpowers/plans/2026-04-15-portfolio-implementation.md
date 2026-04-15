# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static anime/otaku-style personal portfolio at `chihen-tai.github.io` with Galaxy Magic hero, Bento Grid layout, Three.js stars, anime sticker nav, and live GitHub API data.

**Architecture:** Single `index.html` entry point with modular CSS files (tokens → layout → animations → stickers) and JS modules (boot → stars → github → scroll). All libraries loaded from CDN. No build step — GitHub Pages serves directly.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, keyframes), Vanilla JS ES6+, Three.js r128, GSAP 3 + ScrollTrigger, Typed.js 2

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Single page shell — loads all CSS/JS, defines DOM structure |
| `css/tokens.css` | All CSS custom properties (colors, spacing, timing) |
| `css/layout.css` | Nav, hero, bento grid, sticker sidebars, footer |
| `css/animations.css` | Magic rings rotation, meteor shower, scroll transitions |
| `css/stickers.css` | Sticker button shapes, hover effects, glow |
| `js/boot.js` | Loading screen logic, Typed.js boot sequence, fade-out |
| `js/stars.js` | Three.js scene setup, star particles, mouse tracking |
| `js/github.js` | GitHub API fetch, repo card rendering, fallback data |
| `js/scroll.js` | GSAP ScrollTrigger — bento slide-in animations |
| `assets/stickers/` | Placeholder emoji PNGs (user replaces with anime art) |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll processing |

---

## Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `css/tokens.css`
- Create: `.nojekyll`

- [ ] **Step 1: Create `.nojekyll`**

```bash
touch /Applications/codes/website/.nojekyll
```

- [ ] **Step 2: Create `css/tokens.css`**

```css
/* css/tokens.css */
:root {
  /* Background */
  --bg-base:        #0d1130;
  --bg-nav:         rgba(13, 15, 42, 0.98);
  --bg-footer:      #0a0e28;

  /* Bento block backgrounds */
  --bg-indigo:      #181e50;
  --bg-rose:        #2a1228;
  --bg-sky:         #0a1e38;
  --bg-mint:        #081e16;
  --bg-amber:       #1e1400;

  /* Bento border colors */
  --border-indigo:  #5566dd;
  --border-rose:    #ee44aa;
  --border-sky:     #2299ee;
  --border-mint:    #22dd99;
  --border-amber:   #ffbb22;
  --border-nav:     #3344bb;

  /* Text */
  --text-primary:   #f0e8ff;
  --text-muted:     #8899cc;
  --text-indigo:    #99aaff;
  --text-rose:      #ff88cc;
  --text-sky:       #66ccff;
  --text-mint:      #55ffbb;
  --text-amber:     #ffdd66;

  /* Hero */
  --hero-glow-a:    #ff88ee;
  --hero-glow-b:    #bb99ff;
  --hero-glow-c:    #88ddff;
  --logo-color:     #ff99ee;

  /* Stickers */
  --sticker-border: #ffffff;

  /* Timing */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast:  150ms;
  --duration-normal:300ms;
  --duration-slow:  600ms;
}
```

- [ ] **Step 3: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Allen Chihen-Tai</title>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/stickers.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
</head>
<body>

  <!-- Loading Screen -->
  <div id="loading-screen">
    <div id="loading-text"></div>
  </div>

  <!-- Sticky Nav -->
  <nav id="main-nav">
    <div class="nav-logo">✦ ALLEN</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <!-- Left Sticker Nav -->
  <aside id="sticker-nav-left">
    <div class="sticker-wrap">
      <button class="sticker sticker-wiz" onclick="scrollTo('about')" aria-label="About">🧙‍♀️</button>
      <span class="sticker-label">About</span>
    </div>
    <div class="sticker-wrap">
      <button class="sticker sticker-bot" onclick="scrollTo('projects')" aria-label="Projects">🤖</button>
      <span class="sticker-label">Projects</span>
    </div>
    <div class="sticker-wrap">
      <button class="sticker sticker-chem" onclick="scrollTo('skills')" aria-label="Skills">⚗️</button>
      <span class="sticker-label">Skills</span>
    </div>
    <div class="sticker-wrap">
      <button class="sticker sticker-sword" onclick="scrollTo('elden')" aria-label="Elden Lord">⚔️</button>
      <span class="sticker-label">Elden</span>
    </div>
    <div class="sticker-wrap">
      <button class="sticker sticker-mail" onclick="scrollTo('contact')" aria-label="Contact">✉️</button>
      <span class="sticker-label">Contact</span>
    </div>
  </aside>

  <!-- Right Decorative Stickers -->
  <aside id="sticker-deco-right">
    <div class="deco-sticker deco-moon">🌙</div>
    <div class="deco-sticker deco-wave">🌊</div>
    <div class="deco-sticker deco-spark">✨</div>
    <div class="deco-sticker deco-leaf">🍀</div>
    <div class="deco-sticker deco-sakura">🌸</div>
  </aside>

  <!-- Hero -->
  <section id="hero">
    <canvas id="star-canvas"></canvas>
    <div class="hero-rings">
      <div class="ring ring-outer"></div>
      <div class="ring ring-mid"></div>
      <div class="ring ring-inner"></div>
    </div>
    <div class="hero-content">
      <h1 class="hero-name">ALLEN CHIHEN-TAI</h1>
      <p class="hero-sub">✦ QUANTUM · CHEMISTRY · CODE · ELDEN LORD ✦</p>
      <div class="hero-badges">
        <span class="badge">⚗️ Chemist</span>
        <span class="badge">⚡ Dev</span>
        <span class="badge">👑 Elden Lord</span>
        <span class="badge">🌌 Quantum</span>
        <span class="badge">🦈 Pull Shark</span>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="content-section">
    <p class="section-label">// ABOUT</p>
    <div class="bento-grid grid-3">
      <div class="bento-block indigo span-2">
        <span class="b-label">Who am I</span>
        <h2 class="b-title">Allen Chihen-Tai</h2>
        <p class="b-sub">Computer + Quantum Mechanics enthusiast · Currently learning Chemistry · Discord: Microdaery</p>
      </div>
      <div class="bento-block rose">
        <span class="b-label">Status</span>
        <h3 class="b-title">👑 Elden Lord</h3>
        <p class="b-sub">🦈 Pull Shark · GitHub Pro</p>
      </div>
    </div>
  </section>

  <!-- Projects -->
  <section id="projects" class="content-section">
    <p class="section-label">// PROJECTS</p>
    <div class="bento-grid grid-2" id="projects-grid">
      <!-- Populated by github.js -->
    </div>
  </section>

  <!-- Skills -->
  <section id="skills" class="content-section">
    <p class="section-label">// SKILLS &amp; INTERESTS</p>
    <div class="bento-grid grid-3-eq">
      <div class="bento-block mint">
        <span class="b-label">Code</span>
        <h3 class="b-title">Python · HTML · Java</h3>
      </div>
      <div class="bento-block indigo">
        <span class="b-label">Science</span>
        <h3 class="b-title">Quantum · Chemistry</h3>
      </div>
      <div class="bento-block amber">
        <span class="b-label">GitHub</span>
        <h3 class="b-title" id="github-stats">16 Repos · Pro 🌟</h3>
      </div>
    </div>
  </section>

  <!-- Elden Lord Easter Egg -->
  <section id="elden" class="content-section">
    <p class="section-label">// ACHIEVEMENTS</p>
    <div class="bento-grid grid-2">
      <div class="bento-block rose">
        <span class="b-label">Achievement Unlocked</span>
        <h3 class="b-title">👑 ELDEN LORD</h3>
        <p class="b-sub">Thou art maidenless no more</p>
      </div>
      <div class="bento-block indigo">
        <span class="b-label">GitHub Achievement</span>
        <h3 class="b-title">🦈 Pull Shark</h3>
        <p class="b-sub">GitHub Pro · Opened pull requests that have been merged</p>
      </div>
    </div>
  </section>

  <!-- Footer / Contact -->
  <footer id="contact">
    <div class="meteor-shower" aria-hidden="true">
      <span class="meteor m1"></span>
      <span class="meteor m2"></span>
      <span class="meteor m3"></span>
      <span class="meteor m4"></span>
    </div>
    <div class="footer-content">
      <p class="footer-title">✦ CHIHEN-TAI ✦</p>
      <div class="footer-links">
        <a href="https://github.com/Chihen-Tai" target="_blank" rel="noopener">github.com/Chihen-Tai</a>
        <span>·</span>
        <span>Discord: Microdaery</span>
      </div>
      <p class="footer-sub">Built with magic &amp; code</p>
    </div>
  </footer>

  <script src="js/boot.js"></script>
  <script src="js/stars.js"></script>
  <script src="js/github.js"></script>
  <script src="js/scroll.js"></script>
  <script>
    function scrollTo(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>
```

- [ ] **Step 4: Verify files exist**

```bash
ls /Applications/codes/website/
# Expected: index.html  css/  .nojekyll
```

- [ ] **Step 5: Commit**

```bash
cd /Applications/codes/website
git init
git add index.html css/tokens.css .nojekyll
git commit -m "feat: scaffold index.html and CSS tokens"
```

---

## Task 2: Layout CSS

**Files:**
- Create: `css/layout.css`

- [ ] **Step 1: Create `css/layout.css`**

```css
/* css/layout.css */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: 'Courier New', Courier, monospace;
  overflow-x: hidden;
}

/* LOADING */
#loading-screen {
  position: fixed; inset: 0; z-index: 1000;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  transition: opacity var(--duration-slow) var(--ease-out-expo);
}
#loading-screen.fade-out { opacity: 0; pointer-events: none; }
#loading-text {
  color: #00ff88; font-size: clamp(0.8rem, 2vw, 1.1rem);
  letter-spacing: 3px; font-family: 'Courier New', monospace;
}

/* NAV */
#main-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 100px;
  background: transparent;
  transition: background var(--duration-normal);
}
#main-nav.scrolled {
  background: var(--bg-nav);
  border-bottom: 1px solid var(--border-nav);
  backdrop-filter: blur(12px);
}
.nav-logo {
  font-weight: 900; letter-spacing: 3px;
  color: var(--logo-color);
  text-shadow: 0 0 10px rgba(255,150,240,0.7);
  font-size: 1rem;
}
.nav-links { display: flex; gap: 24px; }
.nav-links a {
  color: #aabbff; text-decoration: none; font-size: 0.75rem;
  letter-spacing: 1px; transition: color var(--duration-fast);
}
.nav-links a:hover { color: var(--text-primary); }

/* STICKER SIDEBARS */
#sticker-nav-left, #sticker-deco-right {
  position: fixed; top: 50%; transform: translateY(-50%);
  z-index: 90;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
#sticker-nav-left  { left: 16px; }
#sticker-deco-right{ right: 16px; }

/* HERO */
#hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(80,40,180,0.55) 0%, transparent 55%),
    radial-gradient(ellipse at 72% 38%, rgba(180,60,160,0.4)  0%, transparent 50%),
    radial-gradient(ellipse at 50% 95%, rgba(40,60,200,0.3)   0%, transparent 60%),
    linear-gradient(180deg, #141840 0%, var(--bg-base) 100%);
}
#star-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
}
.hero-rings {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.ring { position: absolute; border-radius: 50%; border-style: solid; }
.ring-outer {
  width: min(420px,70vw); height: min(420px,70vw);
  border-width: 1px; border-color: rgba(150,170,255,0.35);
  box-shadow: 0 0 20px rgba(100,130,255,0.14);
}
.ring-mid {
  width: min(290px,48vw); height: min(290px,48vw);
  border-width: 1px; border-color: rgba(180,130,255,0.5);
  box-shadow: 0 0 14px rgba(160,100,255,0.2);
}
.ring-inner {
  width: min(170px,28vw); height: min(170px,28vw);
  border-width: 1px; border-color: rgba(210,170,255,0.65);
  box-shadow: 0 0 10px rgba(185,120,255,0.28);
}
.hero-content { position: relative; z-index: 1; text-align: center; padding: 0 20px; }
.hero-name {
  font-size: clamp(2rem,6vw,4rem); font-weight: 900;
  letter-spacing: clamp(2px,1vw,8px);
  background: linear-gradient(135deg, var(--hero-glow-a), var(--hero-glow-b), var(--hero-glow-c), var(--hero-glow-a));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 16px rgba(200,140,255,0.85)) drop-shadow(0 0 32px rgba(150,100,255,0.4));
}
.hero-sub {
  font-size: clamp(0.55rem,1.5vw,0.75rem); color: #ccaaff;
  letter-spacing: clamp(2px,0.5vw,4px); margin-top: 12px;
}
.hero-badges { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; }
.badge {
  background: rgba(70,55,175,0.55); border: 1px solid #8899ff;
  border-radius: 20px; padding: 4px 14px;
  font-size: clamp(0.6rem,1.2vw,0.75rem); color: #ddeeff;
  box-shadow: 0 0 8px rgba(100,120,255,0.35);
}

/* CONTENT SECTIONS */
.content-section { padding: 48px 100px 0; max-width: 1100px; margin: 0 auto; }
.section-label {
  font-size: 0.6rem; color: #aabbff; letter-spacing: 4px;
  text-transform: uppercase; text-shadow: 0 0 6px rgba(150,170,255,0.45);
  margin-bottom: 10px;
}

/* BENTO GRID */
.bento-grid { display: grid; gap: 10px; margin-bottom: 32px; }
.grid-3    { grid-template-columns: 1.5fr 1fr 1fr; }
.grid-2    { grid-template-columns: 1fr 1fr; }
.grid-3-eq { grid-template-columns: 1fr 1fr 1fr; }
.span-2    { grid-column: span 2; }

@media (max-width: 768px) {
  .grid-3, .grid-3-eq, .grid-2 { grid-template-columns: 1fr; }
  .span-2 { grid-column: span 1; }
  .content-section { padding: 32px 24px 0; }
  #main-nav { padding: 12px 20px; }
  #sticker-nav-left, #sticker-deco-right { display: none; }
}

.bento-block {
  border-radius: 10px; padding: 16px 18px; min-height: 70px;
  transition: transform var(--duration-normal) var(--ease-out-expo),
              box-shadow var(--duration-normal);
}
.bento-block:hover { transform: translateY(-3px); }

.bento-block.indigo {
  background: linear-gradient(135deg, var(--bg-indigo), #232a68);
  border: 1px solid var(--border-indigo);
  box-shadow: 0 0 14px rgba(80,100,220,0.22), inset 0 1px 0 rgba(140,160,255,0.1);
}
.bento-block.indigo:hover { box-shadow: 0 6px 24px rgba(80,100,220,0.4); }
.bento-block.indigo .b-label { color: var(--text-indigo); }
.bento-block.indigo .b-title { color: #eeeeff; }
.bento-block.indigo .b-sub   { color: #8899cc; }

.bento-block.rose {
  background: linear-gradient(135deg, var(--bg-rose), #3a1a38);
  border: 1px solid var(--border-rose);
  box-shadow: 0 0 14px rgba(230,60,170,0.26), inset 0 1px 0 rgba(255,100,200,0.1);
}
.bento-block.rose:hover { box-shadow: 0 6px 24px rgba(230,60,170,0.4); }
.bento-block.rose .b-label { color: var(--text-rose); }
.bento-block.rose .b-title { color: #ffe0f0; }
.bento-block.rose .b-sub   { color: #cc6699; }

.bento-block.sky {
  background: linear-gradient(135deg, var(--bg-sky), #102848);
  border: 1px solid var(--border-sky);
  box-shadow: 0 0 14px rgba(30,160,240,0.22), inset 0 1px 0 rgba(80,200,255,0.1);
}
.bento-block.sky:hover { box-shadow: 0 6px 24px rgba(30,160,240,0.4); }
.bento-block.sky .b-label { color: var(--text-sky); }
.bento-block.sky .b-title { color: #cceeff; }
.bento-block.sky .b-sub   { color: #4488bb; }

.bento-block.mint {
  background: linear-gradient(135deg, var(--bg-mint), #0e2820);
  border: 1px solid var(--border-mint);
  box-shadow: 0 0 14px rgba(30,210,150,0.2), inset 0 1px 0 rgba(80,255,180,0.1);
}
.bento-block.mint:hover { box-shadow: 0 6px 24px rgba(30,210,150,0.4); }
.bento-block.mint .b-label { color: var(--text-mint); }
.bento-block.mint .b-title { color: #ccffee; }
.bento-block.mint .b-sub   { color: #44aa77; }

.bento-block.amber {
  background: linear-gradient(135deg, var(--bg-amber), #2a1c00);
  border: 1px solid var(--border-amber);
  box-shadow: 0 0 14px rgba(255,185,30,0.26), inset 0 1px 0 rgba(255,220,80,0.1);
}
.bento-block.amber:hover { box-shadow: 0 6px 24px rgba(255,185,30,0.4); }
.bento-block.amber .b-label { color: var(--text-amber); }
.bento-block.amber .b-title { color: #fff4cc; }
.bento-block.amber .b-sub   { color: #cc9922; }

.b-label { font-size: 0.58rem; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 5px; }
.b-title { font-size: 0.95rem; font-weight: bold; margin-bottom: 4px; }
.b-sub   { font-size: 0.68rem; opacity: 0.8; line-height: 1.5; }

/* FOOTER */
footer#contact {
  position: relative; overflow: hidden;
  padding: 60px 24px 40px;
  background: var(--bg-footer);
  border-top: 1px solid #2233aa;
  text-align: center; margin-top: 64px;
}
.footer-content { position: relative; z-index: 1; }
.footer-title {
  font-size: 1.4rem; font-weight: 900; letter-spacing: 4px; color: #bb99ff;
  text-shadow: 0 0 12px rgba(170,120,255,0.6); margin-bottom: 14px;
}
.footer-links { display: flex; gap: 12px; justify-content: center; font-size: 0.75rem; color: #8899dd; flex-wrap: wrap; }
.footer-links a { color: #aabbff; text-decoration: none; }
.footer-links a:hover { color: #ddeeff; }
.footer-sub { margin-top: 20px; font-size: 0.65rem; color: #445577; letter-spacing: 2px; }
```

- [ ] **Step 2: Open `index.html` in browser, verify layout renders**

Open `file:///Applications/codes/website/index.html`. Expected: navy background, nav, hero placeholder, bento sections visible.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add css/layout.css
git commit -m "feat: add layout CSS"
```

---

## Task 3: Animations CSS

**Files:**
- Create: `css/animations.css`

- [ ] **Step 1: Create `css/animations.css`**

```css
/* css/animations.css */

/* MAGIC RINGS */
@keyframes ring-rotate-cw  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
@keyframes ring-rotate-ccw { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
.ring-outer { animation: ring-rotate-cw  18s linear infinite; }
.ring-mid   { animation: ring-rotate-ccw 12s linear infinite; }
.ring-inner { animation: ring-rotate-cw   7s linear infinite; }

/* BENTO SCROLL-IN initial state — GSAP drives the reveal */
.bento-block { opacity: 0; transform: translateY(28px); }

/* METEOR SHOWER */
@keyframes meteor {
  0%   { transform: translateX(0) translateY(0) rotate(215deg); opacity: 1; }
  70%  { opacity: 1; }
  100% { transform: translateX(-500px) translateY(300px) rotate(215deg); opacity: 0; }
}
.meteor {
  position: absolute; width: 2px; height: 70px;
  background: linear-gradient(180deg, rgba(200,180,255,0.9), transparent);
  border-radius: 1px; animation: meteor 5s ease-in infinite;
}
.meteor.m1 { top:  8%; left: 75%; animation-delay: 0s;   animation-duration: 4.5s; }
.meteor.m2 { top: 20%; left: 50%; animation-delay: 1.5s; animation-duration: 5s;   }
.meteor.m3 { top:  5%; left: 88%; animation-delay: 2.8s; animation-duration: 4s;   }
.meteor.m4 { top: 35%; left: 65%; animation-delay: 0.8s; animation-duration: 6s;   }

/* LOADING CURSOR */
@keyframes cursor-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
#loading-text::after { content: '▋'; animation: cursor-blink 0.8s step-end infinite; margin-left: 2px; }

/* HERO FADE-IN */
@keyframes hero-appear { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
.hero-content { opacity: 0; animation: hero-appear 1s var(--ease-out-expo) 0.3s forwards; }
```

- [ ] **Step 2: Verify rings are rotating in browser**

Refresh `index.html` — three concentric rings in the hero should be visibly rotating at different speeds.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add css/animations.css
git commit -m "feat: add animations CSS — rings, meteors, scroll-in"
```

---

## Task 4: Sticker CSS

**Files:**
- Create: `css/stickers.css`

- [ ] **Step 1: Create `css/stickers.css`**

```css
/* css/stickers.css */

/* LEFT NAV */
.sticker-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.sticker {
  width: 72px; height: 72px; border-radius: 50%;
  border: 3px solid var(--sticker-border);
  box-shadow: 0 4px 14px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; cursor: pointer; background: none;
  transition: transform var(--duration-normal) var(--ease-out-expo), box-shadow var(--duration-normal);
}
.sticker:hover {
  transform: scale(1.12) rotate(-4deg);
  box-shadow: 0 8px 24px rgba(0,0,0,0.55), 0 0 20px rgba(200,150,255,0.45);
}
.sticker:focus-visible { outline: 2px solid #aabbff; outline-offset: 3px; }
.sticker-label { font-size: 0.55rem; color: var(--text-muted); text-align: center; letter-spacing: 1px; }

.sticker-wiz  { background: linear-gradient(160deg,#2a1060,#4a1a88); border-color:#cc88ff; }
.sticker-bot  { background: linear-gradient(160deg,#0a2040,#1a3a60); border-color:#44bbff; }
.sticker-chem { background: linear-gradient(160deg,#102820,#1a4030); border-color:#44ffaa; }
.sticker-sword{ background: linear-gradient(160deg,#3a1010,#5a2020); border-color:#ff7755; }
.sticker-mail { background: linear-gradient(160deg,#101a40,#1a2a60); border-color:#ffcc44; }

/* RIGHT DECO */
.deco-sticker {
  width: 66px; height: 66px; border-radius: 14px;
  border: 3px solid var(--sticker-border);
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.9rem; cursor: default;
  transition: transform var(--duration-normal) var(--ease-out-expo);
}
.deco-sticker:hover { transform: scale(1.1) rotate(3deg); }

.deco-moon   { background: linear-gradient(160deg,#1a1050,#2a1870); border-color:#bb99ff; }
.deco-wave   { background: linear-gradient(160deg,#0a1830,#102240); border-color:#66aaff; }
.deco-spark  { background: linear-gradient(160deg,#201040,#301860); border-color:#ee88ff; }
.deco-leaf   { background: linear-gradient(160deg,#102010,#182e18); border-color:#55ee99; }
.deco-sakura { background: linear-gradient(160deg,#1e0820,#2e1030); border-color:#ff88dd; }
```

- [ ] **Step 2: Verify stickers in browser**

Refresh — left sidebar shows 5 glowing circular emoji buttons, right sidebar shows 5 rounded-square deco stickers. Both sides hover with wiggle effect.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add css/stickers.css
git commit -m "feat: add sticker sidebar CSS"
```

---

## Task 5: Boot Screen JS

**Files:**
- Create: `js/boot.js`

- [ ] **Step 1: Create `js/boot.js`**

```js
// js/boot.js
(function () {
  var screen = document.getElementById('loading-screen');
  var el     = document.getElementById('loading-text');

  new Typed(el, {
    strings: [
      'ALLEN SYSTEM INITIALIZING...',
      'LOADING QUANTUM MODULES...',
      'SUMMONING ELDEN LORD...',
      'READY.'
    ],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 400,
    startDelay: 200,
    loop: false,
    showCursor: false,
    onComplete: function () {
      setTimeout(function () {
        screen.classList.add('fade-out');
        setTimeout(function () { screen.style.display = 'none'; }, 700);
      }, 600);
    }
  });

  // Nav scroll-spy
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();
```

- [ ] **Step 2: Verify boot sequence in browser**

Refresh — black screen with green typewriter text cycles through 4 messages, then fades out revealing the site. Nav gains glassmorphism background after scrolling past 60px.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add js/boot.js
git commit -m "feat: add Typed.js boot screen and nav scroll-spy"
```

---

## Task 6: Three.js Star Field

**Files:**
- Create: `js/stars.js`

- [ ] **Step 1: Create `js/stars.js`**

```js
// js/stars.js
(function () {
  var canvas = document.getElementById('star-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 1;

  var STAR_COUNT = 600;
  var positions  = new Float32Array(STAR_COUNT * 3);
  for (var i = 0; i < STAR_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var mat   = new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.85 });
  var stars = new THREE.Points(geo, mat);
  scene.add(stars);

  var mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });

  window.addEventListener('resize', function () {
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  (function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += (mouseY - stars.rotation.x) * 0.04;
    stars.rotation.y += (mouseX - stars.rotation.y) * 0.04;
    stars.rotation.z += 0.0003;
    renderer.render(scene, camera);
  })();
})();
```

- [ ] **Step 2: Verify star field in browser**

Refresh — animated star particles fill the hero background. Move the mouse — stars should tilt in response.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add js/stars.js
git commit -m "feat: add Three.js mouse-reactive star field"
```

---

## Task 7: GitHub API Projects

**Files:**
- Create: `js/github.js`

- [ ] **Step 1: Create `js/github.js`**

```js
// js/github.js
(function () {
  var GITHUB_USER = 'Chihen-Tai';
  var PINNED = ['chem.github.io', 'polymarket_bot_for_15_min_btc'];

  var FALLBACK_REPOS = [
    { name: 'chem.github.io',               description: 'Chemistry static website',              language: 'HTML',   stargazers_count: 2, html_url: 'https://github.com/Chihen-Tai/chem.github.io' },
    { name: 'polymarket_bot_for_15_min_btc', description: 'A Polymarket market for crypto (risk!!)', language: 'Python', stargazers_count: 2, html_url: 'https://github.com/Chihen-Tai/polymarket_bot_for_15_min_btc' },
  ];

  function renderCard(repo) {
    var isPinned = PINNED.indexOf(repo.name) !== -1;
    var color    = isPinned ? 'sky' : 'indigo';
    return '<a class="bento-block ' + color + ' repo-card" href="' + repo.html_url + '" target="_blank" rel="noopener">'
      + (isPinned ? '<span class="pinned-badge">📌 Pinned</span>' : '')
      + '<span class="b-label">' + (repo.language || 'Code') + ' · ⭐ ' + repo.stargazers_count + '</span>'
      + '<h3 class="b-title">' + repo.name + '</h3>'
      + '<p class="b-sub">' + (repo.description || 'No description') + '</p>'
      + '</a>';
  }

  function renderRepos(repos) {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;
    repos.sort(function (a, b) {
      var aP = PINNED.indexOf(a.name) !== -1 ? 1 : 0;
      var bP = PINNED.indexOf(b.name) !== -1 ? 1 : 0;
      if (bP !== aP) return bP - aP;
      return b.stargazers_count - a.stargazers_count;
    });
    grid.innerHTML = repos.slice(0, 6).map(renderCard).join('');

    var statsEl = document.getElementById('github-stats');
    if (statsEl) statsEl.textContent = repos.length + ' Repos · Pro 🌟';
  }

  fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=updated')
    .then(function (r) { if (!r.ok) throw new Error('API ' + r.status); return r.json(); })
    .then(renderRepos)
    .catch(function () { renderRepos(FALLBACK_REPOS); });

  var style = document.createElement('style');
  style.textContent = [
    '.repo-card { display:block; text-decoration:none; }',
    '.pinned-badge { font-size:0.55rem; color:#aabbff; display:block; margin-bottom:4px; letter-spacing:1px; }',
  ].join('');
  document.head.appendChild(style);
})();
```

- [ ] **Step 2: Verify projects section**

Refresh — Projects section shows repo cards populated from GitHub API. Pinned repos appear first with a 📌 badge. If offline, fallback data renders.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add js/github.js
git commit -m "feat: add GitHub API project cards with fallback"
```

---

## Task 8: GSAP Scroll Animations

**Files:**
- Create: `js/scroll.js`

- [ ] **Step 1: Create `js/scroll.js`**

```js
// js/scroll.js
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.bento-block').forEach(function (block, i) {
    gsap.fromTo(block,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        delay: (i % 3) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  gsap.utils.toArray('.section-label').forEach(function (label) {
    gsap.fromTo(label,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: label, start: 'top 90%' } }
    );
  });
})();
```

- [ ] **Step 2: Verify scroll animations**

Refresh and scroll down. Each bento block should slide up and fade in as it enters view. Section labels slide in from the left.

- [ ] **Step 3: Commit**

```bash
cd /Applications/codes/website
git add js/scroll.js
git commit -m "feat: add GSAP ScrollTrigger bento slide-in"
```

---

## Task 9: Deploy to GitHub Pages

- [ ] **Step 1: Create GitHub repo**

Go to https://github.com/new  
Name: `chihen-tai.github.io` — must be exactly this (lowercase matches username)  
Visibility: **Public** → Create

- [ ] **Step 2: Push**

```bash
cd /Applications/codes/website
git remote add origin https://github.com/Chihen-Tai/chihen-tai.github.io.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Enable GitHub Pages**

Repo Settings → Pages → Source: **Deploy from branch** → `main` / `/ (root)` → Save

- [ ] **Step 4: Verify live site (wait ~60s)**

Open `https://chihen-tai.github.io`  
Expected: Full site loads — boot animation, star field, magic rings, bento grid, sticker sidebars, footer meteors.

- [ ] **Step 5: Push any fixes**

```bash
git add -A && git commit -m "fix: post-deploy adjustments" && git push
```

---

## Post-Launch: Sticker Replacement (User Task)

When you find anime PNG images with transparent backgrounds:

1. Save to `assets/stickers/` as: `about.png`, `projects.png`, `skills.png`, `elden.png`, `contact.png`
2. In `index.html`, replace emoji text inside each `.sticker` button with:
   ```html
   <img src="assets/stickers/about.png" alt="About" width="52" height="52" style="object-fit:contain">
   ```
3. `git add assets/ index.html && git commit -m "feat: anime sticker art" && git push`
