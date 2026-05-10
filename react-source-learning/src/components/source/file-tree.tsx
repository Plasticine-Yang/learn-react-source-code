import { useSourceStore, type SourceTreeNode } from "@/stores/useSourceStore";
import { FileTreeNode } from "./file-tree-node";

export function FileTree() {
  const fileTree = useSourceStore((s) => s.fileTree);
  const searchQuery = useSourceStore((s) => s.searchQuery);
  const searchFile = useSourceStore((s) => s.searchFile);
  const setSearchQuery = useSourceStore((s) => s.setSearchQuery);
  const currentFile = useSourceStore((s) => s.currentFile);

  const displayTree = searchQuery ? searchFile(searchQuery) : fileTree;

  const setCurrentFile = useSourceStore((s) => s.setCurrentFile);

  const handleSelect = (node: SourceTreeNode) => {
    if (node.type === "folder") {
      node.expanded = !node.expanded;
      setSearchQuery(searchQuery);
    } else {
      setCurrentFile({
        path: node.path,
        name: node.name,
        content: `// ${node.path}\n// React 18.2.0 source file\n\nimport type { Fiber } from './ReactFiber';\n\nexport function performUnitOfWork(unitOfWork: Fiber): Fiber | null {\n  const current = unitOfWork.alternate;\n  let next: Fiber | null = null;\n\n  // beginWork processes the current fiber\n  next = beginWork(current, unitOfWork, renderLanes);\n\n  if (next === null) {\n    // No child to work on, complete this unit\n    completeUnitOfWork(unitOfWork);\n  } else {\n    workInProgress = next;\n  }\n\n  return next;\n}\n\nfunction beginWork(\n  current: Fiber | null,\n  workInProgress: Fiber,\n  renderLanes: number,\n): Fiber | null {\n  // Implementation in ReactFiberBeginWork.js\n  return workInProgress.child;\n}\n`,
        lines: 30,
      });
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Search */}
      <div
        className="flex items-center gap-1.5 shrink-0"
        style={{ padding: "8px 10px", borderBottom: "1px solid var(--border-color)" }}
      >
        <input
          className="flex-1 outline-none bg-transparent"
          placeholder="Search in source..."
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--font-primary)",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "6px 0" }}>
        <div
          className="flex items-center justify-between"
          style={{ padding: "6px 14px" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, color: "var(--font-primary)" }}>
            react-18.2.0/packages
          </span>
        </div>
        {displayTree.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            onSelect={handleSelect}
            selectedPath={currentFile?.path ?? undefined}
          />
        ))}
      </div>
    </div>
  );
}
