import { useMemo } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAppStore } from "@/stores/useAppStore";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { Search, Moon, Sun, Settings } from "@/lib/icons";

export function ToolbarRight() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const toggleSearch = useAppStore((s) => s.toggleSearch);

  const shortcuts = useMemo(
    () => [{ key: "k", ctrl: true, handler: toggleSearch }],
    [toggleSearch],
  );
  useKeyboardShortcut(shortcuts);

  return (
    <div className="flex items-center gap-1.5">
      {/* Search button */}
      <div
        className="flex items-center gap-1 rounded-md cursor-pointer"
        style={{ padding: "6px 10px", backgroundColor: "var(--bg-secondary)" }}
        onClick={toggleSearch}
      >
        <Search size={14} style={{ color: "var(--font-secondary)" }} />
        <span
          style={{ fontSize: "10px", color: "var(--font-secondary)" }}
        >
          Ctrl+K
        </span>
      </div>

      {/* Theme toggle */}
      <div
        className="flex items-center justify-center rounded-md cursor-pointer"
        style={{
          width: 28,
          height: 28,
          padding: 6,
          backgroundColor: "var(--bg-secondary)",
        }}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Moon size={14} style={{ color: "var(--accent-purple)" }} />
        ) : (
          <Sun size={14} style={{ color: "var(--accent-purple)" }} />
        )}
      </div>

      {/* Settings */}
      <div
        className="flex items-center justify-center rounded-md cursor-pointer"
        style={{
          width: 28,
          height: 28,
          padding: 6,
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        <Settings size={14} style={{ color: "var(--font-secondary)" }} />
      </div>
    </div>
  );
}
