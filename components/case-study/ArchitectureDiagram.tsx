import type { Project } from "@/data/types";

type Architecture = NonNullable<NonNullable<Project["caseStudy"]>["architecture"]>;

type ArchitectureDiagramProps = {
  architecture: Architecture;
};

type Position = {
  x: number;
  y: number;
};

function wrapLabel(label: string, maxCharacters = 24) {
  const words = label.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  if (!architecture.nodes.length) {
    return null;
  }

  const columns = 3;
  const nodeWidth = 220;
  const nodeHeight = 64;
  const gapX = 28;
  const gapY = 28;
  const padding = 24;
  const rows = Math.ceil(architecture.nodes.length / columns);
  const width = padding * 2 + columns * nodeWidth + (columns - 1) * gapX;
  const height = padding * 2 + rows * nodeHeight + (rows - 1) * gapY;
  const positions = new Map<string, Position>();

  architecture.nodes.forEach((node, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    positions.set(node.id, {
      x: padding + column * (nodeWidth + gapX),
      y: padding + row * (nodeHeight + gapY),
    });
  });

  return (
    <div className="overflow-x-auto">
      <svg
        role="img"
        aria-label={architecture.built ? architecture.label : `${architecture.label} - planned direction`}
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[720px]"
      >
        <defs>
          <marker
            id="architecture-arrow"
            markerHeight="7"
            markerWidth="7"
            orient="auto-start-reverse"
            refX="6"
            refY="3.5"
            viewBox="0 0 7 7"
          >
            <path d="M 0 0 L 7 3.5 L 0 7 z" fill="var(--muted-foreground)" />
          </marker>
        </defs>
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          fill="var(--background)"
          stroke="var(--border)"
          strokeDasharray={architecture.built ? undefined : "8 8"}
        />
        {architecture.edges.map(([from, to]) => {
          const start = positions.get(from);
          const end = positions.get(to);
          if (!start || !end) {
            return null;
          }

          return (
            <line
              key={`${from}-${to}`}
              x1={start.x + nodeWidth / 2}
              y1={start.y + nodeHeight / 2}
              x2={end.x + nodeWidth / 2}
              y2={end.y + nodeHeight / 2}
              stroke="var(--muted-foreground)"
              strokeWidth="1"
              markerEnd="url(#architecture-arrow)"
            />
          );
        })}
        {architecture.nodes.map((node) => {
          const position = positions.get(node.id);
          if (!position) {
            return null;
          }

          const lines = wrapLabel(node.label);
          const textStart = position.y + nodeHeight / 2 - ((lines.length - 1) * 8) / 2 + 4;

          return (
            <g key={node.id}>
              <rect
                x={position.x}
                y={position.y}
                width={nodeWidth}
                height={nodeHeight}
                fill="var(--secondary)"
                stroke="var(--foreground)"
                strokeWidth="1"
              />
              <text
                x={position.x + nodeWidth / 2}
                y={textStart}
                fill="var(--foreground)"
                fontFamily="var(--font-geist-mono)"
                fontSize="11"
                textAnchor="middle"
              >
                {lines.map((line, index) => (
                  <tspan key={line} x={position.x + nodeWidth / 2} dy={index === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
      <details className="mt-4 border-t border-border pt-3">
        <summary className="cursor-pointer font-mono text-xs uppercase text-muted">
          Text architecture alternative
        </summary>
        <ul className="mt-3 grid gap-2 text-sm text-muted">
          {architecture.edges.map(([from, to]) => {
            const fromLabel = architecture.nodes.find((node) => node.id === from)?.label ?? from;
            const toLabel = architecture.nodes.find((node) => node.id === to)?.label ?? to;
            return <li key={`${from}-${to}`}>{fromLabel} -&gt; {toLabel}</li>;
          })}
        </ul>
      </details>
    </div>
  );
}
