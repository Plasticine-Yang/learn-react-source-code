import { useRef, useEffect } from "react";
import { ArrowUp } from "@/lib/icons";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  return (
    <div
      className="flex flex-col shrink-0"
      style={{ padding: "10px 14px", borderTop: "1px solid var(--border-color)", gap: 4 }}
    >
      <div className="flex items-end gap-1.5">
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none outline-none rounded-lg"
          style={{
            padding: "8px 12px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            fontSize: "var(--font-size-xs)",
            color: "var(--font-primary)",
            minHeight: 36,
            maxHeight: 120,
            fontFamily: "inherit",
          }}
          placeholder="Ask something..."
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div
          className="flex items-center justify-center rounded-md shrink-0 cursor-pointer transition-opacity"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "var(--accent-blue)",
            opacity: value.trim() && !disabled ? 1 : 0.5,
          }}
          onClick={() => value.trim() && !disabled && onSend()}
        >
          <ArrowUp size={16} style={{ color: "var(--bg-primary)" }} />
        </div>
      </div>
      <span style={{ fontSize: "9px", color: "var(--font-secondary)" }}>
        Enter 发送 · Shift+Enter 换行
      </span>
    </div>
  );
}
