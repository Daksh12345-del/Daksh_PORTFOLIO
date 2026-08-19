import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LOG = [
  '$ boot daksh_os --agentic',
  '> mounting /builds (7 repos) \u2713',
  '> starting daksh.agent \u2026 online \u2713',
  '> compiling wallpaper: 4k particles \u2713',
  "> desktop ready \u2014 it's all yours.",
]

function BootLog({ onDone }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= BOOT_LOG.length) {
      const t = setTimeout(onDone, 900)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown((s) => s + 1), 780)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <div className="w-full max-w-[820px] font-mono-ui text-[16px] sm:text-[19px] leading-[2]">
        {BOOT_LOG.slice(0, shown).map((line, i) => (
          <div key={i} style={{ color: i === 0 ? '#eef0f5' : '#22d3ee' }}>{line}</div>
        ))}
        {shown > 0 && shown <= BOOT_LOG.length && (
          <span className="inline-block w-[10px] h-[20px] align-middle animate-pulse" style={{ background: '#22d3ee' }} />
        )}
      </div>
    </div>
  )
}

export default function BootScreen({ onDone }) {
  const [visible, setVisible] = useState(true)

  const finish = () => {
    setVisible(false)
    setTimeout(onDone, 400)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[1000] cursor-pointer overflow-hidden"
          style={{ background: '#0a0c14' }}
          onClick={finish}
        >
          <BootLog onDone={finish} />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[12px] font-mono-ui tracking-widest animate-pulse" style={{ color: '#5b6478' }}>
            CLICK TO SKIP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
