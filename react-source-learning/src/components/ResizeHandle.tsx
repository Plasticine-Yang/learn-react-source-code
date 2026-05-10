import { useDragResize } from "@/hooks/useDragResize";

export function ResizeHandle() {
  const { onMouseDown, isDragging } = useDragResize();

  return (
    <div
      className="shrink-0 cursor-col-resize transition-colors h-full"
      style={{
        width: 4,
        backgroundColor: isDragging
          ? "var(--accent-blue)"
          : "transparent",
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={(e) => {
        if (!isDragging) {
          (e.target as HTMLElement).style.backgroundColor =
            "var(--accent-blue)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          (e.target as HTMLElement).style.backgroundColor = "transparent";
        }
      }}
    />
  );
}
