import { useSourceStore } from "@/stores/useSourceStore";
import { MessageCircle } from "@/lib/icons";

const SAMPLE_CONTENT = `function workLoopSync() {
  // perform work until there's none left
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  // perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork: Fiber): Fiber | null {
  const current = unitOfWork.alternate;
  let next;

  next = beginWork(current, unitOfWork, subtreeRenderLanes);

  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }

  return next;
}`;

export function CodeViewer() {
  const currentFile = useSourceStore((s) => s.currentFile);
  const highlightLines = useSourceStore((s) => s.highlightLines);

  const code = currentFile?.content ?? SAMPLE_CONTENT;
  const fileName = currentFile?.name ?? "ReactFiberWorkLoop.js";
  const lines = code.split("\n");

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "var(--bg-tertiary)" }}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 shrink-0" style={{ padding: "4px 10px 0" }}>
        <div
          className="flex items-center gap-1 rounded-t"
          style={{
            padding: "4px 10px",
            backgroundColor: "var(--bg-tertiary)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--font-primary)" }}>
            {fileName}
          </span>
          <span style={{ fontSize: "9px", color: "var(--font-secondary)" }}>×</span>
        </div>
      </div>

      {/* Code area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div
          className="flex flex-col shrink-0 select-none"
          style={{
            padding: "10px 6px",
            borderRight: "1px solid var(--border-color)",
            gap: 3,
            backgroundColor: "var(--bg-primary)",
          }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              style={{
                width: 36,
                textAlign: "right",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--font-secondary)",
                lineHeight: "1.6",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto">
          <pre
            style={{
              padding: "10px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--font-primary)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: highlightLines.includes(i + 1)
                    ? "rgba(122, 162, 247, 0.1)"
                    : "transparent",
                  borderLeft: highlightLines.includes(i + 1)
                    ? "3px solid var(--accent-blue)"
                    : "3px solid transparent",
                  paddingLeft: highlightLines.includes(i + 1) ? 8 : 11,
                  marginLeft: highlightLines.includes(i + 1) ? 0 : 0,
                }}
              >
                <span style={{ color: "var(--accent-purple)" }}>
                  {line.match(/^\s*(function|const|let|var|if|else|while|return)\b/)?.[1]}
                </span>
                {line.replace(/^\s*(function|const|let|var|if|else|while|return)\b/, "")}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* AI highlight bar */}
      {highlightLines.length > 0 && (
        <div
          className="flex items-center gap-2 shrink-0"
          style={{
            padding: "8px 14px",
            borderTop: "1px solid var(--border-color)",
            backgroundColor: "rgba(122, 162, 247, 0.05)",
          }}
        >
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--accent-blue)" }}>
            AI 解释行 {highlightLines.join(", ")}
          </span>
          <div
            className="flex items-center gap-1 rounded cursor-pointer"
            style={{
              padding: "4px 10px",
              color: "var(--accent-blue)",
              fontSize: "var(--font-size-xs)",
            }}
          >
            <MessageCircle size={12} />
            展开解释
          </div>
        </div>
      )}
    </div>
  );
}
