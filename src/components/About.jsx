import { motion } from 'motion/react'
import { about } from '../data/portfolio'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function About() {
  return (
    <section id="apropos" className="bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-16 px-4 py-28 sm:px-6">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-6">
          <SectionHeading number="01" label="À propos" title="Coder avec une intention" />
          {about.text.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 * (i + 1)}>
              <p className="text-[17px] leading-relaxed text-slate-600">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <h3 className="mb-3 font-mono text-sm text-slate-600">// Langues</h3>
            <ul className="flex flex-wrap gap-2">
              {about.languages.map((lang) => (
                <li key={lang.name} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-slate-500"> · {lang.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid min-w-0 flex-[1_1_520px] content-center gap-5 sm:grid-cols-3">
          {about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.12 * i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                  <Icon name={pillar.icon} size={24} />
                </span>
                <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-600">{pillar.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
