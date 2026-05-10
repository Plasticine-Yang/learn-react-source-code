# Development Plan — React 源码学习 AI 导师

> 本文件记录项目的开发阶段划分、当前进度和剩余工作。
> 新 session 启动时应首先阅读此文件，了解项目状态后再继续开发。

---

## Phase 1: 项目骨架与基础配置

**交付内容**：
- 使用 `pnpm create tauri-app` 初始化 Tauri v2 + React 18 + TypeScript + Vite 项目
- 配置 Tailwind CSS v4，导入 Tokyo Night 暗/亮双主题 CSS 变量
- 配置 Zustand v5 状态管理骨架（空 store 结构）
- 配置 Shiki v4 语法高亮（构建时预处理 TextMate 语法）
- 配置 react-markdown + remark-gfm + mermaid 渲染管线
- 配置 Monaco Editor（按需加载，JSX/TSX 语法支持）
- Rust 端引入 tauri-plugin-sql（features: sqlite）和 tauri-plugin-store 依赖
- 建立项目目录结构：src/components/、src/stores/、src/hooks/、src/pages/、src/lib/、src-tauri/src/
- 配置 TypeScript 严格模式、ESLint、路径别名（@/ → src/）

**关键文件**：
- `package.json` — 前端依赖清单
- `src-tauri/Cargo.toml` — Rust 依赖清单（tauri, tauri-plugin-sql, tauri-plugin-store）
- `src-tauri/src/lib.rs` — Tauri 主进程入口，注册插件
- `src-tauri/tauri.conf.json` — Tauri 窗口配置（1280×900 默认，title）
- `src/app.tsx` — React 根组件
- `src/app.css` — Tailwind 入口 + Tokyo Night CSS 变量（暗/亮双主题）
- `tailwind.config.ts` — Tailwind v4 配置
- `tsconfig.json` — TypeScript 严格模式 + 路径别名
- `vite.config.ts` — Vite 构建配置

**验收标准**：
- `pnpm install` 无错误，依赖全量安装
- `pnpm tauri dev` 启动窗口，显示空白 React 页面
- 主题 CSS 变量在浏览器 DevTools 中可见
- TypeScript 编译无错误

---

## Phase 2: Shell 三栏布局 + 顶部工具栏

**交付内容**：
- 三栏布局骨架：左侧边栏（260px，可拖拽 ±80px）+ 中央内容区（fill）+ 右侧对话面板（360px，可折叠）
- 顶部工具栏（48px 固定）：应用名称 + 模块标题 + 模块切换下拉框 + 全局搜索按钮 + 主题切换按钮 + 设置按钮
- 侧边栏宽度拖拽功能（drag handle，180px–340px 范围）
- 对话面板折叠/展开动画（ease-out 200ms），折叠时右侧面板完全隐藏
- 深色/浅色主题切换（全局 ThemeProvider，默认跟随系统，手动切换写入 localStorage）
- 左侧边栏底部标签切换 UI：「课程」/「源码」/「沙盒」三个标签
- 全局搜索按钮显示 "Ctrl+K" 快捷键提示

**关键文件**：
- `src/components/layout/app-layout.tsx` — 顶层布局容器
- `src/components/layout/top-toolbar.tsx` — 顶部工具栏
- `src/components/layout/left-sidebar.tsx` — 左侧栏（含宽度拖拽 + 标签切换）
- `src/components/layout/content-area.tsx` — 中央内容区容器
- `src/components/layout/chat-panel.tsx` — 右侧对话面板（含折叠动画）
- `src/stores/use-layout-store.ts` — 侧边栏宽度、面板折叠状态（Zustand）
- `src/stores/use-theme-store.ts` — 主题状态（dark/light/system）
- `src/components/providers/theme-provider.tsx` — 主题 Provider

**验收标准**：
- 窗口启动显示三栏布局，各区域比例正确
- 拖拽侧边栏边缘能调整宽度，范围限制 180px–340px
- 点击折叠按钮，对话面板收起/展开动画流畅（200ms）
- 点击主题切换按钮，全局切换暗/亮色
- 标签切换点击有视觉反馈

