# createElement 与 JSX 的编译结果

JSX 不是合法的 JavaScript——它需要通过 Babel 或 TypeScript 编译为 `React.createElement` 调用。

## JSX 编译

```jsx
// 你写的代码
<div className="app">
  <h1>Hello React</h1>
</div>

// 编译后（React 17 之前）
React.createElement('div', { className: 'app' },
  React.createElement('h1', null, 'Hello React')
);

// 编译后（React 17+ 自动导入）
import { jsx as _jsx } from 'react/jsx-runtime';
_jsx('div', { className: 'app', children:
  _jsx('h1', { children: 'Hello React' })
});
```

## createElement 源码概要

`createElement` 的核心逻辑在 `ReactElement.js` 中：

```javascript
function createElement(type, config, children) {
  const props = {};
  for (const propName in config) {
    if (config.hasOwnProperty(propName) && propName !== 'key' && propName !== 'ref') {
      props[propName] = config[propName];
    }
  }
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key: config.key || null,
    ref: config.ref || null,
    props: { ...props, children: childrenArray },
  };
}
```

关键点：`$$typeof` 是 React 元素的运行时类型标识，用于防御 XSS 攻击。
