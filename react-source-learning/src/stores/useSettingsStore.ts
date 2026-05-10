import { create } from "zustand";
import { getStore } from "@/lib/settings";
import type { ApiSettings } from "@/lib/db-types";
import { DEFAULT_API_SETTINGS } from "@/lib/db-types";

interface SettingsState {
  settings: ApiSettings;
  isLoaded: boolean;
  isConfigured: boolean;
  error: string | null;

  loadSettings: () => Promise<void>;
  saveSettings: (settings: Partial<ApiSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: { ...DEFAULT_API_SETTINGS },
  isLoaded: false,
  isConfigured: false,
  error: null,

  loadSettings: async () => {
    try {
      const store = await getStore();
      const baseUrl =
        (await store.get<string>("baseUrl")) ?? DEFAULT_API_SETTINGS.baseUrl;
      const authToken =
        (await store.get<string>("authToken")) ?? DEFAULT_API_SETTINGS.authToken;
      const model =
        (await store.get<string>("model")) ?? DEFAULT_API_SETTINGS.model;

      set({
        settings: { baseUrl, authToken, model },
        isLoaded: true,
        isConfigured: authToken.length > 0,
        error: null,
      });
    } catch (e) {
      console.error("Failed to load settings:", e);
      set({ error: "加载设置失败", isLoaded: true });
    }
  },

  saveSettings: async (partial) => {
    try {
      const store = await getStore();
      const current = get().settings;
      const updated = { ...current, ...partial };

      await store.set("baseUrl", updated.baseUrl);
      await store.set("authToken", updated.authToken);
      await store.set("model", updated.model);
      await store.save();

      set({
        settings: updated,
        isConfigured: updated.authToken.length > 0,
        error: null,
      });
    } catch (e) {
      console.error("Failed to save settings:", e);
      set({ error: "保存设置失败" });
    }
  },

  resetSettings: async () => {
    try {
      const store = await getStore();
      await store.clear();
      await store.save();
      set({
        settings: { ...DEFAULT_API_SETTINGS },
        isConfigured: false,
        error: null,
      });
    } catch (e) {
      console.error("Failed to reset settings:", e);
      set({ error: "重置设置失败" });
    }
  },
}));
