"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { GithubIcon } from "@/components/ui/icons";
import {
  Layers,
  Database,
  Cloud,
  ExternalLink,
  FolderTree,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionSchema {
  id: string;
  name: string;
  category: "Content" | "Pipelines" | "System";
  documentCount: number;
  description: string;
  fields: { name: string; type: string; details: string }[];
}

const COLLECTIONS: CollectionSchema[] = [
  {
    id: "periodicals",
    name: "Periodicals",
    category: "Content",
    documentCount: 24,
    description: "Digital and print periodical issues with Lexical rich text and downloadable PDF attachments.",
    fields: [
      { name: "title", type: "text", details: "required, localized" },
      { name: "volume", type: "number", details: "volume series index" },
      { name: "issue", type: "number", details: "issue release number" },
      { name: "coverImage", type: "upload (Media)", details: "relation to Media collection" },
      { name: "pdfDocument", type: "upload (R2)", details: "Cloudflare R2 attachment" },
      { name: "content", type: "richText", details: "Lexical headless nodes" },
      { name: "status", type: "select", details: "['draft', 'published', 'archived']" },
    ],
  },
  {
    id: "posts",
    name: "Posts & Blogs",
    category: "Content",
    documentCount: 42,
    description: "Editorial essays and periodical write-ups with automated ISR cache purge.",
    fields: [
      { name: "title", type: "text", details: "required, slug generator" },
      { name: "author", type: "relationship", details: "relation to Authors collection" },
      { name: "categories", type: "relationship (many)", details: "tags & taxonomy" },
      { name: "body", type: "richText", details: "Lexical markdown & custom blocks" },
      { name: "publishedAt", type: "date", details: "indexing sort key" },
    ],
  },
  {
    id: "media",
    name: "Media (Cloudflare R2)",
    category: "Pipelines",
    documentCount: 312,
    description: "Zero-egress object storage media library processed by server-side Sharp into responsive WebP tiers.",
    fields: [
      { name: "filename", type: "text", details: "original upload name" },
      { name: "r2Key", type: "text", details: "S3 object identifier (region: auto)" },
      { name: "mimeType", type: "text", details: "image/webp, application/pdf" },
      { name: "filesize", type: "number", details: "bytes stored in R2 bucket" },
      { name: "sizes", type: "group", details: "[thumbnail: 400x300, tablet: 1024w, hero: 1920w]" },
    ],
  },
  {
    id: "forms",
    name: "Form Submissions",
    category: "Pipelines",
    documentCount: 185,
    description: "Dynamic form builder pipelines storing validated submissions directly into MongoDB.",
    fields: [
      { name: "form", type: "relationship", details: "target form configuration" },
      { name: "submissionData", type: "json", details: "Zod-validated form input" },
      { name: "submittedAt", type: "date", details: "auto-generated UTC timestamp" },
      { name: "status", type: "select", details: "['unread', 'processed', 'flagged']" },
    ],
  },
  {
    id: "pages",
    name: "Pages & Layouts",
    category: "Content",
    documentCount: 12,
    description: "Modular Next.js pages assembled from dynamic block components.",
    fields: [
      { name: "title", type: "text", details: "page header" },
      { name: "slug", type: "text", details: "unique route identifier" },
      { name: "layout", type: "blocks", details: "[HeroBlock, ContentBlock, MediaGridBlock]" },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    category: "Content",
    documentCount: 8,
    description: "Hierarchical taxonomy for periodical topics.",
    fields: [
      { name: "name", type: "text", details: "taxonomy label" },
      { name: "slug", type: "text", details: "URL path" },
    ],
  },
  {
    id: "authors",
    name: "Authors",
    category: "Content",
    documentCount: 6,
    description: "Editorial team & guest contributor biographies with avatar uploads.",
    fields: [
      { name: "name", type: "text", details: "author full name" },
      { name: "bio", type: "richText", details: "Lexical short bio" },
      { name: "avatar", type: "upload (Media)", details: "Cloudflare R2 image" },
    ],
  },
  {
    id: "form-builder",
    name: "Forms",
    category: "Pipelines",
    documentCount: 4,
    description: "Form builder config (contact, periodical feedback, newsletter).",
    fields: [
      { name: "title", type: "text", details: "form title" },
      { name: "fields", type: "blocks", details: "[TextField, EmailField, TextArea, Checkbox]" },
    ],
  },
  {
    id: "header",
    name: "Header (Global)",
    category: "System",
    documentCount: 1,
    description: "Global navigation items and top promotional banners.",
    fields: [
      { name: "navItems", type: "array", details: "links with active state matching" },
    ],
  },
  {
    id: "footer",
    name: "Footer (Global)",
    category: "System",
    documentCount: 1,
    description: "Global footer links, legal policies, and editorial disclaimers.",
    fields: [
      { name: "columns", type: "array", details: "link groups & copyright notice" },
    ],
  },
  {
    id: "users",
    name: "Users & RBAC",
    category: "System",
    documentCount: 5,
    description: "Role-based authentication for editors, authors, and system admins.",
    fields: [
      { name: "email", type: "email", details: "login identifier" },
      { name: "role", type: "select", details: "['admin', 'editor', 'author']" },
    ],
  },
  {
    id: "redirects",
    name: "Redirects",
    category: "System",
    documentCount: 18,
    description: "Automated 301/308 redirect mappings executed at Next.js edge.",
    fields: [
      { name: "from", type: "text", details: "legacy URL path" },
      { name: "to", type: "text", details: "canonical destination" },
    ],
  },
  {
    id: "settings",
    name: "Site Settings",
    category: "System",
    documentCount: 1,
    description: "Global site title, default OG cards, and SEO canonical configuration.",
    fields: [
      { name: "siteTitle", type: "text", details: "default page title suffix" },
      { name: "ogImage", type: "upload (Media)", details: "social share banner" },
    ],
  },
];

export function SwabhimaanCmsVisualizer() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Content" | "Pipelines" | "System">("All");
  const [activeCollection, setActiveCollection] = useState<CollectionSchema>(COLLECTIONS[0]);
  const [showR2Code, setShowR2Code] = useState(false);

  const filteredCollections = selectedCategory === "All"
    ? COLLECTIONS
    : COLLECTIONS.filter((c) => c.category === selectedCategory);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#07080c] p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Layers size={15} />
          </div>
          <div>
            <span className="font-heading text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>Swabhimaan-2 · Embedded Payload CMS Architecture</span>
              <span className="rounded bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 font-mono text-[9px] text-emerald-300">
                13 Collections
              </span>
            </span>
          </div>
        </div>

        {/* Stack Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0c0d12] px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          <Database size={11} className="text-emerald-400" />
          <span>MongoDB Atlas + Cloudflare R2</span>
        </div>
      </div>

      {/* Cloudflare R2 Zero-Egress Pipeline Banner */}
      <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#0c0d12] p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
            <Cloud size={13} />
            Cloudflare R2 Zero-Egress Media Pipeline (region: auto)
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playClick(1100, 0.01);
              setShowR2Code(!showR2Code);
            }}
            className="font-mono text-[9px] text-muted-foreground hover:text-accent transition-colors underline"
          >
            {showR2Code ? "Hide S3 Config" : "Inspect R2 S3 Adapter"}
          </button>
        </div>

        {/* 4-Step Pipeline Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {[
            { step: "01", label: "Lexical Upload", sub: "Drag & drop PDF / Images" },
            { step: "02", label: "Sharp Engine", sub: "WebP / AVIF Responsive (400/1024/1920)" },
            { step: "03", label: "Cloudflare R2", sub: "$0 Egress Fees · PutObjectCommand" },
            { step: "04", label: "Edge ISR Purge", sub: "revalidatePath() in < 35ms" },
          ].map((item) => (
            <div key={item.step} className="rounded-lg border border-white/[0.06] bg-[#07080a] p-2">
              <span className="text-[9px] text-accent font-bold block">{item.step}</span>
              <span className="text-[10px] font-semibold text-foreground block mt-0.5">{item.label}</span>
              <span className="text-[8.5px] text-muted-foreground block mt-0.5 leading-tight">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Code Drawer for S3 R2 Adapter */}
        {showR2Code && (
          <div className="mt-3 rounded-lg border border-white/[0.08] bg-[#040507] p-2.5 font-mono text-[9px] text-foreground/80 overflow-x-auto">
            <pre>{`// payload.config.ts — Cloudflare R2 S3 Client Adapter
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.R2_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
        region: 'auto',
        endpoint: \`https://\${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com\`,
      },
    }),
  ],
})`}</pre>
          </div>
        )}
      </div>

      {/* 13 Structured Collections Schema Explorer */}
      <div className="mt-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <FolderTree size={12} className="text-emerald-400" />
            <span>Select Collection Schema (13 Total):</span>
          </span>

          <div className="flex items-center gap-1 font-mono text-[9px]">
            {(["All", "Content", "Pipelines", "System"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  sound.playClick(1000, 0.01);
                  setSelectedCategory(cat);
                }}
                className={cn(
                  "rounded px-2 py-0.5 transition-all",
                  selectedCategory === cat
                    ? "bg-foreground text-background font-semibold"
                    : "border border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Selector Pills */}
        <div className="flex flex-wrap gap-1.5 pb-2">
          {filteredCollections.map((col) => {
            const isSelected = activeCollection.id === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => {
                  sound.playClick(1100, 0.01);
                  setActiveCollection(col);
                }}
                className={cn(
                  "rounded-lg border px-2.5 py-1 font-mono text-[10px] transition-all active:scale-[0.97]",
                  isSelected
                    ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-semibold shadow-sm"
                    : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <span>{col.name}</span>
                <span className="opacity-50 ml-1 text-[8.5px]">({col.documentCount})</span>
              </button>
            );
          })}
        </div>

        {/* Active Collection Schema Inspector */}
        <div className="mt-2 rounded-xl border border-white/[0.08] bg-[#050608] p-3 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.06] pb-2 mb-2.5">
            <div>
              <span className="text-foreground font-semibold text-xs flex items-center gap-2">
                <span>{activeCollection.name} Schema</span>
                <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] text-muted-foreground font-normal">
                  {activeCollection.category}
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">
                {activeCollection.description}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              {activeCollection.documentCount} Documents Indexed
            </span>
          </div>

          {/* Fields Table */}
          <div className="space-y-1.5">
            {activeCollection.fields.map((f) => (
              <div
                key={f.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/[0.04] bg-[#090a0e] px-2.5 py-1.5 text-[10px]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-accent font-semibold">{f.name}</span>
                  <span className="rounded bg-white/[0.06] px-1 py-0.2 text-[8.5px] text-muted-foreground">
                    {f.type}
                  </span>
                </div>
                <span className="text-muted-foreground text-[9px]">{f.details}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer with Genuine Links */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3 font-mono text-xs">
        <span className="text-[10px] text-muted-foreground">
          Stack: Next.js 15.5.9 Turbopack · React 19 · Payload CMS 3.64 · MongoDB · Cloudflare R2
        </span>

        <div className="flex items-center gap-2">
          <a
            href="https://swabhimaan-2.vercel.app"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-300 font-semibold hover:bg-emerald-500 hover:text-black transition-colors"
          >
            <span>Visit Live Platform</span>
            <ExternalLink size={10} />
          </a>

          <a
            href="https://github.com/Aayush-2825/Swabhimaan-2"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-foreground hover:border-white/30 transition-colors"
          >
            <GithubIcon className="h-3 w-3" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
