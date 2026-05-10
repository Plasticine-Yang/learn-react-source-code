import { ArrowUp } from "@/lib/icons";

export function ChatInput() {
  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        padding: "10px 14px",
        borderTop: "1px solid var(--border-color)",
        gap: 4,
      }}
    >
      <div className="flex items-end gap-1.5">
        <div
          className="flex-1 rounded-lg"
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            fontSize: "var(--font-size-xs)",
            color: "var(--font-secondary)",
            minHeight: 36,
          }}
        >
          Ask something...
        </div>
        <div
          className="flex items-center justify-center rounded-md shrink-0 cursor-pointer"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "var(--accent-blue)",
          }}
        >
          <ArrowUp size={16} style={{ color: "var(--bg-primary)" }} />
        </div>
      </div>
      <span
        style={{
          fontSize: "9px",
          color: "var(--font-secondary)",
        }}
      >
        Enter 发送 · Shift+Enter 换行
      </span>
    </div>
  );
}
