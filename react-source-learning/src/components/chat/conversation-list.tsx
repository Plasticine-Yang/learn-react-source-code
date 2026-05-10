import { useEffect } from "react";
import { useConversationStore } from "@/stores/useConversationStore";
import { Plus } from "@/lib/icons";

export function ConversationList() {
  const conversations = useConversationStore((s) => s.conversations);
  const activeId = useConversationStore((s) => s.activeConversationId);
  const loadConversations = useConversationStore((s) => s.loadConversations);
  const setActive = useConversationStore((s) => s.setActiveConversation);
  const create = useConversationStore((s) => s.createConversation);
  const remove = useConversationStore((s) => s.deleteConversation);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)" }}
      >
        <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
          对话历史
        </span>
        <div
          className="flex items-center justify-center rounded cursor-pointer"
          style={{ width: 26, height: 26 }}
          onClick={() => create("module-02")}
        >
          <Plus size={14} style={{ color: "var(--font-secondary)" }} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ padding: 8 }}>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center justify-between rounded-md cursor-pointer group"
            style={{
              padding: "6px 10px",
              backgroundColor: conv.id === activeId ? "var(--bg-secondary)" : "transparent",
              fontSize: "var(--font-size-xs)",
              color: "var(--font-primary)",
            }}
            onClick={() => setActive(conv.id)}
          >
            <span className="truncate flex-1">{conv.title || "新对话"}</span>
            <span
              className="opacity-0 group-hover:opacity-100 cursor-pointer"
              style={{ color: "var(--font-secondary)", marginLeft: 8 }}
              onClick={(e) => {
                e.stopPropagation();
                remove(conv.id);
              }}
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
