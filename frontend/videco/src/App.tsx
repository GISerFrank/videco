// src/App.tsx
// import React from 'react';
import { AppRouter } from './router';
import './styles/global.css'; // 引入全局样式

/**
 * 这是应用的根组件。
 * 目前它的职责很简单，就是渲染AppRouter。
 * 未来，我们可以在这里包裹一些全局的Context Provider，
 * 例如主题(Theme)切换、国际化(i18n)等。
 */
function App() {
    return <AppRouter />;
}

export default App;
