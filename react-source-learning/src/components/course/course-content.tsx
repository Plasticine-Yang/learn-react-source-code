import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";
import { MermaidDiagram } from "./mermaid-diagram";

interface CourseContentProps {
  markdown: string | null;
}

export function CourseContentView({ markdown }: CourseContentProps) {
  const components = useMemo(
    () => ({
      h1: ({ children }: { children?: React.ReactNode }) => (
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--font-primary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {children}
        </h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: 700,
            color: "var(--font-primary)",
            marginTop: 16,
          }}
        >
          {children}
        </h2>
      ),
      p: ({ children }: { children?: React.ReactNode }) => (
        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--font-primary)",
            lineHeight: 1.7,
          }}
        >
          {children}
        </p>
      ),
      code({ className, children }: { className?: string; children?: React.ReactNode }) {
        const match = /language-(\w+)/.exec(className ?? "");
        const isInline = !match;
        const codeStr = String(children ?? "").replace(/\n$/, "");

        if (isInline) {
          return (
            <code
              className={className}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--font-size-xs)",
                backgroundColor: "var(--bg-tertiary)",
                padding: "1px 4px",
                borderRadius: 3,
              }}
            >
              {children}
            </code>
          );
        }

        if (match[1] === "mermaid") {
          return <MermaidDiagram chart={codeStr} />;
        }

        return <CodeBlock code={codeStr} language={match[1]} />;
      },
      pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
      ul: ({ children }: { children?: React.ReactNode }) => (
        <ul
          style={{
            paddingLeft: 24,
            fontSize: "var(--font-size-base)",
            color: "var(--font-primary)",
            lineHeight: 1.8,
          }}
        >
          {children}
        </ul>
      ),
      table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--border-color)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
        </div>
      ),
    }),
    [],
  );

  return (
    <div className="flex flex-col" style={{ gap: 20 }}>
      {markdown ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {markdown}
        </ReactMarkdown>
      ) : (
        <div
          className="flex items-center justify-center h-full"
          style={{ color: "var(--font-secondary)", fontSize: "var(--font-size-sm)" }}
        >
          选择一个小节开始学习
        </div>
      )}
    </div>
  );
}
