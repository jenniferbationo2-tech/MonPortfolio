import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cvFileName, profile } from '../data/portfolio'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Presse-papiers indisponible : le lien mailto reste utilisable
    }
  }

  const socials = [
    { label: 'GitHub', href: profile.github, icon: 'github' },
    { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  ].filter((s) => s.href)

  return (
    <section id="contact" className="relative overflow-hidden bg-navy text-cream">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 px-4 py-28 text-center sm:px-6">
        <Reveal>
          <p className="font-mono text-sm text-orange">05 / Contact</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Un projet, une idée, une opportunité ? Parlons-en<span className="text-orange">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            Je suis ouverte aux stages, collaborations et projets autour du Web, de la Data et de l'IA.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-orange px-6 py-4 font-semibold text-navy transition hover:bg-[#ff8f2b]"
            >
              <Icon name="mail" size={18} /> M'écrire
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex min-w-44 items-center justify-center gap-2.5 rounded-lg border border-slate-700 px-6 py-4 font-semibold transition hover:border-cream"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'ok' : 'copy'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2.5"
                >
                  <Icon name={copied ? 'check' : 'copy'} size={18} className={copied ? 'text-orange' : ''} />
                  {copied ? 'Copié !' : "Copier l'email"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p className="font-mono text-sm text-slate-400">{profile.email}</p>
          <a
            href={profile.cv}
            download={cvFileName}
            className="mt-2 inline-flex items-center gap-2 font-semibold"
          >
            <Icon name="download" size={18} /> Télécharger mon CV (PDF)
          </a>
        </Reveal>

        {socials.length > 0 && (
          <Reveal delay={0.4} className="flex gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-orange hover:text-orange"
              >
                <Icon name={s.icon} />
              </motion.a>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
