import { ChevronLeft, ChevronRight } from "@/lib/icons";

interface ModuleNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  onQuiz?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function ModuleNav({ onPrev, onNext, onQuiz, hasPrev, hasNext }: ModuleNavProps) {
  return (
    <div
      className="flex items-center justify-between shrink-0"
      style={{
        paddingTop: 16,
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div
        className="flex items-center gap-1.5 rounded-md cursor-pointer"
        style={{
          padding: "6px 10px",
          color: hasPrev ? "var(--font-secondary)" : "var(--font-secondary)",
          opacity: hasPrev ? 1 : 0.4,
          fontSize: "var(--font-size-sm)",
          cursor: hasPrev ? "pointer" : "default",
        }}
        onClick={hasPrev ? onPrev : undefined}
      >
        <ChevronLeft size={14} />
        上一节
      </div>
      <div
        className="flex items-center gap-1.5 rounded-md cursor-pointer"
        style={{
          padding: "8px 16px",
          backgroundColor: "var(--accent-blue)",
          color: "var(--bg-primary)",
          fontSize: "var(--font-size-sm)",
          fontWeight: 600,
        }}
        onClick={onQuiz}
      >
        做个小测
      </div>
      <div
        className="flex items-center gap-1.5 rounded-md cursor-pointer"
        style={{
          padding: "6px 10px",
          color: "var(--font-secondary)",
          opacity: hasNext ? 1 : 0.4,
          fontSize: "var(--font-size-sm)",
          cursor: hasNext ? "pointer" : "default",
        }}
        onClick={hasNext ? onNext : undefined}
      >
        下一节
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
