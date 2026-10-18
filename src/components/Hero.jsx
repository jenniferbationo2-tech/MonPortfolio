import { useState } from 'react'
import { motion } from 'motion/react'
import { cvFileName, profile } from '../data/portfolio'
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
    // Petite sur mobile (à côté du badge), grande sur ordinateur
    <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-navy-light shadow-[8px_8px_0_#FF7A00] sm:w-48 lg:w-full lg:max-w-sm lg:rounded-3xl lg:shadow-[16px_16px_0_#FF7A00]">
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

// ready : false tant que le rideau de l'intro est fermé → les animations attendent
export default function Hero({ ready = true }) {
  return (
    <section id="accueil" className="relative overflow-hidden bg-navy text-cream">
      {ready && (
        <NetworkBackground className="pointer-events-none absolute -right-24 top-10 w-[720px] max-w-none opacity-40 md:-right-10" />
      )}

      {/* Mobile/tablette : photo en haut puis texte. Ordinateur (lg) : texte à gauche, photo à droite */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="flex min-w-0 flex-1 flex-col gap-7"
        >
          <motion.p variants={item} className="font-mono text-sm tracking-[0.2em] text-orange">
            DATA • DÉVELOPPEMENT • IA
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
              href={profile.cv}
              download={cvFileName}
              className="group inline-flex items-center gap-2.5 rounded-lg border border-slate-700 px-7 py-4 font-semibold transition hover:border-cream"
            >
              <Icon name="download" size={18} className="transition-transform group-hover:translate-y-0.5" />
              Télécharger mon CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-3 py-4 font-semibold text-slate-300 underline-offset-4 transition hover:text-cream hover:underline"
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
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.92, rotate: -2 }}
          transition={{ duration: 1, delay: ready ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-first flex items-end gap-5 sm:gap-6 lg:order-last lg:block lg:w-[380px] lg:shrink-0"
        >
          <Portrait />
          {/* Badge « Actuellement » : à côté de la photo sur mobile, posé dessus et flottant sur ordinateur */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mb-3 flex max-w-[220px] items-center gap-3 rounded-xl border border-white/10 bg-navy-light/95 px-4 py-3 shadow-xl backdrop-blur lg:absolute lg:-bottom-6 lg:-left-10 lg:mb-0 lg:max-w-[280px]"
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
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: ready ? 1.6 : 0 }}
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
