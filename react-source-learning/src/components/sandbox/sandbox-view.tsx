import { useSandboxStore } from "@/stores/useSandboxStore";
import { Zap, Plus } from "@/lib/icons";
import { EmptyState } from "@/components/shared/empty-state";

export function SandboxView() {
  const files = useSandboxStore((s) => s.files);
  const activeFile = useSandboxStore((s) => s.activeFile);
  const setActiveFile = useSandboxStore((s) => s.setActiveFile);
  const updateContent = useSandboxStore((s) => s.updateFileContent);
  const addFile = useSandboxStore((s) => s.addFile);
  const deleteFile = useSandboxStore((s) => s.deleteFile);
  const toggleLogPanel = useSandboxStore((s) => s.toggleLogPanel);
  const isLogPanelOpen = useSandboxStore((s) => s.isLogPanelOpen);

  const currentFile = files.find((f) => f.name === activeFile);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ height: 48, padding: "0 16px", borderBottom: "1px solid var(--border-color)" }}
      >
        <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--font-primary)" }}>
          React Source Learning / Sandbox
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-row min-h-0">
        {/* File sidebar */}
        <div
          className="flex flex-col shrink-0"
          style={{
            width: 260,
            borderRight: "1px solid var(--border-color)",
          }}
        >
          <div
            className="flex items-center justify-between shrink-0"
            style={{ padding: 16, borderBottom: "1px solid var(--border-color)" }}
          >
            <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
              Sandbox Files
            </span>
            <div
              className="flex items-center justify-center rounded cursor-pointer"
              style={{ width: 24, height: 24 }}
              onClick={() => {
                const name = `File${files.length + 1}.jsx`;
                addFile(name);
              }}
            >
              <Plus size={14} style={{ color: "var(--font-secondary)" }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ padding: 6 }}>
            {files.map((f) => (
              <div
                key={f.name}
                className="flex items-center rounded cursor-pointer"
                style={{
                  padding: "6px 10px",
                  gap: 6,
                  backgroundColor: f.name === activeFile ? "var(--bg-secondary)" : "transparent",
                }}
                onClick={() => setActiveFile(f.name)}
              >
                <span
                  style={{ fontSize: "var(--font-size-xs)", color: "var(--font-primary)", fontFamily: "var(--font-mono)" }}
                >
                  {f.name}
                </span>
                {files.length > 1 && (
                  <span
                    style={{ marginLeft: "auto", color: "var(--font-secondary)", cursor: "pointer" }}
                    onClick={(e) => { e.stopPropagation(); deleteFile(f.name); }}
                  >
                    ×
                  </span>
                )}
              </div>
            ))}
          </div>
          <div style={{ padding: 12, borderTop: "1px solid var(--border-color)" }}>
            <div
              className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer"
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--accent-blue)",
                color: "var(--bg-primary)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
              }}
              onClick={toggleLogPanel}
            >
              <Zap size={14} />
              Inject Fiber Logs
            </div>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="flex-1 flex flex-row min-w-0">
          {/* Editor */}
          <div
            className="flex-1 flex flex-col"
            style={{ borderRight: "1px solid var(--border-color)" }}
          >
            <div
              className="flex items-center justify-between shrink-0"
              style={{ padding: "6px 12px", borderBottom: "1px solid var(--border-color)" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--font-secondary)" }}>
                {activeFile ?? ""}
              </span>
            </div>
            <textarea
              className="flex-1 resize-none outline-none"
              style={{
                padding: 16,
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--font-primary)",
                backgroundColor: "var(--bg-primary)",
                border: "none",
                lineHeight: 1.7,
              }}
              value={currentFile?.content ?? ""}
              onChange={(e) => activeFile && updateContent(activeFile, e.target.value)}
            />
          </div>

          {/* Preview */}
          <div className="flex flex-col" style={{ width: 460 }}>
            <div
              className="flex items-center shrink-0"
              style={{ padding: "6px 12px", borderBottom: "1px solid var(--border-color)" }}
            >
              <span style={{ fontSize: "10px", color: "var(--font-secondary)" }}>Preview</span>
            </div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--font-secondary)",
                fontSize: "var(--font-size-xs)",
              }}
            >
              <EmptyState title="Preview will render here" description="Edit code in the editor and see the live preview" />
            </div>

            {/* Fiber log panel */}
            {isLogPanelOpen && (
              <div
                className="flex flex-col shrink-0"
                style={{
                  height: 200,
                  borderTop: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                }}
              >
                <div
                  className="flex items-center justify-between shrink-0"
                  style={{ padding: "6px 12px", borderBottom: "1px solid var(--border-color)" }}
                >
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--font-primary)" }}>
                    Fiber Log
                  </span>
                  <span style={{ fontSize: "9px", color: "var(--font-secondary)" }} onClick={toggleLogPanel}>
                    ×
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto" style={{ padding: "8px 12px" }}>
                  <pre style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--font-secondary)", margin: 0 }}>
{`[Fiber] beginWork  FiberNode(div#root)
[Fiber] beginWork  FiberNode(App)
[Fiber] beginWork  FiberNode(Counter)
[Fiber] beginWork  FiberNode(h1)
[Fiber] completeWork FiberNode(h1)
[Fiber] beginWork  FiberNode(p)  text="0"
[Fiber] completeWork FiberNode(p)
[Fiber] beginWork  FiberNode(button) onClick
[Fiber] completeWork FiberNode(button)
[Fiber] completeWork FiberNode(Counter)
[Fiber] completeWork FiberNode(App)
[Fiber] commitRoot   effect: Placement → h1
[Fiber] commitRoot   effect: Placement → p
[Fiber] commitRoot   effect: Placement → button
[Done] 13 Fiber nodes traversed, 3 DOM nodes committed`}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
