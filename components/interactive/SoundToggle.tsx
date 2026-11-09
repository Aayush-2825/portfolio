"use client";

import { useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function SoundToggle({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [enabled, setEnabled] = useState(() => (typeof window !== "undefined" ? sound.isEnabled() : false));

  const toggle = () => {
    const next = sound.toggle();
    setEnabled(next);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "group relative inline-flex h-9 items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        enabled && "border-accent/50 bg-accent/10 text-accent",
        className
      )}
      title={enabled ? "Mute interactive audio" : "Enable interactive sound feedback"}
      aria-label={enabled ? "Mute interactive audio" : "Enable interactive sound feedback"}
    >
      {enabled ? (
        <>
          <Volume2 size={13} className="text-accent" />
          <span className="hidden sm:inline">Audio: ON</span>
          <span className="flex items-center gap-0.5">
            <span className="h-2 w-0.5 animate-[pulse_0.6s_ease-in-out_infinite] bg-accent" />
            <span className="h-3 w-0.5 animate-[pulse_0.8s_ease-in-out_infinite_0.15s] bg-accent" />
            <span className="h-1.5 w-0.5 animate-[pulse_0.5s_ease-in-out_infinite_0.3s] bg-accent" />
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="opacity-60" />
          <span className="hidden sm:inline">Audio: OFF</span>
        </>
      )}
    </button>
  );
}
