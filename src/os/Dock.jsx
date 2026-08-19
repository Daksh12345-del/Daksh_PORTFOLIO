import { motion } from 'framer-motion'

const ITEMS = [
  { id: 'terminal', label: 'terminal', icon: '>_' },
  { id: 'browser', label: 'browser', icon: '\u25CE' },
  { id: 'projects', label: 'projects', icon: '▣' },
  { id: 'about', label: 'about', icon: '☰' },
  { id: 'skills', label: 'skills', icon: '▦' },
  { id: 'resume', label: 'resume', icon: '▤' },
  { id: 'agent', label: 'agent', icon: '✦' },
  { id: 'contact', label: 'contact', icon: '@' },
]

export default function Dock({ openIds, onOpen }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] flex justify-center pb-4 px-4 no-print">
      <div className="os-dock flex gap-2 px-3 py-3 rounded-[16px] flex-wrap justify-center">
        {ITEMS.map((item) => {
          const active = openIds.includes(item.id)
          return (
            <motion.button
              key={item.id}
              onClick={() => onOpen(item.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="os-dock-item flex flex-col items-center justify-center gap-1 px-4 py-2.5 rounded-[10px] min-w-[76px]"
              data-active={active}
            >
              <span className="text-[15px] font-mono-ui leading-none" style={{ color: active ? 'var(--os-accent)' : 'var(--os-text-dim)' }}>
                {item.icon}
              </span>
              <span className="text-[10.5px] font-mono-ui" style={{ color: active ? 'var(--os-accent)' : 'var(--os-text-dim)' }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
