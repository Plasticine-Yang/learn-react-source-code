interface SkeletonLoaderProps {
  lines?: number;
}

export function SkeletonLoader({ lines = 5 }: SkeletonLoaderProps) {
  return (
    <div className="flex flex-col" style={{ gap: 12, padding: 16 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="rounded animate-pulse"
          style={{
            height: i === 0 ? 28 : 16,
            width: i === 0 ? "60%" : i === lines - 1 ? "40%" : "100%",
            backgroundColor: "var(--bg-secondary)",
          }}
        />
      ))}
    </div>
  );
}
