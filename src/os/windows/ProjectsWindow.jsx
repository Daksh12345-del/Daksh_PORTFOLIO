import { useState } from 'react'
import { PROJECTS } from '../../components/Projects.jsx'

export default function ProjectsWindow() {
  const [active, setActive] = useState(PROJECTS[0])

  return (
    <div className="flex flex-col md:flex-row h-[440px] font-mono-ui text-[12.5px]">
      <div className="md:w-[200px] shrink-0 overflow-auto p-3" style={{ borderRight: '1px solid var(--os-border)' }}>
        {PROJECTS.map((p) => (
          <button
            key={p.title}
            onClick={() => setActive(p)}
            className="block w-full text-left px-3 py-2 rounded-[7px] mb-1 truncate"
            style={{
              background: active.title === p.title ? 'var(--os-surface2)' : 'transparent',
              color: active.title === p.title ? 'var(--os-accent)' : 'var(--os-text-dim)',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-5">
        {active.image && (
          <img src={active.image} alt={active.title} className="w-full rounded-[8px] mb-4 object-cover" style={{ maxHeight: 180 }} />
        )}
        <div className="text-[16px] font-display font-bold mb-1" style={{ color: 'var(--os-text)' }}>{active.title}</div>
        <div className="text-[11.5px] mb-3" style={{ color: 'var(--os-accent2)' }}>{active.impact}</div>
        <p className="leading-[1.7] mb-4" style={{ color: 'var(--os-text-dim)' }}>{active.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {active.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-[6px] text-[11px]" style={{ border: '1px solid var(--os-border)', color: 'var(--os-text)' }}>{t}</span>
          ))}
        </div>
        <div className="flex gap-4">
          {active.live && <a href={active.live} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-accent)' }}>Live site ↗</a>}
          {active.github && <a href={active.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-text-dim)' }}>GitHub ↗</a>}
        </div>
      </div>
    </div>
  )
}
