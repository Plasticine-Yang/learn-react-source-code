import { create } from "zustand";

export type AgentStatus = "idle" | "thinking" | "streaming" | "error";

interface AgentState {
  status: AgentStatus;
  activeToolCalls: ToolCallInfo[];
  setStatus: (status: AgentStatus) => void;
  addToolCall: (call: ToolCallInfo) => void;
  updateToolCall: (id: string, updates: Partial<ToolCallInfo>) => void;
  clearToolCalls: () => void;
}

export interface ToolCallInfo {
  id: string;
  name: string;
  params: string;
  status: "running" | "done" | "error";
  result?: string;
}

export const useAgentStore = create<AgentState>((set) => ({
  status: "idle",
  activeToolCalls: [],

  setStatus: (status) => set({ status }),

  addToolCall: (call) =>
    set((s) => ({
      activeToolCalls: [...s.activeToolCalls, call],
    })),

  updateToolCall: (id, updates) =>
    set((s) => ({
      activeToolCalls: s.activeToolCalls.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      ),
    })),

  clearToolCalls: () => set({ activeToolCalls: [] }),
}));
