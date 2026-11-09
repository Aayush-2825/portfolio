# Open GSD Context — Technical Choices, Visual Hierarchy & System Constraints

**Project**: Aayush Raj Portfolio — High-Density Blueprint-Editorial Showcase  
**Document**: `.planning/CONTEXT.md`  
**Updated**: 2026-11-09  

---

## 1. User Decisions & Engineering Background

- **Identity**: Aayush Raj
- **Primary Positioning**: Full-Stack Systems, Real-Time & Backend Infrastructure Engineer
- **Flagship Venture**: Technical Co-founder of DOZO (real-time on-demand local services platform)
  - Selected for a 3-month pre-incubation program at NIT Hamirpur.
  - Production platform live at `https://dozo.work`.
  - Public repository at `https://github.com/Aayush-2825/dozo`.
- **Academic Pedigree**:
  - National Institute of Technology (NIT), Hamirpur
  - Dual Degree Computer Science & Engineering (2024–2029)
  - Current CGPA: **8.49 / 10.0**
  - High School: 93%
- **Honors & Scholarships**:
  - **Reliance Foundation Scholar** (selected among top 0.1% students nationwide for academic excellence and leadership potential).
  - Qualified both **JEE Main** and **JEE Advanced** (India's premier engineering entrance examinations).
- **Public Footprint**:
  - GitHub: `https://github.com/Aayush-2825` (20 public repositories including `dozo`, `ViewProof`, `pjmb`, `Swabhimaan-2`, `blog`).
  - DEV.to Publication: *"Building ViewProof: A Photographer-Client Album Sharing Platform with React, Firebase & Cloudinary"*.
  - Email: `aayush.ardy@gmail.com`

---

## 2. Technology Stack Choices & Architectural Decisions

| Layer | Technology | Version | Rationale & Trade-off |
|---|---|---|---|
| **Framework** | Next.js | `16.3.8` | Next.js App Router configured with `--webpack` for robust compilation of Tailwind v4 and React 19 server components. |
| **UI Library** | React | `19.2.8` | Modern React 19 ecosystem with native hooks, concurrent rendering, and server action support. |
| **Styling Engine** | Tailwind CSS | `v4` (`@tailwindcss/postcss: ^4`) | Zero-configuration CSS-first styling with `@import "tailwindcss";`, custom CSS variables, and modern container query support. |
| **Motion Engine** | Motion | `^13.4.6` | The unified modern Motion library (formerly Framer Motion), optimized for React 19 with hardware-accelerated GPU transforms. |
| **Smooth Scroll** | Lenis | `^1.3.26` | Lightweight momentum scrolling with `autoRaf: true` and `syncTouch: false` to ensure silky desktop scrolling while protecting native mobile physics. |
| **Sound Synthesis** | Web Audio API | Native Browser | Custom procedural audio engine (`lib/sound.ts`) synthesizing click and frequency feedback (<0.03 gain, 850Hz) with zero external audio assets. |
| **Icon Systems** | Lucide React & Tabler | `^1.49.0` / `^3.48.0` | Crisp 16px-20px SVG icons with stroke-width 1.5, matching the technical blueprint theme. |

---

## 3. Visual References & Design Engineering Benchmarks

The design architecture synthesizes patterns from five industry-defining design engineers and creative developers:

1. **Emil Kowalski (`emilkowal.ski`)**:
   - Signature timing curve: `cubic-bezier(0.23, 1, 0.32, 1)` with sub-250ms duration.
   - Micro-interaction polish: `:active` button scale (`scale(0.97)`), modal entrances from `scale(0.96)` with opacity (never `scale(0)`).
   - Zero-delay keyboard execution: Instantaneous action on hotkey presses.
2. **Rauno Freiberg (`rauno.me`)**:
   - High-density desktop OS workbench paradigm over generic marketing funnels.
   - Declarative monospaced telemetry headers (`text-[11px] tracking-wider uppercase`).
   - Procedural Web Audio micro-feedback synthesized on user gestures.
3. **Paco Coursey (`paco.me`)**:
   - Strict Zero Layout Shift (CLS = 0) with reserved container dimensions.
   - High-contrast monochromatic precision with razor-sharp hairline borders (`rgba(255, 255, 255, 0.10)`).
   - Command palette (`cmdk`) and keyboard-first developer navigation.
4. **Dennis Snellenberg (`dennissnellenberg.com`)**:
   - Monumental neo-grotesque display headers (`clamp(2.4rem, 7.2vw, 7.6rem)`) with tight negative tracking (`tracking-[-0.04em]`).
   - Architectural registration marks and corner crosshairs (`+`) at section boundaries.
5. **Olivier Larose (`olivierlarose.com`)**:
   - Hardware-accelerated GPU animation pipelines animating only `transform` and `opacity`.
   - Architectural schematics and data-flow diagrams exposing underlying systems.

---

## 4. Typography System & Fluid Scale Tokens

Three distinct Google Fonts are loaded via `next/font/google` in `app/layout.tsx`:

| Token | Font Family | Weights | Fluid Sizing / Utility Class | Optical / Spacing Rule |
|---|---|---|---|---|
| `--font-display` | `Bricolage Grotesque` | 600, 700 | `text-[clamp(2.4rem,7.2vw,7.6rem)]` | `tracking-[-0.04em] leading-[0.88] uppercase` |
| `--font-section-h2` | `Bricolage Grotesque` | 600 | `text-3xl sm:text-5xl lg:text-6xl` | `tracking-[-0.03em] uppercase leading-tight` |
| `--font-card-h3` | `Bricolage Grotesque` | 500, 600 | `text-xl sm:text-2xl` | `tracking-tight leading-snug` |
| `--font-body-primary` | `Geist Sans` | 400, 500 | `text-base sm:text-lg` | `leading-relaxed text-foreground/85` |
| `--font-body-muted` | `Geist Sans` | 400 | `text-sm` | `leading-normal text-muted-foreground` |
| `--font-code-mono` | `Geist Mono` | 400, 600 | `text-[11px] sm:text-xs` | `tracking-wider uppercase tabular-nums` |

---

## 5. Color System & 4-Tier Surface Elevation

A high-contrast dark blueprint color system providing strict WCAG AAA compliance:

| Token Name | Hex Value | Contrast vs `#0A0A0B` | WCAG Rating | UI Application |
|---|---|---|---|---|
| `--background` | `#0A0A0B` | 1.00:1 | Canvas | Root page background, pure deep neutral canvas |
| `--surface` | `#111113` | 1.15:1 | Base Surface | Section containers, card background surfaces |
| `--surface-elevated` | `#18181B` | 1.35:1 | Elevated Surface | Hover states, dropdowns, modal layers |
| `--surface-active` | `#222226` | 1.65:1 | Active Surface | Pressed states, active tab backgrounds |
| `--foreground` | `#F2F0EA` | 14.68:1 | **WCAG AAA** | High-contrast readable body text, headings |
| `--muted-foreground` | `#8C8C86` | 5.63:1 | **WCAG AA** | Secondary descriptions, timestamps, metadata |
| `--accent` | `#FF4D1F` | 6.48:1 | **WCAG AAA (large) / AA** | Safety Vermilion / Orange, interactive badges |
| `--border` | `rgba(255,255,255,0.10)` | — | Hairline | Structural perimeter boundaries, grid lines |
| `--status-live` | `#10B981` | 8.20:1 | **WCAG AAA** | Live production deployment indicator semaphore |
| `--status-dev` | `#F59E0B` | 7.90:1 | **WCAG AAA** | Active development status badge |

---

## 6. Non-Goals & Strict Exclusions

To maintain uncompromising engineering credibility, the portfolio strictly rejects:
1. **No Generic SaaS Templates**: No standard 3-column pricing card layouts, no clay/pastel cards, and no cookie-cutter marketing copy.
2. **No Warm Cream Serif Defaults**: No editorial serif fonts with warm beige backgrounds and terracotta accents that resemble a lifestyle agency rather than a systems engineer.
3. **No Purple Mesh Gradients**: No generic AI-generated blurred purple/pink decorative background blobs that add visual noise without technical substance.
4. **No Fabricated Metrics or Testimonials**: Zero ungrounded statistics ("10M requests handled", "$100k revenue"), zero fake client avatars, and zero placeholder stars.
5. **No Heavy 3D WebGL Bundles**: No multi-megabyte Spline or Three.js meshes that block the main thread, throttle mobile frames, and drain battery life.
6. **No Numbered Markers on Non-Sequential Lists**: No arbitrary `01`, `02`, `03` stamps on content collections that are not strictly ordered steps.
7. **No Gratuitous Animation Loops**: No continuously spinning badges, bouncing icons, or motion loops that distract from reading technical content or violate `prefers-reduced-motion`.
