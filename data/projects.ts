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
      tradeoff: "TODO: one-sentence trade-off for WebSocket vs polling and relational transactions vs document store",
    },
    links: {
      live: "https://dozo.work", // TODO(aayush): confirm exact live URL and whether public
      repo: undefined,           // TODO(aayush): add only if public
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
        { label: "Instant booking",            built: false }, // TODO(aayush): confirm
        { label: "Scheduled booking",          built: false },
        { label: "Customer booking flow",      built: false },
        { label: "Helper portal",              built: false },
        { label: "Helper verification",        built: false },
        { label: "KYC and document handling",  built: false },
        { label: "Payments",                   built: false },
        { label: "Tracking",                   built: false },
        { label: "Admin dashboard",            built: false },
        { label: "Disputes",                   built: false },
        { label: "Analytics",                  built: false },
      ],
      architecture: {
        label: "v2 technical direction (planned, not a claim of deployment)",
        built: false,
        nodes: [
          { id: "web",   label: "Next.js + React + TypeScript" },
          { id: "api",   label: "Node.js + Express" },
          { id: "db",    label: "PostgreSQL via Drizzle ORM" },
          { id: "cache", label: "Redis" },
          { id: "rt",    label: "WebSockets (realtime)" },
          { id: "infra", label: "Turborepo monorepo + Docker" },
          { id: "auth",  label: "Authentication" },
          { id: "pay",   label: "Payment infrastructure" },
        ],
        edges: [
          ["web", "api"], ["api", "db"], ["api", "cache"],
          ["api", "rt"], ["api", "auth"], ["api", "pay"],
        ],
        note: "Edges show intended relationships. TODO(aayush): correct against the real v2 design.",
      },
      decisions: [
        { title: "Move v2 to PostgreSQL with Drizzle", body: "TODO(aayush): why (relational data, transactions, etc.)" },
        { title: "Redis and WebSockets for realtime", body: "TODO(aayush): what realtime features and why" },
        { title: "Turborepo and Docker", body: "TODO(aayush): monorepo layout and deployment reasoning" },
      ],
      challenges: [],   // TODO(aayush): real challenges
      tradeoffs: [],    // TODO(aayush): real tradeoffs
      currentState:
        "In progress. Selected for a three-month pre-incubation program at NIT Hamirpur. v2 is the current technical direction.",
      future: "TODO(aayush): what is next after pre-incubation",
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
      "Photographers deliver albums, and clients review, comment on and approve individual photographs.",
    status: "LIVE",
    category: "Photography collaboration / SaaS",
    oneLiner:
      "Photographers deliver albums, and clients review, comment on and approve individual photographs.",
    role: "Solo Builder (TODO: confirm role)",
    stack: ["React", "Next.js", "Firebase", "Firestore", "Cloudinary", "Authentication"],
    problem:
      "Photo delivery and client feedback usually happen across scattered messages. ViewProof keeps review, comments and approval in one workflow.",
    technicalDecision: {
      choice: "Firestore for real-time album/approval state + Cloudinary for media delivery",
      tradeoff: "TODO: one-sentence trade-off for Firestore vs relational DB",
    },
    links: { live: "https://view-proof.vercel.app", repo: undefined }, // TODO(aayush): repo if public
    images: [], // TODO(aayush): real screenshots of the live app
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
        { label: "Comments",                    built: true },
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
          { id: "cdn",  label: "Cloudinary (media)" },
        ],
        edges: [["ph", "app"], ["cl", "app"], ["app", "fs"], ["app", "cdn"]],
        note: "TODO(aayush): confirm collections and how client access is granted (link, code, account).",
      },
      decisions: [
        { title: "Firestore for album, comment and approval data", body: "TODO(aayush): reasoning" },
        { title: "Cloudinary for media storage and delivery", body: "TODO(aayush): reasoning" },
        { title: "Separate photographer and client experiences", body: "TODO(aayush): how access and permissions differ" },
      ],
      challenges: [],
      currentState: "Live at view-proof.vercel.app.",
    },
  },

  // ------------------------------------------------------------------
  // 3. Authentication backend
  // ------------------------------------------------------------------
  {
    slug: "auth-backend",
    name: "Authentication Backend",
    title: "Authentication Backend",
    summary:
      "A production-oriented authentication backend covering sessions, JWT, refresh-token rotation, OAuth and 2FA.",
    status: "EXPERIMENTAL",
    category: "Backend / Security",
    oneLiner:
      "A production-oriented authentication backend covering sessions, JWT, refresh-token rotation, OAuth and 2FA.",
    role: "Builder",
    stack: ["Node.js", "Express", "MongoDB", "Passport.js", "Zod", "Helmet", "JWT"],
    problem:
      "Production authentication requires secure token lifecycle management, OAuth federation, rate limiting, and protection against token replay attacks.",
    technicalDecision: {
      choice: "JWT access tokens paired with rotating refresh tokens and reuse detection",
      tradeoff: "TODO: one-sentence trade-off for refresh-token rotation vs server-side session stores",
    },
    links: { repo: "https://github.com/Aayush-2825/pjmb" },
    images: [], // TODO(aayush): real API screenshots, Postman/Bruno output, or a real diagram
    caseStudy: {
      focus: [
        "Authentication architecture",
        "Token lifecycle",
        "Security",
        "OAuth",
        "Sessions",
        "Refresh-token design",
        "Validation",
        "Abuse prevention",
      ],
      features: [
        { label: "Email and password authentication", built: true },
        { label: "Google OAuth",                      built: true },
        { label: "Sessions",                          built: true },
        { label: "JWT",                               built: true },
        { label: "Refresh-token rotation",            built: true },
        { label: "2FA",                               built: true },
        { label: "Request validation with Zod",       built: true },
        { label: "Helmet security headers",           built: true },
        { label: "Rate limiting",                     built: true },
      ],
      architecture: {
        label: "Request and token lifecycle",
        built: true,
        nodes: [
          { id: "req",  label: "Client request" },
          { id: "sec",  label: "Helmet + rate limiting" },
          { id: "val",  label: "Zod validation" },
          { id: "auth", label: "Passport.js strategies (email/password, Google OAuth)" },
          { id: "2fa",  label: "2FA check" },
          { id: "tok",  label: "Session / JWT access token + rotating refresh token" },
          { id: "db",   label: "MongoDB" },
        ],
        edges: [
          ["req", "sec"], ["sec", "val"], ["val", "auth"],
          ["auth", "2fa"], ["2fa", "tok"], ["tok", "db"],
        ],
        note: "Stage order is a reasonable summary. TODO(aayush): verify against the repo, especially where 2FA sits and where refresh tokens are stored.",
      },
      decisions: [
        { title: "Refresh-token rotation", body: "TODO(aayush): rotation and reuse-detection behavior in the repo" },
        { title: "Sessions and JWT together", body: "TODO(aayush): which is used for what" },
        { title: "Validation and abuse prevention", body: "TODO(aayush): Zod schemas and rate-limit policy" },
      ],
      challenges: [],
      currentState: "Experimental backend system with test suite.",
    },
  },

  // ------------------------------------------------------------------
  // 4. Swabhimaan
  // ------------------------------------------------------------------
  {
    slug: "swabhimaan",
    name: "Swabhimaan",
    title: "Swabhimaan",
    summary:
      "A CMS-managed content site for blogs and periodicals with media, forms and about ten pages.",
    status: "LIVE",
    category: "Content platform / CMS",
    oneLiner:
      "A CMS-managed content site for blogs and periodicals with media, forms and about ten pages.",
    role: "Full-Stack Developer (TODO: confirm role)",
    stack: [
      "Next.js", "React 19", "TypeScript", "Payload CMS",
      "MongoDB", "Cloudflare R2", "Zod", "ISR",
    ],
    problem:
      "Editorial publishing site requiring structured content management for periodicals, blogs, media assets, and forms with fast cached delivery.",
    technicalDecision: {
      choice: "Payload CMS with MongoDB and Next.js ISR on React 19",
      tradeoff: "TODO: one-sentence trade-off for Payload CMS ISR vs dynamic SSR",
    },
    links: { repo: "https://github.com/Aayush-2825/Swabhimaan-2", live: undefined }, // TODO(aayush): live URL if any
    images: [], // TODO(aayush): real screenshots
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
        { label: "Media",                 built: true },
        { label: "Forms",                 built: true },
        { label: "CMS-managed content",   built: true },
        { label: "About 10 pages",        built: true },
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
        note: "TODO(aayush): confirm revalidation approach and where the site is deployed.",
      },
      decisions: [
        { title: "Payload CMS with MongoDB", body: "TODO(aayush): reasoning" },
        { title: "ISR for content pages", body: "TODO(aayush): reasoning" },
        { title: "Cloudflare R2 for media", body: "TODO(aayush): reasoning" },
      ],
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
      tradeoff: "TODO: one-sentence trade-off for token consumption vs repair accuracy",
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
      tradeoff: "TODO: one-sentence trade-off for WebRTC peer complexity vs HLS latency",
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
      tradeoff: "TODO: one-sentence trade-off for in-memory dataframes vs SQL querying",
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