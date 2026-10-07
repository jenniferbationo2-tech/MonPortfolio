import Reveal from './Reveal'

// Titre de section réutilisable : « 01 / À propos » + grand titre.
// `dark` adapte les couleurs quand la section est sur fond navy.
export default function SectionHeading({ number, label, title, dark = false }) {
  return (
    <Reveal className="flex flex-col gap-4">
      <p className={`font-mono text-sm ${dark ? 'text-orange' : 'text-orange-dark'}`}>
        {number} / {label}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        {title}
        <span className="text-orange">.</span>
      </h2>
    </Reveal>
  )
}
