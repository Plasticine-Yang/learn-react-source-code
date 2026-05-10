# React 源码学习 AI 导师

基于 Tauri v2 的桌面应用，通过 AI 对话式教学帮助前端开发者循序渐进地学习 React 18.2.0 源码底层原理。

## 核心功能

- **结构化课程** — 7 个模块、31 节课程，从 Virtual DOM 到 Concurrent Mode，逐层深入
- **AI 导师对话** — Claude Agent SDK 驱动的流式对话，AI 可主动搜索源码、生成图表、出题测验
- **源码浏览器** — 内置 React 18.2.0 源码目录树，语法高亮，AI 引用行自动高亮
- **实验沙盒** — 在线编写 React 组件，iframe 实时预览，可注入 Fiber 日志观察渲染过程
- **学习追踪** — 进度百分比、学习时长记录、模块完成徽章，数据持久化到本地 SQLite

## 技术栈

| 层级 | 技术 |
|------|------|
| 桌面框架 | Tauri v2 (Rust) |
| 前端 | React 18 + TypeScript + Vite 6 |
| 样式 | Tailwind CSS v4 (Tokyo Night 主题) |
| 状态管理 | Zustand v5 |
| AI 引擎 | Claude Agent SDK + Anthropic API (SSE 流式) |
| 代码高亮 | Shiki v4 |
| 图表 | Mermaid |
| 数据库 | SQLite (tauri-plugin-sql) |
| 安全存储 | tauri-plugin-store |
| 包管理器 | pnpm |

## 快速开始

### 前置要求

- Node.js ≥ 20
- pnpm ≥ 10
- Rust ≥ 1.77（通过 [rustup](https://rustup.rs) 安装）
- Linux: `sudo apt-get install -y build-essential libwebkit2gtk-4.1-dev`

### 安装运行

```bash
# 安装依赖
pnpm install

# 启动桌面应用
pnpm tauri dev
```

首次启动需要配置 Anthropic API Key，填写后即可使用 AI 对话功能。

### 仅前端开发

```bash
pnpm dev        # 启动 Vite dev server (http://localhost:1420)
pnpm build      # TypeScript 编译 + Vite 构建
```

## 项目结构

```
react-source-learning/
├── src/
│   ├── components/
│   │   ├── chat/          # 对话面板组件
│   │   ├── course/        # 课程渲染组件（CodeBlock、MermaidDiagram）
│   │   ├── layout/        # 布局组件（非 shell 部分）
│   │   ├── quiz/          # 测验组件
│   │   ├── sandbox/       # 沙盒组件
│   │   ├── search/        # 全局搜索
│   │   ├── settings/      # 设置弹窗
│   │   ├── shared/        # 通用组件（EmptyState、ErrorState、Skeleton）
│   │   ├── source/        # 源码浏览器组件
│   │   └── welcome/       # 欢迎页组件
│   ├── content/modules/   # 7 个模块 × 31 节 Markdown 课程内容
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具函数、类型定义、Agent 配置
│   └── stores/            # Zustand stores（10 个）
├── src-tauri/
│   ├── src/
│   │   ├── lib.rs         # Tauri 入口 + SQLite migration
│   │   ├── main.rs        # 主函数
│   │   └── commands/      # Rust 命令（chat 代理等）
│   └── tauri.conf.json    # Tauri 窗口 & 插件配置
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 课程模块

| 模块 | 标题 | 节数 | 预计学时 |
|------|------|------|---------|
| M1 | React 设计哲学与 Virtual DOM | 4 | 2h |
| M2 | Fiber 架构与工作循环 | 5 | 3h |
| M3 | Reconciliation（Diff 算法） | 4 | 3h |
| M4 | Hooks 原理 | 6 | 4h |
| M5 | 事件系统与合成事件 | 3 | 2h |
| M6 | Concurrent Mode 与 Suspense | 4 | 3h |
| M7 | 源码阅读实战：从 createRoot 到提交 | 5 | 4h |

## 设计

采用 Tokyo Night 配色方案——冷暗色调为主，蓝紫霓虹点缀。默认深色主题，支持亮色切换。设计稿位于 `designs/app.pen`。

## 开发文档

- [Product Spec](Product-Spec.md) — 产品需求文档
- [Design Brief](Design-Brief.md) — 设计规范
- [DEV-PLAN](DEV-PLAN.md) — 分阶段开发计划（10 个 Phase）
