import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { profile } from '../data/portfolio'
import Icon from './ui/Icon'

const bootLines = ['> initialisation du portfolio…', '> chargement des projets…', '> prêt. cliquez sur la pancarte']

// Plis du rideau : fines bandes verticales
const pleats = {
  backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 56px)',
}
const curtainEase = [0.76, 0, 0.24, 1]

// Écran d'accueil : une pancarte (la photo) suspendue à un clou sur un rideau.
// onOpen : appelé au clic (le Hero démarre) ; onDone : quand le rideau est ouvert.
export default function Intro({ onOpen, onDone }) {
  const [opening, setOpening] = useState(false)
  const [step, setStep] = useState(0)
  const signRef = useRef(null)

  // Inclinaison de la pancarte. Un ressort peu amorti → elle se balance avant de se stabiliser.
  const tilt = useMotionValue(0)
  const rotate = useSpring(tilt, { stiffness: 45, damping: 5, mass: 1.2 })

  const enter = () => {
    if (opening) return
    setOpening(true)
    tilt.set(0)
    onOpen()
    setTimeout(onDone, 1500)
  }

  useEffect(() => {
    // Page bloquée en haut tant que le rideau est fermé
    // 'instant' : sinon le défilement doux du site s'appliquerait (cas « Revoir l'intro » depuis le bas)
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.body.style.overflow = 'hidden'

    // Petite secousse à l'arrivée de la pancarte, puis focus pour le clavier
    const swing = setTimeout(() => {
      tilt.set(12)
      setTimeout(() => tilt.set(0), 140)
      signRef.current?.focus({ preventScroll: true })
    }, 900)
    const boot1 = setTimeout(() => setStep(1), 700)
    const boot2 = setTimeout(() => setStep(2), 1500)

    return () => {
      document.body.style.overflow = ''
      clearTimeout(swing)
      clearTimeout(boot1)
      clearTimeout(boot2)
    }
  }, [tilt])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && enter()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // La pancarte penche vers le curseur
  const handleMove = (e) => {
    if (opening || !signRef.current) return
    const rect = signRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
    tilt.set(Math.max(-1, Math.min(1, dx)) * 10)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden ${opening ? 'pointer-events-none' : ''}`}
      onMouseMove={handleMove}
    >
      {/* Rideau : deux pans qui s'écartent */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 border-r border-orange/60 bg-navy"
        style={pleats}
        animate={{ x: opening ? '-100%' : 0 }}
        transition={{ duration: 1, delay: 0.45, ease: curtainEase }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 border-l border-orange/60 bg-navy"
        style={pleats}
        animate={{ x: opening ? '100%' : 0 }}
        transition={{ duration: 1, delay: 0.45, ease: curtainEase }}
      />

      {/* Barre du haut : signature + passer l'intro */}
      <motion.div
        className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 sm:px-6"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-display text-2xl font-bold tracking-wide text-cream">
          BYCJ<span className="text-orange">.</span>
        </span>
        <button
          type="button"
          onClick={enter}
          className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-400 transition-colors hover:text-cream"
        >
          Passer l'intro <Icon name="arrowRight" size={16} />
        </button>
      </motion.div>

      {/* Pancarte suspendue */}
      <motion.div
        className="absolute left-1/2 top-[6vh] w-[240px] -translate-x-1/2 sm:w-[260px]"
        initial={{ y: '-110vh' }}
        animate={{ y: opening ? '-130vh' : 0 }}
        transition={
          opening
            ? { duration: 0.6, ease: [0.7, 0, 0.84, 0] }
            : { type: 'spring', stiffness: 70, damping: 11, delay: 0.25 }
        }
      >
        <motion.div style={{ rotate, transformOrigin: '50% 0%' }} className="flex flex-col items-center">
          {/* Clou + fils */}
          <svg aria-hidden="true" viewBox="0 0 260 90" className="block w-full" fill="none">
            <path d="M130 8L22 88M130 8l108 80" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="130" cy="8" r="6" fill="#CBD5E1" />
            <circle cx="130" cy="8" r="2.5" fill="#475569" />
          </svg>

          <motion.button
            ref={signRef}
            type="button"
            onClick={enter}
            aria-label="Entrer sur le portfolio"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative -mt-1 w-full rounded-xl bg-cream p-3 pb-4 text-left text-navy shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] outline-none focus-visible:ring-4 focus-visible:ring-orange"
          >
            {/* Œillets où passent les fils */}
            <span className="absolute left-[14px] top-2 h-3 w-3 rounded-full border-2 border-slate-400 bg-slate-200" />
            <span className="absolute right-[14px] top-2 h-3 w-3 rounded-full border-2 border-slate-400 bg-slate-200" />

            {/* Halo qui invite à cliquer */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-2xl border-2 border-orange"
              animate={{ opacity: [0, 0.7, 0], scale: [0.97, 1.04, 1.08] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
            />

            <span className="mt-4 block aspect-[4/5] overflow-hidden rounded-lg bg-slate-200">
              <img src={profile.portrait} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="mt-3 block px-1">
              <span className="block font-display text-2xl font-bold leading-tight">
                Bienvenue<span className="text-orange">.</span>
              </span>
              <span className="mt-1 flex items-center gap-2 font-mono text-xs text-slate-600">
                Entrez dans mon univers
                <Icon name="arrowRight" size={14} className="text-orange transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Console de démarrage */}
      <motion.div
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 px-4 font-mono text-xs sm:text-sm"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        {bootLines.slice(0, step + 1).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={i === step ? 'text-orange' : 'text-slate-500'}
          >
            {line}
            {i === step && (
              <motion.span
                className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-orange"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
          </motion.p>
        ))}
      </motion.div>
    </div>
  )
}
