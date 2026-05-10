import { useAppStore } from "@/stores/useAppStore";
import { BookOpen } from "@/lib/icons";

export function ToolbarLeft() {
  const mod = useAppStore((s) => s.currentModule);

  return (
    <div className="flex items-center gap-2">
      <BookOpen
        size={18}
        style={{ color: "var(--accent-blue)" }}
      />
      <span
        className="font-semibold"
        style={{ fontSize: "var(--font-size-sm)", color: "var(--font-primary)" }}
      >
        React 源码学习
      </span>
      <span
        style={{ fontSize: "var(--font-size-sm)", color: "var(--font-secondary)" }}
      >
        /
      </span>
      <span
        style={{ fontSize: "12px", color: "var(--font-secondary)" }}
      >
        {mod.title}
      </span>
    </div>
  );
}
