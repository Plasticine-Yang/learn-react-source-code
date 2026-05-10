import { create } from "zustand";
import { MODULES_TOTAL } from "@/lib/constants";

interface ModuleInfo {
  index: number;
  total: number;
  title: string;
  section: string;
}

interface AppState {
  currentModule: ModuleInfo;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
}

const defaultModule: ModuleInfo = {
  index: 2,
  total: MODULES_TOTAL,
  title: "Fiber 架构与工作循环",
  section: "2.3 Render & Commit Phases",
};

export const useAppStore = create<AppState>((set) => ({
  currentModule: defaultModule,
  isSearchOpen: false,

  setSearchOpen: (open) => set({ isSearchOpen: open }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
}));
