import { TOOLBAR_HEIGHT } from "@/lib/constants";
import { ToolbarLeft } from "./ToolbarLeft";
import { ModuleSwitcher } from "./ModuleSwitcher";
import { ToolbarRight } from "./ToolbarRight";

export function TopToolbar() {
  return (
    <header
      className="flex items-center justify-between shrink-0 px-4"
      style={{
        height: TOOLBAR_HEIGHT,
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <ToolbarLeft />
      <ModuleSwitcher />
      <ToolbarRight />
    </header>
  );
}
