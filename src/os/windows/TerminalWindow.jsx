import { useState, useRef, useEffect } from 'react'
import { runTour } from '../tour.js'

const HELP_TEXT = [
  'Available commands:',
  '  help              show this list',
  '  about             who is Daksh',
  '  skills            tech stack',
  '  projects          list of projects',
  '  resume            open resume',
  '  contact           get in touch',
  '  tour              guided walkthrough — opens everything for you',
  '  name <yourname>   put your name on the wallpaper',
  '  whoami            quick identity',
  '  open <window>     open a window (about/skills/projects/resume/agent/contact)',
  '  clear             clear the terminal',
]

export default function TerminalWindow({ onOpen, onNameChange }) {
  const [lines, setLines] = useState([
    'DAKSH_OS v1.0 — full-stack build',
    "Type 'help' for commands.",
    '',
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    let out = []
    if (!cmd) return
    if (cmd === 'help') out = HELP_TEXT
    else if (cmd === 'about') { out = ['Opening about.md...']; onOpen('about') }
    else if (cmd === 'skills') { out = ['Opening skills.json...']; onOpen('skills') }
    else if (cmd === 'projects') { out = ['Opening projects.exe...']; onOpen('projects') }
    else if (cmd === 'resume') { out = ['Opening resume.pdf...']; onOpen('resume') }
    else if (cmd === 'contact') { out = ['Opening contact.sh...']; onOpen('contact') }
    else if (cmd === 'agent') { out = ['Waking up daksh.agent...']; onOpen('agent') }
    else if (cmd === 'tour') {
      out = ["Starting guided tour — opening about.md..."]
      runTour(onOpen, (msg) => setLines((prev) => [...prev, msg]))
    }
    else if (cmd === 'whoami') out = ['Daksh Singhal — Full-Stack Developer, New Delhi']
    else if (cmd.startsWith('name ')) {
      const name = raw.trim().slice(5).trim()
      if (name) {
        onNameChange?.(name)
        out = [`Wallpaper updated \u2014 now shows "${name.toUpperCase()}" \u2713`]
      } else {
        out = ['Usage: name <your name>']
      }
    }
    else if (cmd.startsWith('open ')) {
      const target = cmd.replace('open ', '').trim()
      const valid = ['about', 'skills', 'projects', 'resume', 'agent', 'contact', 'terminal']
      if (valid.includes(target)) { out = [`Opening ${target}...`]; onOpen(target) }
      else out = [`No such window: ${target}`]
    }
    else if (cmd === 'clear') { setLines([]); return }
    else out = [`command not found: ${cmd} — type 'help'`]

    setLines((prev) => [...prev, `$ ${raw}`, ...out, ''])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    }
  }

  return (
    <div
      className="p-4 font-mono-ui text-[12.5px] leading-[1.7] h-[340px] flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto">
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.startsWith('$') ? 'var(--os-text)' : 'var(--os-text-dim)' }}>{l || '\u00A0'}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid var(--os-border)' }}>
        <span style={{ color: 'var(--os-accent)' }}>$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          placeholder="type 'help'"
          className="bg-transparent flex-1 outline-none"
          style={{ color: 'var(--os-text)' }}
        />
      </div>
    </div>
  )
}
