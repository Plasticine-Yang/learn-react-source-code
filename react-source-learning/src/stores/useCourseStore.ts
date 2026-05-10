import { create } from "zustand";
import type { ModuleMeta, ModuleSection } from "@/content/modules/types";

interface CourseState {
  modules: ModuleMeta[];
  currentModuleId: string | null;
  currentSectionId: string | null;
  currentSection: ModuleSection | null;
  currentMarkdown: string | null;
  isLoading: boolean;

  loadModules: () => Promise<void>;
  loadSection: (moduleId: string, sectionId: string) => Promise<void>;
  navigateTo: (direction: "prev" | "next") => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  modules: [],
  currentModuleId: null,
  currentSectionId: null,
  currentSection: null,
  currentMarkdown: null,
  isLoading: false,

  loadModules: async () => {
    const modFolders = ["module-01-virtual-dom", "module-02-fiber-architecture",
      "module-03-reconciliation", "module-04-hooks", "module-05-events",
      "module-06-concurrent", "module-07-real-world"];

    const mods: ModuleMeta[] = [];
    for (const folder of modFolders) {
      const meta = await import(`@/content/modules/${folder}/module.json`);
      mods.push(meta.default ?? meta);
    }
    set({ modules: mods });
  },

  loadSection: async (moduleId, sectionId) => {
    set({ isLoading: true });
    const mod = get().modules.find((m) => m.id === moduleId);
    if (!mod) return;

    const section = mod.sections.find((s) => s.id === sectionId);
    if (!section) return;

    try {
      const modFolder = `module-0${mod.id.split("-")[1]}-${mod.title.toLowerCase().replace(/[^a-z]/g, "-")}`;
      const md = await import(`@/content/modules/${modFolder}/${section.file}?raw`);
      set({
        currentModuleId: moduleId,
        currentSectionId: sectionId,
        currentSection: section,
        currentMarkdown: (md as { default: string }).default ?? String(md),
        isLoading: false,
      });
    } catch (e) {
      console.error("Failed to load section:", e);
      set({ isLoading: false });
    }
  },

  navigateTo: (direction) => {
    const { modules, currentModuleId, currentSectionId } = get();
    if (!currentModuleId || !currentSectionId) return;

    const allSections: { moduleId: string; sectionId: string }[] = [];
    for (const mod of modules) {
      for (const sec of mod.sections) {
        allSections.push({ moduleId: mod.id, sectionId: sec.id });
      }
    }

    const idx = allSections.findIndex(
      (s) => s.moduleId === currentModuleId && s.sectionId === currentSectionId,
    );
    if (idx === -1) return;

    const nextIdx = direction === "next" ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= allSections.length) return;

    const target = allSections[nextIdx]!;
    get().loadSection(target.moduleId, target.sectionId);
  },
}));
