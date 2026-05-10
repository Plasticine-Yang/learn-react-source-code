import { create } from "zustand";
import { getDb } from "@/lib/db";
import type { LearningProgress, ProgressStatus } from "@/lib/db-types";

interface ProgressState {
  records: LearningProgress[];
  isLoaded: boolean;
  error: string | null;

  loadProgress: () => Promise<void>;
  upsertSection: (
    moduleId: string,
    sectionId: string,
    updates: { status?: ProgressStatus; timeSpentSeconds?: number },
  ) => Promise<void>;
  addTimeSpent: (moduleId: string, sectionId: string, seconds: number) => Promise<void>;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  records: [],
  isLoaded: false,
  error: null,

  loadProgress: async () => {
    try {
      const db = await getDb();
      const rows = await db.select<LearningProgress[]>(
        "SELECT * FROM learning_progress ORDER BY module_id, section_id",
      );
      set({ records: rows, isLoaded: true, error: null });
    } catch (e) {
      console.error("Failed to load progress:", e);
      set({ error: "加载学习进度失败" });
    }
  },

  upsertSection: async (moduleId, sectionId, updates) => {
    try {
      const db = await getDb();
      await db.execute(
        `INSERT INTO learning_progress (module_id, section_id, status, time_spent_seconds)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT(module_id, section_id) DO UPDATE SET
           status = CASE
             WHEN excluded.status = 'completed' THEN 'completed'
             ELSE COALESCE(
               (SELECT status FROM learning_progress WHERE module_id = $1 AND section_id = $2),
               'not_started'
             )
           END,
           time_spent_seconds = learning_progress.time_spent_seconds +
             CASE WHEN $4 > 0 THEN $4 ELSE 0 END,
           completed_at = CASE
             WHEN excluded.status = 'completed' THEN datetime('now')
             ELSE learning_progress.completed_at
           END,
           updated_at = datetime('now')`,
        [
          moduleId,
          sectionId,
          updates.status ?? "not_started",
          updates.timeSpentSeconds ?? 0,
        ],
      );
      await get().loadProgress();
    } catch (e) {
      console.error("Failed to update section progress:", e);
    }
  },

  addTimeSpent: async (moduleId, sectionId, seconds) => {
    await get().upsertSection(moduleId, sectionId, { timeSpentSeconds: seconds });
  },

  getModuleProgress: (moduleId) => {
    const moduleRecords = get().records.filter((r) => r.module_id === moduleId);
    if (moduleRecords.length === 0) return 0;
    const completed = moduleRecords.filter((r) => r.status === "completed").length;
    return Math.round((completed / moduleRecords.length) * 100);
  },

  getOverallProgress: () => {
    const records = get().records;
    if (records.length === 0) return 0;
    const completed = records.filter((r) => r.status === "completed").length;
    return Math.round((completed / 31) * 100);
  },
}));
