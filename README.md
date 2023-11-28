# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## 错误日志

### 1. Build issue: "Cannot redefine property: File" with Node.js 20.6.0
解决方案：[The issue has been resolved! Just updated the Node version from 20.6.0 to 20.7.0](https://github.com/vitejs/vite/issues/14299)


## 技术栈

### [zustand](https://github.com/pmndrs/zustand)
> zustand 是轻量型、快速的状态管理工具。

#### 参考文档

1. [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
2. [精读《zustand 源码》](https://zhuanlan.zhihu.com/p/461152248)
3. [谈谈复杂应用的状态管理（上）：为什么是 Zustand](https://juejin.cn/post/7177216308843380797)
4. [谈谈复杂应用的状态管理（下）：基于 Zustand 的渐进式状态管理实践](https://juejin.cn/post/7182462103297458236)
5. [zustand 搞定 react 中复杂状态管理](https://www.tiven.cn/p/fb3cbc64/)
6. [浅析 zustand 状态管理器](https://www.leezhian.com/web/framework/zustand-analysis)