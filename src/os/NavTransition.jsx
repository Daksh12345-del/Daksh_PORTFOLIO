import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Combined terminal-style transition: glitch flash -> cd type-out ->
// boot-log line -> scanline wipe -> done. ~1.1s total.
export default function NavTransition({ target, onComplete }) {
  const [stage, setStage] = useState('glitch') // glitch -> cd -> log -> scan -> done
  const [typed, setTyped] = useState('')

  const cmd = `cd ~/${target}`

  useEffect(() => {
    let cancelled = false
    async function run() {
      setStage('glitch')
      await wait(120)
      if (cancelled) return
      setStage('cd')
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return
        setTyped(cmd.slice(0, i))
        await wait(18)
      }
      await wait(160)
      if (cancelled) return
      setStage('log')
      await wait(280)
      if (cancelled) return
      setStage('scan')
      await wait(320)
      if (cancelled) return
      onComplete()
    }
    run()
    return () => { cancelled = true }
  }, [target])

  return (
    <div className="absolute inset-0 z-[50] pointer-events-none overflow-hidden">
      {/* glitch flash */}
      <AnimatePresence>
        {stage === 'glitch' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.2, 0.7, 0] }}
            transition={{ duration: 0.12, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.15) 0px, rgba(255,95,162,0.1) 2px, transparent 4px)',
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>

      {/* cd type-out + boot-log */}
      {(stage === 'cd' || stage === 'log' || stage === 'scan') && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(10,12,20,0.88)' }}>
          <div className="font-mono-ui text-[15px]">
            <div style={{ color: '#eef0f5' }}>
              <span style={{ color: '#22d3ee' }}>{'$ '}</span>
              {typed}
              {stage === 'cd' && <span className="animate-pulse">▍</span>}
            </div>
            {(stage === 'log' || stage === 'scan') && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-1.5"
                style={{ color: '#ff5fa2' }}
              >
                {`> loading ${target}.exe... done \u2713`}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* scanline wipe */}
      <AnimatePresence>
        {stage === 'scan' && (
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 0.32, ease: 'linear' }}
            className="absolute left-0 right-0 h-[3px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #22d3ee, #ff5fa2, transparent)',
              boxShadow: '0 0 20px 4px rgba(34,211,238,0.6)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
