import { create } from "zustand";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizState {
  moduleId: string | null;
  questions: QuizQuestion[];
  currentQuestion: number;
  answers: (number | null)[];
  isSubmitted: boolean;
  score: number | null;
  isGenerating: boolean;

  startQuiz: (moduleId: string) => void;
  selectAnswer: (questionIdx: number, optionIdx: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Fiber 架构中，每个组件实例对应几个 Fiber 节点？",
    options: ["1 个", "2 个（current + workInProgress）", "3 个", "取决于组件类型"],
    correctIndex: 1,
    explanation: "React 使用双缓冲技术。每个组件实例有两个 Fiber 节点：current（当前屏幕上显示的）和 workInProgress（正在构建的）。",
  },
  {
    id: 2,
    question: "workLoopSync 和 workLoopConcurrent 的主要区别是什么？",
    options: ["没有区别", "workLoopSync 更快", "workLoopConcurrent 会在每个时间片后检查 shouldYield()", "workLoopSync 支持并发"],
    correctIndex: 2,
    explanation: "并发工作循环通过 shouldYield() 检查是否需要让出主线程控制权，这是 Concurrent Mode 的核心机制。",
  },
  {
    id: 3,
    question: "React 18 中，useEffect 的清理函数在什么时候执行？",
    options: ["组件卸载时", "下一次 effect 执行之前 + 组件卸载时", "只在组件卸载时", "每次渲染时"],
    correctIndex: 1,
    explanation: "useEffect 的 cleanup 函数在下一次 effect 运行前和组件卸载时都会执行，确保没有内存泄漏。",
  },
  {
    id: 4,
    question: "Fiber 树的遍历使用什么数据结构？",
    options: ["数组", "二叉树", "链表（child/sibling/return）", "HashMap"],
    correctIndex: 2,
    explanation: "Fiber 使用链表结构：child 指向第一个子节点，sibling 指向兄弟节点，return 指向父节点。",
  },
  {
    id: 5,
    question: "React 的 Render Phase 可以被中断吗？",
    options: ["不可以，它是同步的", "可以，这是 Concurrent Mode 的核心特性", "只在 StrictMode 下可以", "只在开发模式下可以"],
    correctIndex: 1,
    explanation: "Render Phase 是可中断的——React 可以在处理完当前 Fiber 节点后暂停，让出控制权给浏览器。",
  },
];

export const useQuizStore = create<QuizState>((set, get) => ({
  moduleId: null,
  questions: [],
  currentQuestion: 0,
  answers: [],
  isSubmitted: false,
  score: null,
  isGenerating: false,

  startQuiz: (moduleId) => {
    set({
      moduleId,
      questions: SAMPLE_QUESTIONS,
      currentQuestion: 0,
      answers: new Array(5).fill(null),
      isSubmitted: false,
      score: null,
      isGenerating: true,
    });
    // Simulate AI generation
    setTimeout(() => set({ isGenerating: false }), 1200);
  },

  selectAnswer: (questionIdx, optionIdx) => {
    set((s) => {
      const answers = [...s.answers];
      answers[questionIdx] = optionIdx;
      return { answers };
    });
  },

  submitQuiz: () => {
    const { questions, answers } = get();
    const score = answers.reduce(
      (acc: number, answer, i) => (answer === questions[i]?.correctIndex ? acc + 1 : acc),
      0,
    );
    set({ isSubmitted: true, score });
  },

  resetQuiz: () => set({ isSubmitted: false, answers: [], currentQuestion: 0, score: null }),

  nextQuestion: () => {
    const { currentQuestion, questions } = get();
    if (currentQuestion < questions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    }
  },
}));
