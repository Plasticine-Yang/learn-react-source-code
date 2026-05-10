import { create } from "zustand";
import {
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_MIN_WIDTH,
  SIDEBAR_MAX_WIDTH,
} from "@/lib/constants";

export type SidebarTab = "course" | "source" | "sandbox";

interface SidebarState {
  width: number;
  activeTab: SidebarTab;
  setWidth: (w: number) => void;
  setActiveTab: (tab: SidebarTab) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  width: SIDEBAR_DEFAULT_WIDTH,
  activeTab: "course",

  setWidth: (w) =>
    set({
      width: Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, w)),
    }),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
