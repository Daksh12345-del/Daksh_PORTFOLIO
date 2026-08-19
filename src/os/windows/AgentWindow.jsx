import { useState, useRef, useEffect } from 'react'
import { runTour } from '../tour.js'

const PROMPTS = [
  'give me a tour',
  'write my name on the wallpaper',
  'tell me about GradeWallah',
  'what are your skills?',
  'are you open to internships?',
]

// Local fallback responder — used only if /api/agent (Groq-backed) is
// unavailable, e.g. no GROQ_API_KEY configured, or running plain `vite dev`
// without `vercel dev`. Keeps the agent functional either way.
function respond(input) {
  const q = input.toLowerCase()
  if (q.includes('tour')) return "Sure — I'm a full-stack dev from New Delhi. Try 'projects', 'skills', or 'contact' to explore, or ask me about a specific project like GradeWallah."
  if (q.includes('gradewallah')) return 'GradeWallah is a SaaS platform I founded — SGPA/CGPA tracking, placement resources, and a DSA roadmap for students. Built with React, Node.js, and PostgreSQL.'
  if (q.includes('greenprint')) return 'GreenPrint is a carbon-transparency platform — a 7-endpoint REST API computes ESG scores live from submitted data. Built with React (Vite), Node.js, and Express.'
  if (q.includes('skill')) return 'React, Node.js, Express, PostgreSQL, AWS, Selenium, and more — open the skills.json window for the full breakdown.'
  if (q.includes('intern') || q.includes('hire') || q.includes('available') || q.includes('open to')) return "Yes — I'm open to internships and freelance work. Open contact.sh and send me a message, or reach me directly at psinghal651@gmail.com."
  if (q.includes('resume') || q.includes('cv')) return "Open the resume.pdf window, or download the PDF directly from there."
  if (q.includes('bls')) return 'I was an IT Trainee at BLS International (Jun–Jul 2026) — built a visa appointment portal solo, with an admin panel, Groq API integration, and automated Selenium tests.'
  if (q.includes('contact') || q.includes('email')) return 'Best way to reach me: psinghal651@gmail.com, or open contact.sh to send a message directly.'
  return "I'm a simple local responder (not a live LLM yet) — I know about my projects, skills, experience, and availability. Try asking about GradeWallah, my skills, or if I'm open to internships."
}

export default function AgentWindow({ onOpen, onNameChange }) {
  const [log, setLog] = useState([
    { from: 'agent', text: "daksh.agent online. I can answer questions about my work. Try \"give me a tour\" or ask about a project." },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }) }, [log, thinking])

  const send = async (text) => {
    const t = (text ?? input).trim()
    if (!t || thinking) return
    const nextLog = [...log, { from: 'user', text: t }]
    setLog(nextLog)
    setInput('')

    // Special case: writing the visitor's name onto the wallpaper
    if (t.toLowerCase().trim() === 'write my name on the wallpaper') {
      setLog((prev) => [...prev, { from: 'agent', text: "Sure \u2014 what's your name? Type: write my name <your name>" }])
      return
    }
    const nameMatch = t.match(/(?:write my name(?: is| as)?|my name is)\s+(.+)/i)
    if (nameMatch) {
      const name = nameMatch[1].trim().slice(0, 26)
      onNameChange?.(name)
      setLog((prev) => [...prev, { from: 'agent', text: `Done \u2014 the wallpaper now says "${name.toUpperCase()}" \u2713` }])
      return
    }

    // Special case: guided tour — open windows one by one instead of just replying
    if (t.toLowerCase().includes('tour')) {
      setLog((prev) => [...prev, { from: 'agent', text: 'Sure — let me walk you through it. Opening about.md...' }])
      runTour(onOpen, (msg) => setLog((prev) => [...prev, { from: 'agent', text: msg }]))
      return
    }

    setThinking(true)
    try {
      const history = nextLog
        .slice(0, -1)
        .map((l) => ({ role: l.from === 'agent' ? 'assistant' : 'user', content: l.text }))
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: t, history }),
      })
      if (!res.ok) throw new Error('agent api unavailable')
      const data = await res.json()
      setLog((prev) => [...prev, { from: 'agent', text: data.reply }])
    } catch {
      // Fallback: local rule-based responder (works even without a configured API key)
      setLog((prev) => [...prev, { from: 'agent', text: respond(t) }])
    } finally {
      setThinking(false)
    }
  }

  return (
    <div className="flex flex-col h-[420px] font-mono-ui text-[13px]">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {log.map((l, i) => (
          <div key={i} style={{ color: l.from === 'agent' ? 'var(--os-text-dim)' : 'var(--os-text)' }}>
            <span style={{ color: l.from === 'agent' ? 'var(--os-accent2)' : 'var(--os-accent)' }}>{l.from === 'agent' ? '$ ' : '› '}</span>
            {l.text}
          </div>
        ))}
        {thinking && (
          <div style={{ color: 'var(--os-text-dim)' }}>
            <span style={{ color: 'var(--os-accent2)' }}>{'$ '}</span>
            <span className="animate-pulse">thinking…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="p-3 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--os-border)' }}>
        {PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="text-[11px] px-3 py-1.5 rounded-[7px]"
            style={{ border: '1px solid var(--os-border)', color: 'var(--os-text-dim)' }}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3" style={{ borderTop: '1px solid var(--os-border)' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="> query"
          className="flex-1 px-3 py-2 rounded-[7px] outline-none"
          style={{ background: 'var(--os-surface2)', border: '1px solid var(--os-border)', color: 'var(--os-text)' }}
        />
        <button
          onClick={() => send()}
          className="w-9 h-9 rounded-[7px] flex items-center justify-center shrink-0"
          style={{ background: 'var(--os-accent)', color: '#04140f' }}
        >
          ›
        </button>
      </div>
    </div>
  )
}
