import { motion } from 'motion/react'

// Le réseau de points du Hero : IA → données → réseau → développement.
const nodes = [
  { x: 60, y: 80 }, { x: 210, y: 140, hot: true }, { x: 380, y: 60 }, { x: 300, y: 280, hot: true },
  { x: 520, y: 170, hot: true }, { x: 150, y: 360 }, { x: 440, y: 420 }, { x: 560, y: 340 },
]
const links = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [3, 6], [4, 7], [6, 7], [0, 5]]

export default function NetworkBackground({ className = '' }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 600 500"
      fill="none"
      className={className}
      // Lente flottaison de tout le réseau, en boucle
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#2563EB"
          strokeWidth="1"
          // pathLength 0 → 1 : la ligne « se dessine »
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 + i * 0.12, ease: 'easeInOut' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.hot ? 6 : 4}
          fill={n.hot ? '#FF7A00' : '#2563EB'}
          initial={{ scale: 0 }}
          animate={n.hot ? { scale: [1, 1.5, 1] } : { scale: 1 }}
          transition={
            n.hot
              ? { duration: 2.4, repeat: Infinity, delay: 1 + i * 0.3, ease: 'easeInOut' }
              : { duration: 0.4, delay: 0.3 + i * 0.1 }
          }
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </motion.svg>
  )
}
