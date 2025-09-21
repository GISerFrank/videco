import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 导入 Node.js 的 path 模块

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 在这里配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
