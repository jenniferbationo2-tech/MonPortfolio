import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { certifications, education, experiences } from '../data/portfolio'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const tabs = [
  { id: 'experiences', label: 'Expériences' },
  { id: 'formation', label: 'Formation' },
  { id: 'certifications', label: 'Certifications' },
]

// Un élément de la frise : le point orange se « remplit » à l'apparition
function TimelineItem({ period, title, org, children, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pb-10 pl-8 last:pb-0"
    >
      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-orange bg-cream" />
      <p className="font-mono text-[13px] text-orange-dark">{period}</p>
      <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
      <p className="text-[15px] font-medium text-electric">{org}</p>
      {children}
    </motion.li>
  )
}

export default function Journey() {
  const [tab, setTab] = useState('experiences')

  return (
    <section id="parcours" className="bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-28 sm:px-6">
        <SectionHeading number="04" label="Parcours" title="Expériences & formation" />

        <Reveal>
          <div role="tablist" aria-label="Parcours" className="flex flex-wrap gap-2 border-b border-slate-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="parcours-panel"
                onClick={() => setTab(t.id)}
                className={`relative min-h-11 px-4 pb-3 font-medium transition-colors ${
                  tab === t.id ? 'text-navy' : 'text-slate-500 hover:text-navy'
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-orange" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="parcours-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'experiences' && (
                <ol className="max-w-3xl border-l-2 border-slate-200">
                  {experiences.map((exp, i) => (
                    <TimelineItem key={exp.title} index={i} {...exp}>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {exp.points.map((point) => (
                          <li key={point} className="flex gap-2 text-[15px] leading-relaxed text-slate-600">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </TimelineItem>
                  ))}
                </ol>
              )}

              {tab === 'formation' && (
                <ol className="max-w-3xl border-l-2 border-slate-200">
                  {education.map((edu, i) => (
                    <TimelineItem key={edu.title} index={i} {...edu}>
                      <span
                        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          edu.status === 'En cours' ? 'bg-orange/15 text-orange-dark' : 'bg-electric/10 text-electric'
                        }`}
                      >
                        {edu.status}
                      </span>
                    </TimelineItem>
                  ))}
                </ol>
              )}

              {tab === 'certifications' && (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {certifications.map((cert, i) => (
                    <motion.li
                      key={cert.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange-dark">
                        <Icon name="award" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-display font-semibold">{cert.title}</span>
                        <span className="text-sm text-slate-600">{cert.org}</span>
                        <span className="mt-1 font-mono text-xs text-slate-500">{cert.date}</span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
