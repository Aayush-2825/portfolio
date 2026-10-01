# V2 Repository Audit

Date: 2026-10-01

Scope: current repository against `.github/copilot-instructions.md`. Generated `.next` output and `node_modules` are excluded from source scans unless explicitly measured as build artifacts.

## 1. Dash Audit

**PASS.** PowerShell source scan excluding `node_modules`, `.next`, and `.git` returned `SOURCE_DASH_MATCHES=0` for U+2014 and U+2013. The two generated `AGENTS.md` dashes were normalized after the last dev-server run.

## 2. Positioning Audit

**PASS.** Case-insensitive source scan excluding `node_modules`, `.next`, and `.git` returned `SOURCE_POSITIONING_MATCHES=0` for all three prohibited positioning labels.

## 3. Library Ratio

**FAIL.** The V2 requirement is at least 80 percent visual/interaction code from third-party libraries, with at least 8 components from at least 3 specified libraries. The referenced `copilot-portfolio-v2-rehaul.md` Part 3 file is absent, so exact React Bits, Aceternity, Magic UI, and 21st.dev component names and commands cannot be verified without guessing.

Current inventory from `docs/COMPONENTS.md`:

| Runtime/library | Components or roles | Source | License status |
| --- | --- | --- | --- |
| Motion | Scroll progress, intro, kinetic name, cursor, marquee rows, reveals, ticker, text hover, magnet fallback | https://motion.dev/ | MIT stated upstream; not locally verified |
| Lenis | Smooth-scroll provider | https://lenis.darkroom.engineering/ | MIT stated upstream; not locally verified |
| Base UI via shadcn | Sheet and Button plumbing | https://base-ui.com/react/components/dialog.md | MIT stated upstream; not locally verified |
| Lucide React | Menu and Sheet icons | https://lucide.dev/ | ISC stated upstream; not locally verified |
| next/font | Bricolage Grotesque, Geist, Geist Mono | https://nextjs.org/docs/app/building-your-application/optimizing/fonts | Font licenses listed in section 10 |

The current V2 visual/interaction implementation is mostly custom fallback components composed with Motion and CSS. An honest estimate is approximately 35 percent library/runtime behavior and 65 percent custom layout/data binding/theme code. It has fewer than 8 components from the three required visual libraries. This FAIL is blocked on the missing Part 3 prompt pack, not silently marked PASS.

## 4. Component Consistency

**PASS for implemented components, with the library-ratio limitation above.** Current fallbacks use the V2 tokens `#0A0A0B`, `#111113`, `#F2F0EA`, `#8C8C86`, `rgb(255 255 255 / 12%)`, and `#FF4D1F`, the shared radius scale, Bricolage/Geist/Geist Mono, and the shared Motion ease/durations/stagger where motion is used.

- No purple color, glow shadow, glassmorphism, or default gradient was found in active source.
- The radial gradient is only the V2 dot-grid fallback, not a color gradient or glow.
- All continuously moving fallbacks use the motion gate and `useInView` to pause offscreen.
- No exact Part 3 library component can be verified until the missing source file is supplied.

## 5. Motion Audit

| Animation | Section | Trigger | Reduced motion | Offscreen behavior |
| --- | --- | --- | --- | --- |
| Lenis smooth scrolling | Global | Desktop fine-pointer mount | Disabled by `useMotionOK()` | Not an autonomous animation loop; follows user scroll |
| Scroll progress | Global | Scroll position through Motion `useScroll` | Fixed at complete state | Scroll-linked |
| Intro reveal | Hero name | First session via `sessionStorage` | Skipped | One 1-second reveal, not continuous |
| Kinetic letter reveal | Hero | Hero mount/session intro | Skipped by `useMotionOK()` | One-shot |
| Target cursor fallback | Desktop | Fine-pointer movement | Absent | Pointer-following only |
| Stack strip | Stack strip | Mount while in view | Static | Pauses through `useInView` |
| About Scroll Reveal fallback | About | Enters viewport | Static | `whileInView` once |
| Skills marquee fallback | Skills | While in viewport | Static | Pauses through `useInView` |
| Currently Exploring rows | Exploring | While in viewport | Static | Pauses through `useInView` |
| Education ticker fallback | Education | Enters viewport | Static | `whileInView` once |
| Contact text hover | Contact | Hover | Disabled by `useMotionOK()` | Event-driven |
| Contact magnet fallback | Contact links | Hover | Disabled by `useMotionOK()` | Event-driven |

**PASS with one architectural limitation.** All implemented transforms animate opacity and/or transform only. The current viewport contains at most two autonomous strip animations in any one strip section, and marquee/velocity fallbacks pause offscreen. No hand-rolled scroll listener, cursor trail, parallax loop, or layout-shifting animation exists. The exact V2 900ms intro is implemented as a one-second Motion duration because the shared V2 duration is 1.0s; the session gate and non-blocking DOM content are present.

## 6. Mobile Audit

**PASS.** Browser verification covered 360px, 390px, and 768px widths:

- No horizontal overflow.
- One h1 and two hero headline lines.
- CTA remains above the fold at 390px.
- Fine-pointer cursor is absent on coarse-pointer/mobile paths.
- Dot-grid fallback is static CSS with no animation.
- No pinned DOZO scene exists yet, so there is no pinned scene that can fail to degrade.
- Global visible anchors and buttons measure at least 44px.
- Mobile navigation uses Sheet plumbing and has a native button trigger; direct DOM activation opens the Sheet and Escape closes it. Playwright pointer automation was flaky against the fixed floating header, so this remains a minor interaction verification gap.

