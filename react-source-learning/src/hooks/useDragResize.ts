import { useCallback, useEffect, useRef, useState } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";

export function useDragResize() {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const listenersRef = useRef<{
    move: (e: MouseEvent) => void;
    up: () => void;
  } | null>(null);

  // Cleanup document listeners on unmount
  useEffect(() => {
    return () => {
      if (listenersRef.current) {
        document.removeEventListener("mousemove", listenersRef.current.move);
        document.removeEventListener("mouseup", listenersRef.current.up);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = useSidebarStore.getState().width;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startXRef.current;
      useSidebarStore.getState().setWidth(startWidthRef.current + delta);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      listenersRef.current = null;
    };

    listenersRef.current = { move: onMouseMove, up: onMouseUp };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return { onMouseDown, isDragging };
}
