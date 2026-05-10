import { useChatPanelStore } from "@/stores/useChatPanelStore";
import { Plus, ChevronRight } from "@/lib/icons";

export function ChatHeader() {
  const toggle = useChatPanelStore((s) => s.toggle);

  return (
    <div
      className="flex items-center justify-between shrink-0"
      style={{
        padding: "10px 14px",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <span
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: 600,
          color: "var(--font-primary)",
        }}
      >
        AI 导师
      </span>
      <div className="flex items-center gap-0.5">
        <div
          className="flex items-center justify-center rounded cursor-pointer"
          style={{ width: 26, height: 26 }}
        >
          <Plus size={14} style={{ color: "var(--font-secondary)" }} />
        </div>
        <div
          className="flex items-center justify-center rounded cursor-pointer"
          style={{ width: 26, height: 26 }}
          onClick={toggle}
        >
          <ChevronRight size={14} style={{ color: "var(--font-secondary)" }} />
        </div>
      </div>
    </div>
  );
}
