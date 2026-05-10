# 声明式 vs 命令式：React 的编程范式

React 的核心设计哲学之一是**声明式编程**。在 React 中，你描述 UI 应该是什么样子，而不是一步步告诉浏览器如何修改 DOM。

## 命令式 DOM 操作（jQuery 风格）

```javascript
// 命令式：每一步都要亲��告诉浏览器
const el = document.createElement('div');
el.className = 'container';
el.innerHTML = '<h1>Hello</h1>';
document.getElementById('root').appendChild(el);
```

## 声明式 DOM 操作（React 风格）

```jsx
// 声明式：描述你想要的最终状态
function App() {
  return (
    <div className="container">
      <h1>Hello</h1>
    </div>
  );
}
```

声明式编程让 React 能够**自动处理 UI 更新**——你只需关心"状态是什么"，React 负责"如何修改 DOM"。
