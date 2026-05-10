import { create } from "zustand";
import { getDb } from "@/lib/db";
import type { Conversation, Message, MessageRole } from "@/lib/db-types";

function generateId(): string {
  return crypto.randomUUID();
}

interface ConversationState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  isLoaded: boolean;
  error: string | null;

  loadConversations: (moduleId?: string) => Promise<void>;
  createConversation: (moduleId: string) => Promise<string>;
  deleteConversation: (id: string) => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  addMessage: (msg: {
    conversationId: string;
    role: MessageRole;
    content: string;
    toolCalls?: string;
  }) => Promise<string>;
  setActiveConversation: (id: string | null) => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isLoaded: false,
  error: null,

  loadConversations: async (moduleId) => {
    try {
      const db = await getDb();
      const sql = moduleId
        ? "SELECT * FROM conversations WHERE module_id = $1 ORDER BY updated_at DESC"
        : "SELECT * FROM conversations ORDER BY updated_at DESC";
      const params = moduleId ? [moduleId] : [];
      const rows = await db.select<Conversation[]>(sql, params);
      set({ conversations: rows, isLoaded: true, error: null });
    } catch (e) {
      console.error("Failed to load conversations:", e);
      set({ error: "加载对话列表失败" });
    }
  },

  createConversation: async (moduleId) => {
    try {
      const db = await getDb();
      const id = generateId();
      await db.execute(
        "INSERT INTO conversations (id, module_id) VALUES ($1, $2)",
        [id, moduleId],
      );
      await get().loadConversations(moduleId);
      return id;
    } catch (e) {
      console.error("Failed to create conversation:", e);
      throw e;
    }
  },

  deleteConversation: async (id) => {
    try {
      const db = await getDb();
      await db.execute("DELETE FROM conversations WHERE id = $1", [id]);
      const state = get();
      if (state.activeConversationId === id) {
        set({ activeConversationId: null, messages: [] });
      }
      await get().loadConversations();
    } catch (e) {
      console.error("Failed to delete conversation:", e);
    }
  },

  loadMessages: async (conversationId) => {
    try {
      const db = await getDb();
      const rows = await db.select<Message[]>(
        "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC",
        [conversationId],
      );
      set({ messages: rows, activeConversationId: conversationId, error: null });
    } catch (e) {
      console.error("Failed to load messages:", e);
      set({ error: "加载消息失败" });
    }
  },

  addMessage: async ({ conversationId, role, content, toolCalls }) => {
    try {
      const db = await getDb();
      const id = generateId();
      await db.execute(
        `INSERT INTO messages (id, conversation_id, role, content, tool_calls)
         VALUES ($1, $2, $3, $4, $5)`,
        [id, conversationId, role, content, toolCalls ?? null],
      );
      await db.execute(
        "UPDATE conversations SET updated_at = datetime('now') WHERE id = $1",
        [conversationId],
      );
      if (get().activeConversationId === conversationId) {
        await get().loadMessages(conversationId);
      }
      return id;
    } catch (e) {
      console.error("Failed to add message:", e);
      throw e;
    }
  },

  setActiveConversation: (id) => {
    set({ activeConversationId: id });
    if (id) {
      get().loadMessages(id);
    } else {
      set({ messages: [] });
    }
  },
}));
