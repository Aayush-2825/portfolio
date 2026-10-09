export type ProjectStatus = "LIVE" | "IN_PROGRESS" | "RESEARCH" | "EXPERIMENTAL" | "PLANNED";

export type Feature = { label: string; built: boolean };
export type Node = { id: string; label: string };

export type TechnicalDecision = {
  choice: string;
  tradeoff: string;
};

export type Project = {
  slug: string;
  name: string;
  title?: string;
  summary?: string;
  status: ProjectStatus;
  category: string;
  oneLiner: string;
  role?: string;
  stack: string[];
  problem?: string;
  technicalDecision?: TechnicalDecision;
  metrics?: string[];
  links: {
    live?: string;
    repo?: string;
    demo?: string;
    writeup?: string;
  };
  images: { src: string; alt: string }[];
  highlights?: string[];
  caseStudy?: {
    problem?: string;
    users?: string;
    product?: string;
    myRole?: string[];
    focus?: string[];
    demonstrates?: string[];
    workflow?: string[];
    pipeline?: string[];
    areas?: string[];
    ideas?: string[];
    dataset?: { rows: string; columns: string; matchIds: string };
    features?: Feature[];
    architecture?: { label: string; built: boolean; nodes: Node[]; edges: [string, string][]; note?: string };
    decisions?: { title: string; body: string }[];
    challenges?: string[];
    tradeoffs?: string[];
    currentState?: string;
    future?: string;
  };
};