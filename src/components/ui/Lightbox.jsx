import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'

// Affiche une image en grand par-dessus la page.
// `image` = { src, alt, caption } ou null (fermé).
export default function Lightbox({ image, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!image) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    // Empêche la page de défiler derrière la fenêtre
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm sm:p-10"
        >
          <motion.figure
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full max-w-5xl flex-col items-center gap-4"
          >
            <img src={image.src} alt={image.alt} className="max-h-[80vh] w-auto rounded-xl shadow-2xl" />
            {image.caption && (
              <figcaption className="text-center font-mono text-sm text-slate-300">{image.caption}</figcaption>
            )}
          </motion.figure>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-slate-600 text-cream transition-colors hover:border-orange hover:text-orange"
          >
            <Icon name="close" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
