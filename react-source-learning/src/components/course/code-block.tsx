import { MessageCircle } from "@/lib/icons";

interface CodeBlockProps {
  filename?: string;
  lines?: string;
  code: string;
  language?: string;
}

export function CodeBlock({ filename, lines, code, language }: CodeBlockProps) {
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--bg-tertiary)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          padding: "8px 14px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--font-secondary)",
          }}
        >
          {filename ?? "source"}
        </span>
        {lines && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--font-secondary)",
            }}
          >
            {lines}
          </span>
        )}
      </div>

      {/* Code */}
      <pre
        style={{
          padding: 14,
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--font-primary)",
          lineHeight: 1.6,
          overflowX: "auto",
          margin: 0,
        }}
      >
        <code className={`language-${language ?? "javascript"}`}>{code}</code>
      </pre>

      {/* Ask AI button */}
      <div
        className="flex items-center gap-1.5 rounded-md cursor-pointer shrink-0"
        style={{
          margin: "0 14px 14px",
          padding: "8px 16px",
          border: "1px solid var(--accent-blue)",
          color: "var(--accent-blue)",
          fontSize: "var(--font-size-xs)",
          alignSelf: "flex-start",
        }}
      >
        <MessageCircle size={14} />
        请 AI 讲解此段源码
      </div>
    </div>
  );
}
