type Decision = {
  title: string;
  body: string;
};

type DecisionListProps = {
  decisions?: Decision[];
};

function isRenderable(value: string) {
  return value.trim().length > 0 && !value.includes("TODO(aayush)");
}

export function DecisionList({ decisions }: DecisionListProps) {
  const renderableDecisions = decisions?.filter(
    (decision) => isRenderable(decision.title) && isRenderable(decision.body),
  );

  if (!renderableDecisions?.length) {
    return null;
  }

  return (
    <ol className="divide-y divide-border border-y">
      {renderableDecisions.map((decision, index) => (
        <li key={decision.title} className="grid gap-3 py-5 sm:grid-cols-[3rem_0.8fr_1.2fr] sm:gap-6">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="font-medium text-foreground">{decision.title}</h4>
          <p className="text-sm leading-6 text-muted-foreground">{decision.body}</p>
        </li>
      ))}
    </ol>
  );
}
