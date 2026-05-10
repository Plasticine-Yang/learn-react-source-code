export function SidebarHeader() {
  return (
    <div
      className="flex flex-col"
      style={{ padding: "16px 14px 12px 14px", gap: 12 }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "var(--accent-purple)",
            color: "var(--bg-primary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 700,
          }}
        >
          U
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className="truncate"
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--font-primary)",
              fontWeight: 500,
            }}
          >
            前端开发者
          </span>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--font-secondary)",
            }}
          >
            学习进度 35%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: 4, backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: "35%",
            backgroundColor: "var(--accent-blue)",
          }}
        />
      </div>
    </div>
  );
}
