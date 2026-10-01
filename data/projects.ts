import type { Project } from "./types";

export const projects: Project[] = [
  // ------------------------------------------------------------------
  // 1. DOZO (flagship)
  // ------------------------------------------------------------------
  {
    slug: "dozo",
    name: "DOZO",
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
    links: {
      live: "https://dozo.work", // TODO(aayush): confirm exact live URL and whether public
      repo: undefined,           // TODO(aayush): add only if public
    },
    images: [], // TODO(aayush): real screenshots in public/projects/dozo/
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
      // IMPORTANT: the brief lists these as POTENTIAL capabilities.
      // Set built:true ONLY for ones Aayush confirms are implemented.
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
        // Only the technology choices are known. Reasons are NOT known.
        { title: "Move v2 to PostgreSQL with Drizzle", body: "TODO(aayush): why (relational data, transactions, etc.)" },
        { title: "Redis and WebSockets for realtime", body: "TODO(aayush): what realtime features and why" },
        { title: "Turborepo and Docker", body: "TODO(aayush): monorepo layout and deployment reasoning" },
      ],
      challenges: [],   // TODO(aayush): real challenges
      tradeoffs: [],    // TODO(aayush): real tradeoffs
      currentState:
        "In progress. Selected for a three-month pre-incubation program at NIT Hamirpur. v2 is the current technical direction.",
      future: "TODO(aayush): what is next after pre-incubation",
      // Never render: revenue, users, funding, growth, performance, market share, traction
    },
  },

  // ------------------------------------------------------------------
  // 2. ViewProof
  // ------------------------------------------------------------------
  {
    slug: "viewproof",
    name: "ViewProof",
    status: "LIVE",
    category: "Photography collaboration / SaaS",
    oneLiner:
      "Photographers deliver albums, and clients review, comment on and approve individual photographs.",
    role: undefined, // TODO(aayush): confirm role wording (solo builder?)
    stack: ["React", "Next.js", "Firebase", "Firestore", "Cloudinary", "Authentication"],
    links: { live: "https://view-proof.vercel.app", repo: undefined }, // TODO(aayush): repo if public
    images: [], // TODO(aayush): real screenshots of the live app
    caseStudy: {
      problem:
        "Photo delivery and client feedback usually happen across scattered messages. ViewProof keeps review, comments and approval in one workflow.", // TODO(aayush): confirm this framing is accurate
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
      challenges: [], // TODO(aayush)
      currentState: "Live at view-proof.vercel.app.",
      // Never say: "CRUD app". Never invent user counts.
    },
  },

  // ------------------------------------------------------------------
  // 3. Authentication backend
  // ------------------------------------------------------------------
  {
    slug: "auth-backend",
    name: "Authentication Backend",
    status: "EXPERIMENTAL", // TODO(aayush): LIVE, IN_PROGRESS or EXPERIMENTAL
    category: "Backend / Security",
    oneLiner:
      "A production-oriented authentication backend covering sessions, JWT, refresh-token rotation, OAuth and 2FA.",
    role: "Builder",
    stack: ["Node.js", "Express", "MongoDB", "Passport.js", "Zod", "Helmet", "JWT"],
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
      challenges: [], // TODO(aayush)
      // Never call it an "authentication app".
    },
  },

  // ------------------------------------------------------------------
  // 4. Swabhimaan
  // ------------------------------------------------------------------
  {
    slug: "swabhimaan",
    name: "Swabhimaan",
    status: "LIVE", // TODO(aayush): LIVE or IN_PROGRESS
    category: "Content platform / CMS",
    oneLiner:
      "A CMS-managed content site for blogs and periodicals with media, forms and about ten pages.",
    role: undefined, // TODO(aayush): confirm
    stack: [
      "Next.js", "React 19", "TypeScript", "Payload CMS",
      "MongoDB", "Cloudflare R2", "Zod", "ISR",
    ],
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
      // Tone: factual, modest. Do not oversell.
    },
  },

  // ------------------------------------------------------------------
  // Research and planned (visually quieter, no completion language)
  // ------------------------------------------------------------------
  {
    slug: "multi-agent-debugging",
    name: "Multi-Agent LLM Code Debugging",
    status: "RESEARCH",
    category: "AI research idea",
    oneLiner:
      "Improving code debugging using multi-agent LLM systems with iterative refinement.",
    stack: ["LLMs", "Multi-agent systems", "Python"], // TODO(aayush): confirm intended stack
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
    status: "PLANNED",
    category: "Systems exploration",
    oneLiner:
      "Exploring live classes, adaptive streaming and low-bandwidth video delivery.",
    stack: ["WebRTC", "WebSockets", "HLS"],
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
    status: "PLANNED",
    category: "Data / ML exploration",
    oneLiner:
      "A planned analytics and modeling project on ball-by-ball IPL data.",
    stack: ["Python", "NumPy", "Pandas", "Matplotlib"],
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