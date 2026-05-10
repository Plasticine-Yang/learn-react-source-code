export function ChatMessages() {
  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto"
      style={{ padding: 14, gap: 14 }}
    >
      {/* AI message */}
      <div className="flex items-start gap-2">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "var(--accent-blue)",
            color: "var(--bg-primary)",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          AI
        </div>
        <div
          className="flex flex-col"
          style={{
            maxWidth: 290,
            padding: "10px 12px",
            backgroundColor: "var(--chat-ai-bubble)",
            borderRadius: "var(--radius-xl)",
            fontSize: "var(--font-size-base)",
            color: "var(--font-primary)",
            lineHeight: 1.6,
          }}
        >
          <p>
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--font-size-xs)",
                backgroundColor: "var(--bg-tertiary)",
                padding: "1px 4px",
                borderRadius: 3,
              }}
            >
              workLoopSync
            </code>{" "}
            是同步工作循环的入口。它在一个 while 循环中不断调用{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                backgroundColor: "var(--bg-tertiary)",
                padding: "1px 4px",
                borderRadius: 3,
              }}
            >
              performUnitOfWork
            </code>
            ，直到 Fiber 树完全遍历。
          </p>
        </div>
      </div>

      {/* User message */}
      <div className="flex justify-end">
        <div
          className="flex flex-col"
          style={{
            maxWidth: 260,
            padding: "10px 12px",
            backgroundColor: "var(--chat-user-bubble)",
            borderRadius: "var(--radius-xl)",
            fontSize: "var(--font-size-base)",
            color: "var(--font-primary)",
            lineHeight: 1.6,
          }}
        >
          <p>
            为什么需要两个工作循环？
          </p>
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex items-start gap-2">
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "var(--accent-blue)",
            color: "var(--bg-primary)",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          AI
        </div>
        <div
          className="flex items-center gap-1"
          style={{
            padding: "10px 14px",
            backgroundColor: "var(--chat-ai-bubble)",
            borderRadius: "var(--radius-xl)",
          }}
        >
          <div
            className="rounded-full animate-bounce"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "var(--accent-blue)",
              animationDelay: "0ms",
            }}
          />
          <div
            className="rounded-full animate-bounce"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "var(--accent-blue)",
              animationDelay: "150ms",
            }}
          />
          <div
            className="rounded-full animate-bounce"
            style={{
              width: 6,
              height: 6,
              backgroundColor: "var(--accent-blue)",
              animationDelay: "300ms",
            }}
          />
        </div>
      </div>
    </div>
  );
}
