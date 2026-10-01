// data/skills.ts
// Source of truth for the Skills section.
//
// UI rules:
// - Render skills as grouped technical capabilities.
// - Never use progress bars, percentages, stars, or proficiency levels.
// - `exploring: true` means the technology is currently being learned.
// - Do not infer proficiency from the order of items.

export type SkillItem = {
  name: string;
  exploring?: boolean;
};

export type SkillGroup = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "core",
    label: "Core Engineering",
    shortLabel: "CORE",
    description: "Languages and web foundations",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },

  {
    id: "frontend",
    label: "Frontend Engineering",
    shortLabel: "FRONTEND",
    description: "Interfaces, applications, and UI systems",
    items: [
      { name: "React" },
      { name: "React 19" },
      { name: "Next.js" },
      { name: "Next.js App Router" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
    ],
  },

  {
    id: "backend",
    label: "Backend & Realtime",
    shortLabel: "BACKEND",
    description: "APIs, services, and realtime architecture",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "Backend architecture" },
      { name: "Realtime architecture" },
    ],
  },

  {
    id: "data",
    label: "Data Layer",
    shortLabel: "DATA",
    description: "Databases, persistence, and data access",
    items: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Firebase / Firestore" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Drizzle ORM" },
      { name: "Mongoose" },
    ],
  },

  {
    id: "security",
    label: "Authentication & Security",
    shortLabel: "SECURITY",
    description: "Identity, sessions, validation, and application security",
    items: [
      { name: "Passport.js" },
      { name: "NextAuth / Auth.js" },
      { name: "Kinde" },
      { name: "Better Auth", exploring: true },
      { name: "Email and password authentication" },
      { name: "Google OAuth" },
      { name: "Sessions" },
      { name: "JWT" },
      { name: "Refresh-token rotation" },
      { name: "2FA" },
      { name: "Zod" },
      { name: "Helmet" },
      { name: "Rate limiting" },
    ],
  },

  {
    id: "infrastructure",
    label: "Infrastructure",
    shortLabel: "INFRA",
    description: "Deployment, storage, containers, and monorepos",
    items: [
      { name: "Vercel" },
      { name: "Cloudinary" },
      { name: "Cloudflare R2" },
      { name: "Docker" },
      { name: "Turborepo" },
    ],
  },

  {
    id: "development",
    label: "Development",
    shortLabel: "DEV",
    description: "Version control and development tooling",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "GitHub Copilot" },
      { name: "Claude" },
      { name: "OpenRouter" },
    ],
  },
];

// ---------------------------------------------------------------------
// AI / Machine Learning
// ---------------------------------------------------------------------

export const aiML = {
  completed: [
    {
      name: "Machine Learning Specialization",
      provider: "Coursera",
      // TODO(aayush): add certificate URL and completion date if you want them shown
    },
  ],

  background: [
    "Python",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "ML fundamentals",
  ],

  // Coursework and self-study topics.
  // Do not describe these as projects.
  topicsStudied: [
    "A* search",
    "Intelligent agents",
    "STRIPS planning",
    "Partial-order planning",
    "First-order logic",
    "CNF conversion",
  ],

  interests: [
    "LLM applications",
    "AI agents",
    "Multi-agent systems",
    "AI SaaS",
    "AI developer tools",
    "AI and software engineering",
    "Predictive systems",
    "Intelligent learning systems",
  ],
} as const;