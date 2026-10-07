import { motion } from 'motion/react'
import { skills } from '../data/portfolio'
import SectionHeading from './ui/SectionHeading'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const chip = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
}

export default function Skills() {
  return (
    <section id="competences" className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-28 sm:px-6">
        <SectionHeading number="02" label="Compétences" title="Ma boîte à outils" />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col gap-4">
              <h3 className="font-mono text-sm text-slate-600">// {group.category}</h3>
              {/* Les puces apparaissent en cascade quand le groupe devient visible */}
              <motion.ul
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-wrap gap-2.5"
              >
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={chip}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-full bg-slate-100 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-navy hover:text-cream"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
