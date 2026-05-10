import { useChatPanelStore } from "@/stores/useChatPanelStore";
import { CHAT_PANEL_WIDTH } from "@/lib/constants";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { MessageCircle } from "@/lib/icons";

export function ChatPanel() {
  const isOpen = useChatPanelStore((s) => s.isOpen);
  const open = useChatPanelStore((s) => s.open);

  return (
    <>
      {/* Floating open button when collapsed */}
      {!isOpen && (
        <div
          className="absolute right-4 bottom-4 flex items-center justify-center rounded-full cursor-pointer shadow-lg z-10"
          style={{
            width: 44,
            height: 44,
            backgroundColor: "var(--accent-blue)",
          }}
          onClick={open}
        >
          <MessageCircle size={20} style={{ color: "var(--bg-primary)" }} />
        </div>
      )}

      {/* Chat panel */}
      <aside
        className="shrink-0 flex flex-col transition-all duration-200 ease-out overflow-hidden relative"
        style={{
          width: isOpen ? CHAT_PANEL_WIDTH : 0,
          minWidth: isOpen ? CHAT_PANEL_WIDTH : 0,
          backgroundColor: "var(--bg-primary)",
          borderLeft: isOpen ? "1px solid var(--border-color)" : "none",
        }}
      >
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </aside>
    </>
  );
}
