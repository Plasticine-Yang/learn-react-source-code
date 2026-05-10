import { useAppStore } from "@/stores/useAppStore";
import { Check, Circle, BookOpen, ChevronDown } from "@/lib/icons";

interface TreeItem {
  id: string;
  type: "module" | "section";
  title: string;
  status: "completed" | "active" | "current" | "locked";
  expanded?: boolean;
  children?: TreeItem[];
}

const courseData: TreeItem[] = [
  {
    id: "m1", type: "module", title: "Virtual DOM", status: "completed",
  },
  {
    id: "m2", type: "module", title: "Fiber Architecture", status: "current", expanded: true,
    children: [
      { id: "m2s1", type: "section", title: "Fiber Node Structure", status: "completed" },
      { id: "m2s2", type: "section", title: "Work Loop & Scheduler", status: "completed" },
      { id: "m2s3", type: "section", title: "Render & Commit Phases", status: "active" },
      { id: "m2s4", type: "section", title: "Fiber Tree Traversal", status: "locked" },
    ],
  },
  {
    id: "m3", type: "module", title: "Reconciliation", status: "locked",
  },
  {
    id: "m4", type: "module", title: "Hooks 原理", status: "locked",
  },
];

function ModuleIcon({ status }: { status: string }) {
  if (status === "completed") {
    return <Check size={14} style={{ color: "var(--accent-green)" }} />;
  }
  if (status === "current") {
    return <BookOpen size={14} style={{ color: "var(--font-primary)" }} />;
  }
  return <Circle size={14} style={{ color: "var(--font-secondary)" }} />;
}

function SectionIcon({ status }: { status: string }) {
  if (status === "completed") {
    return <Check size={12} style={{ color: "var(--accent-green)" }} />;
  }
  if (status === "active") {
    return <Circle size={12} style={{ color: "var(--accent-blue)" }} />;
  }
  return <Circle size={12} style={{ color: "var(--font-secondary)" }} />;
}

function TreeNode({ item }: { item: TreeItem }) {
  const currentSection = useAppStore((s) => s.currentModule.section);
  const isModule = item.type === "module";
  const isActive = item.status === "current" || item.status === "active";
  const isCurrentSection = isModule ? false : item.title === currentSection;

  return (
    <div className="flex flex-col" style={{ gap: 1 }}>
      <div
        className="flex items-center rounded-md cursor-pointer"
        style={{
          padding: isModule ? "7px 12px" : "4px 16px 4px 36px",
          gap: isModule ? 8 : 6,
          backgroundColor:
            isCurrentSection && !isModule
              ? "var(--bg-secondary)"
              : "transparent",
        }}
      >
        {/* Left indicator bar for active module */}
        {isModule && isActive && (
          <div
            className="rounded-full shrink-0"
            style={{
              width: 3,
              height: 24,
              backgroundColor: "var(--accent-blue)",
            }}
          />
        )}
        {isModule ? (
          <ModuleIcon status={item.status} />
        ) : (
          <SectionIcon status={item.status} />
        )}
        <span
          className="truncate"
          style={{
            fontSize: isModule ? "var(--font-size-sm)" : "var(--font-size-xs)",
            color:
              isActive && isModule
                ? "var(--bg-primary)"
                : isActive && !isModule
                  ? "var(--font-primary)"
                  : "var(--font-secondary)",
            fontWeight: isActive || isCurrentSection ? 500 : 400,
          }}
        >
          {item.title}
        </span>
        {isModule && item.expanded && (
          <ChevronDown size={12} style={{ color: "var(--font-primary)", marginLeft: "auto" }} />
        )}
      </div>
      {item.expanded &&
        item.children?.map((child) => (
          <TreeNode key={child.id} item={child} />
        ))}
    </div>
  );
}

export function CourseTree() {
  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto"
      style={{ padding: "0 6px", gap: 1 }}
    >
      {courseData.map((item) => (
        <TreeNode key={item.id} item={item} />
      ))}
    </div>
  );
}
