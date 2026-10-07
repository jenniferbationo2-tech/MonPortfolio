import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { navLinks } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'
import Icon from './ui/Icon'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  // Barre de progression : scrollYProgress va de 0 (haut) à 1 (bas de page)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-navy/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <motion.div className="absolute inset-x-0 top-0 h-0.5 origin-left bg-orange" style={{ scaleX: progress }} />

      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
      >
        <a href="#accueil" className="font-display text-2xl font-bold tracking-wide text-cream">
          BYCJ<span className="text-orange">.</span>
        </a>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative py-2 text-[15px] font-medium transition-colors ${
                  active === link.id ? 'text-cream' : 'text-slate-400 hover:text-cream'
                }`}
              >
                {link.label}
                {active === link.id && (
                  // layoutId : Motion fait glisser ce trait d'un lien à l'autre
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-orange"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-cream md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden px-4 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="border-t border-white/10"
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-4 font-display text-lg ${active === link.id ? 'text-orange' : 'text-cream'}`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
