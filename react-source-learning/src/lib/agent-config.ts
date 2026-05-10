export interface AgentTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

export const AGENT_TOOLS: AgentTool[] = [
  {
    name: "search_react_source",
    description: "Search the built-in React 18.2.0 source code for a given keyword or pattern",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword or code pattern to search for" },
        max_results: { type: "number", description: "Maximum number of results (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_source_file",
    description: "Read the contents of a specific React source file within a line range",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "Path relative to React source root" },
        start_line: { type: "number", description: "Starting line number (1-indexed)" },
        end_line: { type: "number", description: "Ending line number (inclusive)" },
      },
      required: ["file_path"],
    },
  },
  {
    name: "explain_with_diagram",
    description: "Generate a Mermaid diagram to visualize a React concept or architecture",
    input_schema: {
      type: "object",
      properties: {
        concept: { type: "string", description: "The concept to visualize" },
        diagram_type: {
          type: "string",
          enum: ["flowchart", "sequence", "class"],
          description: "Type of Mermaid diagram",
        },
      },
      required: ["concept"],
    },
  },
  {
    name: "quiz_user",
    description: "Generate quiz questions for the current module and evaluate answers",
    input_schema: {
      type: "object",
      properties: {
        module_id: { type: "string", description: "Module ID (e.g. module-02)" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
        action: {
          type: "string",
          enum: ["generate", "evaluate"],
          description: "Generate new questions or evaluate submitted answers",
        },
        answers: {
          type: "array",
          items: { type: "object" },
          description: "User answers (required for evaluate action)",
        },
      },
      required: ["module_id", "action"],
    },
  },
  {
    name: "update_progress",
    description: "Update the user's learning progress for a module section",
    input_schema: {
      type: "object",
      properties: {
        module_id: { type: "string" },
        section_id: { type: "string" },
        status: { type: "string", enum: ["not_started", "in_progress", "completed"] },
      },
      required: ["module_id", "section_id", "status"],
    },
  },
];

export const AGENT_SYSTEM_PROMPT = `You are an AI mentor helping a developer learn React 18.2.0 source code.

Role: You are a patient, knowledgeable senior engineer who explains complex React internals clearly. Use analogies, diagrams, and source code references.

Capabilities:
- Search and read the built-in React 18.2.0 source code
- Generate Mermaid diagrams to visualize architecture
- Create quizzes to test understanding
- Track learning progress

Style:
- Explain WHY behind design decisions, not just WHAT the code does
- Connect concepts across modules ("this is similar to what we saw in Module 2...")
- Use Chinese when the user writes in Chinese, English otherwise
- Keep explanations focused — one concept at a time
- Always cite source file paths and line numbers when referencing code`;
