import type { ProjectStatus } from "@/data/types";

type StatusLabelProps = {
  status: ProjectStatus;
};

export function StatusLabel({ status }: StatusLabelProps) {
  return (
    <span className="inline-flex border border-border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
      {status.replace("_", " ")}
    </span>
  );
}
