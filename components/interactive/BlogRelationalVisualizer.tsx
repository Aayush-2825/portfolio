"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { GithubIcon } from "@/components/ui/icons";
import {
  Database,
  Key,
  Shield,
  Code2,
  FileText,
  UserCheck,
  Tag,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaModel {
  name: string;
  tableName: string;
  description: string;
  fields: { name: string; type: string; isKey?: boolean; isRelation?: boolean }[];
  sampleQuery: string;
}

const MODELS: Record<string, SchemaModel> = {
  post: {
    name: "Post",
    tableName: "posts",
    description: "Core publication articles with Markdown body, slug index, and relations to Author, Tags, and Telemetry.",
    fields: [
      { name: "id", type: "UUID @default(uuid())", isKey: true },
      { name: "title", type: "String" },
      { name: "slug", type: "String @unique" },
      { name: "content", type: "Text (MDX)" },
      { name: "published", type: "Boolean @default(false)" },
      { name: "authorId", type: "UUID", isRelation: true },
      { name: "author", type: "User @relation(authorId)" },
      { name: "tags", type: "PostTag[]", isRelation: true },
      { name: "telemetry", type: "Telemetry?", isRelation: true },
    ],
    sampleQuery: `// Fetch post with author, relational tags & telemetry
const post = await prisma.post.findUnique({
  where: { slug: "systems-concurrency-drizzle" },
  include: {
    author: { select: { name: true, email: true } },
    tags: { include: { tag: true } },
    telemetry: true,
  },
});`,
  },
  user: {
    name: "User (Author)",
    tableName: "users",
    description: "Authenticated blog authors synchronized with Kinde Auth OAuth federated identities.",
    fields: [
      { name: "id", type: "UUID @default(uuid())", isKey: true },
      { name: "kindeId", type: "String @unique", isKey: true },
      { name: "email", type: "String @unique" },
      { name: "name", type: "String" },
      { name: "role", type: "Role @default(AUTHOR)" },
      { name: "posts", type: "Post[]", isRelation: true },
    ],
    sampleQuery: `// Verify author via Kinde federated OAuth identity
const author = await prisma.user.upsert({
  where: { kindeId: sessionUser.id },
  update: { email: sessionUser.email },
  create: {
    kindeId: sessionUser.id,
    email: sessionUser.email!,
    name: sessionUser.given_name ?? "Author",
  },
});`,
  },
  tag: {
    name: "Tag & Taxonomy",
    tableName: "tags",
    description: "Normalized category tags mapped via composite PostTag join table.",
    fields: [
      { name: "id", type: "UUID @default(uuid())", isKey: true },
      { name: "name", type: "String" },
      { name: "slug", type: "String @unique" },
      { name: "posts", type: "PostTag[]", isRelation: true },
    ],
    sampleQuery: `// Group published articles by taxonomy tag
const tagsWithCount = await prisma.tag.findMany({
  include: {
    _count: { select: { posts: true } },
  },
  orderBy: { name: "asc" },
});`,
  },
  telemetry: {
    name: "Telemetry",
    tableName: "telemetries",
    description: "Atomic reading telemetry (view count, calculated reading time in minutes).",
    fields: [
      { name: "id", type: "UUID @default(uuid())", isKey: true },
      { name: "postId", type: "UUID @unique", isRelation: true },
      { name: "views", type: "Int @default(0)" },
      { name: "readTimeMin", type: "Int" },
    ],
    sampleQuery: `// Increment post view count atomically
await prisma.telemetry.upsert({
  where: { postId: post.id },
  update: { views: { increment: 1 } },
  create: { postId: post.id, views: 1, readTimeMin: 4 },
});`,
  },
};

export function BlogRelationalVisualizer() {
  const [selectedModel, setSelectedModel] = useState<string>("post");
  const [isAuthorSession, setIsAuthorSession] = useState(true);

  const model = MODELS[selectedModel] ?? MODELS.post;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#07080c] p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Database size={15} />
          </div>
          <div>
            <span className="font-heading text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>Engineering Blog · Prisma 6.6 Relational Architecture</span>
              <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-300">
                PostgreSQL UUIDs
              </span>
            </span>
          </div>
        </div>

        {/* Kinde Auth OAuth Status Badge */}
        <button
          type="button"
          onClick={() => {
            sound.playClick(1100, 0.01);
            setIsAuthorSession(!isAuthorSession);
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-all active:scale-[0.97]",
            isAuthorSession
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
              : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground"
          )}
        >
          <Shield size={11} className={isAuthorSession ? "text-emerald-400" : "text-muted-foreground"} />
          <span>Kinde OAuth: {isAuthorSession ? "AUTHOR (PUBLISH OK)" : "VISITOR (READ-ONLY)"}</span>
        </button>
      </div>

      {/* Relational Model Cards Row */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { key: "post", name: "Post Model", icon: FileText, rel: "1:N & 1:1" },
          { key: "user", name: "User (Author)", icon: UserCheck, rel: "1:N Posts" },
          { key: "tag", name: "Tag Taxonomy", icon: Tag, rel: "M:N Posts" },
          { key: "telemetry", name: "Telemetry", icon: BarChart3, rel: "1:1 Post" },
        ].map((item) => {
          const isSelected = selectedModel === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                sound.playClick(1000, 0.01);
                setSelectedModel(item.key);
              }}
              className={cn(
                "rounded-xl border p-2.5 text-left font-mono transition-all active:scale-[0.97]",
                isSelected
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-sm"
                  : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                <Icon size={14} className={isSelected ? "text-emerald-400" : "text-muted-foreground"} />
                <span className="text-[8.5px] uppercase">{item.rel}</span>
              </div>
              <span className="font-semibold text-xs text-foreground block mt-1.5">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Model Schema Inspector & Live Prisma Query */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left: Model Fields */}
        <div className="lg:col-span-6 rounded-xl border border-white/[0.08] bg-[#050608] p-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2 text-muted-foreground">
            <span className="text-foreground font-semibold text-[11px] flex items-center gap-1.5">
              <Key size={11} className="text-accent" />
              <span>model {model.name}</span>
            </span>
            <span className="text-[9px]">Table: {model.tableName}</span>
          </div>

          <p className="text-[10px] text-muted-foreground mb-2.5 leading-normal">
            {model.description}
          </p>

          <div className="space-y-1">
            {model.fields.map((f) => (
              <div
                key={f.name}
                className="flex items-center justify-between rounded border border-white/[0.03] bg-[#08090d] px-2 py-1 text-[9.5px]"
              >
                <span className={cn(
                  "font-semibold",
                  f.isKey ? "text-amber-400" : f.isRelation ? "text-sky-400" : "text-foreground/90"
                )}>
                  {f.name}
                </span>
                <span className="text-muted-foreground text-[8.5px]">{f.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compiled Prisma ORM Query */}
        <div className="lg:col-span-6 rounded-xl border border-white/[0.08] bg-[#040507] p-3 font-mono text-[9px] text-foreground/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2 text-muted-foreground">
              <span className="text-accent font-semibold flex items-center gap-1.5">
                <Code2 size={11} />
                <span>Prisma Client v6.6 Query</span>
              </span>
              <span className="text-emerald-400 text-[8.5px]">Zero SSR Latency</span>
            </div>
            <pre className="overflow-x-auto text-foreground/85 leading-relaxed">{model.sampleQuery}</pre>
          </div>

          <div className="mt-3 border-t border-white/[0.06] pt-2 text-[8.5px] text-muted-foreground">
            ⚡ Pre-rendered to static HTML via Next.js 15 Static Site Generation for sub-20ms TTFB.
          </div>
        </div>
      </div>

      {/* Action Footer with Genuine Links */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3 font-mono text-xs">
        <span className="text-[10px] text-muted-foreground">
          Stack: Next.js 15.3 · React 19 · Prisma 6.6 · PostgreSQL · Kinde Auth · Tailwind v4
        </span>

        <a
          href="https://github.com/Aayush-2825/blog"
          target="_blank"
          rel="noreferrer"
          onClick={() => sound.playClick(1000)}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground hover:border-white/30 transition-all active:scale-[0.97]"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>View Source on GitHub</span>
        </a>
      </div>
    </div>
  );
}
