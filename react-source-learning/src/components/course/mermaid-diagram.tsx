import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#7aa2f7",
    primaryTextColor: "#c0caf5",
    lineColor: "#565f89",
    secondaryColor: "#24283b",
    tertiaryColor: "#1a1b26",
  },
});

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const id = `mermaid-${Math.random().toString(36).slice(2)}`;
    ref.current.innerHTML = "";
    mermaid.render(id, chart).then(({ svg }) => {
      if (ref.current) {
        ref.current.innerHTML = svg;
      }
    });
  }, [chart]);

  return (
    <div
      ref={ref}
      className="flex justify-center overflow-x-auto rounded-lg"
      style={{ padding: 16, backgroundColor: "var(--bg-tertiary)" }}
    />
  );
}
