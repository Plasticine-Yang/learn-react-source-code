# Virtual DOM 的设计动机

React 创造 Virtual DOM 不是为了"更快"——实际上直接操作 DOM 可能更快。Virtual DOM 要解决的是**可维护性**和**跨平台能力**问题。

## 为什么需要 Virtual DOM？

直接操作真实 DOM 有三个问题：

1. **DOM 操作是昂贵的**——每次修改都可能触发 reflow/repaint
2. **难以追踪变化**——手动 diff 两份 UI 状态非常困难
3. **平台绑定**——DOM API 只能在浏览器中使用

Virtual DOM 是一个轻量级的 JavaScript 对象树，它代表了真实 DOM 的结构：

```javascript
// Virtual DOM 节点示例
const vnode = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
};
```

React 在内存中对比新旧 Virtual DOM（Reconciliation），计算出最小的 DOM 操作集合，然后一次性应用到真实 DOM。
