import { useEffect } from "react";
import { useCourseStore } from "@/stores/useCourseStore";
import { useLearningTimer } from "@/hooks/useLearningTimer";
import { CourseContentView } from "@/components/course/course-content";
import { ModuleNav } from "@/components/course/module-nav";

export function ContentArea() {
  const currentModuleId = useCourseStore((s) => s.currentModuleId);
  const currentSectionId = useCourseStore((s) => s.currentSectionId);
  const currentSection = useCourseStore((s) => s.currentSection);
  const markdown = useCourseStore((s) => s.currentMarkdown);
  const isLoading = useCourseStore((s) => s.isLoading);
  const navigateTo = useCourseStore((s) => s.navigateTo);
  const modules = useCourseStore((s) => s.modules);
  const loadSection = useCourseStore((s) => s.loadSection);

  useLearningTimer(
    currentSection ? currentModuleId : null,
    currentSection ? currentSectionId : null,
  );

  const currentMod = modules.find((m) => m.id === currentModuleId);
  const sectionIdx = currentMod?.sections.findIndex((s) => s.id === currentSectionId) ?? -1;
  const hasPrev = sectionIdx > 0 ||
    (currentMod && modules.indexOf(currentMod) > 0);
  const hasNext = (currentMod && sectionIdx < currentMod.sections.length - 1) ||
    (currentMod && modules.indexOf(currentMod) < modules.length - 1);

  const handlePrev = () => navigateTo("prev");
  const handleNext = () => navigateTo("next");

  // Auto-load first section if none selected
  useEffect(() => {
    if (!currentModuleId && modules.length > 0 && modules[0]?.sections[0]) {
      loadSection(modules[0].id, modules[0].sections[0].id);
    }
  }, [modules, currentModuleId, loadSection]);

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center min-w-0">
        <div
          className="rounded-full animate-spin"
          style={{
            width: 24,
            height: 24,
            border: "2px solid var(--border-color)",
            borderTopColor: "var(--accent-blue)",
          }}
        />
      </main>
    );
  }

  return (
    <main
      className="flex-1 flex flex-col overflow-y-auto min-w-0"
      style={{ padding: "32px 40px", gap: 24 }}
    >
      {/* Module header */}
      {currentMod && (
        <div className="flex flex-col" style={{ gap: 4 }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--accent-blue)",
            }}
          >
            {currentMod.title}
          </span>
          {currentSection && (
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "var(--font-primary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {currentSection.title}
            </h1>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="w-full shrink-0" style={{ height: 1, backgroundColor: "var(--border-color)" }} />

      {/* Course content */}
      <CourseContentView markdown={markdown} />

      {/* Bottom navigation */}
      <ModuleNav
        onPrev={handlePrev}
        onNext={handleNext}
        onQuiz={() => {}}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </main>
  );
}
