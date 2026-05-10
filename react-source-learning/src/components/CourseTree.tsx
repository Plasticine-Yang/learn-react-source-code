import { useEffect } from "react";
import { useCourseStore } from "@/stores/useCourseStore";
import { useProgressStore } from "@/stores/useProgressStore";
import { Check, Circle, BookOpen, ChevronDown } from "@/lib/icons";

export function CourseTree() {
  const modules = useCourseStore((s) => s.modules);
  const loadModules = useCourseStore((s) => s.loadModules);
  const currentModuleId = useCourseStore((s) => s.currentModuleId);
  const currentSectionId = useCourseStore((s) => s.currentSectionId);
  const loadSection = useCourseStore((s) => s.loadSection);
  const progress = useProgressStore((s) => s.records);

  useEffect(() => {
    loadModules();
  }, [loadModules]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto" style={{ padding: "0 6px", gap: 1 }}>
      {modules.map((mod) => {
        const isCurrentMod = mod.id === currentModuleId;
        const moduleProgress = progress.filter((p) => p.module_id === mod.id);
        const completed = moduleProgress.filter((p) => p.status === "completed").length;
        const total = mod.sections.length;
        const isExpanded = isCurrentMod || completed > 0;

        return (
          <div key={mod.id} className="flex flex-col" style={{ gap: 1 }}>
            {/* Module header */}
            <div
              className="flex items-center rounded-md cursor-pointer"
              style={{
                padding: "7px 12px",
                gap: 8,
                backgroundColor: isCurrentMod ? "var(--accent-blue)" : "transparent",
              }}
              onClick={() => {
                if (!isExpanded && mod.sections[0]) {
                  loadSection(mod.id, mod.sections[0].id);
                }
              }}
            >
              {isCurrentMod && (
                <div
                  className="rounded-full shrink-0"
                  style={{ width: 3, height: 24, backgroundColor: "var(--accent-blue)" }}
                />
              )}
              {completed === total && total > 0 ? (
                <Check size={14} style={{ color: isCurrentMod ? "var(--bg-primary)" : "var(--accent-green)" }} />
              ) : (
                <BookOpen size={14} style={{ color: isCurrentMod ? "var(--bg-primary)" : "var(--font-secondary)" }} />
              )}
              <span
                className="truncate flex-1"
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: isCurrentMod ? "var(--bg-primary)" : "var(--font-primary)",
                  fontWeight: isCurrentMod ? 600 : 500,
                }}
              >
                {mod.title}
              </span>
              {isExpanded && (
                <ChevronDown
                  size={12}
                  style={{ color: isCurrentMod ? "var(--bg-primary)" : "var(--font-secondary)" }}
                />
              )}
            </div>

            {/* Sections (visible when expanded) */}
            {isExpanded &&
              mod.sections.map((sec) => {
                const isActive = sec.id === currentSectionId && isCurrentMod;
                const secProgress = progress.find(
                  (p) => p.module_id === mod.id && p.section_id === sec.id,
                );
                const secStatus = secProgress?.status ?? "not_started";

                return (
                  <div
                    key={sec.id}
                    className="flex items-center rounded-md cursor-pointer"
                    style={{
                      padding: "4px 16px 4px 36px",
                      gap: 6,
                      backgroundColor: isActive ? "var(--bg-secondary)" : "transparent",
                    }}
                    onClick={() => loadSection(mod.id, sec.id)}
                  >
                    {secStatus === "completed" ? (
                      <Check size={12} style={{ color: "var(--accent-green)" }} />
                    ) : isActive ? (
                      <Circle size={12} style={{ color: "var(--accent-blue)" }} />
                    ) : (
                      <Circle size={12} style={{ color: "var(--font-secondary)" }} />
                    )}
                    <span
                      className="truncate"
                      style={{
                        fontSize: "var(--font-size-xs)",
                        color: isActive ? "var(--font-primary)" : "var(--font-secondary)",
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {sec.title}
                    </span>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
