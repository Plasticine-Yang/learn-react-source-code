import { useQuizStore } from "@/stores/useQuizStore";
import { EmptyState } from "@/components/shared/empty-state";
import { Check, Zap } from "@/lib/icons";

export function QuizView() {
  const questions = useQuizStore((s) => s.questions);
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const answers = useQuizStore((s) => s.answers);
  const isSubmitted = useQuizStore((s) => s.isSubmitted);
  const score = useQuizStore((s) => s.score);
  const isGenerating = useQuizStore((s) => s.isGenerating);

  const selectAnswer = useQuizStore((s) => s.selectAnswer);
  const submitQuiz = useQuizStore((s) => s.submitQuiz);

  if (isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center" style={{ gap: 16 }}>
          <div className="rounded-full animate-spin" style={{ width: 32, height: 32, border: "2px solid var(--border-color)", borderTopColor: "var(--accent-blue)" }} />
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--font-secondary)" }}>AI 正在生成题目...</span>
        </div>
      </div>
    );
  }

  if (isSubmitted && score !== null) {
    const passed = score >= Math.ceil(questions.length * 0.8);
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center" style={{ gap: 24, padding: 32  }}>
          {passed && (
            <div className="flex items-center justify-center rounded-full" style={{ width: 80, height: 80, backgroundColor: "var(--accent-green)" }}>
              <Check size={40} style={{ color: "var(--bg-primary)" }} />
            </div>
          )}
          <span style={{ fontSize: "var(--font-size-xl)", fontWeight: 700, color: "var(--font-primary)" }}>
            {passed ? "Module Complete!" : "Quiz Complete"}
          </span>
          <div className="flex flex-col items-center" style={{ gap: 8 }}>
            <div className="flex items-center gap-2 rounded-full" style={{ padding: "8px 20px", backgroundColor: "var(--bg-secondary)", border: `1px solid ${passed ? "var(--accent-green)" : "var(--accent-pink)"}` }}>
              <Zap size={14} style={{ color: passed ? "var(--accent-green)" : "var(--accent-pink)" }} />
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--font-primary)", fontWeight: 600 }}>
                {passed ? "Badge Earned!" : `${questions.length - score} more needed`}
              </span>
            </div>
            <span style={{ fontSize: "var(--font-size-sm)", color: "var(--font-secondary)" }}>
              Score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        icon={<Zap size={24} />}
        title="Ready to Test Your Knowledge"
        description="Complete the module content first, then take the quiz"
      />
    );
  }

  const q = questions[currentQuestion];
  if (!q) return null;

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="flex-1 flex flex-col" style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: "32px 40px" }}>
      {/* Header */}
      <div className="flex items-center justify-between shrink-0" style={{ marginBottom: 20 }}>
        <span style={{ fontSize: "var(--font-size-md)", fontWeight: 700, color: "var(--font-primary)" }}>
          Quiz: Fiber Architecture
        </span>
        <div className="flex items-center gap-2">
          {answers.map((a, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: a !== null ? "var(--accent-blue)" : "var(--bg-secondary)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <span style={{ fontSize: "var(--font-size-base)", fontWeight: 600, color: "var(--font-primary)", lineHeight: 1.5 }}>
        Q{currentQuestion + 1}. {q.question}
      </span>

      {/* Options */}
      <div className="flex flex-col" style={{ gap: 10, marginTop: 20 }}>
        {q.options.map((option, i) => {
          const isSelected = answers[currentQuestion] === i;
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg cursor-pointer transition-colors"
              style={{
                padding: 12,
                backgroundColor: isSelected ? "var(--bg-secondary)" : "var(--bg-primary)",
                border: `1px solid ${isSelected ? "var(--accent-blue)" : "var(--border-color)"}`,
              }}
              onClick={() => selectAnswer(currentQuestion, i)}
            >
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${isSelected ? "var(--accent-blue)" : "var(--font-secondary)"}`,
                  backgroundColor: isSelected ? "var(--accent-blue)" : "transparent",
                }}
              >
                {isSelected && <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: "var(--bg-primary)" }} />}
              </div>
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--font-primary)" }}>{option}</span>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <div
          className="flex items-center justify-center rounded-md cursor-pointer"
          style={{
            padding: "10px 24px",
            backgroundColor: allAnswered ? "var(--accent-blue)" : "var(--bg-secondary)",
            color: allAnswered ? "var(--bg-primary)" : "var(--font-secondary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
            opacity: allAnswered ? 1 : 0.6,
          }}
          onClick={allAnswered ? submitQuiz : undefined}
        >
          Submit Answer
        </div>
      </div>
    </div>
  );
}
