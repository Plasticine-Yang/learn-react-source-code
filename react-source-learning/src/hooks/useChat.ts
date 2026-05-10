import { useState, useCallback, useRef } from "react";
import { useConversationStore } from "@/stores/useConversationStore";
import { useAgentStore } from "@/stores/useAgentStore";

interface UseChatOptions {
  moduleId: string | null;
}

export function useChat({ moduleId }: UseChatOptions) {
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const addMessage = useConversationStore((s) => s.addMessage);
  const activeConversationId = useConversationStore((s) => s.activeConversationId);
  const createConversation = useConversationStore((s) => s.createConversation);
  const messages = useConversationStore((s) => s.messages);
  const setAgentStatus = useAgentStore((s) => s.setStatus);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !moduleId) return;
      setInputValue("");
      setIsStreaming(true);
      setAgentStatus("thinking");

      try {
        let convId = activeConversationId;
        if (!convId) {
          convId = await createConversation(moduleId);
        }

        // Add user message
        await addMessage({
          conversationId: convId,
          role: "user",
          content,
        });

        // Build API request
        const apiMessages = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        // Add the new user message
        apiMessages.push({ role: "user", content });

        setAgentStatus("streaming");

        // Currently using a simulated streaming response
        // In production, this would call the Tauri chat command via invoke
        const simulatedResponse = `这是对 "${content}" 的 AI 回复。\n\n在实际部署中，这里会通过 Tauri invoke 调用 Rust 端的 Anthropic API 代理，实现真正的流式对话。\n\n\`\`\`javascript\n// React 18.2.0 源码\nfunction performUnitOfWork(unitOfWork: Fiber): Fiber | null {\n  const current = unitOfWork.alternate;\n  // beginWork 处理当前 Fiber\n  let next = beginWork(current, unitOfWork, renderLanes);\n  // completeWork 完成当前 Fiber\n  if (next === null) {\n    completeUnitOfWork(unitOfWork);\n  }\n  return next;\n}\n\`\`\``;

        // Simulate streaming character by character
        let streamedContent = "";
        for (let i = 0; i < simulatedResponse.length; i++) {
          streamedContent += simulatedResponse[i];
          await new Promise((r) => setTimeout(r, 15));
        }

        await addMessage({
          conversationId: convId,
          role: "assistant",
          content: streamedContent,
        });

        setAgentStatus("idle");
      } catch (e) {
        console.error("Chat error:", e);
        setAgentStatus("error");
      } finally {
        setIsStreaming(false);
      }
    },
    [moduleId, activeConversationId, messages, addMessage, createConversation, setAgentStatus],
  );

  return {
    inputValue,
    setInputValue,
    isStreaming,
    messagesEndRef,
    sendMessage,
  };
}
