interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4" style={{ padding: 24 }}>
      <div
        className="flex items-center gap-3 rounded-lg"
        style={{
          padding: 12,
          borderLeft: "3px solid var(--accent-pink)",
          backgroundColor: "var(--bg-secondary)",
          fontSize: "var(--font-size-sm)",
          color: "var(--accent-pink)",
        }}
      >
        {message}
      </div>
      {onRetry && (
        <div
          className="rounded-md cursor-pointer"
          style={{
            padding: "6px 16px",
            backgroundColor: "var(--accent-blue)",
            color: "var(--bg-primary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
          }}
          onClick={onRetry}
        >
          重试
        </div>
      )}
    </div>
  );
}
