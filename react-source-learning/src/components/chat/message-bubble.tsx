import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "@/lib/db-types";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className="flex items-start gap-2"
      style={{ justifyContent: isUser ? "flex-end" : "flex-start" }}
    >
      {!isUser && (
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 28, height: 28, backgroundColor: "var(--accent-blue)", color: "var(--bg-primary)", fontSize: "10px", fontWeight: 700 }}
        >
          AI
        </div>
      )}
      <div
        style={{
          maxWidth: isUser ? 260 : 290,
          padding: "10px 12px",
          backgroundColor: isUser ? "var(--chat-user-bubble)" : "var(--chat-ai-bubble)",
          borderRadius: "var(--radius-xl)",
          fontSize: "var(--font-size-base)",
          color: "var(--font-primary)",
          lineHeight: 1.6,
          wordBreak: "break-word",
        }}
      >
        {isUser ? (
          <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>{message.content}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p style={{ margin: 0, fontSize: "var(--font-size-base)", color: "var(--font-primary)", lineHeight: 1.6 }}>{children}</p>,
              code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
                const isInline = !/language-/.exec(className ?? "");
                if (isInline) {
                  return <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", backgroundColor: "var(--bg-tertiary)", padding: "1px 4px", borderRadius: 3 }}>{children}</code>;
                }
                return <pre style={{ fontFamily: "var(--font-mono)", fontSize: "11px", backgroundColor: "var(--bg-tertiary)", padding: 10, borderRadius: "var(--radius-md)", overflowX: "auto", margin: "8px 0" }}><code>{children}</code></pre>;
              },
              ul: ({ children }) => <ul style={{ paddingLeft: 20, margin: "4px 0" }}>{children}</ul>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
        {isStreaming && (
          <span className="inline-block animate-pulse" style={{ width: 2, height: 16, backgroundColor: "var(--accent-blue)", marginLeft: 2, verticalAlign: "text-bottom" }} />
        )}
      </div>
      {isUser && (
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 28, height: 28, backgroundColor: "var(--accent-purple)", color: "var(--bg-primary)", fontSize: "10px", fontWeight: 700 }}
        >
          U
        </div>
      )}
    </div>
  );
}