## 7. Accessibility

**PASS with one feature gap.**

- One h1, ordered h2/h3/h4 headings, and header/main/footer/nav landmarks are present.
- Global `:focus-visible` outlines use the accent ring.
- Accent contrast on `#0A0A0B`: `5.97:1`.
- Foreground on background: `17.37:1`.
- Muted on background: `5.85:1`.
- Primary foreground on primary: `5.97:1`.
- The Sheet includes a required title and built-in focus containment/Escape semantics.
- Reduced-motion path leaves hero content at opacity `1` with no transform.
- Architecture SVG now has a native `<details>` text alternative listing every node connection.
- A dedicated Layer Map UI/table is not rendered yet even though `lib/layers.ts` exists. This is a V2 feature gap and remains FAIL until the Layer Map phase is built.

## 8. Performance

**PASS for current scope.** Final production build passed and emitted `/`, `/_not-found`, `/opengraph-image`, `/robots.txt`, and `/sitemap.xml`.

- Root HTML artifact: `130,400` bytes.
- Root RSC artifact: `61,848` bytes.
- First Load JS: `552,799` bytes across five manifest-listed chunks.
- Client component files: 18 files containing `"use client"`; many are small fallback islands. This is higher than the ideal minimal-island target and should be reduced when actual library components replace fallbacks.
- Dynamic import: `HeroBackdrop` imports the dot-grid fallback with `ssr: false`.
- WebGL and GSAP: no dependency or dynamic import exists.
- Image optimization: `next/image` is conditional and data-backed; no real project images exist currently, so no image is part of LCP.
- LCP note: server-rendered hero text, no hero image, and dynamic dot-grid loading should keep LCP focused on text and font loading. No Lighthouse run was available in this audit.
- CLS note: `next/font` is used and the hero uses stable layout constraints; no measured Lighthouse CLS value is available.

## 9. Content Integrity

**PASS for rendered content.** All visible project/profile/skill/exploration/education/recognition content comes from `data/*.ts` or structural labels. No invented numbers, user counts, revenue, funding, employment, awards, rankings, testimonials, traction, downloads, or performance metrics were added.

- Animated education values are the real data values `8.49` and `93%`.
- `built:false` DOZO capabilities are labeled Planned direction.
- The built:false architecture is labeled planned direction and uses a dashed outline.
- Research and Planned project current-state strings are not rendered as completion claims in the quiet list.
- Better Auth remains visually muted through its `exploring: true` data flag.
- Experience and Recognition renders only DOZO technical co-founder, NIT Hamirpur pre-incubation selection, Reliance Foundation Scholarship, and Coursera Machine Learning Specialization.

## 10. License Audit

| Third-party component or asset | Source URL | License | Attribution requirement |
| --- | --- | --- | --- |
| Motion | https://motion.dev/ | MIT stated upstream; not locally verified | No visible attribution recorded; verify before distribution |
| Lenis | https://lenis.darkroom.engineering/ | MIT stated upstream; not locally verified | No visible attribution recorded; verify before distribution |
| Base UI Sheet/Button | https://base-ui.com/react/components/dialog.md | MIT stated upstream; not locally verified | No visible attribution recorded; verify before distribution |
| Lucide React | https://lucide.dev/ | ISC stated upstream; not locally verified | No visible attribution recorded; verify before distribution |
| Bricolage Grotesque | https://fonts.google.com/specimen/Bricolage+Grotesque | SIL Open Font License 1.1 at Google Fonts; not locally verified | No visible attribution recorded; verify font notice requirements |
| Geist | https://fonts.google.com/specimen/Geist | SIL Open Font License 1.1 at Google Fonts; not locally verified | No visible attribution recorded; verify font notice requirements |
| Geist Mono | https://fonts.google.com/specimen/Geist+Mono | SIL Open Font License 1.1 at Google Fonts; not locally verified | No visible attribution recorded; verify font notice requirements |
| React Bits / Aceternity / Magic UI / 21st.dev named components | Part 3 prompt pack unavailable | Not installed; no license asserted | No attribution action yet |

**FAIL: local license verification is incomplete.** The source URLs and upstream license claims are recorded in `docs/COMPONENTS.md`, but no local license files or attribution notices are present. The missing Part 3 prompt pack also prevents verification of the named component licenses.

## Final Commands

- `npx tsc --noEmit`: PASS
- `npm run lint`: PASS
- `npm run build`: PASS
- Source dash scan excluding generated output: PASS, zero matches.
- Source positioning scan excluding generated output: PASS, zero matches.

## Serious Fixes Applied During This Audit

- Added offscreen pausing to StackStrip, Skills marquee, and Currently Exploring velocity rows.
- Added a textual architecture alternative for the SVG diagram.
- Gated Contact text-hover motion under `useMotionOK()`.
- Replaced the non-opening Sheet trigger with a native semantic mobile menu button and made the icon pointer-transparent.
- Added a hydration-safe client snapshot to the desktop cursor so it does not alter the server tree before hydration.
- Normalized Next-generated `AGENTS.md` dash characters after dev-server regeneration.