---

## Phase 3: 数据持久化层

**交付内容**：
- SQLite 数据库初始化（tauri-plugin-sql，WAL 模式）
- `learning_progress` 表：module_id, section_id, status (not_started/in_progress/completed), completed_at, time_spent_seconds
- `conversations` 表：id, module_id, title, created_at, updated_at
- `messages` 表：id, conversation_id, role (user/assistant), content (JSON), tool_calls (JSON), created_at
- `quiz_results` 表：id, module_id, score, total, answers (JSON), completed_at
- Rust 端封装数据库初始化命令（`init_db`），在 app setup 时调用
- Rust 端封装安全存储读写命令（`get_api_key` / `set_api_key` / `get_api_settings` / `set_api_settings`），通过 tauri-plugin-store 实现
- 前端 Zustand store：`use-progress-store.ts`（学习进度）、`use-conversation-store.ts`（对话）、`use-settings-store.ts`（设置）
- 前端通过 Tauri invoke 调用 Rust 命令，不直接操作 SQLite

**关键文件**：
- `src-tauri/src/db.rs` — 数据库初始化 + 建表 SQL
- `src-tauri/src/commands/mod.rs` — 命令模块入口
- `src-tauri/src/commands/progress.rs` — 学习进度 CRUD 命令
- `src-tauri/src/commands/conversation.rs` — 对话 CRUD 命令
- `src-tauri/src/commands/settings.rs` — API 设置读写命令
- `src-tauri/src/lib.rs` — 注册所有命令
- `src/lib/db-types.ts` — 前端数据库类型定义
- `src/stores/use-progress-store.ts` — 学习进度状态管理
- `src/stores/use-conversation-store.ts` — 对话状态管理
- `src/stores/use-settings-store.ts` — 设置状态管理
- `src/lib/tauri-commands.ts` — 前端 invoke 命令封装

**验收标准**：
- 应用启动时 SQLite 数据库自动创建，WAL 模式启用
- 能读写学习进度数据，重启后数据不丢失
- 能读写 API 设置到安全存储，重启后配置保留
- Rust 命令在前端可通过 Tauri invoke 正常调用

---

## Phase 4: 课程内容引擎 + 侧边栏课程树

**交付内容**：
- 课程内容目录结构：`src/content/modules/` 下 7 个模块，每个模块内 Markdown 文件 + 各模块元数据（module.json）
- Markdown 渲染管线：react-markdown + remark-gfm（表格、任务列表）+ Shiki 代码块语法高亮 + Mermaid 图表渲染
- 自定义 Markdown 组件：`<CodeBlock>`（右上角文件名 + 行号 + Shiki 高亮）、`<MermaidDiagram>`（mermaid 渲染）、`<SourceReference>`（可点击的源码引用链接）
- 「请 AI 讲解此段源码」按钮：渲染在代码块下方，轮廓样式，点击触发展开对话面板并发送预设提示词
- 侧边栏课程树：7 个模块，展开/折叠，每模块显示小节列表；状态图标（○ 未开始 / ◐ 进行中 / ✓ 已完成）从 learning_progress 表读取
- 侧边栏顶部用户区：进度条（百分比 + 视觉进度条）
- 模块底部导航：上一节 / 下一节按钮 + 「做个小测」入口按钮
- 学习时长自动记录：进入页面开始计时，离开页面写入 time_spent_seconds

**关键文件**：
- `src/content/modules/module-01-virtual-dom/module.json` — M1 元数据（标题、小节列表、预计学时）
- `src/content/modules/module-01-virtual-dom/*.md` — M1 各小节 Markdown 内容
- `src/content/modules/module-02-fiber-architecture/module.json` — M2 元数据
- `src/content/modules/module-02-fiber-architecture/*.md` — M2 各小节
- `src/content/modules/` — M3–M7 同样结构
- `src/components/course/course-content.tsx` — 课程讲义主组件（Markdown 渲染）
- `src/components/course/code-block.tsx` — 自定义代码块（Shiki + 文件名 + 行号 + "请 AI 讲解"按钮）
- `src/components/course/mermaid-diagram.tsx` — Mermaid 图表渲染组件
- `src/components/course/course-tree.tsx` — 课程树组件（递归渲染 + 展开折叠）
- `src/components/course/tree-node.tsx` — 树节点组件（状态图标 + 标签）
- `src/components/course/module-nav.tsx` — 模块底部导航按钮
- `src/stores/use-course-store.ts` — 当前模块/小节、展开状态
- `src/hooks/use-learning-timer.ts` — 学习时长计时器

