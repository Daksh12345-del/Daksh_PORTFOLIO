import { useState } from 'react'

const EMAIL = 'psinghal651@gmail.com'

export default function ContactWindow() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const transmit = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${msg}\n\n— ${name || ''} (${email || 'no email given'})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  const inputStyle = {
    background: 'var(--os-surface2)',
    border: '1px solid var(--os-border)',
    color: 'var(--os-text)',
  }

  return (
    <div className="p-6 font-mono-ui text-[13px]">
      <label className="block mb-3">
        <div className="text-[11px] mb-1.5" style={{ color: 'var(--os-accent2)' }}>{'> your name'}</div>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-[7px] outline-none" style={inputStyle} />
      </label>
      <label className="block mb-3">
        <div className="text-[11px] mb-1.5" style={{ color: 'var(--os-accent2)' }}>{'> email'}</div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2.5 rounded-[7px] outline-none" style={inputStyle} />
      </label>
      <label className="block mb-4">
        <div className="text-[11px] mb-1.5" style={{ color: 'var(--os-accent2)' }}>{'> what are we building?'}</div>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className="w-full px-3 py-2.5 rounded-[7px] outline-none resize-none" style={inputStyle} />
      </label>
      <button
        onClick={transmit}
        className="w-full py-2.5 rounded-[8px] font-semibold text-[13px] mb-4"
        style={{ background: 'var(--os-accent)', color: '#04140f' }}
      >
        TRANSMIT ›
      </button>
      <div className="flex flex-wrap gap-4 text-[12px]" style={{ color: 'var(--os-text-dim)' }}>
        <a href="https://github.com/Daksh12345-del" target="_blank" rel="noopener noreferrer" className="underline">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/daksh-singhal-178b56282/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn ↗</a>
        <a href={`mailto:${EMAIL}`} className="underline">{EMAIL} ↗</a>
      </div>
    </div>
  )
}
