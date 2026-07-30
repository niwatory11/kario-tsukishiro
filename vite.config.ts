/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages(プロジェクトページ)配信用のサブパス
  base: '/kario-tsukishiro/',
  plugins: [react()],
  build: {
    // 4KB未満でもインライン化しない。base64化はフォントスライスをCSSに、
    // srcset用の小画像をJSに埋め込んでしまい、unicode-range・srcsetによる
    // 「必要な分だけ取得」を無効化するため
    assetsInlineLimit: 0,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
