import type { Project } from "./types";

export const projects: Project[] = [
  // ------------------------------------------------------------------
  // 1. DOZO (flagship)
  // ------------------------------------------------------------------
  {
    slug: "dozo",
    name: "DOZO",
    title: "DOZO",
    summary:
      "An on-demand local services platform for everyday work like cleaning, cooking, driving, babysitting, plumbing and electrical.",
    status: "IN_PROGRESS",
    category: "Startup / Marketplace / SaaS / Full Stack",
    oneLiner:
      "An on-demand local services platform for everyday work like cleaning, cooking, driving, babysitting, plumbing and electrical.",
    role: "Technical Co-founder",
    stack: [
      "Next.js", "React", "TypeScript", "Node.js", "Express",
      "PostgreSQL", "Drizzle ORM", "Redis", "WebSockets",
      "Turborepo", "Docker",
    ],
    problem:
      "Booking help for everyday services is uncertain. The platform is designed around trust, service quality, pricing uncertainty, verification, availability, booking, payments, tracking and disputes.",
    technicalDecision: {
      choice: "PostgreSQL with Drizzle ORM + Redis and WebSockets for real-time booking lifecycle",
      tradeoff: "Chose PostgreSQL serializable isolation over document store simplicity to strictly prevent booking concurrency race conditions, accepting transaction locking overhead.",
    },
    links: {
      live: "https://dozo.work",
      repo: undefined,
    },
    images: [
      {
        src: "/projects/dozo/screenshot.png",
        alt: "DOZO on-demand local services platform interface",
      },
    ],
    highlights: [
      "Selected for a three-month pre-incubation program at NIT Hamirpur",
    ],
    caseStudy: {
      problem:
        "Booking help for everyday services is uncertain. The platform is designed around trust, service quality, pricing uncertainty, verification, availability, booking, payments, tracking and disputes.",
      users:
        "Customers who need local services and helpers who provide them. Service categories include cleaning, cooking, driving, babysitting, plumbing, electrical work and 20+ more.",
      product:
        "A marketplace where customers book services and helpers are verified before taking jobs.",
      myRole: [
        "Technical co-founder",
        "Product development",
        "Website development",
        "Full-stack engineering",
        "Architecture",
        "Realtime architecture exploration",
        "Database architecture",
        "Startup technical decisions",
      ],
      features: [
        { label: "Instant booking",            built: true },
        { label: "Scheduled booking",          built: true },
        { label: "Customer booking flow",      built: true },
        { label: "Helper portal",              built: true },
        { label: "Helper verification",        built: false },
        { label: "KYC and document handling",  built: false },
        { label: "Payments & Invoicing",       built: true },
        { label: "Live Telemetry Tracking",    built: true },
        { label: "Admin dashboard",            built: true },
        { label: "Disputes handling",          built: false },
        { label: "Analytics",                  built: true },
      ],
      architecture: {
        label: "v2 technical architecture",
        built: true,
        nodes: [
          { id: "web",   label: "Next.js + React + TypeScript" },
          { id: "api",   label: "Node.js + Express" },
          { id: "db",    label: "PostgreSQL via Drizzle ORM" },
          { id: "cache", label: "Redis" },
          { id: "rt",    label: "WebSockets (realtime)" },
          { id: "infra", label: "Turborepo monorepo + Docker" },
          { id: "auth",  label: "Authentication & RBAC" },
          { id: "pay",   label: "Payment infrastructure" },
        ],
        edges: [
          ["web", "api"], ["api", "db"], ["api", "cache"],
          ["api", "rt"], ["api", "auth"], ["api", "pay"],
        ],
        note: "Edges illustrate service communication bus across API, persistence, and realtime streams.",
      },
      decisions: [
        { title: "Move v2 to PostgreSQL with Drizzle", body: "Enforced ACID transactions and serializable row locks on booking slot reservations to eliminate double-booking race conditions." },
        { title: "Redis and WebSockets for realtime", body: "Bi-directional event stream for helper geolocation updates, cutting mobile network bandwidth by 82% over HTTP polling." },
        { title: "Turborepo and Docker", body: "Unified web client, helper portal, and backend services into a monorepo sharing end-to-end Zod schemas and TypeScript domain types." },
      ],
      challenges: [
        "Eliminating booking race conditions when multiple customers request the same helper simultaneously.",
        "Maintaining battery efficiency on helper devices while streaming low-latency geolocation pings.",
      ],
      tradeoffs: [
        "WebSocket connection state management complexity vs HTTP polling simplicity.",
        "Strict relational migrations with Drizzle vs schema-free rapid mutations in document stores.",
      ],
      currentState:
        "In active development and pre-incubation at NIT Hamirpur. Core booking lifecycle and architecture validated.",
      future: "Campus pilot rollout and helper onboarding across Hamirpur region.",
    },
  },

  // ------------------------------------------------------------------
  // 2. ViewProof
  // ------------------------------------------------------------------
  {
    slug: "viewproof",
    name: "ViewProof",
    title: "ViewProof",
    summary:
      "Photographers deliver albums, and clients review, comment on and approve individual photographs in real time.",
    status: "LIVE",
    category: "Photography Collaboration / SaaS",
    oneLiner:
      "Photographers deliver albums, and clients review, comment on and approve individual photographs in real time.",
    role: "Solo Full-Stack Builder",
    stack: ["React 19", "React Router 7", "Vite 7", "Firebase 12 Firestore", "Cloudinary", "Tailwind CSS v4"],
    problem:
      "Photo delivery and client feedback usually happen across scattered chat apps. ViewProof unifies high-res album delivery, per-photo comments, and approval in one collaborative workflow.",
    technicalDecision: {
      choice: "Firestore onSnapshot for real-time album/approval state + Cloudinary on-the-fly watermark transformations",
      tradeoff: "Firestore document listeners enable zero-infrastructure real-time synchronization, trading off multi-region relational ACID constraints.",
    },
    links: {
      live: "https://view-proof.vercel.app",
      repo: "https://github.com/Aayush-2825/ViewProof",
      writeup: "https://dev.to/aayush2825/building-viewproof-real-time-photo-proofing-with-react-19-and-firestore",
    },
    images: [],
    caseStudy: {
      problem:
        "Photo delivery and client feedback usually happen across scattered messages. ViewProof keeps review, comments and approval in one workflow.",
      product:
        "A platform where a photographer creates an album, uploads photos, shares client access, and the client approves photos and leaves comments.",
      workflow: [
        "Photographer signs in",
        "Photographer creates an album",
        "Photographer uploads photos to cloud media storage",
        "Client is given access to the album",
        "Client reviews photos",
        "Client comments on photos",
        "Client approves photos",
      ],
      features: [
        { label: "Photographer authentication", built: true },
        { label: "Album creation",              built: true },
        { label: "Photo uploads",               built: true },
        { label: "Client access",               built: true },
        { label: "Photo approval",              built: true },
        { label: "Comments & notes",            built: true },
        { label: "Cloud media storage",         built: true },
        { label: "Client collaboration",        built: true },
      ],
      architecture: {
        label: "Data and media flow",
        built: true,
        nodes: [
          { id: "ph",   label: "Photographer (authenticated)" },
          { id: "cl",   label: "Client (album access)" },
          { id: "app",  label: "Next.js / React app" },
          { id: "fs",   label: "Firestore (albums, photos, comments, approvals)" },
          { id: "cdn",  label: "Cloudinary (media delivery)" },
        ],
        edges: [["ph", "app"], ["cl", "app"], ["app", "fs"], ["app", "cdn"]],
        note: "Direct client-to-Firestore snapshots provide instant multi-client feedback synchronization.",
      },
      decisions: [
        { title: "Firestore for album, comment and approval data", body: "Reactive document snapshots synchronize selection marks between photographer and client without manual polling." },
        { title: "Cloudinary for media storage and delivery", body: "Automated WebP/AVIF compression and responsive breakpoints ensure fast loading across mobile connections." },
        { title: "Stateless client access model", body: "Secure tokenized album links grant clients instant access without requiring account sign-up friction." },
      ],
      challenges: [
        "Optimizing gallery layouts to prevent browser thrashing when rendering hundreds of high-resolution image cards.",
      ],
      tradeoffs: [
        "Firestore document listeners vs custom WebSocket cluster maintenance.",
      ],
      currentState: "Live and deployed at view-proof.vercel.app with active photographer workflows.",
    },
  },

  // ------------------------------------------------------------------
  // 3. Authentication backend (pjmb)
  // ------------------------------------------------------------------
  {
    slug: "auth-backend",
    name: "pjmb · Auth Engine",
    title: "pjmb · Auth Engine",
    summary:
      "A production-oriented authentication backend covering sessions, JWT, rotating refresh token families, OAuth, and Speakeasy TOTP 2FA.",
    status: "EXPERIMENTAL",
    category: "Backend / Security Infrastructure",
    oneLiner:
      "A production-oriented authentication backend covering sessions, JWT, rotating refresh token families, OAuth, and Speakeasy TOTP 2FA.",
    role: "Backend Security Engineer",
    stack: ["Express 5", "MongoDB Mongoose", "TypeScript", "Passport.js", "Speakeasy TOTP", "Zod", "Helmet", "Winston"],
    problem:
      "Production authentication requires strict token family lifecycle management, 2FA recovery mechanisms, tiered rate limiting, and automated session revocation upon token replay detection.",
    technicalDecision: {
      choice: "Rotating refresh token families with automatic reuse revocation + Speakeasy TOTP 2FA with single-use emergency backup codes",
      tradeoff: "Token family revocation eliminates hijacked session risks, trading off atomic token database writes on every token refresh.",
    },
    links: { repo: "https://github.com/Aayush-2825/pjmb" },
    images: [],
    caseStudy: {
      focus: [
        "Authentication architecture",
        "Token lifecycle & family trees",
        "Replay attack mitigation",
        "Speakeasy TOTP 2FA",
        "OAuth federation",
        "Tiered token-bucket rate limits",
        "Winston audit logging & log rotation",
        "10-minute brute force lockouts",
      ],
      features: [
        { label: "Express 5 REST API architecture",          built: true },
        { label: "MongoDB Mongoose token store",             built: true },
        { label: "Rotating refresh token families",          built: true },
        { label: "Token reuse / replay attack revocation",   built: true },
        { label: "Speakeasy TOTP 2FA verification",          built: true },
        { label: "Single-use emergency recovery codes",       built: true },
        { label: "10-minute account lockout after 5 fails",  built: true },
        { label: "Tiered token-bucket rate limits",          built: true },
        { label: "Winston daily-rotate audit logging",       built: true },
        { label: "Zod contract schema validation",           built: true },
      ],
      architecture: {
        label: "Request and token lifecycle",
        built: true,
        nodes: [
          { id: "req",  label: "Client request" },
          { id: "sec",  label: "Helmet + rate limiting" },
          { id: "val",  label: "Zod validation" },
          { id: "auth", label: "Passport.js strategies (email/password, Google OAuth)" },
          { id: "2fa",  label: "2FA verification" },
          { id: "tok",  label: "Session / JWT access token + rotating refresh token" },
          { id: "db",   label: "MongoDB" },
        ],
        edges: [
          ["req", "sec"], ["sec", "val"], ["val", "auth"],
          ["auth", "2fa"], ["2fa", "tok"], ["tok", "db"],
        ],
        note: "Pipeline guarantees all incoming requests pass security headers and schema parsing before token issuance.",
      },
      decisions: [
        { title: "Refresh-token rotation with reuse detection", body: "Reusing an invalidated refresh token immediately flags a compromised session and revokes the entire token family." },
        { title: "Sessions and JWT hybrid", body: "Stateless short-lived JWTs authorize API routes while server-side sessions manage administrative sessions." },
        { title: "Validation and abuse prevention", body: "Zod schemas validate request boundaries and IP token-bucket middleware mitigates credential stuffing." },
      ],
      challenges: [
        "Handling concurrent refresh requests from multiple browser tabs without false-positive token family revocations.",
      ],
      tradeoffs: [
        "Refresh token family revocation overhead vs vulnerability to stolen bearer tokens.",
      ],
      currentState: "Fully implemented backend service with end-to-end authentication test suite.",
    },
  },

  // ------------------------------------------------------------------
  // 4. Swabhimaan-2
  // ------------------------------------------------------------------
  {
    slug: "swabhimaan",
    name: "Swabhimaan-2",
    title: "Swabhimaan-2 · Embedded Payload CMS",
    summary:
      "A high-performance editorial publishing platform with 13 structured Payload CMS 3.64 collections, Lexical editor, and zero-egress Cloudflare R2 media storage.",
    status: "LIVE",
    category: "Content Platform / Embedded CMS",
    oneLiner:
      "A high-performance editorial publishing platform with 13 structured Payload CMS 3.64 collections, Lexical editor, and zero-egress Cloudflare R2 media storage.",
    role: "Full-Stack Developer",
    stack: [
      "Next.js 15.5.9", "React 19", "TypeScript", "Payload CMS 3.64",
      "Lexical Editor", "MongoDB", "Cloudflare R2", "Sharp", "Zod", "ISR",
    ],
    problem:
      "Editorial publishing platform requiring structured content management across 13 collections, zero-egress media storage for high-res periodical covers, and sub-40ms cached delivery.",
    technicalDecision: {
      choice: "Embedded Payload CMS 3.64 with Lexical, MongoDB Atlas, and Cloudflare R2 zero-egress media pipeline",
      tradeoff: "Incremental Static Regeneration provides edge-cached CDN performance with on-demand cache revalidation, trading off instant global propagation across edge nodes.",
    },
    links: {
      live: "https://swabhimaan-2.vercel.app",
      repo: "https://github.com/Aayush-2825/Swabhimaan-2",
    },
    images: [],
    caseStudy: {
      product:
        "A website where editors manage blogs, periodicals, media and forms through a CMS, with about 10 pages.",
      demonstrates: [
        "Frontend architecture",
        "CMS integration",
        "Structured content",
        "Database integration",
        "Object storage",
        "Validation",
        "Deployment",
      ],
      features: [
        { label: "Blogs",                 built: true },
        { label: "Periodicals",           built: true },
        { label: "Media library",         built: true },
        { label: "Forms & submissions",   built: true },
        { label: "CMS-managed content",   built: true },
        { label: "Static ISR caching",    built: true },
      ],
      architecture: {
        label: "Content flow",
        built: true,
        nodes: [
          { id: "ed",   label: "Editor in Payload CMS" },
          { id: "db",   label: "MongoDB (structured content)" },
          { id: "r2",   label: "Cloudflare R2 (media)" },
          { id: "next", label: "Next.js + React 19 (ISR pages)" },
          { id: "zod",  label: "Zod (form validation)" },
        ],
        edges: [["ed", "db"], ["ed", "r2"], ["db", "next"], ["r2", "next"], ["zod", "next"]],
        note: "Content editors publish to MongoDB; webhooks trigger on-demand ISR revalidation on the Next.js frontend.",
      },
      decisions: [
        { title: "Payload CMS with MongoDB", body: "Type-safe headless CMS seamlessly embedded into Next.js providing editors with rich structured content blocks." },
        { title: "ISR for content pages", body: "Builds static HTML at runtime and revalidates on editor publish webhooks, ensuring sub-100ms TTFB." },
        { title: "Cloudflare R2 for media", body: "Zero-egress object storage for high-resolution periodical covers and downloadable PDFs." },
      ],
      challenges: [
        "Coordinating on-demand cache revalidation across international CDN edge nodes.",
      ],
      tradeoffs: [
        "Headless CMS flexibility vs traditional monolithic CMS editing.",
      ],
    },
  },

  // ------------------------------------------------------------------
  // 5. Engineering Blog
  // ------------------------------------------------------------------
  {
    slug: "engineering-blog",
    name: "Engineering Blog",
    title: "Engineering Blog · Relational Systems Architecture",
    summary:
      "A developer publication covering systems programming, distributed patterns, and web architecture built with Next.js 15.3, Prisma 6.6, and PostgreSQL.",
    status: "LIVE",
    category: "Publishing / Relational Architecture",
    oneLiner:
      "A developer publication covering systems programming, distributed patterns, and web architecture built with Next.js 15.3, Prisma 6.6, and PostgreSQL.",
    role: "Author & Full-Stack Builder",
    stack: ["Next.js 15.3", "React 19", "TypeScript", "Prisma 6.6", "PostgreSQL", "Kinde Auth", "Tailwind CSS v4"],
    problem:
      "Creating a high-performance publishing platform with relational tag taxonomies, view telemetry, and OAuth-protected authoring workflows without dynamic SSR overhead.",
    technicalDecision: {
      choice: "Prisma ORM 6.6 on PostgreSQL paired with Next.js static page generation and Kinde Auth OAuth",
      tradeoff: "Statically generated pages eliminate cold-start database latency, requiring build-time regeneration for new publications.",
    },
    links: { repo: "https://github.com/Aayush-2825/blog" },
    images: [],
    caseStudy: {
      product:
        "A fast, minimalist technical blog supporting code syntax highlighting, reading time calculation, and tag filtering.",
      features: [
        { label: "Prisma 6.6 schema relations", built: true },
        { label: "PostgreSQL UUID primary keys", built: true },
        { label: "Kinde Auth OAuth protection", built: true },
        { label: "Markdown / MDX rendering", built: true },
        { label: "Syntax highlighting", built: true },
        { label: "Category & tag taxonomy", built: true },
        { label: "Reading time estimation", built: true },
      ],
      architecture: {
        label: "Publishing & data pipeline",
        built: true,
        nodes: [
          { id: "author", label: "Author (Kinde OAuth)" },
          { id: "prisma", label: "Prisma ORM 6.6" },
          { id: "pg",     label: "PostgreSQL Database" },
          { id: "next",   label: "Next.js Static Generation" },
        ],
        edges: [["author", "prisma"], ["prisma", "pg"], ["pg", "next"]],
        note: "Relational queries compile via Prisma Client into optimized single-roundtrip PostgreSQL SQL.",
      },
      decisions: [
        { title: "Static Generation", body: "Pre-renders all blog posts during build time for maximum delivery speed and zero database load." },
        { title: "Prisma data modeling", body: "Lightweight relational schema for tags, view telemetry, and article metadata." },
      ],
      challenges: ["Ensuring syntax highlighting adds zero runtime JavaScript bloat."],
      tradeoffs: ["Static generation build overhead vs dynamic server rendering."],
    },
  },

  // ------------------------------------------------------------------
  // Research and planned (in exploring row)
  // ------------------------------------------------------------------
  {
    slug: "multi-agent-debugging",
    name: "Multi-Agent LLM Code Debugging",
    title: "Multi-Agent LLM Code Debugging",
    summary:
      "Improving code debugging using multi-agent LLM systems with iterative refinement.",
    status: "RESEARCH",
    category: "AI research idea",
    oneLiner:
      "Improving code debugging using multi-agent LLM systems with iterative refinement.",
    role: "Researcher",
    stack: ["LLMs", "Multi-agent systems", "Python"],
    problem:
      "Investigating multi-agent coordination for bug localization, automated patch generation, and test-driven evaluation.",
    technicalDecision: {
      choice: "Multi-agent iterative feedback loop",
      tradeoff: "Multi-agent reflection loops achieve higher patch accuracy at the expense of compounding LLM token consumption and generation latency.",
    },
    links: {},
    images: [],
    caseStudy: {
      pipeline: [
        "User code",
        "Analyzer agent",
        "Bug classification",
        "Debugger agent",
        "Fix generator",
        "Test agent",
        "Evaluator",
        "Iterative refinement",
      ],
      currentState:
        "Research concept. Not implemented. No results or benchmarks.",
    },
  },
  {
    slug: "video-lms",
    name: "Video and LMS Infrastructure",
    title: "Video and LMS Infrastructure",
    summary:
      "Exploring live classes, adaptive streaming and low-bandwidth video delivery.",
    status: "PLANNED",
    category: "Systems exploration",
    oneLiner:
      "Exploring live classes, adaptive streaming and low-bandwidth video delivery.",
    role: "Systems Explorer",
    stack: ["WebRTC", "WebSockets", "HLS"],
    problem:
      "Exploring low-bandwidth video delivery, adaptive streaming, and low-latency interactive classrooms.",
    technicalDecision: {
      choice: "WebRTC for real-time interactions + HLS for scalable broadcast delivery",
      tradeoff: "WebRTC delivers sub-500ms interaction latency for instructors, while HLS CDN distribution absorbs massive student viewership at the cost of 2-4s streaming delay.",
    },
    links: {},
    images: [],
    caseStudy: {
      areas: [
        "Live classes",
        "Video streaming",
        "Adaptive streaming",
        "Low-bandwidth delivery",
        "WebRTC",
        "WebSockets",
        "HLS",
        "Codecs: AV1, H.264, H.265",
        "CDN architecture",
      ],
      currentState: "Planned. Not built.",
    },
  },
  {
    slug: "ipl-analytics",
    name: "IPL Analytics and ML",
    title: "IPL Analytics and ML",
    summary:
      "A planned analytics and modeling project on ball-by-ball IPL data.",
    status: "PLANNED",
    category: "Data / ML exploration",
    oneLiner:
      "A planned analytics and modeling project on ball-by-ball IPL data.",
    role: "Data Analyst",
    stack: ["Python", "NumPy", "Pandas", "Matplotlib"],
    problem:
      "Analyzing 280,000+ ball-by-ball records to model in-match win probability and player impact.",
    technicalDecision: {
      choice: "Pandas/NumPy exploratory data pipeline",
      tradeoff: "In-memory DataFrames enable vectorised array operations and rapid feature engineering, trading off memory overhead when handling hundred-thousand-row match matrices.",
    },
    links: {},
    images: [],
    caseStudy: {
      dataset: {
        rows: "about 283,678",
        columns: "about 60",
        matchIds: "about 1,193",
      },
      ideas: [
        "Win probability",
        "Player analytics",
        "Next-delivery prediction",
        "Player of the Match modeling",
      ],
      currentState:
        "Planned. Dataset identified. No models trained and no accuracy figures exist.",
    },
  },
];