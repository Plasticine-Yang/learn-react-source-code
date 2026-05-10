import { useEffect } from "react";
import { ShellLayout } from "@/components/ShellLayout";
import { useThemeStore } from "@/stores/useThemeStore";
import { useProgressStore } from "@/stores/useProgressStore";
import { useSettingsStore } from "@/stores/useSettingsStore";

function App() {
  const themeInit = useThemeStore((s) => s._init);
  const loadProgress = useProgressStore((s) => s.loadProgress);
  const loadSettings = useSettingsStore((s) => s.loadSettings);

  useEffect(() => {
    themeInit();
    loadProgress();
    loadSettings();
  }, [themeInit, loadProgress, loadSettings]);

  return <ShellLayout />;
}

export default App;
