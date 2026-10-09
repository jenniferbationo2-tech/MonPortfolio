import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projectFilters, projects } from '../data/portfolio'
import Icon from './ui/Icon'
import Lightbox from './ui/Lightbox'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

// Illustration de VEXDRONE (sans capture) : un pylône et un cadre de détection qui « scanne »
function DetectionVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-navy">
      <svg aria-hidden="true" viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" fill="none">
        <g stroke="#475569" strokeWidth="2">
          <path d="M200 20L160 200M200 20l40 180M170 150h60M178 110h44M186 70h28M140 60h120M150 100h100" />
          <path d="M0 60c60 10 100 0 140 0M260 60c40 0 80 10 140 0M0 100c60 8 100 0 150 0M250 100c50 0 90 8 150 0" />
        </g>
      </svg>
      <motion.div
        className="absolute rounded border-2 border-orange"
        style={{ left: '58%', top: '20%', width: '16%', height: '28%' }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
      >
        <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-orange px-1.5 py-0.5 font-mono text-[10px] font-medium text-navy">
          anomalie
        </span>
      </motion.div>
      <motion.div
        className="absolute inset-x-0 h-px bg-electric-light/70 shadow-[0_0_12px_#60A5FA]"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <span className="absolute bottom-3 left-3 font-mono text-[11px] text-slate-400">YOLO · inspection en cours</span>
    </div>
  )
}

// Visuel de remplacement tant que la capture n'est pas ajoutée
function PlaceholderVisual({ project }) {
  if (project.type === 'ia') return <DetectionVisual />
  return (
    <div className="flex h-full w-full items-center justify-center bg-navy bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px]">
      <span className="font-display text-2xl font-bold text-slate-600">{project.title}</span>
    </div>
  )
}

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

// Cadre façon navigateur autour de la capture d'écran
function BrowserFrame({ project, onOpen }) {
  // Pas d'image, ou fichier introuvable → visuel de remplacement (non cliquable)
  const [failed, setFailed] = useState(!project.image)
  const host = hostname(project.link)

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-navy">
      <div className="flex items-center gap-2 border-b border-slate-700 bg-navy-deep px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
        <span className="ml-2 truncate rounded bg-navy-light px-2 py-0.5 font-mono text-[11px] text-slate-400">
          {host || project.title.toLowerCase()}
        </span>
      </div>
      <div className={`relative ${project.featured ? 'aspect-[16/8]' : 'aspect-video'}`}>
        {failed ? (
          <PlaceholderVisual project={project} />
        ) : (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Agrandir la capture de ${project.title}`}
            className="group/frame relative block h-full w-full overflow-hidden"
          >
            <img
              src={project.image}
              alt={`Capture d'écran de ${project.title}`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-105"
            />
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy/80 text-cream opacity-0 transition-opacity group-hover/frame:opacity-100">
              <Icon name="expand" size={16} />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpenImage }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col gap-4 rounded-2xl border border-slate-800 bg-navy-light p-5 transition-colors hover:border-orange/50 sm:p-6 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <BrowserFrame project={project} onOpen={() => onOpenImage(project)} />
      <div className="flex flex-1 flex-col gap-3 px-1 pt-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-electric-light">{project.category}</p>
        <h3 className={`font-display font-bold ${project.featured ? 'text-3xl' : 'text-2xl'}`}>{project.title}</h3>
        <p className="text-sm text-slate-400">{project.context}</p>
        <p className="leading-relaxed text-slate-300">{project.description}</p>
        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-md border border-slate-700 px-3 py-1 font-mono text-xs text-slate-300">
                {tech}
              </li>
            ))}
          </ul>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold"
          >
            Visiter le site <Icon name="external" size={16} />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('tous')
  const [zoomed, setZoomed] = useState(null)
  const visible = filter === 'tous' ? projects : projects.filter((p) => p.type === filter)

  const openImage = (project) =>
    setZoomed({ src: project.image, alt: `Capture d'écran de ${project.title}`, caption: project.title })
  // useCallback : garde la même fonction d'un affichage à l'autre (évite de relancer l'effet de la Lightbox)
  const closeImage = useCallback(() => setZoomed(null), [])

  return (
    <section id="projets" className="bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-28 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading number="03" label="Projets" title="Projets sélectionnés" dark />

          <Reveal>
            <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-1 rounded-xl border border-slate-800 p-1">
              {projectFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`relative min-h-11 rounded-lg px-4 text-sm font-medium transition-colors ${
                    filter === f.id ? 'text-navy' : 'text-slate-400 hover:text-cream'
                  }`}
                >
                  {filter === f.id && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-lg bg-orange" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* layout + AnimatePresence : les cartes se réorganisent en glissant */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} onOpenImage={openImage} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox image={zoomed} onClose={closeImage} />
    </section>
  )
}