**验收标准**：
- 课程树显示 7 个模块，点击展开显示小节列表
- 点击小节，中央内容区渲染 Markdown 内容，含代码块、Mermaid 图表
- 代码块显示文件名 + 行号 + 语法高亮，「请 AI 讲解此段源码」按钮在下
- 底部导航"上一节/下一节"能切换小节，"做个小测"按钮可见
- 学习时长自动累计，刷新后保留

---

## Phase 5: AI 对话引擎 + 对话面板

**交付内容**：
- Rust 端实现 Claude API 代理命令：从安全存储读取 API Key → 调用 Anthropic API → 通过 Tauri IPC Channel 流式转发 SSE 到前端
- 前端集成 @anthropic-ai/claude-agent-sdk：配置 Agent 工具定义（search_react_source、get_source_file、explain_with_diagram、quiz_user、update_progress）
- 对话面板 UI：消息气泡列表（用户靠右、AI 靠左，Markdown 渲染 + 代码块 + Mermaid）+ 多行输入框（1-6 行自动扩展，Enter 发送 / Shift+Enter 换行）+ 发送按钮（输入为空时禁用）
- AI 回复流式渲染：打字机效果，流式追加 Markdown 内容
- AI 思考态：三点脉动动画（TypingIndicator 组件，`#7aa2f7` 色）
- AI 工具调用展示：可折叠的状态卡片，显示工具名称 + 参数 + 执行状态
- AI 源码引用链接：在对话消息中渲染为可点击链接（`#7dcfff` 下划线样式），点击跳转到源码浏览器对应行
- 对话自动按模块分组：新建对话关联当前模块，存入 conversations 表
- 对话历史列表：左侧对话面板顶部「新建对话」按钮 + 历史对话列表（按模块分组）

**关键文件**：
- `src-tauri/src/commands/chat.rs` — Claude API 代理 + SSE 流式转发命令
- `src/components/chat/chat-panel-view.tsx` — 对话面板完整视图
- `src/components/chat/message-bubble.tsx` — 单条消息气泡（用户/AI，含 Markdown 渲染）
- `src/components/chat/typing-indicator.tsx` — AI 思考三点脉动动画
- `src/components/chat/tool-call-card.tsx` — 工具调用可折叠状态卡片
- `src/components/chat/chat-input.tsx` — 多行输入框 + 发送按钮
- `src/components/chat/source-reference.tsx` — AI 源码引用可点击链接
- `src/components/chat/conversation-list.tsx` — 对话历史列表（按模块分组）
- `src/lib/agent-config.ts` — Claude Agent SDK 配置（Agent 定义 + 工具注册）
- `src/hooks/use-chat.ts` — 对话状态管理 + 流式消息处理
- `src/stores/use-agent-store.ts` — Agent 执行状态

**验收标准**：
- 输入消息 → AI 流式回复（Markdown + 代码块）
- 三点脉动动画在 AI 思考时显示，回复开始后消失
- AI 调用工具时显示工具卡片（如 search_react_source）
- AI 回复中的源码引用可点击，点击后左侧切换到源码浏览器
- 新建对话、切换历史对话正常，消息持久化到 SQLite
- 无网络时在对话面板底部显示错误提示 + 重试按钮

---

## Phase 6: 源码浏览器

