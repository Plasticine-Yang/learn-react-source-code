import { useState } from "react";
import { useDragResize } from "@/hooks/useDragResize";

export function ResizeHandle() {
  const { onMouseDown, isDragging } = useDragResize();
  const [isHovered, setIsHovered] = useState(false);

  const showColor = isDragging || isHovered;

  return (
    <div
      className="shrink-0 cursor-col-resize transition-colors h-full"
      style={{
        width: 4,
        backgroundColor: showColor
          ? "var(--accent-blue)"
          : "transparent",
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}
