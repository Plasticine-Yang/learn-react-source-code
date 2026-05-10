import { useAppStore } from "@/stores/useAppStore";
import { Search } from "@/lib/icons";

export function GlobalSearch() {
  const isOpen = useAppStore((s) => s.isSearchOpen);
  const setOpen = useAppStore((s) => s.setSearchOpen);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => setOpen(false)}
      />

      {/* Search panel */}
      <div
        className="fixed top-[20%] left-1/2 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 560,
          marginLeft: -280,
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2"
          style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-color)" }}
        >
          <Search size={18} style={{ color: "var(--accent-blue)" }} />
          <input
            className="flex-1 bg-transparent outline-none"
            placeholder="Search files or code..."
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--font-primary)",
            }}
            autoFocus
          />
          <div
            className="rounded"
            style={{
              padding: "2px 6px",
              backgroundColor: "var(--bg-secondary)",
              fontSize: "10px",
              color: "var(--font-secondary)",
            }}
          >
            ESC
          </div>
        </div>

        {/* Empty state */}
        <div
          className="flex items-center justify-center"
          style={{ padding: 32, color: "var(--font-secondary)", fontSize: "var(--font-size-sm)" }}
        >
          输入关键词搜索模块或源码文件
        </div>
      </div>
    </>
  );
}
