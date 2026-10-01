export const layers = [
  { id: "interface", label: "Interface",      tech: ["React", "React 19", "Next.js", "Tailwind CSS", "TypeScript"] },
  { id: "api",       label: "API",            tech: ["Node.js", "Express", "Express.js", "REST APIs", "Payload CMS"] },
  { id: "data",      label: "Data",           tech: ["PostgreSQL", "MongoDB", "Firestore", "Firebase", "Redis", "Drizzle ORM", "Mongoose", "Prisma"] },
  { id: "realtime",  label: "Realtime",       tech: ["WebSockets", "WebRTC", "HLS"] },
  { id: "security",  label: "Security",       tech: ["Passport.js", "JWT", "Zod", "Helmet", "Authentication"] },
  { id: "infra",     label: "Infrastructure", tech: ["Docker", "Turborepo", "Vercel", "Cloudinary", "Cloudflare R2"] },
] as const;

export function layersForProject(stack: string[]) {
  return layers
    .filter((l) => l.tech.some((t) => stack.includes(t)))
    .map((l) => l.id);
}