**交付内容**：
- 左侧「源码」标签页：显示 React 18.2.0 源码目录树（递归渲染），点击文件夹展开/折叠，点击文件在右侧展示代码
- 代码展示区：Shiki 语法高亮 + 行号（左对齐，48px 宽）+ 文件名标签页 + 文本搜索（Ctrl+F）
- AI 引用行高亮：从对话中点击引用 → 切换到源码标签 → 对应行高亮（`#7aa2f7` 10% 透明背景 + 左侧竖线标记）+ 底部显示 AI 解释气泡（从对话上下文传入）
- 源码文件搜索：文件名模糊匹配，结果显示在目录树搜索栏下方
- 右键菜单：文件/文件夹右键 → 「请 AI 解释这个文件/函数」

**关键文件**：
- `src/components/source/file-tree.tsx` — 源码递归目录树
- `src/components/source/file-tree-node.tsx` — 文件树节点（图标 + 名称）
- `src/components/source/code-viewer.tsx` — 代码展示区（行号 + Shiki 高亮 + 行高亮）
- `src/components/source/source-toolbar.tsx` — 搜索栏 + 面包屑
- `src/components/source/ai-highlight-bar.tsx` — AI 引用行高亮 + 底部解释气泡
- `src/components/source/context-menu.tsx` — 右键菜单组件
- `src/stores/use-source-store.ts` — 当前文件、高亮行、搜索词状态

**验收标准**：
- 源码目录树可展开浏览，点击文件显示代码
- Shiki 语法高亮正确（JS/TS/Flow 语法覆盖）
- Ctrl+F 在代码中搜索关键词并高亮匹配
- 从对话点击引用 → 跳转到源码浏览器 → 对应行高亮
- 右键文件选择「请 AI 解释」→ 对话面板弹出并自动发送提示词

---

## Phase 7: 实验沙盒

**交付内容**：
- 左侧「沙盒」标签页：显示沙盒文件列表（预置 App.jsx 示例文件，可新建/删除/重命名）
- Monaco Editor 集成：JSX/TSX 语法高亮、自动补全、错误提示、React 18 API 类型定义
- iframe 预览：右侧渲染编译后的 React 组件，使用 Babel standalone 编译 JSX（或 Tauri 端调用 esbuild 预编译后注入 iframe）
- 「注入 Fiber 日志」按钮：在沙盒工具栏，点击后在预览下方展开 Fiber 日志面板
- Fiber 日志面板：模拟控制台输出，展示 beginWork / completeWork / commitRoot 的调用序列和 Fiber 节点 ID
- 错误显示：编译错误或运行时错误在预览区显示，Fiber 日志面板标红对应日志行

**关键文件**：
- `src/components/sandbox/sandbox-view.tsx` — 沙盒主视图
- `src/components/sandbox/file-list.tsx` — 沙盒文件列表 + 新建/删除操作
- `src/components/sandbox/monaco-editor.tsx` — Monaco Editor 封装（React/JSX 语言支持）
- `src/components/sandbox/preview-frame.tsx` — iframe 预览组件
- `src/components/sandbox/fiber-log-panel.tsx` — Fiber 日志面板
- `src/lib/sandbox-compiler.ts` — 沙盒代码编译逻辑（Babel standalone 或 Tauri 端 esbuild）
- `src/stores/use-sandbox-store.ts` — 沙盒文件、日志状态

**验收标准**：
- Monaco Editor 可编辑 React 组件，有语法高亮和自动补全
- 编辑代码后 iframe 预览自动刷新（5000ms debounce）
- 「注入 Fiber 日志」按钮按下后日志面板显示模拟遍历过程
- 编译错误在 iframe 中显示，Fiber 日志不会输出
- 新建/删除/重命名文件操作正常

---

## Phase 8: 测验系统 + 学习成就

**交付内容**：
- 测验入口：课程底部「做个小测」按钮，点击后 AI 通过 quiz_user 工具生成 5 道选择题（与当前模块内容相关）
- 测验界面：题号 + 进度点 + 题目内容 + 4 个选项（单选）+ 「提交答案」按钮 + AI 提示（可选展开）
- 答题反馈：提交后显示正确/错误判定 + AI 给出的解释（正确解释为什么对，错误解释正确答案并给出知识点回顾）
- 测验结果页：得分统计（X/5 + 百分比）+ 用时 + 获得徽章（≥4/5 正确）
- 徽章系统：每个模块一个徽章，完成测验达标后徽章在课程树对应模块旁显示
- 测验结果持久化到 quiz_results 表

