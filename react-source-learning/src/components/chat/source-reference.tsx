interface SourceReferenceProps {
  filePath: string;
  line?: number;
  onClick?: () => void;
}

export function SourceReference({ filePath, line, onClick }: SourceReferenceProps) {
  return (
    <span
      className="inline-flex items-center gap-1 cursor-pointer"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--font-size-xs)",
        color: "var(--accent-cyan)",
        textDecoration: "underline",
        textUnderlineOffset: 2,
      }}
      onClick={onClick}
    >
      {filePath}
      {line !== undefined && `:${line}`}
    </span>
  );
}
