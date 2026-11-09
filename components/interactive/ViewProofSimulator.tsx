"use client";

import { useState } from "react";
import { sound } from "@/lib/sound";
import { GithubIcon } from "@/components/ui/icons";
import {
  Check,
  Shield,
  Eye,
  ExternalLink,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProofPhoto {
  id: string;
  name: string;
  aspect: string;
  approved: boolean;
  commentsCount: number;
}

const INITIAL_PHOTOS: ProofPhoto[] = [
  { id: "01", name: "RAW_ARCH_4021.dng", aspect: "Wide Frame", approved: true,  commentsCount: 2 },
  { id: "02", name: "RAW_PORT_4024.dng", aspect: "Portrait",   approved: true,  commentsCount: 1 },
  { id: "03", name: "RAW_STUD_4032.dng", aspect: "Close Up",   approved: false, commentsCount: 0 },
  { id: "04", name: "RAW_LAND_4045.dng", aspect: "Landscape",  approved: true,  commentsCount: 3 },
  { id: "05", name: "RAW_NATU_4058.dng", aspect: "Macro",      approved: true,  commentsCount: 0 },
  { id: "06", name: "RAW_EVNT_4062.dng", aspect: "Candid",     approved: false, commentsCount: 1 },
];

export function ViewProofSimulator() {
  const [photos, setPhotos] = useState<ProofPhoto[]>(INITIAL_PHOTOS);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [activePhoto, setActivePhoto] = useState<ProofPhoto>(INITIAL_PHOTOS[0]);
  const [lastSyncMs, setLastSyncMs] = useState(14);
  const [recentComment, setRecentComment] = useState("Client: Color-grade photo 02 slightly warmer");

  const approvedCount = photos.filter((p) => p.approved).length;
  const totalCount = photos.length;
  const approvalPercent = Math.round((approvedCount / totalCount) * 100);

  const toggleApproval = (photoId: string) => {
    sound.playClick(1050);
    setLastSyncMs(Math.floor(11 + (Number(photoId) % 7) * 2));

    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === photoId) {
          const nextState = !p.approved;
          if (nextState) sound.playSuccess();
          return { ...p, approved: nextState };
        }
        return p;
      })
    );
  };

  const handleSelectPhoto = (photo: ProofPhoto) => {
    sound.playClick(900, 0.01);
    setActivePhoto(photo);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#07080c] p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400">
            <ImageIcon size={15} />
          </div>
          <div>
            <span className="font-heading text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>ViewProof Real-Time Proofing Engine</span>
              <span className="rounded bg-sky-500/15 border border-sky-500/30 px-1.5 py-0.2 font-mono text-[9px] text-sky-300">
                React 19 + Firestore
              </span>
            </span>
          </div>
        </div>

        {/* Real-time onSnapshot Status Capsule */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Firestore onSnapshot: {lastSyncMs}ms sync</span>
        </div>
      </div>

      {/* Proofing Progress & Cloudinary Watermark Control */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Real-time Approval Counter */}
        <div className="sm:col-span-7 rounded-xl border border-white/[0.06] bg-[#0c0d12] p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Sparkles size={12} className="text-accent" />
              <span>Client Approvals</span>
            </span>
            <span className="font-semibold text-foreground">
              {approvedCount} / {totalCount} Approved ({approvalPercent}%)
            </span>
          </div>
          {/* Progress Track */}
          <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-300"
              style={{ width: `${approvalPercent}%` }}
            />
          </div>
        </div>

        {/* Cloudinary Watermark Transform Toggle */}
        <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick(1200);
              setWatermarkEnabled(!watermarkEnabled);
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 font-mono text-[10px] transition-all active:scale-[0.97]",
              watermarkEnabled
                ? "border-sky-500/40 bg-sky-500/15 text-sky-300 shadow-sm"
                : "border-white/[0.08] bg-[#0c0d12] text-muted-foreground hover:text-foreground"
            )}
          >
            <Shield size={12} className={watermarkEnabled ? "text-sky-400" : "text-muted-foreground"} />
            <span>Watermark: {watermarkEnabled ? "ON (TRANSFORMED)" : "OFF (ORIGINAL)"}</span>
          </button>
        </div>
      </div>

      {/* Cloudinary Dynamic URL Transformation Inspection */}
      <div className="mt-3 rounded-lg border border-white/[0.06] bg-[#040507] p-2.5 font-mono text-[9px] text-muted-foreground overflow-x-auto">
        <div className="flex items-center gap-1.5 text-accent font-semibold mb-1">
          <Eye size={10} />
          <span>Cloudinary On-The-Fly Dynamic URL Pipeline:</span>
        </div>
        <div className="text-foreground/80 truncate">
          https://res.cloudinary.com/viewproof/image/upload/
          <span className={watermarkEnabled ? "text-sky-300 font-bold" : "text-muted-foreground line-through"}>
            l_watermark_logo,g_center,opacity_40/
          </span>
          w_1200,f_auto,q_auto:best/album_9021/{activePhoto.name.replace(".dng", ".webp")}
        </div>
      </div>

      {/* Interactive Photo Proof Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {photos.map((photo) => {
          const isSelected = activePhoto.id === photo.id;
          return (
            <div
              key={photo.id}
              onClick={() => handleSelectPhoto(photo)}
              className={cn(
                "group relative rounded-xl border p-2.5 transition-all cursor-pointer flex flex-col justify-between min-h-[96px]",
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-white/[0.08] bg-[#090a0f] hover:border-white/[0.15]"
              )}
            >
              {/* Photo Canvas Representation */}
              <div className="relative h-12 w-full rounded-md bg-[#111218] flex items-center justify-center overflow-hidden border border-white/[0.04]">
                <ImageIcon size={18} className="text-white/20" />
                {/* Simulated Watermark Overlay */}
                {watermarkEnabled && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rotate-[-18deg] select-none">
                    <span className="font-mono text-[7px] uppercase tracking-wider text-white/30 font-bold border border-white/25 px-1 py-0.5 rounded">
                      VIEWPROOF PROTECTED
                    </span>
                  </div>
                )}
                {/* Aspect Badge */}
                <span className="absolute top-1 left-1 font-mono text-[7px] text-muted-foreground bg-black/60 px-1 rounded">
                  {photo.aspect}
                </span>
              </div>

              {/* Card Footer: Approval Checkbox & Title */}
              <div className="mt-2 flex items-center justify-between gap-1">
                <span className="font-mono text-[9px] text-foreground/90 truncate">
                  {photo.name}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleApproval(photo.id);
                  }}
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded transition-all active:scale-90",
                    photo.approved
                      ? "bg-emerald-500 text-black font-bold"
                      : "border border-white/20 bg-white/5 hover:border-accent"
                  )}
                  title={photo.approved ? "Approved (Click to revoke)" : "Click to approve"}
                >
                  {photo.approved && <Check size={11} strokeWidth={3} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Live Comment Thread via Firestore Snapshot */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-[#090a0f] px-3 py-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-muted-foreground text-[10px] truncate max-w-md">
          <MessageSquare size={12} className="text-sky-400 shrink-0" />
          <span className="text-foreground/80 truncate">{recentComment}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            sound.playClick(1300);
            setRecentComment(
              recentComment.includes("Client")
                ? "Photographer: Approved LUT applied to client proof gallery"
                : "Client: Color-grade photo 02 slightly warmer"
            );
          }}
          className="text-[9px] text-accent hover:underline shrink-0"
        >
          [Simulate Firestore Comment Push]
        </button>
      </div>

      {/* Action Footer with Genuine Links */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3 font-mono text-xs">
        <span className="text-[10px] text-muted-foreground">
          Stack: React 19 · React Router 7 · Vite 7 · Firestore · Cloudinary
        </span>

        <div className="flex items-center gap-2">
          <a
            href="https://view-proof.vercel.app"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] text-accent font-semibold hover:bg-accent hover:text-black transition-colors"
          >
            <span>Live App</span>
            <ExternalLink size={10} />
          </a>

          <a
            href="https://github.com/Aayush-2825/ViewProof"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-foreground hover:border-white/30 transition-colors"
          >
            <GithubIcon className="h-3 w-3" />
            <span>GitHub</span>
          </a>

          <a
            href="https://dev.to/aayush2825/building-viewproof-real-time-photo-proofing-with-react-19-and-firestore"
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick(1000)}
            className="inline-flex items-center gap-1 rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[10px] text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            <BookOpen size={10} />
            <span>Case Study</span>
          </a>
        </div>
      </div>
    </div>
  );
}
