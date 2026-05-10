import { useSidebarStore, type SidebarTab } from "@/stores/useSidebarStore";

const TABS: { key: SidebarTab; label: string }[] = [
  { key: "course", label: "课程" },
  { key: "source", label: "源码" },
  { key: "sandbox", label: "沙盒" },
];

export function SidebarTabs() {
  const activeTab = useSidebarStore((s) => s.activeTab);
  const setActiveTab = useSidebarStore((s) => s.setActiveTab);

  return (
    <div
      className="flex gap-0.5"
      style={{
        padding: "10px 6px",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <div
            key={tab.key}
            className="flex-1 flex items-center justify-center rounded cursor-pointer transition-colors"
            style={{
              padding: "6px 0",
              backgroundColor: isActive ? "var(--bg-secondary)" : "transparent",
              fontSize: "var(--font-size-xs)",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--font-primary)" : "var(--font-secondary)",
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
