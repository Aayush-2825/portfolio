# Open GSD Roadmap — Award-Winning Developer Portfolio Redesign

**Project**: Aayush Raj Portfolio — High-Density Blueprint-Editorial Showcase  
**Branch**: `main`  
**Framework**: Open GSD (Git. Ship. Done.)  
**Updated**: 2026-11-09  

---

## Roadmap Overview & Milestones

| Milestone | Focus | Stories | Status | Target Delivery |
|---|---|---|---|---|
| **Milestone 1** | Groundwork & Baseline Integrity | US-001 – US-008 | **COMPLETED** | 2026-11-09 |
| **Milestone 2** | Award-Winning Showcase Redesign | US-009 – US-016 | **ACTIVE / READY** | 2026-11-09 |

---

## Milestone 2: Award-Winning Showcase Redesign

Milestone 2 elevates the portfolio into a benchmark-grade engineering capability showcase built on an 8-Act narrative structure, interactive project simulators for all 5 genuine systems, high-density terminal tooling, and Emil Kowalski motion choreography.

```
Milestone 2 Phased Execution Architecture:
Phase 1 (Story US-009) ───────► Visual Storytelling & Narrative Architecture
Phase 2 (Stories US-010..014) ► Authentic Project Showcase Deep-Dives (DOZO, ViewProof, pjmb, Swabhimaan-2, Blog)
Phase 3 (Story US-015) ───────► High-Density Interactive Components & Terminal Drawer
Phase 4 (Story US-016) ───────► Motion Choreography & Kinetic Polish
Phase 5 (Story US-016) ───────► Verification, Accessibility, Build & Deployment Gate
```

---

### Phase 1: Visual Storytelling & Narrative Architecture
**Objective**: Establish the 8-Act narrative arc, monumental kinetic typography, real-time IST telemetry, and academic credentials.

- **Act I: Arrival & Telemetry Bar**:
  - Live IST timestamp (`Asia/Kolkata`) with emerald live-pulse semaphore (`#10B981`).
  - Academic & institutional credentials: NIT Hamirpur Computer Science (Dual Degree, CGPA 8.49) and Reliance Foundation Scholar.
  - Monumental kinetic hero name using `Bricolage Grotesque` (`clamp(2.4rem, 7.2vw, 7.6rem)` with `tracking-[-0.04em]` and `leading-[0.88]`).
  - Tactile primary action buttons with `:active` scale (`scale(0.97)`).
- **8-Act Narrative Flow Hierarchy**:
  1. *Act I*: Hero, IST Telemetry & Academic Identity
  2. *Act II*: Flagship Startup Showcase (DOZO Real-Time Dispatch)
  3. *Act III*: Authentic Engineering Portfolio (ViewProof, pjmb, Swabhimaan-2, Engineering Blog)
  4. *Act IV*: Full-Stack Systems Layer Matrix (Interface, Gateway, Persistence, Realtime, Security, Infra)
  5. *Act V*: Principles Lab (Naive vs Production Trade-Offs)
  6. *Act VI*: Technical Stack & Competency Matrix
  7. *Act VII*: Academic Pedigree & Honors (NIT Hamirpur, Reliance Foundation Scholarship)
  8. *Act VIII*: Command Shell & Direct Contact Channel
- **Story Mapping**: `US-009`

---

### Phase 2: Authentic Project Showcase Deep-Dives
**Objective**: Build rich, interactive case studies and simulators for all five genuine engineering projects with zero fabricated metrics or placeholder text.

- **Phase 2.1: DOZO Flagship Startup Deep-Dive**:
  - Real-time on-demand local services platform connecting users with verified helpers in under 10 minutes.
  - Interactive multi-step dispatch simulator: Consumer request -> Fastify 5 schema validation -> Redis OTP storage -> PostgreSQL row-level serializable allocation -> WebSocket helper stream.
  - Accurate metadata: Selected for 3-month pre-incubation program at NIT Hamirpur; live at `https://dozo.work`; repo at `https://github.com/Aayush-2825/dozo`.
  - **Story Mapping**: `US-010`

