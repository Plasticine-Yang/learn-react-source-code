import { create } from "zustand";

interface SourceFile {
  path: string;
  name: string;
  content: string;
  lines: number;
}

interface SourceState {
  currentFile: SourceFile | null;
  highlightLines: number[];
  searchQuery: string;
  fileTree: SourceTreeNode[];
  isLoading: boolean;

  setCurrentFile: (file: SourceFile | null) => void;
  setHighlightLines: (lines: number[]) => void;
  setSearchQuery: (query: string) => void;
  searchFile: (query: string) => SourceTreeNode[];
}

export interface SourceTreeNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: SourceTreeNode[];
  expanded?: boolean;
}

const REACT_SOURCE_TREE: SourceTreeNode[] = [
  {
    name: "react-18.2.0", type: "folder", path: "react-18.2.0", expanded: true,
    children: [
      {
        name: "packages", type: "folder", path: "react-18.2.0/packages", expanded: true,
        children: [
          {
            name: "react", type: "folder", path: "react-18.2.0/packages/react",
            children: [
              { name: "ReactElement.js", type: "file", path: "react-18.2.0/packages/react/ReactElement.js" },
              { name: "ReactHooks.js", type: "file", path: "react-18.2.0/packages/react/ReactHooks.js" },
              { name: "ReactCurrentDispatcher.js", type: "file", path: "react-18.2.0/packages/react/ReactCurrentDispatcher.js" },
            ],
          },
          {
            name: "react-reconciler", type: "folder", path: "react-18.2.0/packages/react-reconciler",
            children: [
              { name: "ReactFiber.js", type: "file", path: "react-18.2.0/packages/react-reconciler/ReactFiber.js" },
              { name: "ReactFiberWorkLoop.js", type: "file", path: "react-18.2.0/packages/react-reconciler/ReactFiberWorkLoop.js" },
              { name: "ReactFiberHooks.js", type: "file", path: "react-18.2.0/packages/react-reconciler/ReactFiberHooks.js" },
              { name: "ReactFiberClassComponent.js", type: "file", path: "react-18.2.0/packages/react-reconciler/ReactFiberClassComponent.js" },
              { name: "ReactChildFiber.js", type: "file", path: "react-18.2.0/packages/react-reconciler/ReactChildFiber.js" },
            ],
          },
          {
            name: "react-dom", type: "folder", path: "react-18.2.0/packages/react-dom",
            children: [
              { name: "ReactDOM.js", type: "file", path: "react-18.2.0/packages/react-dom/ReactDOM.js" },
              { name: "ReactDOMComponent.js", type: "file", path: "react-18.2.0/packages/react-dom/ReactDOMComponent.js" },
            ],
          },
          {
            name: "scheduler", type: "folder", path: "react-18.2.0/packages/scheduler",
            children: [
              { name: "Scheduler.js", type: "file", path: "react-18.2.0/packages/scheduler/Scheduler.js" },
            ],
          },
        ],
      },
    ],
  },
];

export const useSourceStore = create<SourceState>((set) => ({
  currentFile: null,
  highlightLines: [],
  searchQuery: "",
  fileTree: REACT_SOURCE_TREE,
  isLoading: false,

  setCurrentFile: (file) => set({ currentFile: file, highlightLines: [] }),
  setHighlightLines: (lines) => set({ highlightLines: lines }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  searchFile: (query) => {
    if (!query.trim()) return REACT_SOURCE_TREE;
    const lower = query.toLowerCase();

    function filterTree(nodes: SourceTreeNode[]): SourceTreeNode[] {
      const result: SourceTreeNode[] = [];
      for (const node of nodes) {
        if (node.name.toLowerCase().includes(lower)) {
          result.push(node);
        } else if (node.children) {
          const filtered = filterTree(node.children);
          if (filtered.length > 0) {
            result.push({ ...node, children: filtered, expanded: true });
          }
        }
      }
      return result;
    }

    return filterTree(REACT_SOURCE_TREE);
  },
}));
