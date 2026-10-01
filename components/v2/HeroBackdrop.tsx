"use client";

import dynamic from "next/dynamic";

const DotGrid = dynamic(
  () => import("@/components/v2/DotGridFallback").then((module) => module.DotGridFallback),
  { ssr: false },
);

export function HeroBackdrop() {
  return <DotGrid />;
}
