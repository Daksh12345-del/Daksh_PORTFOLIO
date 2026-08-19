import { useEffect, useState } from 'react'

export default function TopBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const ss = String(time.getSeconds()).padStart(2, '0')

  return (
    <div className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 py-4 no-print" style={{ borderBottom: '1px solid var(--os-border)' }}>
      <div className="flex items-baseline gap-2">
        <span className="font-mono-ui font-bold text-[16px] tracking-wide" style={{ color: 'var(--os-text)' }}>
          DAKSH<span style={{ color: 'var(--os-accent)' }}>_OS</span>
        </span>
        <span className="text-[12px] font-mono-ui hidden sm:inline" style={{ color: 'var(--os-text-dim)' }}>v1.0 · full-stack build</span>
      </div>
      <div className="flex items-center gap-3 text-[12px] font-mono-ui" style={{ color: 'var(--os-text-dim)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          daksh.agent ONLINE
        </span>
        <span className="hidden sm:inline">{hh}:{mm}:{ss}</span>
      </div>
    </div>
  )
}
