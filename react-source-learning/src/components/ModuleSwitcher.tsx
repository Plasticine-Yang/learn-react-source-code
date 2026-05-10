import { useAppStore } from "@/stores/useAppStore";
import { ChevronDown } from "@/lib/icons";

export function ModuleSwitcher() {
  const mod = useAppStore((s) => s.currentModule);

  return (
    <div
      className="flex items-center gap-1.5 rounded-md cursor-pointer"
      style={{
        padding: "6px 12px",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <span
        style={{ fontSize: "var(--font-size-xs)", color: "var(--font-secondary)" }}
      >
        模块 {mod.index} / {mod.total}
      </span>
      <ChevronDown size={12} style={{ color: "var(--font-secondary)" }} />
    </div>
  );
}
