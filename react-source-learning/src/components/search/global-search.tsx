import { useState, useMemo } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { useCourseStore } from "@/stores/useCourseStore";
import { useSourceStore } from "@/stores/useSourceStore";
import { Search } from "@/lib/icons";

interface SearchResult {
  type: "module" | "section" | "file";
  label: string;
  description: string;
  action: () => void;
}

export function GlobalSearch() {
  const isOpen = useAppStore((s) => s.isSearchOpen);
  const setOpen = useAppStore((s) => s.setSearchOpen);
  const modules = useCourseStore((s) => s.modules);
  const loadSection = useCourseStore((s) => s.loadSection);
  const fileTree = useSourceStore((s) => s.fileTree);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    const res: SearchResult[] = [];

    for (const mod of modules) {
      if (mod.title.toLowerCase().includes(lower)) {
        res.push({
          type: "module",
          label: mod.title,
          description: `${mod.sections.length} sections`,
          action: () => {
            if (mod.sections[0]) loadSection(mod.id, mod.sections[0].id);
            setOpen(false);
          },
        });
      }
      for (const sec of mod.sections) {
        if (sec.title.toLowerCase().includes(lower)) {
          res.push({
            type: "section",
            label: sec.title,
            description: mod.title,
            action: () => {
              loadSection(mod.id, sec.id);
              setOpen(false);
            },
          });
        }
      }
    }

    function walkTree(nodes: typeof fileTree) {
      for (const node of nodes) {
        if (node.name.toLowerCase().includes(lower)) {
          res.push({
            type: "file",
            label: node.name,
            description: node.path,
            action: () => setOpen(false),
          });
        }
        if (node.children) walkTree(node.children);
      }
    }
    walkTree(fileTree);

    return res;
  }, [query, modules, fileTree, loadSection, setOpen]);

  const handleClose = () => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      results[selectedIndex].action();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={handleClose} />
      <div
        className="fixed top-[15%] left-1/2 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 560,
          transform: "translateX(-50%)",
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Input */}
        <div
          className="flex items-center gap-2 shrink-0"
          style={{ padding: "16px 20px", borderBottom: results.length > 0 ? "1px solid var(--border-color)" : "none" }}
        >
          <Search size={18} style={{ color: "var(--accent-blue)" }} />
          <input
            className="flex-1 bg-transparent outline-none"
            placeholder="搜索模块或源码文件..."
            style={{ fontSize: "var(--font-size-base)", color: "var(--font-primary)" }}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span style={{ fontSize: "10px", color: "var(--font-secondary)", padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4 }}>
            ESC
          </span>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: 320, padding: 8 }}>
            {results.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg cursor-pointer"
                style={{
                  padding: "8px 12px",
                  backgroundColor: i === selectedIndex ? "var(--bg-secondary)" : "transparent",
                }}
                onClick={r.action}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div
                  className="flex items-center justify-center rounded shrink-0"
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor:
                      r.type === "file" ? "var(--bg-tertiary)" : "var(--bg-secondary)",
                    fontSize: "10px",
                    color: r.type === "file" ? "var(--accent-cyan)" : "var(--accent-blue)",
                  }}
                >
                  {r.type === "file" ? "F" : "M"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span style={{ fontSize: "var(--font-size-sm)", color: "var(--font-primary)", fontWeight: 500 }}>
                    {r.label}
                  </span>
                  <span className="truncate" style={{ fontSize: "var(--font-size-xs)", color: "var(--font-secondary)" }}>
                    {r.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="flex items-center justify-center" style={{ padding: 32, fontSize: "var(--font-size-sm)", color: "var(--font-secondary)" }}>
            未找到匹配结果
          </div>
        ) : (
          <div className="flex items-center justify-center" style={{ padding: 32, fontSize: "var(--font-size-sm)", color: "var(--font-secondary)" }}>
            输入关键词搜索模块或源码文件
          </div>
        )}
      </div>
    </>
  );
}
