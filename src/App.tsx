import { SkipLink } from './components/layout/SkipLink'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { Hero } from './components/sections/Hero'
import { Philosophy } from './components/sections/Philosophy'
import { Collection } from './components/sections/Collection'
import { CtaBand } from './components/sections/CtaBand'
import { Menu } from './components/sections/Menu'
import { Craft } from './components/sections/Craft'
import { Shop } from './components/sections/Shop'
import { Reservation } from './components/sections/Reservation'
import { useInitialHashScroll } from './hooks/useInitialHashScroll'

function App() {
  useInitialHashScroll()

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Philosophy />
        <Collection />
        <CtaBand />
        <Menu />
        <Craft />
        <Shop />
        <Reservation />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
