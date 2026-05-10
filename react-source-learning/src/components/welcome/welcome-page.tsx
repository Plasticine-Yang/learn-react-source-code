interface WelcomePageProps {
  onStart: () => void;
  onConfigure: () => void;
}

export function WelcomePage({ onStart, onConfigure }: WelcomePageProps) {
  return (
    <div className="h-full flex items-center justify-center" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="flex flex-col items-center" style={{ gap: 32, padding: 48, width: 520 }}>
        {/* Logo */}
        <div className="flex flex-col items-center" style={{ gap: 12 }}>
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 64,
              height: 64,
              backgroundColor: "var(--accent-blue)",
            }}
          >
            <span style={{ fontSize: 28, color: "var(--bg-primary)" }}>R</span>
          </div>
          <span style={{ fontSize: "var(--font-size-xl)", fontWeight: 700, color: "var(--font-primary)" }}>
            React 源码学习 AI 导师
          </span>
          <span
            className="text-center"
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--font-secondary)",
              maxWidth: 360,
              lineHeight: 1.6,
            }}
          >
            深入 React 18.2.0 源码底层，AI 导师一对一引导你理解 Fiber 架构、Hooks 原理、Diff 算法等核心机制
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center" style={{ gap: 12, width: "100%" }}>
          <div
            className="flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              padding: "12px 20px",
              backgroundColor: "var(--accent-blue)",
              color: "var(--bg-primary)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              width: 220,
            }}
            onClick={onConfigure}
          >
            配置 API
          </div>
          <div
            className="flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              padding: "12px 20px",
              border: "1px solid var(--border-color)",
              color: "var(--font-primary)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 500,
              width: 220,
            }}
            onClick={onStart}
          >
            开始学习
          </div>
        </div>
      </div>
    </div>
  );
}
