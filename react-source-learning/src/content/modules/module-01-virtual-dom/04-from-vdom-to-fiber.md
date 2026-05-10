# 从 Virtual DOM 到 Fiber：架构演进

React 15 使用基于递归的 Stack Reconciler。它有一个致命缺陷：**递归一旦开始就无法中断**。

## Stack Reconciler 的问题

```javascript
// React 15: 递归遍历，不可中断
function reconcile(parentDom, oldVNode, newVNode) {
  if (oldVNode.type !== newVNode.type) {
    // 替换整个子树
    parentDom.replaceChild(render(newVNode), oldDomNode);
    return;
  }
  // 递归处理所有子节点...
  for (let i = 0; i < Math.max(oldChildren.length, newChildren.length); i++) {
    reconcile(domNode, oldChildren[i], newChildren[i]);
  }
}
```

## Fiber 架构的解决方案

React 16 引入了 Fiber 架构，核心改变：

- **可中断的遍历**：Fiber 将渲染工作分解为小的"工作单元"
- **优先级调度**：高优先级的更新可以打断低优先级的渲染
- **双缓冲**：current 树和 workInProgress 树交替使用

```javascript
// Fiber 通过链表结构实现可中断遍历
let nextUnitOfWork = null;

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop); // 继续分片执行
  }
}
```

这为 Concurrent Mode 和 Suspense 等特性奠定了基础。
