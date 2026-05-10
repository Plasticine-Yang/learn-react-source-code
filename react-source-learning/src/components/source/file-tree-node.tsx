import { Folder, FolderOpen, FileCode, ChevronDown, ChevronRight } from "@/lib/icons";
import type { SourceTreeNode } from "@/stores/useSourceStore";

interface FileTreeNodeProps {
  node: SourceTreeNode;
  depth?: number;
  onSelect: (node: SourceTreeNode) => void;
  selectedPath?: string;
}

export function FileTreeNode({ node, depth = 0, onSelect, selectedPath }: FileTreeNodeProps) {
  const isFolder = node.type === "folder";
  const isSelected = node.path === selectedPath;
  const paddingLeft = 14 + depth * 14;

  return (
    <>
      <div
        className="flex items-center rounded cursor-pointer"
        style={{
          padding: `3px 14px 3px ${paddingLeft}px`,
          gap: 6,
          backgroundColor: isSelected ? "var(--bg-secondary)" : "transparent",
        }}
        onClick={() => onSelect(node)}
      >
        {isFolder && (
          node.expanded
            ? <ChevronDown size={10} style={{ color: "var(--font-secondary)" }} />
            : <ChevronRight size={10} style={{ color: "var(--font-secondary)" }} />
        )}
        {isFolder ? (
          node.expanded
            ? <FolderOpen size={12} style={{ color: "var(--accent-blue)" }} />
            : <Folder size={12} style={{ color: "var(--accent-blue)" }} />
        ) : (
          <FileCode
            size={12}
            style={{ color: isSelected ? "var(--accent-cyan)" : "var(--font-secondary)" }}
          />
        )}
        <span
          className="truncate"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: isSelected ? "var(--accent-cyan)" : "var(--font-primary)",
            fontWeight: isSelected ? 500 : 400,
          }}
        >
          {node.name}
        </span>
      </div>
      {isFolder && node.expanded && node.children?.map((child) => (
        <FileTreeNode
          key={child.path}
          node={child}
          depth={depth + 1}
          onSelect={onSelect}
          selectedPath={selectedPath}
        />
      ))}
    </>
  );
}
