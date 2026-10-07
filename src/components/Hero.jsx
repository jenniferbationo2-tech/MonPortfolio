import { useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../data/portfolio'
import NetworkBackground from './NetworkBackground'
import Icon from './ui/Icon'

// « variants » : on décrit les états une fois, le parent orchestre les enfants.
// staggerChildren fait apparaître les éléments l'un après l'autre.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Portrait() {
  // Si la photo n'existe pas encore, on affiche un emplacement
  const [missing, setMissing] = useState(false)

  return (
    <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-slate-700 bg-navy-light shadow-[16px_16px_0_#FF7A00]">
      {missing ? (
        <div className="flex h-full items-center justify-center font-mono text-sm text-slate-400">[ TON PORTRAIT ]</div>
      ) : (
        <img
          src={profile.portrait}
          alt={`Portrait de ${profile.name}`}
          onError={() => setMissing(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-navy text-cream">
      <NetworkBackground className="pointer-events-none absolute -right-24 top-10 w-[720px] max-w-none opacity-40 md:-right-10" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-wrap items-center gap-16 px-4 pb-24 pt-32 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex min-w-0 flex-[1_1_520px] flex-col gap-7"
        >
          <motion.p variants={item} className="font-mono text-sm tracking-[0.2em] text-orange">
            DATA • DEVELOPMENT • AI
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Je transforme les idées en solutions numériques<span className="text-orange">.</span>
          </motion.h1>
          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-slate-300">
            Développeuse passionnée par le Web, la Data et l'Intelligence Artificielle, je conçois des applications et
            des solutions intelligentes répondant à des problèmes réels.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projets"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-orange px-7 py-4 font-semibold text-navy transition hover:bg-[#ff8f2b]"
            >
              Voir mes projets
              <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg border border-slate-700 px-7 py-4 font-semibold transition hover:border-cream"
            >
              Me contacter
            </a>
          </motion.div>
          <motion.p variants={item} className="flex items-center gap-2 text-sm text-slate-400">
            <Icon name="pin" size={16} /> {profile.location}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-[0_1_400px] flex-col items-center"
        >
          <Portrait />
          {/* Badge « Actuellement » qui flotte doucement */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-4 flex max-w-[280px] items-center gap-3 rounded-xl border border-white/10 bg-navy-light/95 px-4 py-3 shadow-xl backdrop-blur sm:-left-10"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange" />
            </span>
            <span className="text-xs leading-snug text-slate-300">
              <span className="block font-mono text-[11px] tracking-widest text-slate-400">ACTUELLEMENT</span>
              {profile.currently}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <motion.a
        href="#apropos"
        aria-label="Descendre vers la section À propos"
        className="absolute bottom-8 left-1/2 hidden h-11 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-slate-600 pt-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.span
          className="h-2 w-1 rounded-full bg-orange"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  )
}
