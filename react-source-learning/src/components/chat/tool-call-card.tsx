import { useState } from "react";
import { ChevronDown } from "@/lib/icons";
import type { ToolCallInfo } from "@/stores/useAgentStore";

interface ToolCallCardProps {
  call: ToolCallInfo;
}

export function ToolCallCard({ call }: ToolCallCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden"
      style={{
        border: "1px solid var(--border-color)",
        fontSize: "var(--font-size-xs)",
      }}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        style={{ padding: "6px 10px" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            backgroundColor:
              call.status === "done"
                ? "var(--accent-green)"
                : call.status === "error"
                  ? "var(--accent-pink)"
                  : "var(--accent-blue)",
          }}
        />
        <span style={{ color: "var(--font-primary)", fontWeight: 500 }}>
          {call.name}
        </span>
        <span style={{ color: "var(--font-secondary)", marginLeft: "auto" }}>
          {call.status === "running" ? "执行中..." : call.status === "error" ? "失败" : "完成"}
        </span>
        <ChevronDown
          size={12}
          style={{
            color: "var(--font-secondary)",
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </div>
      {expanded && (
        <div
          className="flex flex-col"
          style={{
            padding: "6px 10px 10px",
            borderTop: "1px solid var(--border-color)",
            gap: 4,
          }}
        >
          <div>
            <span style={{ color: "var(--font-secondary)" }}>参数: </span>
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--font-primary)",
              }}
            >
              {call.params}
            </code>
          </div>
          {call.result && (
            <div>
              <span style={{ color: "var(--font-secondary)" }}>结果: </span>
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--font-primary)",
                }}
              >
                {call.result}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
