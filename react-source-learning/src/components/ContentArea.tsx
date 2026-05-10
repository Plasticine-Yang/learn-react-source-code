import { ChevronLeft, ChevronRight, BookOpen } from "@/lib/icons";

export function ContentArea() {
  return (
    <main
      className="flex-1 flex flex-col overflow-y-auto min-w-0"
      style={{ padding: "32px 40px", gap: 24 }}
    >
      {/* Module header */}
      <div className="flex flex-col" style={{ gap: 4 }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--accent-blue)",
          }}
        >
          模块 2 · Fiber 架构与工作循环
        </span>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--font-primary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          工作循环 (Work Loop)
        </h1>
        <div className="flex items-center gap-4" style={{ marginTop: 4 }}>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--font-secondary)",
            }}
          >
            预计 15 分钟
          </span>
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--font-secondary)",
            }}
          >
            已学 8 分钟
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full shrink-0"
        style={{ height: 1, backgroundColor: "var(--border-color)" }}
      />

      {/* Content text */}
      <div
        style={{
          fontSize: "var(--font-size-base)",
          color: "var(--font-primary)",
          lineHeight: 1.7,
        }}
      >
        <p>
          React 的工作循环是 Fiber 架构的核心执行机制。它负责遍历 Fiber
          树、执行渲染工作、并在必要时让出主线程控制权。理解工作循环是理解
          React 并发模式的基石。
        </p>
      </div>

      {/* Code block placeholder */}
      <div
        className="flex flex-col rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--bg-tertiary)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          className="flex items-center justify-between"
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
            ReactFiberWorkLoop.js
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--font-secondary)",
            }}
          >
            L245-260
          </span>
        </div>
        <div
          style={{
            padding: 14,
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--font-primary)",
            lineHeight: 1.6,
          }}
        >
          <div>
            <span style={{ color: "var(--accent-purple)" }}>function </span>
            <span style={{ color: "var(--accent-cyan)" }}>workLoopSync</span>
            <span>() {"{"}</span>
          </div>
          <div style={{ paddingLeft: 16 }}>
            <span style={{ color: "var(--font-secondary)" }}>
              {"// perform work until there's none left"}
            </span>
          </div>
          <div style={{ paddingLeft: 16 }}>
            <span style={{ color: "var(--accent-purple)" }}>while </span>
            <span>(</span>
            <span style={{ color: "var(--accent-cyan)" }}>workInProgress </span>
            <span>!== </span>
            <span style={{ color: "var(--accent-orange)" }}>null</span>
            <span>) {"{"}</span>
          </div>
          <div style={{ paddingLeft: 32 }}>
            <span style={{ color: "var(--accent-cyan)" }}>
              performUnitOfWork
            </span>
            <span>(workInProgress);</span>
          </div>
          <div style={{ paddingLeft: 16 }}>
            <span>{"}"}</span>
          </div>
          <div>
            <span>{"}"}</span>
          </div>
        </div>
        {/* "Ask AI" button */}
        <div
          className="flex items-center justify-center gap-1.5 rounded-md cursor-pointer mx-[14px] mb-[14px]"
          style={{
            padding: "8px 16px",
            border: "1px solid var(--accent-blue)",
            color: "var(--accent-blue)",
            fontSize: "var(--font-size-xs)",
            alignSelf: "flex-start",
          }}
        >
          <BookOpen size={14} />
          请 AI 讲解此段源码
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          paddingTop: 16,
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <div
          className="flex items-center gap-1.5 rounded-md cursor-pointer"
          style={{
            padding: "6px 10px",
            color: "var(--font-secondary)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          <ChevronLeft size={14} />
          上一节
        </div>
        <div
          className="flex items-center gap-1.5 rounded-md cursor-pointer"
          style={{
            padding: "8px 16px",
            backgroundColor: "var(--accent-blue)",
            color: "var(--bg-primary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
          }}
        >
          做个小测
        </div>
        <div
          className="flex items-center gap-1.5 rounded-md cursor-pointer"
          style={{
            padding: "6px 10px",
            color: "var(--font-secondary)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          下一节
          <ChevronRight size={14} />
        </div>
      </div>
    </main>
  );
}
