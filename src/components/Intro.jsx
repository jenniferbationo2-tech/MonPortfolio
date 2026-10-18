import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { profile } from '../data/portfolio'
import Icon from './ui/Icon'

const bootLines = ['> initialisation du portfolio…', '> chargement des projets…', '> prêt. cliquez sur la photo pour entrer']
const curtainEase = [0.76, 0, 0.24, 1]

// Générateur pseudo-aléatoire « à graine » : les particules sont identiques
// à chaque affichage (un vrai Math.random changerait tout à chaque rendu).
function seeded(seed) {
  let s = seed
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}
const rand = seeded(42)
const particles = Array.from({ length: 28 }, () => ({
  left: rand() * 100,
  size: 2 + rand() * 3,
  duration: 10 + rand() * 12,
  delay: -rand() * 20, // délai négatif : les particules sont déjà en vol à l'ouverture
  drift: (rand() - 0.5) * 80,
  color: rand() > 0.6 ? '#FF7A00' : '#60A5FA',
}))

// Un pan du rideau : plis qui ondulent + particules de données qui montent
function CurtainPanel({ side, opening, items }) {
  const isLeft = side === 'left'
  return (
    <motion.div
      className={`intro-curtain absolute inset-y-0 w-1/2 overflow-hidden bg-navy ${
        isLeft ? 'left-0 border-r' : 'right-0 border-l'
      } border-orange/60`}
      animate={{ x: opening ? (isLeft ? '-100%' : '100%') : 0 }}
      transition={{ duration: 1, delay: 0.45, ease: curtainEase }}
    >
      {items.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="intro-particle absolute top-full rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </motion.div>
  )
}

// Nom complet ; à l'ouverture, seules les initiales restent et forment « BYCJ. »
const words = profile.signatureName.split(' ')
const nameEase = [0.65, 0, 0.35, 1]

function SignatureName({ collapsed }) {
  return (
    <motion.div
      className="relative min-w-0"
      // Fondu final : laisse la place au logo de la navbar, juste en dessous
      animate={{ opacity: collapsed ? 0 : 1 }}
      transition={{ delay: collapsed ? 1.1 : 0, duration: 0.35 }}
    >
      <span
        aria-label={profile.signatureName}
        className="flex flex-wrap font-display text-lg font-bold tracking-wide sm:text-2xl"
      >
        {words.map((word, i) => (
          <span key={word} aria-hidden="true" className="flex">
            {/* Initiale : apparaît en se « défloutant », reste à l'ouverture */}
            <motion.span
              className="text-cream"
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
            >
              {word[0]}
            </motion.span>
            {/* Reste du mot (+ espace) : se replie à l'ouverture */}
            <motion.span
              className="overflow-hidden whitespace-pre font-medium text-slate-400"
              initial={{ opacity: 0 }}
              animate={collapsed ? { width: 0, opacity: 0 } : { opacity: 1 }}
              transition={collapsed ? { duration: 0.5, ease: nameEase } : { delay: 0.7 + i * 0.15, duration: 0.8 }}
            >
              {word.slice(1) + (i < words.length - 1 ? ' ' : '')}
            </motion.span>
          </span>
        ))}
        <motion.span
          aria-hidden="true"
          className="text-orange"
          initial={{ opacity: 0, scale: 0 }}
          animate={collapsed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: collapsed ? 0.4 : 0, type: 'spring', stiffness: 400, damping: 15 }}
        >
          .
        </motion.span>
      </span>
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-full mt-0.5 font-mono text-[10px] tracking-[0.3em] text-orange sm:text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: collapsed ? 0 : 1 }}
        transition={{ delay: collapsed ? 0 : 1.4, duration: 0.4 }}
      >
        PORTFOLIO
      </motion.span>
    </motion.div>
  )
}

// Écran d'accueil : une pancarte (la photo) suspendue à un clou sur un rideau.
// onOpen : appelé au clic (le Hero démarre) ; onDone : quand le rideau est ouvert.
export default function Intro({ onOpen, onDone }) {
  const [opening, setOpening] = useState(false)
  const [step, setStep] = useState(0)
  const signRef = useRef(null)

  // Inclinaison de la pancarte. Un ressort peu amorti → elle se balance avant de se stabiliser.
  const tilt = useMotionValue(0)
  const rotate = useSpring(tilt, { stiffness: 45, damping: 5, mass: 1.2 })

  // Projecteur : un halo de lumière qui suit le curseur (centré au départ)
  const lightX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const lightY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight * 0.4 : 0)
  const smoothX = useSpring(lightX, { stiffness: 80, damping: 20 })
  const smoothY = useSpring(lightY, { stiffness: 80, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, rgba(255,122,0,0.13), rgba(37,99,235,0.06) 45%, transparent 70%)`

  const enter = () => {
    if (opening) return
    setOpening(true)
    tilt.set(0)
    onOpen()
    setTimeout(onDone, 1500)
  }

  useEffect(() => {
    // Page bloquée en haut tant que le rideau est fermé.
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

  const handleMove = (e) => {
    if (opening) return
    lightX.set(e.clientX)
    lightY.set(e.clientY)
    // La pancarte penche vers le curseur
    if (!signRef.current) return
    const rect = signRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
    tilt.set(Math.max(-1, Math.min(1, dx)) * 10)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden ${opening ? 'pointer-events-none' : ''}`}
      onMouseMove={handleMove}
    >
      <CurtainPanel side="left" opening={opening} items={particles.slice(0, 14)} />
      <CurtainPanel side="right" opening={opening} items={particles.slice(14)} />

      {/* Projecteur (respire doucement, suit le curseur) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
        animate={{ opacity: opening ? 0 : [0.75, 1, 0.75] }}
        transition={opening ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Barre du haut : mêmes marges que la navbar, pour que « BYCJ. » tombe pile sur le logo */}
      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <SignatureName collapsed={opening} />
          <motion.button
            type="button"
            onClick={enter}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-400 transition-colors hover:text-cream"
          >
            Passer l'intro <Icon name="arrowRight" size={16} />
          </motion.button>
        </div>
      </div>

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
        {/* Indice « cliquez ici » à côté de la pancarte (ordinateur) */}
        <motion.div
          aria-hidden="true"
          className="absolute left-full top-[45%] ml-6 hidden items-center gap-2 whitespace-nowrap font-mono text-sm text-orange md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 1, x: [0, -10, 0] }}
          transition={{
            opacity: { delay: opening ? 0 : 1.8, duration: 0.4 },
            x: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Icon name="arrowRight" size={20} className="rotate-180" /> cliquez ici
        </motion.div>

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
            aria-label="Cliquez sur la photo pour entrer sur le portfolio"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative -mt-1 w-full cursor-pointer rounded-xl bg-cream p-3 pb-4 text-left text-navy shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] outline-none focus-visible:ring-4 focus-visible:ring-orange"
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

            <span className="relative mt-4 block aspect-[4/5] overflow-hidden rounded-lg bg-slate-200">
              <img
                src={profile.portrait}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Voile « Entrer » au survol */}
              <span className="absolute inset-0 flex items-center justify-center bg-navy/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-navy">
                  Entrer <Icon name="arrowRight" size={16} />
                </span>
              </span>
            </span>

            <span className="mt-3 block px-1">
              <span className="block font-display text-2xl font-bold leading-tight">
                Bienvenue<span className="text-orange">.</span>
              </span>
              <span className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-orange px-3 py-2 text-[13px] font-semibold text-navy">
                <motion.span
                  className="inline-flex"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon name="pointer" size={16} />
                </motion.span>
                Cliquez sur la photo pour entrer
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
