# Project: Aayush Raj portfolio (V2 rehaul)

Positioning: Full-Stack Developer. Supporting credential: Technical Co-founder of DOZO. Avoid prohibited AI positioning labels for him anywhere.

## Creative concept: "The Full Stack, Literally"
A dark, high-contrast, blueprint-editorial page. Giant kinetic type, a visible engineering grid with section indices, and one signature interaction: a Layer Map that shows which layer of the stack (Interface, API, Data, Realtime, Security, Infrastructure) each real project touches. The page proves full-stack breadth by showing it, derived from real project data.

## Design dials
DESIGN_VARIANCE: 8   (asymmetric layouts, oversized type, unexpected section rhythm)
MOTION_INTENSITY: 7  (clear, deliberate motion on entrance, scroll and hover; never on everything at once)
VISUAL_DENSITY: 6    (rich, but every block earns its space)

## Stack
- Next.js App Router, React, TypeScript strict, Tailwind CSS
- Animation: Motion (`motion/react`) is the default. GSAP + ScrollTrigger is allowed ONLY for the pinned DOZO case-study scene if the chosen library component requires it. Lenis for smooth scrolling. No Lottie, Rive, Three.js written by hand.
- WebGL/canvas is allowed ONLY through a library component (React Bits or Aceternity), ONE instance, hero background only, lazy-loaded.
- Fonts (max 3) via next/font: display = Bricolage Grotesque, body = Geist, mono = Geist Mono.

## Library-first rule (most important)
- At least 80 percent of visual and interaction code must come from third-party libraries: React Bits, Aceternity UI, Magic UI, 21st.dev. Use at least 8 distinct library components from at least 3 different libraries.
- shadcn/ui and Radix are allowed for accessible plumbing only (dialog, sheet, tooltip, focus management). Do not build section visuals from plain shadcn cards.
- Custom code is limited to: data binding, layout glue, the Layer Map logic, and theme adaptation.
- Install via the component page's own command. Common patterns: `npx shadcn@latest add @aceternity/<name>`, `npx shadcn@latest add @magicui/<name>`, `npx shadcn@latest add @react-bits/<Name>-TS-TW`, `npx shadcn@latest add "https://21st.dev/r/<author>/<name>"`. Verify the exact command on the component page. Never guess a URL, registry name, or license. If a component cannot be found, use the listed fallback and log it.
- Log every component in docs/COMPONENTS.md: section, component, library, source URL, license, dependencies added, adaptation notes.
- Adapt every library component to our tokens (colors, radius, border, fonts) and our motion presets. No component may keep its default gradient, purple, or glow.

## Visual system (one theme, dark only)
- background #0A0A0B, surface #111113, foreground #F2F0EA, muted #8C8C86, border rgba(255,255,255,0.12), accent #FF4D1F (single accent, used for focus rings, hover fills, status text, cursor).
- Type: display uppercase or tight mixed case, heavy weight, tracking -0.03em, sizes up to clamp(3.5rem, 13vw, 14rem) for the name. Body 16-18px. Mono for indices, labels, status.
- Structure: a visible 12-column grid with hairline borders, section index labels ("01 / WORK"), corner ticks. Subtle grain overlay at max 4 percent opacity (CSS/SVG noise only).
- Forbidden: purple or blue gradients, blobs, glassmorphism, glow shadows, gradient text, particles, fake terminals, fake dashboards, floating laptops, robots, decorative status dots, generic bento everywhere.

## Motion system
- lib/motion.ts: one ease (cubic-bezier(0.22, 1, 0.36, 1)), durations 0.3 / 0.6 / 1.0 s, stagger 0.06.
- Global: Lenis smooth scroll, scroll progress line, small custom cursor (desktop fine-pointer only), one 900 ms intro name reveal once per session.
- Per-section behavior is defined in the phase prompts. Animate transform and opacity only. No layout-shifting animations.
- Max 2 continuously animating elements in the viewport at once. Pause marquees and canvases when offscreen (IntersectionObserver).
- One hook `useMotionOK()` combines prefers-reduced-motion and coarse-pointer checks. Under reduced motion: no intro, no marquee movement, no pinned scenes, no cursor, no WebGL, instant reveals.
- Mobile: no custom cursor, static hero grid, pinned scenes become normal stacked content, slower marquees.

## Content integrity (unchanged, hard rules)
- Use only facts in data/*.ts. Skip any string starting with TODO(aayush). List them in docs/CONTENT_TODO.md.
- Never invent users, revenue, funding, employment, awards, metrics, testimonials, traction, stars, downloads.
- Status labels only: LIVE, IN_PROGRESS, RESEARCH, EXPERIMENTAL, PLANNED. No fake screenshots, dashboards, or terminals. No real image means a type-only treatment.
- Numbers shown in animation (count-ups) must be real values from data (CGPA 8.49, Class 12 93%). Never animate invented metrics.
- features with built:false are labelled as planned or direction. Architecture diagrams with built:false use dashed lines and the label from the data.

## Hero discipline
- Headline max 2 lines at every breakpoint: "AAYUSH RAJ" then "FULL-STACK DEVELOPER".
- Subtext from profile.heroSubtext, max 20 words.
- Primary CTA "View Projects" visible without scrolling at 1366x768 and 390x844.

## Performance and accessibility
- Server Components by default, small client islands. Dynamic import with ssr:false for canvas/WebGL and GSAP scenes.
- next/image with real alt text. LCP under 2.5 s, CLS under 0.1, no layout shift from fonts.
- One h1, ordered headings, landmarks, 4.5:1 contrast (verify the accent on the dark background, and use accent text only at large sizes if it fails), visible focus rings, keyboard-operable menus.
- Never use U+2014 or U+2013. Use a hyphen.

## Definition of done
build, lint and tsc pass, no horizontal scroll at 360px, no console errors, every library component logged in COMPONENTS.md with license.