**关键文件**：
- `src/components/quiz/quiz-view.tsx` — 测验完整视图
- `src/components/quiz/quiz-question.tsx` — 单道题目 + 选项渲染
- `src/components/quiz/quiz-feedback.tsx` — 答题反馈（正确/错误 + AI 解释）
- `src/components/quiz/quiz-result.tsx` — 测验结果页（分数 + 徽章）
- `src/components/quiz/badge-display.tsx` — 徽章图标组件
- `src/stores/use-quiz-store.ts` — 测验状态管理
- `src/lib/quiz-generator.ts` — 测验生成逻辑（调用 Agent SDK quiz_user 工具）

**验收标准**：
- 点击「做个小测」→ AI 生成 5 道选择题，每题 4 个选项
- 选择选项后提交 → 显示对/错反馈 + AI 解释
- 完成全部 5 题 → 显示结果页（分数 + 用时）
- ≥4/5 正确 → 获得徽章 → 课程树对应模块旁显示徽章图标
- 测验结果持久化，重新打开应用不会丢失

---

## Phase 9: 欢迎引导 + 设置管理

**交付内容**：
- 欢迎页：应用首次启动显示，Logo + 应用名称 + 简介 + 「配置 API」和「开始学习」两个入口按钮
- API 配置向导：ANTHROPIC_AUTH_TOKEN（密码输入框，显示/隐藏切换）、ANTHROPIC_BASE_URL（默认 https://api.anthropic.com）、ANTHROPIC_MODEL（默认 claude-sonnet-4-6），填写后保存到安全存储
- API 验证：配置保存后调用 Anthropic API 测试连接合法性，成功显示「配置完成」引导页 + 「开始学习」按钮，失败显示错误提示（红色左边框 + 错误信息 + 重试按钮）
- 设置弹窗：模态框，包含 API 配置区（同向导字段，编辑模式）、源码路径（显示"内置 React 18.2.0 源码"不可编辑）、学习数据管理（导出 JSON 按钮、重置进度按钮+二次确认）、关于（版本号、许可证）
- 学习数据导出：Tauri 端执行，从 SQLite 读取全量学习数据 → 导出为 JSON 文件到用户指定目录

**关键文件**：
- `src/components/welcome/welcome-page.tsx` — 欢迎页组件
- `src/components/welcome/setup-wizard.tsx` — API 配置向导（步骤式）
- `src/components/welcome/setup-complete.tsx` — 配置完成确认页
- `src/components/welcome/api-error-state.tsx` — API 验证错误提示
- `src/components/settings/settings-modal.tsx` — 设置弹窗
- `src/components/settings/api-config-form.tsx` — API 配置表单
- `src/components/settings/data-management.tsx` — 学习数据管理（导出/重置）
- `src-tauri/src/commands/export.rs` — 学习数据导出命令

**验收标准**：
- 首次启动 → 欢迎页 → 点击「配置 API」→ 填写表单 → 保存 → 验证成功 → 显示配置完成
- API 验证失败 → 显示红色错误提示 + 重试按钮
- 设置弹窗中可修改 API 配置，修改后即时生效
- 导出学习记录生成 JSON 文件，内容完整（进度 + 对话 + 测验）
- 重置进度后二次确认，确认后数据清空

---

## Phase 10: 全局搜索 + 收尾打磨 + 打包

