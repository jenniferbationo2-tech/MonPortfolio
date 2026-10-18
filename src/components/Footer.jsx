import { profile } from '../data/portfolio'
import Icon from './ui/Icon'

// Calculé une seule fois au chargement, pas à chaque affichage
const year = new Date().getFullYear()

export default function Footer({ onReplayIntro }) {
  return (
    <footer className="bg-navy-deep text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <span className="font-display text-xl font-bold text-cream">
          BYCJ<span className="text-orange">.</span>
        </span>
        <span className="font-mono text-[13px]">
          © {year} {profile.name}
        </span>
        <div className="flex items-center gap-3">
          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="min-h-11 px-2 font-mono text-[13px] underline-offset-4 transition-colors hover:text-orange hover:underline"
            >
              Revoir l'intro
            </button>
          )}
          <a
            href="#accueil"
            aria-label="Revenir en haut de la page"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 transition-colors hover:border-orange hover:text-orange"
          >
            <Icon name="arrowUp" size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
