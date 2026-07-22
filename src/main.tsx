import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// フォントはセルフホスト(外部CDN非依存)。unicode-rangeスライス版なので
// ブラウザは実際に使用するグリフのスライスだけをダウンロードする。
// CSSサイズを抑えるためウェイトは3つに限定(見出し明朝600 / 本文400・中量500)
import '@fontsource/shippori-mincho/600.css'
import '@fontsource/zen-kaku-gothic-new/400.css'
import '@fontsource/zen-kaku-gothic-new/500.css'

import './styles/tokens.css'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