**交付内容**：
- 全局搜索面板（Ctrl+K）：命令面板式覆盖层，搜索框 + 实时结果列表（文件匹配 + 模块匹配）+ 空状态（"输入关键词搜索"）+ 键盘导航（↑↓ 选择，Enter 跳转）
- 对话历史管理页面：按模块分组的对话列表，每条显示标题 + 消息数 + 时间，支持删除单条对话（hover 显示删除按钮）+ 清空全部对话（顶部按钮）
- 空状态覆盖：对话面板空状态（引导文案 + 图标）、沙盒空状态（引导创建文件）、课程空状态（引导开始学习），统一使用几何图标 + 引导文案 + 操作按钮模式
- 加载状态：课程内容加载骨架屏（shimmer 动画）、AI 回复流式光标闪烁、沙盒预览加载中指示器
- 错误状态：课程内容加载失败提示、源码文件读取失败提示、沙盒编译错误提示
- 窗口恢复：应用关闭时保存当前阅读位置和面板状态，下次启动时自动恢复
- Tauri 打包配置：Linux `.deb` / `.AppImage`、macOS `.dmg`、Windows `.msi`，应用图标，启动画面

**关键文件**：
- `src/components/search/global-search.tsx` — 全局搜索面板（Ctrl+K 触发）
- `src/components/search/search-results.tsx` — 搜索结果列表（文件 + 模块混合）
- `src/components/conversation/conversation-history.tsx` — 对话历史管理页
- `src/components/shared/empty-state.tsx` — 通用空状态组件
- `src/components/shared/skeleton-loader.tsx` — 骨架屏组件（shimmer 动画）
- `src/components/shared/error-state.tsx` — 通用错误提示组件
- `src-tauri/tauri.conf.json` — 打包配置更新（bundle 节）
- `src-tauri/icons/` — 应用图标文件

**验收标准**：
- Ctrl+K 打开全局搜索，实时匹配文件和模块，Enter 跳转
- 空状态在对话/沙盒/课程三个场景中渲染正确
- 刷新页面时课程内容先显示骨架屏再替换为实际内容
- 应用关闭重开后恢复到上次阅读位置
- Tauri build 生成各平台的安装包，可安装运行

---

## 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 桌面框架 | Tauri | v2.10.x | Rust 驱动跨平台桌面壳，offline-friendly |
| 前端框架 | React + TypeScript + Vite | React 18.2.x, Vite 6.x | 与学习目标一致 |
| UI 样式 | Tailwind CSS | v4.x | 工具类 CSS，内置 dark mode |
| 状态管理 | Zustand | v5.0.x | 轻量，TypeScript 友好，无 Provider |
| AI 引擎 | @anthropic-ai/claude-agent-sdk | v0.2.x | Agent 循环 + 工具调用 + 流式输出 |
| 代码高亮 | Shiki | v4.0.x | TextMate 语法高亮，构建时预处理 |
| Markdown | react-markdown + remark-gfm | latest | GFM 表格/任务列表 |
| 图表 | Mermaid | latest | Fiber 树/工作循环/流程图 |
| 编辑器 | Monaco Editor | latest | 沙盒代码编辑，JSX/TSX 支持 |
| 数据库 | SQLite (tauri-plugin-sql) | v2.4.x | 对话历史 + 学习进度持久化 |
| 安全存储 | tauri-plugin-store | v2.x | 加密存储 API Key |
| 包管理器 | pnpm | latest | 快速，磁盘高效 |

## 数据库表

| 表名 | 所属 Phase | 用途 |
|------|-----------|------|
| `learning_progress` | Phase 3 | 模块/小节学习状态 + 时长 |
| `conversations` | Phase 3 | 对话元数据（标题 + 模块 + 时间） |
| `messages` | Phase 3 | 对话消息内容 + 工具调用记录 |
| `quiz_results` | Phase 3 | 测验成绩 + 答案 + 完成时间 |

## 开发规则

- 每完成一个 Phase 执行四步走：Code Review → 测试完整性 → 编译验证 → 功能测试
- 四步走全部通过后才能 commit
- Commit message 格式：`phase-N: 简要描述`
- 包管理器：pnpm
- 每个 Task 完成后派发 code-reviewer sub-agent 执行两阶段审查（Spec Compliance → Code Quality）
- Sub-Agent 每次使用 fresh 实例，不复用
- 编码过程中不跨 Task 修改文件，并行 Task 不修改同一文件
