import { useRef, useEffect, useState } from "react";
import { useConversationStore } from "@/stores/useConversationStore";
import { useAgentStore } from "@/stores/useAgentStore";
import { useChatPanelStore } from "@/stores/useChatPanelStore";
import { useChat } from "@/hooks/useChat";
import { useCourseStore } from "@/stores/useCourseStore";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ToolCallCard } from "./tool-call-card";
import { ChatInput } from "./chat-input";
import { ConversationList } from "./conversation-list";
import { Plus, ChevronRight, ArrowLeft } from "@/lib/icons";

export function ChatPanelView() {
  const messages = useConversationStore((s) => s.messages);
  const activeConversationId = useConversationStore((s) => s.activeConversationId);
  const agentStatus = useAgentStore((s) => s.status);
  const toolCalls = useAgentStore((s) => s.activeToolCalls);
  const toggle = useChatPanelStore((s) => s.toggle);
  const currentModuleId = useCourseStore((s) => s.currentModuleId);
  const { inputValue, setInputValue, isStreaming, messagesEndRef, sendMessage } = useChat({
    moduleId: currentModuleId,
  });

  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, agentStatus]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)" }}
      >
        {showHistory ? (
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded cursor-pointer"
              style={{ width: 26, height: 26 }}
              onClick={() => setShowHistory(false)}
            >
              <ArrowLeft size={14} style={{ color: "var(--font-secondary)" }} />
            </div>
            <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
              对话历史
            </span>
          </div>
        ) : (
          <>
            <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
              AI 导师
            </span>
            <div className="flex items-center gap-0.5">
              <div
                className="flex items-center justify-center rounded cursor-pointer"
                style={{ width: 26, height: 26 }}
                onClick={() => setShowHistory(true)}
              >
                <Plus size={14} style={{ color: "var(--font-secondary)" }} />
              </div>
              <div
                className="flex items-center justify-center rounded cursor-pointer"
                style={{ width: 26, height: 26 }}
                onClick={toggle}
              >
                <ChevronRight size={14} style={{ color: "var(--font-secondary)" }} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      {showHistory ? (
        <ConversationList />
      ) : (
        <>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 flex flex-col overflow-y-auto"
            style={{ padding: 14, gap: 14 }}
          >
            {activeConversationId ? (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {agentStatus === "thinking" && <TypingIndicator />}

                {toolCalls.map((call) => (
                  <ToolCallCard key={call.id} call={call} />
                ))}

                {agentStatus === "error" && (
                  <div className="flex flex-col gap-2">
                    <div
                      className="flex items-center gap-2 rounded-lg"
                      style={{
                        padding: 10,
                        borderLeft: "3px solid var(--accent-pink)",
                        backgroundColor: "var(--bg-secondary)",
                        fontSize: "var(--font-size-xs)",
                        color: "var(--accent-pink)",
                      }}
                    >
                      网络错误，请检查 API 配置
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-md cursor-pointer self-start"
                      style={{ padding: "4px 12px", backgroundColor: "var(--bg-secondary)", color: "var(--font-primary)", fontSize: "var(--font-size-xs)" }}
                      onClick={() => {
                        if (messages.length > 0) {
                          const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
                          if (lastUserMsg) sendMessage(lastUserMsg.content);
                        }
                      }}
                    >
                      重试
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center" style={{ gap: 16 }}>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  <span style={{ fontSize: 24 }}>💬</span>
                </div>
                <span
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--font-secondary)",
                    textAlign: "center",
                    maxWidth: 240,
                    lineHeight: 1.5,
                  }}
                >
                  Ask AI anything about React source code
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={() => sendMessage(inputValue)}
            disabled={isStreaming}
          />
        </>
      )}
    </div>
  );
}
