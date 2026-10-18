import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'

const INTRO_KEY = 'bycj-intro-vue'

// L'intro ne s'affiche qu'à la première visite, et jamais si la personne
// a demandé à son système de réduire les animations.
function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return localStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return false
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const [heroReady, setHeroReady] = useState(() => !showIntro)

  const openIntro = useCallback(() => setHeroReady(true), [])
  const finishIntro = useCallback(() => {
    setShowIntro(false)
    try {
      localStorage.setItem(INTRO_KEY, '1')
    } catch {
      // Stockage indisponible (navigation privée) : l'intro reviendra, ce n'est pas grave
    }
  }, [])

  const replayIntro = () => {
    setHeroReady(false)
    setShowIntro(true)
  }

  return (
    // reducedMotion="user" : si la personne a demandé moins d'animations
    // dans son système, Motion les désactive automatiquement.
    <MotionConfig reducedMotion="user">
      {showIntro && <Intro onOpen={openIntro} onDone={finishIntro} />}
      <Navbar />
      <main>
        <Hero ready={heroReady} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer onReplayIntro={replayIntro} />
    </MotionConfig>
  )
}

export default App
