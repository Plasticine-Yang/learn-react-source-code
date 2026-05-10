import { useSourceStore, type SourceTreeNode } from "@/stores/useSourceStore";
import { FileTreeNode } from "./file-tree-node";

export function FileTree() {
  const fileTree = useSourceStore((s) => s.fileTree);
  const searchQuery = useSourceStore((s) => s.searchQuery);
  const searchFile = useSourceStore((s) => s.searchFile);
  const setSearchQuery = useSourceStore((s) => s.setSearchQuery);
  const currentFile = useSourceStore((s) => s.currentFile);

  const displayTree = searchQuery ? searchFile(searchQuery) : fileTree;

  const handleSelect = (node: SourceTreeNode) => {
    if (node.type === "folder") {
      // Toggle expand in store
      node.expanded = !node.expanded;
      setSearchQuery(searchQuery); // trigger re-render
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