- **Phase 2.2: ViewProof Real-Time Proofing & Dynamic Watermark Simulator**:
  - Photography client proofing platform built on React 19, React Router 7, Vite 7, Firestore, and Cloudinary.
  - Interactive proofing simulator demonstrating real-time photo approval counter (e.g. "8/10 approved") via Firestore `onSnapshot` listeners and Cloudinary dynamic on-the-fly watermarking (`l_watermark_logo,g_center,opacity_40`).
  - Links to public GitHub repository (`https://github.com/Aayush-2825/ViewProof`) and published DEV.to technical case study.
  - **Story Mapping**: `US-011`

- **Phase 2.3: pjmb Authentication Backend & Security Simulator**:
  - Production-grade authentication microservice built on Express 5, MongoDB, Mongoose, Passport.js, Speakeasy, and Helmet.
  - Security simulator: Interactive visualization of rotating refresh token families, token replay compromise detection, and Speakeasy TOTP 2FA validation with single-use recovery codes.
  - Documented security invariants: 10-minute lockout after 5 failed 2FA attempts, tiered token-bucket rate limits, Winston log rotation at 5MB, Jest/Supertest suite.
  - Link to public repository (`https://github.com/Aayush-2825/pjmb`).
  - **Story Mapping**: `US-012`

- **Phase 2.4: Swabhimaan-2 Embedded Payload CMS & Cloudflare R2 Visualizer**:
  - Community content and periodical platform for Project Swabhimaan (Dumaria block, Jharkhand).
  - Built on Next.js 15.5.9 with Turbopack, React 19, embedded Payload CMS 3.64 with Lexical editor, MongoDB, and zero-egress Cloudflare R2 object storage (`region: "auto"`).
  - Visualizer showing 13 structured collections, Sharp image processing pipeline, and streaming PDF periodical reader.
  - Links to live production deployment (`https://swabhimaan-2.vercel.app`) and GitHub repo (`https://github.com/Aayush-2825/Swabhimaan-2`).
  - **Story Mapping**: `US-013`

- **Phase 2.5: Engineering Blog Relational Data Flow & Systems Matrix**:
  - Technical publication platform featuring statically pre-rendered markdown articles, relational data modeling with Prisma ORM 6.6 on PostgreSQL, and Kinde Auth OAuth.
  - Data flow diagram showing Kinde Auth session token linking to `BlogPost` authoring, while public readers serve statically cached HTML.
  - Link to GitHub repository (`https://github.com/Aayush-2825/blog`).
  - **Story Mapping**: `US-014`

---

### Phase 3: High-Density Interactive Components & Terminal Drawer
**Objective**: Build high-signal engineering workbenches that technical recruiters and hiring managers can query directly.

