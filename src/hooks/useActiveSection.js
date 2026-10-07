import { useEffect, useState } from 'react'

// Hook personnalisé : renvoie l'id de la section actuellement au milieu de l'écran.
// IntersectionObserver prévient le navigateur quand un élément entre/sort d'une zone.
export default function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // Zone d'observation : une bande fine au milieu de l'écran
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Nettoyage quand le composant disparaît
    return () => observer.disconnect()
  }, [ids])

  return active
}
