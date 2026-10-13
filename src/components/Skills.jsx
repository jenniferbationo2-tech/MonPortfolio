import { motion } from 'motion/react'
import { skills } from '../data/portfolio'
import { brandLogos, fallbackIcons } from '../data/skillLogos'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const chip = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

// Logo officiel en couleur de la marque, sinon icône du site
function SkillLogo({ name }) {
  const brand = brandLogos[name]
  if (brand) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill={`#${brand.hex}`} className="shrink-0">
        <path d={brand.path} />
      </svg>
    )
  }
  return <Icon name={fallbackIcons[name] ?? 'code'} size={18} className="shrink-0 text-slate-500" />
}

export default function Skills() {
  return (
    <section id="competences" className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-28 sm:px-6">
        <SectionHeading number="02" label="Compétences" title="Ma boîte à outils" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={0.06 * i} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-slate-200 bg-cream p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange-dark">
                    <Icon name={group.icon} size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-tight">{group.category}</h3>
                </div>

                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  {group.items.map((skill) => {
                    const brand = brandLogos[skill]
                    return (
                      <motion.li
                        key={skill}
                        variants={chip}
                        whileHover={{ y: -3 }}
                        // --brand : la bordure prend la couleur du logo au survol
                        style={{ '--brand': brand ? `#${brand.hex}` : '#0B1220' }}
                        className="flex cursor-default items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:border-[var(--brand)]"
                      >
                        <SkillLogo name={skill} />
                        {skill}
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
