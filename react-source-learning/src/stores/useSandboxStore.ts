import { create } from "zustand";

interface SandboxFile {
  name: string;
  content: string;
  language: string;
}

interface SandboxState {
  files: SandboxFile[];
  activeFile: string | null;
  fiberLogs: string[];
  isLogPanelOpen: boolean;
  previewError: string | null;

  setActiveFile: (name: string) => void;
  updateFileContent: (name: string, content: string) => void;
  addFile: (name: string) => void;
  deleteFile: (name: string) => void;
  toggleLogPanel: () => void;
  setPreviewError: (error: string | null) => void;
}

const DEFAULT_APP = `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>React Counter</h1>
      <p style={{ fontSize: 48 }}>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;`;

export const useSandboxStore = create<SandboxState>((set) => ({
  files: [
    { name: "App.jsx", content: DEFAULT_APP, language: "javascript" },
  ],
  activeFile: "App.jsx",
  fiberLogs: [],
  isLogPanelOpen: false,
  previewError: null,

  setActiveFile: (name) => set({ activeFile: name }),
  updateFileContent: (name, content) =>
    set((s) => ({
      files: s.files.map((f) => (f.name === name ? { ...f, content } : f)),
    })),
  addFile: (name) =>
    set((s) => ({
      files: [...s.files, { name, content: "// New file", language: "javascript" }],
    })),
  deleteFile: (name) =>
    set((s) => ({
      files: s.files.filter((f) => f.name !== name),
      activeFile: s.activeFile === name ? (s.files[0]?.name ?? null) : s.activeFile,
    })),
  toggleLogPanel: () => set((s) => ({ isLogPanelOpen: !s.isLogPanelOpen })),
  setPreviewError: (error) => set({ previewError: error }),
}));
