# Lenis — Complete Documentation & Showcases

> **"Smooth" in Latin** — Lenis is a lightweight, robust, and performant smooth scroll library by [@darkroom.engineering](https://darkroom.engineering). It standardizes scroll experiences across the web while staying accessible, performant, and easy to integrate.

---

## Table of Contents

1. [What is Lenis?](#what-is-lenis)
2. [Why Use Lenis?](#why-use-lenis)
3. [Installation](#installation)
4. [Required CSS](#required-css)
5. [Basic Usage (Vanilla JS)](#basic-usage-vanilla-js)
6. [Configuration Options](#configuration-options)
7. [Instance Methods](#instance-methods)
8. [Instance Properties](#instance-properties)
9. [Events](#events)
10. [HTML Data Attributes](#html-data-attributes)
11. [scrollTo API](#scrollto-api)
12. [React Integration](#react-integration)
13. [Vue / Nuxt Integration](#vue--nuxt-integration)
14. [GSAP + ScrollTrigger Integration](#gsap--scrolltrigger-integration)
15. [Framer Motion Integration](#framer-motion-integration)
16. [Use Cases & Showcases](#use-cases--showcases)
17. [Tips & Best Practices](#tips--best-practices)

---

## What is Lenis?

Lenis is an open-source JavaScript smooth scroll library built to replace native browser scroll behavior with an inertia-based, butter-smooth alternative. It intercepts scroll events and re-renders them using `requestAnimationFrame`, giving you precise control over scroll velocity, direction, easing, and progress.

Key characteristics:
- **~3KB gzipped** — extremely lightweight
- Uses the **native scrollbar** (no fake scrollbars)
- Compatible with **`position: sticky`** (unlike most alternatives)
- Supports **WebGL sync**, **parallax**, **ScrollTrigger**, and more
- Fully **accessible** and keyboard-friendly
- Works in **Vanilla JS, React, Vue, Nuxt, and Svelte**

---

## Why Use Lenis?

| Feature | Lenis | Native Scroll | Other Libraries |
|---|---|---|---|
| Smooth inertia | ✅ | ❌ | Varies |
| Native scrollbar | ✅ | ✅ | ❌ (usually fake) |
| `position: sticky` | ✅ | ✅ | ❌ |
| Accessibility | ✅ | ✅ | ❌ |
| Bundle size | ~3KB | — | 10–50KB+ |
| Scroll data (velocity, direction) | ✅ | ❌ | Partial |
| GSAP ScrollTrigger compatible | ✅ | ❌ | Partial |

---

## Installation

**npm / yarn / pnpm:**
```bash
npm install lenis
# or
yarn add lenis
# or
pnpm add lenis
```

**CDN (unpkg):**
```html
<script src="https://unpkg.com/lenis@latest/dist/lenis.min.js"></script>
```

**CDN CSS:**
```html
<link rel="stylesheet" href="https://unpkg.com/lenis@latest/dist/lenis.css">
```

---

## Required CSS

Lenis requires a small CSS snippet for correct behavior. You can either import it from the package or add it manually.

**Via import (recommended):**
```js
import 'lenis/dist/lenis.css'
```

**Or manually in your CSS:**
```css
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important; /* prevent conflict with native smooth scroll */
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none; /* prevent iframe scroll conflicts */
}
```

> ⚠️ Some advanced features (like `syncToNative`) require this CSS and modern browsers (Safari > 17.3, Chrome > 116, Firefox > 128).

---

## Basic Usage (Vanilla JS)

### Simplest Setup (auto RAF)
```js
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// autoRaf: true handles the requestAnimationFrame loop automatically
const lenis = new Lenis({
  autoRaf: true,
})

// Listen to scroll events
lenis.on('scroll', (e) => {
  console.log(e)
})
```

### Manual RAF Loop
```js
import Lenis from 'lenis'

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

> Use manual RAF when you need to coordinate the loop with GSAP or Framer Motion.

---

## Configuration Options

All options are passed to `new Lenis({ ... })`.

| Option | Type | Default | Description |
|---|---|---|---|
| `wrapper` | `HTMLElement \| Window` | `window` | The scroll container element |
| `content` | `HTMLElement` | `document.documentElement` | The element whose content will be scrolled (usually the direct child of `wrapper`) |
| `eventsTarget` | `HTMLElement \| Window` | `wrapper` | Element that listens to wheel and touch events |
| `smoothWheel` | `boolean` | `true` | Smooth scroll triggered by the mouse wheel |
| `lerp` | `number` | `0.1` | Linear interpolation intensity (0–1). Lower = smoother but slower |
| `duration` | `number` | — | Scroll animation duration in seconds. Overrides `lerp` |
| `easing` | `function` | `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | Custom easing function. Receives a normalized time `t` (0–1) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Scroll direction |
| `gestureOrientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Direction of gesture detection |
| `touchMultiplier` | `number` | `1` | Multiplier for touch scroll distance |
| `wheelMultiplier` | `number` | `1` | Multiplier for wheel scroll distance |
| `autoRaf` | `boolean` | `false` | Automatically starts the RAF loop internally |
| `autoResize` | `boolean` | `true` | Auto-recalculates sizes on window resize |
| `infinite` | `boolean` | `false` | Enable infinite scroll |
| `overscroll` | `boolean` | `true` | Similar to CSS `overscroll-behavior` |
| `anchors` | `boolean \| ScrollToOptions` | `false` | Smooth scroll to anchor links on click |
| `prevent` | `function` | — | Callback to manually prevent smooth scroll. Return `false` to disable smoothing for a specific event |
| `syncToNative` | `boolean` | `false` | Sync scroll to native browser scroll (requires Lenis CSS + modern browsers) |
| `autoNativeScroll` | `boolean` | `false` | Auto-allow nested scrollable elements to scroll natively. ⚠️ Can hurt performance — prefer `data-lenis-prevent` |
| `naiveDimensions` | `boolean` | `false` | Use naive dimensions calculation |
| `stopInertia` | `boolean` | `false` | Stop inertia when an internal link is clicked |
| `__experimental__naiveDimensions` | `boolean` | — | Experimental naive dimensions mode |

### Example with custom config:
```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
  orientation: 'vertical',
  smoothWheel: true,
  lerp: 0.08,
  touchMultiplier: 2,
  wheelMultiplier: 1,
  autoRaf: true,
})
```

---

## Instance Methods

| Method | Parameters | Description |
|---|---|---|
| `lenis.raf(time)` | `time: number` | Must be called every frame when `autoRaf` is `false`. Pass `performance.now()` or the RAF timestamp |
| `lenis.scrollTo(target, options?)` | See [scrollTo API](#scrollto-api) | Programmatically scroll to a target |
| `lenis.on(event, callback)` | `event: string, cb: Function` | Subscribe to an event |
| `lenis.off(event, callback)` | `event: string, cb: Function` | Unsubscribe from an event |
| `lenis.stop()` | — | Pause/stop the scroll |
| `lenis.start()` | — | Resume the scroll after `stop()` |
| `lenis.destroy()` | — | Destroy the Lenis instance and clean up all listeners |
| `lenis.resize()` | — | Manually recompute internal sizes. Required when `autoResize: false` |

### Example — Stop/Start:
```js
// Disable scroll when a modal opens
function openModal() {
  lenis.stop()
}

// Re-enable when modal closes
function closeModal() {
  lenis.start()
}
```

---

## Instance Properties

After initialization, the following properties are accessible on the Lenis instance:

| Property | Type | Description |
|---|---|---|
| `lenis.scroll` | `number` | Current scroll position (px) |
| `lenis.progress` | `number` | Normalized scroll progress (0–1) |
| `lenis.velocity` | `number` | Current scroll velocity |
| `lenis.direction` | `1 \| -1` | Scroll direction: `1` = down, `-1` = up |
| `lenis.isScrolling` | `boolean` | Whether scroll is currently in motion |
| `lenis.isStopped` | `boolean` | Whether scroll is manually stopped |
| `lenis.limit` | `number` | Max scrollable distance |
| `lenis.dimensions` | `object` | Internal dimension data |

### Example — Reading scroll data:
```js
lenis.on('scroll', ({ scroll, progress, velocity, direction }) => {
  console.log('Position:', scroll)
  console.log('Progress:', progress) // 0 to 1
  console.log('Velocity:', velocity)
  console.log('Direction:', direction) // 1 or -1
})
```

---

## Events

Lenis emits one primary event:

### `scroll`
Fired on every scroll tick. The callback receives a scroll data object:

```js
lenis.on('scroll', (e) => {
  const {
    scroll,      // current scroll position in px
    limit,       // maximum scroll value
    velocity,    // scroll velocity
    direction,   // 1 (down) or -1 (up)
    progress,    // 0 to 1 (normalized position)
  } = e
})
```

---

## HTML Data Attributes

Lenis supports data attributes on HTML elements to control scroll behavior locally without JavaScript.

| Attribute | Effect |
|---|---|
| `data-lenis-prevent` | Prevents Lenis from smoothing scroll on this element (allows native scroll inside) |
| `data-lenis-prevent-wheel` | Prevents Lenis wheel handling on this element only |
| `data-lenis-prevent-touch` | Prevents Lenis touch handling on this element only |

### Example — Modal or custom scrollable area:
```html
<!-- This inner element will scroll natively, not through Lenis -->
<div class="modal-body" data-lenis-prevent>
  <p>Long content inside a modal...</p>
</div>
```

> ⚠️ Prefer `data-lenis-prevent` attributes over `autoNativeScroll: true` for better performance, since the latter checks the DOM on every scroll event.

---

## scrollTo API

`lenis.scrollTo(target, options?)` lets you programmatically scroll to any position.

### Target types:
```js
lenis.scrollTo(0)                  // scroll to top (number)
lenis.scrollTo('#section-id')      // scroll to element by selector
lenis.scrollTo(document.querySelector('#hero')) // DOM element
lenis.scrollTo('top')              // keyword: 'top' | 'bottom' | 'left' | 'right'
```

### Options:
| Option | Type | Default | Description |
|---|---|---|---|
| `offset` | `number` | `0` | Offset in px from the target (positive = further down) |
| `duration` | `number` | from config | Override scroll duration |
| `easing` | `function` | from config | Override easing function |
| `immediate` | `boolean` | `false` | Jump immediately without animation |
| `lock` | `boolean` | `false` | Prevent user from scrolling during the animation |
| `force` | `boolean` | `false` | Force scroll even if target is already in view |
| `onComplete` | `function` | — | Callback when scroll animation finishes |

### Example:
```js
// Scroll to a section with offset, custom duration, and callback
lenis.scrollTo('#about', {
  offset: -80,        // account for fixed navbar height
  duration: 1.5,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  onComplete: () => console.log('Done scrolling!'),
})
```

---

## React Integration

Install the React package:
```bash
npm install lenis
```

### Method 1 — ReactLenis Provider (recommended)
```jsx
// app/layout.jsx or App.jsx
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
```

### ReactLenis Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `root` | `boolean \| 'asChild'` | `false` | When `true`, makes the instance global and uses `<html>` as scroll container. When `'asChild'`, renders wrapper elements for custom scroll containers |
| `options` | `LenisOptions` | — | All Lenis constructor options |
| `ref` | `React.Ref` | — | Ref to access the Lenis instance |

### Method 2 — useLenis Hook
```jsx
import { useLenis } from 'lenis/react'

function MyComponent() {
  // Called on every scroll
  const lenis = useLenis(({ scroll, velocity, direction, progress }) => {
    console.log(scroll, velocity, direction, progress)
  })

  const handleScrollToSection = () => {
    lenis?.scrollTo('#section-id', { duration: 1.5 })
  }

  return <button onClick={handleScrollToSection}>Go to Section</button>
}
```

### Method 3 — Custom Hook with useRef and useEffect
```jsx
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisRef.current.destroy()
    }
  }, [])

  return lenisRef
}
```

### Custom Options in ReactLenis:
```jsx
<ReactLenis
  root
  options={{
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  }}
>
  {children}
</ReactLenis>
```

---

## Vue / Nuxt Integration

```bash
npm install lenis
```

### Vue usage:
```vue
<script setup>
import { VueLenis, useLenis } from 'lenis/vue'

const options = ref({
  smooth: true,
  lerp: 0.1,
  autoRaf: true,
})

const lenis = useLenis()

function scrollToTop() {
  lenis.scrollTo(0, { duration: 1 })
}
</script>

<template>
  <VueLenis root :options="options">
    <slot />
  </VueLenis>
</template>
```

---

## GSAP + ScrollTrigger Integration

This is the most popular Lenis use case — syncing smooth scroll with GSAP-powered animations.

```js
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis
const lenis = new Lenis()

// Sync Lenis scroll position with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Add Lenis's RAF method to GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000) // GSAP time is in seconds, Lenis expects ms
})

// Disable GSAP's lag smoothing to avoid animation delays
gsap.ticker.lagSmoothing(0)
```

### React + GSAP + Lenis:
```jsx
import gsap from 'gsap'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {/* your app */}
    </ReactLenis>
  )
}
```

> ⚠️ When using GSAP ticker, set `autoRaf: false` so both don't run separate loops.

---

## Framer Motion Integration

```jsx
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp
      lenisRef.current?.lenis?.raf(time)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {/* your app */}
    </ReactLenis>
  )
}
```

---

## Use Cases & Showcases

### 1. Site-Wide Smooth Scroll
The most common use case — wrap your entire app with Lenis for a unified smooth scroll feel.

```js
const lenis = new Lenis({ autoRaf: true })
```

---

### 2. Parallax Effects
Use scroll velocity and position to drive parallax layers.

```js
lenis.on('scroll', ({ scroll, velocity }) => {
  document.querySelector('.parallax-bg').style.transform =
    `translateY(${scroll * 0.3}px)`
})
```

---

### 3. Scroll-Driven Number Counter
Trigger counters when a section comes into view using scroll progress.

```js
lenis.on('scroll', ({ progress }) => {
  if (progress > 0.5) {
    animateCounters() // your animation function
  }
})
```

---

### 4. Programmatic Navigation (Navbar)
Smooth navigation between sections using a sticky navbar.

```js
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const target = link.getAttribute('href')
    lenis.scrollTo(target, {
      offset: -80,
      duration: 1.2,
    })
  })
})
```

---

### 5. Scroll Progress Bar
Drive a progress indicator based on `lenis.progress`.

```js
const progressBar = document.querySelector('.progress-bar')

lenis.on('scroll', ({ progress }) => {
  progressBar.style.width = `${progress * 100}%`
})
```

---

### 6. WebGL / Three.js Sync
Lenis is ideal for syncing 3D canvas content with page scroll.

```js
lenis.on('scroll', ({ scroll, limit }) => {
  const normalized = scroll / limit // 0 to 1
  camera.position.z = THREE.MathUtils.lerp(0, 10, normalized)
})
```

---

### 7. Infinite Scroll Loop
Create an infinite vertical or horizontal scroll experience.

```js
const lenis = new Lenis({
  infinite: true,
  orientation: 'vertical',
  autoRaf: true,
})
```

---

### 8. Horizontal Scroll
```js
const lenis = new Lenis({
  orientation: 'horizontal',
  gestureOrientation: 'both', // respond to both axes
  autoRaf: true,
})
```

---

### 9. Stopping Scroll on Modal Open
```js
function openModal() {
  modal.classList.add('open')
  lenis.stop() // freeze smooth scroll
}

function closeModal() {
  modal.classList.remove('open')
  lenis.start() // resume
}
```

---

### 10. Nested Scroll Container (e.g., Drawer)
Create a secondary Lenis instance for a nested scrollable area:

```js
const drawerLenis = new Lenis({
  wrapper: document.querySelector('.drawer'),
  content: document.querySelector('.drawer-content'),
  autoRaf: true,
})
```

---

### 11. Slow Down Scroll on a Specific Axis
Use the `prevent` callback to modify events before they're processed:

```js
const lenis = new Lenis({
  prevent: (e) => {
    e.deltaY /= 2 // slow down vertical scroll
  },
  autoRaf: true,
})
```

---

### 12. Disable Smooth Scroll on Shift+Scroll
```js
const lenis = new Lenis({
  prevent: ({ event }) => !event.shiftKey, // return false → no smooth scroll
  autoRaf: true,
})
```

---

## Tips & Best Practices

### ✅ Always import the CSS
```js
import 'lenis/dist/lenis.css'
```
Without it, some features like `data-lenis-prevent` and native sync won't work correctly.

### ✅ Destroy on unmount (React)
```js
useEffect(() => {
  const lenis = new Lenis({ autoRaf: true })
  return () => lenis.destroy() // prevent memory leaks
}, [])
```

### ✅ Prefer `data-lenis-prevent` over `autoNativeScroll`
`autoNativeScroll` checks the DOM on every scroll event and can hurt performance on complex pages. Add `data-lenis-prevent` directly to nested scroll elements instead.

### ✅ Set `autoRaf: false` when using GSAP or Framer Motion
These animation libraries manage their own RAF loops. Having two loops running simultaneously causes drift and jank.

### ✅ Use `lerp` for a more "organic" feel
A `lerp` of `0.06–0.10` gives a very smooth, slow-catching feel. Use `duration` + `easing` for more predictable, designed scroll behavior.

### ✅ For a premium agency feel (your use case)
```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
  smoothWheel: true,
  orientation: 'vertical',
  autoRaf: true,
})
```

---

## Resources

- 🔗 [GitHub Repository](https://github.com/darkroomengineering/lenis)
- 🌐 [Official Website](https://lenis.darkroom.engineering)
- 📦 [npm Package](https://www.npmjs.com/package/lenis)
- 📖 [React README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)
- 🎨 [Showcase Gallery](https://lenis.darkroom.engineering/showcase)

---

*Documentation compiled from the official Lenis GitHub README, React package docs, npm registry, and community resources.*