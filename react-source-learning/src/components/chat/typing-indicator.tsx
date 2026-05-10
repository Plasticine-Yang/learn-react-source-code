export function TypingIndicator() {
  return (
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
          style={{ width: 6, height: 6, backgroundColor: "var(--accent-blue)", animationDelay: "0ms" }}
        />
        <div
          className="rounded-full animate-bounce"
          style={{ width: 6, height: 6, backgroundColor: "var(--accent-blue)", animationDelay: "150ms" }}
        />
        <div
          className="rounded-full animate-bounce"
          style={{ width: 6, height: 6, backgroundColor: "var(--accent-blue)", animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
