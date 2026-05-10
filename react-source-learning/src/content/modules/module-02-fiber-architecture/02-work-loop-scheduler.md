# Work Loop 与 Scheduler

本节是"Fiber 架构与工作循环"模块的一部分，深入分析 React 18.2.0 源码中对应的实现。

## 概述

Fiber 架构是 React 内部最核心的数据结构设计。每个组件实例对应一个 Fiber 节点，它们通过链表形成一棵可遍历的 Fiber 树。

## 关键源码

本节涉及的源码文件包括：

- `react-reconciler/src/ReactFiberWorkLoop.js`
- `react-reconciler/src/ReactFiber.js`
- `scheduler/src/forks/Scheduler.js`

## 代码示例

```javascript
// ReactFiberWorkLoop.js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

React 通过 workLoopSync 处理同步渲染（如首次渲染、用户交互），通过 workLoopConcurrent 处理并发渲染（如数据预加载）。
