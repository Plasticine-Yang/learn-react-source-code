export type ProgressStatus = "not_started" | "in_progress" | "completed";
export type MessageRole = "user" | "assistant";

export interface LearningProgress {
  id: number;
  module_id: string;
  section_id: string;
  status: ProgressStatus;
  completed_at: string | null;
  time_spent_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  module_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  tool_calls: string | null;
  created_at: string;
}

export interface QuizResult {
  id: number;
  module_id: string;
  score: number;
  total: number;
  answers: string;
  completed_at: string;
}

export interface ApiSettings {
  baseUrl: string;
  authToken: string;
  model: string;
}

export const DEFAULT_API_SETTINGS: ApiSettings = {
  baseUrl: "https://api.anthropic.com",
  authToken: "",
  model: "claude-sonnet-4-6",
};