- **Developer CLI Shell (`TerminalDrawer.tsx`)**:
  - Global hotkey toggle using backtick (`` ` ``) or Cmd+K quick action.
  - History stack (Up/Down arrow navigation), tab completion, and instant execution (<50ms).
  - Commands: `help`, `whoami`, `projects`, `github`, `dozo`, `viewproof`, `pjmb`, `swabhimaan`, `blog`, `stack`, `simulate`, `contact`, `clear`.
- **Project Architectural Dossier Modal (`ProjectSchematics.tsx`)**:
  - Accessible modal dialog triggered from project cards with Escape key listener and focus trapping.
  - Tabbed inspection: Architecture Topology, Data Flow, Decision Trade-offs, Live Endpoints, and GitHub Repositories.
- **Full-Stack Systems Layer Matrix (`LayerMatrix.tsx`)**:
  - 6-tier architecture breakdown: Interface, API Gateway, Persistence, Realtime, Security, Infrastructure.
  - Interactive tier filtering showing real production code snippets and active project tags.
- **Engineering Principles Lab (`PrinciplesLab.tsx`)**:
  - Side-by-side interactive code comparisons: Naive tutorial patterns vs Hardened production patterns (e.g., Polling vs WebSockets, Unguarded Tokens vs Token Families, Client-side Watermarks vs Cloudinary Transforms).
- **Story Mapping**: `US-015`

---

### Phase 4: Motion Choreography & Kinetic Polish
**Objective**: Implement invisible interaction polish following Emil Kowalski, Rauno Freiberg, and Dennis Snellenberg benchmarks.

- **Lenis Smooth Inertial Scrolling**:
  - Configured with `autoRaf: true`, `syncTouch: false` (to preserve native touch momentum on iOS/Android), `offset: -60`, `duration: 1.1`.
- **Emil Kowalski Motion Curves**:
  - Standard UI transition duration: 150ms-250ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
  - Button press feedback: `:active` state with `scale(0.97)` over 160ms ease-out.
  - Entrances: Always start from `scale(0.96)` with `opacity: 0` (never `scale(0)`).
  - Keyboard interactions: Instant execution (<50ms) with zero transition lag.
- **Web Audio Sound Engine (`lib/sound.ts`)**:
  - Synthesized micro-clicks (800Hz-1400Hz oscillator bursts, <0.03 volume) with zero audio assets.
  - User-gesture unlocked AudioContext and global sound toggle with persistence.
- **Reduced-Motion Compliance**:
  - All transforms, spring physics, and marquee movements gated behind `useMotionOK()` to immediately disable animations when `prefers-reduced-motion` is detected.
- **Story Mapping**: `US-016`

---

### Phase 5: Verification, Accessibility, Build & Deployment Gate
**Objective**: Enforce zero-defect production quality backpressure checks before release.

- **TypeScript Typecheck**:
  - `npx tsc --noEmit` must pass with 0 errors across all `.ts` and `.tsx` files.
- **Next.js Production Build**:
  - `npm run build` (`next build --webpack`) must compile cleanly in <15s and pre-render all 7 static routes (`/`, `/_not-found`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`).
- **ESLint Code Quality**:
  - Zero syntax errors; clean up all 43 unused import/variable warnings across components.
- **Accessibility & Contrast**:
  - Strict WCAG AAA compliance: `#F2F0EA` text on `#0A0A0B` (14.68:1); `#FF4D1F` accent on `#0A0A0B` (6.48:1).
  - Accessible touch targets: Minimum 44px x 44px for all interactive buttons and links.
- **Responsive Layout Integrity**:
  - Zero horizontal overflow (CLS = 0) verified across 360px, 390px, 768px, 1024px, and 1440px+ viewports.
- **Story Mapping**: `US-016`

---

## Historical Milestone Log (Milestone 1: Completed)

| Story ID | Title | Scope | Result | Commit |
|---|---|---|---|---|
| `US-001` | Ground Data & Real GitHub Repositories | Verified GitHub links for viewproof, pjmb, Swabhimaan-2, blog; zero unverified TODOs | PASSED | `4c8d50b` |
| `US-002` | Fluid Spring-Driven Cursor & Micro-Interactions | Custom TargetCursor with contextual pills, mobile suppression, and useSyncExternalStore | PASSED | `0c39f28` |
| `US-003` | Architectural Grid Crosshairs & Registration Marks | Hairline grid borders with corner '+' marks matching #0A0A0B and white/10% | PASSED | `9cfd537` |
| `US-004` | Enhanced DOZO Realtime Dispatch Simulator | Multi-step booking state machine, animated SVG telemetry bus, packet audio | PASSED | `9cfd537` |
| `US-005` | Interactive Full-Stack Layer Matrix | 6-tier architecture breakdown with real code dossiers and project badges | PASSED | `9cfd537` |
| `US-006` | Project Architectural Inspector Modal | Tabbed architectural dossier dialog with trade-offs, challenges, and repo links | PASSED | `9cfd537` |
| `US-007` | Command Palette & Terminal Quick Access Polish | Cmd+K navigation palette and backtick terminal drawer with GitHub direct links | PASSED | `9cfd537` |
| `US-008` | Production Verification & Performance Audit | Build check, static route emission, zero horizontal overflow at 360px | PASSED | `e603851` |
