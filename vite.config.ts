import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.sass', '.scss'], // 忽略输入的扩展名
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '~', replacement: path.resolve(__dirname, './node_modules') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname, 'src/routes'),
      },
      { find: '@utils', replacement: path.resolve(__dirname, 'utils') },
      {
        find: '@antd/dist/reset.css',
        replacement: path.join(__dirname, 'node_modules/antd/dist/reset.css'),
      },
      // { find: 'antd', replacement: path.join(__dirname, 'node_modules/antd/dist/antd.js') },
      // {
      //   find: '@ant-design/icons',
      //   replacement: path.join(__dirname, 'node_modules/@ant-design/icons/dist/index.umd.js')
      // }
    ],
  },
});
