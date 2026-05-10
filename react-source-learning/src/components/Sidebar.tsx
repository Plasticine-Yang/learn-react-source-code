import { useSidebarStore } from "@/stores/useSidebarStore";
import { SidebarHeader } from "./SidebarHeader";
import { CourseTree } from "./CourseTree";
import { SidebarTabs } from "./SidebarTabs";

export function Sidebar() {
  const width = useSidebarStore((s) => s.width);

  return (
    <aside
      className="shrink-0 flex flex-col overflow-hidden"
      style={{
        width,
        backgroundColor: "var(--bg-primary)",
        borderRight: "1px solid var(--border-color)",
      }}
    >
      <SidebarHeader />
      <CourseTree />
      <SidebarTabs />
    </aside>
  );
}
