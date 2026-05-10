import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ gap: 16, padding: 32 }}
    >
      {icon && (
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            backgroundColor: "var(--bg-secondary)",
            color: "var(--font-secondary)",
          }}
        >
          {icon}
        </div>
      )}
      <span
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--font-secondary)",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {title}
      </span>
      {description && (
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--font-secondary)",
            textAlign: "center",
            maxWidth: 260,
            lineHeight: 1.5,
          }}
        >
          {description}
        </span>
      )}
      {action}
    </div>
  );
}
