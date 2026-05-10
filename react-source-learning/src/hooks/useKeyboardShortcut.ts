import { useEffect } from "react";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  handler: () => void;
}

export function useKeyboardShortcut(shortcuts: Shortcut[]) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      for (const s of shortcuts) {
        if (
          e.key === s.key &&
          e.ctrlKey === !!s.ctrl &&
          !e.metaKey
        ) {
          e.preventDefault();
          s.handler();
          return;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcuts]);
}
